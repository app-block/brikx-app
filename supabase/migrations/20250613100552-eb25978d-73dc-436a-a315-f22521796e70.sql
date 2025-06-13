
-- Create a table for user-posted properties
CREATE TABLE public.user_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  image TEXT,
  token_price INTEGER NOT NULL,
  total_value INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  tokens_available INTEGER NOT NULL,
  apy DECIMAL(5,2) NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view user properties" 
  ON public.user_properties 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own properties" 
  ON public.user_properties 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
  ON public.user_properties 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
  ON public.user_properties 
  FOR DELETE 
  USING (auth.uid() = user_id);
