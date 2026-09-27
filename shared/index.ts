export type PlanCode =
  | 'free'
  | 'starter'
  | 'basic'
  | 'advanced'
  | 'pro'
  | 'pro_plus'
  | 'ultra'
  | 'ultra_plus'
  | 'titan'
  | 'titan_plus';

export interface PlanDefinition {
  code: PlanCode;
  name: string;
  price: number;
  ramGb: number;
  cpuCores: number;
  storageGb: number;
  maxServers: number;
  maxPorts: number;
  backups: number;
  databases: number;
  priority: 'Low' | 'Normal' | 'Normal+' | 'High' | 'Very High' | 'Maximum';
  isFree?: boolean;
}

export const PLAN_DEFINITIONS: Record<PlanCode, PlanDefinition> = {
  free: {
    code: 'free',
    name: 'FREE',
    price: 0,
    ramGb: 4,
    cpuCores: 2,
    storageGb: 15,
    maxServers: 1,
    maxPorts: 1,
    backups: 3,
    databases: 0,
    priority: 'Low',
    isFree: true,
  },
  starter: {
    code: 'starter',
    name: 'STARTER',
    price: 4.5,
    ramGb: 6,
    cpuCores: 3,
    storageGb: 25,
    maxServers: 1,
    maxPorts: 2,
    backups: 5,
    databases: 1,
    priority: 'Normal',
  },
  basic: {
    code: 'basic',
    name: 'BASIC',
    price: 7.5,
    ramGb: 8,
    cpuCores: 4,
    storageGb: 40,
    maxServers: 1,
    maxPorts: 3,
    backups: 7,
    databases: 1,
    priority: 'Normal',
  },
  advanced: {
    code: 'advanced',
    name: 'ADVANCED',
    price: 10,
    ramGb: 10,
    cpuCores: 4,
    storageGb: 60,
    maxServers: 2,
    maxPorts: 4,
    backups: 10,
    databases: 2,
    priority: 'Normal+',
  },
  pro: {
    code: 'pro',
    name: 'PRO',
    price: 13.5,
    ramGb: 12,
    cpuCores: 6,
    storageGb: 80,
    maxServers: 2,
    maxPorts: 5,
    backups: 12,
    databases: 2,
    priority: 'High',
  },
  pro_plus: {
    code: 'pro_plus',
    name: 'PRO+',
    price: 17.5,
    ramGb: 16,
    cpuCores: 6,
    storageGb: 120,
    maxServers: 3,
    maxPorts: 6,
    backups: 15,
    databases: 3,
    priority: 'High',
  },
  ultra: {
    code: 'ultra',
    name: 'ULTRA',
    price: 21,
    ramGb: 20,
    cpuCores: 8,
    storageGb: 160,
    maxServers: 3,
    maxPorts: 8,
    backups: 20,
    databases: 4,
    priority: 'High',
  },
  ultra_plus: {
    code: 'ultra_plus',
    name: 'ULTRA+',
    price: 25,
    ramGb: 24,
    cpuCores: 10,
    storageGb: 200,
    maxServers: 4,
    maxPorts: 10,
    backups: 25,
    databases: 5,
    priority: 'Very High',
  },
  titan: {
    code: 'titan',
    name: 'TITAN',
    price: 30,
    ramGb: 32,
    cpuCores: 12,
    storageGb: 300,
    maxServers: 5,
    maxPorts: 12,
    backups: 30,
    databases: 6,
    priority: 'Very High',
  },
  titan_plus: {
    code: 'titan_plus',
    name: 'TITAN+',
    price: 35,
    ramGb: 48,
    cpuCores: 16,
    storageGb: 500,
    maxServers: 8,
    maxPorts: 20,
    backups: 50,
    databases: 10,
    priority: 'Maximum',
  },
};

export const PLAN_LIST = Object.values(PLAN_DEFINITIONS);
