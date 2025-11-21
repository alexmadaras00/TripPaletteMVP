import {z} from "zod";

export const TripPreferencesSchema = z.object({
    homeLocation: z.string(),
    travelPace: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    numberOfDays: z.number().int(),
    budget: z.number().int(),
    travelGroup: z.string(),
    adults: z.number().int(),
    children: z.number().int(),
    interests: z.array(z.string())
});

// Define the output schema for the destinations
export const DestinationSchema = z.object({
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

export const DestinationInputSchema = z.object({
    id: z.number().int().positive(),
    city: z.string(),
    country: z.string(),
    price: z.number().int().positive(),
    flightTime: z.string(),
    // We include these for context in the prompt, but they don't affect the route logic
    bestFor: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    whyMatch: z.string().optional(),
});

// Input schema for route planning function
export const RouteInputSchema = z.object({
    preferences: TripPreferencesSchema,
    destination: DestinationInputSchema,
});


// --- Output Schemas (For Route Structure) ---
export const BookingLinkSchema = z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
});

export const ItineraryStepSchema = z.object({
    location: z.string(),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format."),
    type: z.enum(["departure", "connection", "arrival"]),
    transport: z.string(),
    duration: z.string(),
    bookingUrl: z.string().url().optional(),
});

export const RouteSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    description: z.string(),
    type: z.enum(["flight", "train", "bus", "car", "ferry"]),
    duration: z.string(),
    distance: z.string(),
    price: z.number().int().nonnegative(),
    savings: z.number().int().nonnegative(),
    comfort: z.string(),
    stops: z.string(),
    provider: z.string(),
    departureTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format."),
    arrivalTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format."),
    baggage: z.string(),
    carbonFootprint: z.string(),
    bookingLinks: z.array(BookingLinkSchema).min(1),
    itinerary: z.array(ItineraryStepSchema).min(2),
});
// Enforce that the output is an array of RouteSchema objects (4 distinct routes: Flight, Train, Car, Bus)

const WeatherSchema = z.object({
    temperature: z.string(),
    condition: z.string(),
    recommendation: z.string(),
});

const BudgetAllocationSchema = z.object({
    total: z.number().int().positive(),
    meals: z.number().int().nonnegative(),
    activities: z.number().int().nonnegative(),
    transport: z.number().int().nonnegative(),
});

const ActivitySchema = z.object({
    time: z.string().regex(/^\d{2}:\d{2} (AM|PM)$/, "Time must be in HH:MM AM/PM format."),
    title: z.string(),
    description: z.string(),
    type: z.enum(["transport", "accommodation", "dining", "activity", "sightseeing", "cultural", "shopping"]),
    duration: z.string(),
    location: z.string(),
    tips: z.string().optional(),
});

// --- 2. MAIN SCHEDULE SCHEMAS ---

export const DailyScheduleSchema = z.object({
    dayNumber: z.number().int().positive(),
    date: z.string().regex(/^[A-Za-z]+, [A-Za-z]+ \d{1,2}, \d{4}$/, "Date must be in Day, Month Date, Year format."),
    title: z.string(),
    weather: WeatherSchema,
    budget: BudgetAllocationSchema,
    activities: z.array(ActivitySchema).min(3),
    tips: z.array(z.string()).min(1).optional(),
});

// Enforce the final output is an array of daily schedules


// --- 3. INPUT SCHEMAS FOR SCHEDULE FUNCTION ---

// NOTE: We need the full RouteSchema here to include the itinerary and price for the schedule context.
// Assuming RouteSchema is imported or defined with all its nested fields.
export const ScheduleInputSchema = z.object({
    preferences: TripPreferencesSchema,
    destination: DestinationInputSchema, // Or the full DestinationSchema, depending on data available
    selectedRoute: RouteSchema,
});



//Enforced schemas objects
export const recommendedDestinationsSchema = z.array(DestinationSchema).min(5).max(5);
export const recommendedRoutesSchema = z.array(RouteSchema).min(1).max(5);
export const recommendedScheduleSchema = z.array(DailyScheduleSchema).min(1);
