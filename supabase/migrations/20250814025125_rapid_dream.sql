/*
  # Seed Demo Data

  1. Demo Properties
    - 6 properties with different statuses and funding levels
    - Realistic property data with images from Unsplash
    - Various cities and states for geographic diversity

  2. Demo Users
    - Admin user for testing
    - Sample property owners and investors

  3. Demo Updates and Documents
    - Sample project updates
    - Demo documents for properties
*/

-- Insert demo admin user
INSERT INTO users (id, email, name, role) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@jvdeveloper.com', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert demo properties
INSERT INTO properties (id, slug, title, city, state, summary, images, status, target_raise, amount_raised, expected_completion, created_by) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'modern-townhomes-austin-tx',
    'Modern Townhomes - Austin, TX',
    'Austin',
    'TX',
    '4-unit luxury development in prime East Austin location. Contemporary design with high-end finishes and private courtyards.',
    ARRAY['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'construction',
    1000000,
    750000,
    '2026-06-15',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'single-family-homes-denver-co',
    'Single Family Homes - Denver, CO',
    'Denver',
    'CO',
    '3-home subdivision with mountain views in growing Stapleton neighborhood. Energy-efficient construction with modern amenities.',
    ARRAY['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'planning',
    1000000,
    450000,
    '2026-12-31',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'duplex-development-nashville-tn',
    'Duplex Development - Nashville, TN',
    'Nashville',
    'TN',
    '2-unit luxury duplex in Music Row area. Walking distance to downtown with premium finishes and private parking.',
    ARRAY['https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'sale',
    600000,
    540000,
    '2026-03-31',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'luxury-condos-miami-fl',
    'Luxury Condos - Miami, FL',
    'Miami',
    'FL',
    '6-unit waterfront condominium complex in Brickell area. Floor-to-ceiling windows with bay views and resort-style amenities.',
    ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'open',
    2000000,
    600000,
    '2027-09-30',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'suburban-homes-phoenix-az',
    'Suburban Homes - Phoenix, AZ',
    'Phoenix',
    'AZ',
    '5-home development project in desirable Scottsdale area. Desert contemporary design with energy-efficient features.',
    ARRAY['https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'completed',
    800000,
    800000,
    '2024-12-15',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'downtown-lofts-seattle-wa',
    'Downtown Lofts - Seattle, WA',
    'Seattle',
    'WA',
    '4-unit urban loft conversion in historic Capitol Hill building. Exposed brick, high ceilings, and modern amenities.',
    ARRAY['https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    'completed',
    1200000,
    1200000,
    '2024-08-31',
    '00000000-0000-0000-0000-000000000001'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert demo updates
INSERT INTO updates (property_id, title, body, visible_to) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'Foundation Complete - Framing Begins',
    'Great progress on the Austin townhomes! Foundation inspection passed with flying colors and we''re moving into the framing phase next week. Weather has been cooperative and we''re on track for our timeline.',
    'public'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Permits Approved - Breaking Ground Soon',
    'Exciting news! All permits have been approved for the Denver project. We''ll be breaking ground within the next 30 days. Site preparation is already underway.',
    'public'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Listed for Sale - Showings Scheduled',
    'The Nashville duplex is now listed at $1.2M with showings scheduled throughout the week. Early interest has been strong from both investors and owner-occupants.',
    'public'
  )
ON CONFLICT DO NOTHING;

-- Insert demo documents
INSERT INTO documents (property_id, title, url, visible_to) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'Construction Progress Photos',
    'https://example.com/austin-progress-photos.pdf',
    'public'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Site Plans and Renderings',
    'https://example.com/denver-site-plans.pdf',
    'public'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Property Listing Details',
    'https://example.com/nashville-listing.pdf',
    'public'
  )
ON CONFLICT DO NOTHING;