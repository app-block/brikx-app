
export interface Property {
  id: number;
  name: string;
  location: string;
  totalValue: number;
  tokenPrice: number;
  tokensAvailable: number;
  totalTokens: number;
  apy: number;
  image: string;
  type: string;
  verified: boolean;
  description: string;
  features: string[];
  monthlyRent: number;
  occupancyRate: number;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Luxury Marina Resort",
    location: "Dubai Marina, UAE",
    totalValue: 8500000,
    tokenPrice: 8500,
    tokensAvailable: 280,
    totalTokens: 1000,
    apy: 22.5,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    type: "Hospitality",
    verified: true,
    description: "A premium luxury resort located in the heart of Dubai Marina, offering world-class amenities and consistent rental income from high-end tourism.",
    features: ["Ocean View", "24/7 Concierge", "Spa & Wellness", "Fine Dining", "Private Beach"],
    monthlyRent: 450000,
    occupancyRate: 92
  },
  {
    id: 2,
    name: "Tech Innovation Hub",
    location: "Bangalore, India",
    totalValue: 12000000,
    tokenPrice: 12000,
    tokensAvailable: 150,
    totalTokens: 1000,
    apy: 18.8,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    type: "Commercial",
    verified: true,
    description: "A state-of-the-art technology park featuring modern office spaces, innovation labs, and co-working areas designed for the future of work.",
    features: ["Smart Building", "5G Ready", "EV Charging", "Tech Facilities", "Flexible Spaces"],
    monthlyRent: 580000,
    occupancyRate: 95
  },
  {
    id: 3,
    name: "Eco-Resort Development",
    location: "Costa Rica",
    totalValue: 6200000,
    tokenPrice: 6200,
    tokensAvailable: 420,
    totalTokens: 1000,
    apy: 25.2,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
    type: "Sustainable",
    verified: true,
    description: "An eco-friendly resort development that combines luxury hospitality with sustainable practices, featuring renewable energy and conservation initiatives.",
    features: ["Solar Power", "Rainwater Harvesting", "Organic Gardens", "Wildlife Conservation", "Carbon Neutral"],
    monthlyRent: 320000,
    occupancyRate: 88
  },
  {
    id: 4,
    name: "Manhattan Office Tower",
    location: "New York, USA",
    totalValue: 25000000,
    tokenPrice: 25000,
    tokensAvailable: 320,
    totalTokens: 1000,
    apy: 15.4,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    type: "Commercial",
    verified: true,
    description: "A prestigious office tower in the heart of Manhattan, offering premium commercial spaces with stunning city views and world-class amenities.",
    features: ["City Views", "Premium Location", "Modern Facilities", "Metro Access", "High Security"],
    monthlyRent: 1200000,
    occupancyRate: 97
  },
  {
    id: 5,
    name: "Beachfront Villa Complex",
    location: "Maldives",
    totalValue: 4800000,
    tokenPrice: 4800,
    tokensAvailable: 550,
    totalTokens: 1000,
    apy: 28.7,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop",
    type: "Hospitality",
    verified: true,
    description: "Exclusive beachfront villas in the Maldives offering unparalleled luxury and privacy for discerning guests seeking the ultimate tropical escape.",
    features: ["Private Beach", "Overwater Villas", "World-Class Spa", "Water Sports", "Butler Service"],
    monthlyRent: 380000,
    occupancyRate: 85
  },
  {
    id: 6,
    name: "Solar Energy Farm",
    location: "California, USA",
    totalValue: 18000000,
    tokenPrice: 18000,
    tokensAvailable: 200,
    totalTokens: 1000,
    apy: 16.3,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
    type: "Sustainable",
    verified: true,
    description: "A large-scale solar energy installation generating clean renewable energy while providing stable returns through long-term energy contracts.",
    features: ["Renewable Energy", "Government Incentives", "Long-term Contracts", "Stable Returns", "Environmental Impact"],
    monthlyRent: 750000,
    occupancyRate: 100
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getRandomProperty = (): Property => {
  return properties[Math.floor(Math.random() * properties.length)];
};
