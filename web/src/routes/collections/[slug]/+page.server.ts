import { error } from '@sveltejs/kit';
import { collectionBySlug } from '#lib/collections.js';
import { getVcCatalog, VC_FUNDS, VC_JOBS_SETTINGS } from '#lib/server/vcJobsEngine.js';
import type { Job } from '#lib/types.js';
import type { PageServerLoad } from './$types';

interface VcCollectionSpec {
  slug: string;
  title: string;
  category: string;
  description: string;
  matchJob: (job: Job) => boolean;
  matchFund: (fund: (typeof VC_FUNDS)[number]) => boolean;
}

const VC_COLLECTION_SPECS: Record<string, VcCollectionSpec> = {
  'tier-1-vc': {
    slug: 'tier-1-vc',
    title: 'Tier-1 Global & India Venture Funds',
    category: 'Fund Stage & Scale',
    description:
      'Flagship multi-stage and early-stage venture firms backing category-defining companies across India, the US, and Europe.',
    matchJob: (j) => j.collections.includes('tier-1-vc'),
    matchFund: (f) => f.collections.includes('tier-1-vc'),
  },
  'india-sea-vc': {
    slug: 'india-sea-vc',
    title: 'India & Southeast Asia VC Funds',
    category: 'Geography & Ecosystem',
    description:
      'Domestic and cross-border venture funds actively investing in Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, and Singapore.',
    matchJob: (j) => j.countries.includes('in') || j.collections.includes('india-sea-vc'),
    matchFund: (f) => f.hq_country === 'in' || f.collections.includes('india-sea-vc'),
  },
  'india-vc-funds': {
    slug: 'india-vc-funds',
    title: 'India & Southeast Asia VC Funds',
    category: 'Geography & Ecosystem',
    description:
      'Domestic and cross-border venture funds actively investing in Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, and Singapore.',
    matchJob: (j) => j.countries.includes('in') || j.collections.includes('india-sea-vc'),
    matchFund: (f) => f.hq_country === 'in' || f.collections.includes('india-sea-vc'),
  },
  'global-vc': {
    slug: 'global-vc',
    title: 'Global Multi-Stage & US/EU Funds',
    category: 'Geography & Ecosystem',
    description:
      'Silicon Valley, New York, London, Berlin, and global venture firms hiring investment, platform, and operations talent.',
    matchJob: (j) => !j.countries.includes('in') || j.countries.length > 1,
    matchFund: (f) => f.hq_country !== 'in',
  },
  'global-vc-funds': {
    slug: 'global-vc-funds',
    title: 'Global Multi-Stage & US/EU Funds',
    category: 'Geography & Ecosystem',
    description:
      'Silicon Valley, New York, London, Berlin, and global venture firms hiring investment, platform, and operations talent.',
    matchJob: (j) => !j.countries.includes('in') || j.countries.length > 1,
    matchFund: (f) => f.hq_country !== 'in',
  },
  'seed-vc': {
    slug: 'seed-vc',
    title: 'Seed, Pre-Seed & Micro-VC Specialists',
    category: 'Fund Stage & Scale',
    description:
      'Day-zero institutional seed funds, operator-led funds, and founder residencies backing technical and consumer founders first.',
    matchJob: (j) => j.collections.includes('seed-vc'),
    matchFund: (f) => f.collections.includes('seed-vc'),
  },
  'seed-early-stage': {
    slug: 'seed-early-stage',
    title: 'Seed, Pre-Seed & Micro-VC Specialists',
    category: 'Fund Stage & Scale',
    description:
      'Day-zero institutional seed funds, operator-led funds, and founder residencies backing technical and consumer founders first.',
    matchJob: (j) => j.collections.includes('seed-vc'),
    matchFund: (f) => f.collections.includes('seed-vc'),
  },
  'growth-crossover': {
    slug: 'growth-crossover',
    title: 'Growth Equity & Crossover Venture Funds',
    category: 'Fund Stage & Scale',
    description:
      'Late-stage and multi-stage venture funds backing breakout category leaders from Series B through pre-IPO.',
    matchJob: (j) => j.collections.includes('tier-1-vc') || j.collections.includes('global-vc'),
    matchFund: (f) => f.collections.includes('tier-1-vc') || f.collections.includes('global-vc'),
  },
  'investment-track': {
    slug: 'investment-track',
    title: 'Investment Team (Analyst to Partner)',
    category: 'Venture Career Track',
    description:
      'Deal sourcing, thesis research, financial due diligence, and board-level investment roles across venture funds.',
    matchJob: (j) => j.enrichment?.category === 'finance',
    matchFund: () => true,
  },
  'investment-team': {
    slug: 'investment-team',
    title: 'Investment Team (Analyst to Partner)',
    category: 'Venture Career Track',
    description:
      'Deal sourcing, thesis research, financial due diligence, and board-level investment roles across venture funds.',
    matchJob: (j) => j.enrichment?.category === 'finance',
    matchFund: () => true,
  },
  'platform-track': {
    slug: 'platform-track',
    title: 'VC Platform, Founder Success & Fund Ops',
    category: 'Venture Career Track',
    description:
      'Value-creation teams supporting portfolio companies on GTM, enterprise partnerships, community, and fund operations.',
    matchJob: (j) => j.enrichment?.category === 'operations',
    matchFund: () => true,
  },
  'platform-operations': {
    slug: 'platform-operations',
    title: 'VC Platform, Founder Success & Fund Ops',
    category: 'Venture Career Track',
    description:
      'Value-creation teams supporting portfolio companies on GTM, enterprise partnerships, community, and fund operations.',
    matchJob: (j) => j.enrichment?.category === 'operations',
    matchFund: () => true,
  },
  'portfolio-track': {
    slug: 'portfolio-track',
    title: 'Portfolio Growth, EIR & Technical Advisory',
    category: 'Venture Career Track',
    description:
      'Entrepreneur-in-Residence (EIR), venture studio, product, and AI/engineering leadership opportunities.',
    matchJob: (j) =>
      ['product', 'software_engineering', 'data_science'].includes(j.enrichment?.category ?? ''),
    matchFund: () => true,
  },
  'portfolio-eir': {
    slug: 'portfolio-eir',
    title: 'Portfolio Growth, EIR & Technical Advisory',
    category: 'Venture Career Track',
    description:
      'Entrepreneur-in-Residence (EIR), venture studio, product, and AI/engineering leadership opportunities.',
    matchJob: (j) =>
      ['product', 'software_engineering', 'data_science'].includes(j.enrichment?.category ?? ''),
    matchFund: () => true,
  },
  'talent-track': {
    slug: 'talent-track',
    title: 'Executive Search, Talent & Brand',
    category: 'Venture Career Track',
    description:
      'Portfolio leadership recruiting, marketing, content, communications, and investor relations tracks.',
    matchJob: (j) => ['recruiting', 'marketing', 'legal'].includes(j.enrichment?.category ?? ''),
    matchFund: () => true,
  },
  'talent-marketing': {
    slug: 'talent-marketing',
    title: 'Executive Search, Talent & Brand',
    category: 'Venture Career Track',
    description:
      'Portfolio leadership recruiting, marketing, content, communications, and investor relations tracks.',
    matchJob: (j) => ['recruiting', 'marketing', 'legal'].includes(j.enrichment?.category ?? ''),
    matchFund: () => true,
  },
  'google-sheet-curated': {
    slug: 'google-sheet-curated',
    title: 'Community & Google Sheet Synced Roles',
    category: 'Direct Submissions',
    description:
      'Roles added directly through our verified VC Jobs Google Sheet and employer community submissions.',
    matchJob: (j) => j.source === 'google_sheets',
    matchFund: () => true,
  },
};

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;
  const vcSpec = VC_COLLECTION_SPECS[slug];
  const fallbackCollection = !vcSpec ? collectionBySlug(slug) : undefined;

  if (!vcSpec && !fallbackCollection) {
    error(404, 'Collection not found');
  }

  const catalog = await getVcCatalog();
  const seenSlugs = new Set<string>();
  const uniqueJobs = catalog.jobs.filter((j) => {
    if (!j.public_slug || seenSlugs.has(j.public_slug)) return false;
    seenSlugs.add(j.public_slug);
    return true;
  });

  let matchedJobs: Job[] = [];
  let matchedFunds = VC_FUNDS.slice(0, 18);

  if (vcSpec) {
    matchedJobs = uniqueJobs.filter(vcSpec.matchJob);
    matchedFunds = VC_FUNDS.filter(vcSpec.matchFund).slice(0, 18);
  } else if (fallbackCollection) {
    const p = fallbackCollection.params;
    matchedJobs = uniqueJobs.filter((j) => {
      if (p.work_mode && j.work_mode !== p.work_mode) return false;
      if (p.countries && !j.countries.includes(p.countries)) return false;
      if (p.regions && !j.regions.includes(p.regions)) return false;
      if (p.category && j.enrichment?.category !== p.category) return false;
      if (p.seniority && j.enrichment?.seniority !== p.seniority) return false;
      if (p.collections && !j.collections.includes(p.collections)) return false;
      return true;
    });
    if (matchedJobs.length === 0) {
      matchedJobs = uniqueJobs.slice(0, 20);
    }
  }

  const lightweightJobs = matchedJobs.map((j) => ({
    ...j,
    description: j.description
      ? j.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280)
      : '',
  }));

  return {
    slug,
    collection: {
      title: vcSpec?.title ?? fallbackCollection?.title ?? slug,
      category: vcSpec?.category ?? 'Curated Venture Collection',
      description:
        vcSpec?.description ??
        fallbackCollection?.description ??
        'Curated venture capital roles and funds.',
    },
    jobs: lightweightJobs,
    funds: matchedFunds.map((f) => ({
      slug: f.slug,
      name: f.name,
      tagline: f.tagline,
      hq_country: f.hq_country,
      industries: f.industries,
      website: f.website,
    })),
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
  };
};
