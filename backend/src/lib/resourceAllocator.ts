import { PLAN_DEFINITIONS, type PlanCode } from '../../../shared/index.js';

export type ResourceAllocation = {
  planCode: PlanCode;
  ramGb: number;
  cpuCores: number;
  storageGb: number;
  ports: number;
};

export function getPlanLimits(planCode: PlanCode) {
  return PLAN_DEFINITIONS[planCode];
}

export function canCreateServer(planCode: PlanCode, requested: Omit<ResourceAllocation, 'planCode'>) {
  const plan = getPlanLimits(planCode);

  if (requested.ramGb > plan.ramGb) return { allowed: false, reason: 'RAM exceeds plan limits.' };
  if (requested.cpuCores > plan.cpuCores) return { allowed: false, reason: 'CPU exceeds plan limits.' };
  if (requested.storageGb > plan.storageGb) return { allowed: false, reason: 'Storage exceeds plan limits.' };

  return { allowed: true, reason: 'OK' };
}

export function reserveResourcesForServer(planCode: PlanCode, requested: Omit<ResourceAllocation, 'planCode'>) {
  const validation = canCreateServer(planCode, requested);
  if (!validation.allowed) {
    return { ok: false, error: validation.reason };
  }

  return {
    ok: true,
    reserved: {
      planCode,
      ramGb: requested.ramGb,
      cpuCores: requested.cpuCores,
      storageGb: requested.storageGb,
      ports: requested.ports,
    },
  };
}
