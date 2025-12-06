-- Fix: Create a public-safe view that excludes sensitive columns
-- Drop existing public SELECT policy
DROP POLICY IF EXISTS "Public sees active churches basic info" ON public.churches;

-- Create a restrictive policy that only allows owners/admins to see full data
CREATE POLICY "Church admins can view their church"
ON public.churches
FOR SELECT
USING (is_church_admin(auth.uid(), id));

-- Create policy for authenticated users to view their own church via profile
CREATE POLICY "Users can view their joined church"
ON public.churches
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.church_id = churches.id
  )
);

-- Create a public-safe view for browsing/searching churches (excludes sensitive fields)
CREATE OR REPLACE VIEW public.churches_public AS
SELECT 
  id, 
  name, 
  city, 
  state, 
  country, 
  slug, 
  logo_url, 
  member_count,
  status
FROM public.churches
WHERE status = 'active';

-- Grant access to the view for both anonymous and authenticated users
GRANT SELECT ON public.churches_public TO anon, authenticated;