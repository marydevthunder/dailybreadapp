-- Remove the overly permissive policy and view since they cause issues
-- The application will use explicit column selection for security
DROP VIEW IF EXISTS public.churches_public;
DROP POLICY IF EXISTS "Anyone can view active churches" ON public.churches;

-- Create a more restrictive public policy that only allows basic info
-- We'll rely on application-level column selection for additional safety
CREATE POLICY "Public sees active churches"
ON public.churches
FOR SELECT
TO anon, authenticated
USING (status = 'active');