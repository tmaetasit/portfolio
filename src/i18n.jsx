import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES } from './data.js'
import { CYBER } from './cyber.js'
import { PROFILE_TH, ABILITIES_TH, EXPERIENCE_TH, EDUCATION_TH, PROJECTS_TH, CATEGORIES_TH } from './th.js'

// Deep merge: objects merge key by key, arrays merge item by item, strings are replaced.
function merge(base, over) {
  if (over === undefined) return base
  if (Array.isArray(over)) return over.map((o, i) => merge(base?.[i], o))
  if (over && typeof over === 'object') {
    const out = { ...(base || {}) }
    for (const k of Object.keys(over)) out[k] = merge(base?.[k], over[k])
    return out
  }
  return over
}

const DATA = {
  en: { PROFILE, ABILITIES, EXPERIENCE, EDUCATION, PROJECTS, CATEGORIES, CYBER: CYBER.en },
  th: {
    PROFILE: merge(PROFILE, PROFILE_TH),
    ABILITIES: merge(ABILITIES, ABILITIES_TH),
    EXPERIENCE: merge(EXPERIENCE, EXPERIENCE_TH),
    EDUCATION: merge(EDUCATION, EDUCATION_TH),
    PROJECTS: PROJECTS.map((p) => merge(p, PROJECTS_TH[p.slug])),
    CATEGORIES: merge(CATEGORIES, CATEGORIES_TH),
    CYBER: merge(CYBER.en, CYBER.th),
  },
}

const CV_SKILL_IDS = {
  tech: ['Tableau', 'Power BI', 'Python', 'Google Colab', 'SQLite', 'Excel', 'Data Analytics', 'React', 'Figma', 'Git', 'RAG / LLM'],
  ba: ['Requirement Gathering', 'Stakeholder Communication', 'Competitive & Market Trend Analysis', 'Data-Driven Decision Making'],
}

const UI = {
  en: {
    nav: { work: 'Work', 'what-i-do': 'What I can do', about: 'About', experience: 'Experience' }, cyberNav: 'Cybersecurity',
    navAria: 'Main', homeAria: 'home', themeAria: 'Switch light or dark theme', langAria: 'Language', menu: 'Menu', hireMe: 'Hire me',
    skip: 'Skip to content',
    typedLead: 'I focus on ', viewWork: 'View work', getInTouch: 'Get in touch', downloadResume: 'Download resume', cvMenu: 'Download CV', cvMenuHint: 'Choose the version for the role', cvRoles: { data: 'Data Analyst', ba: 'Business Analyst', cyber: 'Junior Cyber Security Engineer' },
    portraitOf: 'Portrait of', degreeLine: 'BSc Digital Technology, 2026', toolsAria: 'Tools I use',
    carouselAria: 'Project gallery. Use the left and right arrow keys.', open: 'Open', viewCase: 'View case study →',
    prevProject: 'Previous project', nextProjectAria: 'Next project', viewProject: 'View project →', chooseProject: 'Choose project',
    placeholderNote: 'Projects without screenshots yet show placeholder artwork.', coverAlt: 'preview',
    workEyebrow: 'Selected work', workTitle: 'Work gallery', workSub: 'Dashboards, analyses and prototypes from two internships.', allProjects: 'All projects ↗',
    doEyebrow: 'What I can do', doTitle: 'Three ways I help a team',
    aboutEyebrow: 'About me', aboutTitle: 'Turning raw data into decisions.', wantDetails: 'Want the details? Download my CV: ', downloadMyResume: 'Download my resume', currently: 'Currently',
    cvGroups: { tech: 'Technical skills', ba: 'Business analysis skills' },
    cvLabels: {
      Tableau: 'Tableau', 'Power BI': 'Power BI (basic)', Python: 'Python (data cleaning)', 'Google Colab': 'Google Colab (basic)', SQLite: 'SQL (SQLite)',
      Excel: 'Excel (advanced)', 'Data Analytics': 'Data analytics', React: 'React', Figma: 'Figma', Git: 'Git', 'RAG / LLM': 'Basic machine learning (RAG / LLM)',
      'Requirement Gathering': 'Requirement gathering', 'Stakeholder Communication': 'Stakeholder communication',
      'Competitive & Market Trend Analysis': 'Competitive and market trend analysis', 'Data-Driven Decision Making': 'Data-driven decision making',
    },
    expEyebrow: 'Experience', expTitle: 'Where I have worked',
    contactEyebrow: 'Get in touch', contactTitle: 'Let’s work together.',
    contactLede: 'Looking for the next problem worth solving. I am open to data analyst, business analyst and junior cyber security engineer roles where I can turn data and stakeholder needs into decisions.',
    downloadResumeArrow: 'Download resume →', email: 'Email', copyEmail: 'Copy email', copied: 'Copied',
    backToTop: 'Back to top ↑',
    archiveEyebrow: 'Archive', archiveTitle: 'All projects', archiveSub: 'A complete list of analytics and technical work.', filterAria: 'Filter projects',
    star: { situation: 'Situation', task: 'Task', action: 'Action', result: 'Result' },
    cmpTitle: 'Competitive summary', cmpSub: 'Facebook pages, ', cmpPosts: 'Posts in the three months', cmpFollowers: 'Followers',
    cmpBrands: 'Engagement by brand', client: 'Client', competitor: 'Competitor', chartsShow: 'What the charts show', contentHabits: 'Content habits',
    allFour: 'All four brands', avgEngagement: 'Average engagement',
    brandAlt: 'likes, comments and shares by month, engagement by day, and post categories', avgAlt: 'Average monthly engagement for the four brands',
    backGallery: '← Back to work gallery', theWork: 'The work', enlarge: 'Enlarge', enlargeAria: 'Enlarge', nextProject: 'Next project',
    notFound: 'Project not found', backAll: 'Back to all projects',
    close: 'Close', prev: '← Previous', next: 'Next →',
  },
  th: {
    nav: { work: 'ผลงาน', 'what-i-do': 'ความสามารถ', about: 'เกี่ยวกับผม', experience: 'ประสบการณ์' }, cyberNav: 'Cybersecurity',
    navAria: 'เมนูหลัก', homeAria: 'หน้าแรก', themeAria: 'สลับธีมสว่างหรือมืด', langAria: 'ภาษา', menu: 'เมนู', hireMe: 'ติดต่อผม',
    skip: 'ข้ามไปยังเนื้อหา',
    typedLead: 'ผมถนัด', viewWork: 'ดูผลงาน', getInTouch: 'ติดต่อผม', downloadResume: 'ดาวน์โหลดเรซูเม่', cvMenu: 'ดาวน์โหลด CV', cvMenuHint: 'เลือกฉบับตามตำแหน่งงาน', cvRoles: { data: 'Data Analyst', ba: 'Business Analyst', cyber: 'Junior Cyber Security Engineer' },
    portraitOf: 'รูปของ', degreeLine: 'วท.บ. เทคโนโลยีดิจิทัล, 2026', toolsAria: 'เครื่องมือที่ใช้',
    carouselAria: 'แกลเลอรีผลงาน ใช้ปุ่มลูกศรซ้ายขวาเพื่อเลื่อน', open: 'เปิด', viewCase: 'ดูรายละเอียด →',
    prevProject: 'โปรเจกต์ก่อนหน้า', nextProjectAria: 'โปรเจกต์ถัดไป', viewProject: 'ดูโปรเจกต์ →', chooseProject: 'เลือกโปรเจกต์',
    placeholderNote: 'โปรเจกต์ที่ยังไม่มีภาพหน้าจอจะแสดงภาพตัวอย่างแทน', coverAlt: 'ภาพตัวอย่าง',
    workEyebrow: 'ผลงานที่คัดมา', workTitle: 'แกลเลอรีผลงาน', workSub: 'แดชบอร์ด งานวิเคราะห์ และต้นแบบจากการฝึกงาน 2 แห่ง', allProjects: 'ผลงานทั้งหมด ↗',
    doEyebrow: 'ความสามารถ', doTitle: 'สามด้านที่ผมช่วยทีมได้',
    aboutEyebrow: 'เกี่ยวกับผม', aboutTitle: 'เปลี่ยนข้อมูลดิบให้เป็นการตัดสินใจ', wantDetails: 'ดูรายละเอียดเพิ่มเติม ดาวน์โหลด CV: ', downloadMyResume: 'ดาวน์โหลดเรซูเม่', currently: 'ตอนนี้',
    cvGroups: { tech: 'ทักษะด้านเทคนิค', ba: 'ทักษะด้านการวิเคราะห์ธุรกิจ' },
    cvLabels: {
      Tableau: 'Tableau', 'Power BI': 'Power BI (พื้นฐาน)', Python: 'Python (ทำความสะอาดข้อมูล)', 'Google Colab': 'Google Colab (พื้นฐาน)', SQLite: 'SQL (SQLite)',
      Excel: 'Excel (ขั้นสูง)', 'Data Analytics': 'การวิเคราะห์ข้อมูล', React: 'React', Figma: 'Figma', Git: 'Git', 'RAG / LLM': 'Machine Learning พื้นฐาน (RAG / LLM)',
      'Requirement Gathering': 'การเก็บ requirement', 'Stakeholder Communication': 'การสื่อสารกับผู้มีส่วนได้ส่วนเสีย',
      'Competitive & Market Trend Analysis': 'การวิเคราะห์คู่แข่งและแนวโน้มตลาด', 'Data-Driven Decision Making': 'การตัดสินใจโดยใช้ข้อมูล',
    },
    expEyebrow: 'ประสบการณ์', expTitle: 'ประสบการณ์ทำงาน',
    contactEyebrow: 'ติดต่อ', contactTitle: 'มาร่วมงานกันครับ',
    contactLede: 'กำลังมองหาโจทย์ใหม่ที่ท้าทาย พร้อมร่วมงานในตำแหน่ง Data Analyst, Business Analyst และ Junior Cyber Security Engineer ที่ได้เปลี่ยนข้อมูลและความต้องการของผู้เกี่ยวข้องให้เป็นการตัดสินใจ',
    downloadResumeArrow: 'ดาวน์โหลดเรซูเม่ →', email: 'อีเมล', copyEmail: 'คัดลอกอีเมล', copied: 'คัดลอกแล้ว',
    backToTop: 'กลับขึ้นด้านบน ↑',
    archiveEyebrow: 'รวมผลงาน', archiveTitle: 'ผลงานทั้งหมด', archiveSub: 'รายการงานวิเคราะห์ข้อมูลและงานเทคนิคทั้งหมด', filterAria: 'กรองผลงาน',
    star: { situation: 'สถานการณ์', task: 'โจทย์', action: 'สิ่งที่ทำ', result: 'ผลลัพธ์' },
    cmpTitle: 'สรุปภาพรวมการแข่งขัน', cmpSub: 'เพจ Facebook ช่วง ', cmpPosts: 'จำนวนโพสต์ใน 3 เดือน', cmpFollowers: 'ผู้ติดตาม',
    cmpBrands: 'Engagement รายแบรนด์', client: 'ลูกค้า', competitor: 'คู่แข่ง', chartsShow: 'สิ่งที่กราฟบอก', contentHabits: 'ลักษณะคอนเทนต์',
    allFour: 'ทั้ง 4 แบรนด์', avgEngagement: 'Engagement เฉลี่ย',
    brandAlt: 'ไลก์ คอมเมนต์ และแชร์รายเดือน engagement รายวัน และประเภทโพสต์', avgAlt: 'Engagement เฉลี่ยต่อเดือนของทั้ง 4 แบรนด์',
    backGallery: '← กลับไปที่แกลเลอรีผลงาน', theWork: 'ตัวอย่างงาน', enlarge: 'ขยาย', enlargeAria: 'ขยายภาพ', nextProject: 'โปรเจกต์ถัดไป',
    notFound: 'ไม่พบโปรเจกต์', backAll: 'กลับไปที่ผลงานทั้งหมด',
    close: 'ปิด', prev: '← ก่อนหน้า', next: 'ถัดไป →',
  },
}

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'th' || saved === 'en') return saved
  } catch (e) { /* storage may be blocked */ }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const setLang = (l) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch (e) { /* ignore */ }
  }
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DATA[lang].PROFILE.name
  }, [lang])
  const value = useMemo(() => ({ lang, setLang, t: UI[lang], D: DATA[lang], cvIds: CV_SKILL_IDS }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
