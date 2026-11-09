// All personal content lives here. Edit this file to change the site.

export const PROFILE = {
  name: 'Maetasit Pittatanang',
  short: 'Maetasit',
  monogram: 'M',
  role: 'Data Analyst & Business Analyst',
  location: 'Bangkok, Thailand',
  email: 'thaemaetasit@gmail.com',
  linkedin: 'https://www.linkedin.com/in/maetasit-pittatanang-b43bb8411/',
  // Put a web-safe resume PDF in /public and set e.g. '/Maetasit_Pittatanang_Resume.pdf'.
  // While empty, the "Download resume" buttons stay hidden.
  resumeUrl: 'Maetasit_Pittatanang_Resume.pdf',
  resumeCyberUrl: 'Maetasit_Pittatanang_CyberSecurity_Resume.pdf',
  github: 'https://github.com/tmaetasit',
  photo: 'img/portrait.webp',
  photoSm: 'img/portrait-sm.webp',
  tools: ['Python', 'Pandas', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Google Colab', 'React', 'Figma', 'Git'],
  status: 'Open to Data Analyst, Business Analyst and Junior Cyber Security Engineer roles',
  phrases: [
    'turning raw data into decisions.',
    'cleaning messy data with Python.',
    'building dashboards in Tableau.',
    'translating business needs into requirements.',
  ],
  intro:
    'Digital Technology graduate with over a year of internship experience in business analysis, data analytics and AI solution development. I clean messy data, build dashboards people can act on, and turn stakeholder needs into clear requirements.',
  about: [
    'I studied Digital Technology at the University of the Thai Chamber of Commerce and graduated in April 2026. Two internships since 2024 took me through market data at DataFirst and traffic data at Transdev.',
    'My work sits between the business question and the dataset: gathering requirements, preparing the data, and presenting the result so a decision can follow.',
  ],
  stats: [
    { value: '190,000+', label: 'Rows cleaned' },
    { value: '2', label: 'Internships' },
    { value: '1+ yr', label: 'Experience' },
    { value: '2026', label: 'Graduated' },
  ],
  currently: [
    { k: 'Building', v: 'Analytics dashboards' },
    { k: 'Exploring', v: 'LLM and RAG tools' },
    { k: 'Learning', v: 'SQL and machine learning' },
  ],
}

export const ABILITIES = [
  {
    title: 'Data Analytics',
    text: 'From raw files to dashboards that show what changed and where to look next.',
    items: ['Python (data cleaning)', 'SQL (SQLite)', 'Excel (advanced)', 'Tableau', 'Power BI (basic)', 'Google Colab (basic)'],
  },
  {
    title: 'Business Analysis',
    text: 'Working with stakeholders to define the problem before any chart is drawn.',
    items: ['Requirement gathering', 'Stakeholder communication', 'Competitive and market trend analysis', 'Data-driven decision making'],
  },
  {
    title: 'AI and Front-end',
    text: 'Prototypes that put analysis in front of users.',
    items: ['React', 'Figma', 'Git', 'RAG / LLM basics'],
  },
]

export const EXPERIENCE = [
  {
    org: 'Transdev',
    role: 'Business Analyst / AI Developer Intern',
    period: 'Aug 2025 – Nov 2025',
    points: [
      'Developed and evaluated a local RAG chatbot (React, LM Studio) by indexing complex document data to improve search accuracy and meet stakeholder requirements.',
      'Cleaned and transformed 190,000+ rows of raw traffic data with Python (Pandas) in Google Colab to prepare it for analytical modeling.',
      'Built Tableau dashboards with a Rush Hour Heatmap and a Hotspot Top 10 analysis to support route optimization.',
    ],
  },
  {
    org: 'DataFirst',
    role: 'Data Analyst / Front-end Developer Intern',
    period: 'Aug 2024 – Apr 2025',
    points: [
      'Cleaned and consolidated raw market data with Python, then built interactive social media dashboards that turned competitive trends into decision-ready insights.',
      'Analyzed FMCG media spending and Share of Voice across brands to find market trends and media strategy opportunities.',
      'Worked with a cross-functional team on a travel recommendation web application, focusing on user experience and user requirements.',
    ],
  },
]

export const EDUCATION = {
  org: 'University of the Thai Chamber of Commerce (UTCC)',
  role: 'Bachelor of Science in Digital Technology',
  period: '2022 – Apr 2026',
}


export { PROJECTS, CATEGORIES } from './projects.js'
