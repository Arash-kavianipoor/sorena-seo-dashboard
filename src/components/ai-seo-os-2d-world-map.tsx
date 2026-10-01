import React, { useState, useMemo, useRef } from 'react';
import { 
  Globe, 
  Search, 
  RefreshCw, 
  ArrowUpRight, 
  Database, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  BarChart3,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Navigation,
  MousePointerClick
} from 'lucide-react';
import { feature } from 'topojson-client';
import countriesData from 'world-atlas/countries-110m.json';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo';

export type DataSource = 'all' | 'gsc' | 'ga4';

export interface KeywordEntry {
  query: string;
  clicks: number;
  impressions: number;
  ctr: string;
  avgPosition: number;
  intent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  source: 'Google Search Console' | 'Google Analytics 4' | 'Both';
}

export interface CountryTrafficNode {
  id: string;
  numericCode: string; // ISO 3166-1 numeric
  name: string;
  persianName: string;
  code: string;
  flag: string;
  coordinates: [number, number]; // [longitude, latitude]
  totalVisitors: number;
  totalClicks: number;
  totalImpressions: number;
  gscShare: number; // percentage
  ga4Share: number;
  growth: string;
  topKeywords: KeywordEntry[];
}

const COUNTRIES_REGISTRY: CountryTrafficNode[] = [
  {
    id: 'us',
    numericCode: '840',
    name: 'United States',
    persianName: 'ایالات متحده',
    code: 'US',
    flag: '🇺🇸',
    coordinates: [-98.5, 39.5],
    totalVisitors: 48200,
    totalClicks: 39400,
    totalImpressions: 412000,
    gscShare: 65,
    ga4Share: 35,
    growth: '+18.4%',
    topKeywords: [
      { query: 'neural seo tools', clicks: 14280, impressions: 110200, ctr: '12.9%', avgPosition: 2.1, intent: 'Commercial', source: 'Both' },
      { query: 'ai search audit platform', clicks: 9450, impressions: 84000, ctr: '11.2%', avgPosition: 3.4, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'automated keyword clustering', clicks: 7120, impressions: 68900, ctr: '10.3%', avgPosition: 4.2, intent: 'Informational', source: 'Both' },
      { query: 'serp semantic optimization', clicks: 4980, impressions: 52000, ctr: '9.5%', avgPosition: 3.8, intent: 'Commercial', source: 'Google Analytics 4' },
      { query: 'gemma llm seo ranker', clicks: 3570, impressions: 42000, ctr: '8.5%', avgPosition: 5.1, intent: 'Informational', source: 'Google Search Console' },
    ]
  },
  {
    id: 'ir',
    numericCode: '364',
    name: 'Iran',
    persianName: 'ایران',
    code: 'IR',
    flag: '🇮🇷',
    coordinates: [53.68, 32.42],
    totalVisitors: 21400,
    totalClicks: 17800,
    totalImpressions: 195000,
    gscShare: 72,
    ga4Share: 28,
    growth: '+34.2%',
    topKeywords: [
      { query: 'ابزار سئو هوش مصنوعی', clicks: 6850, impressions: 54000, ctr: '12.7%', avgPosition: 1.4, intent: 'Commercial', source: 'Both' },
      { query: 'آنالیز کلمات کلیدی با هوش مصنوعی', clicks: 4920, impressions: 41200, ctr: '11.9%', avgPosition: 1.8, intent: 'Informational', source: 'Google Search Console' },
      { query: 'تولید محتوا با جمنای و سئو', clicks: 3640, impressions: 32000, ctr: '11.4%', avgPosition: 2.1, intent: 'Transactional', source: 'Both' },
      { query: 'کلاسترینگ کلمات کلیدی فارسی', clicks: 2390, impressions: 21800, ctr: '10.9%', avgPosition: 2.5, intent: 'Informational', source: 'Google Analytics 4' },
    ]
  },
  {
    id: 'gb',
    numericCode: '826',
    name: 'United Kingdom',
    persianName: 'بریتانیا',
    code: 'GB',
    flag: '🇬🇧',
    coordinates: [-1.17, 52.35],
    totalVisitors: 19800,
    totalClicks: 16200,
    totalImpressions: 174000,
    gscShare: 58,
    ga4Share: 42,
    growth: '+11.2%',
    topKeywords: [
      { query: 'ai seo software uk', clicks: 6850, impressions: 61000, ctr: '11.2%', avgPosition: 3.2, intent: 'Commercial', source: 'Both' },
      { query: 'enterprise keyword intelligence', clicks: 4210, impressions: 41500, ctr: '10.1%', avgPosition: 4.0, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'semantic audit london', clicks: 3140, impressions: 29800, ctr: '10.5%', avgPosition: 2.9, intent: 'Commercial', source: 'Google Analytics 4' },
      { query: 'search console automation api', clicks: 2000, impressions: 23100, ctr: '8.6%', avgPosition: 5.4, intent: 'Informational', source: 'Both' },
    ]
  },
  {
    id: 'de',
    numericCode: '276',
    name: 'Germany',
    persianName: 'آلمان',
    code: 'DE',
    flag: '🇩🇪',
    coordinates: [10.45, 51.16],
    totalVisitors: 14600,
    totalClicks: 11900,
    totalImpressions: 135000,
    gscShare: 62,
    ga4Share: 38,
    growth: '+24.5%',
    topKeywords: [
      { query: 'suchmaschinenoptimierung ki', clicks: 5420, impressions: 48000, ctr: '11.2%', avgPosition: 2.8, intent: 'Commercial', source: 'Both' },
      { query: 'ki seo tools deutschland', clicks: 3680, impressions: 34200, ctr: '10.7%', avgPosition: 3.1, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'keyword cluster erstellen software', clicks: 2800, impressions: 29000, ctr: '9.6%', avgPosition: 4.5, intent: 'Informational', source: 'Both' },
    ]
  },
  {
    id: 'ca',
    numericCode: '124',
    name: 'Canada',
    persianName: 'کانادا',
    code: 'CA',
    flag: '🇨🇦',
    coordinates: [-106.34, 56.13],
    totalVisitors: 11200,
    totalClicks: 9200,
    totalImpressions: 98000,
    gscShare: 60,
    ga4Share: 40,
    growth: '+14.7%',
    topKeywords: [
      { query: 'semantic seo canada', clicks: 3820, impressions: 35000, ctr: '10.9%', avgPosition: 3.1, intent: 'Commercial', source: 'Both' },
      { query: 'ai keyword research toronto', clicks: 2650, impressions: 24800, ctr: '10.6%', avgPosition: 3.5, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'serp tracking dashboard vancouver', clicks: 1630, impressions: 16400, ctr: '9.9%', avgPosition: 4.8, intent: 'Informational', source: 'Google Analytics 4' },
    ]
  },
  {
    id: 'fr',
    numericCode: '250',
    name: 'France',
    persianName: 'فرانسه',
    code: 'FR',
    flag: '🇫🇷',
    coordinates: [2.21, 46.22],
    totalVisitors: 8900,
    totalClicks: 7200,
    totalImpressions: 81000,
    gscShare: 55,
    ga4Share: 45,
    growth: '+9.3%',
    topKeywords: [
      { query: 'optimisation seo ia', clicks: 3450, impressions: 32000, ctr: '10.7%', avgPosition: 2.9, intent: 'Commercial', source: 'Both' },
      { query: 'audit sémantique intelligence artificielle', clicks: 2310, impressions: 22400, ctr: '10.3%', avgPosition: 3.6, intent: 'Informational', source: 'Google Search Console' },
      { query: 'analyseur mots clés automatique', clicks: 1440, impressions: 15200, ctr: '9.4%', avgPosition: 4.3, intent: 'Transactional', source: 'Google Analytics 4' },
    ]
  },
  {
    id: 'in',
    numericCode: '356',
    name: 'India',
    persianName: 'هند',
    code: 'IN',
    flag: '🇮🇳',
    coordinates: [78.96, 20.59],
    totalVisitors: 15400,
    totalClicks: 12600,
    totalImpressions: 142000,
    gscShare: 68,
    ga4Share: 32,
    growth: '+28.2%',
    topKeywords: [
      { query: 'best ai seo tools 2025', clicks: 5210, impressions: 49000, ctr: '10.6%', avgPosition: 3.2, intent: 'Informational', source: 'Both' },
      { query: 'free keyword cluster generator', clicks: 3880, impressions: 38400, ctr: '10.1%', avgPosition: 3.8, intent: 'Commercial', source: 'Google Search Console' },
      { query: 'google search console ranking checker', clicks: 2710, impressions: 27500, ctr: '9.8%', avgPosition: 4.5, intent: 'Transactional', source: 'Both' },
    ]
  },
  {
    id: 'jp',
    numericCode: '392',
    name: 'Japan',
    persianName: 'ژاپن',
    code: 'JP',
    flag: '🇯🇵',
    coordinates: [138.25, 36.20],
    totalVisitors: 8400,
    totalClicks: 6800,
    totalImpressions: 78000,
    gscShare: 52,
    ga4Share: 48,
    growth: '+6.4%',
    topKeywords: [
      { query: '人工知能 seo ツール', clicks: 3520, impressions: 34000, ctr: '10.3%', avgPosition: 4.1, intent: 'Commercial', source: 'Both' },
      { query: '検索エンジン 最適化 ai', clicks: 2180, impressions: 22100, ctr: '9.8%', avgPosition: 4.6, intent: 'Informational', source: 'Google Search Console' },
      { query: 'キーワード クラスタリング ツール', clicks: 1100, impressions: 12500, ctr: '8.8%', avgPosition: 5.2, intent: 'Transactional', source: 'Google Analytics 4' },
    ]
  },
  {
    id: 'ae',
    numericCode: '784',
    name: 'United Arab Emirates',
    persianName: 'امارات متحده',
    code: 'AE',
    flag: '🇦🇪',
    coordinates: [53.84, 23.42],
    totalVisitors: 6900,
    totalClicks: 5600,
    totalImpressions: 61000,
    gscShare: 64,
    ga4Share: 36,
    growth: '+19.8%',
    topKeywords: [
      { query: 'seo tools dubai', clicks: 2710, impressions: 25000, ctr: '10.8%', avgPosition: 2.7, intent: 'Commercial', source: 'Both' },
      { query: 'ai ranking software uae', clicks: 1820, impressions: 17800, ctr: '10.2%', avgPosition: 3.1, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'arabic semantic keyword analysis', clicks: 1070, impressions: 11200, ctr: '9.5%', avgPosition: 4.2, intent: 'Informational', source: 'Google Analytics 4' },
    ]
  },
  {
    id: 'au',
    numericCode: '036',
    name: 'Australia',
    persianName: 'استرالیا',
    code: 'AU',
    flag: '🇦🇺',
    coordinates: [133.77, -25.27],
    totalVisitors: 7200,
    totalClicks: 5900,
    totalImpressions: 68000,
    gscShare: 59,
    ga4Share: 41,
    growth: '+8.7%',
    topKeywords: [
      { query: 'automated seo software sydney', clicks: 2640, impressions: 25000, ctr: '10.5%', avgPosition: 3.6, intent: 'Commercial', source: 'Both' },
      { query: 'melbourne ai search audit', clicks: 1890, impressions: 18200, ctr: '10.3%', avgPosition: 3.9, intent: 'Transactional', source: 'Google Search Console' },
      { query: 'ranking drops diagnostics tools', clicks: 1370, impressions: 14100, ctr: '9.7%', avgPosition: 4.8, intent: 'Informational', source: 'Both' },
    ]
  },
  {
    id: 'br',
    numericCode: '076',
    name: 'Brazil',
    persianName: 'برزیل',
    code: 'BR',
    flag: '🇧🇷',
    coordinates: [-51.92, -14.23],
    totalVisitors: 6400,
    totalClicks: 5100,
    totalImpressions: 59000,
    gscShare: 66,
    ga4Share: 34,
    growth: '+21.0%',
    topKeywords: [
      { query: 'ferramentas de seo com ia', clicks: 2540, impressions: 24000, ctr: '10.5%', avgPosition: 3.3, intent: 'Commercial', source: 'Both' },
      { query: 'analise de palavras chave inteligencia artificial', clicks: 1720, impressions: 17100, ctr: '10.0%', avgPosition: 3.9, intent: 'Informational', source: 'Google Search Console' },
    ]
  },
  {
    id: 'tr',
    numericCode: '792',
    name: 'Turkey',
    persianName: 'ترکیه',
    code: 'TR',
    flag: '🇹🇷',
    coordinates: [35.24, 38.96],
    totalVisitors: 5800,
    totalClicks: 4700,
    totalImpressions: 54000,
    gscShare: 63,
    ga4Share: 37,
    growth: '+16.5%',
    topKeywords: [
      { query: 'yapay zeka seo araclari', clicks: 2320, impressions: 22400, ctr: '10.3%', avgPosition: 2.9, intent: 'Commercial', source: 'Both' },
      { query: 'google siralama takip yazilimi', clicks: 1550, impressions: 15800, ctr: '9.8%', avgPosition: 3.7, intent: 'Transactional', source: 'Google Search Console' },
    ]
  }
];

// Map width and height internal SVG canvas coordinate space
const MAP_WIDTH = 960;
const MAP_HEIGHT = 500;

// Smart collision-avoidance label offsets for dense regions (especially Europe and Middle East)
const COUNTRY_LABEL_OFFSETS: Record<string, { dx: number; dy: number }> = {
  gb: { dx: -22, dy: -14 }, // UK: Northwest over the Atlantic Ocean (completely clear of France/Germany)
  fr: { dx: -18, dy: 14 },  // France: Southwest towards Bay of Biscay (clear of UK & Germany)
  de: { dx: 22, dy: -12 },  // Germany: Northeast towards Poland/Baltic (clear of UK & France)
  tr: { dx: 18, dy: 10 },   // Turkey: Southeast towards Mediterranean
  ir: { dx: 18, dy: -10 },  // Iran: Northeast (clear of UAE/Turkey)
  ae: { dx: 18, dy: 12 },   // UAE: Southeast over Arabian Sea
  ca: { dx: 0, dy: -12 },   // Canada: North
  us: { dx: 0, dy: 12 },    // US: South
  br: { dx: 0, dy: 12 },    // Brazil: South
  in: { dx: 0, dy: 12 },    // India: South into Indian Ocean
  jp: { dx: 18, dy: 0 },    // Japan: East into Pacific
  au: { dx: 0, dy: 12 },    // Australia: South
};

export default function AiSeoOs2dWorldMap() {
  const [selectedSource, setSelectedSource] = useState<DataSource>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('ir');
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  
  // Interactive Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Natural Earth 1 projection from d3-geo (Cartographic Gold Standard)
  const { pathGenerator, countryFeatures, graticulePath } = useMemo(() => {
    const projection = geoNaturalEarth1()
      .scale(165)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2 + 10]);

    const pathGen = geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON features
    const topo = countriesData as unknown as { objects: { countries: unknown } };
    const geojson = feature(topo as any, topo.objects.countries as any) as any;
    const countries = geojson.features || [];

    // Generate graticule (lat/long grid)
    const graticule = geoGraticule();
    const gratPath = pathGen(graticule() as any) || '';

    return {
      projection,
      pathGenerator: pathGen,
      countryFeatures: countries,
      graticulePath: gratPath
    };
  }, []);

  // Quick lookup table for traffic nodes by numericCode
  const trafficByNumericCode = useMemo(() => {
    const map = new Map<string, CountryTrafficNode>();
    COUNTRIES_REGISTRY.forEach(c => {
      map.set(c.numericCode, c);
      map.set(String(parseInt(c.numericCode, 10)), c);
    });
    return map;
  }, []);

  // Filter countries by search keyword
  const filteredCountries = useMemo(() => {
    return COUNTRIES_REGISTRY.filter(country => {
      if (!searchFilter.trim()) return true;
      const term = searchFilter.toLowerCase();
      return (
        country.name.toLowerCase().includes(term) ||
        country.persianName.includes(term) ||
        country.code.toLowerCase().includes(term) ||
        country.topKeywords.some(kw => kw.query.toLowerCase().includes(term))
      );
    });
  }, [searchFilter]);

  const selectedCountry = useMemo(() => {
    return COUNTRIES_REGISTRY.find(c => c.id === selectedCountryId) || COUNTRIES_REGISTRY[0];
  }, [selectedCountryId]);

  const activeHoveredOrSelected = useMemo(() => {
    const targetId = hoveredCountryId || selectedCountryId;
    return COUNTRIES_REGISTRY.find(c => c.id === targetId) || selectedCountry;
  }, [hoveredCountryId, selectedCountryId, selectedCountry]);

  // Total organic clicks & impressions
  const totalOrganicClicks = useMemo(() => {
    return filteredCountries.reduce((acc, c) => acc + c.totalClicks, 0);
  }, [filteredCountries]);

  const totalImpressions = useMemo(() => {
    return filteredCountries.reduce((acc, c) => acc + c.totalImpressions, 0);
  }, [filteredCountries]);

  // Center coordinates of selected country on screen for visual targeting
  const projectedHotspots = useMemo(() => {
    const projection = geoNaturalEarth1()
      .scale(165)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2 + 10]);

    return filteredCountries.map(c => {
      const coords = projection(c.coordinates) || [0, 0];
      return {
        ...c,
        screenX: coords[0],
        screenY: coords[1]
      };
    });
  }, [filteredCountries]);

  // Central Hub Node (Cloud Ingestion Server)
  const centralHubScreenCoords = useMemo(() => {
    const projection = geoNaturalEarth1()
      .scale(165)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2 + 10]);
    return projection([15, 45]) || [MAP_WIDTH / 2, MAP_HEIGHT / 2]; // Central Europe / Cloud Server
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.35, 0.8));
  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse pan handlers for SVG container
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  // Sync API Simulation
  const handleSyncData = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatusMsg('در حال دریافت لاگ‌های ژئوگرافیک و کوئری‌های زنده از Google Search Console & Google Analytics 4 API...');
    
    setTimeout(() => {
      setSyncStatusMsg('داده‌های مکانی ترافیک و کلمات کلیدی ورودی بر اساس ۲ منبع GSC و GA4 با موفقیت بروزرسانی شدند.');
      setIsSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }, 1600);
  };

  return (
    <div id="geo-keyword-2d-map-container" className="bg-[#0c0c0c] border border-slate-800/80 rounded-xl p-6 space-y-6">
      
      {/* Top Header & Search Console / Analytics Ingestion Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-400">
              <Globe className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-serif italic text-white font-semibold flex items-center gap-2">
                <span>نقشه ۲ بعدی جغرافیایی ورود ترافیک بر اساس کلمات کلیدی</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 not-italic font-bold">
                  D3 NATURAL EARTH GIS MAP
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                نمایش جغرافیایی واقعی مرزهای کشورهای جهان (Natural Earth TopoJSON): شناسایی دقیق کلمات کلیدی ورودی کاربران از سرچ کنسول و گوگل آنالیتیکس ۴.
              </p>
            </div>
          </div>
        </div>

        {/* Sync & Refresh Toolbar */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] text-slate-400">متصل به:</span>
            <span className="text-emerald-400 font-bold">GSC + GA4 Live API</span>
          </div>

          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-900/20 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-white' : 'text-indigo-200'}`} />
            <span>{isSyncing ? 'دریافت آخرین لاگ‌ها...' : 'همگام‌سازی ترافیک GSC / GA4'}</span>
          </button>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-lg text-xs text-indigo-300 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{syncStatusMsg}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Status: 200 OK • 12 Global Regions Synced</span>
        </div>
      )}

      {/* Filter and Source Selection Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Source Switcher (GSC vs GA4 vs All) */}
        <div className="md:col-span-6 flex items-center gap-1.5 p-1 bg-[#060606] border border-slate-800 rounded-lg">
          <button
            onClick={() => setSelectedSource('all')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              selectedSource === 'all' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>تلفیقی (Unified GSC + GA4)</span>
          </button>

          <button
            onClick={() => setSelectedSource('gsc')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              selectedSource === 'gsc' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Search Console</span>
          </button>

          <button
            onClick={() => setSelectedSource('ga4')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              selectedSource === 'ga4' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Analytics 4</span>
          </button>
        </div>

        {/* Keyword or Country Filter Input */}
        <div className="md:col-span-6 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <Filter className="w-4 h-4 text-indigo-400" />
          </span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="جستجوی کلمه کلیدی یا نام کشور (مثلاً: ابزار سئو, neural seo, ایران, Germany)..."
            className="w-full bg-[#060606] border border-slate-800 text-slate-200 pl-10 pr-4 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600 transition-all"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-slate-200"
            >
              پاکسازی
            </button>
          )}
        </div>

      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 bg-[#070707] border border-slate-800/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">کلیک‌های ارگانیک ثبت شده</div>
          <div className="text-base font-bold text-white mt-0.5">{totalOrganicClicks.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +19.4% رشد ترافیک جستجو
          </div>
        </div>

        <div className="p-3 bg-[#070707] border border-slate-800/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">کل ایمپرشن کلمات کلیدی</div>
          <div className="text-base font-bold text-indigo-400 mt-0.5">{totalImpressions.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">میانگین CTR جهانی: 11.2%</div>
        </div>

        <div className="p-3 bg-[#070707] border border-slate-800/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">کشورهای فعال دارای ورودی</div>
          <div className="text-base font-bold text-teal-300 mt-0.5">{filteredCountries.length} منطقه جغرافیایی</div>
          <div className="text-[10px] text-slate-400 mt-0.5">پوشش کامل سرورهای ابری</div>
        </div>

        <div className="p-3 bg-[#070707] border border-slate-800/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">کشور منتخب برای تحلیل</div>
          <div className="text-base font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name} ({selectedCountry.persianName})</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{selectedCountry.totalClicks.toLocaleString()} کلیک • {selectedCountry.topKeywords.length} کوئری برتر</div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROFESSIONAL 2D VECTOR WORLD MAP (Natural Earth 1 Cartographic Engine)    */}
      {/* ========================================================================= */}
      <div 
        className="relative bg-[#06080d] border border-slate-800/90 rounded-xl overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        
        {/* Map Top-Left Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#090d16]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold">NATURAL EARTH TOPOLOGY • 2D PROJECTION</span>
          </div>
          <div className="text-[10px] text-slate-400 px-1 font-mono flex items-center gap-1">
            <MousePointerClick className="w-3 h-3 text-indigo-400" />
            <span>روی هر کشور کلیک کنید تا کلمات کلیدی و آمار سرچ کنسول لود شود</span>
          </div>
        </div>

        {/* Map Top-Right Zoom & Pan Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#090d16]/90 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-lg">
          <button
            onClick={handleZoomIn}
            title="بزرگنمایی"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="کوچک‌نمایی"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            title="بازنشانی زاویه دید"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <span className="text-[10px] font-mono text-indigo-400 px-1 font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Map Bottom Legend */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-3 bg-[#090d16]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 shadow-lg">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-500/80 border border-indigo-400"></span>
            <span>کشور دارای ترافیک ورودی</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-300"></span>
            <span>کشور انتخاب‌شده</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#121927] border border-slate-800"></span>
            <span>سایر کشورها</span>
          </span>
        </div>

        {/* 2D SVG MAP CANVAS */}
        <div className={`w-full h-80 sm:h-96 md:h-[460px] overflow-hidden flex items-center justify-center ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}>
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-full object-contain"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <defs>
              {/* Subtle ocean grid pattern */}
              <pattern id="carto-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#131d2e" strokeWidth="0.5" strokeOpacity="0.35" />
              </pattern>

              {/* Radial gradient for glowing selection */}
              <radialGradient id="country-selected-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#059669" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ocean background */}
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#070a10" />
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#carto-grid)" />

            {/* Graticule Latitude/Longitude Curved Grid */}
            <path
              d={graticulePath}
              fill="none"
              stroke="#152136"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />

            {/* REAL COUNTRY BOUNDARY POLYGONS FROM NATURAL EARTH WORLD ATLAS */}
            <g className="world-countries-layer">
              {countryFeatures.map((feat: any, idx: number) => {
                const numericCode = String(feat.id).padStart(3, '0');
                const trafficNode = trafficByNumericCode.get(numericCode) || trafficByNumericCode.get(String(feat.id));
                const isSelected = trafficNode && trafficNode.id === selectedCountryId;
                const isHovered = trafficNode && trafficNode.id === hoveredCountryId;
                const hasTraffic = Boolean(trafficNode);

                // Styling logic based on traffic activity
                let fillColor = '#101623'; // Default landmass color
                let strokeColor = '#1c283d';
                let strokeWidth = 0.5;

                if (hasTraffic) {
                  fillColor = '#1e2440'; // Base color for traffic countries
                  strokeColor = '#4338ca';
                  strokeWidth = 0.8;
                }

                if (isHovered) {
                  fillColor = '#312e81';
                  strokeColor = '#6366f1';
                  strokeWidth = 1.2;
                }

                if (isSelected) {
                  fillColor = '#064e3b'; // Highlight selected country in rich emerald
                  strokeColor = '#10b981';
                  strokeWidth = 1.6;
                }

                const d = pathGenerator(feat) || '';
                if (!d) return null;

                return (
                  <path
                    key={`country-${feat.id || idx}`}
                    d={d}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-colors duration-200 cursor-pointer"
                    onMouseEnter={() => {
                      if (trafficNode) setHoveredCountryId(trafficNode.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredCountryId(null);
                    }}
                    onClick={() => {
                      if (trafficNode) setSelectedCountryId(trafficNode.id);
                    }}
                  />
                );
              })}
            </g>

            {/* Dynamic Connecting Curved Arcs from visitor hotspots to Central Server */}
            <g className="traffic-arcs-layer" pointerEvents="none">
              {projectedHotspots.map(spot => {
                const isCurrent = spot.id === selectedCountryId;
                const midX = (spot.screenX + centralHubScreenCoords[0]) / 2;
                const midY = Math.min(spot.screenY, centralHubScreenCoords[1]) - 45;
                const arcPath = `M ${spot.screenX} ${spot.screenY} Q ${midX} ${midY} ${centralHubScreenCoords[0]} ${centralHubScreenCoords[1]}`;

                return (
                  <path
                    key={`arc-${spot.id}`}
                    d={arcPath}
                    fill="none"
                    stroke={isCurrent ? '#34d399' : '#4f46e5'}
                    strokeWidth={isCurrent ? '1.8' : '0.75'}
                    strokeDasharray={isCurrent ? '5 3' : 'none'}
                    opacity={isCurrent ? 0.95 : 0.3}
                  />
                );
              })}
            </g>

            {/* Central Cloud Node Marker (SEO Server Ingestion) */}
            <g transform={`translate(${centralHubScreenCoords[0]}, ${centralHubScreenCoords[1]})`} pointerEvents="none">
              <circle r="12" fill="#4338ca" opacity="0.25" className="animate-ping" />
              <circle r="5" fill="#6366f1" stroke="#c7d2fe" strokeWidth="1.5" />
              <rect x="-35" y="10" width="70" height="15" rx="3" fill="#090d16" stroke="#312e81" strokeWidth="0.8" opacity="0.9" />
              <text y="21" textAnchor="middle" fill="#a5b4fc" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                SEO_HUB_CORE
              </text>
            </g>

            {/* INTERACTIVE TRAFFIC HOTSPOT PINS & PULSING BEACONS */}
            <g className="hotspots-layer">
              {projectedHotspots.map(spot => {
                const isSelected = spot.id === selectedCountryId;
                const isHovered = spot.id === hoveredCountryId;
                const trafficIntensity = Math.min(spot.totalClicks / 40000, 1);
                
                // Sleek, cartographically proportional pin sizes (prevent crowding in dense regions like Europe)
                const pinRadius = 2.4 + trafficIntensity * 1.2;
                const offset = COUNTRY_LABEL_OFFSETS[spot.id] || { dx: 0, dy: 10 };
                const hasDisplacement = Math.abs(offset.dx) > 4 || Math.abs(offset.dy) > 10;

                return (
                  <g
                    key={`hotspot-${spot.id}`}
                    transform={`translate(${spot.screenX}, ${spot.screenY})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedCountryId(spot.id)}
                    onMouseEnter={() => setHoveredCountryId(spot.id)}
                    onMouseLeave={() => setHoveredCountryId(null)}
                  >
                    {/* Subtle Connecting Leader Line to Displaced Tag */}
                    {hasDisplacement && (
                      <line
                        x1="0"
                        y1="0"
                        x2={offset.dx}
                        y2={offset.dy}
                        stroke={isSelected ? '#10b981' : isHovered ? '#818cf8' : '#334155'}
                        strokeWidth="0.6"
                        strokeDasharray="1.5 1.5"
                        opacity="0.8"
                      />
                    )}

                    {/* Animated Ripple solely for selected or high-traffic on hover */}
                    {isSelected && (
                      <circle
                        r={pinRadius * 2.2}
                        className="fill-emerald-400/25 animate-ping"
                      />
                    )}

                    {/* Outer Border Halo */}
                    <circle
                      r={pinRadius + 1.5}
                      fill={isSelected ? '#10b981' : isHovered ? '#60a5fa' : '#6366f1'}
                      opacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.4}
                    />

                    {/* Central Pin Dot */}
                    <circle
                      r={pinRadius}
                      fill={isSelected ? '#34d399' : '#ffffff'}
                      stroke={isSelected ? '#064e3b' : '#312e81'}
                      strokeWidth="0.8"
                    />

                    {/* Compact Country Code & Flag Tag (No overlap in Europe or elsewhere) */}
                    <g transform={`translate(${offset.dx}, ${offset.dy})`}>
                      <rect
                        x="-14"
                        y="-5.5"
                        width="28"
                        height="11"
                        rx="2.5"
                        fill={isSelected ? '#064e3b' : '#0a0f1d'}
                        stroke={isSelected ? '#10b981' : isHovered ? '#6366f1' : '#1e293b'}
                        strokeWidth="0.8"
                        opacity="0.95"
                      />
                      <text
                        textAnchor="middle"
                        y="2.5"
                        fill={isSelected ? '#a7f3d0' : isHovered ? '#ffffff' : '#cbd5e1'}
                        fontSize="6.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {spot.flag} {spot.code}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Hover / Selected Country Floating Card Overlay */}
        {activeHoveredOrSelected && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-20 bg-[#090d16]/95 backdrop-blur-md border border-indigo-900/60 p-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeHoveredOrSelected.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white font-mono">
                    {activeHoveredOrSelected.name} ({activeHoveredOrSelected.persianName})
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                    {activeHoveredOrSelected.growth}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>کلمه کلیدی ورودی برتر:</span>
                  <span className="text-indigo-300 font-mono font-medium truncate max-w-[180px]">
                    "{activeHoveredOrSelected.topKeywords[0]?.query}"
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-mono font-bold text-indigo-400">
                {activeHoveredOrSelected.totalClicks.toLocaleString()} کلیک
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {activeHoveredOrSelected.gscShare}% GSC • {activeHoveredOrSelected.ga4Share}% GA4
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* KEYWORD & COUNTRY IN-DEPTH BREAKDOWN TABLE (Search Console & GA4)         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Selected Country Detailed Profile */}
        <div className="lg:col-span-5 bg-[#080808] border border-slate-800/80 rounded-xl p-5 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{selectedCountry.flag}</span>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedCountry.name}</span>
                  <span className="text-xs font-normal text-slate-400">({selectedCountry.persianName})</span>
                </h4>
                <div className="text-[10px] font-mono text-slate-500">
                  ISO Code: {selectedCountry.code} • مختصات: {selectedCountry.coordinates[1]}°, {selectedCountry.coordinates[0]}°
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs font-mono font-semibold">
              {selectedCountry.growth}
            </span>
          </div>

          {/* Acquisition Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#0c0c0c] border border-slate-800/80 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase font-mono">Google Search Console</span>
              <div className="text-base font-bold text-cyan-400 mt-1">
                {Math.round(selectedCountry.totalClicks * (selectedCountry.gscShare / 100)).toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                سهم {selectedCountry.gscShare}٪ از کلیک‌های مستقیم ارگانیک
              </p>
            </div>

            <div className="p-3 bg-[#0c0c0c] border border-slate-800/80 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase font-mono">Google Analytics 4</span>
              <div className="text-base font-bold text-amber-400 mt-1">
                {Math.round(selectedCountry.totalVisitors * (selectedCountry.ga4Share / 100)).toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                سهم {selectedCountry.ga4Share}٪ از نشست‌های کامل کاربران
              </p>
            </div>
          </div>

          {/* Source distribution visual bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-cyan-400 flex items-center gap-1">
                <Search className="w-3 h-3" /> Search Console ({selectedCountry.gscShare}%)
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                GA4 Sessions ({selectedCountry.ga4Share}%) <BarChart3 className="w-3 h-3" />
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-900">
              <div style={{ width: `${selectedCountry.gscShare}%` }} className="bg-cyan-500 h-full"></div>
              <div style={{ width: `${selectedCountry.ga4Share}%` }} className="bg-amber-500 h-full"></div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-xs text-slate-300 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تحلیل جغرافیایی هوشمند ترافیک:</span>
            </div>
            <p className="text-[11px] text-slate-400">
              بیشترین نرخ تبدیل و زمان حضور روی صفحات از مبدأ <strong>{selectedCountry.persianName}</strong> با کوئری‌های با نیت تجاری و جستجوی ابزارهای هوش مصنوعی به دست آمده است.
            </p>
          </div>

        </div>

        {/* Right 7 Cols: Specific Keywords Driving Entry from this Country */}
        <div className="lg:col-span-7 bg-[#080808] border border-slate-800/80 rounded-xl p-5 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
            <div>
              <h4 className="text-sm font-serif italic text-white font-semibold flex items-center gap-2">
                <span>کلمات کلیدی ورودی از {selectedCountry.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 not-italic border border-slate-800 font-bold">
                  {selectedCountry.topKeywords.length} کوئری اصلی
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                کلمات کلیدی دقیقی که کاربران این کشور با سرچ آن‌ها در گوگل وارد صفحات سایت شده‌اند
              </p>
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              دیتابیس: <strong className="text-indigo-400">{selectedSource.toUpperCase()}</strong>
            </span>
          </div>

          {/* Keywords Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  <th className="pb-2 text-right">کلمه کلیدی ورودی (Search Query)</th>
                  <th className="pb-2 text-center">هدف (Intent)</th>
                  <th className="pb-2 text-center">رتبه در گوگل</th>
                  <th className="pb-2 text-center">CTR</th>
                  <th className="pb-2 text-left">کلیک ارگانیک</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/30">
                {selectedCountry.topKeywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    
                    <td className="py-3 font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-slate-400">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-slate-100 font-mono font-medium block">
                            {kw.query}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            منبع: {kw.source}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 text-center">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        kw.intent === 'Commercial' 
                          ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800/50' 
                          : kw.intent === 'Transactional'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                          : 'bg-teal-950/60 text-teal-300 border-teal-800/50'
                      }`}>
                        {kw.intent}
                      </span>
                    </td>

                    <td className="py-3 text-center font-mono text-slate-300 font-semibold">
                      #{kw.avgPosition}
                    </td>

                    <td className="py-3 text-center font-mono text-slate-400">
                      {kw.ctr}
                    </td>

                    <td className="py-3 text-left font-mono font-bold text-indigo-400">
                      {kw.clicks.toLocaleString()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Table Insights */}
          <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
            <span className="flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              تمامی داده‌های کلمات کلیدی با API سرچ کنسول و GA4 به طور بلادرنگ هماهنگ می‌باشند.
            </span>

            <button
              onClick={handleSyncData}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>درخواست گزارش جامع‌تر کوئری‌ها</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
