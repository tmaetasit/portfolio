// Case study: PDPA Data Leak Detection Lab.
// All numbers come from docs/case-study.md in github.com/tmaetasit/pdpa-leak-detection-lab.
// Edit text here; the page layout lives in PdpaCaseStudy.jsx.

const IMG = 'projects/pdpa-leak-detection-lab/'

export const PDPA_LAB = {
  // Card shown in the home gallery and the All projects list
  slug: 'pdpa-leak-detection-lab',
  layout: 'pdpa',
  title: 'PDPA Data Leak Detection Lab',
  org: 'Personal lab project',
  period: 'Nov 2026',
  category: 'security',
  visual: 'chat',
  cover: IMG + 'architecture.webp',
  coverFit: 'contain',
  blurb:
    'A home lab that detects Thai national ID numbers leaving an endpoint by USB, Shadow AI upload or PowerShell, with graded alerts in Wazuh. 403/403 leaks caught, 0 false pages.',
  tools: ['Wazuh', 'Sysmon', 'mitmproxy', 'Python', 'VirtualBox', 'MITRE ATT&CK', 'ISO 27001'],

  // Section headings and button text
  labels: {
    github: 'View on GitHub ↗',
    demo: 'Watch demo ▶',
    results: 'Key results',
    problem: 'The problem',
    architecture: 'Architecture',
    archAlt: 'Lab architecture',
    archTable: 'Lab components and their commercial equivalents',
    build: 'How I built it, step by step',
    simple: 'In simple terms',
    details: 'Technical details',
    outcome: 'Result',
    severity: 'Severity design',
    sevTable: 'Severity levels',
    problems: 'Problems I solved',
    probTable: 'Problems, causes and fixes',
    screenshots: 'Screenshots',
    monitor: 'Why monitor mode',
    standards: 'Standards',
    next: 'What I’d do next',
  },

  // Page content
  eyebrow: 'Case study · Security',
  tagline: 'Detecting Thai personal data leaving an endpoint, built in 7 days with open-source tools',
  githubUrl: 'https://github.com/tmaetasit/pdpa-leak-detection-lab',
  demoUrl: '', // leave empty to hide the "Watch demo" button
  badges: ['Synthetic data only, no real personal data', 'Monitor mode (alert, never block)'],

  results: [
    { value: '292 → 0', label: 'False alerts that page an analyst', note: 'Regex only vs. regex + Thai ID check digit, 1,000 files' },
    { value: '403/403', label: 'Recall end to end', note: 'Leaking files detected (100%)' },
    { value: '164/164', label: 'Paging precision', note: 'Alerts that paged an analyst were correct (100%)' },
    { value: '3', label: 'Exit routes covered', note: 'USB/cloud sync, Shadow AI upload, PowerShell' },
  ],

  problem: [
    'Thailand’s PDPA makes an organisation answer for personal data that leaves its control, and the most common identifier in Thai records is the 13-digit national ID.',
    'A DLP product has to find these numbers in files, decide how serious a leak is, and tell an analyst only when it matters, across three common exit routes:',
    'I built the same mechanisms that commercial DLP, SWG/CASB and EDR products use, to understand how they work inside and where they go wrong.',
  ],
  // Shown as a numbered list after the second paragraph of "The problem"
  routes: [
    'Copying a file to a USB drive or a cloud sync folder',
    'Uploading a file, or pasting text, into an unsanctioned AI service (“Shadow AI”)',
    'A PowerShell script sending a file out',
  ],

  architecture: {
    img: IMG + 'architecture.webp',
    alt: 'Lab architecture: a Windows 11 endpoint with the Python scanner, Sysmon and PowerShell logging sends events to an Ubuntu server running the Wazuh manager and a mitmproxy mini SWG with a cloud registry. Three exit routes: USB or cloud sync, Shadow AI upload, PowerShell.',
    caption: 'Two VMs on one PC (VirtualBox host-only network): a Windows 11 endpoint and an Ubuntu server running Wazuh 4.14 and the SWG. Every upload test goes to lab-only *.test sites.',
    columns: ['Lab component', 'What it does', 'Commercial equivalent'],
    rows: [
      ['Python scanner', 'Finds Thai IDs in .txt .csv .xlsx .docx (UTF-8 and TIS-620), validates the check digit, masks the number', 'DLP endpoint agent (Trellix DLP)'],
      ['mitmproxy mini SWG + Cloud Registry', 'Inspects web uploads and prompts, rates destinations by category, risk and sanction status, skips TLS inspection for banking and health', 'SWG / CASB (Skyhigh)'],
      ['Sysmon + PowerShell Script Block Logging', 'Process and script telemetry on the endpoint', 'EDR sensor (Trend Micro)'],
      ['Wazuh manager', 'Rules, severity, correlation, MITRE mapping, dashboard', 'SIEM / management console (Trellix ePO)'],
    ],
  },

  // "How I built it": one step per day, written for non-specialists first
  build: {
    intro: 'The lab was built one piece per day. Each step below starts with a plain-language summary; open it for the technical details.',
    steps: [
      {
        day: 'Day 1',
        title: 'Build the lab: two virtual computers',
        simple: 'One virtual computer plays an employee’s PC, the other plays the security team’s server that collects and checks every event.',
        items: [
          'Created a VirtualBox host-only network so the two VMs can talk to each other but nothing in the lab reaches the internet by accident.',
          'Ubuntu server VM (192.168.56.102) with Wazuh 4.14 installed all-in-one: manager, indexer and dashboard.',
          'Windows 11 VM as the endpoint, with the Wazuh agent installed and showing as Active on the dashboard.',
          'Installed Sysmon with the community SwiftOnSecurity config and forwarded its events to Wazuh.',
          'Installed Python on the endpoint and took a VM snapshot so the lab can be reset at any time.',
        ],
        result: 'A working endpoint that reports to a SIEM.',
      },
      {
        day: 'Day 2',
        title: 'Teach a scanner to recognise Thai national IDs',
        simple: 'Many numbers have 13 digits. A real Thai ID has a last digit calculated from the first 12, so checking that digit separates real IDs from order and tracking numbers.',
        items: [
          'Python scanner finds 13-digit candidates, written with or without dashes or spaces, in .txt, .csv, .xlsx and .docx files (UTF-8 and TIS-620).',
          'Validates the check digit; a random 13-digit number passes only about 1 time in 10.',
          'Masks every number before it is logged, so the logs never hold a full ID.',
          'Generated 1,000 synthetic files with a known answer for each: 403 with real-format IDs, 360 decoys with order, tracking and invoice numbers, and 237 clean files.',
          'Set severity by how many IDs one file holds: 1–9 low, 10–49 high, 50+ critical.',
        ],
        result: 'False alerts that would page an analyst fell from 292 (regex only) to 0, with no leaking file missed.',
      },
      {
        day: 'Day 3',
        title: 'Exit route 1: copying to a USB drive',
        simple: 'When someone copies a file full of IDs to a USB stick, the endpoint notices, scans the file and tells the server.',
        items: [
          'A watcher detects a newly plugged-in USB drive on its own and scans files copied to it, as well as cloud sync folders.',
          'Each scan is written as a JSON event that the Wazuh agent sends to the manager.',
          'Custom Wazuh rules turn the event into an alert at the right level and tag it with MITRE ATT&CK T1052.001.',
          'File integrity monitoring watches the same folder; when it sees a new file and a critical scan within 120 seconds, a correlation rule confirms the incident.',
          'Fixed a silent failure: FAT32 has no permissions, so Wazuh dropped the event until the folder was set to check only size, time and hash.',
        ],
        result: 'A 120-ID file copied to USB raised a level 12 alert, and the FIM-confirmed case raised the correlation rule.',
      },
      {
        day: 'Day 4',
        title: 'Exit route 2: uploading to an unsanctioned AI site (Shadow AI)',
        simple: 'All web traffic from the PC passes through a small inspection gateway, like a checkpoint. It opens uploads and pasted prompts, looks for IDs and checks how risky the website is.',
        items: [
          'Built a mini Secure Web Gateway with mitmproxy on the Ubuntu VM; the Windows browser uses it as a proxy and trusts its certificate.',
          'An addon pulls uploaded files and pasted text out of each request and scans them with the same scanner.',
          'A mini Cloud Registry rates each destination by category, risk and whether it is sanctioned, which raises the alert level for risky unsanctioned AI.',
          'Banking, health and Microsoft update traffic is passed through without TLS inspection, as a real SWG would; verified that a bank site still showed its real certificate.',
          'Tests go only to lab-only *.test sites. A safety guard answers any upload to a real AI site with a local 403, so no test data leaves the lab.',
        ],
        result: 'Uploads and pasted prompts in Edge raised the expected rules, tagged MITRE T1567.',
      },
      {
        day: 'Day 5',
        title: 'Exit route 3: a PowerShell script sending a file',
        simple: 'A script can upload a file without a browser. Two different sensors on the PC watch for that, and when they agree with the gateway, the alert becomes a confirmed incident.',
        items: [
          'Sysmon records PowerShell starting curl.exe with an upload option.',
          'PowerShell Script Block Logging (event 4104) records the script that uploads a file.',
          'Both are tagged MITRE T1059.001 and T1567.',
          'When the gateway also sees 10 or more IDs in an upload within 120 seconds, a correlation rule raises level 15.',
          'Fixed correlation across machines with Wazuh’s global_frequency option, and wrote the rule in both directions because events can arrive in either order.',
        ],
        result: 'A PowerShell upload of synthetic files produced a confirmed level 15 incident.',
      },
      {
        day: 'Day 6',
        title: 'Measure everything end to end',
        simple: 'Instead of trusting a few demos, every one of the 1,000 test files was sent through the whole system and each alert was checked against the known answer.',
        items: [
          'Uploaded all 1,000 synthetic files from the endpoint through the gateway to the lab AI site.',
          'A Python script matched every Wazuh alert back to its file and compared it with the ground truth.',
          'Built a Wazuh dashboard showing confirmed incidents, paging alerts, and alerts by channel, destination and level.',
        ],
        result: '403/403 leaking files detected, 164/164 paging alerts correct, and all 270 chance check-digit passes kept below paging level.',
      },
      {
        day: 'Day 7',
        title: 'Document it',
        simple: 'Wrote it up so another engineer can rebuild the lab and check the numbers.',
        items: [
          'Drew the architecture diagram.',
          'Wrote this case study and the README with setup guides for each scenario.',
          'Mapped the controls to ISO/IEC 27001:2022 Annex A and the detections to MITRE ATT&CK.',
        ],
        result: 'Code, rules, guides and results are on GitHub.',
      },
    ],
  },

  severity: {
    columns: ['Thai IDs in one file', 'Severity', 'Wazuh level'],
    rows: [
      ['1–9', 'low', '5 (7 when sent to unsanctioned AI)'],
      ['10–49', 'high', '10 (12 when sent to an unsanctioned high-risk site)'],
      ['50+', 'critical', '12'],
      ['Two independent sensors agree', 'confirmed', '15 (dashboard “Critical”)'],
    ],
    note: 'A random 13-digit number passes the check digit about 1 time in 10, so the 270 decoys that pass by chance are all kept at a low level, below the level that pages an analyst. Only incidents confirmed by two sensors reach level 15.',
  },

  problems: {
    columns: ['Problem', 'Cause', 'Fix'],
    rows: [
      ['292 false high/critical alerts from regex', 'Order numbers and tracking codes are also 13 digits', 'Thai ID check digit + count thresholds'],
      ['File integrity monitoring silent on the USB stick', 'FAT32 has no ACL; Wazuh’s default checks fail and drop the event', 'Check only size, mtime and hash on that folder'],
      ['Empty user name in alert text', 'Wazuh’s JSON decoder maps `user` to the static field `dstuser`', 'Use `$(dstuser)`, verify with wazuh-logtest'],
      ['First SWG alerts never appeared', 'The log file did not exist when the manager started; logcollector then read from its end', 'Create the file before restarting the manager'],
      ['PowerShell + SWG correlation never fired', 'Wazuh correlates within one agent by default; the two events come from different agents', '`<global_frequency />`, rules in both directions'],
      ['Risk of sending test data to real AI sites', 'A proxy normally connects upstream before the addon decides', 'Lazy upstream connection + a safety guard that answers real-site uploads with 403'],
    ],
  },

  screenshots: [
    { src: IMG + 'day6-dashboard.webp', title: 'Wazuh dashboard', note: 'All PDPA alerts in the dashboard’s time range: 182 at level 12+ that page an analyst, 2 of them confirmed incidents at level 15. The 164/164 in Key results is from the scored 1,000-file run only.', alt: 'Wazuh dashboard for the lab: counts of confirmed incidents and paging alerts, donut charts of alerts by channel and upload destination, a bar chart of alerts by level, and a table of alerts by rule' },
    { src: IMG + 'day4-100123-mitre.webp', title: 'Web upload alert mapped to MITRE ATT&CK', note: 'Rule 100123 at level 12 in Wazuh Discover, tagged T1567 Exfiltration Over Web Service.', alt: 'Wazuh Discover view of alert rule 100123 for a web upload, level 12, with MITRE technique T1567 Exfiltration Over Web Service' },
  ],

  monitorMode:
    'DLP is rolled out to customers in monitor mode first: alert, measure false positives, tune, then enable blocking. The lab follows the same order. The numbers above are the evidence a customer would ask for before turning on blocking.',

  iso: [
    ['8.12', 'Data leakage prevention', 'scanner, three scenarios'],
    ['8.15', 'Logging', 'JSON events with masked values only'],
    ['8.16', 'Monitoring activities', 'Wazuh rules, endpoint telemetry, dashboard'],
    ['8.23', 'Web filtering', 'mini SWG, cloud registry, TLS inspection bypass list'],
  ],
  mitre: [
    ['T1052.001', 'Exfiltration over USB'],
    ['T1567', 'Exfiltration Over Web Service'],
    ['T1567.002', 'Exfiltration to Cloud Storage'],
    ['T1059.001', 'Command and Scripting Interpreter: PowerShell'],
  ],

  next: [
    'Join correlated events on the file hash instead of only time, so “the same file” is proven',
    'Enable blocking for critical uploads to unsanctioned AI once monitor-mode numbers hold',
    'PDF support in the scanner, and a local LLM that summarises an incident from masked data',
  ],
}

// Thai version. Same shape as PDPA_LAB; anything not listed stays English.
// Arrays merge item by item, so keep the same order and give every cell of a table row.
export const PDPA_LAB_TH = {
  org: 'โปรเจกต์แล็บส่วนตัว',
  period: 'พ.ย. 2026',
  blurb:
    'แล็บที่ตรวจจับเลขบัตรประชาชนไทยที่หลุดออกจากเครื่องผ่าน USB การอัปโหลดไปยัง Shadow AI หรือ PowerShell พร้อมแจ้งเตือนแบบแบ่งระดับใน Wazuh จับไฟล์ที่รั่วได้ 403/403 และไม่มีการแจ้งเตือนผิดที่ต้องเรียก analyst',
  eyebrow: 'กรณีศึกษา · ความปลอดภัย',
  tagline: 'ตรวจจับข้อมูลส่วนบุคคลของคนไทยที่หลุดออกจากเครื่องปลายทาง สร้างใน 7 วันด้วยเครื่องมือ open-source',
  badges: ['ใช้ข้อมูลสังเคราะห์เท่านั้น ไม่มีข้อมูลส่วนบุคคลจริง', 'โหมดเฝ้าระวัง (แจ้งเตือน ไม่บล็อก)'],

  labels: {
    github: 'ดูโค้ดบน GitHub ↗',
    demo: 'ดูวิดีโอเดโม ▶',
    results: 'ผลลัพธ์สำคัญ',
    problem: 'ปัญหา',
    architecture: 'สถาปัตยกรรม',
    archAlt: 'สถาปัตยกรรมของแล็บ',
    archTable: 'ส่วนประกอบของแล็บและผลิตภัณฑ์เชิงพาณิชย์ที่เทียบเท่า',
    build: 'ขั้นตอนการสร้างทีละขั้น',
    simple: 'อธิบายแบบง่าย',
    details: 'รายละเอียดทางเทคนิค',
    outcome: 'ผลลัพธ์',
    severity: 'การออกแบบระดับความรุนแรง',
    sevTable: 'ระดับความรุนแรง',
    problems: 'ปัญหาที่แก้ได้',
    probTable: 'ปัญหา สาเหตุ และวิธีแก้',
    screenshots: 'ภาพหน้าจอ',
    monitor: 'ทำไมใช้โหมดเฝ้าระวัง',
    standards: 'มาตรฐาน',
    next: 'สิ่งที่จะทำต่อ',
  },

  results: [
    { label: 'การแจ้งเตือนผิดที่ต้องเรียก analyst', note: 'regex อย่างเดียว เทียบกับ regex + check digit ของเลขบัตรประชาชน จาก 1,000 ไฟล์' },
    { label: 'Recall ตลอดทั้งระบบ', note: 'ตรวจพบไฟล์ที่รั่วครบ (100%)' },
    { label: 'ความแม่นยำของการแจ้งเตือน', note: 'การแจ้งเตือนที่เรียก analyst ถูกต้องทั้งหมด (100%)' },
    { label: 'ช่องทางรั่วที่ครอบคลุม', note: 'USB/cloud sync, อัปโหลดไป Shadow AI, PowerShell' },
  ],

  problem: [
    'PDPA ของไทยกำหนดให้องค์กรต้องรับผิดชอบต่อข้อมูลส่วนบุคคลที่หลุดออกจากการควบคุม และตัวระบุที่พบบ่อยที่สุดในข้อมูลของคนไทยคือเลขบัตรประชาชน 13 หลัก',
    'ผลิตภัณฑ์ DLP ต้องหาเลขเหล่านี้ในไฟล์ ตัดสินว่าการรั่วไหลร้ายแรงแค่ไหน และแจ้ง analyst เฉพาะเมื่อจำเป็น ครอบคลุม 3 ช่องทางรั่วที่พบบ่อย ได้แก่',
    'ผมสร้างกลไกแบบเดียวกับที่ผลิตภัณฑ์ DLP, SWG/CASB และ EDR เชิงพาณิชย์ใช้ เพื่อเข้าใจว่าภายในทำงานอย่างไร และพลาดได้ตรงไหน',
  ],
  routes: [
    'คัดลอกไฟล์ลง USB หรือโฟลเดอร์ cloud sync',
    'อัปโหลดไฟล์หรือวางข้อความลงบริการ AI ที่ไม่ได้รับอนุญาต (“Shadow AI”)',
    'สคริปต์ PowerShell ที่ส่งไฟล์ออกไป',
  ],

  architecture: {
    alt: 'สถาปัตยกรรมของแล็บ: เครื่อง Windows 11 ที่มี Python scanner, Sysmon และ PowerShell logging ส่ง event ไปยังเซิร์ฟเวอร์ Ubuntu ที่รัน Wazuh manager และ mini SWG บน mitmproxy พร้อม cloud registry ครอบคลุม 3 ช่องทางรั่ว คือ USB หรือ cloud sync, อัปโหลดไป Shadow AI และ PowerShell',
    caption: 'VM 2 เครื่องบน PC เครื่องเดียว (VirtualBox host-only network): เครื่องปลายทาง Windows 11 และเซิร์ฟเวอร์ Ubuntu ที่รัน Wazuh 4.14 และ SWG ทุกการทดสอบอัปโหลดส่งไปยังเว็บ *.test ที่มีเฉพาะในแล็บ',
    columns: ['ส่วนประกอบในแล็บ', 'หน้าที่', 'ผลิตภัณฑ์เชิงพาณิชย์ที่เทียบเท่า'],
    rows: [
      ['Python scanner', 'หาเลขบัตรประชาชนในไฟล์ .txt .csv .xlsx .docx (UTF-8 และ TIS-620) ตรวจ check digit และปิดบังเลข', 'DLP endpoint agent (Trellix DLP)'],
      ['mitmproxy mini SWG + Cloud Registry', 'ตรวจการอัปโหลดและ prompt บนเว็บ ให้คะแนนปลายทางตามหมวด ความเสี่ยง และสถานะการอนุญาต ไม่ถอดรหัส TLS ของเว็บธนาคารและสุขภาพ', 'SWG / CASB (Skyhigh)'],
      ['Sysmon + PowerShell Script Block Logging', 'telemetry ของ process และสคริปต์บนเครื่องปลายทาง', 'EDR sensor (Trend Micro)'],
      ['Wazuh manager', 'กฎ ระดับความรุนแรง correlation การจับคู่ MITRE และ dashboard', 'SIEM / management console (Trellix ePO)'],
    ],
  },

  build: {
    intro: 'แล็บนี้สร้างทีละส่วน วันละหนึ่งชิ้น แต่ละขั้นด้านล่างเริ่มด้วยคำอธิบายแบบเข้าใจง่าย กดเปิดเพื่อดูรายละเอียดทางเทคนิค',
    steps: [
      {
        day: 'วันที่ 1',
        title: 'สร้างแล็บ: คอมพิวเตอร์เสมือน 2 เครื่อง',
        simple: 'เครื่องหนึ่งจำลองเป็นคอมพิวเตอร์ของพนักงาน อีกเครื่องจำลองเป็นเซิร์ฟเวอร์ของทีมความปลอดภัยที่รวบรวมและตรวจทุก event',
        items: [
          'สร้าง host-only network ใน VirtualBox ให้ VM สองเครื่องคุยกันได้ แต่ไม่มีอะไรในแล็บหลุดออกอินเทอร์เน็ตโดยไม่ตั้งใจ',
          'VM เซิร์ฟเวอร์ Ubuntu (192.168.56.102) ติดตั้ง Wazuh 4.14 แบบ all-in-one ทั้ง manager, indexer และ dashboard',
          'VM Windows 11 เป็นเครื่องปลายทาง ติดตั้ง Wazuh agent และขึ้นสถานะ Active บน dashboard',
          'ติดตั้ง Sysmon ด้วย config ของชุมชน SwiftOnSecurity และส่ง event เข้า Wazuh',
          'ติดตั้ง Python บนเครื่องปลายทาง และทำ snapshot ของ VM ไว้รีเซ็ตแล็บได้ทุกเมื่อ',
        ],
        result: 'เครื่องปลายทางที่ส่งข้อมูลเข้า SIEM ได้จริง',
      },
      {
        day: 'วันที่ 2',
        title: 'สอน scanner ให้รู้จักเลขบัตรประชาชนไทย',
        simple: 'มีเลข 13 หลักอยู่มากมาย แต่เลขบัตรประชาชนจริงมีหลักสุดท้ายที่คำนวณจาก 12 หลักแรก การตรวจหลักนี้จึงแยกเลขบัตรจริงออกจากเลขคำสั่งซื้อหรือเลขพัสดุได้',
        items: [
          'Python scanner หาเลข 13 หลักทั้งแบบมีและไม่มีขีดหรือเว้นวรรค ในไฟล์ .txt, .csv, .xlsx และ .docx (UTF-8 และ TIS-620)',
          'ตรวจ check digit เลขสุ่ม 13 หลักผ่านได้โดยบังเอิญเพียงราว 1 ใน 10',
          'ปิดบังเลขทุกตัวก่อนบันทึก log จึงไม่มีเลขบัตรเต็มอยู่ใน log',
          'สร้างไฟล์สังเคราะห์ 1,000 ไฟล์ที่รู้คำตอบของทุกไฟล์: 403 ไฟล์มีเลขบัตรรูปแบบจริง 360 ไฟล์หลอกที่มีเลขคำสั่งซื้อ เลขพัสดุ และเลขใบแจ้งหนี้ และ 237 ไฟล์ที่ไม่มีข้อมูล',
          'กำหนดความรุนแรงตามจำนวนเลขบัตรในไฟล์เดียว: 1–9 low, 10–49 high, 50 ขึ้นไป critical',
        ],
        result: 'การแจ้งเตือนผิดที่ต้องเรียก analyst ลดจาก 292 (regex อย่างเดียว) เหลือ 0 โดยไม่พลาดไฟล์ที่รั่วเลย',
      },
      {
        day: 'วันที่ 3',
        title: 'ช่องทางที่ 1: คัดลอกลง USB',
        simple: 'เมื่อมีคนคัดลอกไฟล์ที่มีเลขบัตรจำนวนมากลง USB เครื่องปลายทางจะรู้ตัว สแกนไฟล์ และแจ้งเซิร์ฟเวอร์',
        items: [
          'watcher ตรวจเจอ USB ที่เพิ่งเสียบได้เอง และสแกนไฟล์ที่คัดลอกลงไป รวมถึงโฟลเดอร์ cloud sync',
          'ผลการสแกนแต่ละครั้งถูกเขียนเป็น event แบบ JSON ที่ Wazuh agent ส่งไปยัง manager',
          'กฎของ Wazuh ที่เขียนเองแปลง event เป็นการแจ้งเตือนในระดับที่ถูกต้อง และติดแท็ก MITRE ATT&CK T1052.001',
          'File integrity monitoring เฝ้าโฟลเดอร์เดียวกัน ถ้าเห็นไฟล์ใหม่และผลสแกนระดับ critical ภายใน 120 วินาที กฎ correlation จะยืนยันเหตุการณ์',
          'แก้ปัญหาที่ล้มเหลวแบบเงียบ: FAT32 ไม่มีสิทธิ์ไฟล์ Wazuh จึงทิ้ง event จนกว่าจะตั้งให้ตรวจเฉพาะขนาด เวลา และ hash',
        ],
        result: 'ไฟล์ที่มีเลขบัตร 120 เลขที่คัดลอกลง USB ทำให้เกิดการแจ้งเตือนระดับ 12 และกรณีที่ FIM ยืนยันทำให้กฎ correlation ทำงาน',
      },
      {
        day: 'วันที่ 4',
        title: 'ช่องทางที่ 2: อัปโหลดไปเว็บ AI ที่ไม่ได้รับอนุญาต (Shadow AI)',
        simple: 'ทราฟฟิกเว็บทั้งหมดจากเครื่องวิ่งผ่านเกตเวย์ตรวจสอบขนาดเล็ก เหมือนด่านตรวจ เกตเวย์เปิดดูไฟล์ที่อัปโหลดและข้อความที่วาง หาเลขบัตร และเช็กว่าเว็บนั้นเสี่ยงแค่ไหน',
        items: [
          'สร้าง mini Secure Web Gateway ด้วย mitmproxy บน VM Ubuntu เบราว์เซอร์บน Windows ใช้เป็น proxy และเชื่อถือ certificate ของมัน',
          'addon ดึงไฟล์ที่อัปโหลดและข้อความที่วางออกจากแต่ละ request แล้วสแกนด้วย scanner ตัวเดียวกัน',
          'mini Cloud Registry ให้คะแนนปลายทางตามหมวด ความเสี่ยง และสถานะการอนุญาต ซึ่งยกระดับการแจ้งเตือนเมื่อเป็น AI เสี่ยงสูงที่ไม่ได้รับอนุญาต',
          'ทราฟฟิกธนาคาร สุขภาพ และ Microsoft update ผ่านไปโดยไม่ถอดรหัส TLS แบบเดียวกับ SWG จริง และตรวจแล้วว่าเว็บธนาคารยังแสดง certificate จริง',
          'ทดสอบเฉพาะเว็บ *.test ที่มีในแล็บเท่านั้น และมี safety guard ตอบการอัปโหลดไปเว็บ AI จริงด้วย 403 ในเครื่อง ข้อมูลทดสอบจึงไม่ออกนอกแล็บ',
        ],
        result: 'การอัปโหลดและการวาง prompt ใน Edge ทำให้เกิดการแจ้งเตือนตามกฎที่คาดไว้ ติดแท็ก MITRE T1567',
      },
      {
        day: 'วันที่ 5',
        title: 'ช่องทางที่ 3: สคริปต์ PowerShell ส่งไฟล์ออก',
        simple: 'สคริปต์อัปโหลดไฟล์ได้โดยไม่ต้องใช้เบราว์เซอร์ เซนเซอร์ 2 ตัวบนเครื่องจึงคอยดู และเมื่อผลตรงกับเกตเวย์ การแจ้งเตือนจะกลายเป็นเหตุการณ์ที่ยืนยันแล้ว',
        items: [
          'Sysmon บันทึกตอน PowerShell เรียก curl.exe พร้อมตัวเลือกอัปโหลด',
          'PowerShell Script Block Logging (event 4104) บันทึกสคริปต์ที่อัปโหลดไฟล์',
          'ทั้งสองติดแท็ก MITRE T1059.001 และ T1567',
          'เมื่อเกตเวย์เห็นเลขบัตร 10 เลขขึ้นไปในการอัปโหลดภายใน 120 วินาที กฎ correlation จะยกเป็นระดับ 15',
          'แก้ correlation ข้ามเครื่องด้วยตัวเลือก global_frequency ของ Wazuh และเขียนกฎทั้งสองทิศทาง เพราะ event มาถึงก่อนหลังได้ทั้งสองแบบ',
        ],
        result: 'การอัปโหลดไฟล์สังเคราะห์ด้วย PowerShell เกิดเป็นเหตุการณ์ยืนยันระดับ 15',
      },
      {
        day: 'วันที่ 6',
        title: 'วัดผลทั้งระบบตั้งแต่ต้นจนจบ',
        simple: 'แทนที่จะเชื่อแค่เดโมไม่กี่ครั้ง ส่งไฟล์ทดสอบทั้ง 1,000 ไฟล์ผ่านทั้งระบบ แล้วตรวจการแจ้งเตือนทุกรายการกับคำตอบที่รู้อยู่แล้ว',
        items: [
          'อัปโหลดไฟล์สังเคราะห์ทั้ง 1,000 ไฟล์จากเครื่องปลายทาง ผ่านเกตเวย์ ไปยังเว็บ AI ในแล็บ',
          'สคริปต์ Python จับคู่การแจ้งเตือนของ Wazuh ทุกรายการกลับไปหาไฟล์ แล้วเทียบกับคำตอบจริง',
          'สร้าง dashboard ใน Wazuh แสดงเหตุการณ์ที่ยืนยันแล้ว การแจ้งเตือนที่เรียก analyst และการแจ้งเตือนแยกตามช่องทาง ปลายทาง และระดับ',
        ],
        result: 'ตรวจพบไฟล์ที่รั่ว 403/403 การแจ้งเตือนที่เรียก analyst ถูกต้อง 164/164 และไฟล์หลอก 270 ไฟล์ที่ผ่าน check digit โดยบังเอิญถูกเก็บไว้ต่ำกว่าระดับเรียก analyst ทั้งหมด',
      },
      {
        day: 'วันที่ 7',
        title: 'จัดทำเอกสาร',
        simple: 'เขียนสรุปให้วิศวกรคนอื่นสร้างแล็บซ้ำและตรวจตัวเลขได้',
        items: [
          'วาดแผนภาพสถาปัตยกรรม',
          'เขียนกรณีศึกษานี้ และ README พร้อมคู่มือติดตั้งของแต่ละสถานการณ์',
          'จับคู่ control กับ ISO/IEC 27001:2022 Annex A และการตรวจจับกับ MITRE ATT&CK',
        ],
        result: 'โค้ด กฎ คู่มือ และผลลัพธ์อยู่บน GitHub',
      },
    ],
  },

  severity: {
    columns: ['จำนวนเลขบัตรในไฟล์เดียว', 'ความรุนแรง', 'ระดับใน Wazuh'],
    rows: [
      ['1–9', 'low', '5 (7 เมื่อส่งไปยัง AI ที่ไม่ได้รับอนุญาต)'],
      ['10–49', 'high', '10 (12 เมื่อส่งไปยังเว็บความเสี่ยงสูงที่ไม่ได้รับอนุญาต)'],
      ['50+', 'critical', '12'],
      ['เซนเซอร์อิสระ 2 ตัวยืนยันตรงกัน', 'confirmed', '15 (dashboard “Critical”)'],
    ],
    note: 'เลขสุ่ม 13 หลักผ่าน check digit ได้โดยบังเอิญราว 1 ใน 10 ไฟล์หลอก 270 ไฟล์ที่ผ่านโดยบังเอิญจึงถูกเก็บไว้ที่ระดับ low ทั้งหมด ต่ำกว่าระดับที่เรียก analyst และมีเพียงเหตุการณ์ที่เซนเซอร์ 2 ตัวยืนยันตรงกันเท่านั้นที่ขึ้นถึงระดับ 15',
  },

  problems: {
    columns: ['ปัญหา', 'สาเหตุ', 'วิธีแก้'],
    rows: [
      ['regex สร้างการแจ้งเตือน high/critical ผิด 292 รายการ', 'เลขคำสั่งซื้อและเลขพัสดุก็มี 13 หลักเหมือนกัน', 'ตรวจ check digit ของเลขบัตรประชาชน + ตั้งเกณฑ์ตามจำนวน'],
      ['File integrity monitoring ไม่แจ้งอะไรเลยบน USB', 'FAT32 ไม่มี ACL การตรวจค่าเริ่มต้นของ Wazuh จึงล้มเหลวและทิ้ง event', 'ตรวจเฉพาะขนาด mtime และ hash ในโฟลเดอร์นั้น'],
      ['ชื่อผู้ใช้ในข้อความแจ้งเตือนว่างเปล่า', 'JSON decoder ของ Wazuh แมป `user` ไปที่ฟิลด์คงที่ `dstuser`', 'ใช้ `$(dstuser)` แล้วตรวจด้วย wazuh-logtest'],
      ['การแจ้งเตือนแรกจาก SWG ไม่ขึ้นเลย', 'ไฟล์ log ยังไม่มีตอนที่ manager เริ่มทำงาน logcollector จึงอ่านจากท้ายไฟล์', 'สร้างไฟล์ก่อนรีสตาร์ต manager'],
      ['correlation ระหว่าง PowerShell กับ SWG ไม่ทำงาน', 'ค่าเริ่มต้นของ Wazuh จับคู่ event ภายใน agent เดียว แต่สอง event นี้มาจากคนละ agent', '`<global_frequency />` และเขียนกฎทั้งสองทิศทาง'],
      ['เสี่ยงส่งข้อมูลทดสอบไปยังเว็บ AI จริง', 'ปกติ proxy จะเชื่อมต่อปลายทางก่อนที่ addon จะตัดสินใจ', 'เชื่อมต่อปลายทางแบบ lazy + safety guard ที่ตอบการอัปโหลดไปเว็บจริงด้วย 403'],
    ],
  },

  screenshots: [
    { title: 'Dashboard ของ Wazuh', note: 'การแจ้งเตือน PDPA ทั้งหมดในช่วงเวลาของ dashboard: ระดับ 12 ขึ้นไปที่เรียก analyst 182 รายการ ในนั้นเป็นเหตุการณ์ยืนยันระดับ 15 จำนวน 2 รายการ ส่วนตัวเลข 164/164 ในผลลัพธ์สำคัญมาจากการรันทดสอบ 1,000 ไฟล์ที่ให้คะแนนเท่านั้น', alt: 'Dashboard ของ Wazuh ในแล็บ: จำนวนเหตุการณ์ที่ยืนยันแล้วและการแจ้งเตือนที่เรียก analyst กราฟโดนัทแยกตามช่องทางและปลายทางการอัปโหลด กราฟแท่งแยกตามระดับ และตารางแยกตามกฎ' },
    { title: 'การแจ้งเตือนการอัปโหลดเว็บที่จับคู่กับ MITRE ATT&CK', note: 'กฎ 100123 ระดับ 12 ใน Wazuh Discover ติดแท็ก T1567 Exfiltration Over Web Service', alt: 'หน้า Wazuh Discover แสดงการแจ้งเตือนกฎ 100123 สำหรับการอัปโหลดเว็บ ระดับ 12 พร้อมเทคนิค MITRE T1567 Exfiltration Over Web Service' },
  ],

  monitorMode:
    'DLP จะเปิดใช้กับลูกค้าในโหมดเฝ้าระวังก่อนเสมอ คือแจ้งเตือน วัด false positive ปรับจูน แล้วจึงเปิดการบล็อก แล็บนี้ทำตามลำดับเดียวกัน ตัวเลขข้างต้นคือหลักฐานที่ลูกค้าจะขอดูก่อนเปิดการบล็อก',

  iso: [
    ['8.12', 'การป้องกันข้อมูลรั่วไหล', 'scanner, 3 สถานการณ์'],
    ['8.15', 'การบันทึก log', 'event แบบ JSON ที่มีเฉพาะค่าที่ปิดบังแล้ว'],
    ['8.16', 'การเฝ้าติดตาม', 'กฎของ Wazuh, telemetry จากเครื่องปลายทาง, dashboard'],
    ['8.23', 'การกรองเว็บ', 'mini SWG, cloud registry, รายการเว็บที่ไม่ถอดรหัส TLS'],
  ],

  next: [
    'จับคู่ event ที่สัมพันธ์กันด้วย hash ของไฟล์ แทนการดูแค่เวลา เพื่อพิสูจน์ว่าเป็น “ไฟล์เดียวกัน” จริง',
    'เปิดการบล็อกสำหรับการอัปโหลดระดับ critical ไปยัง AI ที่ไม่ได้รับอนุญาต เมื่อตัวเลขในโหมดเฝ้าระวังคงที่',
    'รองรับไฟล์ PDF ใน scanner และใช้ LLM ในเครื่องสรุปเหตุการณ์จากข้อมูลที่ปิดบังแล้ว',
  ],
}
