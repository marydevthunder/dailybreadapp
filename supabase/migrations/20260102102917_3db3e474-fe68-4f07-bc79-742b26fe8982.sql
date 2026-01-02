-- Allow platform admins to view all churches
CREATE POLICY "Admins can view all churches"
ON public.churches
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow platform admins to update all churches (for approval/rejection)
CREATE POLICY "Admins can update all churches"
ON public.churches
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow platform admins to delete churches if needed
CREATE POLICY "Admins can delete churches"
ON public.churches
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));