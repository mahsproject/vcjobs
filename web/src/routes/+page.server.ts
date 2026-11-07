import { redirect } from '@sveltejs/kit';
import { serverApi } from '#lib/server/api.js';
import { isLegacyFeedUrl } from '#lib/legacyFeedUrl.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  if (isLegacyFeedUrl(url.searchParams)) redirect(301, `/jobs${url.search}`);

  const api = serverApi(fetch);
  const [counts, scale, jobsSlice, companiesSlice] = await Promise.allSettled([
    api.facetCounts(new URLSearchParams(), { facets: ['category', 'countries', 'seniority', 'work_mode'] }),
    api.catalogScale(),
    api.searchJobs(new URLSearchParams(), 150, 0),
    api.listCompanies('', 500, 0),
  ]);

  return {
    counts: counts.status === 'fulfilled' ? counts.value : null,
    scale: scale.status === 'fulfilled' ? scale.value : null,
    jobs: jobsSlice.status === 'fulfilled' ? jobsSlice.value.items : [],
    companies: companiesSlice.status === 'fulfilled' ? companiesSlice.value.items : [],
  };
};
