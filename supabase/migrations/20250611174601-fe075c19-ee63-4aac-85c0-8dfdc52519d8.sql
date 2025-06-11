
-- Add wallet_address column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN wallet_address TEXT;
