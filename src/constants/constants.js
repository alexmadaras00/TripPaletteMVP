const budgetValue = 2800
export const allDestinations = [
    {
        id: 1,
        country: "France",
        city: "Paris",
        title: "Paris, France",
        subtitle: "The City of Light - Perfect for culture and cuisine lovers",
        price: Math.round(budgetValue * 0.95),
        originalPrice: budgetValue,
        savings: Math.round(budgetValue * 0.05),
        rating: 4.8,
        reviews: 2847,
        matchScore: 95,
        flightTime: "7-9 hours from most locations",
        highlights: [
            "Louvre & Musée d'Orsay priority access",
            "Seine river dinner cruise",
            "Montmartre artist quarter exploration",
            "French cooking class with chef",
            "Historic Latin Quarter walking tour",
        ],
        whyMatch: "Perfect for History & Culture + Food & Dining interests",
        bestFor: ["History", "Food", "Arts"],
        climate: "Mild summer, perfect for walking tours",
        currency: "Euro (EUR)",
        language: "French (English widely spoken in tourist areas)",
        image: "/placeholder.svg?height=200&width=300",
        flag: "🇫🇷",
    },
    {
        id: 2,
        country: "Italy",
        city: "Rome",
        title: "Rome, Italy",
        subtitle: "Eternal City - Where history comes alive",
        price: Math.round(budgetValue * 0.88),
        originalPrice: budgetValue,
        savings: Math.round(budgetValue * 0.12),
        rating: 4.9,
        reviews: 3156,
        matchScore: 92,
        flightTime: "8-12 hours from most locations",
        highlights: [
            "Colosseum & Roman Forum guided tours",
            "Vatican Museums & Sistine Chapel",
            "Traditional Roman food tour",
            "Trastevere neighborhood exploration",
            "Cooking class: Pasta & Gelato making",
        ],
        whyMatch: "Exceptional for History & Culture with amazing Food & Dining",
        bestFor: ["History", "Food", "Arts"],
        climate: "Warm and sunny, ideal for sightseeing",
        currency: "Euro (EUR)",
        language: "Italian (English spoken in tourist areas)",
        image: "/placeholder.svg?height=200&width=300",
        flag: "🇮🇹",
    },
    {
        id: 3,
        country: "Japan",
        city: "Tokyo",
        title: "Tokyo, Japan",
        subtitle: "Modern metropolis meets ancient traditions",
        price: Math.round(budgetValue * 1.05),
        originalPrice: Math.round(budgetValue * 1.15),
        savings: Math.round(budgetValue * 0.1),
        rating: 4.9,
        reviews: 1923,
        matchScore: 88,
        flightTime: "11-14 hours from most locations",
        highlights: [
            "Traditional temples & modern districts",
            "Sushi making class with master chef",
            "Shibuya & Harajuku cultural exploration",
            "Traditional tea ceremony experience",
            "Tsukiji fish market food tour",
        ],
        whyMatch: "Unique blend of culture, history, and incredible cuisine",
        bestFor: ["Food", "History", "Arts"],
        climate: "Pleasant summer weather",
        currency: "Japanese Yen (JPY)",
        language: "Japanese (English signage in tourist areas)",
        image: "/placeholder.svg?height=200&width=300",
        flag: "🇯🇵",
    },
    {
        id: 4,
        country: "Spain",
        city: "Barcelona",
        title: "Barcelona, Spain",
        subtitle: "Vibrant city with stunning architecture and beaches",
        price: Math.round(budgetValue * 0.85),
        originalPrice: budgetValue,
        savings: Math.round(budgetValue * 0.15),
        rating: 4.7,
        reviews: 2654,
        matchScore: 90,
        flightTime: "6-10 hours from most locations",
        highlights: [
            "Sagrada Familia and Gaudí architecture",
            "Park Güell and Gothic Quarter",
            "Tapas tours and local markets",
            "Beach relaxation at Barceloneta",
            "Flamenco shows and nightlife",
        ],
        whyMatch: "Perfect blend of culture, food, and relaxation",
        bestFor: ["Arts", "Food", "History"],
        climate: "Mediterranean climate with warm summers",
        currency: "Euro (EUR)",
        language: "Spanish/Catalan (English spoken in tourist areas)",
        image: "/placeholder.svg?height=200&width=300",
        flag: "🇪🇸",
    },
    {
        id: 5,
        country: "Greece",
        city: "Athens",
        title: "Athens, Greece",
        subtitle: "Cradle of civilization with ancient wonders",
        price: Math.round(budgetValue * 0.8),
        originalPrice: budgetValue,
        savings: Math.round(budgetValue * 0.2),
        rating: 4.6,
        reviews: 2156,
        matchScore: 87,
        flightTime: "8-12 hours from most locations",
        highlights: [
            "Acropolis and Parthenon tours",
            "Ancient Agora and archaeological sites",
            "Traditional Greek tavernas",
            "Day trip to nearby islands",
            "National Archaeological Museum",
        ],
        whyMatch: "Rich ancient history and Mediterranean culture",
        bestFor: ["History", "Food", "Arts"],
        climate: "Warm Mediterranean climate",
        currency: "Euro (EUR)",
        language: "Greek (English spoken in tourist areas)",
        image: "/placeholder.svg?height=200&width=300",
        flag: "🇬🇷",
    },
]
export const steps = [
    {number: 1, title: "Home Location", description: "Where are you traveling from?"},
    {number: 2, title: "Travelers", description: "Who's traveling?"},
    {number: 3, title: "Dates & Budget", description: "When and how much?"},
    {number: 4, title: "Interests", description: "What do you enjoy?"},
]
export const travelInterests = [
    {
        id: "Food",
        icon: "🍽️",
        title: "Food & Dining",
        description: "Local cuisine and restaurants"
    },
    {
        id: "History",
        icon: "🏛️",
        title: "History & Culture",
        description: "Museums and historical sites",
    },
    {
        id: "Arts",
        icon: "🎨",
        title: "Arts & Entertainment",
        description: "Galleries, shows, and events",
    },
    {
        id: "Nature",
        icon: "🏞️",
        title: "Nature & Outdoors",
        description: "Parks, hiking, and wildlife"
    },
    {
        id: "Shopping",
        icon: "🛍️",
        title: "Shopping",
        description: "Markets, malls, and boutiques"
    },
    {
        id: "Nightlife",
        icon: "🌙",
        title: "Nightlife",
        description: "Bars, clubs, and evening entertainment",
    },
]
export const travelGroups = [
    {id: "Solo", icon: "👤", title: "Solo"},
    {id: "Couple", icon: "👫", title: "Couple"},
    {id: "Family", icon: "👨‍👩‍👧‍👦", title: "Family"},
    {id: "Friends", icon: "👥", title: "Friends"},
]

export const properties = [
    {
        name: "Home Location",
        image: "🏠"
    },
    {
        name: "Travel Dates",
        image: "📅",

    },
    {
        name: "Budget",
        image: "💰",

    },
    {
        name: "Interests",
        image: "❤️"
    }
];
export const tabs = [
    { id: "overview", label: "📊 Overview", icon: "📊" },
    { id: "schedule", label: "📅 Daily Schedule", icon: "📅" },
    { id: "transport", label: "🚄 Transportation", icon: "🚄" }
];

export const beforeYouGo = [
    {
        task: "Digital Documentation",
        description: `Digitize everything. Take photos or scans of your passport, visa, and reservations. Store these securely in a password manager or a cloud service like Google Drive, and also have physical copies in a separate bag from the originals.`,
        isDone: false,
        emoji: "📱",
    },
    {
        task: "Stay Connected",
        description: `Research and purchase an eSIM for your destination, or check your phone provider for a suitable plan. Activate it before you leave so you have data the moment you land.`,
        isDone: false,
        emoji: "🌐",
    },
    {
        task: "Smart Financials",
        description: `Notify your bank of travel plans via their app. Consider using a multi-currency card and have a backup credit card along with some local currency.`,
        isDone: false,
        emoji: "💳",
    },
    {
        task: "Travel Apps",
        description: `Download essential apps: TripIt for itineraries, Google Maps for offline navigation, Google Translate for language, and Rome2Rio for local transport.`,
        isDone: false,
        emoji: "🗺️",
    },
    {
        task: "Cybersecurity",
        description: `Install a VPN on your devices to protect your data on public Wi-Fi. Use a password manager and back up your data before you go.`,
        isDone: false,
        emoji: "🔒",
    },
];

export const duringYourTrip = [
    {
        task: "Digital Security",
        description: `Be cautious of public Wi-Fi. Use a VPN and avoid logging into sensitive accounts. Enable strong passwords and multi-factor authentication on your devices.`,
        isDone: false,
        emoji: "🛡️",
    },
    {
        task: "Navigating your Destination",
        description: `Use your pre-downloaded offline maps. Use your phone's digital wallet for quick and secure purchases, but have a physical card and cash as a backup.`,
        isDone: false,
        emoji: "🧭",
    },
    {
        task: "Health and Safety",
        description: `Save local emergency numbers and your home country's embassy contact info. Share your live location with a trusted contact and stay informed about local news.`,
        isDone: false,
        emoji: "🚨",
    },
    {
        task: "Embrace the Local Experience",
        description: `Use local food and transport apps. Look for authentic recommendations from locals and be open to new experiences.`,
        isDone: false,
        emoji: "🍜",
    },
    {
        task: "Sustainable Travel",
        description: `Carry a reusable water bottle to reduce plastic waste and support local businesses, restaurants, and artisans to help the local economy.`,
        isDone: false,
        emoji: "♻️",
    },
];


