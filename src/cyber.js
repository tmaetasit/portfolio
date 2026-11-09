// Cybersecurity career page. Security content only.
// `en` is the base; `th` overrides it item by item (same order).
// The project section reads its numbers from src/content/pdpaLab.js.

export const CYBER = {
  en: {
    eyebrow: 'Career focus',
    title: 'Cybersecurity',
    role: 'Junior Cyber Security Engineer',
    intro:
      'A Digital Technology graduate pursuing a career as a Junior Cyber Security Engineer, with a proactive mindset to safeguard digital assets. I study the ISO/IEC 27001 and 27701 frameworks alongside DLP and EDR solutions, and I built a home lab that detects Thai personal data leaving an endpoint, using the same mechanisms commercial DLP, SWG/CASB and EDR products use.',
    traits: ['Detail-oriented', 'Quick to adapt', 'Log analysis', 'Data privacy (PDPA)'],

    projectTitle: 'Hands-on project',
    projectRead: 'Read the case study →',
    projectGithub: 'View on GitHub ↗',

    toolsTitle: 'Security products I have studied',
    toolsSub: 'Frameworks and commercial tools, and what each one is used for.',
    tools: [
      { name: 'ISO/IEC 27001 / 27701', kind: 'Framework', text: 'Security and privacy management frameworks. Applying the CIA Triad and data protection principles in practice.' },
      { name: 'DLP', vendor: 'Trellix', kind: 'Data Loss Prevention', text: 'Identifying sensitive data assets, configuring classification rules and preventing data leakage.' },
      { name: 'EDR', vendor: 'Trend Micro', kind: 'Endpoint Detection & Response', text: 'Analyzing endpoint telemetry, identifying suspicious behavior indicators and performing threat containment.' },
      { name: 'SEP', vendor: 'Symantec', kind: 'Endpoint Protection', text: 'Managing the endpoint security baseline, enforcing host firewall policies and controlling device access.' },
      { name: 'CASB / SWG', vendor: 'Skyhigh', kind: 'Cloud and Web Security', text: 'Inspecting web traffic, securing Shadow IT usage and enforcing cloud access control policies.' },
    ],

    skillsTitle: 'Technical skills',
    skillsSub: 'Groups marked “hands-on” are skills I used to build the PDPA lab.',
    skills: [
      { group: 'Security concepts', items: ['Data Loss Prevention (DLP)', 'Endpoint Detection & Response (EDR)', 'SWG / CASB', 'ISO/IEC 27001 / 27701', 'CIA Triad', 'Data privacy (PDPA)'] },
      { group: 'Detection and monitoring · hands-on', items: ['Wazuh (rules, severity levels, correlation, dashboards)', 'Sysmon', 'PowerShell Script Block Logging', 'File integrity monitoring', 'Custom detection rules', 'MITRE ATT&CK mapping', 'wazuh-logtest'] },
      { group: 'Web and cloud traffic · hands-on', items: ['mitmproxy (mini SWG)', 'Upload and prompt inspection', 'TLS inspection bypass lists', 'Cloud app risk rating', 'Shadow AI detection'] },
      { group: 'Scripting and lab · hands-on', items: ['Python (detection logic, Thai ID check digit, data masking)', 'pytest', 'Log and anomaly analysis', 'VirtualBox', 'Windows 11 endpoint', 'Ubuntu Server 24.04'] },
    ],

    pathTitle: 'My learning path',
    path: [
      { step: '01', title: 'Foundations', text: 'Core security principles of the CIA Triad (confidentiality, integrity, availability) and data privacy under PDPA, learned through ISO/IEC 27001 and 27701.' },
      { step: '02', title: 'Industry tools', text: 'From theory to practice: the tools that enforce these standards, covering data leak prevention, endpoint hardening, threat detection and cloud access control.' },
      { step: '03', title: 'Hands-on lab', text: 'Built the PDPA Data Leak Detection Lab in 7 days with open-source tools, in monitor mode with synthetic data only.' },
      { step: '04', title: 'Current focus', text: 'The emerging security challenges where AI meets data privacy, such as keeping sensitive data out of external AI services.' },
    ],

    ctaTitle: 'Looking for a Junior Cyber Security Engineer?',
    ctaText: 'I am open to Junior Cyber Security Engineer roles and ready to learn fast on a real security team.',
    ctaContact: 'Get in touch',
    resume: 'Download CV (Cyber Security) ↓',
    ctaBack: '← Back to home',
  },

  th: {
    eyebrow: 'สายงานที่สนใจ',
    intro:
      'บัณฑิตสาขาเทคโนโลยีดิจิทัลที่มุ่งสู่สายงาน Junior Cyber Security Engineer ด้วยความตั้งใจเชิงรุกที่จะปกป้องทรัพย์สินดิจิทัล กำลังศึกษามาตรฐาน ISO/IEC 27001 และ 27701 ควบคู่กับโซลูชัน DLP และ EDR และได้สร้างแล็บที่ตรวจจับข้อมูลส่วนบุคคลของคนไทยที่หลุดออกจากเครื่องปลายทาง ด้วยกลไกแบบเดียวกับผลิตภัณฑ์ DLP, SWG/CASB และ EDR เชิงพาณิชย์',
    traits: ['ละเอียดรอบคอบ', 'ปรับตัวเร็ว', 'วิเคราะห์ log', 'การคุ้มครองข้อมูลส่วนบุคคล (PDPA)'],

    projectTitle: 'โปรเจกต์ที่ลงมือทำจริง',
    projectRead: 'อ่านกรณีศึกษา →',
    projectGithub: 'ดูโค้ดบน GitHub ↗',

    toolsTitle: 'ผลิตภัณฑ์ด้านความปลอดภัยที่ศึกษา',
    toolsSub: 'มาตรฐานและเครื่องมือเชิงพาณิชย์ และหน้าที่ของแต่ละตัว',
    tools: [
      { kind: 'มาตรฐาน', text: 'มาตรฐานการจัดการความปลอดภัยและความเป็นส่วนตัวของข้อมูล นำหลัก CIA Triad และการคุ้มครองข้อมูลไปใช้จริง' },
      { text: 'ระบุข้อมูลสำคัญขององค์กร ตั้งกฎการจัดประเภทข้อมูล และป้องกันข้อมูลรั่วไหล' },
      { text: 'วิเคราะห์ข้อมูล telemetry จากเครื่องปลายทาง ระบุพฤติกรรมที่น่าสงสัย และจำกัดวงภัยคุกคาม' },
      { text: 'จัดการมาตรฐานความปลอดภัยของเครื่องปลายทาง บังคับใช้นโยบายไฟร์วอลล์ และควบคุมการเข้าถึงอุปกรณ์' },
      { text: 'ตรวจสอบทราฟฟิกเว็บ ควบคุมการใช้ Shadow IT และบังคับใช้นโยบายการเข้าถึงคลาวด์' },
    ],

    skillsTitle: 'ทักษะด้านเทคนิค',
    skillsSub: 'กลุ่มที่มีคำว่า “ลงมือจริง” คือทักษะที่ใช้สร้างแล็บ PDPA',
    skills: [
      { group: 'แนวคิดด้านความปลอดภัย', items: ['Data Loss Prevention (DLP)', 'Endpoint Detection & Response (EDR)', 'SWG / CASB', 'ISO/IEC 27001 / 27701', 'CIA Triad', 'การคุ้มครองข้อมูลส่วนบุคคล (PDPA)'] },
      { group: 'การตรวจจับและเฝ้าระวัง · ลงมือจริง', items: ['Wazuh (กฎ ระดับความรุนแรง correlation และ dashboard)', 'Sysmon', 'PowerShell Script Block Logging', 'File integrity monitoring', 'เขียนกฎตรวจจับเอง (custom detection rules)', 'การจับคู่กับ MITRE ATT&CK', 'wazuh-logtest'] },
      { group: 'ทราฟฟิกเว็บและคลาวด์ · ลงมือจริง', items: ['mitmproxy (mini SWG)', 'ตรวจการอัปโหลดและ prompt', 'รายการเว็บที่ไม่ถอดรหัส TLS', 'ให้คะแนนความเสี่ยงของแอปคลาวด์', 'ตรวจจับ Shadow AI'] },
      { group: 'สคริปต์และแล็บ · ลงมือจริง', items: ['Python (ตรรกะการตรวจจับ, check digit เลขบัตรประชาชน, ปิดบังข้อมูล)', 'pytest', 'วิเคราะห์ log และความผิดปกติ', 'VirtualBox', 'เครื่องปลายทาง Windows 11', 'Ubuntu Server 24.04'] },
    ],

    pathTitle: 'เส้นทางการเรียนรู้',
    path: [
      { title: 'พื้นฐาน', text: 'หลักการความปลอดภัย CIA Triad (การรักษาความลับ ความถูกต้อง และความพร้อมใช้งาน) และการคุ้มครองข้อมูลส่วนบุคคลตาม PDPA ผ่านมาตรฐาน ISO/IEC 27001 และ 27701' },
      { title: 'เครื่องมือในอุตสาหกรรม', text: 'จากทฤษฎีสู่การปฏิบัติ ศึกษาเครื่องมือที่ใช้บังคับมาตรฐานเหล่านี้ ทั้งการป้องกันข้อมูลรั่วไหล การเสริมความปลอดภัยอุปกรณ์ การตรวจจับภัยคุกคาม และการควบคุมการเข้าถึงคลาวด์' },
      { title: 'ลงมือสร้างแล็บ', text: 'สร้าง PDPA Data Leak Detection Lab ใน 7 วันด้วยเครื่องมือ open-source ในโหมดเฝ้าระวัง และใช้ข้อมูลสังเคราะห์เท่านั้น' },
      { title: 'สิ่งที่สนใจตอนนี้', text: 'ความท้าทายด้านความปลอดภัยที่เกิดขึ้นใหม่ระหว่าง AI กับความเป็นส่วนตัวของข้อมูล เช่น การไม่ให้ข้อมูลสำคัญหลุดไปยังบริการ AI ภายนอก' },
    ],

    ctaTitle: 'กำลังมองหา Junior Cyber Security Engineer อยู่ไหม',
    ctaText: 'พร้อมร่วมงานในตำแหน่ง Junior Cyber Security Engineer และพร้อมเรียนรู้อย่างรวดเร็วกับทีมความปลอดภัยจริง',
    ctaContact: 'ติดต่อผม',
    resume: 'ดาวน์โหลด CV (Cyber Security) ↓',
    ctaBack: '← กลับหน้าแรก',
  },
}
