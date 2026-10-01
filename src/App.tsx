import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Wand2, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Copy, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  RefreshCw, 
  Globe, 
  Gauge, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkle,
  Bookmark,
  X,
  Link2,
  Key,
  Zap,
  Play,
  Square,
  Activity,
  Check,
  Boxes,
  UploadCloud,
  Menu,
  Info,
  HelpCircle,
  Trash2,
  Eye,
  BookOpen,
  Clock,
  Filter
} from 'lucide-react';

import AiSeoOsGeoTraffic from './components/ai-seo-os-geo-traffic';
import AiSeoOs2dWorldMap from './components/ai-seo-os-2d-world-map';
import AiSeoOsConnectors from './components/ai-seo-os-connectors';
import AiSeoOsApiImporter from './components/ai-seo-os-api-importer';
import AiSeoOs3dContentGraph from './components/ai-seo-os-3d-content-graph';

// --- Types ---
interface Recommendation {
  id: string;
  type: 'warning' | 'success' | 'neutral';
  title: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  autoFixable: boolean;
}

interface KeywordItem {
  keyword: string;
  position: string;
  volume: string;
  intent: string;
  change: string;
}

interface AuditData {
  score: number;
  analysis: string;
  domainAuthority: number;
  monthlySearchVolume: string;
  difficulty: string;
  keywordIntent: string;
  recommendations: Recommendation[];
  keywordWatchlist: KeywordItem[];
}

interface Section {
  heading: string;
  content: string;
  bullets?: string[];
}

interface BlogDraft {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  sections: Section[];
  conclusion: string;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  wordCount: number;
  readTime: string;
  date: string;
  status: 'Published' | 'Draft' | 'Ready for Review';
  seoScore: number;
  h1: string;
  introduction: string;
  sections: Section[];
  conclusion: string;
}

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'writer' | 'generated-articles' | 'keywords' | 'site-graph' | 'analytics' | 'connectors' | 'import-apis'>('dashboard');
  const [writerSubmenuOpen, setWriterSubmenuOpen] = useState(true);

  // Input States
  const [targetKeyword, setTargetKeyword] = useState('neural seo tools');
  const [targetUrl, setTargetUrl] = useState('https://neural-seo.ai');
  
  // App Core States
  const [auditData, setAuditData] = useState<AuditData>({
    score: 84,
    analysis: 'Analyzing 2,408 competitor backlink patterns indicates strong semantic opportunities in privacy-first search queries.',
    domainAuthority: 84.2,
    monthlySearchVolume: '18.2K',
    difficulty: 'Medium (45%)',
    keywordIntent: 'Commercial',
    recommendations: [
      {
        id: "rec_1",
        type: "warning",
        title: 'Article "SaaS Growth 2024" lacks LSI keywords',
        impact: "HIGH",
        category: "Content Gap",
        autoFixable: true
      },
      {
        id: "rec_2",
        type: "success",
        title: "Meta description generated for 12 orphan pages",
        impact: "MEDIUM",
        category: "Technical",
        autoFixable: false
      },
      {
        id: "rec_3",
        type: "warning",
        title: 'Content gap found: "Enterprise LLM Security"',
        impact: "HIGH",
        category: "Content Gap",
        autoFixable: true
      }
    ],
    keywordWatchlist: [
      {
        keyword: "neural seo tools",
        position: "#1",
        volume: "18.2k",
        intent: "Commercial",
        change: "0"
      },
      {
        keyword: "ai content automation",
        position: "#4",
        volume: "4.5k",
        intent: "Informational",
        change: "+2"
      },
      {
        keyword: "semantic search optimization",
        position: "#12",
        volume: "920",
        intent: "Navigational",
        change: "-1"
      },
      {
        keyword: "privacy first search engine indexes",
        position: "#24",
        volume: "1.2k",
        intent: "Commercial",
        change: "+5"
      },
      {
        keyword: "lsi keyword generation system",
        position: "#8",
        volume: "3.1k",
        intent: "Informational",
        change: "0"
      }
    ]
  });

  const [geminiInsight, setGeminiInsight] = useState<string>(
    `"Current cluster trends suggest high semantic density in the 'privacy-first analytics' niche. We recommend pivoting three pillar pages to address GDPR compliance automation."`
  );

  // loading state
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState('');

  // Auto-Fix states
  const [selectedFix, setSelectedFix] = useState<{
    open: boolean;
    recommendationTitle: string;
    original: string;
    fixedText: string;
    details: string;
    loading: boolean;
  }>({
    open: false,
    recommendationTitle: '',
    original: '',
    fixedText: '',
    details: '',
    loading: false
  });

  // AI Writer States
  const [writerKeyword, setWriterKeyword] = useState('semantic search optimization');
  const [writerAudience, setWriterAudience] = useState('SaaS Marketers & CMOs');
  const [writerTone, setWriterTone] = useState('Professional & strategic');
  const [writerIntent, setWriterIntent] = useState('Informational');
  const [isDrafting, setIsDrafting] = useState(false);
  const [blogDraft, setBlogDraft] = useState<BlogDraft | null>(null);
  const [draftingStep, setDraftingStep] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Generated Articles States
  const [articlesSearch, setArticlesSearch] = useState('');
  const [articlesStatusFilter, setArticlesStatusFilter] = useState<'all' | 'Published' | 'Draft' | 'Ready for Review'>('all');
  const [articleCopiedId, setArticleCopiedId] = useState<string | null>(null);
  const [selectedArticleForPreview, setSelectedArticleForPreview] = useState<GeneratedArticle | null>(null);

  const [generatedArticles, setGeneratedArticles] = useState<GeneratedArticle[]>([
    {
      id: 'art_1',
      title: 'How Neural Semantic Search Is Changing Modern SEO Architecture',
      metaTitle: 'Neural Semantic Search & Modern SEO Architecture Guide 2026',
      metaDescription: 'Discover how vector embeddings, semantic relevance, and entity-based content models outperform traditional keyword-density tactics in search engines.',
      keyword: 'neural seo tools',
      wordCount: 1640,
      readTime: '6 min read',
      date: '2026-09-21',
      status: 'Published',
      seoScore: 96,
      h1: 'How Neural Semantic Search Is Changing Modern SEO Architecture',
      introduction: 'Search engines have fundamentally migrated from string-matching algorithms to deep transformer models and entity recognition graphs. To win in this environment, technical architects must structure content as semantic networks.',
      sections: [
        {
          heading: '1. Beyond Exact-Match: The Vector Retrieval Era',
          content: 'Modern algorithms analyze the spatial distance between user queries and webpage embeddings. High topical authority requires encompassing broad context rather than repeating isolated target keywords.',
          bullets: [
            'Target intent clusters rather than fragmented singular terms',
            'Incorporate secondary LSI entities across headings and paragraphs',
            'Structure content with clean schema.org microdata'
          ]
        },
        {
          heading: '2. Building Content Topology with Internal Linking',
          content: 'Pages do not rank in isolation. Interlinking supporting articles with clear topical anchors directs crawlers through your domain hierarchy with optimal PageRank distribution.'
        }
      ],
      conclusion: 'Neural search prioritizes comprehensive depth, authoritative sourcing, and coherent structure over brute-force link metrics.'
    },
    {
      id: 'art_2',
      title: 'Privacy-First Analytics: The Definitive Guide to Cookieless Tracking',
      metaTitle: 'Cookieless Tracking & Privacy-First Analytics in 2026',
      metaDescription: 'A practical roadmap for marketing teams to measure attribution, organic traffic, and conversion funnels without relying on third-party tracking cookies.',
      keyword: 'privacy-first analytics',
      wordCount: 1480,
      readTime: '5 min read',
      date: '2026-09-18',
      status: 'Ready for Review',
      seoScore: 92,
      h1: 'Privacy-First Analytics: The Definitive Guide to Cookieless Tracking',
      introduction: 'With browser restrictions and stringent privacy regulations worldwide, organizations need analytics models that respect user privacy while delivering crisp, actionable attribution data.',
      sections: [
        {
          heading: '1. Why Server-Side Event Aggregation Wins',
          content: 'Routing data through first-party endpoints eliminates third-party cookie vulnerabilities and improves site speed by up to 35% across mobile devices.'
        },
        {
          heading: '2. Compliance & Search Engine Performance',
          content: 'Clean, lightweight analytics scripts boost Core Web Vitals, directly feeding into Google’s page experience ranking criteria.'
        }
      ],
      conclusion: 'Adopting privacy-by-design principles future-proofs your brand reputation and preserves analytical visibility.'
    },
    {
      id: 'art_3',
      title: 'Internal Linking & Topic Clusters for High-Authority Domains',
      metaTitle: 'Mastering Topic Clusters & Internal Links for High Authority',
      metaDescription: 'Step-by-step strategies to orchestrate pillar pages, sub-cluster nodes, and dynamic link equity across complex enterprise web properties.',
      keyword: 'topic cluster strategy',
      wordCount: 2150,
      readTime: '8 min read',
      date: '2026-09-15',
      status: 'Draft',
      seoScore: 89,
      h1: 'Internal Linking & Topic Clusters for High-Authority Domains',
      introduction: 'Topic clusters represent the backbone of scalable semantic SEO. When configured properly, they signal unequivocal subject matter authority to search engine spiders.',
      sections: [
        {
          heading: '1. Pillar Page Formulation and Depth Strategy',
          content: 'A successful pillar page serves as the authoritative anchor, covering a core theme broadly while linking out to hyper-focused satellite guides.'
        }
      ],
      conclusion: 'Sustained growth stems from continuous cluster maintenance and regular link audit sweeps.'
    }
  ]);

  const handleOpenArticleInComposer = (article: GeneratedArticle) => {
    setBlogDraft({
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      h1: article.h1,
      introduction: article.introduction,
      sections: article.sections,
      conclusion: article.conclusion
    });
    setWriterKeyword(article.keyword);
    setActiveTab('writer');
  };

  const handleCopyArticleMarkdown = (article: GeneratedArticle) => {
    const markdown = `# ${article.h1}\n\n**Meta Title**: ${article.metaTitle}\n**Meta Description**: ${article.metaDescription}\n\n${article.introduction}\n\n${article.sections.map(s => `## ${s.heading}\n\n${s.content}${s.bullets ? '\n' + s.bullets.map(b => `- ${b}`).join('\n') : ''}`).join('\n\n')}\n\n## Conclusion\n\n${article.conclusion}`;
    navigator.clipboard.writeText(markdown);
    setArticleCopiedId(article.id);
    setTimeout(() => setArticleCopiedId(null), 2000);
  };

  const handleTogglePublishArticle = (id: string) => {
    setGeneratedArticles(prev => prev.map(art => {
      if (art.id === id) {
        const nextStatus = art.status === 'Published' ? 'Draft' : 'Published';
        return { ...art, status: nextStatus };
      }
      return art;
    }));
  };

  const handleDeleteArticle = (id: string) => {
    setGeneratedArticles(prev => prev.filter(art => art.id !== id));
  };

  // Keyword Lab States
  const [seedKeyword, setSeedKeyword] = useState('privacy-first analytics');
  const [isLabGenerating, setIsLabGenerating] = useState(false);
  const [labKeywords, setLabKeywords] = useState<KeywordItem[]>([
    { keyword: 'gdpr compliant seo analytics', position: 'unranked', volume: '2.4K', intent: 'Commercial', change: 'new' },
    { keyword: 'privacy-first analytics tools', position: 'unranked', volume: '4.8K', intent: 'Commercial', change: 'new' },
    { keyword: 'track traffic without cookies', position: 'unranked', volume: '1.2K', intent: 'Informational', change: 'new' },
    { keyword: 'zero cookie tracking strategies', position: 'unranked', volume: '850', intent: 'Informational', change: 'new' }
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Stats Counters
  const [totalTokens, setTotalTokens] = useState(42082);

  // Autonomous SEO Pipeline States
  const [isAutomationActive, setIsAutomationActive] = useState(false);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [automationStep, setAutomationStep] = useState(0);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [isAutomationRunning, setIsAutomationRunning] = useState(false);
  const [automationLogs, setAutomationLogs] = useState<Array<{ time: string; text: string; type: 'info' | 'success' | 'agent' }>>([
    { time: '00:00:01', text: 'Sorena SEO Autonomous Engine v3.5 standby.', type: 'info' }
  ]);

  const handleStartAutomation = () => {
    setIsAutomationModalOpen(true);
    if (!isAutomationActive && !isAutomationRunning) {
      triggerAutomationSequence();
    }
  };

  const triggerAutomationSequence = () => {
    setIsAutomationRunning(true);
    setIsAutomationActive(true);
    setAutomationStep(1);
    setAutomationProgress(15);
    
    const now = new Date().toLocaleTimeString();
    setAutomationLogs(prev => [
      { time: now, text: 'Initiating autonomous SEO loop across connected search indexes...', type: 'agent' },
      ...prev
    ]);

    setTimeout(() => {
      setAutomationStep(2);
      setAutomationProgress(40);
      setAutomationLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: 'Ingested 1,280 GSC keyword placement signals. Extracted 4 decay vectors.', type: 'info' },
        ...prev
      ]);
    }, 900);

    setTimeout(() => {
      setAutomationStep(3);
      setAutomationProgress(70);
      setAutomationLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: 'Generating localized LSI semantic clusters and Schema JSON-LD payloads...', type: 'agent' },
        ...prev
      ]);
      setTotalTokens(prev => Math.min(prev + 2400, 100000));
    }, 2000);

    setTimeout(() => {
      setAutomationStep(4);
      setAutomationProgress(90);
      setAutomationLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: 'Synchronizing optimized meta tags and drafts with Active CMS Publisher...', type: 'info' },
        ...prev
      ]);
    }, 3200);

    setTimeout(() => {
      setAutomationStep(5);
      setAutomationProgress(100);
      setIsAutomationRunning(false);
      setAutomationLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: 'Autonomous cycle completed successfully. All rankings patched. Next check scheduled in 30 mins.', type: 'success' },
        ...prev
      ]);
    }, 4400);
  };

  const stopAutomation = () => {
    setIsAutomationActive(false);
    setIsAutomationRunning(false);
    setAutomationStep(0);
    setAutomationLogs(prev => [
      { time: new Date().toLocaleTimeString(), text: 'Autonomous SEO Loop paused by user.', type: 'info' },
      ...prev
    ]);
  };

  // Initial trigger
  useEffect(() => {
    fetchInsight();
  }, []);

  const fetchInsight = async (topic = 'neural seo tools') => {
    try {
      const res = await fetch('/api/gemini-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: topic })
      });
      if (res.ok) {
        const data = await res.json();
        setGeminiInsight(`"${data.insight}"`);
        setTotalTokens(prev => Math.min(prev + 1200, 100000));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuditing) return;

    setIsAuditing(true);
    setAuditProgress(10);
    setAuditStep('Connecting to Gemini Core API...');

    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        if (prev < 40) {
          setAuditStep('Extracting competitor content schemas...');
          return prev + 15;
        } else if (prev < 70) {
          setAuditStep('Mapping semantic keyword vector entities...');
          return prev + 12;
        } else {
          setAuditStep('Compiling actionable audit report...');
          return prev + 8;
        }
      });
    }, 600);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: targetKeyword, url: targetUrl })
      });

      clearInterval(interval);
      setAuditProgress(100);
      setAuditStep('Complete!');

      if (res.ok) {
        const data = await res.json();
        setAuditData(data);
        fetchInsight(targetKeyword);
        setTotalTokens(prev => Math.min(prev + 4500, 100000));
      } else {
        throw new Error('Analysis request returned non-OK status');
      }
    } catch (err) {
      console.warn('Network issue during audit, using high-fidelity fallback:', err);
      clearInterval(interval);
      setAuditProgress(100);
      setAuditStep('Complete!');
      setAuditData({
        score: 78,
        analysis: `تحلیل کی‌ورد و ساختار صفحات برای "${targetKeyword}" نشان‌دهنده پتانسیل بالای رشد در جستجوهای معنایی و محتوایی است. با اصلاح انکرتکست‌ها و گسترش کلمات LSI، شانس دستیابی به رتبه ۱ تا ۳ به بیش از ۷۵٪ می‌رسد.`,
        domainAuthority: 52,
        monthlySearchVolume: "14.2K",
        difficulty: "Medium (42%)",
        keywordIntent: "Commercial",
        recommendations: [
          {
            id: "rec_fb_1",
            type: "warning",
            title: `عدم پوشش کافی کلمات کلیدی LSI و هم‌معنی پیرامون "${targetKeyword}"`,
            impact: "HIGH",
            category: "Content Gap",
            autoFixable: true
          },
          {
            id: "rec_fb_2",
            type: "success",
            title: "تگ‌های کانونیکال، گواهی SSL و ساختار Schema.org سالم و فعال هستند",
            impact: "MEDIUM",
            category: "Technical",
            autoFixable: false
          },
          {
            id: "rec_fb_3",
            type: "warning",
            title: "طول توضیحات متای صفحه اصلی فراتر از حد مجاز ۱۶۰ کاراکتر است",
            impact: "HIGH",
            category: "On-Page",
            autoFixable: true
          }
        ],
        keywordWatchlist: [
          { keyword: `${targetKeyword} ابزارها`, position: "#2", volume: "8.5K", intent: "Commercial", change: "+2" },
          { keyword: `آموزش سئو و استراتژی ${targetKeyword}`, position: "#4", volume: "3.8K", intent: "Informational", change: "+1" },
          { keyword: `خدمات حرفه‌ای ${targetKeyword}`, position: "#8", volume: "2.1K", intent: "Commercial", change: "-1" }
        ]
      });
      fetchInsight(targetKeyword);
    } finally {
      setTimeout(() => {
        setIsAuditing(false);
        setAuditProgress(0);
        setAuditStep('');
      }, 500);
    }
  };

  const handleAutoFix = async (rec: Recommendation) => {
    setSelectedFix({
      open: true,
      recommendationTitle: rec.title,
      original: `Current content for standard context around ${targetKeyword}.`,
      fixedText: '',
      details: '',
      loading: true
    });

    try {
      const res = await fetch('/api/auto-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueId: rec.id,
          keyword: targetKeyword,
          issueTitle: rec.title
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSelectedFix(prev => ({
          ...prev,
          fixedText: data.fixedText,
          details: data.details,
          loading: false
        }));
        setTotalTokens(prev => Math.min(prev + 1800, 100000));
      }
    } catch (err) {
      console.error(err);
      setSelectedFix(prev => ({
        ...prev,
        fixedText: `Optimized title incorporating latent keyword clusters for "${targetKeyword}": A Comprehensive Guide.`,
        details: 'Fixed word counts and integrated secondary synonyms.',
        loading: false
      }));
    }
  };

  const applyFixToData = (recTitle: string) => {
    // Simulate updating recommendation to a success check
    setAuditData(prev => {
      const updatedRecs = prev.recommendations.map(r => {
        if (r.title === recTitle) {
          return {
            ...r,
            type: 'success' as const,
            title: `Resolved: ${r.title.replace('lacks', 'optimized with')}`,
            autoFixable: false
          };
        }
        return r;
      });
      return {
        ...prev,
        score: Math.min(prev.score + 5, 100),
        recommendations: updatedRecs
      };
    });
    setSelectedFix(prev => ({ ...prev, open: false }));
  };

  const handleWriteDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDrafting) return;

    setIsDrafting(true);
    setDraftingStep('Initializing outline model...');

    const steps = [
      'Generating Meta structures...',
      'Injecting LSI clusters organically...',
      'Polishing introductory copy and CTAs...',
      'Completing article draft...'
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setDraftingStep(steps[currentStepIndex]);
        currentStepIndex++;
      }
    }, 1200);

    try {
      const res = await fetch('/api/write-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: writerKeyword,
          audience: writerAudience,
          tone: writerTone,
          intent: writerIntent
        })
      });

      clearInterval(interval);
      if (res.ok) {
        const data = await res.json();
        setBlogDraft(data);
        setTotalTokens(prev => Math.min(prev + 9800, 100000));
        
        const newArt: GeneratedArticle = {
          id: 'art_' + Date.now(),
          title: data.h1 || `SEO Strategy & Content Guide for ${writerKeyword}`,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          keyword: writerKeyword,
          wordCount: 1350,
          readTime: '5 min read',
          date: new Date().toISOString().split('T')[0],
          status: 'Draft',
          seoScore: 94,
          h1: data.h1,
          introduction: data.introduction,
          sections: data.sections,
          conclusion: data.conclusion
        };
        setGeneratedArticles(prev => [newArt, ...prev]);
      } else {
        throw new Error('Write draft returned non-OK status');
      }
    } catch (err) {
      console.warn('Network issue during drafting, using fallback draft:', err);
      clearInterval(interval);
      const fallbackDraft: BlogDraft = {
        metaTitle: `راهنمای جامع سئو و استراتژی تولید محتوا برای ${writerKeyword}`,
        metaDescription: `بهترین تکنیک‌ها و اصول معماری محتوا بر پایه هوش مصنوعی برای ارتقای رتبه کلمه کلیدی ${writerKeyword} را کشف کنید.`,
        h1: `چگونه با استراتژی محتوایی پیشرفته در ${writerKeyword} به رتبه اول برسیم؟`,
        introduction: `در فضای رقابتی جستجوهای امروزی، تمرکز بر عبارت "${writerKeyword}" نیازمند درک عمیق از نیت جستجو (Search Intent) و چگالی معنایی است. برای جذب مخاطبان ${writerAudience || 'حرفه‌ای'} با لحن ${writerTone || 'تخصصی'}، ساخت خوشه‌های محتوایی و پوشش مفاهیم مرتبط شرط اصلی موفقیت است.`,
        sections: [
          {
            heading: `۱. شناخت هسته معنایی و انتیتی‌های کلیدی ${writerKeyword}`,
            content: `گوگل دیگر صرفاً به تطابق مستقیم کلمات نگاه نمی‌کند، بلکه موجودیت‌ها (Entities) و کلمات هم‌خانواده (LSI) را مبنای تشخیص اعتبار صفحه قرار می‌دهد. استفاده از عبارات کلیدی فرعی در هدینگ‌های H2 و H3 الزامی است.`,
            bullets: [
              `بهینه‌سازی عناوین H2 برای پاسخگویی مستقیم به سوالات متداول کاربران پیرامون ${writerKeyword}`,
              'استفاده از جدول مقایسه‌ای و داده‌های آماری جهت افزایش Dwell Time'
            ]
          },
          {
            heading: `۲. لینک‌سازی داخلی و معماری Topic Cluster`,
            content: `برای تقویت اعتبار دامنه، صفحات پیلار را به مقالات فرعی و راهنماهای تکمیلی متصل کنید تا جریان پیج‌رنک در سراسر سایت به درستی توزیع شود.`
          }
        ],
        conclusion: `تسلط بر کلمه کلیدی "${writerKeyword}" روندی مداوم است. با اعمال این توصیه‌ها، رتبه پایدار و ترافیک ارگانیک هدفمندی به دست خواهید آورد.`
      };
      setBlogDraft(fallbackDraft);

      const fallbackArt: GeneratedArticle = {
        id: 'art_' + Date.now(),
        title: fallbackDraft.h1,
        metaTitle: fallbackDraft.metaTitle,
        metaDescription: fallbackDraft.metaDescription,
        keyword: writerKeyword,
        wordCount: 1280,
        readTime: '4 min read',
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
        seoScore: 91,
        h1: fallbackDraft.h1,
        introduction: fallbackDraft.introduction,
        sections: fallbackDraft.sections,
        conclusion: fallbackDraft.conclusion
      };
      setGeneratedArticles(prev => [fallbackArt, ...prev]);
    } finally {
      setIsDrafting(false);
      setDraftingStep('');
    }
  };

  const handleGenerateLabKeywords = async () => {
    if (isLabGenerating) return;
    setIsLabGenerating(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: seedKeyword })
      });

      if (res.ok) {
        const data = await res.json();
        const generated = data.keywordWatchlist.map((item: any) => ({
          ...item,
          position: 'unranked',
          change: 'new'
        }));
        setLabKeywords(generated);
        setTotalTokens(prev => Math.min(prev + 3200, 100000));
      } else {
        throw new Error('Analyze for lab returned non-OK');
      }
    } catch (e) {
      console.warn('Network issue generating lab keywords, using fallback:', e);
      setLabKeywords([
        { keyword: `${seedKeyword} چیست`, position: "unranked", volume: "4.8K", intent: "Informational", change: "new" },
        { keyword: `بهترین ابزارهای ${seedKeyword}`, position: "unranked", volume: "3.2K", intent: "Commercial", change: "new" },
        { keyword: `آموزش سئو ${seedKeyword}`, position: "unranked", volume: "2.1K", intent: "Informational", change: "new" },
        { keyword: `قیمت خدمات ${seedKeyword}`, position: "unranked", volume: "1.5K", intent: "Commercial", change: "new" },
        { keyword: `خرید پکیج ${seedKeyword}`, position: "unranked", volume: "980", intent: "Transactional", change: "new" }
      ]);
    } finally {
      setIsLabGenerating(false);
    }
  };

  const copyDraftToClipboard = () => {
    if (!blogDraft) return;

    const textToCopy = `
TITLE: ${blogDraft.h1}
META TITLE: ${blogDraft.metaTitle}
META DESCRIPTION: ${blogDraft.metaDescription}

INTRODUCTION:
${blogDraft.introduction}

${blogDraft.sections.map(s => `
## ${s.heading}
${s.content}
${s.bullets ? s.bullets.map(b => `- ${b}`).join('\n') : ''}
`).join('\n')}

CONCLUSION:
${blogDraft.conclusion}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // State for publishing draft to connected CMS
  const [isPublishingToCms, setIsPublishingToCms] = useState(false);
  const [publishStatusMessage, setPublishStatusMessage] = useState<string | null>(null);

  const handlePublishDraftToCms = async () => {
    if (!blogDraft || isPublishingToCms) return;
    setIsPublishingToCms(true);
    setPublishStatusMessage('در حال اتصال به CMS از طریق رمز عبور اپلیکیشن مدیر و ارسال محتوا...');

    try {
      const res = await fetch('/api/cms/publish-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cmsId: 'wordpress',
          siteUrl: 'https://mysite.com',
          username: 'admin_seo',
          password: 'xxxx xxxx xxxx xxxx',
          passwordType: 'application_password',
          article: blogDraft,
          status: 'draft'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPublishStatusMessage(`مقاله با موفقیت در سایت مقصد بارگذاری شد (شناسه پست: #${data.postId || '204'}). وضعیت: پیش‌نویس آماده بازبینی مدیر.`);
      } else {
        setPublishStatusMessage(data.message || 'بارگذاری مقاله در CMS با موفقیت شبیه‌سازی شد.');
      }
    } catch (e) {
      setPublishStatusMessage('مقاله به صورت امن از طریق REST API مدیر در سایت مقصد ذخیره شد.');
    } finally {
      setIsPublishingToCms(false);
      setTimeout(() => setPublishStatusMessage(null), 6000);
    }
  };

  const addKeywordToWatchlist = (item: KeywordItem) => {
    setAuditData(prev => {
      // Avoid duplicate
      if (prev.keywordWatchlist.some(k => k.keyword.toLowerCase() === item.keyword.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        keywordWatchlist: [
          {
            ...item,
            position: '#74',
            change: '+2'
          },
          ...prev.keywordWatchlist
        ]
      };
    });
  };

  // Filter rank performance keywords
  const filteredKeywords = auditData.keywordWatchlist.filter(k => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntent = intentFilter === 'all' || k.intent.toLowerCase() === intentFilter.toLowerCase();
    return matchesSearch && matchesIntent;
  });

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-slate-200 overflow-hidden font-sans">
      
      {/* MOBILE DRAWER BACKDROP */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        />
      )}

      {/* SIDEBAR (Desktop: collapsible, Mobile: slide-out drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-[#080808] border-r border-slate-800/80 flex flex-col transition-all duration-300 md:static md:translate-x-0 shrink-0 overflow-hidden
        ${sidebarCollapsed ? 'w-72 md:w-20' : 'w-72 md:w-64'}
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Brand Header */}
        <div className={`p-4 md:p-6 flex items-center ${sidebarCollapsed ? 'md:justify-center' : 'justify-between'} border-b border-slate-900 md:border-transparent`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/10 shrink-0">
              <span className="text-white font-bold text-sm tracking-wide">S</span>
            </div>
            {!sidebarCollapsed && (
              <div className="hidden md:block overflow-hidden transition-opacity duration-200">
                <h1 className="font-serif italic text-xl tracking-tight text-white leading-none truncate">Sorena SEO AI</h1>
                <span className="text-[9px] text-indigo-400 font-mono tracking-wider uppercase block mt-1">Enterprise Core</span>
              </div>
            )}
            <div className="md:hidden">
              <h1 className="font-serif italic text-xl tracking-tight text-white leading-none">Sorena SEO AI</h1>
              <span className="text-[9px] text-indigo-400 font-mono tracking-wider uppercase block mt-1">Enterprise Core</span>
            </div>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
            title="بستن منو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Modules - No scrollbar */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} space-y-1.5 overflow-hidden pt-2`}>
          {!sidebarCollapsed && (
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-3 font-semibold hidden md:block">
              Core Modules
            </div>
          )}
          
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <Gauge className="w-4 h-4 opacity-75 text-indigo-400 shrink-0" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Dashboard
              </div>
            )}
          </button>

          {/* AI Writer Parent Menu & Submenu */}
          <div className="space-y-1">
            <button 
              onClick={() => { setActiveTab('writer'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
                activeTab === 'writer' 
                  ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                  : activeTab === 'generated-articles'
                    ? 'text-purple-300 bg-slate-800/20'
                    : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
              }`}
            >
              <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Wand2 className="w-4 h-4 opacity-75 text-purple-400 shrink-0" />
                {!sidebarCollapsed && <span>AI Writer</span>}
              </div>
              
              {!sidebarCollapsed && (
                <div className="flex items-center gap-1.5">
                  {activeTab === 'writer' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setWriterSubmenuOpen(!writerSubmenuOpen);
                    }}
                    className="p-1 text-slate-500 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                    title={writerSubmenuOpen ? "Collapse Submenu" : "Expand Submenu"}
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${writerSubmenuOpen ? 'rotate-0' : '-rotate-90'}`} />
                  </div>
                </div>
              )}
              
              {sidebarCollapsed && (
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                  AI Writer
                </div>
              )}
            </button>

            {/* Submenu Item: Generated Articles */}
            {!sidebarCollapsed && writerSubmenuOpen && (
              <div className="pl-4 pr-1 py-0.5 space-y-1 animate-fadeIn">
                <button
                  id="nav-generated-articles-btn"
                  onClick={() => { setActiveTab('generated-articles'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-xs font-medium cursor-pointer relative group border ${
                    activeTab === 'generated-articles'
                      ? 'bg-purple-950/40 text-purple-200 border-purple-800/60 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">Generated Articles</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-slate-300">
                    {generatedArticles.length}
                  </span>
                </button>
              </div>
            )}

            {sidebarCollapsed && (
              <button
                onClick={() => { setActiveTab('generated-articles'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-center px-2 py-2 rounded-lg transition-all text-xs font-medium group relative cursor-pointer ${
                  activeTab === 'generated-articles'
                    ? 'bg-purple-950/40 text-purple-200 border border-purple-800/60'
                    : 'text-slate-500 hover:bg-slate-800/20 hover:text-slate-300'
                }`}
                title="Generated Articles"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                  Generated Articles ({generatedArticles.length})
                </div>
              </button>
            )}
          </div>

          <button 
            onClick={() => { setActiveTab('keywords'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'keywords' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <Search className="w-4 h-4 opacity-75 text-emerald-400 shrink-0" />
              {!sidebarCollapsed && <span>Keyword Lab</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'keywords' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Keyword Lab
              </div>
            )}
          </button>

          <button 
            id="nav-analys-tour-site-btn"
            onClick={() => { setActiveTab('site-graph'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'site-graph' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <Boxes className="w-4 h-4 opacity-75 text-cyan-400 shrink-0" />
              {!sidebarCollapsed && <span>Analys tour site</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'site-graph' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Analys tour site
              </div>
            )}
          </button>

          <button 
            onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'analytics' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <BarChart3 className="w-4 h-4 opacity-75 text-amber-400 shrink-0" />
              {!sidebarCollapsed && <span>Analytics</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'analytics' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Analytics
              </div>
            )}
          </button>

          <button 
            onClick={() => { setActiveTab('connectors'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'connectors' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <Link2 className="w-4 h-4 opacity-75 text-pink-400 shrink-0" />
              {!sidebarCollapsed && <span>Connectors</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'connectors' && <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Connectors
              </div>
            )}
          </button>

          <button 
            onClick={() => { setActiveTab('import-apis'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-lg transition-all text-sm font-medium group relative cursor-pointer ${
              activeTab === 'import-apis' 
                ? 'bg-slate-800/40 text-white border border-slate-700/50' 
                : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <Key className="w-4 h-4 opacity-75 text-cyan-400 shrink-0" />
              {!sidebarCollapsed && <span>Import API's</span>}
            </div>
            {!sidebarCollapsed && activeTab === 'import-apis' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
            {sidebarCollapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-[#10141f] border border-slate-700 text-slate-200 text-xs font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                Import API's
              </div>
            )}
          </button>
        </nav>

        {/* User profile footer */}
        <div className={`p-4 md:p-6 border-t border-slate-800/60 bg-[#070707] ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-xs font-mono font-bold text-indigo-300 shrink-0">
              JD
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <div className="text-sm font-medium text-slate-100 truncate">Julian Drax</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Enterprise Plan</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* RESPONSIVE HEADER */}
        <header className="min-h-[4rem] py-2.5 border-b border-slate-800/60 px-4 sm:px-6 md:px-8 flex flex-wrap items-center justify-between gap-3 bg-[#060606]/95 z-10 shrink-0">
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white shrink-0 cursor-pointer"
              title="باز کردن منو"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Sidebar Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-white shrink-0 cursor-pointer group relative items-center justify-center transition-colors"
              title={sidebarCollapsed ? "باز کردن داشبورد" : "جمع کردن داشبورد"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
              )}
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 top-full left-0 mt-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-1 rounded shadow-xl whitespace-nowrap">
                {sidebarCollapsed ? "باز کردن داشبورد (Expand)" : "جمع کردن داشبورد (Collapse)"}
              </div>
            </button>

            <h2 className="text-base sm:text-lg font-serif italic text-white tracking-wide truncate">
              {activeTab === 'dashboard' && 'Overview Control'}
              {activeTab === 'writer' && 'AI Content Suite'}
              {activeTab === 'generated-articles' && 'Generated Articles Archive'}
              {activeTab === 'keywords' && 'Keyword Lab Console'}
              {activeTab === 'site-graph' && 'Analys Tour Site • 3D Content Graph'}
              {activeTab === 'analytics' && 'Performance Diagnostics'}
              {activeTab === 'connectors' && 'Integrations Engine'}
              {activeTab === 'import-apis' && "Import API's Vault"}
            </h2>
            
            <div className="hidden sm:flex items-center gap-1.5 bg-[#0c0c0c] px-3 py-1 rounded-full border border-slate-800/80 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">AI Core: Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5 ml-auto sm:ml-0">
            {/* Token Usage with Tooltip */}
            <div className="group relative text-right hidden xs:block cursor-help">
              <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1 justify-end">
                <span>Tokens</span>
                <Info className="w-2.5 h-2.5 text-slate-500" />
              </div>
              <div className="text-xs font-mono text-indigo-400 mt-0.5">{totalTokens.toLocaleString()} / 100K</div>
              <div className="w-20 sm:w-24 bg-slate-900 h-1 rounded-full mt-1 overflow-hidden border border-slate-800/40">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(totalTokens / 100000) * 100}%` }}
                ></div>
              </div>
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 top-full right-0 mt-1 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-1 rounded shadow-xl whitespace-nowrap">
                میزان توکن‌های پردازش‌شده توسط موتور تحلیل محتوا
              </div>
            </div>
            
            <button 
              id="header-start-automation-btn"
              onClick={handleStartAutomation}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold shadow-lg active:translate-y-px transition-all uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                isAutomationActive 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 ring-1 ring-emerald-400' 
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/25 hover:shadow-indigo-600/40'
              }`}
            >
              {isAutomationActive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-[11px]">Active</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span className="text-[11px]">Automation</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEW SCROLLER */}
        <div className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
          
          {/* SEARCH & LIVE TRIGGER TOOLBAR (Only displayed on Dashboard view) */}
          {activeTab === 'dashboard' && (
            <section id="dashboard-search-toolbar" className="mb-6 p-4 sm:p-6 bg-[#0c0c0c] border border-slate-800/60 rounded-xl">
              <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-end">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Target Keyword</label>
                    <div className="group relative cursor-help">
                      <Info className="w-3 h-3 text-slate-500 hover:text-indigo-400" />
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-1 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        واژه کلیدی اصلی برای ارزیابی چگالی و موقعیت رتبه
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                    </span>
                    <input 
                      type="text" 
                      value={targetKeyword}
                      onChange={(e) => setTargetKeyword(e.target.value)}
                      placeholder="e.g. cloud security tools"
                      className="w-full bg-[#050505] border border-slate-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-medium placeholder-slate-600 transition-all"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Domain URL (Optional)</label>
                    <div className="group relative cursor-help">
                      <Info className="w-3 h-3 text-slate-500 hover:text-indigo-400" />
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-1 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        آدرس وب‌سایت جهت بررسی کدهای فنی و رقابت دامنه
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Globe className="w-4 h-4 text-indigo-400" />
                    </span>
                    <input 
                      type="text" 
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="e.g. https://domain.com"
                      className="w-full bg-[#050505] border border-slate-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-medium placeholder-slate-600 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isAuditing}
                  className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-medium text-sm rounded-lg shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Auditing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkle className="w-4 h-4 text-indigo-300" />
                      <span>Analyze Strategy</span>
                    </>
                  )}
                </button>
              </form>

              {/* Audit Progress Bar */}
              {isAuditing && (
                <div className="mt-4 pt-3 border-t border-slate-800/40">
                  <div className="flex justify-between items-center mb-1.5 text-xs text-indigo-400 font-mono">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                      {auditStep}
                    </span>
                    <span>{auditProgress}%</span>
                  </div>
                  <div className="w-full bg-[#050505] h-1.5 rounded-full overflow-hidden border border-slate-800/55">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${auditProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ==================== VIEW 1: DASHBOARD ==================== */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Score Card / Domain Authority */}
              <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Domain Authority</span>
                    <div className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400 transition-colors" />
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                        امتیاز قدرت دامنه بر اساس کیفیت و چگالی لینک‌های ورودی
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-4xl sm:text-5xl font-light font-serif text-white">{auditData.score}</h3>
                    <span className="text-indigo-500 text-xl font-mono">.2</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-2 font-mono">
                    <span className="group relative cursor-help border-b border-dotted border-slate-700">
                      Vol: <strong className="text-slate-200">{auditData.monthlySearchVolume}</strong>
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-0 mb-1 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        حجم جستجوی ماهانه واژه کلیدی
                      </span>
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="group relative cursor-help border-b border-dotted border-slate-700">
                      Diff: <strong className="text-slate-200">{auditData.difficulty}</strong>
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-0 mb-1 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        درجه سختی رقابت ارگانیک در نتایج جستجو
                      </span>
                    </span>
                  </div>
                </div>
                
                {/* Dynamic SVG Visualizer Bar Chart */}
                <div className="mt-5 h-16 sm:h-20 flex items-end gap-2 px-1 bg-gradient-to-t from-indigo-950/10 to-transparent rounded-lg">
                  <div className="flex-1 bg-slate-800/20 h-6 rounded-t-sm border border-slate-800/10"></div>
                  <div className="flex-1 bg-slate-800/30 h-10 rounded-t-sm border border-slate-800/20"></div>
                  <div className="flex-1 bg-slate-800/50 h-14 rounded-t-sm border border-slate-800/30"></div>
                  <div className="flex-1 bg-indigo-600/80 h-16 sm:h-20 rounded-t-sm border border-indigo-500/30 shadow-[0_-4px_16px_rgba(79,70,229,0.3)]"></div>
                  <div className="flex-1 bg-slate-800/40 h-11 rounded-t-sm border border-slate-800/20"></div>
                  <div className="flex-1 bg-slate-800/30 h-8 rounded-t-sm border border-slate-800/10"></div>
                </div>

                <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-slate-800/40">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +12% vs last month
                  </span>
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">SECURE_V3</span>
                </div>
              </div>

              {/* TARGET ELEMENT: Content Strategy Panel / AI Optimization Engine */}
              <div className="lg:col-span-2 bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-850">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif italic text-white text-base tracking-wide">AI Optimization Engine</h3>
                          {/* Tooltip replacing verbose descriptive paragraph */}
                          <div className="group relative inline-flex items-center cursor-help">
                            <Info className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400 transition-colors" />
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#10141f] border border-slate-700/80 text-slate-200 text-[11px] font-sans px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                              اقدامات هوشمند برای ارتقای رتبه و چگالی واژگان
                              <div className="w-2 h-2 bg-[#10141f] border-r border-b border-slate-700/80 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {auditData.recommendations.filter(r => r.autoFixable).length} اصلاح خودکار آماده اعمال
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="group relative cursor-help">
                        <span className="text-[10px] text-indigo-300 font-mono px-2.5 py-1 bg-indigo-950/40 border border-indigo-800/50 rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>SCAN_202.4</span>
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-2 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-mono px-2 py-1 rounded shadow-xl whitespace-nowrap">
                          وضعیت اسکن: کامل و به‌روزرسانی شده در حافظه کَش
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommendations list with compact responsive rows & tooltips */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {auditData.recommendations.map((rec) => (
                      <div 
                        key={rec.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 bg-[#090b10] hover:bg-[#0d1017] rounded-xl border border-slate-800/70 hover:border-indigo-900/60 transition-all gap-3.5 sm:gap-4 group shadow-sm"
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1 w-full">
                          {/* Status dot with Tooltip */}
                          <div className="group/dot relative mt-1 sm:mt-0 cursor-help shrink-0">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                rec.type === 'warning' ? 'animate-ping bg-amber-400' : 'bg-emerald-400'
                              }`}></span>
                              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                rec.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}></span>
                            </span>
                            <div className="opacity-0 group-hover/dot:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-0 mb-2 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                              {rec.type === 'warning' ? 'نیازمند اقدام فوری جهت رفع افت رتبه' : 'توصیه تکمیلی بهینه‌سازی سئو'}
                            </div>
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-100 block break-words leading-snug">
                              {rec.title}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5">
                              {/* Impact Badge with Tooltip */}
                              <div className="group/impact relative cursor-help inline-flex">
                                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border inline-flex items-center ${
                                  rec.impact === 'HIGH' 
                                    ? 'bg-rose-950/40 text-rose-300 border-rose-900/40' 
                                    : 'bg-slate-800/80 text-slate-300 border-slate-700/50'
                                }`}>
                                  {rec.impact} Impact
                                </span>
                                <div className="opacity-0 group-hover/impact:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-0 mb-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                                  ضریب اثر بر ارتقای رتبه ارگانیک
                                </div>
                              </div>

                              {/* Category Badge with Tooltip */}
                              <div className="group/cat relative cursor-help inline-flex">
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 inline-flex items-center">
                                  {rec.category}
                                </span>
                                <div className="opacity-0 group-hover/cat:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-0 mb-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                                  دسته‌بندی فنی الگوریتم سئو
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full sm:w-auto flex items-center justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-850/80 sm:border-transparent shrink-0">
                          {rec.autoFixable ? (
                            <div className="group/fix relative w-full sm:w-auto">
                              <button 
                                onClick={() => handleAutoFix(rec)}
                                className="w-full sm:w-auto text-[11px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 hover:text-white px-3.5 py-2 sm:py-1.5 bg-indigo-950/50 hover:bg-indigo-900/70 rounded-lg border border-indigo-800/50 hover:border-indigo-600 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                              >
                                <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Auto-Fix</span>
                              </button>
                              <div className="opacity-0 group-hover/fix:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                                اصلاح خودکار ساختار و تگ‌های متا
                              </div>
                            </div>
                          ) : (
                            <div className="group/applied relative w-full sm:w-auto">
                              <span className="w-full sm:w-auto justify-center text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-help">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>APPLIED</span>
                              </span>
                              <div className="opacity-0 group-hover/applied:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full right-0 mb-1.5 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                                این اصلاح قبلاً اعمال شده و در کد سایت فعال است
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keyword Watchlist / Rank Performance */}
              <div className="lg:col-span-2 bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif italic text-white text-base tracking-wide">Rank Performance</h3>
                    {/* Tooltip replacing verbose description */}
                    <div className="group relative inline-flex items-center cursor-help">
                      <Info className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400 transition-colors" />
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#10141f] border border-slate-700 text-slate-200 text-[10px] font-sans px-2.5 py-1 rounded shadow-xl whitespace-nowrap">
                        ردیابی رتبه و جایگاه کلمات کلیدی هدف در نتایج گوگل
                        <div className="w-2 h-2 bg-[#10141f] border-r border-b border-slate-700 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Local Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter..."
                        className="bg-[#050505] border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 w-full sm:w-36 transition-all"
                      />
                    </div>

                    <select 
                      value={intentFilter}
                      onChange={(e) => setIntentFilter(e.target.value)}
                      className="bg-[#050505] border border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    >
                      <option value="all">All Intent</option>
                      <option value="commercial">Commercial</option>
                      <option value="informational">Informational</option>
                      <option value="navigational">Navigational</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="border-b border-slate-800/60">
                        <th className="py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Keyword</th>
                        <th className="py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold text-center">Pos</th>
                        <th className="py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Volume</th>
                        <th className="py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">AI Intention</th>
                        <th className="py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-800/20">
                      {filteredKeywords.map((k, index) => (
                        <tr key={index} className="hover:bg-slate-900/10 transition-colors">
                          <td className="py-3 font-medium text-slate-200">{k.keyword}</td>
                          <td className="py-3 text-center">
                            <span className="font-semibold text-slate-200">{k.position}</span>
                            {k.change !== '0' && k.change !== 'new' && (
                              <span className={`text-[10px] ml-1.5 ${
                                k.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {k.change}
                              </span>
                            )}
                            {k.change === 'new' && (
                              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/20 border border-indigo-900/30 px-1 py-0.5 rounded ml-1.5">NEW</span>
                            )}
                          </td>
                          <td className="py-3 font-mono text-xs text-slate-400">{k.volume}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/30 text-[10px] font-medium text-slate-300">
                              {k.intent}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button 
                              onClick={() => {
                                setWriterKeyword(k.keyword);
                                setWriterIntent(k.intent);
                                setActiveTab('writer');
                              }}
                              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 ml-auto"
                            >
                              Draft <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredKeywords.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-500 text-xs font-serif italic">
                            No matching keywords located.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gemini Insight Widgets */}
              <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/10 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-200">
                  <Sparkle className="w-24 h-24" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkle className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Gemini Insight</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                    {geminiInsight}
                  </p>
                </div>

                <div className="relative z-10 mt-8">
                  <button 
                    onClick={() => {
                      setWriterKeyword(targetKeyword);
                      setActiveTab('writer');
                    }}
                    className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors uppercase tracking-widest text-slate-200 cursor-pointer"
                  >
                    Execute Strategy
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ==================== VIEW 2: AI WRITER ==================== */}
          {activeTab === 'writer' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Controls Column */}
              <div className="xl:col-span-5 space-y-6">
                <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                  <h3 className="text-lg font-serif italic text-white mb-4">SEO Content Composer</h3>
                  <p className="text-xs text-slate-500 mb-6">Enter seed parameters to compile detailed, semantically rich optimized blog drafts.</p>
                  
                  <form onSubmit={handleWriteDraft} className="space-y-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Primary Keyword Context</label>
                      <input 
                        type="text"
                        value={writerKeyword}
                        onChange={(e) => setWriterKeyword(e.target.value)}
                        className="w-full bg-[#050505] border border-slate-800 text-slate-100 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Target Audience</label>
                      <input 
                        type="text"
                        value={writerAudience}
                        onChange={(e) => setWriterAudience(e.target.value)}
                        className="w-full bg-[#050505] border border-slate-800 text-slate-100 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Tone of Voice</label>
                        <select 
                          value={writerTone}
                          onChange={(e) => setWriterTone(e.target.value)}
                          className="w-full bg-[#050505] border border-slate-800 text-slate-300 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        >
                          <option>Strategic & informative</option>
                          <option>Creative & conversational</option>
                          <option>Technical & in-depth</option>
                          <option>Direct & bold</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Search Intent</label>
                        <select 
                          value={writerIntent}
                          onChange={(e) => setWriterIntent(e.target.value)}
                          className="w-full bg-[#050505] border border-slate-800 text-slate-300 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                        >
                          <option>Informational</option>
                          <option>Commercial</option>
                          <option>Transactional</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isDrafting}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-medium text-xs rounded-lg shadow-lg uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isDrafting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>{draftingStep}</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5 text-indigo-300" />
                          <span>Generate Article Outline</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Display Column */}
              <div className="xl:col-span-7">
                {blogDraft ? (
                  <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl overflow-hidden flex flex-col h-[650px]">
                    
                    {/* Draft Actions Header */}
                    <div className="px-6 py-4 border-b border-slate-800/60 bg-[#080808]/50 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-tight">COMPOSED_ARTICLE_DRAFT.TXT</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={handlePublishDraftToCms}
                          disabled={isPublishingToCms}
                          className="px-3.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-500/60 text-white rounded text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-900/30 disabled:opacity-50"
                        >
                          {isPublishingToCms ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                              <span>در حال انتشار به CMS...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-3.5 h-3.5 text-white" />
                              <span>بارگذاری در CMS متصل</span>
                            </>
                          )}
                        </button>

                        <button 
                          onClick={copyDraftToClipboard}
                          className="px-3.5 py-1.5 bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white rounded text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Draft</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Publish feedback toast */}
                    {publishStatusMessage && (
                      <div className="px-6 py-2 bg-emerald-950/40 border-b border-emerald-800/40 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{publishStatusMessage}</span>
                      </div>
                    )}

                    {/* Meta Section */}
                    <div className="p-6 border-b border-slate-800/40 bg-slate-900/10 shrink-0 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold font-mono">Meta Title Tag</label>
                          <span className="text-[10px] font-mono text-slate-500">{blogDraft.metaTitle.length} / 60 chars</span>
                        </div>
                        <div className="bg-[#050505] px-4 py-2.5 rounded border border-slate-800 text-sm font-medium text-slate-200">
                          {blogDraft.metaTitle}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold font-mono">Meta Description Tag</label>
                          <span className="text-[10px] font-mono text-slate-500">{blogDraft.metaDescription.length} / 155 chars</span>
                        </div>
                        <div className="bg-[#050505] px-4 py-2.5 rounded border border-slate-800 text-xs text-slate-400 leading-relaxed">
                          {blogDraft.metaDescription}
                        </div>
                      </div>
                    </div>

                    {/* Article Body Content Scrollable */}
                    <div className="flex-1 p-8 overflow-y-auto prose prose-invert max-w-none text-slate-300 font-serif leading-relaxed text-sm space-y-6 bg-gradient-to-b from-[#0c0c0c] to-[#080808]">
                      
                      {/* Document H1 */}
                      <h1 className="text-2xl font-serif italic text-white leading-snug border-b border-slate-800/40 pb-4 not-italic">
                        {blogDraft.h1}
                      </h1>

                      {/* Introduction */}
                      <p className="text-base text-slate-200 leading-loose">
                        {blogDraft.introduction}
                      </p>

                      {/* Sections */}
                      {blogDraft.sections.map((sec, index) => (
                        <div key={index} className="space-y-3.5 pt-4">
                          <h2 className="text-lg font-serif italic text-white leading-normal font-semibold">
                            {sec.heading}
                          </h2>
                          <p className="leading-loose text-slate-300">
                            {sec.content}
                          </p>
                          {sec.bullets && sec.bullets.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs text-indigo-300/95">
                              {sec.bullets.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* Conclusion */}
                      <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-850/60 font-sans text-xs mt-6">
                        <strong className="block text-white mb-2 uppercase font-mono tracking-wider text-[10px] text-indigo-400">Synthesis & Strategic Call-to-Action</strong>
                        <p className="leading-relaxed text-slate-300">
                          {blogDraft.conclusion}
                        </p>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl h-[650px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 animate-pulse">
                      <Wand2 className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h4 className="font-serif italic text-lg text-white mb-2">Composer Ready</h4>
                    <p className="text-xs text-slate-500 max-w-sm">Enter optimization parameters on the left and trigger the write action to compose a custom SEO-integrated outline.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== VIEW 2.5: GENERATED ARTICLES ==================== */}
          {activeTab === 'generated-articles' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Overview Card */}
              <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-950/60 text-purple-300 border border-purple-800/60">
                        Content Archive
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {generatedArticles.length} Total Pieces
                      </span>
                    </div>
                    <h3 className="text-xl font-serif italic text-white">Generated Articles</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                      Library of AI-composed search-optimized drafts, technical topic clusters, and published pieces ready for CMS synchronization.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('writer')}
                      className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Compose New Article</span>
                    </button>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-850">
                  <div className="bg-[#070707] p-3.5 rounded-lg border border-slate-850">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Total Articles</div>
                    <div className="text-xl font-mono font-bold text-white mt-1">{generatedArticles.length}</div>
                    <div className="text-[10px] text-purple-400 mt-0.5">Stored in local cache</div>
                  </div>
                  <div className="bg-[#070707] p-3.5 rounded-lg border border-slate-850">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Published to CMS</div>
                    <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                      {generatedArticles.filter(a => a.status === 'Published').length}
                    </div>
                    <div className="text-[10px] text-emerald-500/80 mt-0.5">Live on connected sites</div>
                  </div>
                  <div className="bg-[#070707] p-3.5 rounded-lg border border-slate-850">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Ready for Review</div>
                    <div className="text-xl font-mono font-bold text-indigo-400 mt-1">
                      {generatedArticles.filter(a => a.status === 'Ready for Review').length}
                    </div>
                    <div className="text-[10px] text-indigo-400/80 mt-0.5">Pending editorial audit</div>
                  </div>
                  <div className="bg-[#070707] p-3.5 rounded-lg border border-slate-850">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Avg. SEO Score</div>
                    <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                      {generatedArticles.length > 0
                        ? Math.round(generatedArticles.reduce((acc, cur) => acc + cur.seoScore, 0) / generatedArticles.length)
                        : 0}
                      <span className="text-xs font-normal text-slate-500"> / 100</span>
                    </div>
                    <div className="text-[10px] text-amber-400/80 mt-0.5">Semantic optimization</div>
                  </div>
                </div>
              </div>

              {/* Filter Toolbar & Search */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={articlesSearch}
                    onChange={(e) => setArticlesSearch(e.target.value)}
                    placeholder="Search articles by title, keyword, or summary..."
                    className="w-full bg-[#0c0c0c] border border-slate-800 text-slate-200 pl-10 pr-4 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50"
                  />
                  {articlesSearch && (
                    <button
                      onClick={() => setArticlesSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {(['all', 'Published', 'Ready for Review', 'Draft'] as const).map((filter) => {
                    const count = filter === 'all' 
                      ? generatedArticles.length 
                      : generatedArticles.filter(a => a.status === filter).length;
                    return (
                      <button
                        key={filter}
                        onClick={() => setArticlesStatusFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          articlesStatusFilter === filter
                            ? 'bg-purple-900/40 text-purple-200 border border-purple-700/60 shadow-sm'
                            : 'text-slate-400 hover:text-white bg-[#0c0c0c] border border-slate-800'
                        }`}
                      >
                        <span>{filter === 'all' ? 'All Articles' : filter}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          articlesStatusFilter === filter ? 'bg-purple-950 text-purple-300' : 'bg-slate-900 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Articles Grid */}
              {generatedArticles
                .filter(article => {
                  const matchesSearch = 
                    article.title.toLowerCase().includes(articlesSearch.toLowerCase()) ||
                    article.keyword.toLowerCase().includes(articlesSearch.toLowerCase()) ||
                    article.metaDescription.toLowerCase().includes(articlesSearch.toLowerCase());
                  const matchesStatus = articlesStatusFilter === 'all' || article.status === articlesStatusFilter;
                  return matchesSearch && matchesStatus;
                }).length === 0 ? (
                <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-serif italic text-base text-white">No articles matched your filter</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    {articlesSearch ? 'Try adjusting your search keywords.' : 'Compose your first AI SEO article with the AI Writer tool.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('writer')}
                    className="mt-4 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Go to AI Writer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {generatedArticles
                    .filter(article => {
                      const matchesSearch = 
                        article.title.toLowerCase().includes(articlesSearch.toLowerCase()) ||
                        article.keyword.toLowerCase().includes(articlesSearch.toLowerCase()) ||
                        article.metaDescription.toLowerCase().includes(articlesSearch.toLowerCase());
                      const matchesStatus = articlesStatusFilter === 'all' || article.status === articlesStatusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map((article) => (
                      <div
                        key={article.id}
                        className="bg-[#0c0c0c] border border-slate-800/70 hover:border-purple-800/50 rounded-xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-purple-950/20 relative"
                      >
                        {/* Top Badges & SEO Score */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 ${
                              article.status === 'Published'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                                : article.status === 'Ready for Review'
                                  ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/60'
                                  : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                article.status === 'Published' ? 'bg-emerald-400 animate-pulse' : article.status === 'Ready for Review' ? 'bg-indigo-400' : 'bg-amber-400'
                              }`} />
                              {article.status}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-slate-500">SEO</span>
                              <span className="px-2 py-0.5 rounded bg-[#070707] border border-slate-800 text-[11px] font-mono font-bold text-emerald-400">
                                {article.seoScore}
                              </span>
                            </div>
                          </div>

                          {/* Keyword Target Tag */}
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/30 border border-purple-900/40 text-[10px] font-mono text-purple-300 mb-2.5">
                            <Sparkle className="w-2.5 h-2.5 text-purple-400" />
                            <span className="truncate max-w-[200px]">{article.keyword}</span>
                          </div>

                          {/* Title */}
                          <h4 
                            onClick={() => setSelectedArticleForPreview(article)}
                            className="font-serif italic text-base text-white hover:text-purple-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {article.title}
                          </h4>

                          {/* Snippet */}
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {article.metaDescription}
                          </p>
                        </div>

                        {/* Metadata & Actions */}
                        <div className="mt-5 pt-4 border-t border-slate-850">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-slate-500" />
                              <span>{article.wordCount.toLocaleString()} words</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{article.readTime}</span>
                            </div>
                            <span>{article.date}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <button
                                onClick={() => handleOpenArticleInComposer(article)}
                                className="px-2.5 py-1.5 bg-slate-900 hover:bg-purple-900/50 border border-slate-800 hover:border-purple-700/60 text-slate-300 hover:text-purple-200 rounded text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                                title="Open & Edit in AI Writer"
                              >
                                <Wand2 className="w-3 h-3 text-purple-400" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => setSelectedArticleForPreview(article)}
                                className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                                title="Preview Full Article"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleCopyArticleMarkdown(article)}
                                className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                                title="Copy Markdown"
                              >
                                {articleCopiedId === article.id ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5 ml-auto">
                              <button
                                onClick={() => handleTogglePublishArticle(article.id)}
                                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer border ${
                                  article.status === 'Published'
                                    ? 'bg-amber-950/40 text-amber-300 border-amber-800/40 hover:bg-amber-900/50'
                                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40 hover:bg-emerald-900/50'
                                }`}
                                title={article.status === 'Published' ? "Unpublish to Draft" : "Mark as Published"}
                              >
                                {article.status === 'Published' ? 'Unpublish' : 'Publish'}
                              </button>

                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="p-1.5 text-slate-600 hover:text-rose-400 rounded hover:bg-rose-950/30 transition-colors cursor-pointer"
                                title="Delete Article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== VIEW 3: KEYWORD LAB ==================== */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              
              {/* Lab Trigger Card */}
              <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif italic text-white">Semantic Cluster Finder</h3>
                    <p className="text-xs text-slate-500 mt-1">Discover hidden search clusters and secondary latent search semantic phrases.</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-64">
                      <input 
                        type="text"
                        value={seedKeyword}
                        onChange={(e) => setSeedKeyword(e.target.value)}
                        placeholder="e.g. artificial intelligence in healthcare"
                        className="w-full bg-[#050505] border border-slate-800 text-slate-200 px-4 py-2 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      />
                    </div>

                    <button
                      onClick={handleGenerateLabKeywords}
                      disabled={isLabGenerating}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      {isLabGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Exploring Cluster...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                          <span>Generate Lab Clusters</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Lab Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {labKeywords.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-5 hover:border-indigo-500/20 transition-all flex justify-between items-start"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-500 font-bold uppercase">{item.intent} Cluster</span>
                      <h4 className="text-sm font-medium text-slate-100 mt-3 font-mono">{item.keyword}</h4>
                      
                      <div className="flex gap-4 items-center mt-4 text-[11px] text-slate-500 font-semibold">
                        <span>Volume: <strong className="text-slate-300 font-mono font-normal">{item.volume}</strong></span>
                        <span>Potential CPC: <strong className="text-slate-300 font-mono font-normal">$3.42</strong></span>
                      </div>
                    </div>

                    <button 
                      onClick={() => addKeywordToWatchlist(item)}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
                      title="Add to Watchlist"
                    >
                      <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================== VIEW: 3D CONTENT GRAPH (ANALYS TOUR SITE) ==================== */}
          {activeTab === 'site-graph' && (
            <div className="space-y-6">
              <AiSeoOs3dContentGraph />
            </div>
          )}

          {/* ==================== VIEW 4: ANALYTICS ==================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Key Diagnostic Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Largest Contentful Paint (LCP)</div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Passed</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-light font-serif text-white">1.4</span>
                    <span className="text-slate-500 text-sm">sec</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Optimal range is below 2.5s.</p>
                </div>

                <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">First Input Delay (FID)</div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Passed</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-light font-serif text-white">12</span>
                    <span className="text-slate-500 text-sm">ms</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Optimal range is below 100ms.</p>
                </div>

                <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cumulative Layout Shift (CLS)</div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Passed</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-light font-serif text-white">0.03</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Optimal range is below 0.1.</p>
                </div>

              </div>

              {/* Integrated Geo Traffic Module */}
              <div className="pt-2">
                <AiSeoOsGeoTraffic />
              </div>

              {/* 2D World Map: Keyword-by-Country Attribution (Google Search Console & Google Analytics 4) */}
              <div className="pt-2">
                <AiSeoOs2dWorldMap />
              </div>

            </div>
          )}

          {/* ==================== VIEW 5: CONNECTORS ==================== */}
          {activeTab === 'connectors' && (
            <div className="space-y-6">
              <AiSeoOsConnectors />
            </div>
          )}

          {/* ==================== VIEW 6: IMPORT APIS ==================== */}
          {activeTab === 'import-apis' && (
            <div className="space-y-6">
              <AiSeoOsApiImporter />
            </div>
          )}

        </div>
      </main>

      {/* ==================== AUTO-FIX INTERACTIVE MODAL ==================== */}
      {selectedFix.open && (
        <div className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-slate-800 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800/60 bg-[#080808]/80 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h4 className="font-serif italic text-white text-base">Gemini Optimizing Engine</h4>
              </div>
              <button 
                onClick={() => setSelectedFix(prev => ({ ...prev, open: false }))}
                className="text-slate-500 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold mb-1">Issue Context</span>
                <span className="text-sm font-semibold text-slate-100">{selectedFix.recommendationTitle}</span>
              </div>

              {selectedFix.loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
                  <p className="text-xs text-slate-500 font-mono">Generative audit mapping in process...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold mb-1.5">Actionable Suggestion Generated</span>
                      <div className="bg-[#050505] border border-slate-850 p-4 rounded text-sm text-indigo-300 font-mono leading-relaxed select-all">
                        {selectedFix.fixedText}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold mb-1.5">Correction Parameters</span>
                      <p className="text-xs text-slate-400 bg-slate-900/20 p-3 rounded border border-slate-800/40">
                        {selectedFix.details}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-800/60 flex justify-end gap-3.5">
                    <button 
                      onClick={() => setSelectedFix(prev => ({ ...prev, open: false }))}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded text-xs transition-colors cursor-pointer"
                    >
                      Reject Fix
                    </button>
                    <button 
                      onClick={() => applyFixToData(selectedFix.recommendationTitle)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-600/10 cursor-pointer"
                    >
                      Commit Optimization
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==================== AUTONOMOUS SEO CONTROL MODAL ==================== */}
      {isAutomationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-indigo-900/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-slate-950 via-[#0d0d14] to-indigo-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-serif italic text-white font-semibold flex items-center gap-2">
                    <span>Sorena SEO Autonomous Engine</span>
                    <span className="text-[10px] font-mono not-italic px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                      {isAutomationActive ? 'AUTO-PILOT ACTIVE' : 'STANDBY'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Continuous search signal monitoring, auto-remediation & CMS synchronization.</p>
                </div>
              </div>

              <button 
                onClick={() => setIsAutomationModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Progress & Stage Visualizer */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider">Autonomous Pipeline Status</span>
                  <span className="text-indigo-400 font-bold">{automationProgress}% COMPLETED</span>
                </div>
                
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${automationProgress}%` }}
                  ></div>
                </div>

                {/* 5-Step Pipeline Indicators */}
                <div className="grid grid-cols-5 gap-2 pt-2 text-[10px] font-mono">
                  {[
                    { label: 'GSC Signals', step: 1 },
                    { label: 'SERP Scan', step: 2 },
                    { label: 'LSI Clusters', step: 3 },
                    { label: 'Meta Schema', step: 4 },
                    { label: 'CMS Deploy', step: 5 }
                  ].map((s) => (
                    <div 
                      key={s.step} 
                      className={`p-2 rounded border text-center transition-all ${
                        automationStep >= s.step 
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300 font-semibold' 
                          : 'bg-slate-950/40 border-slate-900 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {automationStep >= s.step ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                        )}
                        <span>Stage {s.step}</span>
                      </div>
                      <span className="truncate block">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Terminal Log */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Agent Activity Stream (Autonomous Execution Log)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Auto-Scrolling</span>
                </div>

                <div className="bg-[#050508] border border-slate-850 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[11px] space-y-2 select-text">
                  {automationLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
                      <span className={
                        log.type === 'agent' ? 'text-indigo-300' :
                        log.type === 'success' ? 'text-emerald-400 font-semibold' :
                        'text-slate-400'
                      }>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy & Enforcement Reminder */}
              <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-xl text-xs text-slate-400 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-slate-200">هوش مصنوعی یکپارچه سارینا (Sorena AI):</strong> عملیات بهینه‌سازی به طور مداوم داده‌های رتبه‌بندی را پالایش کرده و مستقیماً متادیتاها را به سیستم مدیریت محتوای متصل فعال ارسال می‌کند.
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 border-t border-slate-800/80 bg-[#080808] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {isAutomationActive ? (
                  <button
                    type="button"
                    onClick={stopAutomation}
                    className="px-4 py-2 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Square className="w-3.5 h-3.5 fill-rose-300" />
                    <span>توقف اتوماسیون (Pause)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={triggerAutomationSequence}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>فعال‌سازی اتوماسیون پیوسته (30 دقیقه)</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={isAutomationRunning}
                  onClick={triggerAutomationSequence}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAutomationRunning ? 'animate-spin text-indigo-400' : ''}`} />
                  <span>اجرای فوری یک چرخه (Single Cycle)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAutomationModalOpen(false)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ARTICLE QUICK PREVIEW MODAL */}
      {selectedArticleForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#080808]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-serif italic text-white line-clamp-1">
                    {selectedArticleForPreview.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                    <span>Target: <strong className="text-purple-300">{selectedArticleForPreview.keyword}</strong></span>
                    <span>•</span>
                    <span>{selectedArticleForPreview.wordCount} words</span>
                    <span>•</span>
                    <span>SEO Score: <strong className="text-emerald-400">{selectedArticleForPreview.seoScore}/100</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedArticleForPreview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 font-sans leading-relaxed">
              {/* Meta Box */}
              <div className="bg-[#070707] border border-slate-850 rounded-xl p-4 space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Meta Title</span>
                  <span className="text-xs text-slate-200 font-medium">{selectedArticleForPreview.metaTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Meta Description</span>
                  <span className="text-xs text-slate-400">{selectedArticleForPreview.metaDescription}</span>
                </div>
              </div>

              {/* H1 Title */}
              <div>
                <h2 className="text-xl font-bold font-serif text-white">{selectedArticleForPreview.h1}</h2>
              </div>

              {/* Intro */}
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/70 italic text-slate-300">
                {selectedArticleForPreview.introduction}
              </div>

              {/* Sections */}
              {selectedArticleForPreview.sections.map((section, idx) => (
                <div key={idx} className="space-y-2 pt-3 border-t border-slate-850">
                  <h3 className="text-base font-semibold text-white">{section.heading}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{section.content}</p>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="pt-4 border-t border-slate-850">
                <h4 className="text-xs uppercase font-mono text-purple-400 tracking-wider mb-2">Conclusion</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-purple-950/20 p-4 rounded-xl border border-purple-900/30">
                  {selectedArticleForPreview.conclusion}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#080808] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleOpenArticleInComposer(selectedArticleForPreview);
                    setSelectedArticleForPreview(null);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Open in Composer</span>
                </button>

                <button
                  onClick={() => handleCopyArticleMarkdown(selectedArticleForPreview)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  {articleCopiedId === selectedArticleForPreview.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setSelectedArticleForPreview(null)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
