import {GoogleGenAI} from "@google/genai";
import {zodToJsonSchema} from "zod-to-json-schema"
import {config} from "dotenv";
import {
    recommendedDestinationsSchema,
    recommendedRoutesSchema,
    recommendedScheduleSchema,
    RouteInputSchema,
    ScheduleInputSchema,
    TripPreferencesSchema
} from "./schemas/schemas.js";


//  API Initialization

config({path: '../.env'});
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

// Initialize AI globally so it only happens once
const ai = new GoogleGenAI(apiKey);

const errorHandling = async (error,i,maxRetries,currentDelay) => {

    if ((error.status === 429 || error.status === 503) && i < maxRetries - 1) {
        console.log(`Attempt ${i + 1} failed (Status: ${error.status}). Retrying in ${currentDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, currentDelay));
    } else {
        console.error("Final API call failed after retries or with unrecoverable error:", error);
        throw error;
    }
}

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
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: zodToJsonSchema(recommendedDestinationsSchema),
                },
            });

            // Validate the raw text response against the schema
            return recommendedDestinationsSchema.parse(JSON.parse(response.text));

        } catch (error) {
            // Check for Resource Exhausted (429) or Service Unavailable (503)
           await errorHandling(error, i, maxRetries, currentDelay);
        }
    }
}


/**
 * Generates distinct travel routes using the Gemini API, returning a validated JSON array.
 * @param {object} input - An object containing validated preferences and destination details.
 * @param {number} [maxRetries=3] - Maximum number of times to retry on transient errors.
 * @returns {Promise<Array<object>>} Validated JSON array of routes.
 */
export async function generateTravelRoutes(input, maxRetries = 3, delay = 3000) {

    // Input validation remains the same
    console.log("Input: ", input);
    const validatedInput = RouteInputSchema.parse(input);
    console.log("Validated input: ", validatedInput)
    const {preferences, destination} = validatedInput;
    console.log("Preferences object before the prompt: ",)
    console.log(destination)
    console.log(preferences)
    let currentDelay = delay;

    const totalTravelers = preferences.adults + preferences.children;
    const totalTripBudget = preferences.budget;

// Use 29% of the total trip budget as the transport budget estimate (for the full round trip)
    const totalTransportBudget = totalTripBudget * 0.29;

    const estimatedBasePrice = totalTravelers > 0
        // The price per traveler is the transport budget divided by travelers, rounded to the nearest 10
        ? Math.round((totalTransportBudget / totalTravelers) / 10) * 10
        : 200; // Default

    for (let i = 0; i < maxRetries; i++) {
        try {
            const prompt = `
You are an expert, highly meticulous **Travel Route Planning API**. Your sole purpose is to analyze user preferences, the source, and the destination, and then output a **pure JSON array** containing a list of distinct, multimodal, and realistic travel routes.

### 1. **Role and Goal**
Your primary goal is to generate **1 to 5 distinct, multimodal routes** from the source to the destination.
* **Source:** ${preferences.homeLocation}
* **Destination:** ${destination.city}, ${destination.country}
* **Routes MUST** provide a variety of transportation options, and detail the full round-trip journey (outbound and return combined).
* **Pricing Logic:** The reference price per traveler is **${estimatedBasePrice}**. This number represents the estimated allocation for the **full round-trip transport** based on the user's total holiday budget. Calculate the final numeric value for 'price' and 'savings' by applying a realistic factor (e.g., 1.1, 0.75, 0.40) to this reference price, and output the resulting integer number directly. Do not output formulas or strings.
### 2. **Input: User Preferences**
[Input JSONs remain here]

### 3. **Output Format and Constraints**
Your response **MUST BE ONLY A SINGLE PURE JSON ARRAY** that strictly adheres to the provided schema. The output MUST be ready for direct JSON.parse() without any wrapping code blocks or conversational text.
`;
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    // *** CRITICAL ADDITION: Use structured JSON output ***
                    responseMimeType: "application/json",
                    responseJsonSchema: zodToJsonSchema(recommendedRoutesSchema),
                },
            });

            // *** CRITICAL CHANGE: Direct JSON parsing and Zod validation ***
            // The model is forced to output clean JSON, so we parse and validate it.
            return recommendedRoutesSchema.parse(JSON.parse(response.text));

        } catch (error) {
            // Error handling remains the same
            await errorHandling(error, i, maxRetries, currentDelay);
        }
    }
}

/**
 * Generates a detailed daily travel schedule based on all trip parameters.
 * @param {object} input - Preferences, Destination, and the selected Route.
 * @param {number} [maxRetries=3] - Maximum number of times to retry on transient errors.
 * @returns {Promise<Array<object>>} Validated JSON array of the daily schedule.
 */
export async function generateSchedule(input, maxRetries = 3, delay = 3000) {

    // 1. Validation and Setup
    const validatedInput = ScheduleInputSchema.parse(input);
    const preferences = validatedInput.preferences;
    const selectedRoute = validatedInput.selectedRoute;
    const destination = validatedInput.destination;

    const numberOfDays = preferences.numberOfDays;
    const totalTripBudget = preferences.budget;

    // Calculate the total cost of the transport (from the selected route)
    // NOTE: This assumes 'price' in selectedRoute is the final number, not the formula string.
    const transportCost = selectedRoute.price;

    // Calculate the remaining budget for Accommodation, Food, Activities for the entire trip
    const remainingBudget = totalTripBudget - transportCost;

    // Calculate the DAILY budget for all non-transport expenses
    const dailyBudget = Math.round(remainingBudget / numberOfDays);

    for (let i = 0; i < maxRetries; i++) {
        try {
            const prompt = `
You are an expert, highly meticulous **Travel Itinerary Planner**. Your sole purpose is to analyze the user's preferences, destination, and selected travel route, and generate a detailed daily schedule for the entire trip duration in a pure JSON array format.

### 1. **Role and Goal**
Your primary goal is to generate a detailed schedule for ${numberOfDays} days, starting on ${preferences.startDate}.
* **Daily Budget Constraint:** The average non-transport daily budget is **${dailyBudget}** (for food, activities, and local transport). The budget breakdown in each day's object should adhere to this average.
* **Pace & Interests:** The schedule must reflect the **${preferences.travelPace}** pace and prioritize the user's interests: ${preferences.interests.join(', ')}.
* **Arrival/Departure:** Day 1 MUST begin with the arrival from the selected route's itinerary. The last day MUST end with the return departure.
* **Weather:** Provide a realistic weather forecast for the specific time of year in ${destination.city}.

### 2. **Input Details**
* **Trip Duration:** ${numberOfDays} days (${preferences.startDate} to ${preferences.endDate})
* **Daily Budget (Non-Transport):** ${dailyBudget}
* **Destination:** ${destination.city}, ${destination.country} (${destination.highlights.join(', ')})
* **Selected Route Details:** ${selectedRoute.title} (${selectedRoute.duration}, Price: ${transportCost})

### 3. **Output Format and Constraints**
Your response **MUST BE ONLY A SINGLE PURE JSON ARRAY** containing exactly **${numberOfDays}** objects, strictly adhering to the provided Schedule schema. Do not include any introductory or concluding text.
`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: zodToJsonSchema(recommendedScheduleSchema),
                },
            });

            // Direct JSON parsing and Zod validation
            return recommendedScheduleSchema.parse(JSON.parse(response.text));

        } catch (error) {
            await errorHandling(error, i, maxRetries, delay);
        }
    }
}
