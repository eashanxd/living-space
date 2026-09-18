import { allLocations } from "@/data/location-data";

export type PropertyStatus = "available" | "sold" | "rented" | "unavailable";

export type PropertyType = "Apartment" | "Villa" | "Commercial" | "Penthouse";

export type Property = {
  propertyId: string;
  title: string;
  location: string;
  type: PropertyType;
  bhk?: number;
  area: number;
  price: number;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  image: string;
  gallery: string[];
  configuration: string;
  rent: number | null;
  plotArea: string;
  furnishing: string;
  availableFor: string;
  availableFrom: string;
  postedBy: string;
  about: string;
};

type PropertyMetadata = Pick<
  Property,
  "configuration" | "rent" | "plotArea" | "furnishing" | "availableFor" | "availableFrom" | "postedBy" | "about"
>;

const baseDemoProperties: Omit<Property, keyof PropertyMetadata>[] = [
  {
    propertyId: "LS-001",
    title: "3 BHK Premium Apartment",
    location: "Anand Niketan",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    price: 12500000,
    status: "available",
    amenities: ["Power Backup", "Covered Parking", "Security", "Clubhouse", "Gym"],
    description:
      "A spacious three-bedroom apartment designed for comfortable family living, with a well-lit living area, premium finishes, and easy access to schools, metro connectivity, and everyday conveniences.",
    image:
      "linear-gradient(135deg, #d6c7b6 0%, #eee7dc 30%, #b7a896 100%)",
    gallery: [
      "linear-gradient(135deg, #d6c7b6 0%, #eee7dc 30%, #b7a896 100%)",
      "linear-gradient(135deg, #e5ddd3 0%, #d2c3b0 50%, #a79b8d 100%)",
      "linear-gradient(135deg, #c7d1d2 0%, #ebefe7 38%, #9ba7ab 100%)",
    ],
  },
  {
    propertyId: "LS-002",
    title: "Signature Villa Residence",
    location: "Anand Lok",
    type: "Villa",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    price: 34000000,
    status: "available",
    amenities: ["Private Lawn", "Servant Room", "Smart Home", "Garden", "Double Height Lobby"],
    description:
      "An elegant villa crafted with premium materials, quiet outdoor spaces, and expansive interiors that balance privacy with a refined, modern lifestyle.",
    image:
      "linear-gradient(135deg, #c5b8a5 0%, #efe5d9 25%, #8d7867 100%)",
    gallery: [
      "linear-gradient(135deg, #c5b8a5 0%, #efe5d9 25%, #8d7867 100%)",
      "linear-gradient(135deg, #d8d9d2 0%, #aab2a5 45%, #7d7f77 100%)",
      "linear-gradient(135deg, #b5b0a7 0%, #f0ece7 35%, #76756c 100%)",
    ],
  },
  {
    propertyId: "LS-003",
    title: "Modern Commercial Suite",
    location: "CR Park",
    type: "Commercial",
    area: 1800,
    price: 29000000,
    status: "available",
    bathrooms: 2,
    amenities: ["Reception Area", "Lift Access", "Power Backup", "High Visibility", "Parking"],
    description:
      "A premium commercial workspace in a busy commercial district, ideal for firms seeking efficient layout, visibility, and easy access for clients and teams.",
    image:
      "linear-gradient(135deg, #d7d3ca 0%, #f3efe9 35%, #9a9791 100%)",
    gallery: [
      "linear-gradient(135deg, #d7d3ca 0%, #f3efe9 35%, #9a9791 100%)",
      "linear-gradient(135deg, #d3d7d9 0%, #b0b8bd 42%, #737b83 100%)",
      "linear-gradient(135deg, #eae0d4 0%, #d1c2a3 50%, #86806b 100%)",
    ],
  },
  {
    propertyId: "LS-004",
    title: "Urban Penthouse Collection",
    location: "Defence Colony",
    type: "Penthouse",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 3,
    area: 2100,
    price: 42000000,
    status: "sold",
    amenities: ["Sky Lounge", "Private Terrace", "Concierge", "Smart Controls", "Security"],
    description:
      "A refined penthouse with elevated views, contemporary interiors, and a private terrace that creates a sense of exclusivity and open luxury in the city core.",
    image:
      "linear-gradient(135deg, #d7d8d1 0%, #f5f1ea 25%, #7d7f7a 100%)",
    gallery: [
      "linear-gradient(135deg, #d7d8d1 0%, #f5f1ea 25%, #7d7f7a 100%)",
      "linear-gradient(135deg, #d1c5b2 0%, #f2eadc 35%, #7d7268 100%)",
      "linear-gradient(135deg, #c4c7d0 0%, #e9edf7 40%, #758299 100%)",
    ],
  },
  {
    propertyId: "LS-005",
    title: "Garden View Townhouse",
    location: "East of Kailash",
    type: "Villa",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    price: 26500000,
    status: "rented",
    amenities: ["Private Courtyard", "Community Pool", "Landscape View", "Two Car Park", "Family Lounge"],
    description:
      "A calm residential townhouse featuring a landscaped setting and clean architectural lines to support effortless everyday living and weekend comfort.",
    image:
      "linear-gradient(135deg, #c8d6c0 0%, #edf2e9 25%, #7d8a79 100%)",
    gallery: [
      "linear-gradient(135deg, #c8d6c0 0%, #edf2e9 25%, #7d8a79 100%)",
      "linear-gradient(135deg, #dbd4c6 0%, #c5d0d0 60%, #738089 100%)",
      "linear-gradient(135deg, #cabba4 0%, #f3e7d7 30%, #918270 100%)",
    ],
  },
  {
    propertyId: "LS-006",
    title: "Corner Office Plaza",
    location: "Golf Links",
    type: "Commercial",
    area: 2200,
    price: 31500000,
    status: "unavailable",
    bathrooms: 3,
    amenities: ["Dedicated Entrance", "Corner Visibility", "Service Lift", "Cafe Access", "Reception"],
    description:
      "A strategically positioned commercial office with excellent frontage and flexible planning, suited for businesses seeking a premium address and strong client visibility.",
    image:
      "linear-gradient(135deg, #d3c7b0 0%, #efe4d3 35%, #8f7d68 100%)",
    gallery: [
      "linear-gradient(135deg, #d3c7b0 0%, #efe4d3 35%, #8f7d68 100%)",
      "linear-gradient(135deg, #dfe1df 0%, #b0b9c3 50%, #5d6974 100%)",
      "linear-gradient(135deg, #ccc1b5 0%, #f2e7d9 32%, #857562 100%)",
    ],
  },
  {
    propertyId: "LS-007",
    title: "Anand Lok Garden Residence",
    location: "Anand Lok",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    price: 27500000,
    status: "available",
    amenities: ["Private Balcony", "Lift Access", "Security", "Parking", "Power Backup"],
    description: "A bright three-bedroom residence in a quiet South Delhi enclave with generous living spaces and a leafy outlook.",
    image: "linear-gradient(135deg, #d4c2ad 0%, #f0e5d7 42%, #9a897a 100%)",
    gallery: ["linear-gradient(135deg, #d4c2ad 0%, #f0e5d7 42%, #9a897a 100%)"],
  },
  {
    propertyId: "LS-008",
    title: "Anand Lok Courtyard Home",
    location: "Anand Lok",
    type: "Villa",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    price: 62500000,
    status: "available",
    amenities: ["Courtyard", "Study", "Staff Room", "Covered Parking", "Terrace"],
    description: "A substantial independent home with a private courtyard, flexible family rooms, and a calm residential setting.",
    image: "linear-gradient(135deg, #c8b59e 0%, #eee1cf 35%, #7f6c5d 100%)",
    gallery: ["linear-gradient(135deg, #c8b59e 0%, #eee1cf 35%, #7f6c5d 100%)"],
  },
  {
    propertyId: "LS-009",
    title: "Defence Colony Heritage Floor",
    location: "Defence Colony",
    type: "Penthouse",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    price: 48000000,
    status: "available",
    amenities: ["Private Terrace", "Elevator", "Security", "Parking", "Renovated Kitchen"],
    description: "A polished upper-floor home combining generous proportions with a private terrace near the neighborhood's daily conveniences.",
    image: "linear-gradient(135deg, #d8d0c5 0%, #f3eee7 40%, #8b8177 100%)",
    gallery: ["linear-gradient(135deg, #d8d0c5 0%, #f3eee7 40%, #8b8177 100%)"],
  },
  {
    propertyId: "LS-010",
    title: "Defence Colony Modern Apartment",
    location: "Defence Colony",
    type: "Apartment",
    bhk: 2,
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    price: 18500000,
    status: "available",
    amenities: ["Lift Access", "Security", "Parking", "Natural Light", "Storage"],
    description: "An efficient two-bedroom apartment with clean finishes and easy access to South Delhi's established amenities.",
    image: "linear-gradient(135deg, #d0c2b4 0%, #f0e9df 38%, #a18d7d 100%)",
    gallery: ["linear-gradient(135deg, #d0c2b4 0%, #f0e9df 38%, #a18d7d 100%)"],
  },
  {
    propertyId: "LS-011",
    title: "Golf Links Signature Bungalow",
    location: "Golf Links",
    type: "Villa",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 4,
    area: 4100,
    price: 145000000,
    status: "available",
    amenities: ["Garden", "Library", "Staff Quarters", "Private Drive", "Security"],
    description: "A landmark bungalow opportunity in one of Delhi's most sought-after leafy neighborhoods, planned for quiet, private living.",
    image: "linear-gradient(135deg, #b9b19f 0%, #e8e0d2 35%, #766d61 100%)",
    gallery: ["linear-gradient(135deg, #b9b19f 0%, #e8e0d2 35%, #766d61 100%)"],
  },
  {
    propertyId: "LS-012",
    title: "Golf Links Garden Apartment",
    location: "Golf Links",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 2,
    area: 2050,
    price: 56000000,
    status: "available",
    amenities: ["Garden View", "Lift", "Parking", "Security", "Club Room"],
    description: "A well-proportioned apartment with a green outlook, practical family layout, and a coveted central Delhi address.",
    image: "linear-gradient(135deg, #c5c8b9 0%, #eef0e7 38%, #7e8575 100%)",
    gallery: ["linear-gradient(135deg, #c5c8b9 0%, #eef0e7 38%, #7e8575 100%)"],
  },
  {
    propertyId: "LS-013",
    title: "Jor Bagh Contemporary Residence",
    location: "Jor Bagh",
    type: "Penthouse",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 4,
    area: 3600,
    price: 98000000,
    status: "available",
    amenities: ["Roof Terrace", "Home Office", "Concierge", "Parking", "Smart Controls"],
    description: "A refined residence with generous entertaining areas and quiet private zones in an exceptionally central neighborhood.",
    image: "linear-gradient(135deg, #c4b6a8 0%, #f0e7dd 35%, #81766d 100%)",
    gallery: ["linear-gradient(135deg, #c4b6a8 0%, #f0e7dd 35%, #81766d 100%)"],
  },
  {
    propertyId: "LS-014",
    title: "Jor Bagh Garden Floor",
    location: "Jor Bagh",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 2300,
    price: 69000000,
    status: "available",
    amenities: ["Garden Access", "Parking", "Security", "Lift", "Large Windows"],
    description: "A quiet garden-facing floor with a balanced layout suited to relaxed family life and entertaining.",
    image: "linear-gradient(135deg, #c9c5b8 0%, #eff0e8 38%, #7b8176 100%)",
    gallery: ["linear-gradient(135deg, #c9c5b8 0%, #eff0e8 38%, #7b8176 100%)"],
  },
  {
    propertyId: "LS-015",
    title: "Panchsheel Park Family Home",
    location: "Panchsheel Park",
    type: "Villa",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    price: 88000000,
    status: "available",
    amenities: ["Lawn", "Family Lounge", "Study", "Parking", "Security"],
    description: "A spacious family home with a private lawn and flexible rooms in one of South Delhi's established residential enclaves.",
    image: "linear-gradient(135deg, #c2b39e 0%, #ede3d2 36%, #837765 100%)",
    gallery: ["linear-gradient(135deg, #c2b39e 0%, #ede3d2 36%, #837765 100%)"],
  },
  {
    propertyId: "LS-016",
    title: "Panchsheel Park Garden Floor",
    location: "Panchsheel Park",
    type: "Apartment",
    bhk: 2,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    price: 22000000,
    status: "available",
    amenities: ["Garden", "Parking", "Security", "Lift", "Storage"],
    description: "A comfortable two-bedroom garden floor offering an approachable entry into a premium neighborhood.",
    image: "linear-gradient(135deg, #d0c7b9 0%, #f2eadf 42%, #978776 100%)",
    gallery: ["linear-gradient(135deg, #d0c7b9 0%, #f2eadf 42%, #978776 100%)"],
  },
  {
    propertyId: "LS-017",
    title: "Shanti Niketan Executive Home",
    location: "Shanti Niketan",
    type: "Villa",
    bhk: 4,
    bedrooms: 4,
    bathrooms: 4,
    area: 3000,
    price: 76000000,
    status: "available",
    amenities: ["Terrace", "Staff Room", "Parking", "Security", "Study"],
    description: "An elegant independent home with a practical plan, quiet terrace, and strong access to the airport corridor.",
    image: "linear-gradient(135deg, #c2b8a8 0%, #eee6d9 36%, #847767 100%)",
    gallery: ["linear-gradient(135deg, #c2b8a8 0%, #eee6d9 36%, #847767 100%)"],
  },
  {
    propertyId: "LS-018",
    title: "Shanti Niketan Garden Apartment",
    location: "Shanti Niketan",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 2,
    area: 1750,
    price: 32500000,
    status: "available",
    amenities: ["Garden View", "Lift", "Parking", "Power Backup", "Security"],
    description: "A bright garden-facing apartment with generous proportions and a convenient, well-connected setting.",
    image: "linear-gradient(135deg, #c7c8bd 0%, #eef0e7 40%, #7b8478 100%)",
    gallery: ["linear-gradient(135deg, #c7c8bd 0%, #eef0e7 40%, #7b8478 100%)"],
  },
  {
    propertyId: "LS-019",
    title: "Sundar Nagar Art Deco Floor",
    location: "Sundar Nagar",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    price: 52000000,
    status: "available",
    amenities: ["Renovated Interiors", "Parking", "Security", "Lift", "Balcony"],
    description: "A characterful residence combining generous rooms and refined finishes in a calm, central neighborhood.",
    image: "linear-gradient(135deg, #c9b9a7 0%, #f0e6da 38%, #8b7868 100%)",
    gallery: ["linear-gradient(135deg, #c9b9a7 0%, #f0e6da 38%, #8b7868 100%)"],
  },
  {
    propertyId: "LS-020",
    title: "Sundar Nagar Compact Residence",
    location: "Sundar Nagar",
    type: "Apartment",
    bhk: 2,
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    price: 16500000,
    status: "available",
    amenities: ["Parking", "Security", "Natural Light", "Storage", "Lift"],
    description: "A neatly planned two-bedroom home with an efficient footprint and the atmosphere of an established neighborhood.",
    image: "linear-gradient(135deg, #d1c7bc 0%, #f1ebe4 40%, #978b80 100%)",
    gallery: ["linear-gradient(135deg, #d1c7bc 0%, #f1ebe4 40%, #978b80 100%)"],
  },
  {
    propertyId: "LS-021",
    title: "Vasant Vihar Modern Bungalow",
    location: "Vasant Vihar",
    type: "Villa",
    bhk: 5,
    bedrooms: 5,
    bathrooms: 5,
    area: 4800,
    price: 125000000,
    status: "available",
    amenities: ["Lawn", "Pool", "Staff Quarters", "Study", "Private Drive"],
    description: "A substantial modern bungalow with carefully zoned family and guest areas in a mature, leafy setting.",
    image: "linear-gradient(135deg, #bfb29d 0%, #e9dfcf 35%, #786b5b 100%)",
    gallery: ["linear-gradient(135deg, #bfb29d 0%, #e9dfcf 35%, #786b5b 100%)"],
  },
  {
    propertyId: "LS-022",
    title: "Vasant Vihar Garden Apartment",
    location: "Vasant Vihar",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    area: 1900,
    price: 41500000,
    status: "available",
    amenities: ["Garden View", "Parking", "Security", "Lift", "Club Room"],
    description: "A serene three-bedroom apartment with green views, comfortable proportions, and a sought-after residential address.",
    image: "linear-gradient(135deg, #c5c9bc 0%, #edf1e8 40%, #7c8678 100%)",
    gallery: ["linear-gradient(135deg, #c5c9bc 0%, #edf1e8 40%, #7c8678 100%)"],
  },
  {
    propertyId: "LS-023",
    title: "Kalkaji Metro-Connected Apartment",
    location: "Kalkaji",
    type: "Apartment",
    bhk: 2,
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    price: 9800000,
    status: "available",
    amenities: ["Metro Access", "Lift", "Parking", "Security", "Balcony"],
    description: "A practical, well-connected apartment suited to first-time buyers and professionals seeking efficient city living.",
    image: "linear-gradient(135deg, #d0c7bb 0%, #eee7dd 38%, #958679 100%)",
    gallery: ["linear-gradient(135deg, #d0c7bb 0%, #eee7dd 38%, #958679 100%)"],
  },
  {
    propertyId: "LS-024",
    title: "Saket Business Studio",
    location: "Saket",
    type: "Commercial",
    area: 1300,
    price: 13500000,
    status: "available",
    bathrooms: 2,
    amenities: ["Reception", "Lift Access", "Parking", "Power Backup", "High Visibility"],
    description: "A flexible commercial studio close to retail, hospitality, and strong transport connections in South Delhi.",
    image: "linear-gradient(135deg, #d0cbc1 0%, #f0ede6 40%, #8a8780 100%)",
    gallery: ["linear-gradient(135deg, #d0cbc1 0%, #f0ede6 40%, #8a8780 100%)"],
  },
  {
    propertyId: "LS-025",
    title: "Green Park Courtyard Residence",
    location: "Green Park",
    type: "Apartment",
    bhk: 3,
    bedrooms: 3,
    bathrooms: 2,
    area: 1550,
    price: 21500000,
    status: "available",
    amenities: ["Courtyard", "Parking", "Security", "Lift", "Storage"],
    description: "A welcoming three-bedroom home with a practical layout and excellent access to neighborhood amenities.",
    image: "linear-gradient(135deg, #c8c6b7 0%, #edf0e5 40%, #7e8874 100%)",
    gallery: ["linear-gradient(135deg, #c8c6b7 0%, #edf0e5 40%, #7e8874 100%)"],
  },
];

const propertyMetadata: Record<string, PropertyMetadata> = {
  "LS-001": { configuration: "3 BHK", rent: 75000, plotArea: "145 sq yd", furnishing: "Semi Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-01", postedBy: "Living Space", about: "" },
  "LS-002": { configuration: "4 BHK", rent: 180000, plotArea: "320 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2026-11-15", postedBy: "Living Space", about: "" },
  "LS-003": { configuration: "Commercial Suite", rent: 125000, plotArea: "200 sq yd", furnishing: "Fully Furnished", availableFor: "Rent", availableFrom: "2026-09-30", postedBy: "Living Space", about: "" },
  "LS-004": { configuration: "4 BHK", rent: null, plotArea: "260 sq yd", furnishing: "Fully Furnished", availableFor: "Sale", availableFrom: "2026-12-01", postedBy: "Living Space", about: "" },
  "LS-005": { configuration: "3 BHK", rent: 95000, plotArea: "210 sq yd", furnishing: "Semi Furnished", availableFor: "Rent", availableFrom: "2026-10-15", postedBy: "Living Space", about: "" },
  "LS-006": { configuration: "Commercial Office", rent: 150000, plotArea: "250 sq yd", furnishing: "Unfurnished", availableFor: "Rent/Sale", availableFrom: "2026-11-01", postedBy: "Living Space", about: "" },
  "LS-007": { configuration: "3 BHK", rent: 90000, plotArea: "230 sq yd", furnishing: "Fully Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-01", postedBy: "Living Space", about: "" },
  "LS-008": { configuration: "4 BHK", rent: null, plotArea: "420 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2026-12-15", postedBy: "Living Space", about: "" },
  "LS-009": { configuration: "3 BHK", rent: 140000, plotArea: "300 sq yd", furnishing: "Fully Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-20", postedBy: "Living Space", about: "" },
  "LS-010": { configuration: "2 BHK", rent: 65000, plotArea: "160 sq yd", furnishing: "Semi Furnished", availableFor: "Rent", availableFrom: "2026-09-25", postedBy: "Living Space", about: "" },
  "LS-011": { configuration: "4 BHK", rent: null, plotArea: "520 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2027-01-10", postedBy: "Living Space", about: "" },
  "LS-012": { configuration: "3 BHK", rent: 160000, plotArea: "280 sq yd", furnishing: "Fully Furnished", availableFor: "Rent/Sale", availableFrom: "2026-11-01", postedBy: "Living Space", about: "" },
  "LS-013": { configuration: "4 BHK", rent: null, plotArea: "450 sq yd", furnishing: "Semi Furnished", availableFor: "Sale", availableFrom: "2026-12-20", postedBy: "Living Space", about: "" },
  "LS-014": { configuration: "3 BHK", rent: 175000, plotArea: "310 sq yd", furnishing: "Fully Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-10", postedBy: "Living Space", about: "" },
  "LS-015": { configuration: "4 BHK", rent: null, plotArea: "400 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2027-01-15", postedBy: "Living Space", about: "" },
  "LS-016": { configuration: "2 BHK", rent: 70000, plotArea: "180 sq yd", furnishing: "Semi Furnished", availableFor: "Rent", availableFrom: "2026-10-05", postedBy: "Living Space", about: "" },
  "LS-017": { configuration: "4 BHK", rent: null, plotArea: "360 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2026-11-20", postedBy: "Living Space", about: "" },
  "LS-018": { configuration: "3 BHK", rent: 110000, plotArea: "220 sq yd", furnishing: "Fully Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-25", postedBy: "Living Space", about: "" },
  "LS-019": { configuration: "3 BHK", rent: 135000, plotArea: "275 sq yd", furnishing: "Semi Furnished", availableFor: "Rent/Sale", availableFrom: "2026-11-05", postedBy: "Living Space", about: "" },
  "LS-020": { configuration: "2 BHK", rent: 60000, plotArea: "150 sq yd", furnishing: "Fully Furnished", availableFor: "Rent", availableFrom: "2026-09-28", postedBy: "Living Space", about: "" },
  "LS-021": { configuration: "5 BHK", rent: null, plotArea: "600 sq yd", furnishing: "Unfurnished", availableFor: "Sale", availableFrom: "2027-02-01", postedBy: "Living Space", about: "" },
  "LS-022": { configuration: "3 BHK", rent: 145000, plotArea: "250 sq yd", furnishing: "Semi Furnished", availableFor: "Rent/Sale", availableFrom: "2026-11-10", postedBy: "Living Space", about: "" },
  "LS-023": { configuration: "2 BHK", rent: 45000, plotArea: "120 sq yd", furnishing: "Fully Furnished", availableFor: "Rent", availableFrom: "2026-09-20", postedBy: "Living Space", about: "" },
  "LS-024": { configuration: "Commercial Studio", rent: 85000, plotArea: "145 sq yd", furnishing: "Fully Furnished", availableFor: "Rent", availableFrom: "2026-10-12", postedBy: "Living Space", about: "" },
  "LS-025": { configuration: "3 BHK", rent: 80000, plotArea: "190 sq yd", furnishing: "Semi Furnished", availableFor: "Rent/Sale", availableFrom: "2026-10-18", postedBy: "Living Space", about: "" },
};

export const demoProperties: Property[] = baseDemoProperties.map((property) => ({
  ...property,
  ...propertyMetadata[property.propertyId],
}));

export const locationOptions = ["All locations", ...allLocations];

export const typeOptions = ["All types", ...new Set(demoProperties.map((property) => property.type))];

export const bhkOptions = ["Any", "1", "2", "3", "4+"];

export const priceBracketOptions = [
  { label: "Any budget", value: "all" },
  { label: "Up to ₹1.5 Cr", value: "15000000" },
  { label: "Up to ₹3 Cr", value: "30000000" },
  { label: "Up to ₹5 Cr", value: "50000000" },
];

export type Filters = {
  location: string;
  type: string;
  bhk: string;
  budget: string;
};

export const defaultFilters: Filters = {
  location: "all",
  type: "all",
  bhk: "all",
  budget: "all",
};

export function getFiltersFromSearchParams(searchParams: URLSearchParams | Record<string, string | undefined>): Filters {
  const getValue = (key: keyof Filters) =>
    searchParams instanceof URLSearchParams ? searchParams.get(key) ?? "all" : searchParams[key] ?? "all";

  return {
    location: getValue("location"),
    type: getValue("type"),
    bhk: getValue("bhk"),
    budget: getValue("budget"),
  };
}

export function filterProperties(properties: Property[], filters: Filters) {
  return properties.filter((property) => {
    const locationMatch = filters.location === "all" || property.location.startsWith(filters.location);
    const typeMatch = filters.type === "all" || property.type === filters.type;
    const bhkMatch =
      filters.bhk === "all" ||
      (property.bhk !== undefined &&
        (filters.bhk === "4+" ? property.bhk >= 4 : String(property.bhk) === filters.bhk));
    const budgetLimit = filters.budget === "all" ? undefined : Number(filters.budget);
    const budgetMatch = budgetLimit === undefined || property.price <= budgetLimit;

    return locationMatch && typeMatch && bhkMatch && budgetMatch;
  });
}

export function getPropertyById(propertyId: string) {
  return demoProperties.find((property) => property.propertyId === propertyId);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatStatusLabel(status: PropertyStatus) {
  const labels: Record<PropertyStatus, string> = {
    available: "Available",
    sold: "Sold",
    rented: "Rented",
    unavailable: "Unavailable",
  };

  return labels[status];
}
