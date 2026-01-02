-- Fix: Set the view to use SECURITY INVOKER (the default safe option)
-- This ensures the view respects the querying user's permissions, not the view creator's

DROP VIEW IF EXISTS public.churches_public;

CREATE VIEW public.churches_public 
WITH (security_invoker = true)
AS
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

-- Re-grant SELECT on the view
GRANT SELECT ON public.churches_public TO anon;
GRANT SELECT ON public.churches_public TO authenticated;