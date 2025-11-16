import express from 'express';
import cors from 'cors';
// IMPORTANT: Importing the core logic function
import { generateTopDestinations } from "./destinations.js";

const app = express();
const PORT = 3001;

// -------------------------------------
// 1. Middleware Setup (MUST COME BEFORE ROUTES)
// -------------------------------------
// 1. CORS: Allows requests from the React frontend (running on a different port)
app.use(cors());
// 2. JSON: Parses incoming JSON request bodies
app.use(express.json());

// -------------------------------------
// 2. API Route Definition (MUST BE EXECUTED DIRECTLY)
// -------------------------------------

/**
 * Endpoint 1: Get 5 initial destination recommendations based on user preferences.
 * FIX: Route definition is now direct, not inside an exported function.
 * FIX: The path is the correct relative path: '/api/destinations'.
 */
app.post('/api/destinations', async (req, res) => {
    // DIAGNOSTIC: Log immediately upon request receipt
    console.log(">>> REQUEST RECEIVED at /api/destinations");

    // 1. Extract the user preferences sent from the React frontend
    const tripPreferences = req.body;

    if (!tripPreferences || Object.keys(tripPreferences).length === 0) {
        return res.status(400).json({ error: "Missing trip preference data in request body." });
    }

    // 2. Call the core logic function
    try {
        console.log("Generating recommendations for preferences:", tripPreferences);

        // Call the service layer to generate destinations.
        // NOTE: Your destinations.js file expects the parameters in this order: (maxRetries, delay, tripPreferences)
        // Adjusting call to match your module:
        const maxRetries = 1;
        const delay = 3000;
        const recommendations = await generateTopDestinations(maxRetries, delay, tripPreferences);

        // 3. Send the generated and validated JSON array back to the frontend
        res.status(200).json(recommendations);

    } catch (error) {
        // Log the detailed error on the server side
        console.error("--- Server Error (Recommendations) ---");
        console.error("Failed to generate recommendations:", error);
        console.error("--------------------");

        // Send an error message to the client
        res.status(500).json({
            error: "Failed to generate recommendations. Check server logs for details (potential API error or validation failure).",
            details: error.message
        });
    }
});


// -------------------------------------
// 3. Start Server (MUST COME LAST)
// -------------------------------------
app.listen(PORT, () => {
    console.log(`✅ Express Server running and listening on http://localhost:${PORT}`);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/destinations`);
});