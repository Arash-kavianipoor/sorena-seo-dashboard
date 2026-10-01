import React, { useState, useEffect } from 'react';
import { 
  Key, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Save, 
  Check, 
  Eye, 
  EyeOff, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  Info, 
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Search,
  FileText,
  Network,
  Share2,
  BarChart2,
  Flame,
  Bot
} from 'lucide-react';

export type ProviderId = 'gemini' | 'nvidia' | 'chatgpt' | 'claude' | 'grok';

export interface ProviderConfig {
  id: ProviderId;
  name: string;
  persianName: string;
  brandColor: string;
  badgeColor: string;
  borderColor: string;
  isMandatory: boolean;
  dedicatedNote?: string;
  description: string;
  placeholder: string;
  icon: string;
}

const PROVIDERS: ProviderConfig[] = [
  {
    id: 'gemini',
    name: 'Gemini',
    persianName: 'جمنای',
    brandColor: 'from-indigo-600 to-violet-600',
    badgeColor: 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300',
    borderColor: 'border-indigo-500/40',
    isMandatory: true,
    description: 'موتور اصلی هوش مصنوعی برای تولید محتوا، تحلیل نگارشی و پاسخ‌های بلادرنگ (Gemini 2.5 Flash / Pro).',
    placeholder: 'AIzaSy...',
    icon: 'Sparkles'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    persianName: 'انویدیا',
    brandColor: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300',
    borderColor: 'border-emerald-500/40',
    isMandatory: true,
    dedicatedNote: 'اختصاصی برای مدل Gemma (NVIDIA NIM)',
    description: 'سرویس پردازشی فوق‌سریع انویدیا منحصراً برای اجرای مدل Gemma و تبدیل‌های برداری (Embedding).',
    placeholder: 'nvapi-...',
    icon: 'Cpu'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    persianName: 'چت‌جی‌پی‌تی (OpenAI)',
    brandColor: 'from-teal-600 to-cyan-600',
    badgeColor: 'bg-teal-950/60 border-teal-700/60 text-teal-300',
    borderColor: 'border-teal-500/40',
    isMandatory: false,
    description: 'پشتیبان تحلیلی و فیل‌اور تکمیلی برای تولید استراتژی و پرامپت‌های پیچیده سئو (GPT-4o).',
    placeholder: 'sk-proj-...',
    icon: 'Bot'
  },
  {
    id: 'claude',
    name: 'Claude',
    persianName: 'کلود (Anthropic)',
    brandColor: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-950/60 border-amber-700/60 text-amber-300',
    borderColor: 'border-amber-500/40',
    isMandatory: false,
    description: 'مدل قدرتمند آنتروپیک برای نگارش انسانی، بازنویسی روان متن‌های تخصصی و درک بافتی عمیق.',
    placeholder: 'sk-ant-api03-...',
    icon: 'Layers'
  },
  {
    id: 'grok',
    name: 'Grok',
    persianName: 'گروک (xAI)',
    brandColor: 'from-rose-600 to-pink-600',
    badgeColor: 'bg-rose-950/60 border-rose-700/60 text-rose-300',
    borderColor: 'border-rose-500/40',
    isMandatory: false,
    description: 'موتور پردازشی xAI برای ترندشناسی بلادرنگ، رصد کوئری‌های داغ وب و داده‌های زنده.',
    placeholder: 'xai-...',
    icon: 'Flame'
  }
];

const STORAGE_KEY = 'ai_seo_os_imported_api_vault_v1';

// 10 slots initialized for each of the 5 providers
const generateEmptyState = (): Record<ProviderId, string[]> => {
  return {
    gemini: Array(10).fill(''),
    nvidia: Array(10).fill(''),
    chatgpt: Array(10).fill(''),
    claude: Array(10).fill(''),
    grok: Array(10).fill('')
  };
};

export default function AiSeoOsApiImporter() {
  const [apiKeys, setApiKeys] = useState<Record<ProviderId, string[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const state = generateEmptyState();
        PROVIDERS.forEach(p => {
          if (Array.isArray(parsed[p.id])) {
            state[p.id] = Array.from({ length: 10 }, (_, i) => parsed[p.id][i] || '');
          }
        });
        return state;
      }
    } catch (e) {
      console.error('Error loading API keys from storage', e);
    }
    return generateEmptyState();
  });

  const [activeProvider, setActiveProvider] = useState<ProviderId>('gemini');
  const [showMasked, setShowMasked] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSlot, setCopiedSlot] = useState<string | null>(null);
  const [importExportMsg, setImportExportMsg] = useState<string | null>(null);

  // Count active keys per provider
  const getFilledCount = (providerId: ProviderId) => {
    return apiKeys[providerId].filter(k => k.trim().length > 0).length;
  };

  const geminiCount = getFilledCount('gemini');
  const nvidiaCount = getFilledCount('nvidia');
  const isMandatoryMet = geminiCount >= 1 && nvidiaCount >= 1;

  const handleKeyChange = (providerId: ProviderId, index: number, value: string) => {
    setApiKeys(prev => {
      const copy = [...prev[providerId]];
      copy[index] = value;
      return { ...prev, [providerId]: copy };
    });
    setSavedSuccess(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apiKeys));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const toggleMask = (keyId: string) => {
    setShowMasked(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string, slotId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSlot(slotId);
    setTimeout(() => setCopiedSlot(null), 2000);
  };

  const clearSlot = (providerId: ProviderId, index: number) => {
    handleKeyChange(providerId, index, '');
  };

  const clearAllForProvider = (providerId: ProviderId) => {
    if (confirm(`آیا از پاک کردن تمامی ۱۰ کلید ${providerId.toUpperCase()} اطمینان دارید؟`)) {
      setApiKeys(prev => ({ ...prev, [providerId]: Array(10).fill('') }));
      setSavedSuccess(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(apiKeys, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai-seo-os-keys-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setImportExportMsg('نسخه پشتیبان JSON با موفقیت دریافت شد.');
    setTimeout(() => setImportExportMsg(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const newState = generateEmptyState();
        PROVIDERS.forEach(p => {
          if (Array.isArray(parsed[p.id])) {
            newState[p.id] = Array.from({ length: 10 }, (_, i) => parsed[p.id][i] || '');
          }
        });
        setApiKeys(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        setImportExportMsg('کلیدها با موفقیت از فایل بارگذاری و ذخیره شدند.');
        setSavedSuccess(true);
        setTimeout(() => setImportExportMsg(null), 3000);
      } catch (err) {
        alert('فرمت فایل JSON نامعتبر است.');
      }
    };
    reader.readAsText(file);
  };

  const currentProviderConfig = PROVIDERS.find(p => p.id === activeProvider)!;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Instructions */}
      <div className="bg-[#0c0c0c] border border-slate-800/80 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-950/50 border border-indigo-800/40 rounded-lg text-indigo-400">
                <Key className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-serif italic text-white font-semibold">
                مدیریت و واردسازی کلیدهای API (Import API's Vault)
              </h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              این بخش منحصراً وظیفه <strong>ذخیره‌سازی و چیدمان متوالی (Round-Robin / Failover)</strong> کلیدهای API را برعهده دارد.
              برای هر مدل، امکان تعریف <strong>۱۰ ورودی مجزا</strong> فراهم شده است تا در صورت پر شدن سقف مصرف روزانه یا ایجاد محدودیت نرخ (Rate Limit)،
              سیستم به صورت خودکار از کلید بعدی بهره ببرد.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                ذخیره‌سازی محلی (LocalStorage Safe)
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-cyan-400" />
                چرخش خودکار ۱۰ لایه
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <label className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button 
              onClick={handleExportJson}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Backup</span>
            </button>

            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/30 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>ذخیره شد!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>ذخیره کلیدها</span>
                </>
              )}
            </button>
          </div>
        </div>

        {importExportMsg && (
          <div className="mt-4 p-2.5 bg-indigo-950/30 border border-indigo-800/40 rounded text-xs text-indigo-300 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>{importExportMsg}</span>
          </div>
        )}
      </div>

      {/* Mandatory Validation Rule Status Card */}
      <div className={`p-4 rounded-xl border transition-all ${
        isMandatoryMet 
          ? 'bg-emerald-950/15 border-emerald-800/30' 
          : 'bg-amber-950/20 border-amber-800/40'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {isMandatoryMet ? (
              <span className="p-2 rounded-lg bg-emerald-900/40 text-emerald-400 border border-emerald-700/50">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            ) : (
              <span className="p-2 rounded-lg bg-amber-900/40 text-amber-400 border border-amber-700/50">
                <AlertTriangle className="w-5 h-5" />
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">
                  شرط حداقل APIهای الزامی سیستم (Mandatory API Policy)
                </h4>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isMandatoryMet 
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60' 
                    : 'bg-amber-900/60 text-amber-300 border border-amber-700/60'
                }`}>
                  {isMandatoryMet ? 'تکمیل شده (Valid)' : 'نیازمند اقدام (Action Required)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                استفاده از حداقل ۲ ارائه‌دهنده شامل <strong>جمنای (Gemini)</strong> و <strong>انویدیا (NVIDIA)</strong> اجباری است.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              geminiCount > 0 
                ? 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300' 
                : 'bg-slate-900/80 border-slate-800 text-slate-500'
            }`}>
              <span className="font-bold">Gemini:</span>
              <span>{geminiCount}/10 کلید</span>
              {geminiCount > 0 ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="text-amber-400">ناقص</span>}
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              nvidiaCount > 0 
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300' 
                : 'bg-slate-900/80 border-slate-800 text-slate-500'
            }`}>
              <span className="font-bold">NVIDIA:</span>
              <span>{nvidiaCount}/10 کلید</span>
              {nvidiaCount > 0 ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="text-amber-400">ناقص</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Tabs / Selector, Right: 10 Key Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Providers Nav (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-1 font-bold">
            انتخاب مدل / سرویس API
          </div>

          {PROVIDERS.map((p) => {
            const filledCount = getFilledCount(p.id);
            const isCurrent = activeProvider === p.id;
            
            return (
              <button
                key={p.id}
                onClick={() => setActiveProvider(p.id)}
                className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent 
                    ? `bg-[#0e0e0e] ${p.borderColor} shadow-lg shadow-black/40` 
                    : 'bg-[#080808] border-slate-800/60 hover:border-slate-700 hover:bg-[#0c0c0c]'
                }`}
              >
                <div className="flex items-start justify-between w-full mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      filledCount > 0 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-700'
                    }`} />
                    <span className="font-bold text-slate-100 text-sm">{p.name}</span>
                    <span className="text-xs text-slate-400 font-normal">({p.persianName})</span>
                  </div>

                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                    p.isMandatory ? 'bg-indigo-950/70 border-indigo-800/60 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    {p.isMandatory ? 'اجباری' : 'اختیاری'}
                  </span>
                </div>

                <div className="w-full flex items-center justify-between text-xs mt-1">
                  <span className="text-slate-500 text-[11px] truncate max-w-[160px]">
                    {p.id === 'nvidia' ? 'Gemma Dedicated' : `${filledCount} کلید فعال`}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {filledCount} / 10
                  </span>
                </div>
              </button>
            );
          })}

          {/* Quick Helper Note */}
          <div className="p-4 bg-[#080808] border border-slate-800/60 rounded-xl text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>منطق چرخش متوالی (Fallback Rotation)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              هنگامی که سهمیه یا نرخ درخواست ورودی ۱ به اتمام برسد، به صورت زنجیره‌ای درخواست‌ها به کلید ورودی ۲، سپس ۳ و تا ۱۰ منتقل می‌شوند تا توقفی در آنالیزهای سئو ایجاد نشود.
            </p>
          </div>
        </div>

        {/* Right Panel: Active Provider Keys Inputs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-[#0c0c0c] border border-slate-800/80 rounded-xl p-6 space-y-6">
            
            {/* Header of Active Provider */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/60 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-serif italic text-white font-semibold">
                    کلیدهای API {currentProviderConfig.name} ({currentProviderConfig.persianName})
                  </h3>
                  {currentProviderConfig.isMandatory && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                      الزامی برای کارکرد سیستم
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {currentProviderConfig.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => clearAllForProvider(currentProviderConfig.id)}
                  className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-300 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>پاکسازی ۱۰ اسلات</span>
                </button>
              </div>
            </div>

            {/* 10 Slots List */}
            <div className="space-y-3">
              {apiKeys[currentProviderConfig.id].map((keyVal, idx) => {
                const slotNumber = idx + 1;
                const slotId = `${currentProviderConfig.id}-${idx}`;
                const isMasked = !showMasked[slotId];
                const hasValue = keyVal.trim().length > 0;
                
                return (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-lg border transition-all ${
                      hasValue 
                        ? 'bg-[#070707] border-slate-800 hover:border-slate-700' 
                        : 'bg-[#050505] border-slate-900 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-slate-400 font-bold">
                          {slotNumber}
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          {slotNumber === 1 ? 'کلید اصلی (Primary)' : `کلید پشتیبان ${slotNumber - 1} (Fallback #${slotNumber - 1})`}
                        </span>
                        {slotNumber === 1 && currentProviderConfig.isMandatory && (
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-950/30 px-1.5 py-0.2 rounded border border-amber-900/40">
                            حداقل ۱ مورد الزامی
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className={`px-2 py-0.5 rounded ${
                          hasValue 
                            ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/40' 
                            : 'bg-slate-900 text-slate-600'
                        }`}>
                          {hasValue ? 'آماده (Ready)' : 'خالی (Empty)'}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex items-center">
                      <input 
                        type={isMasked ? "password" : "text"}
                        value={keyVal}
                        onChange={(e) => handleKeyChange(currentProviderConfig.id, idx, e.target.value)}
                        placeholder={`ورود کلید ${slotNumber} (مثال: ${currentProviderConfig.placeholder})`}
                        className="w-full bg-[#030303] border border-slate-800 text-slate-200 pl-3 pr-28 py-2 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-700"
                      />

                      <div className="absolute right-2 flex items-center gap-1 text-slate-500">
                        <button
                          type="button"
                          onClick={() => toggleMask(slotId)}
                          title={isMasked ? "نمایش کلید" : "مخفی‌سازی"}
                          className="p-1.5 hover:text-slate-300 transition-colors"
                        >
                          {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        {hasValue && (
                          <>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(keyVal, slotId)}
                              title="کپی کلید"
                              className="p-1.5 hover:text-indigo-400 transition-colors"
                            >
                              {copiedSlot === slotId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => clearSlot(currentProviderConfig.id, idx)}
                              title="پاک کردن"
                              className="p-1.5 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Save Trigger inside Panel */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {getFilledCount(currentProviderConfig.id)} از ۱۰ اسلات تکمیل شده است.
              </span>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره تغییرات</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXCLUSIVE ARCHITECTURAL SECTION: NVIDIA (Gemma Model) & Embedding Engine   */}
      {/* ========================================================================= */}
      <div className="bg-[#0c0c0c] border border-emerald-900/40 rounded-xl p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif italic text-white font-semibold">
                  معماری و وظایف تخصصی مدل پیشنهادی Gemma (NVIDIA NIM)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Gemma Dedicated Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                کلیدهای انویدیا (NVIDIA API) منحصراً برای اجرای مدل <strong>Gemma</strong> و ابزارهای مرتبط با برداری‌سازی سئو پیکربندی می‌شوند.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-emerald-400/90 bg-emerald-950/30 border border-emerald-800/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            NVIDIA NIM Endpoint Active
          </div>
        </div>

        {/* 8 Specialized Model Tasks as instructed by User */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>تفکیک وظایف اجرایی مدل در سامانه هوشمند سئو</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* Task 1 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                  <Search className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-indigo-950/40 text-indigo-300 rounded border border-indigo-900/30">
                  LLM (Gemma)
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">استخراج کلمات کلیدی از متن</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                استخراج انتیتی‌ها، واژگان پرتکرار و اصطلاحات کلیدی از صفحات هدف با بهره‌گیری از مدل Gemma.
              </p>
            </div>

            {/* Task 2 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-teal-400 border border-slate-800">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-teal-950/40 text-teal-300 rounded border border-teal-900/30">
                  LLM
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">تشخیص هدف جستجو (Search Intent)</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                دسته‌بندی خودکار مقاصد کاربر (اطلاعاتی، تراکنشی، ناوبری یا تجاری) بر پایه تحلیل معنایی.
              </p>
            </div>

            {/* Task 3 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                  <Network className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-amber-950/40 text-amber-300 rounded border border-amber-900/30">
                  LLM + داده‌های واقعی
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">تولید موضوعات مرتبط</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                خلق خوشه‌های محتوایی (Topic Clusters) و موضوعات مرتبط از ترکیب LLM و کوئری‌های واقعی بازار.
              </p>
            </div>

            {/* Task 4 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                  <Database className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-950/40 text-emerald-300 rounded border border-emerald-900/30">
                  Embedding Model
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">تبدیل کلمات به بردار</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تولید بردارهای متراکم (Dense Vector Embeddings) جهت مدل‌سازی فضایی عبارات جستجو.
              </p>
            </div>

            {/* Task 5 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                  <Share2 className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-cyan-950/40 text-cyan-300 rounded border border-cyan-900/30">
                  Embedding + Similarity
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">مقایسه معنایی کلمات</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                محاسبه شباهت کسینوسی (Cosine Similarity) جهت تشخیص میزان هم‌پوشانی و کانیبالیزیشن محتوا.
              </p>
            </div>

            {/* Task 6 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-violet-400 border border-slate-800">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-violet-950/40 text-violet-300 rounded border border-violet-900/30">
                  Embedding + Clustering
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">خوشه‌بندی کلمات کلیدی</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                گروه‌بندی خودکار هزاران کلمه کلیدی در ساختارهای سیلویی (Silo Structures) بدون تداخل مفهومی.
              </p>
            </div>

            {/* Task 7 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-rose-400 border border-slate-800">
                  <FileText className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-rose-950/40 text-rose-300 rounded border border-rose-900/30">
                  LLM
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">تولید عنوان و Brief</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تدوین سرفصل‌ها، تایتل‌های کلیک‌خور و بریف تولید محتوا متناسب با رتبه‌های برتر گوگل.
              </p>
            </div>

            {/* Task 8 */}
            <div className="bg-[#070707] border border-slate-800/80 hover:border-emerald-800/60 rounded-lg p-4 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded bg-slate-900 text-blue-400 border border-slate-800">
                  <BarChart2 className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-950/40 text-blue-300 rounded border border-blue-900/30">
                  LLM + داده‌های ساختاریافته
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">تحلیل Search Console</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تفسیر نوسانات رتبه و نرخ کلیک سرچ کنسول همراه با پیشنهاد اقدامات بهینه‌سازی فنی.
              </p>
            </div>

          </div>
        </div>

        {/* Specialized Embedding Model Clarification Note */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/30 to-slate-900/40 border border-emerald-800/40 rounded-xl flex items-start gap-3.5">
          <div className="p-2 bg-emerald-900/40 border border-emerald-700/50 rounded-lg text-emerald-300 shrink-0 mt-0.5">
            <Database className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-emerald-200">
              ویژگی و مأموریت مدل‌های اختصاصی تعبیه (Embedding Models)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              مدل <strong>Embedding</strong> به‌طور اختصاصی برای تبدیل داده به بردار و استفاده در <strong>جستجوی معنایی (Semantic Search)</strong>، <strong>طبقه‌بندی</strong> و <strong>خوشه‌بندی</strong> طراحی شده است تا تحلیل‌های سئو بدون حدس‌های تصادفی و با دقت ریاضی محاسبه شوند.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
