/*
  # Initial JVDeveloper Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text, optional)
      - `phone` (text, optional)
      - `address_json` (jsonb for structured address data)
      - `role` (enum: investor, owner, admin)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `city` (text)
      - `state` (text)
      - `summary` (text, optional)
      - `images` (text array)
      - `status` (enum: open, planning, construction, sale, completed)
      - `target_raise` (numeric)
      - `amount_raised` (numeric)
      - `expected_completion` (date, optional)
      - `created_by` (uuid, foreign key to users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `owner_applications`
      - `id` (uuid, primary key)
      - `owner_user_id` (uuid, foreign key to users)
      - `address` (text)
      - `has_liens` (boolean)
      - `mortgage_balance` (numeric)
      - `lot_size_sqft` (integer)
      - `status` (enum: submitted, approved, review, declined)
      - `underwriting_score` (integer, optional)
      - `notes` (text, optional)
      - `consent_timestamp` (timestamp)
      - `consent_ip` (text, optional)
      - `consent_user_agent` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `investments`
      - `id` (uuid, primary key)
      - `investor_user_id` (uuid, foreign key to users)
      - `property_id` (uuid, foreign key to properties)
      - `amount` (numeric)
      - `status` (enum: pledged, funded, returned)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `updates`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `title` (text)
      - `body` (text)
      - `visible_to` (enum: investors, owners, public)
      - `created_at` (timestamp)
    
    - `documents`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `title` (text)
      - `url` (text)
      - `visible_to` (enum: investors, owners, public)
      - `created_at` (timestamp)
    
    - `audit_logs`
      - `id` (uuid, primary key)
      - `actor_user_id` (uuid, foreign key to users, optional)
      - `action` (text)
      - `target_table` (text)
      - `target_id` (uuid, optional)
      - `meta_json` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for appropriate access control
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  phone text,
  address_json jsonb DEFAULT '{}',
  role text NOT NULL DEFAULT 'owner' CHECK (role IN ('investor', 'owner', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  summary text,
  images text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('open', 'planning', 'construction', 'sale', 'completed')),
  target_raise numeric(12,2) DEFAULT 0,
  amount_raised numeric(12,2) DEFAULT 0,
  expected_completion date,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create owner_applications table
CREATE TABLE IF NOT EXISTS owner_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id uuid REFERENCES users(id),
  address text NOT NULL,
  has_liens boolean NOT NULL DEFAULT false,
  mortgage_balance numeric(12,2) NOT NULL DEFAULT 0,
  lot_size_sqft integer NOT NULL,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'review', 'declined')),
  underwriting_score integer,
  notes text,
  consent_timestamp timestamptz DEFAULT now(),
  consent_ip text,
  consent_user_agent text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_user_id uuid REFERENCES users(id),
  property_id uuid REFERENCES properties(id),
  amount numeric(12,2) NOT NULL,
  status text NOT NULL DEFAULT 'pledged' CHECK (status IN ('pledged', 'funded', 'returned')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updates table
CREATE TABLE IF NOT EXISTS updates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  title text NOT NULL,
  body text NOT NULL,
  visible_to text NOT NULL DEFAULT 'public' CHECK (visible_to IN ('investors', 'owners', 'public')),
  created_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  title text NOT NULL,
  url text NOT NULL,
  visible_to text NOT NULL DEFAULT 'public' CHECK (visible_to IN ('investors', 'owners', 'public')),
  created_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  target_table text NOT NULL,
  target_id uuid,
  meta_json jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_owner_applications_user ON owner_applications(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_owner_applications_status ON owner_applications(status);
CREATE INDEX IF NOT EXISTS idx_investments_user ON investments(investor_user_id);
CREATE INDEX IF NOT EXISTS idx_investments_property ON investments(property_id);
CREATE INDEX IF NOT EXISTS idx_updates_property ON updates(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_property ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO public
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO public
  USING (auth.uid() = id);

-- Properties policies (publicly readable)
CREATE POLICY "Properties are publicly readable" ON properties
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins can manage properties" ON properties
  FOR ALL TO public
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Owner applications policies
CREATE POLICY "Users can create applications" ON owner_applications
  FOR INSERT TO public
  WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY "Users can read own applications" ON owner_applications
  FOR SELECT TO public
  USING (owner_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update applications" ON owner_applications
  FOR UPDATE TO public
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Investments policies
CREATE POLICY "Users can create investments" ON investments
  FOR INSERT TO public
  WITH CHECK (investor_user_id = auth.uid());

CREATE POLICY "Users can read own investments" ON investments
  FOR SELECT TO public
  USING (investor_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Updates policies (publicly readable)
CREATE POLICY "Updates are publicly readable" ON updates
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins can manage updates" ON updates
  FOR ALL TO public
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Documents policies (publicly readable)
CREATE POLICY "Documents are publicly readable" ON documents
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins can manage documents" ON documents
  FOR ALL TO public
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Audit logs policies
CREATE POLICY "Admins can read audit logs" ON audit_logs
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT TO public
  WITH CHECK (true);