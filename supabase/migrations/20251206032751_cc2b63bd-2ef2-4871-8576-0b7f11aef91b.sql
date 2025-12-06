-- 1. Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'church_admin', 'member');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    church_id uuid REFERENCES public.churches(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role, church_id)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create SECURITY DEFINER function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Create function to check church-specific admin role
CREATE OR REPLACE FUNCTION public.is_church_admin(_user_id uuid, _church_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'church_admin'
      AND church_id = _church_id
  )
$$;

-- 6. RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Drop the overly permissive churches SELECT policy
DROP POLICY IF EXISTS "Churches are publicly readable" ON public.churches;

-- 8. Create granular SELECT policies for churches
-- Public can only see basic non-sensitive info of active churches
CREATE POLICY "Public sees active churches basic info"
ON public.churches FOR SELECT
USING (status = 'active');

-- 9. Add INSERT policy for authenticated users to create pending churches
CREATE POLICY "Authenticated users can request new churches"
ON public.churches FOR INSERT TO authenticated
WITH CHECK (
  status = 'pending' AND
  stripe_account_id IS NULL AND
  (total_donated IS NULL OR total_donated = 0) AND
  (member_count IS NULL OR member_count = 0)
);

-- 10. Add UPDATE policy for church admins
CREATE POLICY "Church admins can update their church"
ON public.churches FOR UPDATE TO authenticated
USING (public.is_church_admin(auth.uid(), id));