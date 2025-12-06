-- Add a policy for public to read active churches (limited columns via view)
-- This allows the SECURITY INVOKER view to access the data
CREATE POLICY "Anyone can view active churches"
ON public.churches
FOR SELECT
TO anon, authenticated
USING (status = 'active');