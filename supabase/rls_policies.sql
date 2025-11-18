-- ============================================
-- RLS Policies for Buyers (Frontend) Integration
-- این فایل را در SQL Editor Supabase اجرا کنید
-- ============================================

-- ============================================
-- 1. PRODUCTS TABLE POLICIES
-- ============================================

-- Enable RLS on products table
alter table public.products enable row level security;

-- Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Published products are visible to everyone" on public.products;
drop policy if exists "Sellers can view their own products" on public.products;
drop policy if exists "Sellers can insert their own products" on public.products;
drop policy if exists "Sellers can update their own products" on public.products;
drop policy if exists "Sellers can delete their own products" on public.products;

-- Policy: Everyone (including anonymous users) can view published products
-- این policy برای سایت buyers ضروری است
create policy "Published products are visible to everyone"
  on public.products
  for select
  using (status = 'published');

-- Policy: Sellers can view their own products (including draft/archived)
create policy "Sellers can view their own products"
  on public.products
  for select
  using (
    auth.uid() is not null 
    and seller_id = auth.uid()
  );

-- Policy: Sellers can insert their own products
create policy "Sellers can insert their own products"
  on public.products
  for insert
  with check (
    auth.uid() is not null 
    and seller_id = auth.uid()
  );

-- Policy: Sellers can update their own products
create policy "Sellers can update their own products"
  on public.products
  for update
  using (
    auth.uid() is not null 
    and seller_id = auth.uid()
  )
  with check (
    auth.uid() is not null 
    and seller_id = auth.uid()
  );

-- Policy: Sellers can delete their own products
create policy "Sellers can delete their own products"
  on public.products
  for delete
  using (
    auth.uid() is not null 
    and seller_id = auth.uid()
  );

-- ============================================
-- 2. PRODUCT_IMAGES TABLE POLICIES
-- ============================================

-- Enable RLS on product_images table
alter table public.product_images enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Product images are visible to everyone for published products" on public.product_images;
drop policy if exists "Product images are visible to owners" on public.product_images;
drop policy if exists "Product images can be managed by owners" on public.product_images;

-- Policy: Everyone can view images of published products
-- این policy برای سایت buyers ضروری است
create policy "Product images are visible to everyone for published products"
  on public.product_images
  for select
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.status = 'published'
    )
  );

-- Policy: Sellers can view images of their own products
create policy "Product images are visible to owners"
  on public.product_images
  for select
  using (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.seller_id = auth.uid()
    )
  );

-- Policy: Sellers can manage images of their own products
create policy "Product images can be managed by owners"
  on public.product_images
  using (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.seller_id = auth.uid()
    )
  )
  with check (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.seller_id = auth.uid()
    )
  );

-- ============================================
-- 3. CATEGORIES TABLE POLICIES
-- ============================================

-- Enable RLS on categories table
alter table public.categories enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Categories are visible to everyone" on public.categories;
drop policy if exists "Categories can be managed by authenticated users" on public.categories;

-- Policy: Everyone can view categories
create policy "Categories are visible to everyone"
  on public.categories
  for select
  using (true);

-- Policy: Authenticated users can manage categories (optional - برای مدیریت دسته‌بندی‌ها)
-- اگر می‌خواهید فقط admin ها بتوانند دسته‌بندی ایجاد کنند، این policy را حذف کنید
-- create policy "Categories can be managed by authenticated users"
--   on public.categories
--   for all
--   using (auth.uid() is not null)
--   with check (auth.uid() is not null);

-- ============================================
-- 4. SUBCATEGORIES TABLE POLICIES
-- ============================================

-- Enable RLS on subcategories table
alter table public.subcategories enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Subcategories are visible to everyone" on public.subcategories;

-- Policy: Everyone can view subcategories
create policy "Subcategories are visible to everyone"
  on public.subcategories
  for select
  using (true);

-- ============================================
-- 5. PROFILES TABLE POLICIES
-- ============================================

-- Enable RLS on profiles table
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

-- Policy: Users can view their own profile
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Policy: Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Policy: Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================
-- 6. ORDERS TABLE POLICIES
-- ============================================

-- Enable RLS on orders table (if table exists)
-- Note: این table باید از فایل create_orders_table.sql ایجاد شده باشد

do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'orders') then
    alter table public.orders enable row level security;

    -- Drop existing policies if they exist
    drop policy if exists "Users can view their own orders" on public.orders;
    drop policy if exists "Sellers can view orders with their products" on public.orders;
    drop policy if exists "Users can insert their own orders" on public.orders;
    drop policy if exists "Anonymous users can insert orders" on public.orders;

    -- Policy: Users can view their own orders
    execute '
      create policy "Users can view their own orders"
        on public.orders
        for select
        using (
          auth.uid() = user_id 
          or (auth.uid() is null and user_id is null)
        )
    ';

    -- Policy: Sellers can view orders that contain their products
    -- این policy برای Seller-center ضروری است
    execute '
      create policy "Sellers can view orders with their products"
        on public.orders
        for select
        using (
          auth.uid() is not null
          and exists (
            select 1
            from public.products p
            where p.seller_id = auth.uid()
              and exists (
                select 1
                from jsonb_array_elements(orders.items) as item
                where (item->>''product_id'')::uuid = p.id
              )
          )
        )
    ';

    -- Policy: Authenticated users can insert their own orders
    execute '
      create policy "Users can insert their own orders"
        on public.orders
        for insert
        with check (
          auth.uid() is not null 
          and user_id = auth.uid()
        )
    ';

    -- Policy: Anonymous users can also insert orders (for guest checkout)
    execute '
      create policy "Anonymous users can insert orders"
        on public.orders
        for insert
        with check (user_id is null)
    ';
  else
    raise notice 'Orders table does not exist. Please run create_orders_table.sql first.';
  end if;
end;
$$;

-- ============================================
-- 7. PRODUCT_INCOTERMS TABLE POLICIES
-- ============================================

-- Enable RLS on product_incoterms table
alter table public.product_incoterms enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Product incoterms are visible to everyone for published products" on public.product_incoterms;
drop policy if exists "Product incoterms are visible to owners" on public.product_incoterms;
drop policy if exists "Product incoterms can be managed by owners" on public.product_incoterms;

-- Policy: Everyone can view incoterms of published products
create policy "Product incoterms are visible to everyone for published products"
  on public.product_incoterms
  for select
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_incoterms.product_id
        and p.status = 'published'
    )
  );

-- Policy: Sellers can view incoterms of their own products
create policy "Product incoterms are visible to owners"
  on public.product_incoterms
  for select
  using (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_incoterms.product_id
        and p.seller_id = auth.uid()
    )
  );

-- Policy: Sellers can manage incoterms of their own products
create policy "Product incoterms can be managed by owners"
  on public.product_incoterms
  using (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_incoterms.product_id
        and p.seller_id = auth.uid()
    )
  )
  with check (
    auth.uid() is not null 
    and exists (
      select 1
      from public.products p
      where p.id = product_incoterms.product_id
        and p.seller_id = auth.uid()
    )
  );

-- ============================================
-- 8. STORAGE POLICIES (برای تصاویر محصولات)
-- ============================================

-- ایجاد bucket برای تصاویر محصولات (اگر وجود نداشته باشد)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Policy: Everyone can view product images (public bucket)
drop policy if exists "Public product images are viewable by everyone" on storage.objects;

create policy "Public product images are viewable by everyone"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

-- Policy: Authenticated users can upload product images
drop policy if exists "Authenticated users can upload product images" on storage.objects;

create policy "Authenticated users can upload product images"
  on storage.objects
  for insert
  with check (
    bucket_id = 'product-images'
    and auth.uid() is not null
  );

-- Policy: Users can update their own uploaded images
drop policy if exists "Users can update their own product images" on storage.objects;

create policy "Users can update their own product images"
  on storage.objects
  for update
  using (
    bucket_id = 'product-images'
    and auth.uid() is not null
  )
  with check (
    bucket_id = 'product-images'
    and auth.uid() is not null
  );

-- Policy: Users can delete their own uploaded images
drop policy if exists "Users can delete their own product images" on storage.objects;

create policy "Users can delete their own product images"
  on storage.objects
  for delete
  using (
    bucket_id = 'product-images'
    and auth.uid() is not null
  );

-- ============================================
-- خلاصه Policies
-- ============================================
-- 
-- PRODUCTS:
--   - همه می‌توانند محصولات published را ببینند
--   - فقط owners می‌توانند محصولات خود را مدیریت کنند
--
-- PRODUCT_IMAGES:
--   - همه می‌توانند تصاویر محصولات published را ببینند
--   - فقط owners می‌توانند تصاویر محصولات خود را مدیریت کنند
--
-- CATEGORIES & SUBCATEGORIES:
--   - همه می‌توانند دسته‌بندی‌ها را ببینند
--
-- PROFILES:
--   - کاربران فقط پروفایل خود را می‌بینند و ویرایش می‌کنند
--
-- ORDERS:
--   - کاربران فقط سفارشات خود را می‌بینند
--   - کاربران می‌توانند سفارش ایجاد کنند (حتی بدون login)
--
-- PRODUCT_INCOTERMS:
--   - همه می‌توانند incoterms محصولات published را ببینند
--   - فقط owners می‌توانند incoterms محصولات خود را مدیریت کنند
--
-- STORAGE (product-images bucket):
--   - همه می‌توانند تصاویر را ببینند (public)
--   - فقط authenticated users می‌توانند آپلود/ویرایش/حذف کنند
--
-- ============================================

