/*
  # Create profiles and unlocked characters tables

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `username` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `unlocked_characters`
      - `id` (uuid)
      - `profile_id` (uuid, references profiles)
      - `character_name` (text)
      - `unlocked_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to:
      - Read their own profile and unlocked characters
      - Update their own profile
      - Insert new unlocked characters
*/

-- Create unlocked_characters table if it doesn't exist
CREATE TABLE IF NOT EXISTS unlocked_characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles ON DELETE CASCADE,
  character_name text NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, character_name)
);

-- Enable RLS on unlocked_characters
ALTER TABLE unlocked_characters ENABLE ROW LEVEL SECURITY;

-- Create policies for unlocked_characters
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'unlocked_characters' 
    AND policyname = 'Users can read own unlocked characters'
  ) THEN
    CREATE POLICY "Users can read own unlocked characters"
      ON unlocked_characters
      FOR SELECT
      TO authenticated
      USING (auth.uid() = profile_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'unlocked_characters' 
    AND policyname = 'Users can unlock new characters'
  ) THEN
    CREATE POLICY "Users can unlock new characters"
      ON unlocked_characters
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = profile_id);
  END IF;
END $$;