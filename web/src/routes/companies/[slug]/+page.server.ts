import { error } from '@sveltejs/kit';
import {
  getVcCatalog,
  VC_FUNDS,
  VC_JOBS_SETTINGS,
  safeExternalUrl,
  isTrustedJobApplyUrl,
  isTestOrJunkText,
} from '#lib/server/vcJobsEngine.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const catalog = await getVcCatalog();
  const slug = params.slug;
  const fund = VC_FUNDS.find((f) => f.slug === slug);

  if (!fund) {
    error(404, 'Venture Capital Fund not found');
  }

  const companyJobs = catalog.jobs.filter(
    (j) =>
      j.company_slug === slug &&
      !isTestOrJunkText(j.title) &&
      isTrustedJobApplyUrl(j.url),
  );

  const website = fund.website ? safeExternalUrl(fund.website) : undefined;
  const careersUrl = fund.careersUrl ? safeExternalUrl(fund.careersUrl) : website;

  return {
    slug,
    fund: {
      slug,
      name: fund.name,
      tagline: fund.tagline,
      hq_country: fund.hq_country,
      website,
      careersUrl,
      industries: fund.industries,
      collections: fund.collections,
    },
    jobs: companyJobs,
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
  };
};
