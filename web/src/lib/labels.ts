import type { Category } from './generated/contracts';

export function titleCase(value: string): string {
  return value
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const REGIONS: { code: string; short: string }[] = [
  { code: 'global', short: 'Worldwide' },
  { code: 'north_america', short: 'North America' },
  { code: 'latam', short: 'LATAM' },
  { code: 'eu', short: 'Europe' },
  { code: 'uk', short: 'UK' },
  { code: 'mena', short: 'MENA' },
  { code: 'africa', short: 'Africa' },
  { code: 'apac', short: 'India & APAC' },
  { code: 'cis', short: 'CIS' },
];

export const REGION_LABELS: Record<string, string> = Object.fromEntries(
  REGIONS.map((r) => [r.code, r.short]),
);

export const SENIORITY_LABELS: Record<string, string> = {
  intern: 'Intern / Fellow',
  junior: 'Analyst',
  mid: 'Associate',
  senior: 'VP / Senior Associate',
  lead: 'Principal / Director',
  c_level: 'Partner / MD',
};

export const ROLE_TYPE_LABELS: Record<string, string> = { people_manager: 'People manager' };

export const CLEARANCE_LEVEL_LABELS: Record<string, string> = {
  confidential: 'Confidential',
  secret: 'Secret',
  top_secret: 'Top Secret',
  ts_sci: 'Top Secret/SCI',
  public_trust: 'Public Trust',
  interim: 'Interim Clearances',
  other: 'Other',
};

export const EQUITY_LABELS: Record<string, string> = {
  salary_and_equity: 'Salary + carry/equity',
  equity_only: 'Carry / equity only',
};

export const SOURCE_TYPE_LABELS: Record<string, string> = {
  ats: 'VC Career Board (ATS)',
  company: 'Direct Fund Site',
  aggregator: 'Google Sheet / Curated',
  social: 'Community',
};

export const ENGLISH_LEVEL_LABELS: Record<string, string> = {
  a1: 'A1', a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1', c2: 'C2', native: 'Native', none: 'None',
};

export const EMPLOYMENT_LABELS: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
};

export const WORK_MODE_LABELS: Record<string, string> = { onsite: 'On-site' };

export const RELOCATION_LABELS: Record<string, string> = {
  not_supported: 'Not supported',
  supported: 'Supported',
  required: 'Required',
};

export const CATEGORY_LABELS: Record<string, string> = {
  software_engineering: 'Software Engineering',
  backend: 'Backend',
  frontend: 'Frontend',
  fullstack: 'Full-Stack',
  mobile: 'Mobile',
  devops: 'DevOps',
  sre: 'SRE',
  network_engineering: 'Network Engineering',
  it_support: 'IT Support / Help Desk',
  data_engineering: 'Data Engineering',
  data_science: 'Data & Research',
  data_analytics: 'Data Analytics',
  ml_ai: 'ML / AI',
  ai_engineering: 'AI Engineering',
  qa: 'QA',
  security: 'Security',
  hardware: 'Hardware',
  embedded: 'Embedded',
  blockchain: 'Blockchain / Web3',
  architecture: 'Architecture',
  design: 'Design',
  creative: 'Creative & Media',
  engineering_design: 'Engineering Design',
  industrial_engineering: 'Industrial Engineering',
  occupational_safety: 'Health & Safety (HSE)',
  healthcare: 'Healthcare & Bio',
  skilled_trades: 'Skilled Trades',
  retail: 'Retail',
  hospitality: 'Hospitality',
  logistics: 'Logistics',
  education: 'Education',
  personal_services: 'Personal Services',
  administration: 'Executive Support',
  social_services: 'Impact & ESG',
  science: 'DeepTech & Science',
  manufacturing: 'Manufacturing',
  public_safety: 'Public Safety',
  product: 'Product & EIR',
  project_management: 'Program Management',
  marketing: 'Marketing & Community',
  sales: 'Business Development',
  support: 'Portfolio Support',
  business_analysis: 'Market Research',
  solutions_engineering: 'Solutions Engineering',
  developer_relations: 'Developer Relations',
  technical_writing: 'Content & Research',
  recruiting: 'Portfolio Talent',
  hr: 'People & HR',
  finance: 'Investment',
  legal: 'Fund Legal & Compliance',
  operations: 'Platform & Operations',
  customer_success: 'Founder Success',
  other: 'Other',
} satisfies Record<Category, string>;

export function categoryLabel(value: string): string {
  return CATEGORY_LABELS[value] ?? titleCase(value);
}

export const DOMAIN_LABELS: Record<string, string> = {
  fintech: 'FinTech & Venture',
  ecommerce: 'Consumer & D2C',
  gamedev: 'Gaming',
  edtech: 'EdTech',
  adtech: 'AdTech',
  govtech: 'GovTech',
  healthcare: 'HealthTech & Bio',
  devtools: 'B2B SaaS & DevTools',
  cybersecurity: 'Cybersecurity',
  ai: 'AI & Foundation Models',
  hrtech: 'Future of Work',
  proptech: 'PropTech',
  climatetech: 'ClimateTech',
};

export const COMPANY_TYPE_LABELS: Record<string, string> = { inhouse: 'Venture Fund' };

export const EDUCATION_LEVEL_LABELS: Record<string, string> = {
  bachelor: "Bachelor's degree",
  master: "Master's / MBA",
  phd: 'PhD',
};

export const CERTIFICATION_LABELS: Record<string, string> = {
  'aws-solutions-architect': 'AWS Certified Solutions Architect',
  'aws-developer': 'AWS Certified Developer',
  'aws-sysops-administrator': 'AWS Certified SysOps Administrator',
  'aws-cloud-practitioner': 'AWS Certified Cloud Practitioner',
  'azure-fundamentals': 'Azure Fundamentals',
  'azure-administrator': 'Azure Administrator Associate',
  'azure-solutions-architect': 'Azure Solutions Architect Expert',
  'gcp-cloud-architect': 'Google Cloud Professional Cloud Architect',
  'gcp-cloud-engineer': 'Google Cloud Associate Cloud Engineer',
  pmp: 'PMP',
  cka: 'Certified Kubernetes Administrator (CKA)',
  ckad: 'Certified Kubernetes Application Developer (CKAD)',
  cissp: 'CISSP',
  'comptia-security-plus': 'CompTIA Security+',
  'comptia-network-plus': 'CompTIA Network+',
  'scrum-master': 'Scrum Master',
};

export const AI_ARCHETYPE_LABELS: Record<string, string> = {
  rag_app_builder: 'RAG Application Builder',
  agent_builder: 'Agent Builder',
  cloud_ml_platform_engineer: 'Cloud/ML Platform Engineer',
  ml_trainer_researcher: 'ML Trainer/Researcher',
  fullstack_ai_engineer: 'Full-Stack AI Engineer',
  devops_infra_engineer: 'DevOps/Infra Engineer',
};
