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

export const properties: Property[] = [
  {
    id: 1,
    name: "Dubai Marina Resort",
    location: "Dubai, UAE",
    type: "Hospitality",
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    const transformedUserProperties: Property[] = (userProperties || []).map(prop => ({
      id: prop.id,
      name: prop.name,
      location: prop.location,
      type: prop.type,
      image: prop.image || '/placeholder.svg',
      tokenPrice: prop.token_price,
      totalValue: prop.total_value,
      totalTokens: prop.total_tokens,
      tokensAvailable: prop.tokens_available,
      apy: prop.apy,
      verified: prop.verified,
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
  return properties.find(property => property.id === id);
};

export const getRandomProperty = (): Property => {
  return properties[Math.floor(Math.random() * properties.length)];
};
