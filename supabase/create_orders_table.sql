-- Create orders table for buyers
-- Run this SQL in your Supabase SQL editor

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null,
  shipping_city text not null,
  postal_code text not null,
  notes text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(12, 2) not null,
  shipping_cost numeric(12, 2) not null default 0,
  total numeric(12, 2) not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Create index for user orders
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Enable RLS
alter table public.orders enable row level security;

-- Note: RLS policies برای orders در فایل rls_policies.sql تعریف شده‌اند
-- این policies شامل:
-- - Users can view their own orders
-- - Users can insert their own orders  
-- - Anonymous users can insert orders

-- Create function to update updated_at
create or replace function public.update_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

-- Create trigger
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row
  execute function public.update_orders_updated_at();

