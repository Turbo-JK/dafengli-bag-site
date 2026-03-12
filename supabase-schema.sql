-- Supabase schema for MAISON bag website
-- Run these SQL statements in Supabase SQL editor to create the product-related tables.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_zh text not null,
  description_en text not null,
  description_zh text not null,
  material text not null,
  size text not null,
  weight text not null,
  moq integer not null,
  production_time text not null,
  customization_available boolean not null default true,
  status text not null default 'active', -- 'active' | 'inactive'
  collection text not null,
  category text not null,
  tags text[] default array[]::text[],
  is_new boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color_name text not null,
  color_hex text not null,
  price numeric(12,2) not null,
  compare_at_price numeric(12,2),
  inventory integer not null default 0,
  sku text not null,
  is_default boolean not null default false
);

create index if not exists idx_product_variants_product_id
  on public.product_variants(product_id);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  url text not null,
  alt text not null,
  type text not null default 'studio', -- 'studio' | 'lifestyle' | 'detail'
  order_index integer not null default 0
);

create index if not exists idx_product_images_variant_id
  on public.product_images(variant_id, order_index);

-- 首页「按包型选购」圆圈图标（tote / crossbody / clutch / bucket）
create table if not exists public.category_icons (
  category_slug text primary key,
  image_url text not null
);

-- Optional: basic RLS setup (adjust policies as needed before enabling in production)
-- alter table public.products enable row level security;
-- alter table public.product_variants enable row level security;
-- alter table public.product_images enable row level security;

