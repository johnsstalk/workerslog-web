-- Create subscriptions table for storing Play subscription verification results
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  subscription_id TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL,
  purchase_token TEXT NOT NULL,
  status TEXT,
  expiry_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
