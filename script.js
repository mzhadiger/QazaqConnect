// =========================
// Qazaq Connect — JS (EN + KZ, Events + Calendar, Instagram, Quiz, Analytics)
// =========================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Config you edit ----------
/**
 * PARTIFUL EVENTS
 * Add upcoming events here.
 *
 * Recommended fields (unlock "Next Event" banner + Calendar):
 * - startISO: ISO date/time string (NYC time). Example: "2026-01-15T19:00:00-05:00"
 * - endISO: ISO date/time string
 * - rsvpDeadlineISO: ISO string (optional)
 * - type: "speaking" | "cultural"
 * - recurringWeekly: true (optional; used as template for weekly calendar)
 */
const PARTIFUL_EVENTS = [
  {
    title: { en: "Weekly Speaking Club", kz: "Апталық сөйлесу клубы" },
    when: { en: "Weekly • NYC", kz: "Апта сайын • Нью-Йорк" },
    where: { en: "Location shared after RSVP", kz: "Орын RSVP-ден кейін жіберіледі" },
    partifulUrl: "https://YOUR-PARTIFUL-LINK-HERE",
    igPosterUrl: "",
    type: "speaking",
    recurringWeekly: true,
    // startISO: "2026-01-15T19:00:00-05:00",
    // endISO: "2026-01-15T21:00:00-05:00",
    // rsvpDeadlineISO: "2026-01-15T15:00:00-05:00",
  },
  {
    title: { en: "Nauryz Celebration", kz: "Наурыз мерекесі" },
    when: { en: "Spring • NYC", kz: "Көктем • Нью-Йорк" },
    where: { en: "Venue announced soon", kz: "Орын жақында" },
    partifulUrl: "https://YOUR-PARTIFUL-LINK-HERE",
    igPosterUrl: "",
    type: "cultural",
  },
  {
    title: { en: "Jeltoqsan Month", kz: "Желтоқсан айы" },
    when: { en: "December • NYC", kz: "Желтоқсан • Нью-Йорк" },
    where: { en: "Details in Telegram/WhatsApp", kz: "Мәлімет чатта" },
    partifulUrl: "https://YOUR-PARTIFUL-LINK-HERE",
    igPosterUrl: "",
    type: "cultural",
  },
];

/**
 * PAST EVENTS ARCHIVE
 * Used for "Past events" recap cards (photos/recaps).
 */
const PAST_EVENTS = [
  {
    title: { en: "New Year Meetup", kz: "Жаңа жыл кездесуі" },
    when: { en: "Dec 2025", kz: "Желтоқсан 2025" },
    photoCount: 42,
    recapUrl: "#gallery",
  },
  {
    title: { en: "Speaking Club — Midtown", kz: "Сөйлесу клубы — Midtown" },
    when: { en: "Nov 2025", kz: "Қараша 2025" },
    photoCount: 28,
    recapUrl: "#gallery",
  },
];

/**
 * Instagram feed (real-time recommended):
 * - Best: set IG_FEED_ENDPOINT to your own backend endpoint that returns recent posts as JSON.
 *   Expected response:
 *     { "posts": [ { "permalink": "...", "media_url": "...", "caption": "...", "timestamp": "..." } ] }
 *
 * - Fallback: INSTAGRAM_POSTS permalinks + Instagram embed.js (heavier on mobile).
 */
const IG_PROFILE_URL = "https://www.instagram.com/qazaq.connect/";
const IG_FEED_ENDPOINT = ""; // e.g. "https://your-domain.com/api/instagram-feed"
const IG_POST_LIMIT = 8;

const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DRnh1KhgQ4x/?img_index=1",
  "https://www.instagram.com/p/DRkWJFyEZC1/?img_index=1",
  "https://www.instagram.com/p/DRhsExjEX7Y/?img_index=1",
];

/**
 * Community stats (optional real-time):
 * Endpoint should return: { "members":, "telegram": 207, "whatsapp": 0 }
 */
const COMMUNITY_STATS_ENDPOINT = "";

/**
 * Donate button:
 * - If DONATE_URL is empty, "Donate" button points to #support.
 * - If set, it will open your donate landing page.
 */
const DONATE_URL = "";

/**
 * Analytics:
 * Add your GA4 measurement ID to enable tracking automatically.
 * Leave blank to keep tracking disabled (events still logged in console).
 */
const GA4_MEASUREMENT_ID = ""; // "G-XXXXXXXXXX"

// ---------- i18n strings ----------
const STRINGS = {
  en: {
    brand_tag: "Nonprofit • NYC",
    nav_join: "How to Join",
    nav_about: "About",
    nav_programs: "Programs",
    nav_events: "Events",
    nav_community: "Community",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    nav_rsvp: "RSVP",

    join_telegram: "Join Telegram",
    hero_pill: "Kazakh language • Culture • Community in NYC",
    hero_title: "Speak Kazakh. Meet your people. Feel at home in NYC.",
    hero_lead:
      "Qazaq Connect is a nonprofit initiative built by young entrepreneurs to preserve and promote Kazakh language and culture through speaking clubs, cultural events, and community.",
    join_whatsapp: "Join WhatsApp",
    see_events: "See events",
    donate: "Donate",

    next_kicker: "Next speaking club",
    join_next_club: "Join Next Speaking Club",
    how_to_join_btn: "How to join",
    next_badge: "Next event",
    sticky_rsvp: "RSVP • Next Club",

    float_join: "Join the community",
    float_members: "Members",

    stat_weekly_big: "Weekly",
    stat_weekly_small: "Speaking clubs",
    stat_hub_small: "Community hub",
    stat_big_big: "Big events",

    join_title: "How to Join",
    join_text: "Two minutes and you’re in. Pick your level, RSVP, and we’ll remind you.",
    join_step1_k: "Step 1",
    join_step1_m: "Choose your level",
    join_step1_t: "Take a 30‑second quiz",
    join_step1_b: "We’ll recommend the right speaking group: beginner, intermediate, or advanced.",
    join_step2_k: "Step 2",
    join_step2_m: "Stay in the loop",
    join_step2_t: "Join Telegram / WhatsApp",
    join_step2_b: "We post weekly club topics, locations, and last‑minute updates there.",
    join_step3_k: "Step 3",
    join_step3_m: "Get reminders",
    join_step3_t: "Event notifications",
    join_step3_b: "Leave your email/phone and we’ll send the next club details (no spam).",
    take_quiz: "Take the quiz",
    browse_events: "Browse events",

    form_email: "Email",
    form_phone: "Phone (optional)",
    form_email_ph: "you@email.com",
    form_phone_ph: "+1 555 123 4567",
    form_lang: "Preferred language",
    form_lang_en: "English",
    form_lang_kz: "Kazakh",
    form_interest: "Interested in",
    form_interest_speaking: "Speaking clubs",
    form_interest_cultural: "Cultural events",
    form_interest_both: "Both",
    form_submit: "Notify me about the next event",
    form_privacy: "We only use this to send event reminders. Unsubscribe anytime.",

    about_title: "Our mission",
    about_text:
      "We create conditions where Kazakh thrives not only as a cultural identity marker, but also as a practical tool for education, business, law, and everyday social interactions.",
    about_card1_k: "Who it’s for",
    about_card1_t: "Young Kazakhs, students, professionals",
    about_card1_b: "Whether you’re fluent or just starting — you’re welcome here.",
    about_card2_k: "Our vibe",
    about_card2_t: "Safe, warm, judgment-free",
    about_card2_b: "No judging. Just encouragement, practice, and real community.",

    trust_title: "Trust & Impact",
    trust_text: "Built by the community, for the community — with real faces, real results.",
    impact_title: "2025 impact",
    impact_live: "Live",
    impact_clubs: "speaking clubs hosted",
    impact_attendees: "total attendees",
    impact_members: "community members",
    topic_kicker: "This week’s phrase",

    team_title: "Meet the team",
    team_cta: "Partner with us",
    team_role1: "Co-Founder",
    team_role2: "Co-Founder",
    team_role3: "Co-Founder",

    testimonials_title: "What members say",
    testimonials_cta: "Come this week",
    partners_kicker: "Partners / affiliations",

    programs_title: "Programs",
    programs_text:
      "Language practice + culture + community — built to make Kazakh part of everyday life again.",
    tag_core: "Core",
    tag_alllevels: "All levels",
    prog1_title: "Speaking Clubs",
    prog1_li1: "Beginner / intermediate / advanced groups",
    prog1_li2: "Cultural + practical topics (work, study, life)",
    prog1_li3: "Friendly moderation + community rules",
    tag_community: "Community",
    prog2_title: "Cultural Events",
    prog2_li1: "Nauryz, Jeltoqsan month, talks & workshops",
    prog2_li2: "Real connections and networking",
    prog2_li3: "Soft-power language learning through culture",
    tag_tech: "Tech",
    tag_soon: "Coming soon",
    prog3_title: "AI Match App",
    prog3_li1: "Find Kazakh speakers nearby",
    prog3_li2: "Match by interests + professional field",
    prog3_li3: "Practice partners + community building",

    events_title: "Events",
    events_text: "We announce events through Partiful. Tap an event to RSVP.",
    events_btn1: "Get updates (Telegram)",
    events_btn2: "WhatsApp updates",
    events_note_html:
      'Tip: Add or edit events in <b>script.js</b> (<b>PARTIFUL_EVENTS</b>). Add dates/times to unlock the calendar + “Next Event” banner.',
    calendar_title: "Weekly club calendar",
    calendar_hint: "NYC time • RSVP deadlines shown when available",
    past_title: "Past events",
    past_cta: "See photos",

    community_title: "Community",
    community_text: "Practice together, get matched by level, and see what we’ve been up to.",
    members_title: "Live member count",
    members_sub: "Kazakhs in NYC (community)",
    members_hint: "Optional: connect a stats endpoint to update counts automatically.",

    quiz_title: "Test your Kazakh level",
    quiz_hint: "Takes ~30 seconds",
    quiz_q1: "When you speak Kazakh, you feel…",
    quiz_q1_a: "Just starting / shy",
    quiz_q1_b: "Okay with daily life topics",
    quiz_q1_c: "Confident, can debate",
    quiz_q2: "How often do you speak Kazakh weekly?",
    quiz_q2_a: "0–1 days",
    quiz_q2_b: "2–3 days",
    quiz_q2_c: "4+ days",
    quiz_q3: "What do you want most?",
    quiz_q3_a: "Basics & confidence",
    quiz_q3_b: "Fluency & vocabulary",
    quiz_q3_c: "Advanced topics & speaking speed",
    quiz_submit: "Get my recommendation",

    resources_title: "Quick resources",
    resources_support: "Support us",
    res1_t: "Basic greetings",
    res2_t: "At the café",
    res3_t: "Networking",
    res_hello: "Hi!",
    res_howareyou: "How are you?",
    res_coffee: "I’ll get a coffee.",
    res_howmuch: "How much is it?",
    res_nice: "Nice to meet you.",
    res_field: "What field do you work in?",
    resources_hint: "Add more phrases for SEO + shareability.",

    ig_title: "Live Instagram",
    ig_open: "Open profile",
    ig_text: "Recent posts from @qazaq.connect (auto-updates when configured).",
    ig_load: "Load recent posts",
    ig_more: "Load more",
    ig_hint_live:
      "Tip: set IG_FEED_ENDPOINT in script.js to fetch posts in real time (recommended for mobile speed).",

    gallery_title: "Gallery",
    gallery_text: "Choose photos or Instagram posters.",
    tab_photos: "Photos",
    tab_posters: "Instagram Posters",
    ig_hint_html:
      'These are embedded Instagram posts (public posts only). Add post URLs in <b>script.js</b> (<b>INSTAGRAM_POSTS</b>).',

    blog_title: "Culture blog",
    blog_text: "Short reads about Kazakh traditions, language tips, and NYC life.",
    blog1_k: "Traditions",
    blog1_t: "What is Nauryz?",
    blog1_b: "A quick guide to the holiday, food, and how we celebrate in NYC.",
    blog2_k: "Language",
    blog2_t: "5 phrases to use today",
    blog2_b: "Practical phrases for work, school, and meeting new friends.",
    blog3_k: "Community",
    blog3_t: "How speaking clubs work",
    blog3_b: "What happens in a session, how groups are split, and what to expect.",
    blog_read: "Read",

    support_title: "Support Qazaq Connect",
    support_text: "Your support keeps clubs affordable and helps us grow cultural programs.",
    support_ways: "Ways to support",
    support_note: "Donation link can be added later",
    support_donate: "Donate",
    support_sponsor: "Become a sponsor",
    support_volunteer: "Volunteer",
    support_transparency: "Transparency",
    support_li1: "Funds go to venue fees, materials, and cultural events.",
    support_li2: "We share impact updates and sponsor acknowledgements.",
    support_li3: "Add nonprofit status / EIN when finalized.",

    contact_title: "Contact",
    contact_text:
      "For partnerships, volunteering, or RSVP — message us on Telegram/WhatsApp/Instagram.",
    contact_fast: "Fastest way: join the community chats 👇",
    contact_donate: "Donation link is “coming soon”",
    contact_note: "Official nonprofit status / EIN",
    back_to_top: "Back to top",

    rsvp_partiful: "RSVP on Partiful",
    view_poster: "View poster",
    rsvp_deadline: "RSVP deadline:",
    at_time: "at",
    location: "Location:",
    details_in_chat: "Details in Telegram/WhatsApp",
    no_upcoming: "Weekly • check Telegram for details",
  },

  kz: {
    brand_tag: "Коммерциялық емес • NYC",
    nav_join: "Қалай қосылуға болады",
    nav_about: "Біз туралы",
    nav_programs: "Бағдарламалар",
    nav_events: "Іс-шаралар",
    nav_community: "Қауымдастық",
    nav_gallery: "Галерея",
    nav_contact: "Байланыс",
    nav_rsvp: "RSVP",

    join_telegram: "Telegram-ға кіру",
    hero_pill: "Қазақ тілі • Мәдениет • NYC қауымдастығы",
    hero_title: "Қазақша сөйлейік. Өз адамдарыңды тап. Нью-Йоркте үйдегідей бол.",
    hero_lead:
      "Qazaq Connect — қазақ тілі мен мәдениетін сөйлесу клубтары, мәдени іс-шаралар және қауымдастық арқылы сақтап, дамытатын коммерциялық емес бастама.",
    join_whatsapp: "WhatsApp-қа кіру",
    see_events: "Іс-шараларды көру",
    donate: "Қайырымдылық",

    next_kicker: "Келесі сөйлесу клубы",
    join_next_club: "Келесі клубқа қосылу",
    how_to_join_btn: "Қалай қосылуға болады",
    next_badge: "Келесі іс-шара",
    sticky_rsvp: "RSVP • Келесі клуб",

    float_join: "Қауымдастыққа қосылу",
    float_members: "Қатысушылар",

    stat_weekly_big: "Апта сайын",
    stat_weekly_small: "Сөйлесу клубы",
    stat_hub_small: "Қауымдастық хабы",
    stat_big_big: "Үлкен іс-шаралар",

    join_title: "Қалай қосылуға болады",
    join_text: "2 минутта қосыласың. Деңгейіңді таңда, RSVP жаса, біз еске саламыз.",
    join_step1_k: "1-қадам",
    join_step1_m: "Деңгейді таңда",
    join_step1_t: "30 секундтық тест",
    join_step1_b: "Біз саған лайық топты ұсынамыз: beginner, intermediate немесе advanced.",
    join_step2_k: "2-қадам",
    join_step2_m: "Жаңалықтан қалма",
    join_step2_t: "Telegram / WhatsApp",
    join_step2_b: "Апталық тақырып, орын, жаңартулар — бәрі сол жерде.",
    join_step3_k: "3-қадам",
    join_step3_m: "Еске салу",
    join_step3_t: "Іс-шара хабарландыруы",
    join_step3_b: "Email/телефон қалдыр — келесі клуб туралы еске саламыз (спам жоқ).",
    take_quiz: "Тест тапсыру",
    browse_events: "Іс-шараларды көру",

    form_email: "Email",
    form_phone: "Телефон (қалауыңша)",
    form_email_ph: "you@email.com",
    form_phone_ph: "+1 555 123 4567",
    form_lang: "Тіл таңдауы",
    form_lang_en: "English",
    form_lang_kz: "Kazakh",
    form_interest: "Қызығушылық",
    form_interest_speaking: "Сөйлесу клубтары",
    form_interest_cultural: "Мәдени іс-шаралар",
    form_interest_both: "Екеуі де",
    form_submit: "Келесі іс-шара туралы еске сал",
    form_privacy: "Тек іс-шара еске салуы үшін. Кез келген уақытта тоқтатуға болады.",

    about_title: "Біздің миссия",
    about_text:
      "Қазақ тілінің тек мәдени белгі емес, білім, бизнес, құқық және күнделікті қарым-қатынаста қолданылатын практикалық құрал ретінде дамуына жағдай жасаймыз.",
    about_card1_k: "Кімдерге",
    about_card1_t: "Жастарға, студенттерге, мамандарға",
    about_card1_b: "Тілді еркін білсең де, енді бастасаң да — қош келдің.",
    about_card2_k: "Біздің атмосфера",
    about_card2_t: "Жылы, қауіпсіз, сынаусыз",
    about_card2_b: "Сынау жоқ. Тек қолдау, практика және шынайы орта.",

    trust_title: "Сенім және әсер",
    trust_text: "Қауымдастық үшін, қауымдастықпен бірге — нақты адамдар, нақты нәтиже.",
    impact_title: "2024 нәтижелері",
    impact_live: "Live",
    impact_clubs: "клуб өткізілді",
    impact_attendees: "қатысушы",
    impact_members: "мүше",
    topic_kicker: "Осы аптадағы сөз",

    team_title: "Команда",
    team_cta: "Серіктестік",
    team_role1: "Co-Founder",
    team_role2: "Co-Founder",
    team_role3: "Co-Founder",
    team_bio1: "Ұсыныстан қысқа био қойыңыз.",
    team_bio2: "Ұсыныстан қысқа био қойыңыз.",
    team_bio3: "Ұсыныстан қысқа био қойыңыз.",
    team_hint: "Нақты фотоңызды /assets ішіне қосыңыз (team-1.jpg, team-2.jpg, team-3.jpg).",

    testimonials_title: "Қатысушылар пікірі",
    testimonials_cta: "Осы апта кел",
    partners_kicker: "Серіктестер / affiliation",
    partners_hint: "Логотиптерді қосыңыз (немесе бос қалдырыңыз).",

    programs_title: "Бағдарламалар",
    programs_text:
      "Тіл практикасы + мәдениет + орта — қазақ тілін күнделікті өмірге қайта енгізу үшін.",
    tag_core: "Негізгі",
    tag_alllevels: "Барлық деңгей",
    prog1_title: "Сөйлесу клубтары",
    prog1_li1: "Beginner / intermediate / advanced топтар",
    prog1_li2: "Мәдени + практикалық тақырыптар (оқу, жұмыс, өмір)",
    prog1_li3: "Модерация + орта ережелері",
    tag_community: "Қауымдастық",
    prog2_title: "Мәдени іс-шаралар",
    prog2_li1: "Наурыз, Желтоқсан айы, talk & workshop",
    prog2_li2: "Танысу, networking",
    prog2_li3: "Мәдениет арқылы жеңіл тіл үйрену",
    tag_tech: "Технология",
    tag_soon: "Жақында",
    prog3_title: "AI match қосымша",
    prog3_li1: "Жақындағы қазақ тілді табу",
    prog3_li2: "Қызығушылық + мамандық бойынша match",
    prog3_li3: "Practice partner + community",

    events_title: "Іс-шаралар",
    events_text: "Іс-шараларды Partiful арқылы жариялаймыз. RSVP үшін ашыңыз.",
    events_btn1: "Жаңалықтар (Telegram)",
    events_btn2: "WhatsApp жаңалықтары",
    events_note_html:
      'Кеңес: <b>script.js</b> ішіндегі <b>PARTIFUL_EVENTS</b> массивін өзгертіңіз. Күн/уақыт қоссаңыз — календарь және “Next Event” көрінеді.',
    calendar_title: "Апталық клуб календарі",
    calendar_hint: "NYC уақыты • RSVP дедлайны көрсетіледі (болса)",
    past_title: "Өткен іс-шаралар",
    past_cta: "Фотолар",

    community_title: "Қауымдастық",
    community_text: "Бірге практика, деңгей бойынша топ, және біздің соңғы жаңалықтар.",
    members_title: "Live мүше саны",
    members_sub: "NYC қазақтары (қауымдастық)",
    members_hint: "Қаласаңыз, API арқылы санды автоматты жаңартуға болады.",

    quiz_title: "Қазақ тілі деңгейін тексер",
    quiz_hint: "~30 секунд",
    quiz_q1: "Қазақша сөйлегенде өзіңді қалай сезінесің?",
    quiz_q1_a: "Жаңадан бастадым / ұяламын",
    quiz_q1_b: "Күнделікті тақырыптарда болады",
    quiz_q1_c: "Еркін, пікірталасқа да дайын",
    quiz_q2: "Аптада қанша күн қазақша сөйлейсің?",
    quiz_q2_a: "0–1 күн",
    quiz_q2_b: "2–3 күн",
    quiz_q2_c: "4+ күн",
    quiz_q3: "Ең маңыздысы не?",
    quiz_q3_a: "Негіздер & сенім",
    quiz_q3_b: "Сөздік & еркін сөйлеу",
    quiz_q3_c: "Күрделі тақырыптар & жылдам сөйлеу",
    quiz_submit: "Ұсынысымды алу",

    resources_title: "Жедел ресурстар",
    resources_support: "Қолдау",
    res1_t: "Сәлемдесу",
    res2_t: "Кафеде",
    res3_t: "Networking",
    res_hello: "Сәлем!",
    res_howareyou: "Қалайсың?",
    res_coffee: "Кофе алайын.",
    res_howmuch: "Қанша тұрады?",
    res_nice: "Танысқаныма қуаныштымын.",
    res_field: "Қай салада жұмыс істейсің?",
    resources_hint: "Көбірек фраза — SEO және бөлісуге ыңғайлы.",

    ig_title: "Live Instagram",
    ig_open: "Профильді ашу",
    ig_text: "@qazaq.connect соңғы посттары (қоссаңыз — авто жаңарады).",
    ig_load: "Посттарды жүктеу",
    ig_more: "Көбірек",
    ig_hint_live:
      "Кеңес: script.js ішінде IG_FEED_ENDPOINT қойыңыз (mobile үшін жылдамырақ).",

    gallery_title: "Галерея",
    gallery_text: "Фото немесе Instagram постерлерін таңдаңыз.",
    tab_photos: "Фотолар",
    tab_posters: "Instagram постерлері",
    ig_hint_html:
      'Бұл — Instagram посттарының embed түрі (тек public посттар). URL-дарды <b>script.js</b> ішіндегі <b>INSTAGRAM_POSTS</b> массивіне қосыңыз.',

    blog_title: "Мәдени блог",
    blog_text: "Наурыз дәстүрі, тіл кеңестері, және NYC өмірі туралы қысқа мәтіндер.",
    blog1_k: "Дәстүр",
    blog1_t: "Наурыз деген не?",
    blog1_b: "Мереке, тағам, және NYC-та қалай атап өтеміз.",
    blog2_k: "Тіл",
    blog2_t: "Бүгін қолданатын 5 фраза",
    blog2_b: "Оқу, жұмыс, танысуға арналған пайдалы фразалар.",
    blog3_k: "Қауымдастық",
    blog3_t: "Сөйлесу клубы қалай өтеді?",
    blog3_b: "Сессия қалай өтеді, топтарға бөлу, және не күту керек.",
    blog_read: "Оқу",

    support_title: "Qazaq Connect қолдау",
    support_text: "Қолдауыңыз клубты қолжетімді етеді және бағдарламаларды өсіреді.",
    support_ways: "Қолдау түрлері",
    support_note: "Донат сілтемесін кейін қосуға болады",
    support_donate: "Қайырымдылық",
    support_sponsor: "Sponsor болу",
    support_volunteer: "Волонтер",
    support_hint: "Кеңес: script.js ішінде DONATE_URL қойыңыз.",
    support_transparency: "Ашықтық",
    support_li1: "Қаражат venue, материалдар, мәдени іс-шараларға жұмсалады.",
    support_li2: "Нәтиже және sponsor алғыс жариялаймыз.",
    support_li3: "Ресми nonprofit/EIN дайын болғанда қосыңыз.",

    contact_title: "Байланыс",
    contact_text:
      "Серіктестік, волонтерлік немесе RSVP үшін Telegram/WhatsApp/Instagram арқылы жазыңыз.",
    contact_fast: "Ең тезі: қауымдастық чаттарына кіріңіз 👇",
    contact_donate: "Қайырымдылық сілтемесі кейін қосылады.",
    contact_note: "Ресми nonprofit/EIN дайын болғанда қосыңыз.",
    back_to_top: "Жоғарыға",

    rsvp_partiful: "Partiful арқылы RSVP",
    view_poster: "Постерді көру",
    rsvp_deadline: "RSVP дедлайны:",
    at_time: "",
    location: "Орын:",
    details_in_chat: "Мәлімет чатта",
    no_upcoming: "Апта сайын • чаттан қараңыз",
  },
};

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function safeUrl(u) {
  try {
    return new URL(u).toString();
  } catch {
    return "";
  }
}

function getLang() {
  return localStorage.getItem("qc_lang") || "en";
}

function setLang(lang) {
  localStorage.setItem("qc_lang", lang);
  document.documentElement.lang = lang === "kz" ? "kk" : "en";
  applyI18n(lang);
  updateLangLabels(lang);
  renderEvents(lang);
  renderPastEvents(lang);
  renderCalendar(lang);
  updateNextEventUI(lang);
  track("language_toggle", { lang });
}

function applyI18n(lang) {
  const dict = STRINGS[lang] || STRINGS.en;

  // textContent
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // innerHTML (when needed)
  $$("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) el.innerHTML = dict[key];
  });

  // placeholder
  $$("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });
}

function updateLangLabels(lang) {
  const label = lang === "kz" ? "KZ" : "EN";
  const langLabel = $("#langLabel");
  const langLabelMobile = $("#langLabelMobile");
  if (langLabel) langLabel.textContent = label;
  if (langLabelMobile) langLabelMobile.textContent = label;
}

// ---------- Year ----------
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- Language toggle ----------
const langToggle = $("#langToggle");
const langToggleMobile = $("#langToggleMobile");
function toggleLang() {
  const curr = getLang();
  setLang(curr === "en" ? "kz" : "en");
}
if (langToggle) langToggle.addEventListener("click", toggleLang);
if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLang);

// ---------- Reveal on scroll ----------
if (!prefersReducedMotion) {
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("is-visible"));
}

// ---------- Hero slider ----------
const slides = $$(".heroSlide");
let slideIndex = 0;
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
}
if (!prefersReducedMotion && slides.length > 1) {
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 6500);
} else {
  showSlide(0);
}

// ---------- Lightbox (photos) ----------
const lightbox = $("#lightbox");
const lbImg = $("#lbImg");
const lbClose = $("#lbClose");

function openLightbox(src) {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  track("gallery_open_lightbox", { src });
}
function closeLightbox() {
  if (!lightbox || !lbImg) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}
$$("[data-img]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const src = btn.getAttribute("data-img");
    if (src) openLightbox(src);
  });
});
if (lbClose) lbClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

// ---------- Events ----------
function isPlaceholderPartiful(url) {
  return !url || url.includes("YOUR-PARTIFUL-LINK-HERE");
}

function getEventTitle(ev, lang) {
  return (ev.title && ev.title[lang]) || ev.title?.en || "Event";
}

function getEventWhen(ev, lang) {
  return (ev.when && ev.when[lang]) || ev.when?.en || "";
}

function getEventWhere(ev, lang) {
  return (ev.where && ev.where[lang]) || ev.where?.en || "";
}

function parseISO(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDateTime(d, lang) {
  // Prefer NYC formatting without depending on libraries.
  try {
    return new Intl.DateTimeFormat(lang === "kz" ? "kk-KZ" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

function fmtDate(d, lang) {
  try {
    return new Intl.DateTimeFormat(lang === "kz" ? "kk-KZ" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return d.toDateString();
  }
}

function getUpcomingEvents() {
  const now = Date.now();
  return PARTIFUL_EVENTS
    .map((ev) => ({
      ...ev,
      _start: parseISO(ev.startISO),
      _end: parseISO(ev.endISO),
      _deadline: parseISO(ev.rsvpDeadlineISO),
    }))
    .filter((ev) => ev._start && ev._start.getTime() > now)
    .sort((a, b) => a._start.getTime() - b._start.getTime());
}

function getNextEvent() {
  const upcoming = getUpcomingEvents();
  return upcoming.length ? upcoming[0] : null;
}

function updateEventJsonLd(lang) {
  const node = $("#eventJsonLd");
  if (!node) return;

  const next = getNextEvent();
  if (!next || !next._start) {
    node.textContent = "";
    return;
  }

  const title = getEventTitle(next, lang);
  const where = getEventWhere(next, lang) || "New York City";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    startDate: next._start.toISOString(),
    endDate: next._end ? next._end.toISOString() : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: where,
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Qazaq Connect",
      url: window.location.href,
    },
    url: safeUrl(next.partifulUrl) || window.location.href,
  };

  // Remove undefined keys
  Object.keys(schema).forEach((k) => schema[k] === undefined && delete schema[k]);
  node.textContent = JSON.stringify(schema);
}

function renderEvents(lang) {
  const grid = $("#eventsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const t = STRINGS[lang] || STRINGS.en;

  PARTIFUL_EVENTS.forEach((ev) => {
    const partiful = safeUrl(ev.partifulUrl);
    const ig = safeUrl(ev.igPosterUrl || "");
    const title = getEventTitle(ev, lang);
    const when = getEventWhen(ev, lang);
    const where = getEventWhere(ev, lang);

    const card = document.createElement("article");
    card.className = "card card--hover";

    const hasRSVP = partiful && !isPlaceholderPartiful(partiful);

    card.innerHTML = `
      <div class="card__kicker">${escapeHtml(when)}</div>
      <div class="card__title">${escapeHtml(title)}</div>
      <div class="card__text">${escapeHtml(where)}</div>
      <div class="chipRow" style="margin-top:12px;">
        ${hasRSVP ? `<a class="btn btn--primary" data-track="rsvp_partiful" href="${partiful}" target="_blank" rel="noopener">${t.rsvp_partiful}</a>` : `<span class="mini">${t.details_in_chat}</span>`}
        ${ig ? `<a class="btn" data-track="view_poster" href="${ig}" target="_blank" rel="noopener">${t.view_poster}</a>` : ""}
      </div>
    `;

    grid.appendChild(card);
  });

  bindTrackedLinks(grid);
}

function renderPastEvents(lang) {
  const wrap = $("#pastEvents");
  if (!wrap) return;
  wrap.innerHTML = "";

  PAST_EVENTS.forEach((ev) => {
    const title = getEventTitle(ev, lang);
    const when = getEventWhen(ev, lang);
    const recap = safeUrl(ev.recapUrl || "#gallery");
    const count = ev.photoCount ?? 0;

    const card = document.createElement("a");
    card.className = "pastCard";
    card.href = recap;
    card.innerHTML = `
      <div class="pastCard__top">
        <div class="pastCard__when">${escapeHtml(when)}</div>
        <div class="mini mini--gold">${count}+ photos</div>
      </div>
      <div class="pastCard__title">${escapeHtml(title)}</div>
      <div class="pastCard__hint">Open recap</div>
    `;
    wrap.appendChild(card);
  });
}

function renderCalendar(lang) {
  const list = $("#calendarList");
  if (!list) return;
  list.innerHTML = "";

  const t = STRINGS[lang] || STRINGS.en;

  // Build calendar from:
  // 1) events with startISO in the future (first 6)
  // 2) if none have dates, generate next 4 Thursdays as a fallback "weekly"
  const upcoming = getUpcomingEvents();
  const rows = [];

  upcoming.slice(0, 6).forEach((ev) => {
    rows.push({
      dateLabel: fmtDateTime(ev._start, lang),
      title: getEventTitle(ev, lang),
      where: getEventWhere(ev, lang),
      deadline: ev._deadline ? fmtDateTime(ev._deadline, lang) : "",
      rsvpUrl: safeUrl(ev.partifulUrl),
    });
  });

  if (!rows.length) {
    // Generate next 4 Thursdays, 7pm local (approx)
    const next4 = generateWeeklyDates(4);
    next4.forEach((d) => {
      rows.push({
        dateLabel: `${fmtDate(d, lang)} • 7:00 PM (NYC)`,
        title: lang === "kz" ? "Апталық сөйлесу клубы" : "Weekly Speaking Club",
        where: lang === "kz" ? "Орны чатта" : "Location in chat",
        deadline: "",
        rsvpUrl: "#events",
      });
    });
  }

  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = "calRow";
    row.innerHTML = `
      <div class="calRow__date">${escapeHtml(r.dateLabel)}</div>
      <div class="calRow__main">
        <div class="calRow__title">${escapeHtml(r.title)}</div>
        <div class="calRow__meta">${escapeHtml(r.where)}</div>
        ${r.deadline ? `<div class="tiny">${t.rsvp_deadline} ${escapeHtml(r.deadline)}</div>` : ""}
      </div>
      <div class="calRow__cta">
        <a class="btn btn--primary btn--sm" data-track="calendar_rsvp" href="${r.rsvpUrl || "#events"}" ${r.rsvpUrl && r.rsvpUrl.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>RSVP</a>
      </div>
    `;
    list.appendChild(row);
  });

  bindTrackedLinks(list);
}

function updateNextEventUI(lang) {
  const t = STRINGS[lang] || STRINGS.en;

  const titleEl = $("#nextEventTitle");
  const metaEl = $("#nextEventMeta");
  const btnEl = $("#nextEventBtn");

  const title2 = $("#nextEventTitle2");
  const details2 = $("#nextEventDetails");
  const deadline2 = $("#nextEventDeadline");
  const rsvp2 = $("#nextEventRsvp2");

  const sticky = $("#stickyRsvp");

  const next = getNextEvent();

  // Fallback
  const fallbackTitle = lang === "kz" ? "Апта сайын • NYC" : "Weekly • NYC";
  const fallbackMeta = t.no_upcoming;

  if (!next || !next._start) {
    if (titleEl) titleEl.textContent = fallbackTitle;
    if (metaEl) metaEl.textContent = fallbackMeta;
    if (btnEl) btnEl.href = "#events";

    if (title2) title2.textContent = lang === "kz" ? "Апталық сөйлесу клубы" : "Weekly Speaking Club";
    if (details2) details2.textContent = fallbackMeta;
    if (deadline2) deadline2.textContent = "";
    if (rsvp2) rsvp2.href = "#events";

    if (sticky) sticky.href = "#events";
    updateEventJsonLd(lang);
    return;
  }

  const title = getEventTitle(next, lang);
  const where = getEventWhere(next, lang);
  const when = fmtDateTime(next._start, lang);

  const partiful = safeUrl(next.partifulUrl);
  const hasRSVP = partiful && !isPlaceholderPartiful(partiful);

  // Hero banner
  if (titleEl) titleEl.textContent = title;
  if (metaEl) metaEl.textContent = `${when} • ${where}`;
  if (btnEl) btnEl.href = hasRSVP ? partiful : "#events";
  if (btnEl && hasRSVP) {
    btnEl.target = "_blank";
    btnEl.rel = "noopener";
  }

  // Events panel
  if (title2) title2.textContent = title;
  if (details2) details2.textContent = `${when} • ${where}`;
  if (deadline2) deadline2.textContent = next._deadline ? `${t.rsvp_deadline} ${fmtDateTime(next._deadline, lang)}` : "";
  if (rsvp2) rsvp2.href = hasRSVP ? partiful : "#events";
  if (rsvp2 && hasRSVP) {
    rsvp2.target = "_blank";
    rsvp2.rel = "noopener";
  }

  // Sticky
  if (sticky) sticky.href = hasRSVP ? partiful : "#events";
  if (sticky && hasRSVP) {
    sticky.target = "_blank";
    sticky.rel = "noopener";
  }

  updateEventJsonLd(lang);
}

// ---------- Past Events already covered ----------

// ---------- Weekly phrase rotation ----------
const WEEKLY_PHRASES = [
  { kz: "Сәлем! Қалайсың?", en: "Hi! How are you?", hintEn: "A friendly greeting", hintKz: "Достық сәлемдесу" },
  { kz: "Танысқаныма қуаныштымын.", en: "Nice to meet you.", hintEn: "For introductions", hintKz: "Танысу үшін" },
  { kz: "Бүгінгі тақырып қандай?", en: "What’s today’s topic?", hintEn: "Great for club nights", hintKz: "Клубта айтуға болады" },
];

let phraseIndex = 0;
function renderPhrase(lang) {
  const p = WEEKLY_PHRASES[phraseIndex % WEEKLY_PHRASES.length];
  const phrase = $("#weeklyPhrase");
  const hint = $("#weeklyPhraseHint");
  if (phrase) phrase.textContent = p.kz;
  if (hint) hint.textContent = lang === "kz" ? p.hintKz : p.hintEn;
}
function rotatePhrase(lang) {
  phraseIndex = (phraseIndex + 1) % WEEKLY_PHRASES.length;
  renderPhrase(lang);
}
setInterval(() => rotatePhrase(getLang()), prefersReducedMotion ? 9999999 : 8000);

// ---------- Testimonials carousel ----------
const TESTIMONIALS = [
  { quote_en: "“I finally found a place to practice Kazakh without being shy.”", quote_kz: "“Қазақша практика жасауға ұялмайтын орта таптым.”", who_en: "— Member, NYC", who_kz: "— Қатысушы, NYC" },
  { quote_en: "“Weekly topics keep me consistent. The vibe is so warm.”", quote_kz: "“Апталық тақырыптар көмектеседі. Атмосфера өте жылы.”", who_en: "— Student, NYC", who_kz: "— Студент, NYC" },
  { quote_en: "“Great networking — and my Kazakh improved fast.”", quote_kz: "“Networking керемет — қазақшам тез жақсарды.”", who_en: "— Professional, NYC", who_kz: "— Маман, NYC" },
];

let testIndex = 0;
function renderTestimonial(lang) {
  const q = $("#testimonialQuote");
  const w = $("#testimonialWho");
  const dots = $("#testimonialDots");
  const t = TESTIMONIALS[testIndex % TESTIMONIALS.length];
  if (q) q.textContent = lang === "kz" ? t.quote_kz : t.quote_en;
  if (w) w.textContent = lang === "kz" ? t.who_kz : t.who_en;

  if (dots) {
    dots.innerHTML = "";
    TESTIMONIALS.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "dotTiny" + (i === testIndex ? " is-on" : "");
      dots.appendChild(d);
    });
  }
}
function nextTestimonial(lang) {
  testIndex = (testIndex + 1) % TESTIMONIALS.length;
  renderTestimonial(lang);
}
function prevTestimonial(lang) {
  testIndex = (testIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  renderTestimonial(lang);
}
const btnNext = $("#testNext");
const btnPrev = $("#testPrev");
if (btnNext) btnNext.addEventListener("click", () => nextTestimonial(getLang()));
if (btnPrev) btnPrev.addEventListener("click", () => prevTestimonial(getLang()));
if (!prefersReducedMotion) setInterval(() => nextTestimonial(getLang()), 9000);

// ---------- Notify form (email/phone capture) ----------
const notifyForm = $("#notifyForm");
const notifyMsg = $("#notifyMsg");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function setMsg(text, ok = true) {
  if (!notifyMsg) return;
  notifyMsg.textContent = text;
  notifyMsg.classList.toggle("is-ok", ok);
  notifyMsg.classList.toggle("is-bad", !ok);
}

if (notifyForm) {
  notifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(notifyForm);
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    if (!validateEmail(email)) {
      setMsg(getLang() === "kz" ? "Email дұрыс емес сияқты." : "Please enter a valid email.", false);
      return;
    }

    setMsg(getLang() === "kz" ? "Жіберілуде…" : "Sending…", true);

    // No backend in this template:
    // - By default we store locally (so you can export later)
    // - Optional: connect to a form endpoint (Formspree, Airtable, Google Forms, your own API)
    try {
      const item = {
        email,
        phone,
        pref_lang: fd.get("pref_lang"),
        interest: fd.get("interest"),
        ts: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("qc_notify_leads") || "[]");
      existing.push(item);
      localStorage.setItem("qc_notify_leads", JSON.stringify(existing));

      setMsg(getLang() === "kz" ? "Дайын! Келесі клуб туралы еске саламыз." : "Done! We’ll remind you about the next club.", true);
      notifyForm.reset();
      track("lead_submit", { has_phone: Boolean(phone) });
    } catch (err) {
      setMsg(getLang() === "kz" ? "Қате болды. Қайта көріңіз." : "Something went wrong. Please try again.", false);
    }
  });
}

// ---------- Quiz ----------
const levelQuiz = $("#levelQuiz");
const quizResult = $("#quizResult");

function quizScore(fd) {
  const vals = ["q1", "q2", "q3"].map((k) => Number(fd.get(k) || 0));
  if (vals.some((v) => v <= 0)) return null;
  return vals.reduce((a, b) => a + b, 0);
}

function quizLevel(score) {
  if (score <= 4) return "beginner";
  if (score <= 7) return "intermediate";
  return "advanced";
}

function quizCopy(lang, level) {
  const maps = {
    beginner: {
      en: { title: "Beginner", text: "Join the beginner group — we’ll focus on basics + confidence." },
      kz: { title: "Beginner", text: "Beginner тобы — негіздер және сенімділік." },
    },
    intermediate: {
      en: { title: "Intermediate", text: "Join intermediate — expand vocabulary and speak longer." },
      kz: { title: "Intermediate", text: "Intermediate — сөздік көбейтіп, ұзақ сөйлеу." },
    },
    advanced: {
      en: { title: "Advanced", text: "Join advanced — fast speech, debates, and professional topics." },
      kz: { title: "Advanced", text: "Advanced — жылдам сөйлеу, пікірталас, кәсіби тақырыптар." },
    },
  };
  return maps[level][lang];
}

if (levelQuiz) {
  levelQuiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(levelQuiz);
    const score = quizScore(fd);
    if (score === null) {
      if (quizResult) {
        quizResult.textContent = getLang() === "kz" ? "Барлық сұраққа жауап беріңіз." : "Please answer all questions.";
        quizResult.classList.add("is-bad");
      }
      return;
    }
    const level = quizLevel(score);
    const lang = getLang();
    const copy = quizCopy(lang, level);

    if (quizResult) {
      quizResult.classList.remove("is-bad");
      quizResult.innerHTML = `
        <div class="quizResult__title">${escapeHtml(copy.title)} ✅</div>
        <div class="quizResult__text">${escapeHtml(copy.text)}</div>
        <div class="chipRow" style="margin-top:10px;">
          <a class="btn btn--primary btn--sm" href="#events">${lang === "kz" ? "RSVP жаса" : "RSVP this week"}</a>
          <a class="btn btn--ghost btn--sm" href="https://t.me/+3HtZmf0cFZJlNjM5" target="_blank" rel="noopener">${lang === "kz" ? "Telegram" : "Join Telegram"}</a>
        </div>
      `;
    }

    localStorage.setItem("qc_quiz_level", level);
    track("quiz_complete", { level });
  });
}

// ---------- Copy buttons (resources) ----------
function bindCopyButtons(root = document) {
  root.querySelectorAll(".copyBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy"), 900);
        track("copy_phrase", { text });
      } catch {
        // fallback
        track("copy_phrase_failed", { text });
      }
    });
  });
}

// ---------- Instagram feed ----------
let instagramScriptLoaded = false;
function loadInstagramScript() {
  return new Promise((resolve) => {
    if (instagramScriptLoaded) return resolve();
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = () => {
      instagramScriptLoaded = true;
      resolve();
    };
    document.body.appendChild(s);
  });
}

function renderInstagramEmbeds(permalinks, limit = IG_POST_LIMIT) {
  const host = $("#igLive");
  if (!host) return;

  host.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "igCards";
  host.appendChild(grid);

  permalinks.slice(0, limit).forEach((url) => {
    const u = safeUrl(url);
    if (!u) return;

    const wrap = document.createElement("div");
    wrap.className = "igCardLive";
    wrap.innerHTML = `
      <blockquote
        class="instagram-media"
        data-instgrm-permalink="${u}"
        data-instgrm-version="14"
        style="background:#fff; border:0; margin:0; padding:0; width:100%; border-radius:16px; overflow:hidden;"
      ></blockquote>
    `;
    grid.appendChild(wrap);
  });

  // Process embeds
  if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
}

function renderInstagramCards(posts, limit = IG_POST_LIMIT) {
  const host = $("#igLive");
  if (!host) return;

  host.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "igCards";
  host.appendChild(grid);

  posts.slice(0, limit).forEach((p) => {
    const a = document.createElement("a");
    a.className = "igCardThumb";
    a.href = safeUrl(p.permalink) || IG_PROFILE_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("data-track", "ig_open_post");

    const caption = (p.caption || "").trim();
    const ts = p.timestamp ? new Date(p.timestamp) : null;

    a.innerHTML = `
      <img loading="lazy" alt="Instagram post" src="${escapeAttr(p.media_url || "")}">
      <div class="igCardThumb__overlay">
        <div class="igCardThumb__cap">${escapeHtml(caption.slice(0, 110))}${caption.length > 110 ? "…" : ""}</div>
        <div class="igCardThumb__meta">${ts ? escapeHtml(fmtDate(ts, getLang())) : ""}</div>
      </div>
    `;
    grid.appendChild(a);
  });

  bindTrackedLinks(grid);
}

async function loadLiveInstagram() {
  const loadBtn = $("#igLoadBtn");
  const moreBtn = $("#igMoreBtn");
  if (loadBtn) loadBtn.disabled = true;

  try {
    // Preferred: fast thumbnails/cards from your endpoint
    if (IG_FEED_ENDPOINT) {
      track("ig_feed_load", { mode: "endpoint" });
      const res = await fetch(IG_FEED_ENDPOINT, { cache: "no-store" });
      if (!res.ok) throw new Error("Bad IG endpoint response");
      const json = await res.json();
      const posts = Array.isArray(json.posts) ? json.posts : [];

      if (posts.length && posts[0]?.media_url) {
        renderInstagramCards(posts, IG_POST_LIMIT);
      } else {
        // fallback: list of permalinks
        const links = posts.map((p) => p.permalink).filter(Boolean);
        await loadInstagramScript();
        renderInstagramEmbeds(links, IG_POST_LIMIT);
      }

      if (moreBtn) {
        moreBtn.disabled = posts.length <= IG_POST_LIMIT;
        moreBtn.onclick = () => {
          renderInstagramCards(posts, posts.length);
          moreBtn.disabled = true;
          track("ig_feed_load_more", { count: posts.length });
        };
      }
      return;
    }

    // Fallback: embed.js
    track("ig_feed_load", { mode: "embeds" });
    const links = INSTAGRAM_POSTS.length ? INSTAGRAM_POSTS : [];
    if (!links.length) {
      const host = $("#igLive");
      if (host) host.innerHTML = `<div class="panel"><div class="muted">Add Instagram post URLs in <b>script.js</b> → <b>INSTAGRAM_POSTS</b>.</div></div>`;
      return;
    }
    await loadInstagramScript();
    renderInstagramEmbeds(links, IG_POST_LIMIT);

    if (moreBtn) {
      moreBtn.disabled = links.length <= IG_POST_LIMIT;
      moreBtn.onclick = () => {
        renderInstagramEmbeds(links, links.length);
        moreBtn.disabled = true;
        track("ig_feed_load_more", { count: links.length });
      };
    }
  } catch (err) {
    const host = $("#igLive");
    if (host) host.innerHTML = `<div class="panel"><div class="muted">Couldn’t load Instagram feed. Please try again.</div></div>`;
    track("ig_feed_error", { message: String(err?.message || err) });
  } finally {
    if (loadBtn) loadBtn.disabled = false;
  }
}

const igLoadBtn = $("#igLoadBtn");
if (igLoadBtn) igLoadBtn.addEventListener("click", loadLiveInstagram);

// Lazy-load Instagram feed when section becomes visible (but still user-triggered for speed)
const igPanelLive = $("#igLive");
if (igPanelLive && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          track("ig_section_view");
          io.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  io.observe(igPanelLive);
}

// ---------- Gallery tabs + Instagram posters (existing) ----------
const tabBtns = $$(".tabBtn");
const photoGrid = $("#photoGrid");
const igPanel = $("#igPanel");
const igEmbeds = $("#igEmbeds");

function renderInstagramPosters() {
  if (!igEmbeds) return;
  igEmbeds.innerHTML = "";

  if (!INSTAGRAM_POSTS.length) {
    const empty = document.createElement("div");
    empty.className = "panel";
    empty.innerHTML = `<div class="muted">Add Instagram post URLs in <b>script.js</b> → <b>INSTAGRAM_POSTS</b>.</div>`;
    igEmbeds.appendChild(empty);
    return;
  }

  INSTAGRAM_POSTS.forEach((url) => {
    const u = safeUrl(url);
    if (!u) return;

    const wrap = document.createElement("div");
    wrap.className = "igCard";
    wrap.innerHTML = `
      <blockquote
        class="instagram-media"
        data-instgrm-permalink="${u}"
        data-instgrm-version="14"
        style="background:#fff; border:0; margin:0; padding:0; width:100%; border-radius:16px; overflow:hidden;"
      ></blockquote>
    `;
    igEmbeds.appendChild(wrap);
  });

  if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
}

function setTab(tab) {
  tabBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.tab === tab));

  const isPhotos = tab === "photos";
  if (photoGrid) photoGrid.hidden = !isPhotos;
  if (igPanel) igPanel.hidden = isPhotos;

  if (!isPhotos) {
    loadInstagramScript().then(() => {
      renderInstagramPosters();
      setTimeout(() => window.instgrm?.Embeds?.process && window.instgrm.Embeds.process(), 200);
    });
    track("gallery_tab", { tab: "instagram" });
  } else {
    track("gallery_tab", { tab: "photos" });
  }
}

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

// ---------- Community stats (optional) ----------
async function loadCommunityStats() {
  if (!COMMUNITY_STATS_ENDPOINT) return;
  try {
    const res = await fetch(COMMUNITY_STATS_ENDPOINT, { cache: "no-store" });
    if (!res.ok) throw new Error("Bad stats response");
    const json = await res.json();

    if (typeof json.members === "number") {
      animateNumber("#memberCount", json.members);
      animateNumber("#floatMembers", json.members);
    }

    if (typeof json.telegram === "number") {
      const a = $("#telegramCountA");
      const b = $("#telegramCountB");
      if (a) a.textContent = String(json.telegram);
      if (b) b.textContent = String(json.telegram);
    }

    if (typeof json.whatsapp === "number") {
      const a = $("#whatsappCountA");
      const b = $("#whatsappCountB");
      if (a) a.textContent = String(json.whatsapp);
      if (b) b.textContent = String(json.whatsapp);
    }

    track("community_stats_loaded");
  } catch (e) {
    track("community_stats_error", { message: String(e?.message || e) });
  }
}

// ---------- Sticky RSVP visibility ----------
const sticky = $("#stickyRsvp");
function updateStickyVisibility() {
  if (!sticky) return;
  const y = window.scrollY || 0;
  sticky.classList.toggle("is-show", y > 420);
}
window.addEventListener("scroll", updateStickyVisibility, { passive: true });
updateStickyVisibility();

// ---------- Floating community widget ----------
const chatFloat = $("#chatFloat");
const chatFloatBtn = $("#chatFloatBtn");
const chatFloatPanel = $("#chatFloatPanel");

function setChatFloat(open) {
  if (!chatFloat || !chatFloatBtn || !chatFloatPanel) return;
  chatFloat.classList.toggle("is-open", open);
  chatFloatBtn.setAttribute("aria-expanded", open ? "true" : "false");
  chatFloatPanel.hidden = !open;
  track(open ? "float_open" : "float_close");
}

if (chatFloatBtn && chatFloatPanel) {
  chatFloatBtn.addEventListener("click", () => {
    const open = chatFloatBtn.getAttribute("aria-expanded") === "true";
    setChatFloat(!open);
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!chatFloat) return;
    if (!chatFloat.classList.contains("is-open")) return;
    if (chatFloat.contains(e.target)) return;
    setChatFloat(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setChatFloat(false);
  });

  // Default: keep closed for speed
  setChatFloat(false);

  // Initialize floating member count from the main counter if present
  const main = $("#memberCount");
  const floatM = $("#floatMembers");
  if (main && floatM) floatM.textContent = main.textContent || floatM.textContent;
}

// ---------- Donate button ----------

const donateBtn = $("#donateBtn");
if (donateBtn) {
  if (DONATE_URL) {
    donateBtn.href = safeUrl(DONATE_URL);
    donateBtn.target = "_blank";
    donateBtn.rel = "noopener";
  } else {
    donateBtn.href = "#support";
  }
  donateBtn.setAttribute("data-track", "donate_click");
  bindTrackedLinks(donateBtn);
}

// ---------- Analytics (GA4 optional) ----------
function setupGA4() {
  if (!GA4_MEASUREMENT_ID) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true });
}

function track(eventName, params = {}) {
  try {
    if (window.gtag && GA4_MEASUREMENT_ID) {
      window.gtag("event", eventName, params);
    } else {
      // Dev-friendly logging
      // eslint-disable-next-line no-console
      console.debug("[track]", eventName, params);
    }
  } catch {
    // ignore
  }
}

function bindTrackedLinks(root = document) {
  const nodes = root.querySelectorAll ? root.querySelectorAll("[data-track]") : [];
  nodes.forEach((el) => {
    if (el.__qcTracked) return;
    el.__qcTracked = true;
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-track") || "click";
      track(name, { href: el.getAttribute("href") || "" });
    });
  });
}

function setupSectionViewTracking() {
  const sections = $$("section[id]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) track("section_view", { id: e.target.id });
      });
    },
    { threshold: 0.35 }
  );
  sections.forEach((s) => io.observe(s));
}

function bindGlobalClicks() {
  bindTrackedLinks(document);
  const langBtn = $("#langToggle");
  const langBtnMobile = $("#langToggleMobile");
  if (langBtn) langBtn.setAttribute("data-track", "lang_toggle");
  if (langBtnMobile) langBtnMobile.setAttribute("data-track", "lang_toggle");
  bindTrackedLinks(document);
}

// ---------- Animation helpers ----------
function animateNumber(sel, toValue) {
  const el = typeof sel === "string" ? $(sel) : sel;
  if (!el) return;

  const from = Number(String(el.textContent).replace(/[^\d]/g, "")) || 0;
  const to = Number(toValue) || 0;

  if (prefersReducedMotion) {
    el.textContent = String(to);
    return;
  }

  const start = performance.now();
  const dur = 800;

  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const v = Math.round(from + (to - from) * (t * (2 - t))); // easeOutQuad
    el.textContent = String(v);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---------- Utilities ----------
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  // For attributes like src
  return escapeHtml(str).replace(/`/g, "&#096;");
}

function generateWeeklyDates(n) {
  const dates = [];
  const now = new Date();
  const targetDow = 4; // Thu
  const d = new Date(now);
  d.setHours(19, 0, 0, 0);

  // Move to next target day
  const diff = (targetDow + 7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + diff);

  for (let i = 0; i < n; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

// ---------- Init ----------
setupGA4();
setupSectionViewTracking();
bindGlobalClicks();
bindCopyButtons(document);

const initialLang = getLang();
applyI18n(initialLang);
updateLangLabels(initialLang);
renderEvents(initialLang);
renderPastEvents(initialLang);
renderCalendar(initialLang);
renderPhrase(initialLang);
renderTestimonial(initialLang);
updateNextEventUI(initialLang);
setTab("photos");
loadCommunityStats();
