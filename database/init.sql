# Database schema for FreeMine Hosting
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  code VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  ram_gb INTEGER NOT NULL,
  cpu_cores INTEGER NOT NULL,
  storage_gb INTEGER NOT NULL,
  max_servers INTEGER NOT NULL,
  max_ports INTEGER NOT NULL,
  backups INTEGER NOT NULL,
  databases INTEGER NOT NULL,
  priority VARCHAR(64) NOT NULL,
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  discord_connected BOOLEAN NOT NULL DEFAULT FALSE,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS discord_accounts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  discord_user_id VARCHAR(64) UNIQUE NOT NULL,
  username VARCHAR(255),
  avatar VARCHAR(255),
  connected_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS discord_invites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  discord_user_id VARCHAR(64) NOT NULL,
  invite_code VARCHAR(255) NOT NULL,
  inviter_id VARCHAR(64),
  joined_at TIMESTAMP,
  verified_at TIMESTAMP,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, invite_code)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES plans(id),
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(64) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(8) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  provider_reference VARCHAR(255),
  webhook_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nodes (
  id UUID PRIMARY KEY,
  name VARCHAR(128) UNIQUE NOT NULL,
  cpu_total INTEGER NOT NULL,
  cpu_used INTEGER NOT NULL DEFAULT 0,
  ram_total_gb INTEGER NOT NULL,
  ram_used_gb INTEGER NOT NULL DEFAULT 0,
  storage_total_gb INTEGER NOT NULL,
  storage_used_gb INTEGER NOT NULL DEFAULT 0,
  total_servers INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'online',
  network_rx_mbps NUMERIC(12,2) NOT NULL DEFAULT 0,
  network_tx_mbps NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ports (
  id UUID PRIMARY KEY,
  port INTEGER NOT NULL UNIQUE,
  status VARCHAR(32) NOT NULL DEFAULT 'available',
  server_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS servers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  node_id UUID REFERENCES nodes(id),
  plan_code VARCHAR(64) REFERENCES plans(code),
  name VARCHAR(128) NOT NULL,
  version VARCHAR(64) NOT NULL,
  software VARCHAR(64) NOT NULL DEFAULT 'paper',
  ram_gb INTEGER NOT NULL,
  cpu_cores INTEGER NOT NULL,
  storage_gb INTEGER NOT NULL,
  port INTEGER REFERENCES ports(port),
  status VARCHAR(32) NOT NULL DEFAULT 'installing',
  domain VARCHAR(255),
  docker_container VARCHAR(255),
  docker_volume VARCHAR(255),
  ip_address VARCHAR(255),
  eula_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS server_resources (
  id UUID PRIMARY KEY,
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  cpu_usage_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  ram_usage_gb NUMERIC(10,2) NOT NULL DEFAULT 0,
  storage_usage_gb NUMERIC(10,2) NOT NULL DEFAULT 0,
  players INTEGER NOT NULL DEFAULT 0,
  max_players INTEGER NOT NULL DEFAULT 20,
  tps NUMERIC(5,2) NOT NULL DEFAULT 20,
  uptime_seconds INTEGER NOT NULL DEFAULT 0,
  network_rx_mbps NUMERIC(12,2) NOT NULL DEFAULT 0,
  network_tx_mbps NUMERIC(12,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS backups (
  id UUID PRIMARY KEY,
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(32) NOT NULL DEFAULT 'completed'
);

CREATE TABLE IF NOT EXISTS plugins (
  id UUID PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  version VARCHAR(64),
  description TEXT,
  minecraft_versions VARCHAR(255),
  download_url TEXT,
  source VARCHAR(64) NOT NULL DEFAULT 'modrinth',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS server_plugins (
  id UUID PRIMARY KEY,
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  plugin_id UUID REFERENCES plugins(id) ON DELETE CASCADE,
  installed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  version VARCHAR(64),
  status VARCHAR(32) NOT NULL DEFAULT 'installed'
);

CREATE TABLE IF NOT EXISTS worlds (
  id UUID PRIMARY KEY,
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  type VARCHAR(64) NOT NULL DEFAULT 'normal',
  seed VARCHAR(255),
  world_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS databases (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  username VARCHAR(128) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  host VARCHAR(255) NOT NULL,
  port INTEGER NOT NULL DEFAULT 3306,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY,
  server_id UUID REFERENCES servers(id),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(128) NOT NULL,
  severity VARCHAR(32) NOT NULL DEFAULT 'warning',
  details TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_servers_user_id ON servers(user_id);
CREATE INDEX IF NOT EXISTS idx_servers_status ON servers(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_nodes_status ON nodes(status);
CREATE INDEX IF NOT EXISTS idx_discord_invites_user_id ON discord_invites(user_id);
