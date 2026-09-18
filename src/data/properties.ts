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
};

export const demoProperties: Property[] = [
  {
    propertyId: "LS-001",
    title: "3 BHK Premium Apartment",
    location: "Dwarka, Delhi",
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
    location: "Gurugram, Haryana",
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
    location: "Noida, Uttar Pradesh",
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
    location: "South Delhi, Delhi",
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
    location: "Greater Noida, Uttar Pradesh",
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
    location: "Faridabad, Haryana",
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
];

export const locationOptions = ["All locations", ...new Set(demoProperties.map((property) => property.location.split(",")[0]))];

export const typeOptions = ["All types", ...new Set(demoProperties.map((property) => property.type))];

export const bhkOptions = ["Any", "1", "2", "3", "4+"];

export const priceBracketOptions = [
  { label: "Any budget", value: "all" },
  { label: "Under ₹1.5 Cr", value: "0-15000000" },
  { label: "₹1.5 Cr - ₹3 Cr", value: "15000000-30000000" },
  { label: "₹3 Cr - ₹5 Cr", value: "30000000-50000000" },
  { label: "Above ₹5 Cr", value: "50000000-9999999999" },
];

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
