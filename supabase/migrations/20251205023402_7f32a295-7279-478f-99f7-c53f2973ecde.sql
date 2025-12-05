-- Create churches table
CREATE TABLE public.churches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'United States',
  zip_code TEXT,
  website TEXT,
  contact_email TEXT,
  logo_url TEXT,
  stripe_account_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  total_donated NUMERIC(12,2) DEFAULT 0,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.churches ENABLE ROW LEVEL SECURITY;

-- Churches are publicly readable (for search)
CREATE POLICY "Churches are publicly readable" 
ON public.churches 
FOR SELECT 
USING (true);

-- Only admins can insert/update churches (via edge functions)
-- Members can request new churches which will be added via edge function

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_churches_updated_at
BEFORE UPDATE ON public.churches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add church_id foreign key to profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_church_id_fkey 
FOREIGN KEY (church_id) REFERENCES public.churches(id) ON DELETE SET NULL;

-- Create index for search
CREATE INDEX idx_churches_name ON public.churches USING gin(to_tsvector('english', name));
CREATE INDEX idx_churches_city ON public.churches(city);
CREATE INDEX idx_churches_status ON public.churches(status);

-- Insert some sample churches for testing
INSERT INTO public.churches (name, slug, city, state, status) VALUES
('Shoreline Church', 'shoreline-church', 'Dallas', 'Texas', 'active'),
('Grace Community Church', 'grace-community', 'Austin', 'Texas', 'active'),
('First Baptist Church', 'first-baptist', 'Houston', 'Texas', 'active'),
('Hillsong Church', 'hillsong', 'Phoenix', 'Arizona', 'active'),
('Elevation Church', 'elevation', 'Charlotte', 'North Carolina', 'active');