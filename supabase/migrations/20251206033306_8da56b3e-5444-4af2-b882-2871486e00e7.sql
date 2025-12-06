-- Fix Security Definer View: Recreate view with SECURITY INVOKER
DROP VIEW IF EXISTS public.churches_public;

CREATE VIEW public.churches_public
WITH (security_invoker = true) AS
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

-- Re-grant access
GRANT SELECT ON public.churches_public TO anon, authenticated;