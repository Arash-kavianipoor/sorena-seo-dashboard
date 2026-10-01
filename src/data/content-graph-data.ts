import { ContentNode, ContentLink, AnchorItem } from '../types/content-graph';

export const INITIAL_NODES: ContentNode[] = [
  // --- CORE HUB (TIER 0) ---
  {
    id: 'node-home',
    url: 'https://sorena-it.com/',
    title: 'سورنا آی‌تی (Sorena IT) - طراحی سایت حرفه‌ای و توسعه وب',
    category: 'core',
    depth: 0,
    wordCount: 2200,
    internalInlinks: 32,
    internalOutlinks: 24,
    pageRank: 10,
    healthScore: 98,
    topKeyword: 'طراحی سایت سورنا آی تی',
    searchVolume: '14.2K',
    status: 'indexed',
    anchorDistribution: {
      branded: 45,
      partial: 28,
      exact: 17,
      semantic: 8,
      generic: 2
    },
    incomingAnchors: [
      {
        id: 'anc-in-1',
        text: 'سورنا آی‌تی',
        type: 'branded',
        placement: 'breadcrumb',
        sourceId: 'node-services-web',
        sourceUrl: 'https://sorena-it.com/services/web-design',
        sourceTitle: 'طراحی سایت اختصاصی',
        targetId: 'node-home',
        targetUrl: 'https://sorena-it.com/',
        pageRankEquity: 2.8,
        sentenceSnippet: 'خانه > خدمات > طراحی سایت اختصاصی در سورنا آی‌تی',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-in-2',
        text: 'شرکت طراحی وب سورنا آی تی',
        type: 'branded',
        placement: 'in-content',
        sourceId: 'node-blog-wp-vs-custom',
        sourceUrl: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
        sourceTitle: 'مقایسه وردپرس با کدنویسی اختصاصی',
        targetId: 'node-home',
        targetUrl: 'https://sorena-it.com/',
        pageRankEquity: 2.4,
        sentenceSnippet: 'برای مشاوره و اجرای پروژه‌های بزرگ با شرکت طراحی وب سورنا آی تی در ارتباط باشید.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-in-3',
        text: 'صفحه اصلی سورنا',
        type: 'generic',
        placement: 'footer',
        sourceId: 'node-contact',
        sourceUrl: 'https://sorena-it.com/contact-us',
        sourceTitle: 'تماس با ما',
        targetId: 'node-home',
        targetUrl: 'https://sorena-it.com/',
        pageRankEquity: 1.9,
        sentenceSnippet: 'بازگشت به صفحه اصلی سورنا آی‌تی از طریق فوتر.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-1',
        text: 'خدمات طراحی سایت اختصاصی',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-services-web',
        targetUrl: 'https://sorena-it.com/services/web-design',
        pageRankEquity: 3.2,
        sentenceSnippet: 'مشاهده لیست کامل خدمات طراحی سایت اختصاصی با فریمورک‌های مدرن Next.js و React.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-out-2',
        text: 'خدمات سئو سایت و بهینه‌سازی در گوگل',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-services-seo',
        targetUrl: 'https://sorena-it.com/services/seo-optimization',
        pageRankEquity: 3.0,
        sentenceSnippet: 'تیم تخصصی ما خدمات سئو سایت و بهینه‌سازی در گوگل را به صورت تضمینی ارائه می‌دهد.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-out-3',
        text: 'مشاهده نمونه کارهای طراحی وب',
        type: 'partial',
        placement: 'nav-header',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-portfolio',
        targetUrl: 'https://sorena-it.com/portfolio',
        pageRankEquity: 2.7,
        sentenceSnippet: 'جهت بررسی پروژه‌های اجرا شده، به بخش مشاهده نمونه کارهای طراحی وب مراجعه فرمایید.',
        followStatus: 'dofollow'
      }
    ]
  },

  // --- PILLAR: SERVICES (TIER 1) ---
  {
    id: 'node-services-web',
    url: 'https://sorena-it.com/services/web-design',
    title: 'طراحی سایت اختصاصی، شرکتی و فروشگاهی (React / Next.js / WordPress)',
    category: 'services',
    depth: 1,
    wordCount: 1950,
    internalInlinks: 22,
    internalOutlinks: 16,
    pageRank: 8.8,
    healthScore: 96,
    topKeyword: 'طراحی سایت اختصاصی',
    searchVolume: '9.6K',
    status: 'indexed',
    anchorDistribution: {
      branded: 20,
      partial: 40,
      exact: 32,
      semantic: 8,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-4',
        text: 'طراحی سایت حرفه‌ای',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-services-web',
        targetUrl: 'https://sorena-it.com/services/web-design',
        pageRankEquity: 3.1,
        sentenceSnippet: 'اجرای استانداردهای بین‌المللی در طراحی سایت حرفه‌ای برای کسب‌وکارهای آنلاین.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-in-5',
        text: 'سفارش ساخت وب‌سایت در سورنا',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-blog-wp-vs-custom',
        sourceUrl: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
        sourceTitle: 'مقایسه وردپرس با اختصاصی',
        targetId: 'node-services-web',
        targetUrl: 'https://sorena-it.com/services/web-design',
        pageRankEquity: 2.2,
        sentenceSnippet: 'جهت برآورد زمان و هزینه، سفارش ساخت وب‌سایت در سورنا را ثبت کنید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-4',
        text: 'سئو تکنیکال و افزایش سرعت سایت',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-services-web',
        sourceUrl: 'https://sorena-it.com/services/web-design',
        sourceTitle: 'طراحی سایت اختصاصی',
        targetId: 'node-services-seo',
        targetUrl: 'https://sorena-it.com/services/seo-optimization',
        pageRankEquity: 2.6,
        sentenceSnippet: 'کلیه سایت‌های طراحی‌شده همراه با سئو تکنیکال و افزایش سرعت سایت تحویل داده می‌شوند.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-out-5',
        text: 'طراحی فروشگاه اینترنتی با پرداخت آنلاین',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-services-web',
        sourceUrl: 'https://sorena-it.com/services/web-design',
        sourceTitle: 'طراحی سایت اختصاصی',
        targetId: 'node-sol-ecommerce',
        targetUrl: 'https://sorena-it.com/solutions/ecommerce-design',
        pageRankEquity: 2.5,
        sentenceSnippet: 'برای فروش کالاها از پکیج طراحی فروشگاه اینترنتی با پرداخت آنلاین بهره ببرید.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-services-seo',
    url: 'https://sorena-it.com/services/seo-optimization',
    title: 'خدمات سئو سایت، سئو تکنیکال و ربات بهینه‌ساز هوشمند سورنا',
    category: 'services',
    depth: 1,
    wordCount: 1820,
    internalInlinks: 20,
    internalOutlinks: 14,
    pageRank: 8.5,
    healthScore: 95,
    topKeyword: 'خدمات سئو سایت در گوگل',
    searchVolume: '8.4K',
    status: 'indexed',
    anchorDistribution: {
      branded: 25,
      partial: 35,
      exact: 30,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-6',
        text: 'بهینه‌سازی و سئو سایت در گوگل',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-services-seo',
        targetUrl: 'https://sorena-it.com/services/seo-optimization',
        pageRankEquity: 2.9,
        sentenceSnippet: 'با استراتژی‌های بهینه‌سازی و سئو سایت در گوگل جایگاه رتبه ۱ را تسخیر کنید.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-in-7',
        text: 'ربات سئو و تحلیل Search Console',
        type: 'semantic',
        placement: 'in-content',
        sourceId: 'node-blog-ai-search-console',
        sourceUrl: 'https://sorena-it.com/blog/ai-search-console-optimization',
        sourceTitle: 'آنالیز سرچ کنسول با هوش مصنوعی',
        targetId: 'node-services-seo',
        targetUrl: 'https://sorena-it.com/services/seo-optimization',
        pageRankEquity: 2.1,
        sentenceSnippet: 'سورنا آی‌تی با ابزار ربات سئو و تحلیل Search Console همواره عملکرد را رصد می‌کند.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-6',
        text: 'آموزش گام به گام سئو تکنیکال',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-services-seo',
        sourceUrl: 'https://sorena-it.com/services/seo-optimization',
        sourceTitle: 'خدمات سئو',
        targetId: 'node-blog-tech-seo',
        targetUrl: 'https://sorena-it.com/blog/technical-seo-guide',
        pageRankEquity: 2.3,
        sentenceSnippet: 'مطالعه آموزش گام به گام سئو تکنیکال به مدیران وب‌سایت توصیه می‌گردد.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-services-plugins',
    url: 'https://sorena-it.com/services/wordpress-plugin-development',
    title: 'برنامه‌نویسی و توسعه افزونه‌های اختصاصی وردپرس (WordPress Plugin)',
    category: 'services',
    depth: 2,
    wordCount: 1650,
    internalInlinks: 14,
    internalOutlinks: 9,
    pageRank: 7.6,
    healthScore: 93,
    topKeyword: 'توسعه افزونه اختصاصی وردپرس',
    searchVolume: '4.7K',
    status: 'indexed',
    anchorDistribution: {
      branded: 15,
      partial: 45,
      exact: 30,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-8',
        text: 'ساخت پلاگین اختصاصی وردپرس',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-services-web',
        sourceUrl: 'https://sorena-it.com/services/web-design',
        sourceTitle: 'طراحی سایت اختصاصی',
        targetId: 'node-services-plugins',
        targetUrl: 'https://sorena-it.com/services/wordpress-plugin-development',
        pageRankEquity: 2.4,
        sentenceSnippet: 'امکانات خاص خود را با ساخت پلاگین اختصاصی وردپرس پیاده‌سازی نمایید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-7',
        text: 'پشتیبانی فنی و تیکتینگ سورنا',
        type: 'partial',
        placement: 'footer',
        sourceId: 'node-services-plugins',
        sourceUrl: 'https://sorena-it.com/services/wordpress-plugin-development',
        sourceTitle: 'توسعه افزونه',
        targetId: 'node-services-support',
        targetUrl: 'https://sorena-it.com/services/it-support',
        pageRankEquity: 1.8,
        sentenceSnippet: 'کلیه پلاگین‌ها دارای یک سال پشتیبانی فنی و تیکتینگ سورنا آی تی هستند.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-services-support',
    url: 'https://sorena-it.com/services/it-support',
    title: 'پشتیبانی فنی ۲۴ ساعته سایت و سیستم تیکتینگ مشتریان',
    category: 'services',
    depth: 1,
    wordCount: 1300,
    internalInlinks: 16,
    internalOutlinks: 8,
    pageRank: 7.9,
    healthScore: 94,
    topKeyword: 'پشتیبانی فنی سایت و هاست',
    searchVolume: '3.9K',
    status: 'indexed',
    anchorDistribution: {
      branded: 30,
      partial: 40,
      exact: 20,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-9',
        text: 'سیستم تیکت و پشتیبانی وب‌سایت',
        type: 'exact',
        placement: 'nav-header',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-services-support',
        targetUrl: 'https://sorena-it.com/services/it-support',
        pageRankEquity: 2.5,
        sentenceSnippet: 'ارسال درخواست رفع باگ از طریق سیستم تیکت و پشتیبانی وب‌سایت سورنا.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-8',
        text: 'ارسال تیکت فوری در پرتال',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-services-support',
        sourceUrl: 'https://sorena-it.com/services/it-support',
        sourceTitle: 'پشتیبانی',
        targetId: 'node-ticket',
        targetUrl: 'https://sorena-it.com/ticket-system',
        pageRankEquity: 2.1,
        sentenceSnippet: 'برای ثبت باگ، وارد بخش ارسال تیکت فوری در پرتال پشتیبانی شوید.',
        followStatus: 'dofollow'
      }
    ]
  },

  // --- PILLAR: PORTFOLIO & SOLUTIONS (TIER 1 & 2) ---
  {
    id: 'node-portfolio',
    url: 'https://sorena-it.com/portfolio',
    title: 'نمونه‌کارها و پروژه‌های اجرا شده طراحی سایت و برنامه‌نویسی',
    category: 'solutions',
    depth: 1,
    wordCount: 1550,
    internalInlinks: 18,
    internalOutlinks: 12,
    pageRank: 8.2,
    healthScore: 95,
    topKeyword: 'نمونه کار طراحی وب سایت سورنا',
    searchVolume: '5.1K',
    status: 'indexed',
    anchorDistribution: {
      branded: 35,
      partial: 35,
      exact: 25,
      semantic: 5,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-10',
        text: 'پروژه‌های طراحی وب سورنا آی تی',
        type: 'branded',
        placement: 'in-content',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-portfolio',
        targetUrl: 'https://sorena-it.com/portfolio',
        pageRankEquity: 2.7,
        sentenceSnippet: 'کیفیت رابط کاربری را در پروژه‌های طراحی وب سورنا آی تی مشاهده نمایید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-9',
        text: 'طراحی پورتال‌های شرکتی و اداری',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-portfolio',
        sourceUrl: 'https://sorena-it.com/portfolio',
        sourceTitle: 'نمونه کارها',
        targetId: 'node-sol-corporate',
        targetUrl: 'https://sorena-it.com/solutions/corporate-website',
        pageRankEquity: 2.2,
        sentenceSnippet: 'بخش ویژه به طراحی پورتال‌های شرکتی و اداری معتبر اختصاص یافته است.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-sol-ecommerce',
    url: 'https://sorena-it.com/solutions/ecommerce-design',
    title: 'طراحی سایت فروشگاهی با درگاه پرداخت آنلاین و انبارداری',
    category: 'solutions',
    depth: 2,
    wordCount: 2150,
    internalInlinks: 13,
    internalOutlinks: 8,
    pageRank: 7.5,
    healthScore: 92,
    topKeyword: 'طراحی سایت فروشگاهی حرفه ای',
    searchVolume: '7.8K',
    status: 'indexed',
    anchorDistribution: {
      branded: 15,
      partial: 45,
      exact: 35,
      semantic: 5,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-11',
        text: 'طراحی فروشگاه اینترنتی',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-services-web',
        sourceUrl: 'https://sorena-it.com/services/web-design',
        sourceTitle: 'طراحی سایت',
        targetId: 'node-sol-ecommerce',
        targetUrl: 'https://sorena-it.com/solutions/ecommerce-design',
        pageRankEquity: 2.4,
        sentenceSnippet: 'مزایای فروش آنلاین با طراحی فروشگاه اینترنتی مجهز به فاکتور خودکار.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-10',
        text: 'سفارش آنلاین و محاسبه قیمت طراحی سایت',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-sol-ecommerce',
        sourceUrl: 'https://sorena-it.com/solutions/ecommerce-design',
        sourceTitle: 'فروشگاهی',
        targetId: 'node-order',
        targetUrl: 'https://sorena-it.com/order-website',
        pageRankEquity: 2.0,
        sentenceSnippet: 'جهت انتخاب پکیج به بخش سفارش آنلاین و محاسبه قیمت طراحی سایت مراجعه کنید.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-sol-corporate',
    url: 'https://sorena-it.com/solutions/corporate-website',
    title: 'طراحی سایت شرکتی و سازمانی با امنیت بالا و سئوی پایدار',
    category: 'solutions',
    depth: 2,
    wordCount: 1780,
    internalInlinks: 11,
    internalOutlinks: 7,
    pageRank: 7.3,
    healthScore: 91,
    topKeyword: 'طراحی سایت شرکتی و سازمانی',
    searchVolume: '4.9K',
    status: 'indexed',
    anchorDistribution: {
      branded: 20,
      partial: 40,
      exact: 30,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-12',
        text: 'سایت‌های شرکتی و هلدینگ',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-portfolio',
        sourceUrl: 'https://sorena-it.com/portfolio',
        sourceTitle: 'نمونه کارها',
        targetId: 'node-sol-corporate',
        targetUrl: 'https://sorena-it.com/solutions/corporate-website',
        pageRankEquity: 2.1,
        sentenceSnippet: 'معرفی ویژگی‌های سایت‌های شرکتی و هلدینگ با سیستم چندزبانه.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: []
  },

  // --- PILLAR: BLOG & ARTICLES (TIER 1 & 2) ---
  {
    id: 'node-blog',
    url: 'https://sorena-it.com/blog',
    title: 'وبلاگ تخصصی و مقالات آموزشی طراحی وب و سئو سورنا آی‌تی',
    category: 'blog',
    depth: 1,
    wordCount: 1600,
    internalInlinks: 21,
    internalOutlinks: 18,
    pageRank: 8.6,
    healthScore: 96,
    topKeyword: 'مقالات آموزش سئو و طراحی وب',
    searchVolume: '6.7K',
    status: 'indexed',
    anchorDistribution: {
      branded: 25,
      partial: 35,
      exact: 30,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-13',
        text: 'وبلاگ و مقالات آموزشی سورنا آی تی',
        type: 'branded',
        placement: 'nav-header',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-blog',
        targetUrl: 'https://sorena-it.com/blog',
        pageRankEquity: 2.8,
        sentenceSnippet: 'آخرین تجربیات و ترفندهای دنیای وب را در وبلاگ و مقالات آموزشی سورنا آی تی بخوانید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-11',
        text: 'چک‌لیست تخصصی سئو تکنیکال',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-blog',
        sourceUrl: 'https://sorena-it.com/blog',
        sourceTitle: 'وبلاگ',
        targetId: 'node-blog-tech-seo',
        targetUrl: 'https://sorena-it.com/blog/technical-seo-guide',
        pageRankEquity: 2.5,
        sentenceSnippet: 'در این پست چک‌لیست تخصصی سئو تکنیکال برای بهبود سلامت سایت ارائه شده است.',
        followStatus: 'dofollow'
      },
      {
        id: 'anc-out-12',
        text: 'بررسی تفاوت وردپرس و سایت اختصاصی',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-blog',
        sourceUrl: 'https://sorena-it.com/blog',
        sourceTitle: 'وبلاگ',
        targetId: 'node-blog-wp-vs-custom',
        targetUrl: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
        pageRankEquity: 2.4,
        sentenceSnippet: 'پاسخ به سوال کارفرمایان در بررسی تفاوت وردپرس و سایت اختصاصی.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-blog-tech-seo',
    url: 'https://sorena-it.com/blog/technical-seo-guide',
    title: 'راهنمای جامع سئو تکنیکال، رفع ارورهای کرول و ارتقای Core Web Vitals',
    category: 'blog',
    depth: 2,
    wordCount: 3100,
    internalInlinks: 15,
    internalOutlinks: 9,
    pageRank: 7.8,
    healthScore: 97,
    topKeyword: 'سئو تکنیکال چیست',
    searchVolume: '12.4K',
    status: 'indexed',
    anchorDistribution: {
      branded: 10,
      partial: 45,
      exact: 35,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-14',
        text: 'آموزش بهینه‌سازی سئو تکنیکال',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-blog',
        sourceUrl: 'https://sorena-it.com/blog',
        sourceTitle: 'وبلاگ',
        targetId: 'node-blog-tech-seo',
        targetUrl: 'https://sorena-it.com/blog/technical-seo-guide',
        pageRankEquity: 2.5,
        sentenceSnippet: 'برای ارتقای سرعت سایت مقاله آموزش بهینه‌سازی سئو تکنیکال را مطالعه کنید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-13',
        text: 'سفارش سئو سایت در سورنا آی تی',
        type: 'branded',
        placement: 'in-content',
        sourceId: 'node-blog-tech-seo',
        sourceUrl: 'https://sorena-it.com/blog/technical-seo-guide',
        sourceTitle: 'سئو تکنیکال',
        targetId: 'node-services-seo',
        targetUrl: 'https://sorena-it.com/services/seo-optimization',
        pageRankEquity: 2.3,
        sentenceSnippet: 'برای واگذاری فرآیند ممیزی به متخصصان، سفارش سئو سایت در سورنا آی تی را ثبت کنید.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-blog-wp-vs-custom',
    url: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
    title: 'مقایسه جامع سایت وردپرسی یا کدنویسی اختصاصی (React و Laravel)',
    category: 'blog',
    depth: 2,
    wordCount: 2650,
    internalInlinks: 13,
    internalOutlinks: 8,
    pageRank: 7.4,
    healthScore: 94,
    topKeyword: 'طراحی سایت وردپرس یا کدنویسی اختصاصی',
    searchVolume: '8.1K',
    status: 'indexed',
    anchorDistribution: {
      branded: 20,
      partial: 40,
      exact: 30,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-15',
        text: 'مقایسه وردپرس و کدنویسی',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-blog',
        sourceUrl: 'https://sorena-it.com/blog',
        sourceTitle: 'وبلاگ',
        targetId: 'node-blog-wp-vs-custom',
        targetUrl: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
        pageRankEquity: 2.2,
        sentenceSnippet: 'نکات کلیدی پیرامون مقایسه وردپرس و کدنویسی برای بیزینس‌های مقیاس‌پذیر.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-14',
        text: 'طراحی سایت اختصاصی سورنا',
        type: 'branded',
        placement: 'in-content',
        sourceId: 'node-blog-wp-vs-custom',
        sourceUrl: 'https://sorena-it.com/blog/wordpress-vs-custom-code',
        sourceTitle: 'وردپرس یا کدنویسی',
        targetId: 'node-services-web',
        targetUrl: 'https://sorena-it.com/services/web-design',
        pageRankEquity: 2.1,
        sentenceSnippet: 'کدنویسی تمیز در خدمات طراحی سایت اختصاصی سورنا آی‌تی بالاترین امنیت را دارد.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-blog-ai-search-console',
    url: 'https://sorena-it.com/blog/ai-search-console-optimization',
    title: 'اتوماسیون تحلیل گوگل سرچ کنسول و تشخیص کنیبالیزیشن کلمات کلیدی',
    category: 'blog',
    depth: 2,
    wordCount: 2400,
    internalInlinks: 10,
    internalOutlinks: 6,
    pageRank: 7.1,
    healthScore: 92,
    topKeyword: 'حل کنیبالیزیشن در سرچ کنسول',
    searchVolume: '3.8K',
    status: 'indexed',
    anchorDistribution: {
      branded: 15,
      partial: 50,
      exact: 25,
      semantic: 10,
      generic: 0
    },
    incomingAnchors: [
      {
        id: 'anc-in-16',
        text: 'رفع مشکل Cannibalization با هوش مصنوعی',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-services-seo',
        sourceUrl: 'https://sorena-it.com/services/seo-optimization',
        sourceTitle: 'خدمات سئو',
        targetId: 'node-blog-ai-search-console',
        targetUrl: 'https://sorena-it.com/blog/ai-search-console-optimization',
        pageRankEquity: 2.0,
        sentenceSnippet: 'بررسی راهکارهای رفع مشکل Cannibalization با هوش مصنوعی در مقالات سئو.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: []
  },

  // --- PILLAR: CONVERSION & CONTACT (TIER 1 & 2) ---
  {
    id: 'node-order',
    url: 'https://sorena-it.com/order-website',
    title: 'سفارش آنلاین پروژه طراحی سایت و استعلام فوری هزینه',
    category: 'docs',
    depth: 1,
    wordCount: 1100,
    internalInlinks: 15,
    internalOutlinks: 6,
    pageRank: 7.7,
    healthScore: 93,
    topKeyword: 'هزینه و قیمت طراحی سایت',
    searchVolume: '11.5K',
    status: 'indexed',
    anchorDistribution: {
      branded: 25,
      partial: 40,
      exact: 25,
      semantic: 5,
      generic: 5
    },
    incomingAnchors: [
      {
        id: 'anc-in-17',
        text: 'استعلام قیمت و سفارش طراحی وب‌سایت',
        type: 'exact',
        placement: 'nav-header',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-order',
        targetUrl: 'https://sorena-it.com/order-website',
        pageRankEquity: 2.6,
        sentenceSnippet: 'از طریق فرم استعلام قیمت و سفارش طراحی وب‌سایت، پیش‌فاکتور خود را دریافت کنید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: [
      {
        id: 'anc-out-15',
        text: 'تماس با کارشناسان سورنا',
        type: 'partial',
        placement: 'in-content',
        sourceId: 'node-order',
        sourceUrl: 'https://sorena-it.com/order-website',
        sourceTitle: 'سفارش آنلاین',
        targetId: 'node-contact',
        targetUrl: 'https://sorena-it.com/contact-us',
        pageRankEquity: 1.9,
        sentenceSnippet: 'در صورت نیاز به مشاوره تلفنی، به صفحه تماس با کارشناسان سورنا آی تی مراجعه کنید.',
        followStatus: 'dofollow'
      }
    ]
  },

  {
    id: 'node-contact',
    url: 'https://sorena-it.com/contact-us',
    title: 'تماس با ما - مشاوره رایگان طراحی سایت، سئو و توسعه وب در سورنا',
    category: 'docs',
    depth: 1,
    wordCount: 890,
    internalInlinks: 17,
    internalOutlinks: 7,
    pageRank: 7.5,
    healthScore: 95,
    topKeyword: 'تماس با شرکت طراحی سایت سورنا',
    searchVolume: '2.9K',
    status: 'indexed',
    anchorDistribution: {
      branded: 40,
      partial: 30,
      exact: 20,
      semantic: 5,
      generic: 5
    },
    incomingAnchors: [
      {
        id: 'anc-in-18',
        text: 'تماس با سورنا آی‌تی',
        type: 'branded',
        placement: 'footer',
        sourceId: 'node-home',
        sourceUrl: 'https://sorena-it.com/',
        sourceTitle: 'صفحه اصلی',
        targetId: 'node-contact',
        targetUrl: 'https://sorena-it.com/contact-us',
        pageRankEquity: 2.2,
        sentenceSnippet: 'ارتباط مستقیم با دفتر شرکت از بخش تماس با سورنا آی‌تی در فوتر.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: []
  },

  {
    id: 'node-ticket',
    url: 'https://sorena-it.com/ticket-system',
    title: 'پرتال تیکتینگ و پیگیری پروژه‌های فنی مشتریان سورنا آی‌تی',
    category: 'docs',
    depth: 2,
    wordCount: 750,
    internalInlinks: 12,
    internalOutlinks: 5,
    pageRank: 6.9,
    healthScore: 92,
    topKeyword: 'پرتال تیکت پشتیبانی سورنا',
    searchVolume: '1.4K',
    status: 'indexed',
    anchorDistribution: {
      branded: 40,
      partial: 35,
      exact: 15,
      semantic: 5,
      generic: 5
    },
    incomingAnchors: [
      {
        id: 'anc-in-19',
        text: 'ورود به پرتال تیکت مشتریان',
        type: 'exact',
        placement: 'in-content',
        sourceId: 'node-services-support',
        sourceUrl: 'https://sorena-it.com/services/it-support',
        sourceTitle: 'پشتیبانی',
        targetId: 'node-ticket',
        targetUrl: 'https://sorena-it.com/ticket-system',
        pageRankEquity: 2.1,
        sentenceSnippet: 'جهت پیگیری مراحل پروژه به صفحه ورود به پرتال تیکت مشتریان مراجعه کنید.',
        followStatus: 'dofollow'
      }
    ],
    outgoingAnchors: []
  },

  // --- ORPHAN / DISCONNECTED PAGES (TIER 3) ---
  {
    id: 'node-orphan-legacy',
    url: 'https://sorena-it.com/archives/old-php-script-2020',
    title: 'دانلود اسکریپت قدیمی مدیریت فایل PHP (محتوای بدون لینک ورودی)',
    category: 'orphan',
    depth: 3,
    wordCount: 520,
    internalInlinks: 0,
    internalOutlinks: 1,
    pageRank: 1.1,
    healthScore: 28,
    topKeyword: 'php file manager script 2020',
    searchVolume: '90',
    status: 'orphan_warning',
    anchorDistribution: {
      branded: 0,
      partial: 0,
      exact: 0,
      semantic: 0,
      generic: 0
    },
    anchorHealthAlert: 'صفحه یتیم واقعی (0 پیوند ورودی): هیچ صفحه داخلی در دامنه sorena-it.com به این URL لینک نداده است و از دید ربات‌های گوگل پنهان مانده است.',
    incomingAnchors: [],
    outgoingAnchors: [
      {
        id: 'anc-out-16',
        text: 'اینجا کلیک کنید',
        type: 'generic',
        placement: 'in-content',
        sourceId: 'node-orphan-legacy',
        sourceUrl: 'https://sorena-it.com/archives/old-php-script-2020',
        sourceTitle: 'اسکریپت قدیمی',
        targetId: 'node-orphan-unlinked',
        targetUrl: 'https://sorena-it.com/temp/demo-landing-draft',
        pageRankEquity: 0.2,
        sentenceSnippet: 'برای دانلود پیش‌نویس موقت اینجا کلیک کنید.',
        followStatus: 'nofollow'
      }
    ]
  },

  {
    id: 'node-orphan-unlinked',
    url: 'https://sorena-it.com/temp/demo-landing-draft',
    title: 'لندینگ پیش‌نویس تست امکانات فرم (لینک‌سازی ضعیف)',
    category: 'orphan',
    depth: 3,
    wordCount: 340,
    internalInlinks: 1,
    internalOutlinks: 0,
    pageRank: 1.5,
    healthScore: 35,
    topKeyword: 'unranked demo',
    searchVolume: '0',
    status: 'needs_update',
    anchorDistribution: {
      branded: 0,
      partial: 0,
      exact: 0,
      semantic: 0,
      generic: 100
    },
    anchorHealthAlert: 'تنها یک انکرتکست نامناسب ("اینجا کلیک کنید") به این صفحه متصل است که فاقد ارزش سئو می‌باشد.',
    incomingAnchors: [
      {
        id: 'anc-in-20',
        text: 'اینجا کلیک کنید',
        type: 'generic',
        placement: 'in-content',
        sourceId: 'node-orphan-legacy',
        sourceUrl: 'https://sorena-it.com/archives/old-php-script-2020',
        sourceTitle: 'اسکریپت قدیمی',
        targetId: 'node-orphan-unlinked',
        targetUrl: 'https://sorena-it.com/temp/demo-landing-draft',
        pageRankEquity: 0.2,
        sentenceSnippet: 'برای دانلود پیش‌نویس موقت اینجا کلیک کنید.',
        followStatus: 'nofollow'
      }
    ],
    outgoingAnchors: []
  }
];

export const INITIAL_LINKS: ContentLink[] = [
  // Core to Pillars
  {
    id: 'link-1',
    source: 'node-home',
    target: 'node-services-web',
    type: 'hierarchical',
    weight: 3.2,
    primaryAnchor: 'خدمات طراحی سایت اختصاصی',
    anchorType: 'exact',
    equityTransfer: 3.2
  },
  {
    id: 'link-2',
    source: 'node-home',
    target: 'node-services-seo',
    type: 'hierarchical',
    weight: 3.0,
    primaryAnchor: 'خدمات سئو سایت و بهینه‌سازی در گوگل',
    anchorType: 'exact',
    equityTransfer: 3.0
  },
  {
    id: 'link-3',
    source: 'node-home',
    target: 'node-portfolio',
    type: 'hierarchical',
    weight: 2.7,
    primaryAnchor: 'مشاهده نمونه کارهای طراحی وب',
    anchorType: 'partial',
    equityTransfer: 2.7
  },
  {
    id: 'link-4',
    source: 'node-home',
    target: 'node-blog',
    type: 'hierarchical',
    weight: 2.8,
    primaryAnchor: 'وبلاگ و مقالات آموزشی سورنا آی تی',
    anchorType: 'branded',
    equityTransfer: 2.8
  },
  {
    id: 'link-5',
    source: 'node-home',
    target: 'node-order',
    type: 'hierarchical',
    weight: 2.6,
    primaryAnchor: 'استعلام قیمت و سفارش طراحی وب‌سایت',
    anchorType: 'exact',
    equityTransfer: 2.6
  },
  {
    id: 'link-6',
    source: 'node-home',
    target: 'node-contact',
    type: 'hierarchical',
    weight: 2.2,
    primaryAnchor: 'تماس با سورنا آی‌تی',
    anchorType: 'branded',
    equityTransfer: 2.2
  },

  // Services cluster
  {
    id: 'link-7',
    source: 'node-services-web',
    target: 'node-services-plugins',
    type: 'hierarchical',
    weight: 2.4,
    primaryAnchor: 'ساخت پلاگین اختصاصی وردپرس',
    anchorType: 'exact',
    equityTransfer: 2.4
  },
  {
    id: 'link-8',
    source: 'node-services-web',
    target: 'node-sol-ecommerce',
    type: 'contextual',
    weight: 2.5,
    primaryAnchor: 'طراحی فروشگاه اینترنتی با پرداخت آنلاین',
    anchorType: 'exact',
    equityTransfer: 2.5
  },
  {
    id: 'link-9',
    source: 'node-services-web',
    target: 'node-services-seo',
    type: 'contextual',
    weight: 2.6,
    primaryAnchor: 'سئو تکنیکال و افزایش سرعت سایت',
    anchorType: 'partial',
    equityTransfer: 2.6
  },
  {
    id: 'link-10',
    source: 'node-services-plugins',
    target: 'node-services-support',
    type: 'contextual',
    weight: 1.8,
    primaryAnchor: 'پشتیبانی فنی و تیکتینگ سورنا',
    anchorType: 'partial',
    equityTransfer: 1.8
  },
  {
    id: 'link-11',
    source: 'node-services-support',
    target: 'node-ticket',
    type: 'hierarchical',
    weight: 2.1,
    primaryAnchor: 'ارسال تیکت فوری در پرتال',
    anchorType: 'partial',
    equityTransfer: 2.1
  },

  // Portfolio to Corporate
  {
    id: 'link-12',
    source: 'node-portfolio',
    target: 'node-sol-corporate',
    type: 'hierarchical',
    weight: 2.2,
    primaryAnchor: 'طراحی پورتال‌های شرکتی و اداری',
    anchorType: 'exact',
    equityTransfer: 2.2
  },

  // Blog cluster
  {
    id: 'link-13',
    source: 'node-blog',
    target: 'node-blog-tech-seo',
    type: 'hierarchical',
    weight: 2.5,
    primaryAnchor: 'چک‌لیست تخصصی سئو تکنیکال',
    anchorType: 'exact',
    equityTransfer: 2.5
  },
  {
    id: 'link-14',
    source: 'node-blog',
    target: 'node-blog-wp-vs-custom',
    type: 'hierarchical',
    weight: 2.4,
    primaryAnchor: 'بررسی تفاوت وردپرس و سایت اختصاصی',
    anchorType: 'partial',
    equityTransfer: 2.4
  },
  {
    id: 'link-15',
    source: 'node-services-seo',
    target: 'node-blog-ai-search-console',
    type: 'contextual',
    weight: 2.0,
    primaryAnchor: 'رفع مشکل Cannibalization با هوش مصنوعی',
    anchorType: 'exact',
    equityTransfer: 2.0
  },
  {
    id: 'link-16',
    source: 'node-blog-tech-seo',
    target: 'node-services-seo',
    type: 'contextual',
    weight: 2.3,
    primaryAnchor: 'سفارش سئو سایت در سورنا آی تی',
    anchorType: 'branded',
    equityTransfer: 2.3
  },
  {
    id: 'link-17',
    source: 'node-blog-wp-vs-custom',
    target: 'node-home',
    type: 'contextual',
    weight: 2.4,
    primaryAnchor: 'شرکت طراحی وب سورنا آی تی',
    anchorType: 'branded',
    equityTransfer: 2.4
  },

  // Conversion links
  {
    id: 'link-18',
    source: 'node-order',
    target: 'node-contact',
    type: 'contextual',
    weight: 1.9,
    primaryAnchor: 'تماس با کارشناسان سورنا',
    anchorType: 'partial',
    equityTransfer: 1.9
  },

  // Weak/Orphan link
  {
    id: 'link-19',
    source: 'node-orphan-legacy',
    target: 'node-orphan-unlinked',
    type: 'contextual',
    weight: 0.2,
    primaryAnchor: 'اینجا کلیک کنید',
    anchorType: 'generic',
    equityTransfer: 0.2
  }
];
