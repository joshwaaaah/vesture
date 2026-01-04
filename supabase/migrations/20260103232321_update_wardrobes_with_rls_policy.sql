-- Enable RLS
ALTER TABLE public.wardrobes ENABLE ROW LEVEL SECURITY;

-- Enable SELECT
CREATE POLICY "Users can view their own wardrobes"
ON "public"."wardrobes"
FOR SELECT
TO public
USING (
  (SELECT auth.uid()) = (
    SELECT user_id 
    FROM profiles 
    WHERE profiles.id = wardrobes.user_id
  )
);

-- Enable INSERT
CREATE POLICY "Users can insert their own wardrobes"
ON "public"."wardrobes"
FOR INSERT
TO public
WITH CHECK (
  (SELECT auth.uid()) = (
    SELECT user_id 
    FROM profiles 
    WHERE profiles.id = wardrobes.user_id
  )
);

-- Enable UPDATE
CREATE POLICY "Users can update their own wardrobes"
ON "public"."wardrobes"
FOR UPDATE
TO public
USING (
  (SELECT auth.uid()) = (
    SELECT user_id 
    FROM profiles 
    WHERE profiles.id = wardrobes.user_id
  )
)
WITH CHECK (
  (SELECT auth.uid()) = (
    SELECT user_id 
    FROM profiles 
    WHERE profiles.id = wardrobes.user_id
  )
);

-- Enable DELETE
CREATE POLICY "Users can delete their own wardrobes"
ON "public"."wardrobes"
FOR DELETE
TO public
USING (
  (SELECT auth.uid()) = (
    SELECT user_id 
    FROM profiles 
    WHERE profiles.id = wardrobes.user_id
  )
);