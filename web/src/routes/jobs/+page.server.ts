import { serverApi } from '#lib/server/api.js';
import { getVcCatalog, VC_JOBS_SETTINGS } from '#lib/server/vcJobsEngine.js';
import { parsePage } from '#lib/pagination.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  const api = serverApi(fetch);
  const pageNumber = parsePage(url.searchParams);

  const [catalog, companiesRes] = await Promise.all([
    getVcCatalog(),
    api.listCompanies('', 500, 0).catch(() => ({ items: [], total: 0 })),
  ]);

  const seenSlugs = new Set<string>();
  const lightweightJobs = catalog.jobs
    .filter((j) => {
      if (!j.public_slug || seenSlugs.has(j.public_slug)) return false;
      seenSlugs.add(j.public_slug);
      return true;
    })
    .map((j) => ({
      ...j,
      description: j.description
        ? j.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 320)
        : '',
    }));

  return {
    jobs: lightweightJobs,
    companies: companiesRes.items,
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
    sheetId: VC_JOBS_SETTINGS.sheetId,
    lastSyncedAt: new Date(catalog.fetchedAt).toISOString(),
    pageNumber,
    initialQuery: {
      q: url.searchParams.get('q') ?? '',
      track: url.searchParams.get('track') ?? '',
      category: url.searchParams.get('category') ?? '',
      countries: url.searchParams.get('countries') ?? '',
      regions: url.searchParams.get('regions') ?? '',
      work_mode: url.searchParams.get('work_mode') ?? '',
      company_slug: url.searchParams.get('company_slug') ?? '',
      source: url.searchParams.get('source') ?? '',
      collections: url.searchParams.get('collections') ?? '',
    },
  };
};
