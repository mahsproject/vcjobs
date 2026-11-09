import { error } from '@sveltejs/kit';
import { serverApi } from '#lib/server/api.js';
import { companyFiltersFromParams, companyFiltersToParams } from '#lib/companyFilters.js';
import { pageExists, pageOffset, pageWithinWindow, parsePage } from '#lib/pagination.js';
import { getVcCatalog, VC_FUNDS } from '#lib/server/vcJobsEngine.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  const facets = companyFiltersToParams(companyFiltersFromParams(url.searchParams));
  const pageNumber = parsePage(url.searchParams);
  if (!pageWithinWindow(pageNumber)) error(404, 'Page not found');

  try {
    const initial = await serverApi(fetch).listCompanies('', 500, pageOffset(pageNumber), facets);
    if (!pageExists(pageNumber, initial.total)) error(404, 'Page not found');
    return { initial, pageNumber };
  } catch {
    const catalog = await getVcCatalog();
    const jobs = catalog.jobs;
    const items = VC_FUNDS.map((f) => ({
      slug: f.slug,
      name: f.name,
      job_count: jobs.filter((j) => j.company_slug === f.slug).length,
      tagline: f.tagline,
      industries: f.industries,
      hq_country: f.hq_country,
      collections: f.collections,
      feedback_count: 0,
      feedback_rating_avg: null,
    }));
    return {
      initial: { items, total: items.length },
      pageNumber,
    };
  }
};
