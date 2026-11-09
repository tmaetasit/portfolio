// Case study: Olist Delivery Intelligence.
// All numbers come from the project brief and github.com/tmaetasit/olist-delivery-intelligence.
// Edit text here; the page layout lives in OlistPage in App.jsx.

const IMG = 'projects/olist-delivery-intelligence/'

export const OLIST = {
  // Card shown in the home gallery and the All projects list
  slug: 'olist-delivery-intelligence',
  layout: 'olist',
  title: 'Olist Delivery Intelligence',
  org: 'Portfolio project',
  period: 'Data 2016–2018',
  category: 'analytics',
  visual: 'bars',
  cover: IMG + 'executive_overview.webp',
  coverFit: 'contain',
  blurb:
    'Why customers leave bad reviews, which orders will arrive late, and which fix pays back first. A solo, end-to-end business analysis on 96,203 real delivered orders.',
  tools: ['SQL (SQLite)', 'Power BI + DAX', 'Excel', 'Python'], // 4 tags on the card

  // Page content
  subtitle: 'Why customers leave bad reviews, which orders will arrive late, and which fix pays back first',
  role: 'Business Analyst (solo, end-to-end portfolio project)',
  data: 'Public Brazilian e-commerce dataset by Olist (Kaggle): 9 tables, 1.55 million rows, ~100k orders, 2016–2018. Analysis window Jan 2017 – Aug 2018 (96,203 delivered orders).',
  honesty: 'The data is real. Stakeholders, costs and the pilot are simulated, and every assumption is labelled.',
  allTools: ['SQL (SQLite)', 'Power BI + DAX', 'Excel', 'Python (pandas, scikit-learn, pm4py, SHAP)', 'Process mapping', 'BRD / FRD'],

  links: {
    github: 'https://github.com/tmaetasit/olist-delivery-intelligence',
    data: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce',
    video: 'videos/olist_delivery_intelligence.mp4', // the player hides itself if this file is missing
    poster: IMG + 'executive_overview.webp',
  },

  labels: {
    eyebrow: 'Case study · Business analysis',
    role: 'Role',
    data: 'Data',
    github: 'GitHub repo ↗',
    dataset: 'Data source (Kaggle) ↗',
    video: 'Video walkthrough (3 min)',
    problem: 'The problem',
    approach: 'Approach: 5 workstreams',
    artefacts: 'BA artefacts',
    findings: 'Key findings',
    dashboard: 'Power BI dashboard',
    recommendation: 'Recommendation',
    design: 'Process and design',
    learned: 'What I learned',
    ai: 'How AI was used',
  },

  kpis: [
    { value: '2.27★ vs 4.29★', label: 'Average review, late vs on-time orders' },
    { value: '67%', label: 'Of bad reviews come from orders that arrived on time' },
    { value: '72%', label: 'Of late orders had a seller who shipped on time (the delay is in carrier transit)' },
    { value: '−R$ 40.5k', label: 'Year-1 result of the early-warning system I first planned, so I recommended against it' },
  ],

  problem:
    'Olist grew sales but not customer satisfaction. Late orders get far worse reviews, yet two in three bad reviews come from orders that arrived on time, so delivery speed alone does not explain dissatisfaction.',

  workstreams: [
    { id: 'WS0', title: 'Data Foundation', text: 'SQL pipeline raw → staging → star schema; 19/19 data-quality tests pass; problem rows flagged, not deleted.' },
    { id: 'WS1', title: 'Diagnose', text: 'Power BI report (3 pages, 24 DAX measures), process mining, driver tree.' },
    { id: 'WS2', title: 'Voice of Customer', text: 'Classified 9,195 Portuguese 1–2 star review comments into 8 complaint types.' },
    { id: 'WS3', title: 'Predict', text: 'Late-delivery risk model at payment approval, with a leakage-safe time-based split.' },
    { id: 'WS4', title: 'Design and Prove', text: 'Excel business case (scenarios, sensitivity, break-even), FRD, To-Be process, wireframes, A/B pilot design.' },
  ],
  artefacts: ['Project charter', 'BRD v0.2', 'KPI dictionary (18 KPIs)', '10 user stories with acceptance criteria', 'Stakeholder map + RACI'],

  findings: [
    {
      title: 'Every day late costs satisfaction',
      text: 'On time 4.29★, 1–3 days late 3.29★, 8+ days late 1.70★.',
      img: IMG + 'fig1_score_by_delay.webp',
      alt: 'Bar chart of average review score by days late: on time 4.29, 1–3 days late 3.29, 4–7 days late 2.11, 8+ days late 1.70',
    },
    {
      title: 'Late orders lose the time in transit',
      text: 'Late orders spend ~28 days in carrier transit vs ~8 for on-time orders; 72% of late orders had a seller who shipped on time.',
      img: IMG + 'fig2_stage_days.webp',
      alt: 'Bar chart of average days per stage: carrier transit 27.9 days for late orders vs 7.9 for on-time orders; seller handling 5.4 vs 2.5; payment approval 0.6 vs 0.5',
    },
    {
      title: 'The promise isn’t calibrated by route',
      text: 'State late rate ranges 2.8%–21.5%; states with less slack in the promised date miss it more (r = −0.72). The north-east (AL, MA, SE) misses most.',
      img: IMG + 'fig3_states_buffer.webp',
      alt: 'Bubble chart of customer states: average delivery-promise buffer in days against late delivery rate, with AL and MA high and AM and RO low',
    },
    {
      title: 'On-time orders fail on what arrives, not when',
      text: '60% of complaints on on-time orders are about the product or fulfilment (missing, wrong, damaged, not as described). In multi-seller orders, 48% of complaints say an item is missing vs 13% for single-seller orders: split shipments look broken.',
      img: IMG + 'fig7_complaints.webp',
      alt: 'Bar chart of complaint types in 9,195 one- and two-star reviews, on-time vs late orders; on-time complaints lead with partial or missing items and quality, late complaints with not delivered',
    },
    {
      title: 'A model helps, within limits',
      text: 'Logistic regression catches 24.6% of late orders in its top 10% risk vs 14.2% for a seller-history rule (1.7×), but only 1 alert in 9 is right, so it suits low-cost actions only.',
      img: IMG + 'fig5_model_recall.webp',
      alt: 'Bar chart of the share of late orders found in the riskiest 10%: random 8.9%, seller-history rule 14.2%, logistic regression 24.6%, LightGBM 23.5%',
    },
    {
      title: 'Don’t build the early-warning system yet',
      text: 'It loses about R$ 40.5k in year 1 and needs ~12.7× today’s volume to break even.',
      img: IMG + 'fig6_business_case.webp',
      alt: 'Bar chart of year-1 net benefit of the early-warning system in three scenarios, all negative: conservative −R$ 61,969, base −R$ 40,528, optimistic −R$ 17,491',
    },
  ],

  dashboard: [
    { src: IMG + 'executive_overview.webp', title: 'Executive Overview', note: 'Headline KPIs, the monthly late-delivery rate, review score by days late, and late rate by state.', alt: 'Power BI executive overview page with KPI cards for orders, revenue, average review, late delivery rate and low reviews from on-time orders, plus trend and bar charts' },
    { src: IMG + 'delivery_stages.webp', title: 'Delivery Stages', note: 'Days per stage for late and on-time orders, and a state table of late rate, delivery days and promise buffer.', alt: 'Power BI delivery stages page comparing approval, handling and transit days for late and on-time orders, with a table by customer state' },
    { src: IMG + 'why_customers_complain.webp', title: 'Why Customers Complain', note: 'Complaint types for on-time vs late orders, and missing-item complaints in multi-seller vs single-seller orders.', alt: 'Power BI page on complaint types for on-time and late orders, with a bar chart of missing-item complaints in multi-seller vs single-seller orders' },
  ],

  recommendation: [
    'Calibrate the delivery promise by route.',
    'Seller handover SLA + seller scorecard.',
    'Tell customers when an order ships in several boxes.',
    'Prove it with a 6-week A/B pilot of 8,438 orders.',
  ],

  design: [
    { src: IMG + 'as_is_process.svg', title: 'As-Is process', alt: 'As-Is swimlane process across customer, Olist platform, seller and carrier, with four numbered pain points' },
    { src: IMG + 'to_be_process.svg', title: 'To-Be process', alt: 'To-Be swimlane process with a route-calibrated promise, a logged seller handover and a weekly review loop' },
    { src: IMG + 'driver_tree.svg', title: 'Driver tree', alt: 'Driver tree splitting the late delivery rate into late seller handover and seller on time but still late, with their levers' },
    { src: IMG + 'wireframe_seller_portal.svg', title: 'Seller portal wireframe', alt: 'Wireframe of a seller portal delivery score page with tier, handover on-time rate, average review and tips' },
    { src: IMG + 'wireframe_ops_dashboard.svg', title: 'Ops dashboard wireframe', alt: 'Wireframe of an operations “routes this week” dashboard with KPI cards, a state map and the worst routes' },
  ],

  learned: 'The hardest part wasn’t the model. It was being willing to say “don’t build this” when the numbers said so.',

  ai: [
    'Claude helped plan, draft documents and write and debug code; I reviewed every query, measure and number.',
    'The 200 reference labels for the review classifier were AI-labelled (human spot-check pending).',
    'The classifier itself is transparent Portuguese keyword rules: macro-F1 0.82 on held-out labels.',
  ],
}

// Thai version. Same shape; anything not listed stays English. Arrays merge item by item.
export const OLIST_TH = {
  org: 'โปรเจกต์ portfolio',
  period: 'ข้อมูลปี 2016–2018',
  blurb:
    'ทำไมลูกค้าให้รีวิวแย่ ออเดอร์ไหนจะส่งช้า และวิธีแก้ไหนคืนทุนก่อน งานวิเคราะห์ธุรกิจตั้งแต่ต้นจนจบที่ทำคนเดียว จากออเดอร์จริงที่ส่งถึงแล้ว 96,203 รายการ',
  subtitle: 'ทำไมลูกค้าให้รีวิวแย่ ออเดอร์ไหนจะส่งช้า และวิธีแก้ไหนคืนทุนก่อน',
  role: 'Business Analyst (ทำคนเดียว ตั้งแต่ต้นจนจบ เป็นโปรเจกต์ portfolio)',
  data: 'ชุดข้อมูล e-commerce บราซิลแบบเปิดของ Olist (Kaggle): 9 ตาราง 1.55 ล้านแถว ราว 100,000 ออเดอร์ ปี 2016–2018 ช่วงที่วิเคราะห์คือ ม.ค. 2017 – ส.ค. 2018 (ออเดอร์ที่ส่งถึงแล้ว 96,203 รายการ)',
  honesty: 'ข้อมูลเป็นของจริง ส่วนผู้มีส่วนได้ส่วนเสีย ต้นทุน และการทดลองนำร่องเป็นการจำลอง (simulated) และระบุสมมติฐานไว้ทุกข้อ',

  labels: {
    eyebrow: 'กรณีศึกษา · การวิเคราะห์ธุรกิจ',
    role: 'บทบาท',
    data: 'ข้อมูล',
    github: 'ดูโค้ดบน GitHub ↗',
    dataset: 'แหล่งข้อมูล (Kaggle) ↗',
    video: 'วิดีโอสรุปงาน (3 นาที)',
    problem: 'ปัญหา',
    approach: 'แนวทาง: 5 workstream',
    artefacts: 'เอกสาร BA',
    findings: 'สิ่งที่ค้นพบ',
    dashboard: 'Dashboard ใน Power BI',
    recommendation: 'ข้อเสนอแนะ',
    design: 'กระบวนการและการออกแบบ',
    learned: 'สิ่งที่ได้เรียนรู้',
    ai: 'การใช้ AI ในงานนี้',
  },

  kpis: [
    { label: 'คะแนนรีวิวเฉลี่ย ออเดอร์ที่ส่งช้า เทียบกับส่งตรงเวลา' },
    { label: 'ของรีวิวแย่มาจากออเดอร์ที่ส่งตรงเวลา' },
    { label: 'ของออเดอร์ที่ส่งช้า ผู้ขายส่งของตรงเวลา (ความล่าช้าอยู่ที่การขนส่ง)' },
    { label: 'ผลปีแรกของระบบเตือนล่วงหน้าที่วางแผนไว้ตอนแรก ผมจึงแนะนำว่ายังไม่ควรสร้าง' },
  ],

  problem:
    'Olist ยอดขายโต แต่ความพึงพอใจของลูกค้าไม่โตตาม ออเดอร์ที่ส่งช้าได้รีวิวแย่กว่ามาก แต่รีวิวแย่ 2 ใน 3 มาจากออเดอร์ที่ส่งตรงเวลา ความเร็วในการส่งอย่างเดียวจึงอธิบายความไม่พอใจไม่ได้',

  workstreams: [
    { text: 'SQL pipeline จาก raw → staging → star schema ผ่าน data-quality test 19/19 และติดธงแถวที่มีปัญหาแทนการลบทิ้ง' },
    { text: 'รายงาน Power BI (3 หน้า, DAX 24 measure), process mining และ driver tree' },
    { text: 'จัดกลุ่มความคิดเห็นรีวิว 1–2 ดาวภาษาโปรตุเกส 9,195 รายการ เป็นปัญหา 8 ประเภท' },
    { text: 'โมเดลทำนายความเสี่ยงส่งช้าตอนอนุมัติการชำระเงิน แบ่งข้อมูลตามเวลาเพื่อกัน data leakage' },
    { text: 'Business case ใน Excel (สถานการณ์, sensitivity, จุดคุ้มทุน), FRD, กระบวนการ To-Be, wireframe และการออกแบบ A/B pilot' },
  ],
  artefacts: ['Project charter', 'BRD v0.2', 'KPI dictionary (18 KPI)', 'User story 10 เรื่องพร้อม acceptance criteria', 'Stakeholder map + RACI'],

  findings: [
    { title: 'ส่งช้าทุกวันทำให้ความพึงพอใจลดลง', text: 'ตรงเวลา 4.29★, ช้า 1–3 วัน 3.29★, ช้า 8 วันขึ้นไป 1.70★' },
    { title: 'ออเดอร์ที่ช้าเสียเวลาไปกับการขนส่ง', text: 'ออเดอร์ที่ช้าอยู่ในมือบริษัทขนส่งราว 28 วัน เทียบกับราว 8 วันของออเดอร์ที่ตรงเวลา และ 72% ของออเดอร์ที่ช้า ผู้ขายส่งของตรงเวลา' },
    { title: 'วันส่งที่สัญญาไว้ไม่ได้ปรับตามเส้นทาง', text: 'อัตราส่งช้ารายรัฐอยู่ระหว่าง 2.8%–21.5% รัฐที่วันสัญญาเผื่อเวลาน้อยกว่าจะพลาดบ่อยกว่า (r = −0.72) ภาคตะวันออกเฉียงเหนือ (AL, MA, SE) พลาดมากที่สุด' },
    { title: 'ออเดอร์ตรงเวลาพังที่สิ่งที่ได้รับ ไม่ใช่เวลา', text: '60% ของคำร้องเรียนในออเดอร์ที่ส่งตรงเวลาเป็นเรื่องสินค้าหรือการจัดส่ง (ของขาด ผิดชิ้น เสียหาย ไม่ตรงปก) ในออเดอร์ที่มีผู้ขายหลายราย 48% ของคำร้องเรียนบอกว่าของขาด เทียบกับ 13% ในออเดอร์ผู้ขายรายเดียว การแยกส่งหลายกล่องจึงดูเหมือนของหาย' },
    { title: 'โมเดลช่วยได้ แต่มีขีดจำกัด', text: 'Logistic regression จับออเดอร์ที่ช้าได้ 24.6% ในกลุ่มเสี่ยงสูงสุด 10% เทียบกับ 14.2% ของกฎจากประวัติผู้ขาย (1.7 เท่า) แต่แจ้งเตือนถูกเพียง 1 ใน 9 จึงเหมาะกับมาตรการต้นทุนต่ำเท่านั้น' },
    { title: 'ยังไม่ควรสร้างระบบเตือนล่วงหน้า', text: 'ขาดทุนราว R$ 40.5k ในปีแรก และต้องมีปริมาณออเดอร์ราว 12.7 เท่าของปัจจุบันจึงจะคุ้มทุน' },
  ],

  dashboard: [
    { note: 'KPI หลัก อัตราส่งช้ารายเดือน คะแนนรีวิวตามจำนวนวันที่ช้า และอัตราส่งช้ารายรัฐ' },
    { note: 'จำนวนวันในแต่ละขั้นของออเดอร์ที่ช้าและตรงเวลา และตารางรายรัฐของอัตราส่งช้า วันส่ง และเวลาที่เผื่อในวันสัญญา' },
    { note: 'ประเภทคำร้องเรียนของออเดอร์ตรงเวลาเทียบกับส่งช้า และคำร้องเรียนเรื่องของขาดในออเดอร์ผู้ขายหลายรายเทียบกับรายเดียว' },
  ],

  recommendation: [
    'ปรับวันส่งที่สัญญาไว้ตามเส้นทาง',
    'SLA การส่งมอบของผู้ขาย + scorecard ผู้ขาย',
    'แจ้งลูกค้าเมื่อออเดอร์ถูกแยกส่งหลายกล่อง',
    'พิสูจน์ผลด้วย A/B pilot 6 สัปดาห์ 8,438 ออเดอร์',
  ],

  learned: 'ส่วนที่ยากที่สุดไม่ใช่โมเดล แต่คือการกล้าพูดว่า “อย่าเพิ่งสร้าง” เมื่อตัวเลขบอกอย่างนั้น',

  ai: [
    'Claude ช่วยวางแผน ร่างเอกสาร และเขียนกับดีบักโค้ด ผมตรวจทุก query ทุก measure และทุกตัวเลขเอง',
    'Label อ้างอิง 200 รายการสำหรับตัวจัดกลุ่มรีวิวทำโดย AI (ยังรอคนสุ่มตรวจ)',
    'ตัวจัดกลุ่มเองเป็นกฎ keyword ภาษาโปรตุเกสที่ตรวจสอบได้: macro-F1 0.82 บน label ที่กันไว้ทดสอบ',
  ],
}
