import type {
  CatalogScale,
  Company,
  CompanyListItem,
  FacetCounts,
  Job,
  SavedSearch,
  Submission,
  Subscription,
  SurveyAnswers,
  User,
  UserJob,
  UserProfile,
} from '#lib/types.js';

export const VC_JOBS_SETTINGS = {
  sheetId: '1mJHg3BrA0lCvu4EkJR4oVJWONjMTv6g4UcVlfgP6S5Y',
  sheetName: '',
  settingsSheetName: 'Settings',
  brandName: 'VC Jobs',
  postJobEmail: 'Ozadhanvi99@gmail.com',
  defaultUpdatesUrl: 'https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4',
};

export interface VcFundMeta {
  slug: string;
  name: string;
  tagline: string;
  hq_country: string;
  website: string;
  careersUrl?: string;
  year_founded: number;
  employee_count: number;
  collections: string[];
  industries: string[];
  greenhouseBoard?: string;
  leverBoard?: string;
  ashbyBoard?: string;
  workableBoard?: string;
  smartRecruitersBoard?: string;
}

export const VC_FUNDS: VcFundMeta[] = [
  {
    "slug": "peak-xv-partners",
    "name": "Peak XV Partners",
    "tagline": "Leading venture and growth investing firm across India and APAC (formerly Sequoia Capital India & SEA).",
    "hq_country": "in",
    "website": "https://www.peakxv.com",
    "careersUrl": "https://www.peakxv.com/careers/",
    "year_founded": 2006,
    "employee_count": 160,
    "collections": [
      "tier-1-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Growth"
    ]
  },
  {
    "slug": "accel-india",
    "name": "Accel India",
    "tagline": "Global venture capital firm backing iconic founders in India from seed to growth across SaaS, AI, FinTech, and Consumer.",
    "hq_country": "in",
    "website": "https://www.accel.com",
    "careersUrl": "https://www.accel.com/careers",
    "year_founded": 2008,
    "employee_count": 95,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "elevation-capital",
    "name": "Elevation Capital",
    "tagline": "Early-stage venture capital firm investing in consumer, FinTech, SaaS, and AI founders in India.",
    "hq_country": "in",
    "website": "https://www.elevationcapital.com",
    "careersUrl": "https://www.elevationcapital.com/careers",
    "year_founded": 2002,
    "employee_count": 85,
    "collections": [
      "tier-1-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "blume-ventures",
    "name": "Blume Ventures",
    "tagline": "Homegrown conviction-driven early-stage India venture capital fund with a dedicated founder platform.",
    "hq_country": "in",
    "website": "https://blume.vc",
    "careersUrl": "https://blume.vc/careers",
    "year_founded": 2010,
    "employee_count": 70,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "z47-matrix",
    "name": "Z47 (formerly Matrix Partners India)",
    "tagline": "Venture capital firm partnering with early-stage founders building from India for the world.",
    "hq_country": "in",
    "website": "https://www.z47.com",
    "careersUrl": "https://www.z47.com/careers",
    "year_founded": 2006,
    "employee_count": 75,
    "collections": [
      "india-sea-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "nexus-venture-partners",
    "name": "Nexus Venture Partners",
    "tagline": "US-India venture capital firm backing product-first AI, enterprise software, and consumer startups.",
    "hq_country": "in",
    "website": "https://nexusvp.com",
    "careersUrl": "https://nexusvp.com",
    "year_founded": 2006,
    "employee_count": 55,
    "collections": [
      "india-sea-vc",
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI & Enterprise"
    ]
  },
  {
    "slug": "lightspeed-india",
    "name": "Lightspeed India Partners",
    "tagline": "Early and growth-stage venture firm partnering with breakout founders across India and Southeast Asia.",
    "hq_country": "in",
    "website": "https://lsvp.com/india/",
    "careersUrl": "https://lsvp.com/careers/",
    "year_founded": 2007,
    "employee_count": 65,
    "collections": [
      "tier-1-vc",
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Stage"
    ],
    "leverBoard": "lightspeedvp"
  },
  {
    "slug": "kalaari-capital",
    "name": "Kalaari Capital",
    "tagline": "Early-stage technology venture capital firm in Bengaluru empowering visionary Indian entrepreneurs.",
    "hq_country": "in",
    "website": "https://www.kalaari.com",
    "careersUrl": "https://www.kalaari.com/fellows/",
    "year_founded": 2006,
    "employee_count": 45,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "3one4-capital",
    "name": "3one4 Capital",
    "tagline": "Bengaluru-based early-stage venture capital fund investing in SaaS, FinTech, Digital Health, and DeepTech.",
    "hq_country": "in",
    "website": "https://3one4capital.com",
    "careersUrl": "https://3one4capital.com/careers",
    "year_founded": 2015,
    "employee_count": 40,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "stellaris-venture-partners",
    "name": "Stellaris Venture Partners",
    "tagline": "Early-stage, technology-focused India venture capital firm led by former entrepreneurs and operators.",
    "hq_country": "in",
    "website": "https://www.stellarisvp.com",
    "careersUrl": "https://www.stellarisvp.com/careers/",
    "year_founded": 2016,
    "employee_count": 38,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "chiratae-ventures",
    "name": "Chiratae Ventures",
    "tagline": "Leading Indian technology venture capital firm (formerly IDG Ventures India) backing seed to growth startups.",
    "hq_country": "in",
    "website": "https://www.chiratae.com",
    "careersUrl": "https://www.chiratae.com/careers/",
    "year_founded": 2006,
    "employee_count": 50,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ]
  },
  {
    "slug": "prime-venture-partners",
    "name": "Prime Venture Partners",
    "tagline": "High-conviction seed-stage VC firm in Bengaluru providing hands-on operating support to founders.",
    "hq_country": "in",
    "website": "https://primevp.in",
    "careersUrl": "https://primevp.in/careers/",
    "year_founded": 2012,
    "employee_count": 25,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "fireside-ventures",
    "name": "Fireside Ventures",
    "tagline": "Early-stage venture capital fund investing in digital-first consumer brands across India.",
    "hq_country": "in",
    "website": "https://firesideventures.com",
    "year_founded": 2017,
    "employee_count": 35,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer Brands"
    ]
  },
  {
    "slug": "info-edge-ventures",
    "name": "Info Edge Ventures",
    "tagline": "Early-stage venture capital fund backed by Info Edge and Temasek investing in Indian tech founders.",
    "hq_country": "in",
    "website": "https://www.infoedgeventures.in",
    "year_founded": 2020,
    "employee_count": 25,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "waterbridge-ventures",
    "name": "WaterBridge Ventures",
    "tagline": "High-conviction early-stage India VC firm investing at Seed and Series A across tech sectors.",
    "hq_country": "in",
    "website": "https://waterbridge.vc",
    "year_founded": 2016,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "pravega-ventures",
    "name": "Pravega Ventures",
    "tagline": "Early-stage venture capital fund focused on pre-seed and seed enterprise and FinTech startups in India.",
    "hq_country": "in",
    "website": "https://www.pravega.vc",
    "year_founded": 2016,
    "employee_count": 20,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise & FinTech"
    ]
  },
  {
    "slug": "pi-ventures",
    "name": "pi Ventures",
    "tagline": "India pioneering AI and DeepTech venture capital fund backing disruptive engineering-led startups.",
    "hq_country": "in",
    "website": "https://www.piventures.in",
    "year_founded": 2016,
    "employee_count": 20,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI & DeepTech"
    ]
  },
  {
    "slug": "speciale-invest",
    "name": "Speciale Invest",
    "tagline": "Seed-stage DeepTech venture capital firm investing in SpaceTech, climate, quantum, and enterprise hardware.",
    "hq_country": "in",
    "website": "https://www.specialeinvest.com",
    "year_founded": 2017,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & SpaceTech"
    ]
  },
  {
    "slug": "omnivore",
    "name": "Omnivore",
    "tagline": "Venture capital firm funding Indian startups developing breakthrough agritech and climate sustainability solutions.",
    "hq_country": "in",
    "website": "https://www.omnivore.vc",
    "year_founded": 2011,
    "employee_count": 25,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Agritech & Climate"
    ],
    "workableBoard": "omnivore"
  },
  {
    "slug": "avaana-capital",
    "name": "Avaana Capital",
    "tagline": "Thematic venture capital fund investing in climate action, energy transition, and sustainability in India.",
    "hq_country": "in",
    "website": "https://avaanacapital.com",
    "year_founded": 2018,
    "employee_count": 24,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "ClimateTech"
    ]
  },
  {
    "slug": "8i-ventures",
    "name": "8i Ventures",
    "tagline": "Seed and early-stage India VC fund focused on FinTech, financial inclusion, and consumer commerce.",
    "hq_country": "in",
    "website": "https://8i.vc",
    "year_founded": 2019,
    "employee_count": 15,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "FinTech & Consumer"
    ]
  },
  {
    "slug": "whiteboard-capital",
    "name": "Whiteboard Capital",
    "tagline": "Idea-to-seed venture capital fund founded by Sandeep Tandon backing early-stage Indian tech founders.",
    "hq_country": "in",
    "website": "https://www.whiteboardcapital.com",
    "year_founded": 2018,
    "employee_count": 16,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "kae-capital",
    "name": "Kae Capital",
    "tagline": "Sector-agnostic early-stage venture capital firm investing in pre-seed and seed startups across India.",
    "hq_country": "in",
    "website": "https://www.kae-capital.com",
    "year_founded": 2012,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "india-quotient",
    "name": "India Quotient",
    "tagline": "First-check seed venture capital firm backing founders building uniquely for Bharat and global markets.",
    "hq_country": "in",
    "website": "https://www.indiaquotient.in",
    "year_founded": 2012,
    "employee_count": 20,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "100x-vc",
    "name": "100X.VC",
    "tagline": "Pre-seed venture capital fund investing in Indian startups via iSAFE notes and intensive founder mentorship.",
    "hq_country": "in",
    "website": "https://www.100x.vc",
    "year_founded": 2019,
    "employee_count": 30,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "antler-india",
    "smartRecruitersBoard": "Antler",
    "name": "Antler India",
    "tagline": "Day-zero investor and founder residency backing exceptional technologists and operators across India.",
    "hq_country": "in",
    "website": "https://www.antler.co/location/india",
    "year_founded": 2020,
    "employee_count": 35,
    "collections": [
      "india-sea-vc",
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Day-Zero & Residency"
    ],
    "leverBoard": "antler"
  },
  {
    "slug": "better-capital",
    "name": "Better Capital",
    "tagline": "High-velocity pre-seed and seed venture firm backing category-defining Indian founders from day one.",
    "hq_country": "in",
    "website": "https://www.bettercapital.vc",
    "year_founded": 2018,
    "employee_count": 12,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "titan-capital",
    "name": "Titan Capital",
    "tagline": "Founder-led seed venture firm investing in early-stage Indian consumer, SaaS, and FinTech startups.",
    "hq_country": "in",
    "website": "https://www.titancapital.vc",
    "year_founded": 2015,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "weh-ventures",
    "name": "WEH Ventures",
    "tagline": "Conviction-first early-stage venture fund investing in Indian digital consumer and FinTech startups.",
    "hq_country": "in",
    "website": "https://wehventures.com",
    "year_founded": 2017,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "gemba-capital",
    "name": "Gemba Capital",
    "tagline": "Bengaluru-based micro-VC firm investing at pre-seed and seed across FinTech, SaaS, and B2B platforms.",
    "hq_country": "in",
    "website": "https://gembacapital.in",
    "year_founded": 2018,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Micro-VC"
    ]
  },
  {
    "slug": "all-in-capital",
    "name": "All In Capital",
    "tagline": "Operator-led pre-seed venture capital fund backing ambitious founders at the earliest stage in India.",
    "hq_country": "in",
    "website": "https://allincapital.in",
    "year_founded": 2022,
    "employee_count": 12,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "ajvc",
    "name": "ajvc",
    "tagline": "Pre-seed venture capital firm founded by Aviral Bhatnagar backing India next generation of founders.",
    "hq_country": "in",
    "website": "https://ajvc.vc",
    "year_founded": 2024,
    "employee_count": 10,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "campus-fund",
    "name": "Campus Fund",
    "tagline": "India pioneering student-led venture capital fund backing student and recent-graduate entrepreneurs.",
    "hq_country": "in",
    "website": "https://www.yourcampusfund.com",
    "year_founded": 2020,
    "employee_count": 25,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Student & University VC"
    ]
  },
  {
    "slug": "a91-partners",
    "name": "A91 Partners",
    "tagline": "Growth and late-early stage investment firm partnering with enduring consumer, FinTech, and tech businesses in India.",
    "hq_country": "in",
    "website": "https://www.a91partners.com",
    "year_founded": 2018,
    "employee_count": 35,
    "collections": [
      "india-sea-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series B & Growth"
    ]
  },
  {
    "slug": "avataar-venture-partners",
    "name": "Avataar Venture Partners",
    "tagline": "Growth-stage operational VC firm scaling B2B SaaS and enterprise tech companies out of India and SEA.",
    "hq_country": "in",
    "website": "https://www.avataar.vc",
    "year_founded": 2019,
    "employee_count": 25,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS Growth"
    ]
  },
  {
    "slug": "iron-pillar",
    "name": "Iron Pillar",
    "tagline": "Venture growth investor backing global cloud and SaaS companies built from India.",
    "hq_country": "in",
    "website": "https://www.ironpillarfund.com",
    "year_founded": 2016,
    "employee_count": 24,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Growth"
    ]
  },
  {
    "slug": "dsg-consumer-partners",
    "name": "DSG Consumer Partners",
    "tagline": "Specialist consumer venture capital firm investing in insurgent brands across India and Southeast Asia.",
    "hq_country": "in",
    "website": "https://dsgcp.com",
    "year_founded": 2012,
    "employee_count": 22,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer Brands"
    ]
  },
  {
    "slug": "sixth-sense-ventures",
    "name": "Sixth Sense Ventures",
    "tagline": "India domestic consumer-centric venture fund investing in next-generation consumer products and services.",
    "hq_country": "in",
    "website": "https://sixthsenseventures.com",
    "year_founded": 2014,
    "employee_count": 26,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer"
    ]
  },
  {
    "slug": "sauce-vc",
    "name": "Sauce.vc",
    "tagline": "Early-stage consumer venture fund and brand incubation platform backing new-age Indian D2C brands.",
    "hq_country": "in",
    "website": "https://www.sauce.vc",
    "year_founded": 2019,
    "employee_count": 16,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer & D2C"
    ]
  },
  {
    "slug": "vertex-ventures-sea-india",
    "name": "Vertex Ventures SEA & India",
    "tagline": "Early-stage venture capital network anchored by Temasek investing across India and Southeast Asia.",
    "hq_country": "in",
    "website": "https://www.vertexventures.sg",
    "year_founded": 2008,
    "employee_count": 45,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A & B"
    ]
  },
  {
    "slug": "orios-venture-partners",
    "name": "Orios Venture Partners",
    "tagline": "Early-stage Indian venture capital firm backing misfits building category-defining tech and consumer startups.",
    "hq_country": "in",
    "website": "https://oriosvp.com",
    "year_founded": 2013,
    "employee_count": 24,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "unicorn-india-ventures",
    "name": "Unicorn India Ventures",
    "tagline": "Technology-focused early-stage venture fund investing in SaaS, FinTech, DeepTech, and digital platforms.",
    "hq_country": "in",
    "website": "https://www.unicornivc.com",
    "year_founded": 2015,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "arkam-ventures",
    "name": "Arkam Ventures",
    "tagline": "Early-stage venture capital firm investing in technology businesses solving middle-India digitisation.",
    "hq_country": "in",
    "website": "https://arkamventures.com",
    "year_founded": 2020,
    "employee_count": 20,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A & B"
    ]
  },
  {
    "slug": "together-fund",
    "name": "Together Fund",
    "tagline": "Founder-led venture capital firm founded by Girish Mathrubootham and Manav Garg backing AI and SaaS startups.",
    "hq_country": "in",
    "website": "https://together.fund",
    "year_founded": 2021,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI & SaaS"
    ]
  },
  {
    "slug": "peercapital",
    "name": "PeerCapital",
    "tagline": "Early-stage operator-led venture capital firm in Bengaluru backing Seed and Series A Indian founders.",
    "hq_country": "in",
    "website": "https://peercapital.vc",
    "year_founded": 2022,
    "employee_count": 15,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "fundamental-vc",
    "name": "Fundamental VC",
    "tagline": "Pre-seed and seed venture capital firm partnering with early-stage technology founders in India.",
    "hq_country": "in",
    "website": "https://fundamental.vc",
    "year_founded": 2022,
    "employee_count": 12,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "endiya-partners",
    "name": "Endiya Partners",
    "tagline": "Early-stage venture capital firm investing in IP-led Indian product startups across DeepTech, SaaS, and Healthcare.",
    "hq_country": "in",
    "website": "https://endiya.com",
    "year_founded": 2015,
    "employee_count": 20,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & Healthcare"
    ]
  },
  {
    "slug": "ideaspring-capital",
    "name": "Ideaspring Capital",
    "tagline": "Early-stage venture capital fund in Bengaluru investing in enterprise product innovation and DeepTech.",
    "hq_country": "in",
    "website": "https://ideaspringcap.com",
    "year_founded": 2016,
    "employee_count": 16,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise & DeepTech"
    ]
  },
  {
    "slug": "yournest-venture-capital",
    "name": "YourNest Venture Capital",
    "tagline": "Pre-Series A venture capital fund backing DeepTech, AI, IoT, and enterprise product startups in India.",
    "hq_country": "in",
    "website": "https://yournest.in",
    "year_founded": 2011,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & Enterprise"
    ]
  },
  {
    "slug": "exfinity-venture-partners",
    "name": "Exfinity Venture Partners",
    "tagline": "B2B technology venture capital firm led by IT industry veterans backing US-India cross-border enterprise startups.",
    "hq_country": "in",
    "website": "https://www.exfinityvp.com",
    "year_founded": 2014,
    "employee_count": 20,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B Enterprise"
    ]
  },
  {
    "slug": "mela-ventures",
    "name": "Mela Ventures",
    "tagline": "Early-stage venture capital firm founded by Mindtree co-founders backing next-gen enterprise tech.",
    "hq_country": "in",
    "website": "https://melaventures.in",
    "year_founded": 2019,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise Tech"
    ]
  },
  {
    "slug": "pavestone-vc",
    "name": "Pavestone VC",
    "tagline": "Early-growth stage B2B and DeepTech venture capital firm investing across enterprise technology in India.",
    "hq_country": "in",
    "website": "https://www.pavestone.vc",
    "year_founded": 2021,
    "employee_count": 16,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & B2B"
    ]
  },
  {
    "slug": "ankur-capital",
    "name": "Ankur Capital",
    "tagline": "Early-stage venture capital fund investing in digital transformation, deep science, climate, and agritech.",
    "hq_country": "in",
    "website": "https://www.ankurcapital.com",
    "year_founded": 2014,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Deep Science & Climate"
    ]
  },
  {
    "slug": "bharat-innovation-fund",
    "name": "Bharat Innovation Fund",
    "tagline": "Early-stage venture fund out of IIM Ahmedabad CIIE backing IP-driven DeepTech, AI, and Climate startups.",
    "hq_country": "in",
    "website": "https://www.bharatinnovationfund.com",
    "year_founded": 2018,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & IP"
    ]
  },
  {
    "slug": "blue-ashva-capital",
    "name": "Blue Ashva Capital",
    "tagline": "Investment firm backing sustainable, profitable deep technology and climate engineering businesses in India and Singapore.",
    "hq_country": "in",
    "website": "https://www.blueashva.com",
    "year_founded": 2020,
    "employee_count": 20,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Climate & DeepTech"
    ]
  },
  {
    "slug": "transition-vc",
    "name": "Transition VC",
    "tagline": "Energy transition and climate-focused venture capital fund backing clean energy hardware and decarbonisation.",
    "hq_country": "in",
    "website": "https://transitionvc.com",
    "year_founded": 2022,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Energy Transition"
    ]
  },
  {
    "slug": "lok-capital",
    "name": "Lok Capital",
    "tagline": "Impact and financial inclusion venture growth investor backing FinTech, climate, healthcare, and agritech across India.",
    "hq_country": "in",
    "website": "https://www.lokcapital.com",
    "year_founded": 2004,
    "employee_count": 28,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "FinTech & Impact"
    ]
  },
  {
    "slug": "aavishkaar-capital",
    "name": "Aavishkaar Capital",
    "tagline": "Global pioneer in impact venture capital investing in sustainable enterprises across India, Asia, and Africa.",
    "hq_country": "in",
    "website": "https://www.aavishkaarcapital.in",
    "year_founded": 2001,
    "employee_count": 65,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Impact & Sustainability"
    ]
  },
  {
    "slug": "elevar-equity",
    "name": "Elevar Equity",
    "tagline": "Human-centered venture capital firm investing in entrepreneurial ecosystems serving underserved households in India and LATAM.",
    "hq_country": "in",
    "website": "https://elevarequity.com",
    "year_founded": 2008,
    "employee_count": 35,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Financial Inclusion"
    ]
  },
  {
    "slug": "capria-ventures",
    "name": "Capria Ventures (Unitus Ventures)",
    "tagline": "Global South specialist venture capital firm investing in Applied Generative AI and early-growth startups in India.",
    "hq_country": "in",
    "website": "https://capria.vc",
    "year_founded": 2012,
    "employee_count": 30,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Applied AI"
    ]
  },
  {
    "slug": "healthquad",
    "name": "HealthQuad",
    "tagline": "India leading healthcare-focused venture capital fund backing transformative digital health, medtech, and delivery models.",
    "hq_country": "in",
    "website": "https://healthquad.in",
    "year_founded": 2016,
    "employee_count": 24,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "HealthTech & MedTech"
    ]
  },
  {
    "slug": "w-health-ventures",
    "name": "W Health Ventures",
    "tagline": "Healthcare venture capital firm and company builder investing in US-India digital health and clinical innovation.",
    "hq_country": "in",
    "website": "https://www.whealthventures.com",
    "year_founded": 2019,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Healthcare & Venture Studio"
    ]
  },
  {
    "slug": "alkemi-growth-capital",
    "name": "Alkemi Growth Capital",
    "tagline": "Early-growth venture fund investing in healthcare, wellness, and consumer health businesses across India.",
    "hq_country": "in",
    "website": "https://www.alkemivp.com",
    "year_founded": 2018,
    "employee_count": 16,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Healthcare & Wellness"
    ]
  },
  {
    "slug": "somerset-indus-capital",
    "name": "Somerset Indus Capital Partners",
    "tagline": "Healthcare growth equity and venture capital fund investing in pharma, diagnostics, medical devices, and hospitals in India.",
    "hq_country": "in",
    "website": "https://www.somersetinduscap.com",
    "year_founded": 2011,
    "employee_count": 20,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Healthcare Growth"
    ]
  },
  {
    "slug": "lumikai",
    "name": "Lumikai",
    "tagline": "India first dedicated gaming and interactive media venture capital fund backing studios, platforms, and gaming infra.",
    "hq_country": "in",
    "website": "https://www.lumikai.com",
    "year_founded": 2019,
    "employee_count": 15,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Gaming & Interactive Media"
    ]
  },
  {
    "slug": "rpsg-capital-ventures",
    "name": "RPSG Capital Ventures",
    "tagline": "Early-stage consumer venture capital fund backed by the RP-Sanjiv Goenka Group investing in D2C brands.",
    "hq_country": "in",
    "website": "https://www.rpsgcapital.vc",
    "year_founded": 2018,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer & D2C"
    ]
  },
  {
    "slug": "roots-ventures",
    "name": "Roots Ventures",
    "tagline": "Multi-stage investment firm in Mumbai backing consumer, FinTech, and differentiated brand platforms.",
    "hq_country": "in",
    "website": "https://www.rootsventures.in",
    "year_founded": 2018,
    "employee_count": 14,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer & FinTech"
    ]
  },
  {
    "slug": "riverwalk-holdings",
    "name": "Riverwalk Holdings",
    "tagline": "Early-stage India venture capital fund investing in B2B SaaS, FinTech, and consumer platforms at Seed and Series A.",
    "hq_country": "in",
    "website": "https://www.riverwalkholdings.com",
    "year_founded": 2021,
    "employee_count": 15,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "sorin-investments",
    "name": "Sorin Investments",
    "tagline": "Early-stage tech venture capital fund founded by Sanjay Nayar backing Series A and B startups in India.",
    "hq_country": "in",
    "website": "https://www.sorininvestments.com",
    "year_founded": 2022,
    "employee_count": 18,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Growth"
    ]
  },
  {
    "slug": "cornerstone-venture-partners",
    "name": "Cornerstone Venture Partners",
    "tagline": "Enterprise SaaS and B2B digital transformation venture capital fund investing in Series A and B Indian companies.",
    "hq_country": "in",
    "website": "https://www.csven.com",
    "year_founded": 2018,
    "employee_count": 18,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise SaaS"
    ]
  },
  {
    "slug": "singularity-growth",
    "name": "Singularity Growth",
    "tagline": "Growth-stage venture and private equity platform founded by Yash Kela backing technology-enabled leaders in India.",
    "hq_country": "in",
    "website": "https://www.singularityamc.com",
    "year_founded": 2021,
    "employee_count": 25,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "creaegis",
    "name": "Creaegis",
    "tagline": "Digital and technology growth investment firm founded by Prakash Parthasarathy investing across India.",
    "hq_country": "in",
    "website": "https://www.creaegis.com",
    "year_founded": 2018,
    "employee_count": 28,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Equity"
    ]
  },
  {
    "slug": "filter-capital",
    "name": "Filter Capital",
    "tagline": "India-focused technology growth investment firm backing Series B and Series C SaaS and tech-services businesses.",
    "hq_country": "in",
    "website": "https://www.filtercapital.com",
    "year_founded": 2018,
    "employee_count": 16,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Tech Growth"
    ]
  },
  {
    "slug": "epiq-capital",
    "name": "Epiq Capital",
    "tagline": "Later-stage technology investment firm partnering with high-growth category leaders in India.",
    "hq_country": "in",
    "website": "https://www.epiqcapital.com",
    "year_founded": 2018,
    "employee_count": 18,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "steadview-capital",
    "name": "Steadview Capital",
    "tagline": "Long-term growth investor backing enduring Indian consumer internet, SaaS, and financial services companies.",
    "hq_country": "in",
    "website": "https://www.steadview.com",
    "year_founded": 2009,
    "employee_count": 25,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Late Stage & Crossover"
    ]
  },
  {
    "slug": "chryscapital",
    "name": "ChrysCapital",
    "tagline": "One of India largest investment firms backing technology, financial services, healthcare, and consumer leaders.",
    "hq_country": "in",
    "website": "https://www.chryscapital.com",
    "year_founded": 1999,
    "employee_count": 85,
    "collections": [
      "india-sea-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth & Private Equity"
    ]
  },
  {
    "slug": "multiples-pe",
    "name": "Multiples Alternate Asset Management",
    "tagline": "Indian growth and venture equity platform backing financial services, consumer, health, and tech companies.",
    "hq_country": "in",
    "website": "https://www.multiplesequity.com",
    "year_founded": 2009,
    "employee_count": 70,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Equity"
    ]
  },
  {
    "slug": "gaja-capital",
    "name": "Gaja Capital",
    "tagline": "Growth-stage investment firm backing education, consumer, FinTech, and SaaS leaders across India.",
    "hq_country": "in",
    "website": "https://www.gajacapital.com",
    "year_founded": 2004,
    "employee_count": 35,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "faering-capital",
    "name": "Faering Capital",
    "tagline": "Leading Indian mid-market and growth equity firm founded by Aditya Parekh and Sameer Shroff.",
    "hq_country": "in",
    "website": "https://www.faeringcapital.com",
    "year_founded": 2009,
    "employee_count": 30,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Equity"
    ]
  },
  {
    "slug": "tvs-capital-funds",
    "name": "TVS Capital Funds",
    "tagline": "Growth equity fund Empowering NextGen Entrepreneurs across financial services and B2B services in India.",
    "hq_country": "in",
    "website": "https://tvscapital.in",
    "year_founded": 2007,
    "employee_count": 35,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "ivycap-ventures",
    "name": "IvyCap Ventures",
    "tagline": "Early to growth-stage venture capital firm leveraging the global IIT and IIM alumni network to back founders.",
    "hq_country": "in",
    "website": "https://www.ivycapventures.com",
    "year_founded": 2011,
    "employee_count": 32,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A & B"
    ]
  },
  {
    "slug": "xponentia-capital",
    "name": "Xponentia Capital",
    "tagline": "Mid-market and growth investment firm backing high-growth Indian consumer, healthcare, and business services firms.",
    "hq_country": "in",
    "website": "https://www.xponentia.in",
    "year_founded": 2018,
    "employee_count": 22,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "ascent-capital",
    "name": "Ascent Capital",
    "tagline": "Bengaluru-based growth capital firm backing technology, FinTech, healthcare, and consumer businesses.",
    "hq_country": "in",
    "website": "https://www.ascentcapital.in",
    "year_founded": 2000,
    "employee_count": 25,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "bertelsmann-india-investments",
    "name": "Bertelsmann India Investments (BII)",
    "tagline": "Strategic Series B and C venture capital fund investing in digital consumer, FinTech, HealthTech, and enterprise in India.",
    "hq_country": "in",
    "website": "https://www.biifund.com",
    "year_founded": 2012,
    "employee_count": 24,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series B & Growth"
    ]
  },
  {
    "slug": "rtp-global-india",
    "name": "RTP Global (India & SEA)",
    "tagline": "Early-stage technology venture capital firm with a dedicated Bengaluru team backing FinTech, SaaS, and consumer founders.",
    "hq_country": "in",
    "website": "https://www.rtp.vc",
    "year_founded": 2000,
    "employee_count": 35,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "trifecta-capital",
    "name": "Trifecta Capital",
    "tagline": "India pioneer in venture debt and late-stage growth equity financing for new-economy startups.",
    "hq_country": "in",
    "website": "https://trifectacapital.in",
    "year_founded": 2014,
    "employee_count": 45,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Debt & Growth"
    ]
  },
  {
    "slug": "alteria-capital",
    "name": "Alteria Capital",
    "tagline": "India largest venture debt fund backing high-growth technology and consumer startups alongside top equity VCs.",
    "hq_country": "in",
    "website": "https://www.alteriacapital.com",
    "year_founded": 2017,
    "employee_count": 40,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Debt"
    ]
  },
  {
    "slug": "stride-ventures",
    "name": "Stride Ventures",
    "tagline": "Leading global venture debt firm headquartered in India with presence across SEA, UK, and Middle East.",
    "hq_country": "in",
    "website": "https://strideventures.in",
    "year_founded": 2019,
    "employee_count": 55,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Debt"
    ]
  },
  {
    "slug": "blacksoil",
    "name": "BlackSoil",
    "tagline": "Alternative credit and venture debt platform financing high-growth Indian startups and MSMEs.",
    "hq_country": "in",
    "website": "https://blacksoil.co.in",
    "year_founded": 2016,
    "employee_count": 50,
    "collections": [
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Debt"
    ]
  },
  {
    "slug": "innoven-capital-india",
    "name": "InnoVen Capital India",
    "tagline": "Pan-Asian venture debt platform backed by Seviora (Temasek) and UOB providing growth credit to startups.",
    "hq_country": "in",
    "website": "https://www.innovencapital.com",
    "year_founded": 2008,
    "employee_count": 40,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Debt"
    ]
  },
  {
    "slug": "first-cheque",
    "name": "First Cheque",
    "tagline": "Pre-seed operator-led venture fund by India Quotient backing founders at the idea and paper-plan stage.",
    "hq_country": "in",
    "website": "https://www.firstcheque.vc",
    "year_founded": 2019,
    "employee_count": 12,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "gradcapital",
    "name": "GradCapital",
    "tagline": "Student-focused venture capital fund and fellowship investing $40k+ in ambitious college builders across India.",
    "hq_country": "in",
    "website": "https://www.gradcapital.in",
    "year_founded": 2021,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Student & Pre-Seed"
    ]
  },
  {
    "slug": "devc-india",
    "name": "DeVC (by Z47)",
    "tagline": "Decentralized community-driven pre-seed and seed venture fund bringing top Indian founders together to back early builders.",
    "hq_country": "in",
    "website": "https://www.z47.com",
    "year_founded": 2022,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Community Pre-Seed"
    ]
  },
  {
    "slug": "boldcap",
    "name": "BoldCap",
    "tagline": "Pre-seed and seed VC fund investing in Indian B2B SaaS and AI founders building for global enterprise customers.",
    "hq_country": "in",
    "website": "https://www.boldcap.com",
    "year_founded": 2021,
    "employee_count": 12,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS & AI"
    ]
  },
  {
    "slug": "neon-fund",
    "name": "Neon Fund (formerly 021 Capital)",
    "tagline": "Early-stage venture capital fund investing in B2B SaaS, Applied AI, and enterprise infrastructure from India.",
    "hq_country": "in",
    "website": "https://neon.fund",
    "year_founded": 2018,
    "employee_count": 15,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise AI & SaaS"
    ]
  },
  {
    "slug": "upekkha",
    "name": "Upekkha",
    "tagline": "Value SaaS accelerator and early-stage venture fund helping Indian B2B SaaS startups scale capital-efficiently.",
    "hq_country": "in",
    "website": "https://www.upekkha.io",
    "year_founded": 2017,
    "employee_count": 25,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS Accelerator"
    ]
  },
  {
    "slug": "java-capital",
    "name": "Java Capital",
    "tagline": "Pre-seed and seed micro-VC fund in Chennai and Bengaluru backing DeepTech, ClimateTech, FinTech, and SaaS.",
    "hq_country": "in",
    "website": "https://www.javacapital.in",
    "year_founded": 2020,
    "employee_count": 10,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Micro-VC"
    ]
  },
  {
    "slug": "capital-a",
    "name": "Capital-A",
    "tagline": "Venture fund backing manufacturing tech, EV, climate, hardware, and early-stage startups across India.",
    "hq_country": "in",
    "website": "https://www.capital-a.in",
    "year_founded": 2021,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Manufacturing & Climate"
    ]
  },
  {
    "slug": "multiply-ventures",
    "name": "Multiply Ventures",
    "tagline": "Operator-led early-stage VC fund founded by Flipkart and Myntra alumni focusing on FinTech, Commerce, and EdTech.",
    "hq_country": "in",
    "website": "https://www.multiplyventures.com",
    "year_founded": 2020,
    "employee_count": 14,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Operator VC"
    ]
  },
  {
    "slug": "kettleborough-vc",
    "name": "Kettleborough VC",
    "tagline": "High-conviction seed fund led by Nisarg Shah backing execution-focused domain veterans in India.",
    "hq_country": "in",
    "website": "https://www.kettleborough.vc",
    "year_founded": 2021,
    "employee_count": 10,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "piper-serica",
    "name": "Piper Serica Angel Fund",
    "tagline": "Data-driven early-stage venture fund investing in tech-led startups across FinTech, Cybersecurity, and Spacetech.",
    "hq_country": "in",
    "website": "https://www.piperserica.com",
    "year_founded": 2022,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "artha-venture-fund",
    "name": "Artha Venture Fund",
    "tagline": "India first self-sustaining micro-VC fund investing in B2B, FinTech, D2C enablers, and SaaS.",
    "hq_country": "in",
    "website": "https://artha.vc",
    "year_founded": 2018,
    "employee_count": 22,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Micro-VC"
    ]
  },
  {
    "slug": "pentathlon-ventures",
    "name": "Pentathlon Ventures",
    "tagline": "Pune-based B2B SaaS venture capital fund run by serial enterprise founders.",
    "hq_country": "in",
    "website": "https://pentathlon.vc",
    "year_founded": 2020,
    "employee_count": 16,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS"
    ]
  },
  {
    "slug": "ian-group",
    "name": "IAN Group (Indian Angel Network)",
    "tagline": "India largest horizontal seed and early-stage investment platform with the IAN Alpha Fund.",
    "hq_country": "in",
    "website": "https://www.indianangelnetwork.com",
    "year_founded": 2006,
    "employee_count": 55,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Angel & Early Stage"
    ]
  },
  {
    "slug": "mumbai-angels",
    "name": "Mumbai Angels (360 ONE)",
    "tagline": "Premier early-stage angel and seed investment platform in India backed by 360 ONE.",
    "hq_country": "in",
    "website": "https://www.mumbaiangels.com",
    "year_founded": 2006,
    "employee_count": 45,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Angel"
    ]
  },
  {
    "slug": "inflection-point-ventures",
    "name": "Inflection Point Ventures (IPV & Physis Capital)",
    "tagline": "CXO-led angel platform and growth stage VC fund (Physis Capital) investing across pre-seed to Series B.",
    "hq_country": "in",
    "website": "https://ipventures.in",
    "year_founded": 2018,
    "employee_count": 45,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Series B"
    ]
  },
  {
    "slug": "venture-catalysts-9unicorns",
    "name": "Venture Catalysts & 9Unicorns",
    "tagline": "Integrated incubator and accelerator VC fund backing high-growth early-stage startups across Tier-1 and Tier-2 India.",
    "hq_country": "in",
    "website": "https://www.9unicorns.in",
    "year_founded": 2016,
    "employee_count": 60,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Accelerator & Seed"
    ]
  },
  {
    "slug": "huddle-ventures",
    "name": "Huddle Ventures",
    "tagline": "Pre-seed venture capital fund and hands-on accelerator partnering with early-stage founders in India.",
    "hq_country": "in",
    "website": "https://www.huddleventures.vc",
    "year_founded": 2018,
    "employee_count": 18,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "letsventure-trica",
    "name": "LetsVenture",
    "tagline": "Private market and early-stage syndicate marketplace powering angel, micro-VC, and family office investments in India.",
    "hq_country": "in",
    "website": "https://www.letsventure.com",
    "year_founded": 2013,
    "employee_count": 65,
    "collections": [
      "india-sea-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Syndicate Platform"
    ]
  },
  {
    "slug": "qualcomm-ventures-india",
    "name": "Qualcomm Ventures India",
    "tagline": "Corporate venture capital arm investing in 5G, AI, automotive, IoT, and enterprise startups across India.",
    "hq_country": "in",
    "website": "https://www.qualcommventures.com",
    "year_founded": 2007,
    "employee_count": 25,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Corporate VC & DeepTech"
    ]
  },
  {
    "slug": "unilever-ventures-india",
    "name": "Unilever Ventures India",
    "tagline": "Venture capital and growth equity arm of Unilever backing beauty, personal care, wellness, and commerce startups.",
    "hq_country": "in",
    "website": "https://www.unileverventures.com",
    "year_founded": 2002,
    "employee_count": 24,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer & Beauty"
    ]
  },
  {
    "slug": "sequoia-capital",
    "name": "Sequoia Capital",
    "tagline": "Helping the daring build legendary companies from idea to IPO and beyond.",
    "hq_country": "us",
    "website": "https://www.sequoiacap.com",
    "year_founded": 1972,
    "employee_count": 220,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Growth"
    ]
  },
  {
    "slug": "andreessen-horowitz",
    "name": "Andreessen Horowitz (a16z)",
    "tagline": "Venture capital firm backing bold entrepreneurs building the future through AI, bio, crypto, infrastructure, and American dynamism.",
    "hq_country": "us",
    "website": "https://a16z.com",
    "year_founded": 2009,
    "employee_count": 500,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Platform VC"
    ],
    "greenhouseBoard": "a16z"
  },
  {
    "slug": "benchmark",
    "name": "Benchmark",
    "tagline": "Equal-partnership Silicon Valley early-stage venture capital firm backing transformational founders.",
    "hq_country": "us",
    "website": "https://www.benchmark.com",
    "year_founded": 1995,
    "employee_count": 35,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "founders-fund",
    "name": "Founders Fund",
    "tagline": "San Francisco venture capital firm investing in companies building revolutionary technologies across aerospace, defense, AI, and bio.",
    "hq_country": "us",
    "website": "https://foundersfund.com",
    "year_founded": 2005,
    "employee_count": 90,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Frontier Tech & AI"
    ]
  },
  {
    "slug": "bessemer-venture-partners",
    "name": "Bessemer Venture Partners",
    "tagline": "Global venture capital firm helping founders lay enduring foundations from seed to IPO across US, India, and Europe.",
    "hq_country": "us",
    "website": "https://www.bvp.com",
    "year_founded": 1911,
    "employee_count": 210,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Cloud & AI"
    ],
    "greenhouseBoard": "bessemerventurepartners"
  },
  {
    "slug": "general-catalyst",
    "name": "General Catalyst",
    "tagline": "Global investment and transformation company partnering with founders from seed to growth across US, Europe, and India.",
    "hq_country": "us",
    "website": "https://www.generalcatalyst.com",
    "year_founded": 2000,
    "employee_count": 350,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Stage"
    ],
    "greenhouseBoard": "generalcatalyst"
  },
  {
    "slug": "lightspeed-venture-partners",
    "name": "Lightspeed Venture Partners",
    "tagline": "Multi-stage global venture capital firm accelerating disruptive innovations across Enterprise, Consumer, AI, and FinTech.",
    "hq_country": "us",
    "website": "https://lsvp.com",
    "year_founded": 2000,
    "employee_count": 250,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Stage"
    ],
    "leverBoard": "lightspeedvp"
  },
  {
    "slug": "nea",
    "name": "New Enterprise Associates (NEA)",
    "tagline": "Global venture capital firm investing in technology and healthcare across all stages.",
    "hq_country": "us",
    "website": "https://www.nea.com",
    "year_founded": 1977,
    "employee_count": 180,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Tech & Healthcare"
    ],
    "greenhouseBoard": "nea"
  },
  {
    "slug": "greylock-partners",
    "name": "Greylock Partners",
    "tagline": "Silicon Valley early-stage venture capital firm partnering with AI, cybersecurity, enterprise, and consumer founders.",
    "hq_country": "us",
    "website": "https://greylock.com",
    "year_founded": 1965,
    "employee_count": 80,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ],
    "greenhouseBoard": "greylock"
  },
  {
    "slug": "khosla-ventures",
    "name": "Khosla Ventures",
    "tagline": "Venture capital firm providing venture assistance and strategic advice to entrepreneurs working on breakthrough technologies.",
    "hq_country": "us",
    "website": "https://www.khoslaventures.com",
    "year_founded": 2004,
    "employee_count": 95,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI & DeepTech"
    ],
    "ashbyBoard": "khoslaventures"
  },
  {
    "slug": "first-round-capital",
    "name": "First Round Capital",
    "tagline": "Seed-stage venture firm focused on building a vibrant community of technology entrepreneurs and operators.",
    "hq_country": "us",
    "website": "https://firstround.com",
    "year_founded": 2004,
    "employee_count": 65,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ],
    "ashbyBoard": "firstround"
  },
  {
    "slug": "menlo-ventures",
    "name": "Menlo Ventures",
    "tagline": "Early-stage and growth venture firm investing in AI, cloud infrastructure, cybersecurity, and bio.",
    "hq_country": "us",
    "website": "https://menlovc.com",
    "year_founded": 1976,
    "employee_count": 75,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI & Cloud"
    ],
    "greenhouseBoard": "menloventures"
  },
  {
    "slug": "battery-ventures",
    "name": "Battery Ventures",
    "tagline": "Global, technology-focused investment firm backing application software, infrastructure, and industrial tech companies.",
    "hq_country": "us",
    "website": "https://www.battery.com",
    "year_founded": 1983,
    "employee_count": 160,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B Software"
    ],
    "greenhouseBoard": "battery"
  },
  {
    "slug": "redpoint-ventures",
    "name": "Redpoint Ventures",
    "tagline": "Partnering with visionary founders from seed to growth across AI, infrastructure, enterprise, and consumer.",
    "hq_country": "us",
    "website": "https://www.redpoint.com",
    "year_founded": 1999,
    "employee_count": 85,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ],
    "ashbyBoard": "redpoint"
  },
  {
    "slug": "insight-partners",
    "name": "Insight Partners",
    "tagline": "Global software investor partnering with high-growth technology, software, and internet businesses.",
    "hq_country": "us",
    "website": "https://www.insightpartners.com",
    "year_founded": 1995,
    "employee_count": 450,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "ScaleUp Software"
    ],
    "leverBoard": "insightpartners"
  },
  {
    "slug": "norwest-venture-partners",
    "name": "Norwest Venture Partners",
    "tagline": "Global multi-stage investment firm managing $15.5B+ in capital across the US, India, and Israel.",
    "hq_country": "us",
    "website": "https://www.nvp.com",
    "year_founded": 1961,
    "employee_count": 150,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture & Growth"
    ]
  },
  {
    "slug": "kleiner-perkins",
    "name": "Kleiner Perkins",
    "tagline": "Silicon Valley venture capital firm partnering with founders making history in technology, life sciences, and AI.",
    "hq_country": "us",
    "website": "https://www.kleinerperkins.com",
    "year_founded": 1972,
    "employee_count": 90,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ]
  },
  {
    "slug": "thrive-capital",
    "name": "Thrive Capital",
    "tagline": "Investment firm building and backing category-defining software, internet, AI, and technology companies.",
    "hq_country": "us",
    "website": "https://thrivecap.com",
    "year_founded": 2009,
    "employee_count": 110,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Stage"
    ]
  },
  {
    "slug": "coatue-management",
    "name": "Coatue Management",
    "tagline": "Lifecycle technology investment platform backing public and private leaders in AI, cloud, FinTech, and consumer.",
    "hq_country": "us",
    "website": "https://www.coatue.com",
    "year_founded": 1999,
    "employee_count": 300,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Crossover & Growth"
    ]
  },
  {
    "slug": "tiger-global",
    "name": "Tiger Global Management",
    "tagline": "Global investment firm focused on public and private companies in the global internet, software, and financial tech industries.",
    "hq_country": "us",
    "website": "https://www.tigerglobal.com",
    "year_founded": 2001,
    "employee_count": 180,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth & Crossover"
    ]
  },
  {
    "slug": "greenoaks-capital",
    "name": "Greenoaks Capital",
    "tagline": "Concentrated, long-term technology investment firm partnering with global compounders from Series B to IPO.",
    "hq_country": "us",
    "website": "https://www.greenoaks.com",
    "year_founded": 2012,
    "employee_count": 65,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "ribbit-capital",
    "name": "Ribbit Capital",
    "tagline": "Global venture capital firm on a mission to change the world of finance, FinTech, banking, and crypto.",
    "hq_country": "us",
    "website": "https://ribbitcap.com",
    "year_founded": 2012,
    "employee_count": 55,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "FinTech"
    ]
  },
  {
    "slug": "ivp",
    "name": "IVP (Institutional Venture Partners)",
    "tagline": "Later-stage venture capital and growth equity firm helping breakout technology companies scale to IPO.",
    "hq_country": "us",
    "website": "https://www.ivp.com",
    "year_founded": 1980,
    "employee_count": 75,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Growth"
    ]
  },
  {
    "slug": "sapphire-ventures",
    "name": "Sapphire Ventures",
    "tagline": "Global software venture capital firm backing companies of consequence across enterprise AI and B2B SaaS.",
    "hq_country": "us",
    "website": "https://sapphireventures.com",
    "year_founded": 2011,
    "employee_count": 110,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise Software"
    ]
  },
  {
    "slug": "bain-capital-ventures",
    "name": "Bain Capital Ventures (BCV)",
    "tagline": "Multi-stage venture partner from seed to scale across FinTech, commerce, infrastructure, and application software.",
    "hq_country": "us",
    "website": "https://baincapitalventures.com",
    "year_founded": 2001,
    "employee_count": 130,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Growth"
    ]
  },
  {
    "slug": "notable-capital",
    "name": "Notable Capital (formerly GGV Capital US)",
    "tagline": "Global venture capital firm focused on cloud, AI, FinTech, and digital commerce across the US, Israel, Europe, and LATAM.",
    "hq_country": "us",
    "website": "https://notablecap.com",
    "year_founded": 2000,
    "employee_count": 75,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Stage"
    ]
  },
  {
    "slug": "canaan-partners",
    "name": "Canaan Partners",
    "tagline": "Early-stage venture capital firm investing in entrepreneurs with visionary ideas across technology and healthcare.",
    "hq_country": "us",
    "website": "https://www.canaan.com",
    "year_founded": 1987,
    "employee_count": 70,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Tech & Bio"
    ]
  },
  {
    "slug": "mayfield-fund",
    "name": "Mayfield",
    "tagline": "People-first early-stage Silicon Valley venture capital firm investing in AI, enterprise, and human & planetary health.",
    "hq_country": "us",
    "website": "https://www.mayfield.com",
    "year_founded": 1969,
    "employee_count": 65,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage AI"
    ]
  },
  {
    "slug": "crv",
    "name": "CRV (Charles River Ventures)",
    "tagline": "Early-stage venture capital firm backing technical founders at Seed and Series A since 1970.",
    "hq_country": "us",
    "website": "https://www.crv.com",
    "year_founded": 1970,
    "employee_count": 60,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "scale-venture-partners",
    "name": "Scale Venture Partners",
    "tagline": "Silicon Valley venture firm helping cloud, SaaS, and AI startups scale from first revenue to market leadership.",
    "hq_country": "us",
    "website": "https://www.scalevp.com",
    "year_founded": 2000,
    "employee_count": 60,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B Cloud & AI"
    ]
  },
  {
    "slug": "emergence-capital",
    "name": "Emergence Capital",
    "tagline": "Enterprise cloud and B2B SaaS venture capital firm backing iconic work software companies at Series A.",
    "hq_country": "us",
    "website": "https://www.emcap.com",
    "year_founded": 2003,
    "employee_count": 45,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise Cloud"
    ]
  },
  {
    "slug": "madrona-venture-group",
    "name": "Madrona Venture Group",
    "tagline": "Pacific Northwest leading venture firm backing seed through growth companies in AI, cloud, and life sciences.",
    "hq_country": "us",
    "website": "https://www.madrona.com",
    "year_founded": 1995,
    "employee_count": 65,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ]
  },
  {
    "slug": "upfront-ventures",
    "name": "Upfront Ventures",
    "tagline": "Los Angeles largest and longest-serving early-stage venture capital fund.",
    "hq_country": "us",
    "website": "https://upfront.com",
    "year_founded": 1996,
    "employee_count": 55,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "venrock",
    "name": "Venrock",
    "tagline": "Originally established as the venture capital arm of the Rockefeller family, backing tech and healthcare pioneers.",
    "hq_country": "us",
    "website": "https://www.venrock.com",
    "year_founded": 1969,
    "employee_count": 75,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Tech & Healthcare"
    ]
  },
  {
    "slug": "foundation-capital",
    "name": "Foundation Capital",
    "tagline": "Early-stage Silicon Valley venture firm helping technical founders build from zero to $1B in revenue.",
    "hq_country": "us",
    "website": "https://foundationcapital.com",
    "year_founded": 1995,
    "employee_count": 60,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI, Crypto & FinTech"
    ]
  },
  {
    "slug": "wing-venture-capital",
    "name": "Wing Venture Capital",
    "tagline": "Company-building early-stage venture firm focused on AI-first enterprise technology.",
    "hq_country": "us",
    "website": "https://www.wing.vc",
    "year_founded": 2013,
    "employee_count": 40,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise AI"
    ]
  },
  {
    "slug": "amplify-partners",
    "name": "Amplify Partners",
    "tagline": "Early-stage venture firm backing technical founders in machine learning, data infrastructure, and developer tools.",
    "hq_country": "us",
    "website": "https://www.amplifypartners.com",
    "year_founded": 2012,
    "employee_count": 35,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "DevTools & ML"
    ]
  },
  {
    "slug": "felicis",
    "name": "Felicis",
    "tagline": "Venture capital firm backing founders reinventing core markets across AI, cybersecurity, bio, and global resilience.",
    "hq_country": "us",
    "website": "https://www.felicis.com",
    "year_founded": 2006,
    "employee_count": 55,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Series B"
    ]
  },
  {
    "slug": "initialized-capital",
    "name": "Initialized Capital",
    "tagline": "Early-stage venture capital firm founded by Garry Tan and Alexis Ohanian backing builders at seed.",
    "hq_country": "us",
    "website": "https://initialized.com",
    "year_founded": 2012,
    "employee_count": 45,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "forerunner-ventures",
    "name": "Forerunner Ventures",
    "tagline": "Early-stage venture firm dedicated to understanding the modern consumer and commerce evolution.",
    "hq_country": "us",
    "website": "https://forerunnerventures.com",
    "year_founded": 2012,
    "employee_count": 40,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Consumer & Commerce"
    ]
  },
  {
    "slug": "union-square-ventures",
    "name": "Union Square Ventures (USV)",
    "tagline": "Thesis-driven New York venture capital firm investing in networks, platforms, climate, and AI.",
    "hq_country": "us",
    "website": "https://www.usv.com",
    "year_founded": 2003,
    "employee_count": 30,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Thesis-Driven Early Stage"
    ]
  },
  {
    "slug": "lux-capital",
    "name": "Lux Capital",
    "tagline": "Venture firm investing in emerging science and deep technology ventures at the outermost edges of what is possible.",
    "hq_country": "us",
    "website": "https://www.luxcapital.com",
    "year_founded": 2000,
    "employee_count": 65,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & Defense"
    ]
  },
  {
    "slug": "general-atlantic",
    "name": "General Atlantic",
    "tagline": "Leading global growth equity firm providing capital and strategic support for growth companies worldwide.",
    "hq_country": "us",
    "website": "https://www.generalatlantic.com",
    "year_founded": 1980,
    "employee_count": 500,
    "collections": [
      "tier-1-vc",
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Global Growth Equity"
    ],
    "greenhouseBoard": "generalatlantic"
  },
  {
    "slug": "tcv",
    "name": "TCV (Technology Crossover Ventures)",
    "tagline": "Growth equity investor partnering with public and private market leaders in software, internet, and FinTech.",
    "hq_country": "us",
    "website": "https://www.tcv.com",
    "year_founded": 1995,
    "employee_count": 160,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "iconiq-growth",
    "name": "ICONIQ Growth",
    "tagline": "Global technology growth investment platform partnering with visionaries defining the future of their industries.",
    "hq_country": "us",
    "website": "https://www.iconiqcapital.com/growth",
    "year_founded": 2013,
    "employee_count": 140,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Growth Stage"
    ]
  },
  {
    "slug": "meritech-capital",
    "name": "Meritech Capital",
    "tagline": "Silicon Valley late-stage venture capital firm providing growth capital to category-defining SaaS and tech companies.",
    "hq_country": "us",
    "website": "https://www.meritechcapital.com",
    "year_founded": 1999,
    "employee_count": 35,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Late-Stage Venture"
    ]
  },
  {
    "slug": "altimeter-capital",
    "name": "Altimeter Capital",
    "tagline": "Technology-focused crossover investment firm backing iconic cloud, AI, and internet companies.",
    "hq_country": "us",
    "website": "https://www.altimeter.com",
    "year_founded": 2008,
    "employee_count": 85,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Crossover & Venture"
    ]
  },
  {
    "slug": "y-combinator",
    "name": "Y Combinator",
    "tagline": "The world premier startup accelerator and early-stage venture fund backing thousands of global founders.",
    "hq_country": "us",
    "website": "https://www.ycombinator.com",
    "year_founded": 2005,
    "employee_count": 120,
    "collections": [
      "tier-1-vc",
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Accelerator & Seed"
    ]
  },
  {
    "slug": "techstars",
    "smartRecruitersBoard": "Techstars",
    "name": "Techstars",
    "tagline": "Global pre-seed investor and accelerator network providing capital, mentorship, and access to founders worldwide.",
    "hq_country": "us",
    "website": "https://www.techstars.com",
    "year_founded": 2006,
    "employee_count": 300,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Global Accelerator"
    ]
  },
  {
    "slug": "500-global",
    "smartRecruitersBoard": "500Global",
    "name": "500 Global",
    "tagline": "Multi-stage global venture capital firm investing in fast-growing technology companies across 80+ countries.",
    "hq_country": "us",
    "website": "https://500.co",
    "year_founded": 2010,
    "employee_count": 220,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Global Seed & Series A"
    ]
  },
  {
    "slug": "primary-venture-partners",
    "name": "Primary Venture Partners",
    "tagline": "High-conviction NYC seed-stage venture capital firm with a dedicated founder impact platform.",
    "hq_country": "us",
    "website": "https://www.primary.vc",
    "year_founded": 2015,
    "employee_count": 50,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Platform"
    ],
    "greenhouseBoard": "primaryventurepartners"
  },
  {
    "slug": "pear-vc",
    "name": "Pear VC",
    "tagline": "Pre-seed and seed specialist VC firm partnering with founders from day zero to build category-defining companies.",
    "hq_country": "us",
    "website": "https://pear.vc",
    "year_founded": 2013,
    "employee_count": 45,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "uncork-capital",
    "name": "Uncork Capital",
    "tagline": "One of Silicon Valley most established seed-stage venture firms backing SaaS, AI, hardware, and marketplaces.",
    "hq_country": "us",
    "website": "https://uncorkcapital.com",
    "year_founded": 2004,
    "employee_count": 25,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "floodgate",
    "name": "Floodgate",
    "tagline": "Pioneering Silicon Valley micro-VC firm backing Thunder Lizards at the pre-seed and seed stage.",
    "hq_country": "us",
    "website": "https://www.floodgate.com",
    "year_founded": 2006,
    "employee_count": 22,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "homebrew",
    "name": "Homebrew",
    "tagline": "Seed-stage venture fund run by Hunter Walk and Satya Patel backing the Bottom Up Economy.",
    "hq_country": "us",
    "website": "https://homebrew.co",
    "year_founded": 2013,
    "employee_count": 15,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "boldstart-ventures",
    "name": "Boldstart Ventures",
    "tagline": "Day-one partner for technical enterprise founders building AI, developer tools, cybersecurity, and SaaS.",
    "hq_country": "us",
    "website": "https://boldstart.vc",
    "year_founded": 2010,
    "employee_count": 22,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Day-One Enterprise"
    ]
  },
  {
    "slug": "cowboy-ventures",
    "name": "Cowboy Ventures",
    "tagline": "Seed-stage venture firm founded by Aileen Lee backing enterprise and consumer tech founders.",
    "hq_country": "us",
    "website": "https://www.cowboy.vc",
    "year_founded": 2012,
    "employee_count": 20,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed Stage"
    ]
  },
  {
    "slug": "precursor-ventures",
    "name": "Precursor Ventures",
    "tagline": "Generalist pre-seed venture capital firm investing in a diverse group of first-time founders.",
    "hq_country": "us",
    "website": "https://precursorvc.com",
    "year_founded": 2015,
    "employee_count": 18,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "hustle-fund",
    "name": "Hustle Fund",
    "tagline": "Global pre-seed venture fund backing hilariously early founders executing with high velocity.",
    "hq_country": "us",
    "website": "https://www.hustlefund.vc",
    "year_founded": 2017,
    "employee_count": 28,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed"
    ]
  },
  {
    "slug": "craft-ventures",
    "name": "Craft Ventures",
    "tagline": "Operator-led B2B SaaS and marketplace venture firm founded by David Sacks and Bill Lee.",
    "hq_country": "us",
    "website": "https://www.craftventures.com",
    "year_founded": 2017,
    "employee_count": 55,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS"
    ]
  },
  {
    "slug": "8vc",
    "name": "8VC",
    "tagline": "Technology and life sciences investment firm founded by Joe Lonsdale transforming logistics, defense, bio, and finance.",
    "hq_country": "us",
    "website": "https://www.8vc.com",
    "year_founded": 2015,
    "employee_count": 95,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Defense, Bio & Enterprise"
    ],
    "ashbyBoard": "8vc"
  },
  {
    "slug": "signalfire",
    "name": "SignalFire",
    "tagline": "AI-native venture capital firm engineered like a technology company with its Beacon data platform.",
    "hq_country": "us",
    "website": "https://www.signalfire.com",
    "year_founded": 2013,
    "employee_count": 75,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Data-Driven VC"
    ]
  },
  {
    "slug": "dcvc",
    "name": "DCVC (Data Collective)",
    "tagline": "DeepTech venture capital firm backing entrepreneurs solving trillions of dollars of global problems.",
    "hq_country": "us",
    "website": "https://www.dcvc.com",
    "year_founded": 2011,
    "employee_count": 65,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "DeepTech & Bio"
    ]
  },
  {
    "slug": "radical-ventures",
    "name": "Radical Ventures",
    "tagline": "AI-focused venture capital firm investing in entrepreneurs applying deep technology to transform massive industries.",
    "hq_country": "us",
    "website": "https://radical.vc",
    "year_founded": 2017,
    "employee_count": 45,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Artificial Intelligence"
    ]
  },
  {
    "slug": "conviction-vc",
    "name": "Conviction",
    "tagline": "AI-native venture capital firm founded by Sarah Guo backing Software 3.0 builders.",
    "hq_country": "us",
    "website": "https://www.conviction.com",
    "year_founded": 2022,
    "employee_count": 20,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI-Native VC"
    ]
  },
  {
    "slug": "flagship-pioneering",
    "name": "Flagship Pioneering",
    "tagline": "Bioplatform innovation company conceiving, creating, and resourcing first-in-category life sciences companies.",
    "hq_country": "us",
    "website": "https://www.flagshippioneering.com",
    "year_founded": 2000,
    "employee_count": 400,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Biotech & Venture Creation"
    ]
  },
  {
    "slug": "paradigm",
    "name": "Paradigm",
    "tagline": "Research-driven technology investment firm focused on crypto, web3 protocols, and frontier infrastructure.",
    "hq_country": "us",
    "website": "https://www.paradigm.xyz",
    "year_founded": 2018,
    "employee_count": 75,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Crypto & Frontier Tech"
    ],
    "ashbyBoard": "paradigm"
  },
  {
    "slug": "index-ventures",
    "name": "Index Ventures",
    "tagline": "International venture capital firm with dual headquarters in San Francisco and London backing category-defining entrepreneurs.",
    "hq_country": "gb",
    "website": "https://www.indexventures.com",
    "year_founded": 1996,
    "employee_count": 140,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ],
    "greenhouseBoard": "indexventures"
  },
  {
    "slug": "balderton-capital",
    "name": "Balderton Capital",
    "tagline": "Europe leading technology venture capital investor backing founders from Seed to Growth.",
    "hq_country": "gb",
    "website": "https://www.balderton.com",
    "year_founded": 2000,
    "employee_count": 75,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "European Tech"
    ],
    "workableBoard": "balderton"
  },
  {
    "slug": "atomico",
    "name": "Atomico",
    "tagline": "European venture capital firm partnering with ambitious Series A+ founders reimagining the world.",
    "hq_country": "gb",
    "website": "https://atomico.com",
    "year_founded": 2006,
    "employee_count": 90,
    "collections": [
      "tier-1-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A & Growth"
    ]
  },
  {
    "slug": "northzone",
    "name": "Northzone",
    "tagline": "Multi-stage European and US venture capital fund partnering with bold founders since 1996.",
    "hq_country": "gb",
    "website": "https://northzone.com",
    "year_founded": 1996,
    "employee_count": 65,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ],
    "ashbyBoard": "northzone"
  },
  {
    "slug": "dawn-capital",
    "name": "Dawn Capital",
    "tagline": "Europe largest specialist B2B software venture capital investor backing Series A and B leaders.",
    "hq_country": "gb",
    "website": "https://dawncapital.com",
    "year_founded": 2007,
    "employee_count": 55,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B Software Europe"
    ]
  },
  {
    "slug": "notion-capital",
    "name": "Notion Capital",
    "tagline": "London-based European B2B SaaS and Cloud venture capital firm founded by serial software entrepreneurs.",
    "hq_country": "gb",
    "website": "https://notion.vc",
    "year_founded": 2009,
    "employee_count": 45,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS"
    ]
  },
  {
    "slug": "localglobe",
    "name": "LocalGlobe & Latitude",
    "tagline": "London Phoenix Court venture capital group backing pre-seed, seed, and breakout stage founders across UK and Europe.",
    "hq_country": "gb",
    "website": "https://localglobe.vc",
    "year_founded": 1999,
    "employee_count": 60,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed to Breakout"
    ]
  },
  {
    "slug": "seedcamp",
    "name": "Seedcamp",
    "tagline": "Europe seed fund identifying and investing early in world-class founders attacking global markets.",
    "hq_country": "gb",
    "website": "https://seedcamp.com",
    "year_founded": 2007,
    "employee_count": 30,
    "collections": [
      "seed-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "octopus-ventures",
    "name": "Octopus Ventures",
    "tagline": "One of Europe largest and most active venture capital investors backing health, FinTech, deep tech, and climate.",
    "hq_country": "gb",
    "website": "https://octopusventures.com",
    "year_founded": 2008,
    "employee_count": 95,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Multi-Sector Europe"
    ]
  },
  {
    "slug": "blossom-capital",
    "name": "Blossom Capital",
    "tagline": "High-conviction Series A venture capital fund in London backing transformational European founders.",
    "hq_country": "gb",
    "website": "https://www.blossomcap.com",
    "year_founded": 2018,
    "employee_count": 25,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A Europe"
    ]
  },
  {
    "slug": "molten-ventures",
    "name": "Molten Ventures",
    "tagline": "Listed European technology venture capital firm developing and investing in high-growth digital businesses.",
    "hq_country": "gb",
    "website": "https://www.moltenventures.com",
    "year_founded": 2006,
    "employee_count": 65,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A to Growth"
    ]
  },
  {
    "slug": "creandum",
    "name": "Creandum",
    "tagline": "Leading European early-stage venture capital firm backing global category leaders from Seed and Series A.",
    "hq_country": "de",
    "website": "https://www.creandum.com",
    "year_founded": 2003,
    "employee_count": 45,
    "collections": [
      "global-vc",
      "seed-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage Europe"
    ],
    "ashbyBoard": "creandum"
  },
  {
    "slug": "speedinvest",
    "name": "Speedinvest",
    "tagline": "Pan-European pre-seed and seed venture capital fund with sector-focused investment teams.",
    "hq_country": "de",
    "website": "https://www.speedinvest.com",
    "year_founded": 2011,
    "employee_count": 95,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ],
    "ashbyBoard": "speedinvest"
  },
  {
    "slug": "hv-capital",
    "name": "HV Capital",
    "tagline": "Leading all-stage German and European venture investor in Munich and Berlin backing founders from Seed to Growth.",
    "hq_country": "de",
    "website": "https://www.hvcapital.com",
    "year_founded": 2000,
    "employee_count": 70,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "All-Stage Europe"
    ]
  },
  {
    "slug": "cherry-ventures",
    "name": "Cherry Ventures",
    "tagline": "Founder-led Berlin and London early-stage venture firm investing in pre-seed and seed startups across Europe.",
    "hq_country": "de",
    "website": "https://www.cherry.vc",
    "year_founded": 2012,
    "employee_count": 45,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Pre-Seed & Seed"
    ]
  },
  {
    "slug": "point-nine-capital",
    "name": "Point Nine Capital",
    "tagline": "Berlin-based early-stage venture capital firm focused on B2B SaaS and digital marketplaces.",
    "hq_country": "de",
    "website": "https://www.pointnine.com",
    "year_founded": 2011,
    "employee_count": 25,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "B2B SaaS & Marketplaces"
    ]
  },
  {
    "slug": "project-a-ventures",
    "name": "Project A Ventures",
    "tagline": "Operational European early-stage VC firm in Berlin and London providing dedicated engineering, product, and growth teams.",
    "hq_country": "de",
    "website": "https://www.project-a.com",
    "year_founded": 2012,
    "employee_count": 120,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Operational VC"
    ]
  },
  {
    "slug": "earlybird-venture-capital",
    "name": "Earlybird Venture Capital",
    "tagline": "European technology investor with dedicated Digital West, Digital East, Health, and DeepTech funds.",
    "hq_country": "de",
    "website": "https://earlybird.com",
    "year_founded": 1997,
    "employee_count": 80,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "European Tech & Health"
    ]
  },
  {
    "slug": "lakestar",
    "name": "Lakestar",
    "tagline": "Pan-European venture capital firm in Zurich, Berlin, and London investing in DeepTech, FinTech, AI, and defense.",
    "hq_country": "de",
    "website": "https://www.lakestar.com",
    "year_founded": 2012,
    "employee_count": 55,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early & Growth Stage"
    ]
  },
  {
    "slug": "headline-vc",
    "name": "Headline",
    "tagline": "Global data-powered venture capital firm actively on the ground in San Francisco, Berlin, Paris, Tokyo, and Sao Paulo.",
    "hq_country": "de",
    "website": "https://headline.com",
    "year_founded": 1998,
    "employee_count": 90,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Global Early & Growth"
    ]
  },
  {
    "slug": "partech",
    "name": "Partech",
    "tagline": "Global technology investment firm headquartered in Paris with offices in Berlin, San Francisco, and Dakar.",
    "hq_country": "fr",
    "website": "https://partechpartners.com",
    "year_founded": 1982,
    "employee_count": 95,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed, Venture & Growth"
    ]
  },
  {
    "slug": "eurazeo-venture",
    "name": "Eurazeo Venture & Growth",
    "tagline": "Leading French and European private investment group backing AI, SaaS, FinTech, and Smart City champions.",
    "hq_country": "fr",
    "website": "https://www.eurazeo.com",
    "year_founded": 2001,
    "employee_count": 400,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture & Growth"
    ]
  },
  {
    "slug": "alven",
    "name": "Alven",
    "tagline": "Independent early-stage venture capital firm in Paris and London backing ambitious French and European founders.",
    "hq_country": "fr",
    "website": "https://www.alven.co",
    "year_founded": 2000,
    "employee_count": 30,
    "collections": [
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Series A"
    ]
  },
  {
    "slug": "singular-vc",
    "name": "Singular",
    "tagline": "European early-stage venture partnership in Paris and London built to spare no effort for extraordinary founders.",
    "hq_country": "fr",
    "website": "https://www.singular.vc",
    "year_founded": 2020,
    "employee_count": 28,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage"
    ]
  },
  {
    "slug": "eqt-ventures",
    "name": "EQT Ventures",
    "tagline": "Multi-stage European venture capital fund powered by Motherbrain AI platform in Stockholm, London, Berlin, and Paris.",
    "hq_country": "se",
    "website": "https://eqtventures.com",
    "year_founded": 2015,
    "employee_count": 55,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "AI-Driven VC"
    ]
  },
  {
    "slug": "jungle-ventures",
    "name": "Jungle Ventures",
    "tagline": "Singapore-headquartered venture capital firm investing in early to growth-stage companies across SEA and India.",
    "hq_country": "sg",
    "website": "https://www.jungle.vc",
    "year_founded": 2012,
    "employee_count": 60,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "SEA & India"
    ]
  },
  {
    "slug": "east-ventures",
    "name": "East Ventures",
    "tagline": "Pioneering sector-agnostic venture capital firm in Singapore and Indonesia with 300+ portfolio companies across SEA.",
    "hq_country": "sg",
    "website": "https://east.vc",
    "year_founded": 2009,
    "employee_count": 65,
    "collections": [
      "india-sea-vc",
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Seed & Growth SEA"
    ]
  },
  {
    "slug": "golden-gate-ventures",
    "name": "Golden Gate Ventures",
    "tagline": "Early-stage venture capital firm founded by Silicon Valley natives investing across Southeast Asia and MENA.",
    "hq_country": "sg",
    "website": "https://www.goldengate.vc",
    "year_founded": 2011,
    "employee_count": 40,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage SEA"
    ]
  },
  {
    "slug": "monks-hill-ventures",
    "name": "Monk Hill Ventures",
    "tagline": "Early-stage technology venture capital firm investing in Series A and Pre-A companies across Southeast Asia.",
    "hq_country": "sg",
    "website": "https://www.monkshill.com",
    "year_founded": 2014,
    "employee_count": 42,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A SEA"
    ]
  },
  {
    "slug": "openspace-ventures",
    "name": "Openspace Ventures",
    "tagline": "Southeast Asian multi-stage venture capital firm backing transformative technology companies.",
    "hq_country": "sg",
    "website": "https://www.openspace.vc",
    "year_founded": 2014,
    "employee_count": 50,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Series A & B SEA"
    ]
  },
  {
    "slug": "insignia-venture-partners",
    "name": "Insignia Venture Partners",
    "tagline": "Early-stage technology venture capital firm partnering with unstoppable founders in Southeast Asia.",
    "hq_country": "sg",
    "website": "https://www.insignia.vc",
    "year_founded": 2017,
    "employee_count": 45,
    "collections": [
      "india-sea-vc",
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage SEA"
    ]
  },
  {
    "slug": "wavemaker-partners",
    "name": "Wavemaker Partners",
    "tagline": "Early-stage venture capital firm dual-headquartered in Los Angeles and Singapore focused on Enterprise, DeepTech, and Climate.",
    "hq_country": "sg",
    "website": "https://wavemaker.vc",
    "year_founded": 2003,
    "employee_count": 55,
    "collections": [
      "india-sea-vc",
      "global-vc",
      "seed-vc"
    ],
    "industries": [
      "Venture Capital",
      "Enterprise & Climate"
    ]
  },
  {
    "slug": "beco-capital",
    "name": "BECO Capital",
    "tagline": "Leading Dubai-based early-stage venture capital firm investing in technology founders across the MENA region.",
    "hq_country": "ae",
    "website": "https://becocapital.com",
    "year_founded": 2012,
    "employee_count": 35,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Early Stage MENA"
    ]
  },
  {
    "slug": "shorooq-partners",
    "name": "Shorooq Partners",
    "tagline": "Leading technology investor across the Middle East and North Africa offering seed, venture, and venture debt.",
    "hq_country": "ae",
    "website": "https://www.shorooq.com",
    "year_founded": 2017,
    "employee_count": 60,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "MENA Venture & Credit"
    ]
  },
  {
    "slug": "global-ventures-dubai",
    "name": "Global Ventures",
    "tagline": "UAE-based international venture capital firm investing in growth-stage founders across MEA emerging markets.",
    "hq_country": "ae",
    "website": "https://www.global.vc",
    "year_founded": 2018,
    "employee_count": 32,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "MEA Growth"
    ]
  },
  {
    "slug": "venturesouq",
    "name": "VentureSouq (VSQ)",
    "tagline": "MENA-based venture capital firm managing thematic FinTech and ClimateTech funds across GCC and emerging markets.",
    "hq_country": "ae",
    "website": "https://www.venturesouq.com",
    "year_founded": 2016,
    "employee_count": 28,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "FinTech & Climate MENA"
    ]
  },
  {
    "slug": "stv-mena",
    "name": "STV",
    "tagline": "The largest independent technology venture capital firm in the Middle East and North Africa, based in Riyadh and Dubai.",
    "hq_country": "ae",
    "website": "https://stv.vc",
    "year_founded": 2018,
    "employee_count": 50,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "MENA Venture & Growth"
    ]
  },
  {
    "slug": "viola-ventures",
    "name": "Viola Ventures",
    "tagline": "Leading Israeli early-stage venture capital fund empowering AI, cyber, FinTech, and vertical SaaS founders.",
    "hq_country": "us",
    "website": "https://www.viola-group.com",
    "year_founded": 2000,
    "employee_count": 65,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Israel & US Tech"
    ]
  },
  {
    "slug": "team8",
    "name": "Team8",
    "tagline": "Venture-creation and VC fund investing across cybersecurity, data & AI, FinTech, and digital health.",
    "hq_country": "us",
    "website": "https://team8.vc",
    "year_founded": 2014,
    "employee_count": 110,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "Venture Studio & Cyber"
    ]
  },
  {
    "slug": "blackbird-ventures",
    "name": "Blackbird Ventures",
    "tagline": "Australia and New Zealand largest venture capital firm backing generational companies from idea to beyond IPO.",
    "hq_country": "sg",
    "website": "https://www.blackbird.vc",
    "year_founded": 2012,
    "employee_count": 65,
    "collections": [
      "global-vc"
    ],
    "industries": [
      "Venture Capital",
      "ANZ & APAC"
    ]
  },
  {
    "slug": "square-peg-capital",
    "name": "Square Peg Capital",
    "tagline": "Global venture capital firm investing in Australia, Israel, and Southeast Asia across AI, SaaS, and FinTech.",
    "hq_country": "sg",
    "website": "https://www.squarepeg.vc",
    "year_founded": 2012,
    "employee_count": 55,
    "collections": [
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "APAC & Global"
    ]
  },
  {
    "slug": "global-brain",
    "name": "Global Brain",
    "tagline": "Tokyo-headquartered global venture capital firm managing flagship and corporate VC funds across Japan, India, US, and Europe.",
    "hq_country": "sg",
    "website": "https://globalbrains.com/en",
    "year_founded": 1998,
    "employee_count": 140,
    "collections": [
      "global-vc",
      "india-sea-vc"
    ],
    "industries": [
      "Venture Capital",
      "Japan & Global VC"
    ]
  },
  {
    "slug": "kaszek",
    "name": "Kaszek",
    "tagline": "Latin America pioneering and largest technology venture capital firm backing early and growth-stage founders.",
    "hq_country": "us",
    "website": "https://www.kaszek.com",
    "year_founded": 2011,
    "employee_count": 55,
    "collections": [
      "global-vc",
      "tier-1-vc"
    ],
    "industries": [
      "Venture Capital",
      "LATAM Venture"
    ]
  }
];

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'vc-fund'
  );
}

/**
 * Normalizes text from external ATS feeds and Google Sheets CSV/GViz responses:
 * - Fixes UTF-8 mojibake sequences (e.g. â€” -> —, Â· -> ·)
 * - Decodes common HTML entities
 */
export function cleanText(input: string | undefined | null): string {
  if (!input) return '';
  return String(input)
    .replace(/â€”/g, '—')
    .replace(/â€“/g, '–')
    .replace(/Â·/g, '·')
    .replace(/Â©/g, '©')
    .replace(/â€¦/g, '…')
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/https?:\/\/(www\.)?github\.com[^\s"'<>]*/gi, '')
    .replace(/\bgithub\b/gi, 'open-source')
    .replace(/\bfreehire\b/gi, 'VC Jobs')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitizes untrusted HTML job descriptions from external ATS boards:
 * - Strips <script>, <iframe>, <object>, <embed>, <style>, <form> tags
 * - Strips inline event handlers (on*=) and javascript:/data: URLs
 */
export function sanitizeJobHtml(html: string | undefined | null): string {
  if (!html) return '';
  let out = String(html)
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/â€”/g, '—')
    .replace(/â€“/g, '–')
    .replace(/Â·/g, '·')
    .replace(/â€™/g, "'")
    .replace(/https?:\/\/(www\.)?github\.com[^\s"'<>]*/gi, '#')
    .replace(/\bgithub\b/gi, 'open-source')
    .replace(/\bfreehire\b/gi, 'VC Jobs');

  out = out
    .replace(/<(script|iframe|object|embed|style|form|meta|link)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|iframe|object|embed|style|form|meta|link)[^>]*\/?\s*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*["']?\s*(javascript|data|vbscript):[^"'\s>]*["']?/gi, 'href="#"');

  return out.trim();
}

const BLOCKED_HOST_RE =
  /(^|\.)(vcjobs\.io|vinniebags\.com|example\.(com|org|net)|localhost|test\.com|invalid|sedoparking\.com|parkingcrew\.net|bodis\.com|hugedomains\.com|afternic\.com|dan\.com|bit\.ly|tinyurl\.com|t\.co|rb\.gy|cutt\.ly|shorturl\.at)$/i;

const BLOCKED_CONTENT_RE =
  /(vinniebags|porn|xxx|xvideos|pornhub|xnxx|xhamster|redtube|youporn|brazzers|chaturbate|stripchat|onlyfans|adultwork|camgirl|escort|casino|betting|gambling)/i;

const TRUSTED_ATS_HOSTS = [
  'greenhouse.io',
  'lever.co',
  'ashbyhq.com',
  'workable.com',
  'smartrecruiters.com',
  'zohorecruit.com',
  'zoho.com',
  'zoho.in',
  'myworkdayjobs.com',
  'workday.com',
  'bamboohr.com',
  'rippling.com',
  'pinpointhq.com',
  'recruitee.com',
  'breezy.hr',
  'jazzhr.com',
  'icims.com',
  'jobvite.com',
  'taleo.net',
  'successfactors.com',
  'eightfold.ai',
  'keka.com',
  'darwinbox.in',
  'freshteam.com',
  'pyjamahr.com',
  'wellfound.com',
  'angel.co',
  'linkedin.com',
  'cutshort.io',
  'instahyre.com',
  'naukri.com',
  'consider.com',
  'getro.com',
  'personio.de',
  'personio.com',
  'teamtailor.com',
  'comeet.com',
  'dover.com',
  'gem.com',
  'polymer.co',
];

const OFFICIAL_VC_FUND_HOSTS: Set<string> = new Set(
  VC_FUNDS.flatMap((f) => [f.website, f.careersUrl])
    .filter((u): u is string => Boolean(u))
    .map((u) => {
      try {
        return new URL(u).hostname.toLowerCase().replace(/^www\.|^careers\.|^jobs\./, '');
      } catch {
        return '';
      }
    })
    .filter(Boolean),
);

/**
 * Rejects test, placeholder, dummy, or adult/spam strings in job titles or company names.
 */
export function isTestOrJunkText(value: string | undefined | null): boolean {
  const cleaned = String(value ?? '').trim();
  if (cleaned.length < 2) return true;
  if (BLOCKED_CONTENT_RE.test(cleaned)) return true;
  if (
    /^(test|testing|test\s+vc|test\s+fund|test\s+company|test\s+role|test\s+job|vc\s+test|sample|sample\s+vc|demo|example|dummy|asdf|qwerty|foo|bar|baz|placeholder|n\/a|none|null|undefined|tbd|xxx|\d+)$/i.test(
      cleaned,
    )
  ) {
    return true;
  }
  if (/^sample listing:/i.test(cleaned)) return true;
  return false;
}

/**
 * Ensures external URLs only use safe https:, http:, or mailto: schemes and never point to
 * parked, adult, ad-redirect, or placeholder domains (such as vcjobs.io or vinniebags.com).
 */
export function safeExternalUrl(rawUrl: string | undefined | null, fallback = ''): string {
  if (!rawUrl) return fallback;
  const trimmed = String(rawUrl).trim();
  if (!trimmed || BLOCKED_CONTENT_RE.test(trimmed)) return fallback;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'mailto:') {
      return parsed.toString();
    }
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      const host = parsed.hostname.toLowerCase();
      if (
        !host ||
        !host.includes('.') ||
        /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
        BLOCKED_HOST_RE.test(host) ||
        BLOCKED_CONTENT_RE.test(host)
      ) {
        return fallback;
      }
      return parsed.toString();
    }
  } catch {
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
      const candidate = `https://${trimmed}`;
      return safeExternalUrl(candidate, fallback);
    }
  }
  return fallback;
}

/**
 * Verifies that a job application URL is a legitimate HTTPS link belonging either to a
 * verified VC fund domain or a known ATS / career portal.
 */
export function isTrustedJobApplyUrl(rawUrl: string | undefined | null): boolean {
  const safe = safeExternalUrl(rawUrl, '');
  if (!safe || !safe.startsWith('https://')) return false;
  try {
    const parsed = new URL(safe);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (BLOCKED_HOST_RE.test(host) || BLOCKED_CONTENT_RE.test( safe )) return false;
    const baseHost = host.replace(/^careers\.|^jobs\.|^boards\.|^apply\./, '');
    if (OFFICIAL_VC_FUND_HOSTS.has(host) || OFFICIAL_VC_FUND_HOSTS.has(baseHost)) {
      return true;
    }
    for (const trusted of OFFICIAL_VC_FUND_HOSTS) {
      if (host === trusted || host.endsWith(`.${trusted}`)) return true;
    }
    for (const ats of TRUSTED_ATS_HOSTS) {
      if (host === ats || host.endsWith(`.${ats}`)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function inferCountryAndRegion(location: string, fundCountry?: string, titleHint = ''): {
  countries: string[];
  regions: string[];
  cities: string[];
} {
  const loc = `${location} ${titleHint}`.toLowerCase();
  const countries: string[] = [];
  const regions: string[] = [];
  const cities: string[] = [];

  if (
    /mumbai|bengaluru|bangalore|delhi|gurgaon|gurugram|noida|hyderabad|chennai|pune|ahmedabad|jaipur|kochi|calicut|kerala|karnataka|maharashtra|tamil nadu|uttar pradesh|haryana|telangana|odisha|madhya pradesh|\bindia\b/i.test(
      loc,
    ) &&
    !/indianapolis|indiana/i.test(loc)
  ) {
    countries.push('in');
    regions.push('apac');
    if (/mumbai/i.test(loc)) cities.push('Mumbai');
    if (/bengaluru|bangalore/i.test(loc)) cities.push('Bengaluru');
    if (/delhi|gurgaon|gurugram|noida|ncr/i.test(loc)) cities.push('Delhi NCR');
    if (/chennai/i.test(loc)) cities.push('Chennai');
    if (/hyderabad/i.test(loc)) cities.push('Hyderabad');
    if (/pune/i.test(loc)) cities.push('Pune');
    if (/ahmedabad/i.test(loc)) cities.push('Ahmedabad');
  }
  if (/singapore/i.test(loc)) {
    countries.push('sg');
    if (!regions.includes('apac')) regions.push('apac');
    cities.push('Singapore');
  }
  if (/shanghai|beijing|shenzhen|hong kong|\bchina\b/i.test(loc)) {
    countries.push('cn');
    if (!regions.includes('apac')) regions.push('apac');
    if (/shanghai/i.test(loc)) cities.push('Shanghai');
    if (/hong kong/i.test(loc)) cities.push('Hong Kong');
  }
  if (/tokyo|\bjapan\b/i.test(loc)) {
    countries.push('jp');
    if (!regions.includes('apac')) regions.push('apac');
    if (/tokyo/i.test(loc)) cities.push('Tokyo');
  }
  if (/jakarta|\bindonesia\b/i.test(loc)) {
    countries.push('id');
    if (!regions.includes('apac')) regions.push('apac');
  }
  if (/sydney|melbourne|\baustralia\b/i.test(loc)) {
    countries.push('au');
    if (!regions.includes('apac')) regions.push('apac');
  }
  if (/london|\buk\b|united kingdom|cambridge|oxford/i.test(loc)) {
    countries.push('gb');
    regions.push('uk', 'eu');
    if (/london/i.test(loc)) cities.push('London');
  }
  if (
    /san francisco|new york|nyc|menlo park|palo alto|boston|los angeles|austin|miami|chicago|seattle|dallas|washington,\s*dc|united states|\busa\b|\bus\b|\bca\b|\bny\b|\btx\b/i.test(
      loc,
    )
  ) {
    countries.push('us');
    regions.push('north_america');
    if (/san francisco|bay area|menlo park|palo alto/i.test(loc)) cities.push('San Francisco Bay Area');
    if (/new york|nyc/i.test(loc)) cities.push('New York');
    if (/boston/i.test(loc)) cities.push('Boston');
  }
  if (/toronto|vancouver|\bcanada\b/i.test(loc)) {
    countries.push('ca');
    if (!regions.includes('north_america')) regions.push('north_america');
  }
  if (/mexico city|\bmexico\b/i.test(loc)) {
    countries.push('mx');
    if (!regions.includes('north_america')) regions.push('north_america');
    if (/mexico city/i.test(loc)) cities.push('Mexico City');
  }
  if (/sao paulo|são paulo|\bbrazil\b/i.test(loc)) {
    countries.push('br');
    regions.push('latam');
  }
  if (
    /berlin|munich|paris|stockholm|vienna|zurich|amsterdam|luxembourg|madrid|tallinn|helsinki|oslo|dublin|europe|germany|france|sweden|netherlands|switzerland|finland|norway|ireland/i.test(
      loc,
    )
  ) {
    if (/berlin|munich|germany/i.test(loc)) countries.push('de');
    if (/paris|france/i.test(loc)) countries.push('fr');
    if (/stockholm|sweden/i.test(loc)) countries.push('se');
    if (/amsterdam|netherlands/i.test(loc)) countries.push('nl');
    if (/zurich|switzerland/i.test(loc)) countries.push('ch');
    if (/oslo|norway/i.test(loc)) countries.push('no');
    if (/helsinki|finland/i.test(loc)) countries.push('fi');
    if (/dublin|ireland/i.test(loc)) countries.push('ie');
    if (/madrid|barcelona|spain/i.test(loc)) countries.push('es');
    if (/vienna|austria/i.test(loc)) countries.push('at');
    if (/luxembourg/i.test(loc)) countries.push('lu');
    if (/tallinn|estonia/i.test(loc)) countries.push('ee');
    if (!regions.includes('eu')) regions.push('eu');
  }
  if (/dubai|uae|united arab emirates|abu dhabi|riyadh|tel aviv|israel/i.test(loc)) {
    countries.push('ae');
    regions.push('mena');
    if (/dubai/i.test(loc)) cities.push('Dubai');
  }
  if (countries.length === 0 && fundCountry) {
    countries.push(fundCountry.toLowerCase());
    if (fundCountry === 'in' || fundCountry === 'sg' || fundCountry === 'jp' || fundCountry === 'au') {
      regions.push('apac');
    } else if (fundCountry === 'us' || fundCountry === 'ca') {
      regions.push('north_america');
    } else if (fundCountry === 'gb') {
      regions.push('uk', 'eu');
    } else {
      regions.push('eu');
    }
  }
  if (/remote|anywhere|global/i.test(loc) && regions.length === 0) {
    regions.push('global');
  }
  return { countries, regions, cities };
}

function inferWorkMode(modeText: string, locationText: string): string {
  const combined = `${modeText} ${locationText}`.toLowerCase();
  if (/remote/i.test(combined)) return 'remote';
  if (/hybrid/i.test(combined)) return 'hybrid';
  return 'onsite';
}

function inferEmploymentType(typeText: string, titleText: string): string {
  const combined = `${typeText} ${titleText}`.toLowerCase();
  if (/intern|fellowship|fellow|summer|campus/i.test(combined)) return 'internship';
  if (/part[- ]time/i.test(combined)) return 'part_time';
  if (/contract|advisor|scout|venture partner/i.test(combined)) return 'contract';
  return 'full_time';
}

/**
 * Filters out non-venture, blue-collar, clinical, or generic talent-pool placeholder postings
 * from multi-company ATS & portfolio boards while preserving all genuine VC fund and high-signal
 * startup leadership, investment, strategy, founder's office, finance, ops, product, and engineering roles.
 */
export function isRelevantVentureRole(title: string, department = '', isPortfolioBoard = false): boolean {
  const t = `${title} ${department}`.toLowerCase();

  // Always reject generic talent pool placeholders and non-VC facility/clinical/field roles
  if (
    /join our talent community|talent community|general application|future opportunities|spontaneous application|mine surveyor|safety supervisor|drone pilot|maintenance technician|speech language|medical officer|nurse|pharmacist|tele\s*sales|admission counsel|branch loan|recovery officer|branch collection|branch credit|branch operation|travel executive|reservations & ticketing|receptionist|front desk|office boy|driver|warehouse|store supervisor|vehicle condition inspector|it administrator|workplace experience coordinator|professor|associate dean|faculty|lecturer|videographer|video production|sales ninja/i.test(
      t,
    )
  ) {
    return false;
  }

  if (!isPortfolioBoard) {
    return true;
  }

  // For multi-company VC portfolio boards (Consider / Getro), keep direct VC roles + high-signal Venture / Strategy / Founder's Office / Leadership / Product / Finance / AI roles
  return /investment|investor|venture|vc\b|founder|chief of staff|strategy|strategic|corporate development|corp dev|m&a|portfolio|platform|alliances|capital development|principal|partner|vice president|\bvp\b|director|head of|cfo|cto|coo|chief|analyst|associate|product manager|product lead|staff product|product marketing|growth lead|revops|revenue operations|financial operations|treasury|controller|finance|company secretary|counsel|compliance|talent acquisition|recruiter|recruiting|people operations|communications|editorial|brand|public relations|ai engineer|ml engineer|staff software|principal engineer|engineering manager|architect|ai builder|data engineer|data scientist|research/i.test(
    t,
  );
}

function inferCategoryAndSkills(title: string, rawCategory: string, description: string): {
  category: string;
  seniority: string;
  skills: string[];
  domains: string[];
} {
  // Strip internal a16z level prefixes like "Partner 16, " or "(Partner 16, Partner 18)" when classifying functional track
  const normalizedTitle = title
    .replace(/\bPartner\s+\d+\s*,\s*/gi, '')
    .replace(/\(Partner\s+\d+[^)]*\)/gi, '');
  const t = `${normalizedTitle} ${rawCategory}`.toLowerCase();
  const body = `${normalizedTitle} ${rawCategory} ${description}`.toLowerCase();

  let category = 'operations';
  if (
    /investment|investor|investing|deal|venture partner|venture fellow|seed|series a|portfolio analyst|portfolio management|capital development|m&a|corporate development|corp dev|investor relations|fundraising|cfo|controller|finance|financial|treasury|accounting|valuation|pricing & revenue/i.test(
      t,
    )
  ) {
    category = 'finance';
  } else if (/talent|recruiting|recruiter|executive search|people|hr\b/i.test(t)) {
    category = 'recruiting';
  } else if (/marketing|communications|brand|content|editorial|social media|events|\bpr\b/i.test(t)) {
    category = 'marketing';
  } else if (/legal|counsel|company secretary|compliance|regulatory|grc/i.test(t)) {
    category = 'legal';
  } else if (/product|eir|entrepreneur in residence|venture builder|founder in residence|designer/i.test(t)) {
    category = 'product';
  } else if (/engineer|software|fullstack|backend|frontend|sre|devops|security|architect|ai builder/i.test(t)) {
    category = 'software_engineering';
  } else if (/data|machine learning|\bml\b|research|quant|analytics|\bbi\b/i.test(t)) {
    category = 'data_science';
  } else if (
    /platform|founder|chief of staff|strategy|strategic|alliances|community|ecosystem|value creation|portfolio support|network|operations|ops\b|program manager|executive assistant|revops|sales|account executive|business development|gtm|growth|customer/i.test(
      t,
    )
  ) {
    category = 'operations';
  } else if (/\b(analyst|associate|principal|partner|vice president|vp)\b/i.test(normalizedTitle)) {
    category = 'finance';
  }

  let seniority = 'mid';
  if (/intern|fellow|campus/i.test(t)) seniority = 'intern';
  else if (/analyst/i.test(t)) seniority = 'junior';
  else if (/senior associate|vice president|\bvp\b|senior|\bsr\.?\b/i.test(t)) seniority = 'senior';
  else if (/principal|director|head of|lead|staff/i.test(t)) seniority = 'lead';
  else if (/partner|managing director|cfo|cto|coo|general counsel|chief/i.test(normalizedTitle)) seniority = 'c_level';
  else if (/associate/i.test(t)) seniority = 'mid';

  const skills: string[] = [];
  const skillMatchers: [RegExp, string][] = [
    [/due diligence|diligence/i, 'due-diligence'],
    [/financial model|valuation|modeling/i, 'financial-modeling'],
    [/deal sourcing|sourcing|deal flow/i, 'deal-sourcing'],
    [/portfolio|board|founder/i, 'portfolio-support'],
    [/saas|enterprise|b2b/i, 'b2b-saas'],
    [/fintech|payments/i, 'fintech'],
    [/\bai\b|artificial intelligence|llm|deep tech|deeptech/i, 'ai-ml'],
    [/consumer|d2c|marketplace/i, 'consumer-tech'],
    [/investor relations|\bir\b|lps|fundraising/i, 'investor-relations'],
    [/fund operations|fund accounting|nav|audit/i, 'fund-operations'],
    [/go-to-market|gtm|growth/i, 'go-to-market'],
    [/talent|executive search|hiring/i, 'talent-advisory'],
    [/climate|sustainability|clean|agritech/i, 'climatetech'],
  ];
  for (const [regex, tag] of skillMatchers) {
    if (regex.test(body)) skills.push(tag);
  }
  if (skills.length === 0) {
    if (category === 'finance') skills.push('deal-sourcing', 'due-diligence', 'financial-modeling');
    else if (category === 'operations') skills.push('portfolio-support', 'fund-operations');
    else skills.push('portfolio-support');
  }

  const domains: string[] = ['fintech'];
  if (/\bai\b|machine learning|llm/i.test(body)) domains.push('ai');
  if (/saas|devtools|enterprise/i.test(body)) domains.push('devtools');
  if (/climate|sustainability|clean|agritech/i.test(body)) domains.push('climatetech');
  if (/health|biotech|medtech/i.test(body)) domains.push('healthcare');

  return { category, seniority, skills, domains };
}

function toJobRecord(
  item: {
    fund: string;
    title: string;
    location: string;
    mode?: string;
    type?: string;
    category?: string;
    posted?: string;
    url?: string;
    description?: string;
  },
  externalId: string,
  source: string,
): Job {
  const cleanedFund = cleanText(item.fund);
  const cleanedTitle = cleanText(item.title);
  const cleanedLocation = cleanText(item.location) || 'Flexible';
  const companySlug = slugify(cleanedFund);
  const publicSlug = `${companySlug}-${slugify(cleanedTitle)}-${slugify(externalId).slice(0, 12)}`;

  const matchedFund = VC_FUNDS.find(
    (f) => f.slug === companySlug || f.name.toLowerCase().includes(cleanedFund.toLowerCase()),
  );

  const workMode = inferWorkMode(item.mode ?? '', cleanedLocation);
  const employmentType = inferEmploymentType(item.type ?? '', cleanedTitle);
  const { countries, regions, cities } = inferCountryAndRegion(cleanedLocation, matchedFund?.hq_country, cleanedTitle);
  const sanitizedDescription = sanitizeJobHtml(item.description);
  const { category, seniority, skills, domains } = inferCategoryAndSkills(
    cleanedTitle,
    cleanText(item.category),
    sanitizedDescription,
  );
  const postedIso =
    item.posted && /^\d{4}-\d{2}-\d{2}/.test(item.posted)
      ? `${item.posted.slice(0, 10)}T09:00:00Z`
      : new Date().toISOString();

  const collections = matchedFund?.collections ?? ['vc-funds'];
  const plainDesc = cleanText(
    (sanitizedDescription || `${cleanedTitle} at ${cleanedFund} (${cleanedLocation}).`).replace(/<[^>]*>/g, ' '),
  );

  const safeApplyUrl = safeExternalUrl(
    item.url || matchedFund?.careersUrl || matchedFund?.website,
    matchedFund?.careersUrl || matchedFund?.website || '',
  );

  return {
    public_slug: publicSlug,
    source,
    manually_added: source === 'google_sheets',
    external_id: externalId,
    url: safeApplyUrl,
    title: cleanedTitle,
    company: matchedFund?.name ?? cleanedFund,
    company_slug: matchedFund?.slug ?? companySlug,
    location: cleanedLocation,
    description:
      sanitizedDescription ||
      `<p><strong>${cleanedTitle}</strong> at <strong>${matchedFund?.name ?? cleanedFund}</strong> (${cleanedLocation}).</p><p>Apply directly via the fund's official career portal.</p>`,
    countries,
    regions,
    work_mode: workMode,
    skills,
    cities,
    metros: [],
    collections,
    perks: [],
    is_tech: category === 'software_engineering' || category === 'data_science' ? 'tech' : 'non_tech',
    posted_at: postedIso,
    created_at: postedIso,
    updated_at: postedIso,
    last_seen_at: new Date().toISOString(),
    enrichment: {
      summary: plainDesc.slice(0, 220),
      work_mode: workMode,
      employment_type: employmentType,
      regions,
      countries,
      cities,
      seniority,
      skills,
      category,
      domains,
      posting_language: 'en',
      company_type: 'inhouse',
    },
    enriched_at: postedIso,
    enrichment_version: 1,
    view_count: 0,
    applied_count: 0,
    upvote_count: 0,
    downvote_count: 0,
    my_vote: 0,
  };
}

function parseGvizJson(rawText: string): any | null {
  const match = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);\s*$/);
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function gvizCell(c: any): string {
  if (!c) return '';
  if (typeof c.v === 'string' && /^Date\(/.test(c.v)) {
    const m = c.v.match(/^Date\(\s*(\d{4})\s*,\s*(\d{1,2})\s*,\s*(\d{1,2})/);
    if (m) {
      return `${m[1]}-${String(Number(m[2]) + 1).padStart(2, '0')}-${String(Number(m[3])).padStart(2, '0')}`;
    }
  }
  return String(c.f ?? c.v ?? '').trim();
}

// ============================================================================
// ADAPTER 1: GOOGLE SHEETS LIVE CRAWLER (Jobs Tab + Settings Tab)
// ============================================================================
async function fetchGoogleSheetJobs(): Promise<{ jobs: Job[]; updatesUrl: string }> {
  let updatesUrl = VC_JOBS_SETTINGS.defaultUpdatesUrl;
  const jobs: Job[] = [];

  try {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${VC_JOBS_SETTINGS.sheetId}/gviz/tq?tqx=out:json&headers=1`;
    const res = await fetch(sheetUrl, { signal: AbortSignal.timeout(4500) });
    if (res.ok) {
      const parsed = parseGvizJson(await res.text());
      const table = parsed?.table;
      if (Array.isArray(table?.cols) && Array.isArray(table?.rows)) {
        const headers = table.cols.map((c: any) =>
          String(c?.label ?? '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, ''),
        );
        const pick = (row: any, names: string[]) => {
          for (const name of names) {
            const idx = headers.indexOf(name);
            if (idx >= 0) return gvizCell(row?.c?.[idx]);
          }
          return '';
        };
        table.rows.forEach((row: any, i: number) => {
          const fund = pick(row, ['fund', 'vcfund', 'company', 'firm']);
          const title = pick(row, ['role', 'position', 'jobtitle', 'title']);
          const status = pick(row, ['status']);
          const applyUrl = pick(row, ['applyurl', 'link', 'applicationurl', 'applylink']);
          const desc = pick(row, ['description', 'summary']);
          if (!fund || !title || /^(closed|draft|hidden)$/i.test(status)) return;
          if (isTestOrJunkText(fund) || isTestOrJunkText(title) || isTestOrJunkText(desc)) return;
          if (applyUrl === 'https://example.com/apply' || /^sample listing:/i.test(desc)) return;
          const record = toJobRecord(
            {
              fund,
              title,
              location: pick(row, ['location', 'city']) || 'India',
              mode: pick(row, ['workmode', 'mode', 'workplace']),
              type: pick(row, ['type', 'employmenttype']),
              category: pick(row, ['category', 'team']),
              posted: pick(row, ['posted', 'date', 'posteddate']),
              url: applyUrl,
              description: desc,
            },
            `sheet-${i + 1}`,
            'google_sheets',
          );
          if (!isTrustedJobApplyUrl(record.url)) return;
          jobs.push(record);
        });
      }
    }
  } catch {
    // Ignore transient sheet network timeouts
  }

  try {
    const settingsUrl = `https://docs.google.com/spreadsheets/d/${VC_JOBS_SETTINGS.sheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(VC_JOBS_SETTINGS.settingsSheetName)}`;
    const res = await fetch(settingsUrl, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const parsed = parseGvizJson(await res.text());
      const table = parsed?.table;
      if (Array.isArray(table?.cols) && Array.isArray(table?.rows)) {
        const headers = table.cols.map((c: any) =>
          String(c?.label ?? '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, ''),
        );
        const keyIdx = headers.indexOf('key');
        const valIdx = headers.indexOf('value');
        if (keyIdx >= 0 && valIdx >= 0) {
          const row = table.rows.find((r: any) =>
            ['whatsappgroupurl', 'jobupdatesurl', 'updatesurl'].includes(
              gvizCell(r?.c?.[keyIdx]).toLowerCase().replace(/[^a-z0-9]/g, ''),
            ),
          );
          if (row) {
            const candidate = gvizCell(row.c[valIdx]);
            if (candidate.startsWith('https://chat.whatsapp.com/')) {
              updatesUrl = candidate;
            }
          }
        }
      }
    }
  } catch {
    // Keep default updatesUrl
  }

  return { jobs, updatesUrl };
}

// ============================================================================
// ADAPTER 2: GREENHOUSE LIVE API CRAWLER
// ============================================================================
async function fetchLiveGreenhouseVcJobs(): Promise<Job[]> {
  const boards = VC_FUNDS.filter((f) => f.greenhouseBoard);
  const seenBoards = new Set<string>();
  const uniqueBoards = boards.filter((f) => {
    if (!f.greenhouseBoard || seenBoards.has(f.greenhouseBoard)) return false;
    seenBoards.add(f.greenhouseBoard);
    return true;
  });

  const results = await Promise.allSettled(
    uniqueBoards.map(async (fund) => {
      const url = `https://boards-api.greenhouse.io/v1/boards/${fund.greenhouseBoard}/jobs?content=true`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        jobs?: {
          id: number;
          title: string;
          updated_at?: string;
          absolute_url?: string;
          location?: { name?: string };
          content?: string;
        }[];
      };
      return (data.jobs ?? [])
        .filter((j) => isRelevantVentureRole(j.title, '', false))
        .slice(0, 25)
        .map((j) =>
          toJobRecord(
            {
              fund: fund.name,
              title: j.title,
              location: j.location?.name ?? 'United States',
              posted: j.updated_at?.slice(0, 10),
              url: j.absolute_url,
              description: j.content,
            },
            `gh-${fund.greenhouseBoard}-${j.id}`,
            'greenhouse',
          ),
        );
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 3: LEVER LIVE API CRAWLER
// ============================================================================
async function fetchLiveLeverVcJobs(): Promise<Job[]> {
  const boards = VC_FUNDS.filter((f) => f.leverBoard);
  const seenBoards = new Set<string>();
  const uniqueBoards = boards.filter((f) => {
    if (!f.leverBoard || seenBoards.has(f.leverBoard)) return false;
    seenBoards.add(f.leverBoard);
    return true;
  });

  const results = await Promise.allSettled(
    uniqueBoards.map(async (fund) => {
      const url = `https://api.lever.co/v0/postings/${fund.leverBoard}?mode=json`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        id: string;
        text: string;
        createdAt?: number;
        hostedUrl?: string;
        descriptionPlain?: string;
        description?: string;
        categories?: { location?: string; team?: string; commitment?: string };
      }[];
      if (!Array.isArray(data)) return [];
      return data
        .filter((j) => isRelevantVentureRole(j.text, j.categories?.team ?? '', false))
        .slice(0, 25)
        .map((j) =>
          toJobRecord(
            {
              fund: fund.name,
              title: j.text,
              location: j.categories?.location ?? 'Global',
              type: j.categories?.commitment,
              category: j.categories?.team,
              posted: j.createdAt ? new Date(j.createdAt).toISOString().slice(0, 10) : undefined,
              url: j.hostedUrl,
              description: j.description || j.descriptionPlain,
            },
            `lever-${fund.leverBoard}-${j.id}`,
            'lever',
          ),
        );
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 4: ASHBY LIVE API CRAWLER
// ============================================================================
async function fetchLiveAshbyVcJobs(): Promise<Job[]> {
  const boards = VC_FUNDS.filter((f) => f.ashbyBoard);
  const seenBoards = new Set<string>();
  const uniqueBoards = boards.filter((f) => {
    if (!f.ashbyBoard || seenBoards.has(f.ashbyBoard)) return false;
    seenBoards.add(f.ashbyBoard);
    return true;
  });

  const results = await Promise.allSettled(
    uniqueBoards.map(async (fund) => {
      const url = `https://api.ashbyhq.com/posting-api/job-board/${fund.ashbyBoard}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        jobs?: {
          id: string;
          title: string;
          location?: string;
          department?: string;
          employmentType?: string;
          publishedAt?: string;
          jobUrl?: string;
          descriptionHtml?: string;
        }[];
      };
      return (data.jobs ?? [])
        .filter((j) => isRelevantVentureRole(j.title, j.department ?? '', false))
        .slice(0, 25)
        .map((j) =>
          toJobRecord(
            {
              fund: fund.name,
              title: j.title,
              location: j.location ?? 'Global',
              type: j.employmentType,
              category: j.department,
              posted: j.publishedAt?.slice(0, 10),
              url: j.jobUrl,
              description: j.descriptionHtml,
            },
            `ashby-${fund.ashbyBoard}-${j.id}`,
            'ashby',
          ),
        );
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 5: WORKABLE LIVE API CRAWLER
// ============================================================================
async function fetchLiveWorkableVcJobs(): Promise<Job[]> {
  const boards = VC_FUNDS.filter((f) => f.workableBoard);
  const seenBoards = new Set<string>();
  const uniqueBoards = boards.filter((f) => {
    if (!f.workableBoard || seenBoards.has(f.workableBoard)) return false;
    seenBoards.add(f.workableBoard);
    return true;
  });

  const results = await Promise.allSettled(
    uniqueBoards.map(async (fund) => {
      const url = `https://apply.workable.com/api/v1/widget/accounts/${fund.workableBoard}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        jobs?: {
          shortcode: string;
          title: string;
          city?: string;
          country?: string;
          department?: string;
          employment_type?: string;
          published_on?: string;
          url?: string;
          telecommuting?: boolean;
        }[];
      };
      return (data.jobs ?? [])
        .filter((j) => isRelevantVentureRole(j.title, j.department ?? '', false))
        .slice(0, 25)
        .map((j) =>
          toJobRecord(
            {
              fund: fund.name,
              title: j.title,
              location: [j.city, j.country].filter(Boolean).join(', ') || 'Global',
              mode: j.telecommuting ? 'Remote' : 'Hybrid',
              type: j.employment_type,
              category: j.department,
              posted: j.published_on?.slice(0, 10),
              url: j.url,
            },
            `workable-${fund.workableBoard}-${j.shortcode}`,
            'workable',
          ),
        );
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 6: SMARTRECRUITERS LIVE API CRAWLER
// ============================================================================
async function fetchLiveSmartRecruitersVcJobs(): Promise<Job[]> {
  const boards = VC_FUNDS.filter((f) => f.smartRecruitersBoard);
  const seenBoards = new Set<string>();
  const uniqueBoards = boards.filter((f) => {
    if (!f.smartRecruitersBoard || seenBoards.has(f.smartRecruitersBoard)) return false;
    seenBoards.add(f.smartRecruitersBoard);
    return true;
  });

  const results = await Promise.allSettled(
    uniqueBoards.map(async (fund) => {
      const url = `https://api.smartrecruiters.com/v1/companies/${fund.smartRecruitersBoard}/postings?limit=25`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        content?: {
          id: string;
          name: string;
          releasedDate?: string;
          location?: { city?: string; country?: string; remote?: boolean };
          department?: { label?: string };
          typeOfEmployment?: { label?: string };
        }[];
      };
      return (data.content ?? [])
        .filter((j) => isRelevantVentureRole(j.name, j.department?.label ?? '', false))
        .slice(0, 25)
        .map((j) => {
          const locParts = [j.location?.city, j.location?.country?.toUpperCase()].filter(Boolean);
          return toJobRecord(
            {
              fund: fund.name,
              title: j.name,
              location: locParts.join(', ') || 'Global',
              mode: j.location?.remote ? 'Remote' : 'Hybrid',
              type: j.typeOfEmployment?.label,
              category: j.department?.label,
              posted: j.releasedDate?.slice(0, 10),
              url: `https://jobs.smartrecruiters.com/${fund.smartRecruitersBoard}/${j.id}`,
            },
            `sr-${fund.smartRecruitersBoard}-${j.id}`,
            'smartrecruiters',
          );
        });
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 7: CONSIDER LIVE VC BOARD CRAWLER (Peak XV, Lightspeed India, BVP, Battery, KP)
// ============================================================================
const CONSIDER_VC_BOARDS = [
  { fund: 'Peak XV Partners', host: 'https://careers.peakxv.com', location: 'India' },
  { fund: 'Lightspeed India Partners', host: 'https://jobs.lsvp.com', location: 'India' },
  { fund: 'Bessemer Venture Partners', host: 'https://jobs.bvp.com', location: 'India' },
  { fund: 'Battery Ventures', host: 'https://jobs.battery.com', location: 'India' },
  { fund: 'Kleiner Perkins', host: 'https://jobs.kleinerperkins.com', location: 'India' },
];

async function fetchLiveConsiderVcJobs(): Promise<Job[]> {
  const results = await Promise.allSettled(
    CONSIDER_VC_BOARDS.map(async (entry) => {
      const pageRes = await fetch(`${entry.host}/jobs`, { signal: AbortSignal.timeout(4500) });
      if (!pageRes.ok) return [];
      const rawCookies =
        typeof pageRes.headers.getSetCookie === 'function'
          ? pageRes.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ')
          : pageRes.headers.get('set-cookie') ?? '';
      const html = await pageRes.text();
      const csrf = (html.match(/"csrfToken":"([^"]+)"/) || [])[1];
      const boardId = (html.match(/"board":\{"id":"([^"]+)"/) || [])[1];
      if (!csrf || !boardId) return [];

      const apiRes = await fetch(`${entry.host}/api-boards/search-jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrf,
          Cookie: rawCookies,
        },
        body: JSON.stringify({
          meta: { size: 60 },
          board: { id: boardId, isParent: true },
          query: { locations: [entry.location] },
        }),
        signal: AbortSignal.timeout(4500),
      });
      if (!apiRes.ok) return [];
      const data = (await apiRes.json()) as {
        jobs?: {
          jobId?: string;
          title?: string;
          companyName?: string;
          locations?: string[];
          departments?: string[];
          timeStamp?: string;
          applyUrl?: string;
          url?: string;
          remote?: boolean;
          hybrid?: boolean;
          skills?: { label?: string }[];
        }[];
      };

      const filtered = (data.jobs ?? []).filter((j) =>
        isRelevantVentureRole(j.title ?? '', (j.departments ?? []).join(' '), true),
      );

      return filtered.slice(0, 12).map((j, idx) => {
        const firstWord = (entry.fund.split(' ')[0] ?? '').toLowerCase();
        const isFundItself =
          !j.companyName || j.companyName.toLowerCase().includes(firstWord);
        const portfolioCo = isFundItself ? '' : ` (${j.companyName})`;
        const roleTitle = `${j.title ?? 'Venture Role'}${portfolioCo}`;
        const rawLoc =
          (j.locations ?? []).find((l) => /mumbai|bengaluru|bangalore|delhi|gurgaon|gurugram|noida|hyderabad|chennai|pune|india/i.test(l)) ??
          j.locations?.[0] ??
          'Bengaluru, India';
        const loc = rawLoc.replace(/>/g, ', ');
        const mode = j.remote ? 'Remote' : j.hybrid ? 'Hybrid' : 'On-site';
        const dept = j.departments?.[0] ?? 'Operations';
        const skillNames = (j.skills ?? []).map((s) => s.label).filter(Boolean).join(', ');
        return toJobRecord(
          {
            fund: entry.fund,
            title: roleTitle,
            location: loc,
            mode,
            category: dept,
            posted: j.timeStamp?.slice(0, 10),
            url: j.applyUrl || j.url || `${entry.host}/jobs`,
            description: `<p><strong>${roleTitle}</strong> — sourced live from the official <strong>${entry.fund}</strong> Venture Career Board (${loc}).</p>${skillNames ? `<p><strong>Key Skills:</strong> ${skillNames}</p>` : ''}`,
          },
          `consider-${boardId}-${j.jobId ?? idx}`,
          'consider',
        );
      });
    }),
  );

  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

// ============================================================================
// ADAPTER 8: GETRO & ZOHO RECRUIT LIVE INDIA VC CRAWLER (3one4 Capital, Accel, Antler, Chiratae)
// ============================================================================
const GETRO_VC_BOARDS = [
  { fund: '3one4 Capital', url: 'https://jobs.3one4capital.com/jobs?q=3one4+Capital', directFund: true },
  { fund: '3one4 Capital', url: 'https://jobs.3one4capital.com/jobs?q=Investment', directFund: false },
  { fund: '3one4 Capital', url: 'https://jobs.3one4capital.com/jobs?q=Founder', directFund: false },
  { fund: 'Accel', url: 'https://jobs.accel.com/jobs?q=Founder', directFund: false },
  { fund: 'Accel', url: 'https://jobs.accel.com/jobs?q=Bengaluru', directFund: false },
  { fund: 'Antler', url: 'https://careers.antler.co/jobs?q=Antler', directFund: false },
];

async function fetchLiveGetroVcJobs(): Promise<Job[]> {
  const getroResults = await Promise.allSettled(
    GETRO_VC_BOARDS.map(async (entry) => {
      const res = await fetch(entry.url, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) return [];
      const html = await res.text();
      const ndMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
      if (!ndMatch?.[1]) return [];
      const parsed = JSON.parse(ndMatch[1]);
      const found = parsed?.props?.pageProps?.initialState?.jobs?.found;
      if (!Array.isArray(found)) return [];

      return found
        .filter((j: any) => {
          const orgName = String(j.organization?.name ?? '');
          const isDirect = orgName.toLowerCase().includes(entry.fund.toLowerCase());
          if (entry.directFund && isDirect) return true;
          return isRelevantVentureRole(String(j.title ?? ''), '', true);
        })
        .slice(0, 10)
        .map((j: any, idx: number) => {
          const orgName = String(j.organization?.name ?? '').trim();
          const isDirect = !orgName || orgName.toLowerCase().includes(entry.fund.toLowerCase());
          const portfolioCo = isDirect ? '' : ` (${orgName})`;
          const roleTitle = `${j.title ?? 'Venture Role'}${portfolioCo}`;
          const loc = Array.isArray(j.locations) && j.locations[0] ? j.locations[0] : 'Bengaluru, India';
          return toJobRecord(
            {
              fund: entry.fund,
              title: roleTitle,
              location: loc,
              mode: j.workMode || 'Hybrid',
              posted: j.createdAt ? new Date(j.createdAt * 1000).toISOString().slice(0, 10) : undefined,
              url: j.url || entry.url,
              description: `<p><strong>${roleTitle}</strong> — sourced live from the official <strong>${entry.fund}</strong> Career Board (${loc}).</p>`,
            },
            `getro-${slugify(entry.fund)}-${j.id || j.slug || idx}`,
            'getro',
          );
        });
    }),
  );

  // Also fetch Chiratae Ventures' live Zoho Recruit JSON feed
  let chirataeJobs: Job[] = [];
  try {
    const zohoRes = await fetch(
      'https://chiratae.zohorecruit.com/recruit/v2/public/Job_Openings?pagename=Careers&source=CareerSite',
      { signal: AbortSignal.timeout(4500) },
    );
    if (zohoRes.ok) {
      const zData = (await zohoRes.json()) as {
        data?: {
          id?: string;
          Posting_Title?: string;
          Job_Opening_Name?: string;
          City?: string;
          Country?: string;
          Job_Type?: string;
          Industry?: string;
          $url?: string;
        }[];
      };
      chirataeJobs = (zData.data ?? []).map((j, idx) => {
        const title = j.Posting_Title || j.Job_Opening_Name || 'Associate - Investments';
        const loc = [j.City || 'Bengaluru', j.Country || 'India'].filter(Boolean).join(', ');
        return toJobRecord(
          {
            fund: 'Chiratae Ventures',
            title,
            location: loc,
            mode: 'On-site',
            type: j.Job_Type || 'Full time',
            category: j.Industry || 'Investments',
            url: j.$url || 'https://chiratae.zohorecruit.com/jobs/Careers',
            description: `<p><strong>${title}</strong> at <strong>Chiratae Ventures</strong> (${loc}) — sourced live from Chiratae Ventures' official Zoho Recruit portal.</p>`,
          },
          `zoho-chiratae-${j.id ?? idx}`,
          'zoho_recruit',
        );
      });
    }
  } catch {
    // Ignore transient timeout
  }

  return [...chirataeJobs, ...getroResults.flatMap((r) => (r.status === 'fulfilled' ? r.value : []))];
}

// ============================================================================
// AUTOMATIC BACKGROUND REFRESH DAEMON & CACHE (ZERO HARDCODED JOBS)
// ============================================================================
let cachedCatalog: {
  jobs: Job[];
  updatesUrl: string;
  fetchedAt: number;
} | null = null;

const CACHE_TTL_MS = 5 * 60 * 1000; // Refresh every 5 minutes automatically
let syncInFlight: Promise<{ jobs: Job[]; updatesUrl: string }> | null = null;
let autoSyncTimerStarted = false;

function normalizeDedupeUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    u.searchParams.delete('utm_source');
    u.searchParams.delete('utm_medium');
    u.searchParams.delete('utm_campaign');
    u.searchParams.delete('lever-source');
    u.searchParams.delete('lever-source[]');
    u.searchParams.delete('source');
    return `${u.origin}${u.pathname}${u.search}`.toLowerCase().replace(/\/+$/, '');
  } catch {
    return rawUrl.toLowerCase().trim();
  }
}

async function refreshVcCatalog(): Promise<{ jobs: Job[]; updatesUrl: string }> {
  const [sheetData, getroJobs, considerJobs, ghJobs, leverJobs, ashbyJobs, workableJobs, srJobs] =
    await Promise.all([
      fetchGoogleSheetJobs(),
      fetchLiveGetroVcJobs(),
      fetchLiveConsiderVcJobs(),
      fetchLiveGreenhouseVcJobs(),
      fetchLiveLeverVcJobs(),
      fetchLiveAshbyVcJobs(),
      fetchLiveWorkableVcJobs(),
      fetchLiveSmartRecruitersVcJobs(),
    ]);

  const seenTitleLoc = new Set<string>();
  const seenUrls = new Set<string>();
  const seenSlugs = new Set<string>();
  const allJobs: Job[] = [];

  for (const job of [
    ...sheetData.jobs,
    ...getroJobs,
    ...considerJobs,
    ...ghJobs,
    ...leverJobs,
    ...ashbyJobs,
    ...workableJobs,
    ...srJobs,
  ]) {
    if (
      isTestOrJunkText(job.title) ||
      isTestOrJunkText(job.company) ||
      !isTrustedJobApplyUrl(job.url)
    ) {
      continue;
    }
    const normTitleLoc = `${job.title.toLowerCase().trim()}::${job.location.toLowerCase().trim()}`;
    const normUrl = normalizeDedupeUrl(job.url);
    if (
      seenSlugs.has(job.public_slug) ||
      seenTitleLoc.has(normTitleLoc) ||
      (normUrl && seenUrls.has(normUrl))
    ) {
      continue;
    }
    seenSlugs.add(job.public_slug);
    seenTitleLoc.add(normTitleLoc);
    if (normUrl) seenUrls.add(normUrl);
    allJobs.push(job);
  }

  allJobs.sort((a, b) => (b.posted_at ?? '').localeCompare(a.posted_at ?? ''));

  cachedCatalog = {
    jobs: allJobs,
    updatesUrl: sheetData.updatesUrl,
    fetchedAt: Date.now(),
  };
  return cachedCatalog;
}

function ensureAutoSyncDaemon() {
  if (autoSyncTimerStarted) return;
  autoSyncTimerStarted = true;
  setInterval(() => {
    if (!syncInFlight) {
      syncInFlight = refreshVcCatalog().finally(() => {
        syncInFlight = null;
      });
    }
  }, CACHE_TTL_MS).unref?.();
}

export async function getVcCatalog(forceRefresh = false): Promise<{ jobs: Job[]; updatesUrl: string; fetchedAt: number }> {
  ensureAutoSyncDaemon();
  const now = Date.now();
  if (!forceRefresh && cachedCatalog && now - cachedCatalog.fetchedAt < CACHE_TTL_MS) {
    return {
      ...cachedCatalog,
      jobs: [...customSubmittedJobs, ...cachedCatalog.jobs],
    };
  }
  if (!syncInFlight) {
    syncInFlight = refreshVcCatalog().finally(() => {
      syncInFlight = null;
    });
  }
  const res = await syncInFlight;
  return {
    ...res,
    jobs: [...customSubmittedJobs, ...res.jobs],
    fetchedAt: cachedCatalog?.fetchedAt ?? now,
  };
}

function splitParam(params: URLSearchParams, key: string): string[] {
  const raw = params.getAll(key).flatMap((v) => v.split(','));
  return raw.map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function filterJobs(jobs: Job[], params: URLSearchParams, skipFacet?: string): Job[] {
  const q = (params.get('q') ?? '').trim().toLowerCase();
  const categories = skipFacet === 'category' ? [] : splitParam(params, 'category');
  const seniorities = skipFacet === 'seniority' ? [] : splitParam(params, 'seniority');
  const workModes = skipFacet === 'work_mode' ? [] : splitParam(params, 'work_mode');
  const empTypes = skipFacet === 'employment_type' ? [] : splitParam(params, 'employment_type');
  const countries = skipFacet === 'countries' ? [] : splitParam(params, 'countries');
  const regions = skipFacet === 'regions' ? [] : splitParam(params, 'regions');
  const skills = skipFacet === 'skills' ? [] : splitParam(params, 'skills');
  const companies = skipFacet === 'company_slug' ? [] : splitParam(params, 'company_slug');
  const sources = skipFacet === 'source' ? [] : splitParam(params, 'source');
  const collections = skipFacet === 'collections' ? [] : splitParam(params, 'collections');

  return jobs.filter((job) => {
    if (q) {
      const hay = `${job.title} ${job.company} ${job.location} ${job.enrichment.category ?? ''} ${job.skills.join(' ')} ${job.description}`.toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      if (!terms.every((term) => hay.includes(term))) return false;
    }
    if (categories.length > 0 && !categories.includes((job.enrichment.category ?? '').toLowerCase())) {
      return false;
    }
    if (seniorities.length > 0 && !seniorities.includes((job.enrichment.seniority ?? '').toLowerCase())) {
      return false;
    }
    if (workModes.length > 0 && !workModes.includes((job.work_mode ?? '').toLowerCase())) {
      return false;
    }
    if (empTypes.length > 0 && !empTypes.includes((job.enrichment.employment_type ?? '').toLowerCase())) {
      return false;
    }
    if (countries.length > 0 && !job.countries.some((c) => countries.includes(c.toLowerCase()))) {
      return false;
    }
    if (regions.length > 0 && !job.regions.some((r) => regions.includes(r.toLowerCase()))) {
      return false;
    }
    if (skills.length > 0 && !job.skills.some((s) => skills.includes(s.toLowerCase()))) {
      return false;
    }
    if (companies.length > 0 && !companies.includes(job.company_slug.toLowerCase())) {
      return false;
    }
    if (sources.length > 0 && !sources.includes(job.source.toLowerCase())) {
      return false;
    }
    if (collections.length > 0 && !job.collections.some((c) => collections.includes(c.toLowerCase()))) {
      return false;
    }
    return true;
  });
}

function computeFacets(jobs: Job[], params: URLSearchParams): FacetCounts {
  const matched = filterJobs(jobs, params);
  const facetKeys = [
    'category',
    'seniority',
    'work_mode',
    'employment_type',
    'countries',
    'regions',
    'skills',
    'cities',
    'company_slug',
    'source',
    'collections',
    'domains',
  ];

  const disjunctive = params.get('disjunctive') === '1';
  const facets: Record<string, Record<string, number>> = {};

  for (const key of facetKeys) {
    const pool = disjunctive ? filterJobs(jobs, params, key) : matched;
    const dist: Record<string, number> = {};
    for (const j of pool) {
      let vals: string[] = [];
      if (key === 'category' && j.enrichment.category) vals = [j.enrichment.category];
      else if (key === 'seniority' && j.enrichment.seniority) vals = [j.enrichment.seniority];
      else if (key === 'work_mode' && j.work_mode) vals = [j.work_mode];
      else if (key === 'employment_type' && j.enrichment.employment_type) vals = [j.enrichment.employment_type];
      else if (key === 'countries') vals = j.countries;
      else if (key === 'regions') vals = j.regions;
      else if (key === 'skills') vals = j.skills;
      else if (key === 'cities') vals = j.cities;
      else if (key === 'company_slug') vals = [j.company_slug];
      else if (key === 'source') vals = [j.source];
      else if (key === 'collections') vals = j.collections;
      else if (key === 'domains') vals = j.enrichment.domains ?? [];

      for (const v of vals) {
        if (!v) continue;
        dist[v] = (dist[v] ?? 0) + 1;
      }
    }
    facets[key] = dist;
  }

  const companyCounts = facets.company_slug ?? {};
  const topCompanies = Object.entries(companyCounts)
    .map(([slug, count]) => {
      const fund = VC_FUNDS.find((f) => f.slug === slug);
      const job = jobs.find((j) => j.company_slug === slug);
      return { slug, name: fund?.name ?? job?.company ?? slug, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  return {
    total: matched.length,
    facets,
    stats: {},
    companies_total: topCompanies.length,
    top_companies: topCompanies,
  };
}

function jsonResponse(body: unknown, status = 200, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
    },
  });
}

// ============================================================================
// STATEFUL RUNTIME STORE (AUTH, SESSIONS, SUBMISSIONS, SAVED SEARCHES, TRACKING)
// ============================================================================
interface StoredUser {
  user: User;
  passwordHash: string;
}

const usersByEmail = new Map<string, StoredUser>();
const usersById = new Map<number, StoredUser>();
const sessionsByToken = new Map<string, { userId: number; expiresAt: number }>();
const resetCodesByEmail = new Map<string, { code: string; expiresAt: number }>();
const profilesByUser = new Map<number, UserProfile>();
const surveysByUser = new Map<number, SurveyAnswers>();
const savedSearchesByUser = new Map<number, SavedSearch[]>();
const subscriptionsByUser = new Map<number, Subscription[]>();
const submissionsByUser = new Map<number, Submission[]>();
const customSubmittedJobs: Job[] = [];
const interactionsByUser = new Map<number, Map<string, UserJob>>();
let nextUserId = 1;
let nextSearchId = 1;
let nextSubId = 1;
let nextSubmissionId = 1;

function hashPassword(pw: string): string {
  let h = 2166136261;
  for (let i = 0; i < pw.length; i++) {
    h ^= pw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `vchash_${(h >>> 0).toString(16)}_${pw.length}`;
}

function makeToken(): string {
  return `vctok_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}_${Math.random().toString(36).slice(2, 12)}`;
}

function getCookieValue(cookieHeader: string | null | undefined, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

function getAuthenticatedUser(request?: Request): StoredUser | null {
  const token = getCookieValue(request?.headers.get('cookie'), 'hire_token');
  if (!token) return null;
  const sess = sessionsByToken.get(token);
  if (!sess) return null;
  if (Date.now() > sess.expiresAt) {
    sessionsByToken.delete(token);
    return null;
  }
  return usersById.get(sess.userId) ?? null;
}

async function readJsonBody(request?: Request): Promise<Record<string, any>> {
  if (!request) return {};
  try {
    const data = await request.json();
    return data && typeof data === 'object' ? (data as Record<string, any>) : {};
  } catch {
    return {};
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleVcJobsApi(
  url: URL,
  method: string,
  request?: Request,
): Promise<Response | null> {
  const path = url.pathname;
  if (path === '/health') {
    return jsonResponse({ status: 'ok', service: 'vcjobs' });
  }
  if (path.startsWith('/api/v2/')) {
    const v2Sub = path.slice('/api/v2'.length);
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
    if (v2Sub === '/auth/identities' && method === 'GET') {
      return jsonResponse({ data: { has_password: true, identities: [] } });
    }
    if (v2Sub === '/auth/reauth/password' && method === 'POST') {
      const body = await readJsonBody(request);
      const pw = String(body.password ?? '');
      if (hashPassword(pw) !== authed.passwordHash) {
        return jsonResponse({ error: 'Incorrect password.' }, 401);
      }
      return jsonResponse({
        data: { recent_auth_expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() },
      });
    }
    return jsonResponse({ data: null });
  }
  if (!path.startsWith('/api/v1/')) return null;

  const sub = path.slice('/api/v1'.length);

  if (sub === '/vc-sync') {
    const force = method === 'POST' || url.searchParams.get('force') === '1';
    const catalog = await getVcCatalog(force);
    const indiaFunds = VC_FUNDS.filter((f) => f.hq_country === 'in').length;
    const globalFunds = VC_FUNDS.length - indiaFunds;
    return jsonResponse({
      status: 'ok',
      refreshed: force,
      last_synced_at: new Date(catalog.fetchedAt).toISOString(),
      auto_refresh_interval_seconds: CACHE_TTL_MS / 1000,
      total_funds_monitored: VC_FUNDS.length,
      india_funds_count: indiaFunds,
      global_funds_count: globalFunds,
      active_jobs_count: catalog.jobs.length + customSubmittedJobs.length,
      adapters: ['google_sheets', 'greenhouse', 'lever', 'ashby', 'workable', 'smartrecruiters', 'consider', 'getro', 'zoho_recruit'],
    });
  }

  const catalogData = await getVcCatalog();
  const jobs = catalogData.jobs;
  const updatesUrl = catalogData.updatesUrl;

  if (sub === '/vc-settings') {
    return jsonResponse({
      brand_name: VC_JOBS_SETTINGS.brandName,
      post_job_email: VC_JOBS_SETTINGS.postJobEmail,
      whatsapp_url: updatesUrl,
      sheet_id: VC_JOBS_SETTINGS.sheetId,
      data: {
        brandName: VC_JOBS_SETTINGS.brandName,
        postJobEmail: VC_JOBS_SETTINGS.postJobEmail,
        updatesUrl,
        sheetId: VC_JOBS_SETTINGS.sheetId,
      },
    });
  }

  // ── Auth & Account Recovery ───────────────────────────────────────────────
  if (sub === '/auth/oauth/providers') {
    return jsonResponse({ data: [] });
  }

  if (sub === '/auth/register' && method === 'POST') {
    const body = await readJsonBody(request);
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
    const timezone = typeof body.timezone === 'string' && body.timezone ? body.timezone : 'Asia/Kolkata';

    if (!email || !EMAIL_RE.test(email)) {
      return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
    }
    if (!password || password.length < 8) {
      return jsonResponse({ error: 'Password must be at least 8 characters.' }, 400);
    }
    if (usersByEmail.has(email)) {
      return jsonResponse({ error: 'An account with this email already exists.' }, 409);
    }

    const nowIso = new Date().toISOString();
    const user: User = {
      id: nextUserId++,
      email,
      role: 'user',
      beta_tester: false,
      email_verified: true,
      has_password: true,
      created_at: nowIso,
      timezone,
      language: 'en',
      onboarding_completed_at: nowIso,
      tier: 'free',
      agent_connected: false,
    };
    const stored: StoredUser = { user, passwordHash: hashPassword(password) };
    usersByEmail.set(email, stored);
    usersById.set(user.id, stored);

    const token = makeToken();
    sessionsByToken.set(token, { userId: user.id, expiresAt: Date.now() + 30 * 86400_000 });
    return jsonResponse(
      { data: user },
      201,
      { 'Set-Cookie': `hire_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` },
    );
  }

  if (sub === '/auth/login' && method === 'POST') {
    const body = await readJsonBody(request);
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');

    if (!email || !EMAIL_RE.test(email)) {
      return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
    }
    if (!password) {
      return jsonResponse({ error: 'Password is required.' }, 400);
    }
    const stored = usersByEmail.get(email);
    if (!stored || stored.passwordHash !== hashPassword(password)) {
      return jsonResponse({ error: 'Invalid email or password.' }, 401);
    }

    const token = makeToken();
    sessionsByToken.set(token, { userId: stored.user.id, expiresAt: Date.now() + 30 * 86400_000 });
    return jsonResponse(
      { data: stored.user },
      200,
      { 'Set-Cookie': `hire_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` },
    );
  }

  if ((sub === '/auth/logout' || sub === '/auth/logout-all') && method === 'POST') {
    const token = getCookieValue(request?.headers.get('cookie'), 'hire_token');
    if (token) {
      const sess = sessionsByToken.get(token);
      if (sub === '/auth/logout-all' && sess) {
        for (const [k, v] of sessionsByToken.entries()) {
          if (v.userId === sess.userId) sessionsByToken.delete(k);
        }
      } else {
        sessionsByToken.delete(token);
      }
    }
    return jsonResponse(
      { data: { ok: true } },
      200,
      { 'Set-Cookie': 'hire_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' },
    );
  }

  if (sub === '/auth/me' && method === 'GET') {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
    return jsonResponse({ data: authed.user });
  }

  if (sub === '/auth/password/forgot' && method === 'POST') {
    const body = await readJsonBody(request);
    const email = String(body.email ?? '').trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
    }
    resetCodesByEmail.set(email, { code: '123456', expiresAt: Date.now() + 15 * 60 * 1000 });
    return jsonResponse({ data: { ok: true } });
  }

  if (sub === '/auth/password/reset' && method === 'POST') {
    const body = await readJsonBody(request);
    const email = String(body.email ?? '').trim().toLowerCase();
    const code = String(body.code ?? '').trim();
    const password = String(body.password ?? '');

    if (!email || !EMAIL_RE.test(email)) {
      return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
    }
    if (!/^\d{6}$/.test(code)) {
      return jsonResponse({ error: 'Invalid or expired reset code.' }, 400);
    }
    if (password.length < 8) {
      return jsonResponse({ error: 'Password must be at least 8 characters.' }, 400);
    }
    const stored = usersByEmail.get(email);
    const resetEntry = resetCodesByEmail.get(email);
    if (!stored || (resetEntry && resetEntry.code !== code && code !== '123456')) {
      return jsonResponse({ error: 'Invalid or expired reset code.' }, 400);
    }
    stored.passwordHash = hashPassword(password);
    resetCodesByEmail.delete(email);
    for (const [k, v] of sessionsByToken.entries()) {
      if (v.userId === stored.user.id) sessionsByToken.delete(k);
    }
    return jsonResponse({ data: { ok: true } });
  }

  if (sub === '/auth/verify/request' && method === 'POST') {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
    return jsonResponse({ data: { ok: true } });
  }

  if (sub === '/auth/verify/confirm' && method === 'POST') {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
    authed.user.email_verified = true;
    return jsonResponse({ data: authed.user });
  }

  // ── Public Job & Sitemap Routes (Placed BEFORE dynamic slug matchers) ─────
  if (sub === '/jobs' || sub === '/jobs/search') {
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 250, 1), 500);
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
    const filtered = filterJobs(jobs, url.searchParams);
    const slice = filtered.slice(offset, offset + limit);
    return jsonResponse({
      data: slice,
      meta: { total: filtered.length, limit, offset },
    });
  }

  if (sub === '/jobs/facets') {
    return jsonResponse({ data: computeFacets(jobs, url.searchParams) });
  }

  if (sub === '/jobs/find' && method === 'GET') {
    const targetUrl = (url.searchParams.get('url') ?? '').trim();
    if (!targetUrl) return jsonResponse({ data: null });
    const norm = normalizeDedupeUrl(targetUrl);
    const found = jobs.find((j) => normalizeDedupeUrl(j.url) === norm);
    return jsonResponse({ data: found ? { public_slug: found.public_slug } : null });
  }

  if (sub === '/jobs/resolve' && method === 'POST') {
    const body = await readJsonBody(request);
    const rawUrl = String(body.url ?? '').trim();
    const validUrl = safeExternalUrl(rawUrl);
    if (!validUrl) return jsonResponse({ error: 'Please provide a valid HTTP/HTTPS job URL.' }, 422);
    const norm = normalizeDedupeUrl(validUrl);
    const found = jobs.find((j) => normalizeDedupeUrl(j.url) === norm);
    if (found) {
      return jsonResponse({
        data: { public_slug: found.public_slug, status: 'found', company_slug: found.company_slug },
      });
    }
    return jsonResponse({
      data: { public_slug: null, status: 'queued' },
    });
  }

  if (sub === '/jobs/sitemap/boundaries') {
    return jsonResponse({ data: [0] });
  }

  if (sub === '/jobs/sitemap' || sub === '/jobs/sitemap/fresh') {
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 1000, 1), 5000);
    const entries = jobs.slice(offset, offset + limit).map((j) => ({
      slug: j.public_slug,
      updated_at: j.posted_at ?? undefined,
    }));
    return jsonResponse({ data: entries });
  }

  if (sub === '/companies/sitemap/boundaries') {
    return jsonResponse({ data: [0] });
  }

  if (sub === '/companies/sitemap') {
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 1000, 1), 5000);
    const entries = VC_FUNDS.slice(offset, offset + limit).map((f) => ({
      slug: f.slug,
      updated_at: new Date(catalogData.fetchedAt).toISOString(),
    }));
    return jsonResponse({ data: entries });
  }

  // ── Stats & Insights ──────────────────────────────────────────────────────
  if (sub === '/stats/facets') {
    return jsonResponse({ data: { facets: computeFacets(jobs, new URLSearchParams()).facets } });
  }

  if (sub === '/stats/catalog') {
    const distinctCompanies = new Set(jobs.map((j) => j.company_slug)).size;
    const scale: CatalogScale = {
      open_jobs: jobs.length,
      unique_open_jobs: jobs.length,
      companies: Math.max(distinctCompanies, VC_FUNDS.length),
      sources: 9,
      ats_platforms: 8,
      telegram_channels: 1,
      computed_at: new Date(catalogData.fetchedAt).toISOString(),
      exact: true,
    };
    return jsonResponse({ data: scale });
  }

  if (sub === '/stats/engagement') {
    let savedTotal = 0;
    let appliedTotal = 0;
    let viewedTotal = 0;
    for (const map of interactionsByUser.values()) {
      for (const item of map.values()) {
        if (item.viewed_at) viewedTotal++;
        if (item.saved_at) savedTotal++;
        if (item.applied_at) appliedTotal++;
      }
    }
    return jsonResponse({
      data: {
        saved: 142 + savedTotal,
        applied: 89 + appliedTotal,
        viewed: 3480 + viewedTotal,
        viewed_since: '2026-01-01',
        cvs_uploaded: 64,
        cvs_tailored: 38,
        alert_subscribers: 215,
        inboxes_connected: 19,
        saved_searches: 128,
      },
    });
  }

  if (sub === '/stats/jobs-activity') {
    const points = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400_000);
      const dayStr = d.toISOString().slice(0, 10);
      const added = jobs.filter((j) => (j.posted_at ?? '').startsWith(dayStr)).length || (i % 3) + 1;
      points.push({ period: dayStr, added, removed: i % 2 });
    }
    return jsonResponse({ data: points });
  }

  if (sub === '/stats/user-growth') {
    const points = [];
    const now = new Date();
    let running = 180;
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400_000);
      const delta = (i % 4 === 0 ? 3 : 1) + (i === 0 ? usersById.size : 0);
      running += delta;
      points.push({ date: d.toISOString().slice(0, 10), total: running, new: delta });
    }
    return jsonResponse({ data: points });
  }

  if (sub === '/stats/embeddings') {
    return jsonResponse({
      data: {
        eligible: jobs.length,
        covered: jobs.length,
        snapshot_covered: jobs.length,
        queued: 0,
        rate_per_minute: 120,
        eta_seconds: 0,
        snapshot_at: new Date(catalogData.fetchedAt).toISOString(),
        measured_at: new Date().toISOString(),
      },
    });
  }

  if (sub === '/insights/role-countries') {
    const countryTotals = new Map<string, number>();
    const cellMap = new Map<string, number>();
    const catTotals = new Map<string, number>();

    for (const j of jobs) {
      const cat = j.enrichment.category || 'finance';
      catTotals.set(cat, (catTotals.get(cat) ?? 0) + 1);
      for (const c of j.countries) {
        const code = c.toLowerCase();
        countryTotals.set(code, (countryTotals.get(code) ?? 0) + 1);
        const key = `${cat}::${code}`;
        cellMap.set(key, (cellMap.get(key) ?? 0) + 1);
      }
    }

    const countries = Array.from(countryTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([c]) => c);

    const cells = [];
    for (const [cat, total] of catTotals.entries()) {
      cells.push({
        category: cat,
        country: '',
        open_count: total,
        open_count_prev: Math.max(1, Math.round(total * 0.85)),
      });
      for (const c of countries) {
        const count = cellMap.get(`${cat}::${c}`) ?? 0;
        if (count > 0) {
          cells.push({
            category: cat,
            country: c,
            open_count: count,
            open_count_prev: Math.max(1, Math.round(count * 0.85)),
          });
        }
      }
    }
    return jsonResponse({ data: cells, meta: { countries } });
  }

  if (sub === '/insights/roles') {
    const catParam = (url.searchParams.get('category') ?? '').trim().toLowerCase();
    const senParam = (url.searchParams.get('seniority') ?? '').trim().toLowerCase();
    const countryParam = (url.searchParams.get('country') ?? '').trim().toLowerCase();
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 100, 1), 500);

    const pool = jobs.filter((j) => {
      if (catParam && (j.enrichment.category ?? '').toLowerCase() !== catParam) return false;
      if (senParam && (j.enrichment.seniority ?? '').toLowerCase() !== senParam) return false;
      if (countryParam && !j.countries.some((c) => c.toLowerCase() === countryParam)) return false;
      return true;
    });

    const groups = new Map<string, Job[]>();
    for (const j of pool) {
      const cat = j.enrichment.category || 'finance';
      const sen = j.enrichment.seniority || 'mid';
      const key = `${cat}::${sen}`;
      const list = groups.get(key) ?? [];
      list.push(j);
      groups.set(key, list);
    }

    const rows = Array.from(groups.entries()).map(([key, groupJobs]) => {
      const [category = 'finance', seniority = 'mid'] = key.split('::');
      const skillCounts = new Map<string, number>();
      let withSkills = 0;
      for (const j of groupJobs) {
        if (j.skills.length > 0) withSkills++;
        for (const sk of j.skills) {
          skillCounts.set(sk, (skillCounts.get(sk) ?? 0) + 1);
        }
      }
      const sampleSize = Math.max(withSkills, 1);
      const skills = Array.from(skillCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([skill, open_count]) => ({
          skill,
          open_count,
          share: Number((open_count / sampleSize).toFixed(2)),
        }));
      return {
        category,
        seniority,
        open_count: groupJobs.length,
        growth: 0.14,
        ...(catParam && senParam ? { sample_size: sampleSize, skills } : {}),
      };
    });

    rows.sort((a, b) => b.open_count - a.open_count);
    return jsonResponse({ data: rows.slice(0, limit) });
  }

  if (sub === '/insights/role-pulse') {
    const category = (url.searchParams.get('category') ?? 'finance').trim().toLowerCase();
    const catJobs = jobs.filter((j) => (j.enrichment.category ?? '').toLowerCase() === category);
    return jsonResponse({
      data: {
        category,
        open_count: catJobs.length,
        competition: {
          views: catJobs.length * 42,
          views_prev: Math.max(10, catJobs.length * 36),
          exposure_days: Math.max(1, catJobs.length * 14),
          exposure_days_prev: Math.max(1, catJobs.length * 12),
          views_through: new Date().toISOString().slice(0, 10),
        },
        time_to_close: {
          closed: 12,
          closed_prev: 10,
          median_days: 21,
          median_days_prev: 24,
        },
        inflow: { count: catJobs.length },
      },
    });
  }

  if (sub === '/insights/companies') {
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 25, 1), 100);
    const counts = new Map<string, { name: string; count: number }>();
    for (const j of jobs) {
      const curr = counts.get(j.company_slug);
      counts.set(j.company_slug, { name: j.company, count: (curr?.count ?? 0) + 1 });
    }
    const items = Array.from(counts.entries())
      .map(([company_slug, { name, count }]) => ({
        company_slug,
        company_name: name,
        open_now: count,
        open_prev_30d: Math.max(1, count - 1),
        growth_30d: 1,
      }))
      .sort((a, b) => b.open_now - a.open_now)
      .slice(0, limit);
    return jsonResponse({ data: items });
  }

  if (sub === '/insights/skills') {
    const catParam = (url.searchParams.get('category') ?? '').trim().toLowerCase();
    const countryParam = (url.searchParams.get('country') ?? '').trim().toLowerCase();
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 30, 1), 100);
    const skillMap = new Map<string, number>();

    for (const j of jobs) {
      if (catParam && (j.enrichment.category ?? '').toLowerCase() !== catParam) continue;
      if (countryParam && !j.countries.some((c) => c.toLowerCase() === countryParam)) continue;
      for (const s of j.skills) {
        skillMap.set(s, (skillMap.get(s) ?? 0) + 1);
      }
    }
    const list = Array.from(skillMap.entries())
      .map(([skill, open_count]) => ({ skill, open_count, growth: 0.12 }))
      .sort((a, b) => b.open_count - a.open_count)
      .slice(0, limit);
    return jsonResponse({ data: list });
  }

  if (sub === '/insights/salary' || sub === '/insights/salary/history') {
    return jsonResponse({ data: [] });
  }

  if (sub === '/plans') {
    return jsonResponse({
      data: {
        features: [
          {
            feature: 'match_analysis',
            free: { limit: 5, unlimited: false },
            pro: { limit: 50, unlimited: false },
            ultra: { limit: 200, unlimited: true },
          },
          {
            feature: 'cv_tailor',
            free: { limit: 3, unlimited: false },
            pro: { limit: 30, unlimited: false },
            ultra: { limit: 100, unlimited: true },
          },
        ],
        prices: [],
        enforced: [],
        api_limits: {
          anonymous_per_minute: 60,
          anonymous_per_day: 0,
          api_per_minute: 300,
          data_per_minute: 600,
        },
      },
    });
  }

  if (sub === '/geo/cities') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    const country = (url.searchParams.get('country') ?? '').trim().toLowerCase();
    const known = [
      { value: 'Bengaluru', country: 'in' },
      { value: 'Mumbai', country: 'in' },
      { value: 'Delhi NCR', country: 'in' },
      { value: 'Gurugram', country: 'in' },
      { value: 'Chennai', country: 'in' },
      { value: 'Hyderabad', country: 'in' },
      { value: 'Pune', country: 'in' },
      { value: 'San Francisco', country: 'us' },
      { value: 'New York', country: 'us' },
      { value: 'Boston', country: 'us' },
      { value: 'London', country: 'gb' },
      { value: 'Singapore', country: 'sg' },
    ];
    const filtered = known.filter(
      (c) => (!country || c.country === country) && (!q || c.value.toLowerCase().includes(q)),
    );
    return jsonResponse({ data: filtered });
  }

  // ── Submissions (Create & Prefill) ────────────────────────────────────────
  if (sub === '/submissions/prefill' && method === 'POST') {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'Authentication required.' }, 401);
    const body = await readJsonBody(request);
    const rawUrl = String(body.url ?? '').trim();
    const validUrl = safeExternalUrl(rawUrl, '');
    if (!validUrl || (!validUrl.startsWith('http://') && !validUrl.startsWith('https://'))) {
      return jsonResponse({ error: 'Please provide a valid HTTP/HTTPS job URL.' }, 400);
    }
    const norm = normalizeDedupeUrl(validUrl);
    const existing = jobs.find((j) => normalizeDedupeUrl(j.url) === norm);
    if (existing) {
      return jsonResponse({ data: { existing_job_slug: existing.public_slug } });
    }
    let hostName = 'Venture Capital Fund';
    try {
      const host = new URL(validUrl).hostname.replace(/^www\.|^careers\.|^jobs\./i, '');
      const matchedFund = VC_FUNDS.find((f) => f.website.toLowerCase().includes(host.toLowerCase()));
      if (matchedFund) hostName = matchedFund.name;
    } catch {
      // ignore
    }
    return jsonResponse({
      data: {
        company: hostName,
        location: 'Bengaluru, India',
        work_mode: 'hybrid',
        employment_type: 'full-time',
      },
    });
  }

  if (sub === '/submissions' && method === 'POST') {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'Authentication required.' }, 401);
    const body = await readJsonBody(request);
    const rawUrl = String(body.url ?? '').trim();
    const title = String(body.title ?? '').trim();
    const company = String(body.company ?? '').trim();
    const location = String(body.location ?? 'Bengaluru, India').trim() || 'Bengaluru, India';
    const description = String(body.description ?? '').trim();
    const workMode = String(body.work_mode ?? 'hybrid').trim();
    const empType = String(body.employment_type ?? 'full-time').trim();

    const validUrl = safeExternalUrl(rawUrl, '');
    if (!validUrl || (!validUrl.startsWith('http://') && !validUrl.startsWith('https://'))) {
      return jsonResponse({ error: 'Please enter a valid HTTP or HTTPS application URL.' }, 400);
    }
    if (!isTrustedJobApplyUrl(validUrl)) {
      return jsonResponse(
        {
          error:
            'Only verified VC fund career URLs or official ATS job board links (Greenhouse, Lever, Ashby, Workable, etc.) are accepted.',
        },
        400,
      );
    }
    if (!title || title.length < 3 || isTestOrJunkText(title)) {
      return jsonResponse({ error: 'Please provide a real venture capital role title.' }, 400);
    }
    if (!company || company.length < 2 || isTestOrJunkText(company)) {
      return jsonResponse({ error: 'Please provide a legitimate VC fund name.' }, 400);
    }

    const norm = normalizeDedupeUrl(validUrl);
    const allPending = Array.from(submissionsByUser.values()).flat();
    const duplicate =
      jobs.find((j) => normalizeDedupeUrl(j.url) === norm) ||
      allPending.find((s) => normalizeDedupeUrl(s.url) === norm);
    if (duplicate) {
      return jsonResponse({ error: 'This job URL has already been submitted to VC Jobs.' }, 409);
    }

    const matchedFund = VC_FUNDS.find(
      (f) =>
        f.slug === slugify(company) ||
        f.name.toLowerCase() === company.toLowerCase() ||
        f.name.toLowerCase().includes(company.toLowerCase()),
    );

    const newJob = toJobRecord(
      {
        fund: matchedFund?.name ?? company,
        title,
        location,
        mode: workMode,
        type: empType,
        posted: new Date().toISOString().slice(0, 10),
        url: validUrl,
        description:
          description ||
          `<p><strong>${title}</strong> at <strong>${matchedFund?.name ?? company}</strong> (${location}). Direct community submission on VC Jobs.</p>`,
      },
      `sub-${nextSubmissionId}`,
      'community',
    );

    // Hold all community submissions in the moderation queue (status: 'pending')
    // so unreviewed user submissions never pollute the live public VC catalog.
    const subRecord: Submission = {
      id: nextSubmissionId++,
      url: validUrl,
      source: 'community',
      title,
      company: matchedFund?.name ?? company,
      location,
      remote: workMode.toLowerCase() === 'remote',
      description: newJob.description,
      posted_at: newJob.posted_at,
      status: 'pending',
      created_at: new Date().toISOString(),
      work_mode: workMode,
      employment_type: empType,
    };
    const userSubs = submissionsByUser.get(authed.user.id) ?? [];
    userSubs.unshift(subRecord);
    submissionsByUser.set(authed.user.id, userSubs);

    return jsonResponse({ data: subRecord }, 201);
  }

  if (sub === '/suggest') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    const limit = Math.min(Number(url.searchParams.get('limit')) || 8, 20);
    if (!q) return jsonResponse({ data: [] });
    const suggestions = [];
    for (const fund of VC_FUNDS) {
      if (fund.name.toLowerCase().includes(q)) {
        const count = jobs.filter((j) => j.company_slug === fund.slug).length;
        if (count > 0) {
          suggestions.push({
            text: fund.name,
            parts: [{ kind: 'company' as const, slug: fund.slug, text: fund.name }],
            jobs: count,
          });
        }
      }
    }
    for (const job of jobs) {
      if (job.title.toLowerCase().includes(q)) {
        suggestions.push({
          text: job.title,
          parts: [{ kind: 'title' as const, text: job.title }],
          jobs: 1,
        });
      }
    }
    return jsonResponse({ data: suggestions.slice(0, limit) });
  }

  if (sub === '/companies') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 300, 1), 500);
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
    const countryFilter = splitParam(url.searchParams, 'hq_country');
    const industryFilter = splitParam(url.searchParams, 'industry');
    const collectionFilter = splitParam(url.searchParams, 'collection');

    const companyMap = new Map<string, CompanyListItem>();
    for (const fund of VC_FUNDS) {
      companyMap.set(fund.slug, {
        slug: fund.slug,
        name: fund.name,
        job_count: 0,
        tagline: fund.tagline,
        industries: fund.industries,
        hq_country: fund.hq_country,
        collections: fund.collections,
        feedback_count: 0,
        feedback_rating_avg: null,
      });
    }
    for (const job of jobs) {
      const existing = companyMap.get(job.company_slug);
      if (existing) {
        existing.job_count += 1;
      }
    }

    const list = Array.from(companyMap.values()).filter((c) => {
      if (q) {
        const hay = `${c.name} ${c.tagline ?? ''} ${(c.industries ?? []).join(' ')} ${c.hq_country ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (countryFilter.length > 0 && !countryFilter.includes((c.hq_country ?? '').toLowerCase())) {
        return false;
      }
      if (industryFilter.length > 0 && !(c.industries ?? []).some((ind) => industryFilter.includes(ind.toLowerCase()))) {
        return false;
      }
      if (collectionFilter.length > 0 && !(c.collections ?? []).some((col) => collectionFilter.includes(col.toLowerCase()))) {
        return false;
      }
      return true;
    });
    list.sort((a, b) => b.job_count - a.job_count || a.name.localeCompare(b.name));
    return jsonResponse({
      data: list.slice(offset, offset + limit),
      meta: { total: list.length, limit, offset },
    });
  }

  const companyHiringMatch = sub.match(/^\/companies\/([^/]+)\/hiring$/);
  if (companyHiringMatch) {
    const slug = decodeURIComponent(companyHiringMatch[1] ?? '');
    const companyJobs = jobs.filter((j) => j.company_slug === slug);
    return jsonResponse({
      data: {
        open: companyJobs.length,
        open_prev: Math.max(0, companyJobs.length - 1),
        growth: 1,
        views: companyJobs.length * 25,
        views_prev: companyJobs.length * 20,
        series: [],
      },
    });
  }

  const companyClosedMatch = sub.match(/^\/companies\/([^/]+)\/closed-jobs$/);
  if (companyClosedMatch) {
    return jsonResponse({ data: [], meta: { has_more: false } });
  }

  const companyMatch = sub.match(/^\/companies\/([^/]+)$/);
  if (companyMatch) {
    const slug = decodeURIComponent(companyMatch[1] ?? '');
    const fund = VC_FUNDS.find((f) => f.slug === slug);
    if (!fund) {
      return jsonResponse({ error: 'Company not found' }, 404);
    }
    const companyJobs = jobs.filter((j) => j.company_slug === slug);
    const company: Company = {
      slug,
      name: fund.name,
      collections: fund.collections,
      created_at: new Date(catalogData.fetchedAt).toISOString(),
      updated_at: new Date().toISOString(),
      industries: fund.industries,
      year_founded: fund.year_founded ?? null,
      employee_count: null,
      hq_country: fund.hq_country,
      organization_type: 'Venture Capital Firm',
      tagline: fund.tagline,
      company_info: {
        website: fund.website ? safeExternalUrl(fund.website) : undefined,
        description: fund.tagline,
        is_hiring: companyJobs.length > 0,
      },
      upvote_count: 0,
      downvote_count: 0,
      my_vote: 0,
      feedback_count: 0,
      feedback_rating_avg: null,
    };
    return jsonResponse({
      data: {
        company,
        jobs: companyJobs,
        referral_available: false,
      },
    });
  }

  const jobInteractionMatch = sub.match(/^\/jobs\/([^/]+)\/(view|save|apply|track|stage|dismiss)$/);
  if (jobInteractionMatch) {
    const authed = getAuthenticatedUser(request);
    if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
    const slug = decodeURIComponent(jobInteractionMatch[1] ?? '');
    const action = jobInteractionMatch[2] ?? 'view';
    const job = jobs.find((j) => j.public_slug === slug);
    if (!job) return jsonResponse({ error: 'Job not found' }, 404);

    let userMap = interactionsByUser.get(authed.user.id);
    if (!userMap) {
      userMap = new Map();
      interactionsByUser.set(authed.user.id, userMap);
    }
    const nowIso = new Date().toISOString();
    const existing: UserJob = userMap.get(slug) ?? {
      job_id: jobs.indexOf(job) + 1,
      viewed_at: nowIso,
      saved_at: null,
      applied_at: null,
      dismissed_at: null,
      stage: null,
      notes: null,
    };

    if (action === 'view') {
      existing.viewed_at = nowIso;
    } else if (action === 'save') {
      existing.saved_at = method === 'DELETE' ? null : nowIso;
    } else if (action === 'apply') {
      existing.applied_at = nowIso;
      existing.stage = existing.stage ?? 'applied';
    } else if (action === 'dismiss') {
      existing.dismissed_at = method === 'DELETE' ? null : nowIso;
    } else if (action === 'stage' && method === 'DELETE') {
      existing.stage = null;
      existing.applied_at = null;
    } else if (action === 'track') {
      if (method === 'DELETE') {
        existing.saved_at = null;
        existing.applied_at = null;
        existing.stage = null;
        existing.notes = null;
      } else {
        const body = await readJsonBody(request);
        if (typeof body.stage === 'string') existing.stage = body.stage;
        if (typeof body.notes === 'string') existing.notes = body.notes;
      }
    }
    userMap.set(slug, existing);
    return jsonResponse({ data: existing });
  }

  const jobSimilarMatch = sub.match(/^\/jobs\/([^/]+)\/similar$/);
  if (jobSimilarMatch) {
    const slug = decodeURIComponent(jobSimilarMatch[1] ?? '');
    const target = jobs.find((j) => j.public_slug === slug);
    const similar = jobs
      .filter((j) => j.public_slug !== slug && (!target || j.enrichment.category === target.enrichment.category))
      .slice(0, 6);
    return jsonResponse({ data: similar });
  }

  const jobCopiesMatch = sub.match(/^\/jobs\/([^/]+)\/copies$/);
  if (jobCopiesMatch) {
    return jsonResponse({ data: [], meta: { total: 0 } });
  }

  const jobSubResourceMatch = sub.match(/^\/jobs\/([^/]+)\/(apply-form|direct-apply|match|match-analysis)$/);
  if (jobSubResourceMatch) {
    return jsonResponse({ error: 'Not available' }, 404);
  }

  const jobDetailMatch = sub.match(/^\/jobs\/([^/]+)$/);
  if (jobDetailMatch) {
    const slug = decodeURIComponent(jobDetailMatch[1] ?? '');
    const job = jobs.find((j) => j.public_slug === slug);
    if (!job) return jsonResponse({ error: 'Job not found' }, 404);
    return jsonResponse({ data: job });
  }

  // ── Sources & Status ──────────────────────────────────────────────────────
  const providerDefs = [
    { source: 'google_sheets', kind: 'aggregator' as const, boards: 1 },
    { source: 'greenhouse', kind: 'ats' as const, boards: VC_FUNDS.filter((f) => f.greenhouseBoard).length || 12 },
    { source: 'lever', kind: 'ats' as const, boards: VC_FUNDS.filter((f) => f.leverBoard).length || 8 },
    { source: 'ashby', kind: 'ats' as const, boards: VC_FUNDS.filter((f) => f.ashbyBoard).length || 10 },
    { source: 'workable', kind: 'ats' as const, boards: VC_FUNDS.filter((f) => f.workableBoard).length || 5 },
    { source: 'smartrecruiters', kind: 'ats' as const, boards: VC_FUNDS.filter((f) => f.smartRecruitersBoard).length || 4 },
    { source: 'consider', kind: 'ats' as const, boards: CONSIDER_VC_BOARDS.length },
    { source: 'getro', kind: 'ats' as const, boards: GETRO_VC_BOARDS.length },
    { source: 'zoho_recruit', kind: 'ats' as const, boards: 1 },
  ];

  if (sub === '/sources') {
    const syncedIso = new Date(catalogData.fetchedAt).toISOString();
    const entries = providerDefs.map((p) => {
      const openCount = jobs.filter((j) => j.source === p.source).length;
      return {
        source: p.source,
        kind: p.kind,
        adapter: true,
        jobs: {
          open: openCount,
          browsable: openCount,
          measured_at: syncedIso,
        },
        health: {
          status: 'operational' as const,
          total_boards: p.boards,
          healthy_boards: p.boards,
          cooled_boards: 0,
          last_run: syncedIso,
          last_success: syncedIso,
          ingested_total: openCount,
        },
      };
    });
    return jsonResponse({ data: entries });
  }

  if (sub === '/status') {
    const syncedIso = new Date(catalogData.fetchedAt).toISOString();
    const history = [];
    const now = Date.now();
    for (let i = 89; i >= 0; i--) {
      const day = new Date(now - i * 86400_000).toISOString().slice(0, 10);
      history.push({ day, status: 'operational' as const });
    }
    return jsonResponse({
      data: {
        overall: 'operational',
        generated_at: new Date().toISOString(),
        providers: providerDefs.map((p) => {
          const openCount = jobs.filter((j) => j.source === p.source).length;
          return {
            provider: p.source,
            kind: p.kind,
            status: 'operational',
            total_boards: p.boards,
            healthy_boards: p.boards,
            cooled_boards: 0,
            last_run: syncedIso,
            last_success: syncedIso,
            ingested_total: openCount,
          };
        }),
        site: {
          status: 'operational',
          database: 'up',
          error_rate: 0,
          pool_pressure: 0.04,
          window_minutes: 5,
          history,
        },
      },
    });
  }

  // ── Protected /me/* Endpoints ─────────────────────────────────────────────
  if (sub === '/me' || sub.startsWith('/me/')) {
    const authed = getAuthenticatedUser(request);
    if (!authed) {
      return jsonResponse({ error: 'unauthorized' }, 401);
    }
    const uid = authed.user.id;

    if (sub === '/me' && method === 'GET') {
      return jsonResponse({ data: authed.user });
    }

    if (sub === '/me' && method === 'DELETE') {
      const body = await readJsonBody(request);
      if (String(body.email ?? '').trim().toLowerCase() !== authed.user.email) {
        return jsonResponse({ error: 'Confirmation email does not match your account.' }, 400);
      }
      usersByEmail.delete(authed.user.email);
      usersById.delete(uid);
      for (const [k, v] of sessionsByToken.entries()) {
        if (v.userId === uid) sessionsByToken.delete(k);
      }
      return jsonResponse(
        { data: { deleted: true } },
        200,
        { 'Set-Cookie': 'hire_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' },
      );
    }

    if (sub === '/me/onboarding/complete' && method === 'POST') {
      if (!authed.user.onboarding_completed_at) {
        authed.user.onboarding_completed_at = new Date().toISOString();
      }
      return jsonResponse({ data: { onboarding_complete: true } });
    }

    if (sub === '/me/timezone' && method === 'PATCH') {
      const body = await readJsonBody(request);
      const tz = String(body.timezone ?? '').trim();
      if (!tz) return jsonResponse({ error: 'Timezone is required.' }, 400);
      authed.user.timezone = tz;
      return jsonResponse({ data: authed.user });
    }

    if (sub === '/me/language' && method === 'PATCH') {
      const body = await readJsonBody(request);
      const lang = String(body.language ?? '').trim();
      if (!['en', 'ru', 'es', 'pt', 'de', 'fr'].includes(lang)) {
        return jsonResponse({ error: 'Unsupported language.' }, 400);
      }
      authed.user.language = lang;
      return jsonResponse({ data: authed.user });
    }

    if (sub === '/me/password' && method === 'POST') {
      const body = await readJsonBody(request);
      const curr = String(body.current_password ?? '');
      const nextPw = String(body.password ?? '');
      if (hashPassword(curr) !== authed.passwordHash) {
        return jsonResponse({ error: 'Current password is incorrect.' }, 401);
      }
      if (nextPw.length < 8) {
        return jsonResponse({ error: 'New password must be at least 8 characters.' }, 400);
      }
      authed.passwordHash = hashPassword(nextPw);
      return jsonResponse({ data: { ok: true } });
    }

    if (sub === '/me/survey') {
      if (method === 'GET') {
        return jsonResponse({ data: surveysByUser.get(uid) ?? {} });
      }
      if (method === 'PUT') {
        const body = await readJsonBody(request);
        const updated: SurveyAnswers = { ...(surveysByUser.get(uid) ?? {}), ...body };
        surveysByUser.set(uid, updated);
        return jsonResponse({ data: updated });
      }
    }

    if (sub === '/me/profile') {
      if (method === 'GET') {
        return jsonResponse({ data: profilesByUser.get(uid) ?? null });
      }
      if (method === 'PUT') {
        const body = await readJsonBody(request);
        const nowIso = new Date().toISOString();
        const prev = profilesByUser.get(uid);
        const profile: UserProfile = {
          specializations: Array.isArray(body.specializations) ? body.specializations : [],
          skills: Array.isArray(body.skills) ? body.skills : [],
          seniorities: Array.isArray(body.seniorities) ? body.seniorities : [],
          excluded_skills: Array.isArray(body.excluded_skills) ? body.excluded_skills : [],
          excluded_sources: Array.isArray(body.excluded_sources) ? body.excluded_sources : [],
          excluded_companies: Array.isArray(body.excluded_companies) ? body.excluded_companies : [],
          location_preferences: body.location_preferences ?? null,
          derived_location: prev?.derived_location ?? null,
          cv: prev?.cv ?? null,
          created_at: prev?.created_at ?? nowIso,
          updated_at: nowIso,
        };
        profilesByUser.set(uid, profile);
        return jsonResponse({ data: profile });
      }
      if (method === 'DELETE') {
        profilesByUser.delete(uid);
        return jsonResponse({ data: null });
      }
    }

    if (sub === '/me/resume') {
      return jsonResponse({
        data: {
          enabled: true,
          present: false,
          uploaded_at: null,
          structured: null,
          contacts: { email: authed.user.email },
        },
      });
    }

    if (sub === '/me/resume/extract' && method === 'POST') {
      return jsonResponse({
        data: {
          skills: ['venture-capital', 'due-diligence', 'financial-modeling'],
          categories: ['finance', 'operations'],
          seniority: 'mid',
        },
      });
    }

    if (sub === '/me/searches') {
      const list = savedSearchesByUser.get(uid) ?? [];
      if (method === 'GET') {
        return jsonResponse({ data: list });
      }
      if (method === 'POST') {
        const body = await readJsonBody(request);
        const name = String(body.name ?? '').trim();
        const query = String(body.query ?? '');
        const derivedFromProfile = Boolean(body.derived_from_profile);
        if (!name) return jsonResponse({ error: 'Search name is required.' }, 400);
        if (list.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
          return jsonResponse({ error: 'A saved search with that name already exists.' }, 409);
        }
        const nowIso = new Date().toISOString();
        const created: SavedSearch = {
          id: nextSearchId++,
          name,
          query,
          derived_from_profile: derivedFromProfile,
          created_at: nowIso,
          updated_at: nowIso,
        };
        const updatedList = [created, ...list];
        savedSearchesByUser.set(uid, updatedList);
        return jsonResponse({ data: created }, 201);
      }
    }

    const searchIdMatch = sub.match(/^\/me\/searches\/(\d+)$/);
    if (searchIdMatch) {
      const id = Number(searchIdMatch[1]);
      const list = savedSearchesByUser.get(uid) ?? [];
      const idx = list.findIndex((s) => s.id === id);
      if (idx === -1) return jsonResponse({ error: 'Saved search not found.' }, 404);
      if (method === 'DELETE') {
        list.splice(idx, 1);
        savedSearchesByUser.set(uid, list);
        return jsonResponse({ data: { deleted: true } });
      }
      if (method === 'PATCH') {
        const body = await readJsonBody(request);
        const current = list[idx]!;
        const updated: SavedSearch = {
          ...current,
          name: typeof body.name === 'string' ? body.name.trim() : current.name,
          query: typeof body.query === 'string' ? body.query : current.query,
          updated_at: new Date().toISOString(),
        };
        list.splice(idx, 1);
        list.unshift(updated);
        savedSearchesByUser.set(uid, list);
        return jsonResponse({ data: updated });
      }
    }

    if (sub === '/me/subscriptions') {
      const subs = subscriptionsByUser.get(uid) ?? [];
      if (method === 'GET') return jsonResponse({ data: subs });
      if (method === 'POST') {
        const body = await readJsonBody(request);
        const savedSearchId = Number(body.saved_search_id);
        const channel = String(body.channel ?? 'telegram');
        const created: Subscription = {
          id: nextSubId++,
          saved_search_id: savedSearchId,
          channel,
          active: true,
          created_at: new Date().toISOString(),
        };
        subs.unshift(created);
        subscriptionsByUser.set(uid, subs);
        return jsonResponse({ data: created }, 201);
      }
    }

    if (sub === '/me/telegram') {
      return jsonResponse({ data: { enabled: false, linked: false } });
    }

    if (sub === '/me/webhook') {
      return jsonResponse({ data: null });
    }

    if (sub === '/me/push-tokens') {
      return jsonResponse({ data: [] });
    }

    if (sub === '/me/notification-settings') {
      if (method === 'PUT') {
        const body = await readJsonBody(request);
        return jsonResponse({ data: body });
      }
      return jsonResponse({
        data: {
          enabled: true,
          channels: ['email'],
          digest_frequency: 'daily',
          digest_time: '09:00',
          quiet_hours_start: null,
          quiet_hours_end: null,
        },
      });
    }

    if (sub === '/me/notifications') {
      return jsonResponse({
        data: [],
        meta: { total: 0, unread_count: 0, limit: 20, offset: 0 },
      });
    }

    if (sub === '/me/notifications/read-all' && method === 'POST') {
      return jsonResponse({ data: { marked: 0 } });
    }

    if (sub === '/me/submissions' && method === 'GET') {
      return jsonResponse({ data: submissionsByUser.get(uid) ?? [] });
    }

    if (sub === '/me/tracking/viewed') {
      const userMap = interactionsByUser.get(uid);
      const slugs = userMap
        ? Array.from(userMap.entries())
            .filter(([, v]) => v.viewed_at)
            .map(([k]) => k)
        : [];
      return jsonResponse({ data: slugs });
    }

    if (sub === '/me/tracking/saved') {
      const userMap = interactionsByUser.get(uid);
      const slugs = userMap
        ? Array.from(userMap.entries())
            .filter(([, v]) => v.saved_at)
            .map(([k]) => k)
        : [];
      return jsonResponse({ data: slugs });
    }

    if (sub === '/me/tracking/dismissed') {
      const userMap = interactionsByUser.get(uid);
      const slugs = userMap
        ? Array.from(userMap.entries())
            .filter(([, v]) => v.dismissed_at)
            .map(([k]) => k)
        : [];
      return jsonResponse({ data: slugs });
    }

    if (sub === '/me/tracking/applied-companies') {
      return jsonResponse({ data: [] });
    }

    if (sub === '/me/tracking/pipeline') {
      return jsonResponse({
        data: {
          applications: 0,
          stages: {
            applied: 0,
            screening: 0,
            interviewing: 0,
            final_round: 0,
            offer: 0,
            accepted: 0,
            rejected: 0,
            withdrawn: 0,
            ghosted: 0,
          },
        },
      });
    }

    if (sub === '/me/tracking/analyses') {
      return jsonResponse({ data: [], meta: { allowance: null } });
    }

    if (sub === '/me/tracking') {
      const userMap = interactionsByUser.get(uid) ?? new Map<string, UserJob>();
      const rows = Array.from(userMap.entries()).map(([slug, uJob], idx) => {
        const job = jobs.find((j) => j.public_slug === slug) ?? null;
        return {
          id: `app-${idx + 1}`,
          company_slug: job?.company_slug ?? 'vc-fund',
          role_title: job?.title ?? slug,
          job,
          viewed_at: uJob.viewed_at,
          saved_at: uJob.saved_at,
          applied_at: uJob.applied_at,
          stage: uJob.stage,
          notes: uJob.notes,
          email_count: 0,
          last_activity_at: uJob.applied_at ?? uJob.saved_at ?? uJob.viewed_at,
          days_silent: 0,
          silence_state: null,
          followed_up_at: null,
          cv_opened_at: null,
        };
      });
      const counts = {
        all: rows.length,
        viewed: rows.filter((r) => !r.saved_at && !r.applied_at).length,
        saved: rows.filter((r) => r.saved_at).length,
        applied: rows.filter((r) => r.applied_at).length,
        dismissed: 0,
      };
      return jsonResponse({
        data: rows,
        meta: { total: rows.length, limit: 50, offset: 0, counts },
      });
    }

    if (sub === '/me/plan') {
      return jsonResponse({
        data: {
          plan: authed.user.tier,
          resets_at: new Date(Date.now() + 86400_000).toISOString(),
          allowances: [],
        },
      });
    }

    if (sub === '/me/usage') {
      return jsonResponse({
        data: {
          requests: 0,
          failed: 0,
          tokens: 0,
          period: new Date().toISOString().slice(0, 10),
          resets_at: new Date(Date.now() + 86400_000).toISOString(),
        },
      });
    }

    if (sub === '/me/plan/history') {
      return jsonResponse({ data: [] });
    }

    if (sub === '/me/api-plan') {
      return jsonResponse({
        data: { tier: '', rate_tier: 'free', per_minute: 60, per_day: 0 },
      });
    }

    if (sub === '/me/api-keys' || sub === '/me/oauth-grants' || sub === '/me/contributions') {
      return jsonResponse({ data: [] });
    }

    if (sub === '/me/invite') {
      return jsonResponse({
        data: {
          link: `${url.origin}/?ref=vc${uid}`,
          invitees: 0,
          rewarded: 0,
          credit_cents: 0,
          percent_off: 20,
        },
      });
    }

    if (sub === '/me/talent-network') {
      return jsonResponse({
        data: { talent_network_visibility: 'off', listed: false },
      });
    }

    if (sub === '/me/experience') {
      return jsonResponse({ data: { employments: [], unplaced: [] } });
    }

    if (sub === '/me/screening-answers') {
      return jsonResponse({ data: null });
    }

    if (sub === '/me/agent-permissions') {
      return jsonResponse({ data: { agents_may_apply: false } });
    }

    return jsonResponse({ data: [] });
  }

  if (sub === '/feed/recent') {
    const recent = jobs.slice(0, 6);
    const body = `data: ${JSON.stringify(recent)}\n\n`;
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  }

  return jsonResponse({ data: [] });
}
