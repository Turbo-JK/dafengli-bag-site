-- MAISON Luxury E-Commerce Database Schema
-- PostgreSQL / Supabase compatible

-- ============================================
-- PRODUCTS
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  title_zh VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'tote' | 'shoulder' | 'crossbody' | 'clutch' | 'backpack'
  description_zh TEXT,
  description_en TEXT,
  material_zh VARCHAR(200),
  material_en VARCHAR(200),
  dimensions VARCHAR(100), -- e.g. "30 × 25 × 12 cm"
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);

-- ============================================
-- PRODUCT VARIANTS (Color Variants)
-- ============================================

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_name VARCHAR(50) NOT NULL,
  color_hex VARCHAR(7) NOT NULL, -- e.g. '#8B4513'
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2), -- for strikethrough display
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ============================================
-- VARIANT IMAGES
-- ============================================

CREATE TABLE IF NOT EXISTS variant_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_images_variant ON variant_images(variant_id);

-- ============================================
-- INQUIRIES (客户询价)
-- ============================================

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_sku VARCHAR(50),
  product_title VARCHAR(200),
  color_name VARCHAR(50),
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(200),
  message TEXT,
  source VARCHAR(20) DEFAULT 'web', -- 'web' | 'whatsapp' | 'wechat'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'replied' | 'closed'
  admin_notes TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_product ON inquiries(product_id);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);

-- ============================================
-- ORDERS (订单)
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'MS20240115001'
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(200),
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(50),
  shipping_province VARCHAR(50),
  shipping_postal_code VARCHAR(20),
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  payment_method VARCHAR(30), -- 'wechat' | 'alipay' | 'bank_transfer'
  payment_id VARCHAR(100),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  tracking_number VARCHAR(50),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ============================================
-- ORDER ITEMS (订单明细)
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_sku VARCHAR(50),
  product_title VARCHAR(200) NOT NULL,
  color_name VARCHAR(50),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================
-- LOOKBOOK (造型集)
-- ============================================

CREATE TABLE IF NOT EXISTS lookbook_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_zh VARCHAR(200),
  title_en VARCHAR(200),
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200),
  product_ids UUID[] DEFAULT '{}', -- array of related product IDs
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STORIES / BLOG (品牌故事)
-- ============================================

CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title_zh VARCHAR(200) NOT NULL,
  title_en VARCHAR(200),
  excerpt_zh TEXT,
  excerpt_en TEXT,
  content_zh TEXT,
  content_en TEXT,
  cover_image VARCHAR(500),
  category VARCHAR(50), -- 'craft' | 'collection' | 'event' | 'behind-scenes'
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stories_slug ON stories(slug);
CREATE INDEX idx_stories_published ON stories(is_published, published_at DESC);

-- ============================================
-- SITE SETTINGS (网站配置)
-- ============================================

CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(50) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example settings:
-- INSERT INTO site_settings (key, value) VALUES
--   ('hero', '{"title_zh": "...", "title_en": "...", "image": "..."}'),
--   ('contact', '{"phone": "...", "whatsapp": "...", "email": "..."}'),
--   ('social', '{"instagram": "...", "weibo": "...", "wechat_qr": "..."}');

-- ============================================
-- ADMIN USERS (后台用户)
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'editor', -- 'admin' | 'editor'
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER product_variants_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER stories_updated_at BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
