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
    build: 'How I worked, step by step',
    simple: 'In simple terms',
    details: 'Technical details',
    outcome: 'Result',
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

  // "How I worked": one step per stage, plain-language summary first
  build: {
    intro: 'The project ran in seven stages, from framing the question to a recommendation. Each step starts with a plain-language summary; open it for the technical details.',
    steps: [
      {
        day: 'Step 1',
        title: 'Frame the problem before touching charts',
        simple: 'Before building anything, I profiled the data and wrote down which business questions the work must answer, who cares about them, and how success is measured.',
        items: [
          'Profiled all 9 CSV files: 99,092 orders in the analysis window, 96,203 delivered.',
          'An early signal changed the question: two in three bad reviews come from orders that arrived on time, so speed alone could not be the answer.',
          'Wrote the project charter, BRD v0.2, a KPI dictionary of 18 KPIs and 10 user stories with acceptance criteria.',
          'Drew a stakeholder map and RACI. The stakeholders are simulated, and labelled as such.',
        ],
        result: 'Clear business questions and KPIs agreed before any analysis.',
      },
      {
        day: 'Step 2',
        title: 'WS0 · Build data I can trust',
        simple: 'Raw data has mistakes. I moved it through clean layers in SQL and tested it, marking bad rows instead of quietly deleting them, so every number can be traced.',
        items: [
          'SQLite pipeline in three layers: raw → staging (typed, de-duplicated, translated) → a star schema with fact_orders, fact_order_items and dimension tables.',
          'Logged 13 data issues in a cleaning log, for example 189 orders with out-of-order timestamps (flagged and kept out of timing KPIs) and 547 orders with more than one review (latest kept).',
          'Derived the fields the analysis needs: is_late, late seller handover, days per stage, ETA buffer and seller-to-customer distance.',
          'Wrote 19 data-quality tests, including revenue reconciling to raw item prices; all 19 pass.',
        ],
        result: 'A tested star schema and clean CSVs for Power BI.',
      },
      {
        day: 'Step 3',
        title: 'WS1 · Find where the delay happens',
        simple: 'I split each delivery into stages, payment, seller and carrier, to see which stage eats the time, then asked why some regions miss the promised date more.',
        items: [
          'Power BI report with 3 pages and 24 DAX measures on the star schema; every chart title states its finding.',
          'Process mining with pm4py: 98.6% of orders follow the expected path placed → approved → handed to carrier → delivered.',
          'Driver tree of the 6,529 late orders: 27.7% had a late seller handover, 72.3% had an on-time seller and were still late.',
          'A late handover raises the late rate from 5.4% to 21.1%, so sellers still matter.',
          'Across states, late rate moves with the ETA buffer (r = −0.72): the promise does not fit each route.',
        ],
        result: 'Late orders lose the time in carrier transit, and the promise is not calibrated by route.',
      },
      {
        day: 'Step 4',
        title: 'WS2 · Read what unhappy customers write',
        simple: 'Thousands of reviews are too many to read by hand, so I built simple Portuguese keyword rules that sort each complaint into a type, and tested how often the rules are right.',
        items: [
          'Took the 9,195 one- and two-star reviews with a written comment.',
          'Defined 8 complaint types with Portuguese cue words and tie-break rules.',
          'Built 200 reference labels: first labelled by AI, then every one checked by me.',
          'Tuned the rules on reviews 1–100, tested on 101–200: accuracy 0.88, macro-F1 0.82. A random check of 60 reviews was 77% correct.',
          'A TF-IDF + logistic regression baseline on 100 labels scored macro-F1 0.33, so the rules won.',
        ],
        result: '60% of complaints on on-time orders are about the product or fulfilment; in multi-seller orders, 48% say an item is missing.',
      },
      {
        day: 'Step 5',
        title: 'WS3 · Test whether a late order can be predicted',
        simple: 'I trained a model to flag risky orders at payment, using only information known at that moment, and tested it on later months it had never seen.',
        items: [
          'Features known at payment approval only: promised days, distance, states, category, price, freight, weight, timing and seller history.',
          'Time-based split: trained on Jan 2017 – Mar 2018 (64,034 orders), tested on Apr – Aug 2018 (31,985 orders).',
          'Leakage control: seller history uses only orders delivered before the order was placed.',
          'Compared random, a seller-history rule, logistic regression and LightGBM; chose logistic regression (24.6% of late orders found in the top 10% risk, precision 10.9%).',
          'Checked drivers with SHAP and wrote a model card with limits: recall swung from 38.6% to 7.1% by month.',
        ],
        result: 'Conditional go: useful for low-cost actions only, never for penalising sellers.',
      },
      {
        day: 'Step 6',
        title: 'WS4 · Decide what to build, and prove it pays',
        simple: 'I put each fix into a simple money model, kept the ones that make sense, wrote the requirements, and designed a fair test to prove the result before a full rollout.',
        items: [
          'Excel business case with scenarios, sensitivity and break-even: the early-warning system loses R$ 40,528 in year 1 (base case) and breaks even only at 12.7× today’s volume, so it is parked.',
          'Recommended a route-calibrated delivery promise and a seller handover SLA with tiers A/B/C.',
          'FRD with 8 functional requirements, e.g. a weekly route table built from the 85th-percentile transit time of the last 90 days.',
          'To-Be process, seller portal and ops dashboard wireframes.',
          'A/B pilot design: 4,219 orders per arm (8,438 in total), about 6 weeks, with a guardrail that checkout conversion must not fall by more than 1 point.',
        ],
        result: 'A costed recommendation and a pilot ready to run. Costs and pilot are simulated and labelled.',
      },
      {
        day: 'Step 7',
        title: 'Tell the story',
        simple: 'Made the results easy to take in for different readers: a short deck, a video and this page.',
        items: [
          '10-slide executive deck and a 3-minute captioned video.',
          'GitHub README with every result linked to its evidence, plus steps to reproduce the work.',
        ],
        result: 'The story can be told in 30 seconds or defended in detail.',
      },
    ],
  },

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
    'The 200 reference labels for the review classifier were first labelled by AI, then I checked all 200 myself.',
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
    build: 'ขั้นตอนการทำงานทีละขั้น',
    simple: 'อธิบายแบบง่าย',
    details: 'รายละเอียดทางเทคนิค',
    outcome: 'ผลลัพธ์',
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

  build: {
    intro: 'งานนี้แบ่งเป็น 7 ขั้น ตั้งแต่ตั้งโจทย์จนถึงข้อเสนอแนะ แต่ละขั้นเริ่มด้วยคำอธิบายแบบเข้าใจง่าย กดเปิดเพื่อดูรายละเอียดทางเทคนิค',
    steps: [
      {
        day: 'ขั้นที่ 1',
        title: 'ตั้งโจทย์ให้ชัดก่อนทำกราฟ',
        simple: 'ก่อนสร้างอะไร ผมสำรวจข้อมูลก่อน แล้วเขียนให้ชัดว่างานนี้ต้องตอบคำถามธุรกิจข้อไหน ใครสนใจ และวัดความสำเร็จอย่างไร',
        items: [
          'สำรวจไฟล์ CSV ทั้ง 9 ไฟล์: 99,092 ออเดอร์ในช่วงที่วิเคราะห์ ส่งถึงแล้ว 96,203 รายการ',
          'สัญญาณแรกเปลี่ยนโจทย์: รีวิวแย่ 2 ใน 3 มาจากออเดอร์ที่ส่งตรงเวลา ความเร็วอย่างเดียวจึงไม่ใช่คำตอบ',
          'เขียน project charter, BRD v0.2, KPI dictionary 18 KPI และ user story 10 เรื่องพร้อม acceptance criteria',
          'ทำ stakeholder map และ RACI โดยผู้มีส่วนได้ส่วนเสียเป็นการจำลอง และระบุไว้ชัดเจน',
        ],
        result: 'คำถามธุรกิจและ KPI ชัดเจนก่อนเริ่มวิเคราะห์',
      },
      {
        day: 'ขั้นที่ 2',
        title: 'WS0 · สร้างข้อมูลที่เชื่อถือได้',
        simple: 'ข้อมูลดิบมีจุดผิด ผมจึงส่งข้อมูลผ่านชั้นทำความสะอาดด้วย SQL และทดสอบ โดยติดธงแถวที่มีปัญหาแทนการลบทิ้งเงียบๆ ทุกตัวเลขจึงย้อนตรวจได้',
        items: [
          'Pipeline ใน SQLite 3 ชั้น: raw → staging (แปลงชนิดข้อมูล ตัดข้อมูลซ้ำ แปลชื่อ) → star schema มี fact_orders, fact_order_items และตาราง dimension',
          'บันทึกปัญหาข้อมูล 13 ข้อใน cleaning log เช่น 189 ออเดอร์ที่เวลาเรียงผิดลำดับ (ติดธงและไม่นับใน KPI ด้านเวลา) และ 547 ออเดอร์ที่มีรีวิวมากกว่าหนึ่งรายการ (เก็บรีวิวล่าสุด)',
          'สร้างฟิลด์ที่ใช้วิเคราะห์: ส่งช้าหรือไม่ ผู้ขายส่งมอบช้าหรือไม่ จำนวนวันแต่ละขั้น เวลาที่เผื่อในวันสัญญา และระยะทางผู้ขายถึงลูกค้า',
          'เขียน data-quality test 19 ข้อ รวมถึงตรวจว่ารายได้ตรงกับราคาสินค้าในข้อมูลดิบ ผ่านครบ 19 ข้อ',
        ],
        result: 'Star schema ที่ผ่านการทดสอบ และไฟล์ CSV สะอาดสำหรับ Power BI',
      },
      {
        day: 'ขั้นที่ 3',
        title: 'WS1 · หาว่าความล่าช้าเกิดที่ไหน',
        simple: 'ผมแยกการส่งแต่ละครั้งเป็นขั้น คือ ชำระเงิน ผู้ขาย และบริษัทขนส่ง เพื่อดูว่าขั้นไหนกินเวลา แล้วหาว่าทำไมบางภูมิภาคพลาดวันสัญญาบ่อยกว่า',
        items: [
          'รายงาน Power BI 3 หน้า DAX 24 measure บน star schema ทุกกราฟตั้งชื่อเป็นข้อค้นพบ',
          'Process mining ด้วย pm4py: 98.6% ของออเดอร์เดินตามเส้นทางปกติ สั่ง → อนุมัติ → ส่งให้ขนส่ง → ส่งถึง',
          'Driver tree ของออเดอร์ที่ช้า 6,529 รายการ: 27.7% ผู้ขายส่งมอบช้า 72.3% ผู้ขายส่งตรงเวลาแต่ยังช้า',
          'การส่งมอบช้าทำให้อัตราส่งช้าเพิ่มจาก 5.4% เป็น 21.1% ผู้ขายจึงยังสำคัญ',
          'ระหว่างรัฐ อัตราส่งช้าขยับตามเวลาที่เผื่อในวันสัญญา (r = −0.72) วันสัญญาไม่เหมาะกับแต่ละเส้นทาง',
        ],
        result: 'ออเดอร์ที่ช้าเสียเวลาที่การขนส่ง และวันสัญญาไม่ได้ปรับตามเส้นทาง',
      },
      {
        day: 'ขั้นที่ 4',
        title: 'WS2 · อ่านสิ่งที่ลูกค้าไม่พอใจเขียนไว้',
        simple: 'รีวิวหลายพันรายการเยอะเกินกว่าจะอ่านเองทั้งหมด ผมจึงสร้างกฎ keyword ภาษาโปรตุเกสแบบง่ายที่จัดคำร้องเรียนแต่ละรายการเป็นประเภท แล้วทดสอบว่ากฎถูกบ่อยแค่ไหน',
        items: [
          'ใช้รีวิว 1–2 ดาวที่มีข้อความ 9,195 รายการ',
          'กำหนดประเภทคำร้องเรียน 8 แบบ พร้อมคำสังเกตภาษาโปรตุเกสและกฎตัดสินเมื่อเข้าได้หลายแบบ',
          'สร้าง label อ้างอิง 200 รายการ: AI ติด label ก่อน แล้วผมตรวจเองครบทุกรายการ',
          'ปรับกฎด้วยรีวิวที่ 1–100 แล้วทดสอบกับ 101–200: accuracy 0.88, macro-F1 0.82 สุ่มตรวจ 60 รายการถูก 77%',
          'โมเดลพื้นฐาน TF-IDF + logistic regression จาก 100 label ได้ macro-F1 0.33 กฎจึงดีกว่า',
        ],
        result: '60% ของคำร้องเรียนในออเดอร์ตรงเวลาเป็นเรื่องสินค้าหรือการจัดส่ง และในออเดอร์ผู้ขายหลายราย 48% บอกว่าของขาด',
      },
      {
        day: 'ขั้นที่ 5',
        title: 'WS3 · ทดสอบว่าทำนายออเดอร์ที่จะช้าได้ไหม',
        simple: 'ผมสร้างโมเดลที่ติดธงออเดอร์เสี่ยงตอนชำระเงิน โดยใช้เฉพาะข้อมูลที่รู้ในตอนนั้น แล้วทดสอบกับเดือนหลังๆ ที่โมเดลไม่เคยเห็น',
        items: [
          'ใช้เฉพาะข้อมูลที่รู้ตอนอนุมัติการชำระเงิน: จำนวนวันที่สัญญา ระยะทาง รัฐ หมวดสินค้า ราคา ค่าส่ง น้ำหนัก ช่วงเวลา และประวัติผู้ขาย',
          'แบ่งข้อมูลตามเวลา: train ม.ค. 2017 – มี.ค. 2018 (64,034 ออเดอร์) test เม.ย. – ส.ค. 2018 (31,985 ออเดอร์)',
          'กัน data leakage: ประวัติผู้ขายใช้เฉพาะออเดอร์ที่ส่งถึงก่อนวันที่สั่งซื้อ',
          'เทียบแบบสุ่ม กฎจากประวัติผู้ขาย logistic regression และ LightGBM แล้วเลือก logistic regression (เจอออเดอร์ที่ช้า 24.6% ในกลุ่มเสี่ยงสูงสุด 10%, precision 10.9%)',
          'ดูปัจจัยด้วย SHAP และเขียน model card พร้อมข้อจำกัด: recall แกว่งจาก 38.6% ถึง 7.1% ตามเดือน',
        ],
        result: 'ไปต่อแบบมีเงื่อนไข: ใช้กับมาตรการต้นทุนต่ำเท่านั้น ห้ามใช้ลงโทษผู้ขาย',
      },
      {
        day: 'ขั้นที่ 6',
        title: 'WS4 · ตัดสินใจว่าจะสร้างอะไร และพิสูจน์ว่าคุ้ม',
        simple: 'ผมใส่วิธีแก้แต่ละแบบลงในโมเดลการเงินแบบง่าย เก็บไว้เฉพาะแบบที่สมเหตุสมผล เขียน requirement และออกแบบการทดลองที่ยุติธรรมเพื่อพิสูจน์ผลก่อนใช้จริงทั้งระบบ',
        items: [
          'Business case ใน Excel มีหลายสถานการณ์ sensitivity และจุดคุ้มทุน: ระบบเตือนล่วงหน้าขาดทุน R$ 40,528 ในปีแรก (กรณีฐาน) และคุ้มทุนเมื่อปริมาณ 12.7 เท่าของปัจจุบัน จึงพักไว้ก่อน',
          'แนะนำให้ปรับวันสัญญาตามเส้นทาง และ SLA การส่งมอบของผู้ขายแบบแบ่ง tier A/B/C',
          'FRD 8 requirement เช่น ตารางเส้นทางรายสัปดาห์จากเวลาขนส่งเปอร์เซ็นไทล์ที่ 85 ของ 90 วันล่าสุด',
          'กระบวนการ To-Be และ wireframe ของ seller portal กับ ops dashboard',
          'ออกแบบ A/B pilot: กลุ่มละ 4,219 ออเดอร์ (รวม 8,438) ราว 6 สัปดาห์ โดยมีเงื่อนไขว่าอัตราการชำระเงินสำเร็จต้องไม่ลดเกิน 1 จุด',
        ],
        result: 'ข้อเสนอที่คิดต้นทุนแล้ว และแผน pilot พร้อมทดลอง ต้นทุนและ pilot เป็นการจำลองที่ระบุไว้ชัดเจน',
      },
      {
        day: 'ขั้นที่ 7',
        title: 'เล่าเรื่องให้เข้าใจง่าย',
        simple: 'ทำผลลัพธ์ให้คนอ่านแต่ละแบบรับได้ง่าย ทั้งสไลด์สั้น วิดีโอ และหน้านี้',
        items: [
          'Executive deck 10 สไลด์ และวิดีโอมีคำบรรยาย 3 นาที',
          'README บน GitHub ที่ลิงก์ทุกผลลัพธ์ไปยังหลักฐาน พร้อมขั้นตอนทำซ้ำ',
        ],
        result: 'เล่าได้ใน 30 วินาที และอธิบายเชิงลึกได้เมื่อถูกถาม',
      },
    ],
  },

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
    'Label อ้างอิง 200 รายการสำหรับตัวจัดกลุ่มรีวิว AI ติดก่อน แล้วผมตรวจเองครบทั้ง 200 รายการ',
    'ตัวจัดกลุ่มเองเป็นกฎ keyword ภาษาโปรตุเกสที่ตรวจสอบได้: macro-F1 0.82 บน label ที่กันไว้ทดสอบ',
  ],
}
