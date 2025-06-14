
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: number | string;
  name: string;
  location: string;
  type: string;
  image: string;
  tokenPrice: number;
  totalValue: number;
  totalTokens: number;
  tokensAvailable: number;
  apy: number;
  verified: boolean;
  description?: string;
}

// Demo Unsplash photo IDs for best results:
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", // Dubai Marina Resort
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80", // Bangalore Tech Hub
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80", // Singapore Sky Tower
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", // Amsterdam Green Complex
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=600&q=80", // Tokyo Business Center
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", // London Financial District
];

export const properties: Property[] = [
  {
    id: 1,
    name: "Dubai Marina Resort",
    location: "Dubai, UAE",
    type: "Hospitality",
    image: DEMO_IMAGES[0],
    tokenPrice: 8500,
    totalValue: 850000,
    totalTokens: 100,
    tokensAvailable: 23,
    apy: 22.5,
    verified: true,
    description: "Luxury beachfront resort with premium amenities"
  },
  {
    id: 2,
    name: "Bangalore Tech Hub",
    location: "Bangalore, India", 
    type: "Commercial",
    image: DEMO_IMAGES[1],
    tokenPrice: 12000,
    totalValue: 1200000,
    totalTokens: 100,
    tokensAvailable: 45,
    apy: 18.8,
    verified: true,
    description: "Modern tech office space in prime location"
  },
  {
    id: 3,
    name: "Singapore Sky Tower",
    location: "Singapore",
    type: "Commercial",
    image: DEMO_IMAGES[2],
    tokenPrice: 15000,
    totalValue: 1800000,
    totalTokens: 120,
    tokensAvailable: 67,
    apy: 16.2,
    verified: true,
    description: "Premium commercial tower in business district"
  },
  {
    id: 4,
    name: "Amsterdam Green Complex",
    location: "Amsterdam, Netherlands",
    type: "Sustainable",
    image: DEMO_IMAGES[3],
    tokenPrice: 9500,
    totalValue: 950000,
    totalTokens: 100,
    tokensAvailable: 34,
    apy: 14.7,
    verified: true,
    description: "Eco-friendly sustainable building complex"
  },
  {
    id: 5,
    name: "Tokyo Business Center",
    location: "Tokyo, Japan",
    type: "Commercial",
    image: DEMO_IMAGES[4],
    tokenPrice: 11000,
    totalValue: 1320000,
    totalTokens: 120,
    tokensAvailable: 89,
    apy: 19.3,
    verified: true,
    description: "High-rise business center in Shibuya"
  },
  {
    id: 6,
    name: "London Financial District",
    location: "London, UK",
    type: "Commercial",
    image: DEMO_IMAGES[5],
    tokenPrice: 13500,
    totalValue: 1620000,
    totalTokens: 120,
    tokensAvailable: 52,
    apy: 17.1,
    verified: true,
    description: "Prime office space in the financial district"
  }
];

export const fetchAllProperties = async (): Promise<Property[]> => {
  try {
    // Fetch user-posted properties from Supabase
    const { data: userProperties, error } = await supabase
      .from('user_properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user properties:', error);
      return properties; // Return static properties if error
    }

    // Transform user properties to match Property interface
    const transformedUserProperties: Property[] = (userProperties || []).map((prop: any, idx: number) => ({
      id: prop.id,
      name: prop.name,
      location: prop.location,
      type: prop.type,
      image: prop.image || DEMO_IMAGES[idx % DEMO_IMAGES.length],
      tokenPrice: prop.token_price,
      totalValue: prop.total_value,
      totalTokens: prop.total_tokens,
      tokensAvailable: prop.tokens_available,
      apy: parseFloat(prop.apy),
      verified: !!prop.verified,
      description: prop.description || ''
    }));

    // Combine static properties with user properties
    return [...transformedUserProperties, ...properties];
  } catch (error) {
    console.error('Error in fetchAllProperties:', error);
    return properties; // Return static properties if error
  }
};

export const getPropertyById = (id: number | string): Property | undefined => {
  // Convert to string for strict equality, as Supabase IDs are usually strings
  return properties.find(property => property.id.toString() === id.toString());
};

export const getRandomProperty = (): Property => {
  return properties[Math.floor(Math.random() * properties.length)];
};
