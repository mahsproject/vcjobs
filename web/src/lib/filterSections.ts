import { CATEGORY_VALUES, FACET_ALIASES, type Category } from './generated/contracts';
import { optionMatches } from './facets';
import { categoryLabel } from './labels';

export type RailSection = 'SAVED' | 'ROLE' | 'PAY & BENEFITS' | 'REQUIREMENTS & ELIGIBILITY' | 'FILTERS';

/** Display order of the specialization section headings — VC core functions first. */
const CATEGORY_GROUP_ORDER = [
  'Business & Legal',
  'Go-to-market & Support',
  'People',
  'Product & Management',
  'Data & AI',
  'Engineering',
  'Design & Creative',
  'Quality & Security',
  'Consumer & Services',
  'Other',
] as const;

type CategoryGroup = (typeof CATEGORY_GROUP_ORDER)[number];

const CATEGORY_GROUP: Record<Category, CategoryGroup> = {
  software_engineering: 'Engineering',
  backend: 'Engineering',
  frontend: 'Engineering',
  fullstack: 'Engineering',
  mobile: 'Engineering',
  devops: 'Engineering',
  sre: 'Engineering',
  network_engineering: 'Engineering',
  it_support: 'Engineering',
  hardware: 'Engineering',
  embedded: 'Engineering',
  blockchain: 'Engineering',
  architecture: 'Engineering',
  data_engineering: 'Data & AI',
  data_science: 'Data & AI',
  data_analytics: 'Data & AI',
  ml_ai: 'Data & AI',
  ai_engineering: 'Data & AI',
  qa: 'Quality & Security',
  security: 'Quality & Security',
  design: 'Design & Creative',
  creative: 'Design & Creative',
  engineering_design: 'Design & Creative',
  industrial_engineering: 'Engineering',
  occupational_safety: 'Quality & Security',
  healthcare: 'Consumer & Services',
  skilled_trades: 'Consumer & Services',
  retail: 'Consumer & Services',
  hospitality: 'Consumer & Services',
  logistics: 'Consumer & Services',
  education: 'Consumer & Services',
  personal_services: 'Consumer & Services',
  administration: 'Consumer & Services',
  social_services: 'Consumer & Services',
  manufacturing: 'Consumer & Services',
  public_safety: 'Consumer & Services',
  science: 'Engineering',
  product: 'Product & Management',
  project_management: 'Product & Management',
  business_analysis: 'Product & Management',
  technical_writing: 'Product & Management',
  marketing: 'Go-to-market & Support',
  sales: 'Go-to-market & Support',
  support: 'Go-to-market & Support',
  solutions_engineering: 'Go-to-market & Support',
  developer_relations: 'Go-to-market & Support',
  recruiting: 'People',
  hr: 'People',
  finance: 'Business & Legal',
  legal: 'Business & Legal',
  operations: 'Business & Legal',
  customer_success: 'Business & Legal',
  other: 'Other',
};

interface CategorySectionOption {
  value: Category;
  label: string;
}

export interface CategorySection {
  name: CategoryGroup;
  options: CategorySectionOption[];
}

export const CATEGORY_GROUPS: CategorySection[] = CATEGORY_GROUP_ORDER.map((name) => ({
  name,
  options: CATEGORY_VALUES.filter((v) => CATEGORY_GROUP[v] === name).map((value) => ({
    value,
    label: categoryLabel(value),
  })),
})).filter((s) => s.options.length > 0);

export function searchCategoryGroups(query: string): CategorySection[] {
  if (!query.trim()) return CATEGORY_GROUPS;
  return CATEGORY_GROUPS.map((g) => ({
    ...g,
    options: g.options.filter((o) => optionMatches(o, query, FACET_ALIASES)),
  })).filter((g) => g.options.length > 0);
}

export const RAIL_SECTIONS: RailSection[] = ['ROLE', 'PAY & BENEFITS', 'REQUIREMENTS & ELIGIBILITY'];

type RailKind =
  | 'facet'
  | 'category'
  | 'location'
  | 'salary'
  | 'work'
  | 'industry'
  | 'language'
  | 'relocation'
  | 'posted'
  | 'experience'
  | 'saved';

export interface RailEntry {
  key: string;
  label: string;
  section: RailSection;
  kind: RailKind;
  facetParam?: string;
}

export interface RailGroup {
  key: string;
  label: string;
  params: string[];
}

export const TALENT_RAIL_GROUPS: RailGroup[] = [
  { key: 'specializations', label: 'Open to', params: ['specializations'] },
  { key: 'skills', label: 'Skills', params: ['skills'] },
  { key: 'seniorities', label: 'Grade', params: ['seniorities'] },
  { key: 'categories', label: 'Has worked in', params: ['categories'] },
  { key: 'location', label: 'Location', params: ['tz', 'cities'] },
];

export const COMPANY_RAIL_GROUPS: RailGroup[] = [
  { key: 'collections', label: 'Collection', params: ['collections'] },
  { key: 'region', label: 'Region', params: ['regions', 'remote_regions'] },
  { key: 'countries', label: 'Country', params: ['countries'] },
  { key: 'industries', label: 'Industry', params: ['industries'] },
  { key: 'company', label: 'Fund Profile', params: ['company_type', 'company_size', 'maturity'] },
  { key: 'yc', label: 'Y Combinator', params: ['yc_status', 'yc_stage', 'yc_flags', 'yc_batch'] },
];

export const RAIL: RailEntry[] = [
  { key: 'category', label: 'Role Category', section: 'ROLE', kind: 'category' },
  { key: 'experience', label: 'Seniority & Experience', section: 'ROLE', kind: 'experience' },
  { key: 'posted', label: 'Posted', section: 'ROLE', kind: 'posted' },
  { key: 'location', label: 'Location', section: 'ROLE', kind: 'location' },
  { key: 'work', label: 'Work Mode & Type', section: 'ROLE', kind: 'work' },
  { key: 'skills', label: 'Focus & Skills', section: 'ROLE', kind: 'facet', facetParam: 'skills' },
  { key: 'industry', label: 'Sector & Collection', section: 'ROLE', kind: 'industry' },
  { key: 'company_slug', label: 'VC Fund', section: 'ROLE', kind: 'facet', facetParam: 'company_slug' },
  { key: 'source', label: 'Source', section: 'ROLE', kind: 'facet', facetParam: 'source' },
  { key: 'salary', label: 'Compensation', section: 'PAY & BENEFITS', kind: 'salary' },
  { key: 'perks', label: 'Benefits & Perks', section: 'PAY & BENEFITS', kind: 'facet', facetParam: 'perks' },
  { key: 'language', label: 'Language', section: 'REQUIREMENTS & ELIGIBILITY', kind: 'language' },
  { key: 'relocation', label: 'Relocation', section: 'REQUIREMENTS & ELIGIBILITY', kind: 'relocation' },
];
