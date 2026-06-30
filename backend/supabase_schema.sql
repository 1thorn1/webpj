-- 요원 테이블
create table agents (
  uuid        text primary key,
  name        text not null,
  role        text not null,        -- Duelist / Initiator / Controller / Sentinel
  description text,
  icon_url    text,
  updated_at  timestamptz default now()
);

-- 맵 테이블
create table maps (
  uuid        text primary key,
  name        text not null,
  description text,
  image_url   text,
  updated_at  timestamptz default now()
);

-- 추천 히스토리 테이블
create table recommendations (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  map         text not null,
  playstyle   text,
  agents      text[],
  reason      text,
  created_at  timestamptz default now()
);

-- 히스토리는 본인만 조회 가능하도록 RLS
alter table recommendations enable row level security;

create policy "본인 히스토리만 조회"
  on recommendations for select
  using (auth.uid() = user_id);

create policy "본인만 저장"
  on recommendations for insert
  with check (auth.uid() = user_id);
