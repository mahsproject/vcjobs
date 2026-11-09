import { redirect } from '@sveltejs/kit';
import { serverApi } from '#lib/server/api.js';
import { getVcCatalog, VC_FUNDS } from '#lib/server/vcJobsEngine.js';
import { isLegacyFeedUrl } from '#lib/legacyFeedUrl.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  if (isLegacyFeedUrl(url.searchParams)) redirect(301, `/jobs${url.search}`);

  const api = serverApi(fetch);
  const [counts, scale, jobsSlice, companiesSlice, directCatalog] = await Promise.allSettled([
    api.facetCounts(new URLSearchParams(), { facets: ['category', 'countries', 'seniority', 'work_mode'] }),
    api.catalogScale(),
    api.searchJobs(new URLSearchParams(), 150, 0),
    api.listCompanies('', 500, 0),
    getVcCatalog(),
  ]);

  const directJobs = directCatalog.status === 'fulfilled' ? directCatalog.value.jobs : [];
  const apiJobs = jobsSlice.status === 'fulfilled' ? jobsSlice.value.items : [];
  const jobs = apiJobs.length > 0 ? apiJobs : directJobs;

  const apiCompanies = companiesSlice.status === 'fulfilled' ? companiesSlice.value.items : [];
  const companies =
    apiCompanies.length > 0
      ? apiCompanies
      : VC_FUNDS.map((f) => ({
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
    counts: counts.status === 'fulfilled' ? counts.value : null,
    scale: scale.status === 'fulfilled' ? scale.value : null,
    jobs,
    companies,
  };
};
