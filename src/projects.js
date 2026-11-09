import { PDPA_LAB } from './content/pdpaLab.js'

// Project content. Every project follows STAR: Situation, Task, Action, Result.
// `figures` are images in /public/projects. `extras` are extra lists shown after the figures.
// visual: placeholder artwork used when a project has no `cover` image.

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'ai', label: 'AI and Dev' },
  { id: 'security', label: 'Security' },
]

export const PROJECTS = [
  PDPA_LAB,
  /* ------------------------------------------------------------------ */
  {
    slug: 'traffic-analytics-dashboard',
    title: 'Traffic Analytics Dashboard',
    org: 'Transdev',
    period: 'Aug – Nov 2025',
    category: 'analytics',
    visual: 'heatmap',
    blurb:
      'Cleaned 190,000+ rows of raw traffic data and built Tableau dashboards with a Rush Hour Heatmap and a Hotspot Top 10 to support route optimization.',
    tools: ['Python', 'Pandas', 'Google Colab', 'Tableau'],
    cover: 'projects/traffic-analytics-dashboard/04-rush-hour-heatmap.webp',
    star: {
      situation:
        'Bangkok traffic status records for August 2025 existed only as raw data: 190,965 rows (15.9 MB). Nobody could yet say which road segments jam most, when congestion peaks, or whether the data was complete enough to trust.',
      task:
        'Prepare the data and build Tableau views that support route optimization: a ranking of problem road segments, the rush-hour pattern by hour and weekday, and a check of how complete the data is each day.',
      action: [
        'Cleaned and transformed the raw records with Python (Pandas) in Google Colab and converted timestamps to Thai time.',
        'Prepared four analysis files: the cleaned traffic table, a hotspot top 10, an hour-by-day heatmap table and a daily data-health overview.',
        'Defined one metric, red rate = red_count / obs_count: the share of observations where a road segment showed red.',
        'Built three Tableau views from those files: Hotspot Top 10, Rush Hour Heatmap and Daily Overview.',
      ],
      result: [
        'Monday at 11:00 is the heaviest single hour in the month’s heatmap.',
        'Friday evening, 17:00 to 19:00, is denser than the same hours on other days.',
        'The Top 10 ranks road segments by red rate, so the worst segments are visible first.',
        'Daily coverage stayed well below 100% (roughly 35% to 70%), so the results are read as indicative rather than exact.',
      ],
    },
    figures: [
      { src: 'projects/traffic-analytics-dashboard/01-data.webp', title: 'Source data', note: '190,965 rows (15.9 MB) loaded into Tableau.' },
      { src: 'projects/traffic-analytics-dashboard/02-cleaning.webp', title: 'Cleaning in Google Colab', note: 'Pandas workflow that produces the cleaned traffic file.' },
      { src: 'projects/traffic-analytics-dashboard/03-hotspot-top10.webp', title: 'Hotspot Top 10', note: 'Road segments with the highest red rate, sorted from most to least congested. Bars count red observations; labels show red rate %.' },
      { src: 'projects/traffic-analytics-dashboard/04-rush-hour-heatmap.webp', title: 'Rush Hour Heatmap', note: 'Hour of day across, day of week down. Green is flowing; orange to red is increasingly jammed.' },
      { src: 'projects/traffic-analytics-dashboard/05-daily-coverage.webp', title: 'Daily Overview', note: 'Coverage % per day = obs_count / expected_per_day. At a 5-minute collection rate, 288 records a day equals 100%.' },
    ],
    extras: [
      {
        title: 'How it can be used',
        items: [
          'Prioritize which road segments to address first in signal timing and traffic management.',
          'Show rush hours clearly so plans and signal settings can follow them.',
          'Advise the public and merchants on risky times, and suggest alternative routes to users.',
          'Use the daily overview to spot abnormal days, such as sensor or system outages.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'local-rag-chatbot',
    title: 'Local RAG Chatbot',
    org: 'Transdev',
    period: 'Aug – Nov 2025',
    category: 'ai',
    visual: 'chat',
    blurb:
      'A ChatGPT-style web app that runs a Thai language model on a local machine. Users chat in real time and attach PDF or text files so answers come from their own data.',
    tools: ['React', 'LM Studio', 'OpenThaiGPT 1.5-7B', 'RAG'],
    cover: 'projects/local-rag-chatbot/01-chat-interface.webp',
    star: {
      situation:
        'Cloud chatbots send whatever users type to an outside service. This project set out to show that a ChatGPT-style assistant can run on a single machine, with a Thai-capable model and no internet connection, so typed data stays on the device.',
      task:
        'Build a web chat app that connects to a local model through the LM Studio API, supports real-time conversation, lets users attach PDF or text files, and answers from the data provided. Then test how accurate the answers are.',
      action: [
        'Ran OpenThaiGPT 1.5-7B Instruct (about 4 GB) in LM Studio on a local machine, using about 18 GB of RAM.',
        'Built the front end in React: attach a file, extract its text (PDF text through pdf.js), and add it to the question before it goes to the model.',
        'Kept a separate conversation history for each chat so the model keeps context within one chat.',
        'Streamed replies from the LM Studio chat completions endpoint, so text appears as it is generated and the send button turns into a stop button.',
        'Tested with 60 questions across categories, reviewed every wrong or near-miss answer, and traced each one to a cause and a fix.',
      ],
      result: [
        '39 of 60 answers were correct (65%), 5 were almost correct and 16 were wrong.',
        'Errors came from misreading the question, invented details and incomplete references.',
        'Fixes: ground answers in supplied data (RAG), limit the domain, and give the model complete real data.',
        'The app answers questions about an attached file, including follow-ups, without sending the data off the machine.',
      ],
    },
    figures: [
      { src: 'projects/local-rag-chatbot/01-chat-interface.webp', title: 'Chat interface', note: 'React chat app connected to a local model. Chat list, file attachment and streaming replies.' },
      { src: 'projects/local-rag-chatbot/02-architecture.webp', title: 'How a question is answered', note: 'The message and any attached file are processed, relevant content is retrieved, and the local model writes the reply.' },
      { src: 'projects/local-rag-chatbot/03-model-test.webp', title: 'Model test', note: '60 questions across categories. Wrong answers and near-misses are highlighted for review.' },
      { src: 'projects/local-rag-chatbot/04-error-cases.webp', title: 'Error cases and fixes', note: 'Two examples: a near-miss on a detail, and an answer from the wrong domain. Both fixed by grounding and limiting the domain.' },
    ],
    extras: [
      {
        title: 'Limits',
        items: [
          'PDF reading takes text from the first page only, so long documents are not covered.',
          'File text is placed in the prompt. There is no vector database, so this shows the basics of RAG rather than a full retrieval system.',
          'A 7B model is weaker than larger models at deep reasoning and can be wrong on general knowledge, so answers need checking.',
        ],
      },
      {
        title: 'What I learned',
        items: [
          'Connecting a front end to a local LLM through LM Studio.',
          'Reading streamed replies chunk by chunk with server-sent events.',
          'Extracting PDF text before sending it to the model, and keeping chat state in the browser.',
          'A model “knows who you are” only because of the context it is sent, not because it stores facts.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'social-media-competitive-dashboard',
    title: 'Social Media Competitor Analysis',
    org: 'DataFirst',
    period: 'Data: Nov 2024 – Jan 2025',
    category: 'analytics',
    visual: 'bars',
    cover: 'projects/social-media-competitive-dashboard/01-competitive-summary.webp',
    coverFit: 'contain',
    blurb:
      'A competitive summary of four bakery brands on Facebook: followers, posting volume, content types and promotion habits over three months.',
    tools: ['Competitive analysis', 'Facebook Pages', 'Google Slides'],
    star: {
      situation:
        'A bakery client with the largest Facebook following in its category (1.1 million) needed to see how its page compared with three competitors over the same period, 1 November 2024 to 31 January 2025.',
      task:
        'Summarize each competitor’s Facebook activity (followers, posting volume, content and channels) next to the client’s, so the team can see where the client leads and where competitors do something different.',
      action: [
        'Collected page data for four Facebook pages: the client and three competitors, Thai Yamazaki, S&P and Lepang.',
        'Counted posts for the three-month window and recorded follower counts.',
        'Reviewed what each page posts: promotions, product posts, Reels, games and activities, and posting schedule.',
        'Built a one-page Competitive Summary, followed by a slide for each competitor.',
      ],
      result: [
        'The client has the most followers (1.1 million) and posted the most: 182 posts in three months, against 139, 70 and 50 for the competitors.',
        'It is the only page with a fixed twice-daily schedule (06:00 and 16:00) and games and activities for fans.',
        'The client, S&P and Lepang all run a big promotion at the start of each month. S&P adds a 20% sale every Wednesday.',
        'Thai Yamazaki posts least and mostly shares reviews from other promotion pages.',
      ],
    },
    compare: {
      period: '1 Nov 2024 – 31 Jan 2025',
      avg: {
        img: 'projects/social-media-competitive-dashboard/shot-avg-engagement.webp',
        points: [
          'Average monthly engagement over the period: S&P 30,175, the client 22,173, Lepang 14,892 and Thai Yamazaki 3,805.',
          'The client posts the most (182) but earns less per post than S&P and Lepang: about 365 engagements per post, against about 651 for S&P, 647 for Lepang and 228 for Thai Yamazaki (calculated from the totals).',
          'S&P peaked in December (41,368) and dropped in January (19,817), while Lepang grew each month and passed it in January (21,620).',
        ],
      },
      brands: [
        {
          name: 'Farm House (client)', img: 'projects/social-media-competitive-dashboard/shot-farmhouse.webp', summary: ['Total engagement 66,519 over three months: likes 62,223, comments 1,562, shares 2,734. December was the peak month (25,804 likes).', 'Best days: Friday (19,208), Saturday (18,037) and Wednesday (15,453). Tuesday was the weakest (1,654).', 'Content mix of 182 posts: Product 63 (35%), Tips 27, Promotion 21, Festive 21, Video 19, Games 18.'], role: 'client', followers: 1100000, posts: 182,
          notes: ['Reels with recipe how-tos and product promo videos', 'Posts every day at 06:00 and 16:00', 'Focus on selling bread', 'Big promotion at the start of every month', 'Games and activities for fans'],
        },
        {
          name: 'S&P', img: 'projects/social-media-competitive-dashboard/shot-sp.webp', summary: ['Highest total engagement of the four: 90,524. Likes peaked in December (39,522) and fell to 18,605 in January.', 'Best days: Friday (22,215), Wednesday (17,793) and Thursday (15,576), which matches its Wednesday 20% sale.', 'Content mix of 139 posts: Product 50 (36%) and Promotion 37 (27%), well above its other categories.'], role: 'competitor', followers: 590000, posts: 139,
          notes: ['Big promotion at the start of every month', '20% sale every Wednesday', 'Food, cakes, bread and seasonal drinks'],
        },
        {
          name: 'Lepang', img: 'projects/social-media-competitive-dashboard/shot-le-pan.webp', summary: ['Total engagement 44,676 from 69 posts. Likes grew every month: 9,012, then 13,146, then 20,266. (The chart’s total bar reads 90,524, a copy error in the original slide; the daily values add up to 44,676.)', 'Engagement is spread across the week, with Monday (9,357) and Friday (8,908) on top and Sunday lowest (2,611).', 'Content mix of 69 posts: Reels 18 (26%) and Product 16 are the largest groups, more video-led than the others.'], role: 'competitor', followers: 826000, posts: 70,
          notes: ['Big promotion at the start of every month', 'Focus on selling bread', 'Reels with recipe how-tos and product promo videos'],
        },
        {
          name: 'Thai Yamazaki', img: 'projects/social-media-competitive-dashboard/shot-thai-yamazaki.webp', summary: ['Smallest engagement: 11,414 from 50 posts. January was the best month (4,915 likes) and December the weakest (974).', 'Best days: Wednesday (3,708), Friday (2,270) and Thursday (2,085); Sunday was lowest (515).', 'Content mix of 50 posts: Product 17, News 13, Promote 10 and Reels 7.'], role: 'competitor', followers: 169236, posts: 50,
          notes: ['Shares posts from pages that review its in-store bread', 'Uses Reels', 'Focus on selling bread', 'Posts infrequently'],
        },
      ],
    },
    extras: [
      {
        title: 'Scope',
        items: [
          'One three-month window and Facebook pages only.',
          'Post counts are totals for the window, as shown on the summary slide.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'fmcg-share-of-voice',
    title: 'FMCG Media Spend and Share of Voice',
    org: 'DataFirst',
    period: 'Aug 2024 – Apr 2025',
    category: 'analytics',
    visual: 'sov',
    blurb:
      'Analyzed media spending and Share of Voice across the bakery, chocolate and biscuit categories from 2020 to March 2025 to identify market trends and opportunities for media strategy.',
    tools: ['Market analysis', 'Share of Voice', 'Media spend', 'Tableau'],
    cover: 'projects/fmcg-share-of-voice/02-share-of-voice.webp',
    star: {
      situation:
        'Media strategy for the bakery, chocolate and biscuit industry needed a clear picture of the market: how much was spent on advertising from 2020 to March 2025, through which media, and which brands held the share of voice in each category.',
      task:
        'Show total media spend by media group and year, each category’s share of total spend, and for every category the media mix, brand-group share of voice and top products.',
      action: [
        'Built Tableau views of total media spend by year and by media group: TV, cinema, digital, outdoor, print and radio.',
        'Calculated each category’s share of total spend per year across seven categories: bakery, crackers, bread, cake, chocolate, cookies and wafers.',
        'For every category, showed spend by year, media mix, share of voice among brand groups and the top three products by spend.',
      ],
      result: [
        'TV carried about 87% of the 4.87B total spend (4,255.7M), while digital was about 1% (58.5M).',
        'Yearly spend peaked in 2023 at 1.213B and was 1.082B in 2024. January to March 2025 alone reached 217M.',
        'Cookies grew from 16.5% of category spend in 2020 to 34.2% in January to March 2025, the largest share in that period.',
        'Wafers fell from 25.8% of spend in 2021 to 14.5% in January to March 2025.',
      ],
    },
    figures: [
      { src: 'projects/fmcg-share-of-voice/01-media-spend.webp', title: 'Media spend, 2020 to 2025', note: 'Spend by media group and year. 2025 covers January to March only.' },
      { src: 'projects/fmcg-share-of-voice/02-share-of-voice.webp', title: 'Share of total spend by category', note: 'Each bar is one year, split by category.' },
      { src: 'projects/fmcg-share-of-voice/03-bakery.webp', title: 'Category: Bakery', note: 'Spend by year, media mix, share of voice by brand group and top three products.' },
      { src: 'projects/fmcg-share-of-voice/04-crackers.webp', title: 'Category: Crackers', note: 'Same four views for crackers.' },
      { src: 'projects/fmcg-share-of-voice/05-bread.webp', title: 'Category: Bread', note: 'Same four views for bread.' },
      { src: 'projects/fmcg-share-of-voice/06-cake.webp', title: 'Category: Cake', note: 'Same four views for cake.' },
      { src: 'projects/fmcg-share-of-voice/07-chocolate.webp', title: 'Category: Chocolate', note: 'Same four views for chocolate.' },
      { src: 'projects/fmcg-share-of-voice/08-cookies.webp', title: 'Category: Cookies', note: 'Same four views for cookies.' },
    ],
    extras: [
      {
        title: 'How it can be used',
        items: [
          'Compare how much each category spends and which brand groups lead its share of voice.',
          'See which media each category relies on and how that mix changed since 2020.',
          'Use the top three products per category as a starting point for competitor reviews.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'travel-recommendation-app',
    title: 'Travel Recommendation Web App',
    org: 'DataFirst',
    period: 'Aug – Nov 2024',
    category: 'ai',
    visual: 'travel',
    blurb:
      'A responsive travel website built with React and Bootstrap: destination pages for three countries, user reviews, login, and a PWA setup. Built with a cross-functional team.',
    tools: ['React', 'Bootstrap', 'SQLite', 'Postman', 'PWA', 'Git / GitHub'],
    cover: 'projects/travel-recommendation-app/02-home.webp',
    star: {
      situation:
        'During a 15-week internship at DataFirst (13 August to 30 November 2024), the team built a website that recommends travel destinations. Visitors needed destination information in one place, with opening times, reviews and photos, on both phone and desktop.',
      task:
        'As the front-end developer on the team, build and improve what users see and use: the pages, the interface and the review features, based on the project requirements. A teammate worked on the back end.',
      action: [
        'Split the interface into React components such as header, footer and destination cards, and styled it with Bootstrap so it adapts to every screen size.',
        'Built the home page with a section per country, destination detail pages with highlights and travel tips, an About page, and login and sign-in pages.',
        'Built the review feature: write, edit and delete a review with country, location, star rating and text.',
        'Worked with the SQLite database that stores the data behind the site\'s functions, such as user accounts and reviews, so the front end could read and save it.',
        'Tested the back-end API in Postman together with the back-end teammate, to check that each request returned the expected data.',
        'Set the app up as a Progressive Web App, and ran Lighthouse on the local build.',
        'Debugged with Chrome DevTools and React DevTools, and shared code with the team through Git and GitHub.',
      ],
      result: [
        'A working site covering nine destinations in three countries: Switzerland, France and Japan.',
        'The layout adapts to phone, tablet and desktop screens.',
        'Signed-in users can add, edit and delete reviews, with the data stored in SQLite.',
        'The API endpoints were checked in Postman before and during front-end integration.',
        'Lighthouse on the local build: Performance 60, Accessibility 82, Best Practices 96, SEO 83.',
      ],
    },
    figures: [
      { src: 'projects/travel-recommendation-app/02-home.webp', title: 'Home page', note: 'A section per country with destination cards: three each for Switzerland, France and Japan.' },
      { src: 'projects/travel-recommendation-app/03-review-form.webp', title: 'Add or edit a review', note: 'Country, location, star rating and review text.' },
      { src: 'projects/travel-recommendation-app/04-review-list.webp', title: 'Review list', note: 'Signed-in users can edit and delete their own reviews.' },
      { src: 'projects/travel-recommendation-app/05-login.webp', title: 'Login', note: 'Login page. The sign-up page follows the same layout.' },
      { src: 'projects/travel-recommendation-app/01-lighthouse.webp', title: 'Lighthouse check', note: 'Run on the local build. Performance was the weakest score at 60, with a slow largest contentful paint.' },
    ],
    extras: [
      {
        title: 'Scope and limits',
        items: [
          'The site presents information and reviews. It does not support booking tickets or planning a full trip.',
          'Performance (60) is the score to improve first.',
        ],
      },
      {
        title: 'Challenges and next steps',
        items: [
          'The internship was short, so some topics could not be studied in depth.',
          'PWA and React Hooks were new and took time to understand.',
          'Next: TypeScript, Redux and Next.js to build stronger front-end skills.',
        ],
      },
    ],
  },
]
