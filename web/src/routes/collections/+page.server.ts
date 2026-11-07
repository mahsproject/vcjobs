import { getVcCatalog, VC_FUNDS, VC_JOBS_SETTINGS } from '#lib/server/vcJobsEngine.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const catalog = await getVcCatalog();
  const jobs = catalog.jobs;

  const collections = [
    {
      slug: 'tier-1-vc',
      title: 'Tier-1 Global & India Venture Funds',
      category: 'Fund Stage & Scale',
      description: 'Flagship multi-stage and early-stage venture firms backing category-defining companies across India, the US, and Europe.',
      fundCount: VC_FUNDS.filter((f) => f.collections.includes('tier-1-vc')).length,
      jobCount: jobs.filter((j) => j.collections.includes('tier-1-vc')).length,
      href: '/jobs?collections=tier-1-vc',
    },
    {
      slug: 'india-sea-vc',
      title: 'India & Southeast Asia VC Funds',
      category: 'Geography & Ecosystem',
      description: 'Domestic and cross-border venture funds actively investing in Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, and Singapore.',
      fundCount: VC_FUNDS.filter((f) => f.collections.includes('india-sea-vc') || f.hq_country === 'in').length,
      jobCount: jobs.filter((j) => j.countries.includes('in') || j.collections.includes('india-sea-vc')).length,
      href: '/jobs?countries=in',
    },
    {
      slug: 'global-vc',
      title: 'Global Multi-Stage & US/EU Funds',
      category: 'Geography & Ecosystem',
      description: 'Silicon Valley, New York, London, Berlin, and global venture firms hiring investment, platform, and operations talent.',
      fundCount: VC_FUNDS.filter((f) => f.hq_country !== 'in').length,
      jobCount: jobs.filter((j) => !j.countries.includes('in') || j.countries.length > 1).length,
      href: '/jobs?collections=global-vc',
    },
    {
      slug: 'seed-vc',
      title: 'Seed, Pre-Seed & Micro-VC Specialists',
      category: 'Fund Stage & Scale',
      description: 'Day-zero institutional seed funds, operator-led funds, and founder residencies backing technical and consumer founders first.',
      fundCount: VC_FUNDS.filter((f) => f.collections.includes('seed-vc')).length,
      jobCount: jobs.filter((j) => j.collections.includes('seed-vc')).length,
      href: '/jobs?collections=seed-vc',
    },
    {
      slug: 'investment-track',
      title: 'Investment Team (Analyst to Partner)',
      category: 'Venture Career Track',
      description: 'Deal sourcing, thesis research, financial due diligence, and board-level investment roles across venture funds.',
      fundCount: VC_FUNDS.length,
      jobCount: jobs.filter((j) => j.enrichment?.category === 'finance').length,
      href: '/jobs?track=investment',
    },
    {
      slug: 'platform-track',
      title: 'VC Platform, Founder Success & Fund Ops',
      category: 'Venture Career Track',
      description: 'Value-creation teams supporting portfolio companies on GTM, enterprise partnerships, community, and fund operations.',
      fundCount: VC_FUNDS.length,
      jobCount: jobs.filter((j) => j.enrichment?.category === 'operations').length,
      href: '/jobs?track=platform',
    },
    {
      slug: 'portfolio-track',
      title: 'Portfolio Growth, EIR & Technical Advisory',
      category: 'Venture Career Track',
      description: 'Entrepreneur-in-Residence (EIR), venture studio, product, and AI/engineering leadership opportunities.',
      fundCount: VC_FUNDS.length,
      jobCount: jobs.filter((j) =>
        ['product', 'software_engineering', 'data_science'].includes(j.enrichment?.category ?? ''),
      ).length,
      href: '/jobs?track=portfolio',
    },
    {
      slug: 'talent-track',
      title: 'Executive Search, Talent & Brand',
      category: 'Venture Career Track',
      description: 'Portfolio leadership recruiting, marketing, content, communications, and investor relations tracks.',
      fundCount: VC_FUNDS.length,
      jobCount: jobs.filter((j) =>
        ['recruiting', 'marketing', 'legal'].includes(j.enrichment?.category ?? ''),
      ).length,
      href: '/jobs?track=talent',
    },
    {
      slug: 'google-sheet-curated',
      title: 'Community & Google Sheet Synced Roles',
      category: 'Direct Submissions',
      description: 'Roles added directly through our verified VC Jobs Google Sheet and employer community submissions.',
      fundCount: VC_FUNDS.length,
      jobCount: jobs.filter((j) => j.source === 'google_sheets').length,
      href: '/jobs?source=google_sheets',
    },
  ];

  return {
    collections,
    totalJobs: jobs.length,
    totalFunds: VC_FUNDS.length,
    whatsappUrl: catalog.updatesUrl || VC_JOBS_SETTINGS.defaultUpdatesUrl,
    postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
  };
};
