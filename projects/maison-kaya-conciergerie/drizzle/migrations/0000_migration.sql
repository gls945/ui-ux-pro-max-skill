CREATE TABLE public.owner_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL CHECK (kind IN ('contact','estimation')),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  phone text CHECK (char_length(phone) <= 40),
  city text CHECK (char_length(city) <= 80),
  housing_type text CHECK (char_length(housing_type) <= 40),
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  message text CHECK (char_length(message) <= 3000)
);
GRANT INSERT ON public.owner_requests TO anon, authenticated;
GRANT ALL ON public.owner_requests TO service_role;
ALTER TABLE public.owner_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a request" ON public.owner_requests FOR INSERT TO anon, authenticated WITH CHECK (true);