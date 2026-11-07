// Company and source logos fall back cleanly to EntityLogo's built-in SVG monogram
// tile when no external logo proxy is configured.
export function companyLogoUrl(name: string): string | null {
  if (!name) return null;
  return null;
}

export function sourceLogoUrl(displayName: string, domain?: string): string | null {
  if (!displayName && !domain) return null;
  return null;
}

export const SOURCE_LOGO_DOMAINS: Record<string, string> = {
  successfactors: 'successfactors.com',
  zohorecruit: 'zoho.com',
  jazzhr: 'jazzhr.com',
  adpmyjobs: 'adp.com',
  applicantpro: 'applicantpro.com',
  '4dayweek': '4dayweek.io',
  isolvedhire: 'isolvedhcm.com',
  hrmdirect: 'hrmdirect.com',
  freshteam: 'freshworks.com',
  catsone: 'catsone.com',
  sber: 'sber.ru',
  alfabank: 'alfabank.ru',
  aijobs: 'aijobs.net',
  remotedotcom: 'remote.com',
  arc: 'arc.dev',
};
