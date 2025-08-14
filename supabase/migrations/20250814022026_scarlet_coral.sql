/*
  # Seed Demo Data

  1. Demo Properties
    - 6 sample properties with different statuses
    - Realistic funding amounts and timelines

  2. Demo Users
    - Admin user for testing
    - Sample investors and owners
*/

-- Insert demo properties
INSERT INTO properties (id, slug, title, city, state, summary, images, status, target_raise, amount_raised, expected_completion) VALUES
(
  uuid_generate_v4(),
  'austin-modern-townhomes',
  'Modern Townhomes - Austin, TX',
  'Austin',
  'TX',
  '4-unit luxury development in prime location with modern amenities and sustainable features.',
  ARRAY['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'construction',
  1000000,
  750000,
  '2026-06-30'
),
(
  uuid_generate_v4(),
  'denver-single-family',
  'Single Family Homes - Denver, CO',
  'Denver',
  'CO',
  '3-home subdivision with mountain views and energy-efficient design.',
  ARRAY['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'planning',
  1000000,
  450000,
  '2026-12-31'
),
(
  uuid_generate_v4(),
  'nashville-luxury-duplex',
  'Duplex Development - Nashville, TN',
  'Nashville',
  'TN',
  '2-unit luxury duplex in Music Row area with premium finishes.',
  ARRAY['https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'sale',
  600000,
  540000,
  '2026-03-31'
),
(
  uuid_generate_v4(),
  'miami-waterfront-condos',
  'Luxury Condos - Miami, FL',
  'Miami',
  'FL',
  '6-unit waterfront condominium complex with ocean views and resort-style amenities.',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'open',
  2000000,
  600000,
  '2027-09-30'
),
(
  uuid_generate_v4(),
  'phoenix-suburban-homes',
  'Suburban Homes - Phoenix, AZ',
  'Phoenix',
  'AZ',
  '5-home development project with desert landscaping and solar panels.',
  ARRAY['https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'completed',
  1200000,
  1200000,
  '2024-12-15'
),
(
  uuid_generate_v4(),
  'seattle-downtown-lofts',
  'Downtown Lofts - Seattle, WA',
  'Seattle',
  'WA',
  '4-unit urban loft conversion with industrial design and city views.',
  ARRAY['https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
  'completed',
  1500000,
  1500000,
  '2024-08-31'
);