/*
  # Initial JVDeveloper Schema

  1. New Tables
    - `users` - User accounts with roles (investor, owner, admin)
    - `properties` - Development projects and properties
    - `owner_applications` - Property owner applications and underwriting
    - `investments` - Investor commitments and funding
    - `updates` - Project updates and communications
    - `documents` - Project documents and files
    - `audit_logs` - System audit trail

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure admin and user data access

  3. Indexes
    - Performance indexes on frequently queried columns
    - Unique constraints for data integrity
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
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

-- Properties table
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

-- Owner applications table
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

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_user_id uuid REFERENCES users(id),
  property_id uuid REFERENCES properties(id),
  amount numeric(12,2) NOT NULL,
  status text NOT NULL DEFAULT 'pledged' CHECK (status IN ('pledged', 'funded', 'returned')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Updates table
CREATE TABLE IF NOT EXISTS updates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  title text NOT NULL,
  body text NOT NULL,
  visible_to text NOT NULL DEFAULT 'public' CHECK (visible_to IN ('investors', 'owners', 'public')),
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  title text NOT NULL,
  url text NOT NULL,
  visible_to text NOT NULL DEFAULT 'public' CHECK (visible_to IN ('investors', 'owners', 'public')),
  created_at timestamptz DEFAULT now()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  target_table text NOT NULL,
  target_id uuid,
  meta_json jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read their own data, admins can read all
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Properties: Public read, admin write
CREATE POLICY "Properties are publicly readable" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage properties" ON properties
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Owner applications: Users can read own, admins can read all
CREATE POLICY "Users can read own applications" ON owner_applications
  FOR SELECT USING (owner_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create applications" ON owner_applications
  FOR INSERT WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY "Admins can update applications" ON owner_applications
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Investments: Users can read own, admins can read all
CREATE POLICY "Users can read own investments" ON investments
  FOR SELECT USING (investor_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create investments" ON investments
  FOR INSERT WITH CHECK (investor_user_id = auth.uid());

-- Updates: Public read
CREATE POLICY "Updates are publicly readable" ON updates
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage updates" ON updates
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Documents: Public read
CREATE POLICY "Documents are publicly readable" ON documents
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage documents" ON documents
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Audit logs: Admin only
CREATE POLICY "Admins can read audit logs" ON audit_logs
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_owner_applications_user ON owner_applications(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_owner_applications_status ON owner_applications(status);
CREATE INDEX IF NOT EXISTS idx_investments_user ON investments(investor_user_id);
CREATE INDEX IF NOT EXISTS idx_investments_property ON investments(property_id);
CREATE INDEX IF NOT EXISTS idx_updates_property ON updates(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_property ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);