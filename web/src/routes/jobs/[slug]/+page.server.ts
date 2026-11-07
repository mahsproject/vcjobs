import { error } from '@sveltejs/kit';
import {
  getVcCatalog,
  VC_FUNDS,
  VC_JOBS_SETTINGS,
  sanitizeJobHtml,
  safeExternalUrl,
  isTrustedJobApplyUrl,
  isTestOrJunkText,
} from '#lib/server/vcJobsEngine.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const catalog = await getVcCatalog();
  const job = catalog.jobs.find((j) => j.public_slug === params.slug);
  if (!job || isTestOrJunkText(job.title) || isTestOrJunkText(job.company) || !isTrustedJobApplyUrl(job.url)) {
    error(404, 'Role not found');
  }

  const fund = VC_FUNDS.find((f) => f.slug === job.company_slug);
  const similar = catalog.jobs
    .filter(
      (j) =>
        j.public_slug !== job.public_slug &&
        isTrustedJobApplyUrl(j.url) &&
        (j.company_slug === job.company_slug ||
          j.enrichment?.category === job.enrichment?.category),
    )
    .slice(0, 4);

  return {
    job: {
      ...job,
      url: safeExternalUrl(job.url, fund?.careersUrl || fund?.website || '/jobs'),
      description: sanitizeJobHtml(job.description),
    },
    fund: fund ?? null,
    similar,
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
  };
};
