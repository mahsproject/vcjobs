import { getVcCatalog, VC_FUNDS, VC_JOBS_SETTINGS } from '#lib/server/vcJobsEngine.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const catalog = await getVcCatalog();
  const indiaFunds = VC_FUNDS.filter((f) => f.hq_country === 'in').length;
  const globalFunds = VC_FUNDS.length - indiaFunds;

  return {
    totalJobs: catalog.jobs.length,
    totalFunds: VC_FUNDS.length,
    indiaFunds,
    globalFunds,
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
    sheetId: VC_JOBS_SETTINGS.sheetId,
    lastSyncedAt: new Date(catalog.fetchedAt).toISOString(),
  };
};
