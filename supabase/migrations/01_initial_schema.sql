-- Create tables for our application

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service features table (related to services)
CREATE TABLE service_features (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);

-- Bitumen products table
CREATE TABLE bitumen_products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bitumen product specifications table
CREATE TABLE bitumen_specifications (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES bitumen_products(id) ON DELETE CASCADE,
  specification TEXT NOT NULL
);

-- Bitumen product applications table
CREATE TABLE bitumen_applications (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES bitumen_products(id) ON DELETE CASCADE,
  application TEXT NOT NULL
);

-- Team members table
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin users
INSERT INTO admins (user_id, name, password_hash, role)
VALUES 
  ('shubham', 'Shubham', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'super_admin'),
  ('pooja', 'Pooja', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'admin'),
  ('arati', 'Arati', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'admin'),
  ('chandrakant', 'Chandrakant', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'admin');

-- Create RLS policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE bitumen_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bitumen_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bitumen_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view service features" ON service_features FOR SELECT USING (true);
CREATE POLICY "Public can view bitumen products" ON bitumen_products FOR SELECT USING (true);
CREATE POLICY "Public can view bitumen specifications" ON bitumen_specifications FOR SELECT USING (true);
CREATE POLICY "Public can view bitumen applications" ON bitumen_applications FOR SELECT USING (true);
CREATE POLICY "Public can view team members" ON team_members FOR SELECT USING (true);

-- Create storage buckets
-- Note: This needs to be done via the Supabase dashboard or API

