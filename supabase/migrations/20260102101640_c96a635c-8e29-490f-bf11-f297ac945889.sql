-- Fix: Create a public view with only safe columns for public access
-- This prevents exposure of sensitive fields like contact_email, stripe_account_id, total_donated

-- Create a view with only safe columns for public consumption
CREATE VIEW public.churches_public AS
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

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.churches_public TO anon;
GRANT SELECT ON public.churches_public TO authenticated;

-- Drop the overly permissive public policy that exposes all columns
DROP POLICY IF EXISTS "Public sees active churches" ON public.churches;

-- Recreate a more restrictive policy - only authenticated users who have joined the church
-- or are admins can see full church details (already handled by existing policies)