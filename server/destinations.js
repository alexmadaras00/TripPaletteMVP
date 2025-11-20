import {GoogleGenAI} from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema"
import {config} from "dotenv";

// -------------------------------------
// 1. Zod Schemas
// -------------------------------------

// Define the schema for the incoming preferences (used for validation inside the function)
const TripPreferencesSchema = z.object({
    homeLocation: z.string(),
    travelPace: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    numberOfDays: z.number().int(),
    budget: z.number().int(),
    travelGroup: z.string(),
    adults: z.number().int(),
    children: z.number().int(),
    interests: z.array(z.string()),
});

// Define the output schema for the destinations
const DestinationSchema = z.object({
    id: z.number().int().positive(),
    country: z.string(),
    city: z.string(),
    title: z.string(),
    subtitle: z.string(),
    price: z.number().int().positive(),
    rating: z.number().min(0).max(5),
    reviews: z.number().int().nonnegative(),
    matchScore: z.number().int().min(0).max(100),
    flightTime: z.string(),
    highlights: z.array(z.string()),
    whyMatch: z.string(),
    bestFor: z.array(z.string()),
    climate: z.string(),
    currency: z.string(),
    language: z.string(),
    image: z.string().url(),
    flag: z.string().max(4),
    safetyIndex: z.number().min(1.0).max(10),
});

// Enforce that the output is an array of DestinationSchema objects
const recommendedDestinationsSchema = z.array(DestinationSchema).min(5).max(5); // Added min/max constraint to align with prompt

// -------------------------------------
// 2. API Initialization
// -------------------------------------

// Load environment variables for the API Key (assuming .env is in the root or accessible)
config({ path: '../.env' });
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

// Initialize AI globally so it only happens once
const ai = new GoogleGenAI(apiKey);

// -------------------------------------
// 3. Core Logic
// -------------------------------------

/**
 * Generates 5 destination recommendations using the Gemini API.
 * @param {object} tripPreferences - User trip preferences object.
 * @param {number} [maxRetries=3] - Maximum number of times to retry on transient errors (429, 503).
 * @param {number} [delay=3000] - Initial delay in ms before retrying.
 * @returns {Promise<Array<object>>} Array of 5 validated destination objects.
 */
export async function generateTopDestinations(tripPreferences, maxRetries = 3, delay = 3000) {

    // 1. Validate incoming data against the schema
    console.log("The input before validation");
    console.log("The object is: ", tripPreferences.valueOf());
    const validatedPreferences = TripPreferencesSchema.parse(tripPreferences);
    console.log("The input has been parsed");
    const tripPreferencesJson = JSON.stringify(validatedPreferences, null, 2);
    console.log("The input has been checked");
    let currentDelay = delay;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const prompt = `
You are an expert, highly creative, and meticulous **Travel Recommendation Engine** specialized in generating structured, data-driven travel plans. Your sole purpose is to analyze user preferences and output a JSON array of travel destinations that strictly adheres to the provided schema.

### 1. **Role and Goal**
Your primary goal is to recommend the **Top 5 international travel destinations** that perfectly match the user's travel preferences.
* The destinations must be unique, compelling, and globally recognized.
* The recommendations must be feasible considering the \`startDate\`, \`endDate\`, and \`numberOfDays\`.
* The estimated \`price\` must be an integer and cannot exceed the \`budget\` provided in the preferences object. All currency conversions for the estimated price must be into a single, major currency (e.g., USD or EUR) for consistency, although the final output should use the currency of the destination. **Crucially, the price must be calculated as a percentage of the user's budget, not as a real-world quote.**
* The \`whyMatch\` and \`matchScore\` should clearly link the destination to the user's \`interests\` and \`travelPace\`.

### 2. **Input: User Preferences**
The user's travel preferences are provided in the following JSON object. Analyze all fields, especially \`travelPace\`, \`budget\`, \`startDate\`,\`endDate\`, \`travelGroup\`, and \`interests\`.

**USER PREFERENCES:**
**${tripPreferencesJson}**

* **travelPace Logic:**
    * \`Relaxing 🧘\` / \`Easygoing 🌤\`: Focus on fewer activities, long stays, and comfort.
    * \`Balanced 🚶‍♂️\` / \`Dynamic 🧭\`: Mix of sightseeing and leisure, flexible pace.
    * \`Adventurous 🚴‍♂️\` / \`Travel hustler 🎢\`: Maximize activities, cover multiple locations/sites, highly active itinerary.

### 3. **Output Format and Constraints**
Your response **MUST BE ONLY A SINGLE JSON ARRAY** containing exactly **5 destination objects** as the format suggests. 
The output must be perfectly valid, minified JSON ready for direct parsing. NOTE** The safety index should be accordingly to each country's foreign affair ministry
`;

            const response = await ai.models.generateContent({
                // FIX: Use gemini-2.5-flash-preview-09-2025 for better structured output support
                model: "gemini-2.5-flash-preview-09-2025",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: zodToJsonSchema(recommendedDestinationsSchema),
                },
            });

            // Validate the raw text response against the schema
            return recommendedDestinationsSchema.parse(JSON.parse(response.text));

        } catch (error){
            // Check for Resource Exhausted (429) or Service Unavailable (503)
            if ((error.status === 429 || error.status === 503) && i < maxRetries - 1) {
                console.log(`Attempt ${i + 1} failed (Status: ${error.status}). Retrying in ${currentDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, currentDelay));
            }
            else {
                console.error("Final API call failed after retries or with unrecoverable error:", error);
                // Throw the error so Express can catch it and send a 500 response
                throw error;
            }
        }
    }
}