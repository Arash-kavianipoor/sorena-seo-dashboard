import React, { useState } from 'react';
import { 
  ContentNode, 
  AnchorItem, 
  AnchorType 
} from '../types/content-graph';
import { 
  Link2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Plus, 
  Info,
  BarChart3,
  FileText,
  MousePointerClick
} from 'lucide-react';

interface Props {
  node: ContentNode;
  onSelectNodeById: (id: string) => void;
  onSimulateNewAnchor: (anchorText: string, type: AnchorType) => void;
}

export default function AiSeoOsAnchorInspector({ node, onSelectNodeById, onSimulateNewAnchor }: Props) {
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'diversity'>('incoming');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newAnchorInput, setNewAnchorInput] = useState('');
  const [newAnchorType, setNewAnchorType] = useState<AnchorType>('partial');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleAddAnchor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnchorInput.trim()) return;
    onSimulateNewAnchor(newAnchorInput.trim(), newAnchorType);
    setNewAnchorInput('');
  };

  const getAnchorTypeBadge = (type: AnchorType) => {
    switch (type) {
      case 'exact':
        return {
          label: 'تطابق دقیق (Exact)',
          cls: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
        };
      case 'partial':
        return {
          label: 'تطابق نسبی (Partial)',
          cls: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
        };
      case 'branded':
        return {
          label: 'برندینگ (Branded)',
          cls: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
        };
      case 'semantic':
        return {
          label: 'معنایی (LSI Semantic)',
          cls: 'bg-purple-950/80 text-purple-300 border-purple-700/60'
        };
      case 'generic':
        return {
          label: 'عمومی (Generic)',
          cls: 'bg-amber-950/80 text-amber-300 border-amber-700/60'
        };
    }
  };

  const getPlacementLabel = (placement: string) => {
    switch (placement) {
      case 'in-content': return 'متن اصلی مقاله (Body)';
      case 'nav-header': return 'منوی هدر (Header)';
      case 'footer': return 'فوتر سایت (Footer)';
      case 'breadcrumb': return 'مسیر راهنما (Breadcrumb)';
      default: return placement;
    }
  };

  return (
    <div className="bg-[#0b0b12] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-5 animate-fadeIn">
      
      {/* Header Info */}
      <div className="space-y-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider border ${
            node.category === 'orphan' ? 'bg-rose-950/80 text-rose-300 border-rose-700' :
            node.category === 'core' ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700' :
            node.category === 'blog' ? 'bg-purple-950/80 text-purple-300 border-purple-700' :
            node.category === 'services' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' :
            'bg-cyan-950/80 text-cyan-300 border-cyan-700'
          }`}>
            {node.category.toUpperCase()} SILO
          </span>

          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">PR {node.pageRank}/10</span>
            <span>•</span>
            <span>سلامت {node.healthScore}%</span>
          </span>
        </div>

        <h3 className="text-base font-serif italic text-white font-semibold leading-snug">
          {node.title}
        </h3>

        <div className="text-xs font-mono text-indigo-400 break-all flex items-center justify-between gap-2 bg-[#05050a] px-2.5 py-1.5 rounded-lg border border-slate-850">
          <span>{node.url}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-70 hover:opacity-100 cursor-pointer" />
        </div>
      </div>

      {/* Warnings / Alerts if any */}
      {node.anchorHealthAlert && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>هشدار ساختار پیوند:</span>
          </div>
          <p className="text-[11px] text-rose-200 leading-relaxed">
            {node.anchorHealthAlert}
          </p>
        </div>
      )}

      {/* Primary Tabs for Anchor Explorer */}
      <div className="flex items-center p-1 bg-[#05050a] border border-slate-800 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'incoming' 
              ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-3.5 h-3.5" />
          <span>ورودی ({node.incomingAnchors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('outgoing')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'outgoing' 
              ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>خروجی ({node.outgoingAnchors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('diversity')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'diversity' 
              ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>تنوع انکر</span>
        </button>
      </div>

      {/* Tab 1: Incoming Anchors */}
      {activeTab === 'incoming' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>انکرتکست‌های ورودی به این صفحه</span>
            <span className="text-emerald-400">مجموع ورودی: {node.internalInlinks} لینک</span>
          </div>

          {node.incomingAnchors.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-xs text-slate-500 font-mono">
              هیچ پیوند ورودی برای این صفحه ثبت نشده است (صفحه یتیم).
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {node.incomingAnchors.map((anc) => {
                const badge = getAnchorTypeBadge(anc.type);
                return (
                  <div 
                    key={anc.id}
                    className="p-3 rounded-xl bg-[#06060c] border border-slate-800/80 hover:border-indigo-600/50 transition-all space-y-2 group shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                            «{anc.text}»
                          </span>
                          <button
                            onClick={() => handleCopy(anc.text, anc.id)}
                            className="text-slate-500 hover:text-slate-200 cursor-pointer p-0.5"
                            title="کپی انکرتکست"
                          >
                            {copiedId === anc.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 shrink-0">
                        +{anc.pageRankEquity} PR
                      </span>
                    </div>

                    {/* Sentence Snippet */}
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-[11px] text-slate-300 leading-relaxed font-sans">
                      <span className="text-[10px] font-mono text-slate-500 block mb-0.5">متن پیرامون لینک در صفحه مبدأ:</span>
                      <p>
                        {anc.sentenceSnippet}
                      </p>
                    </div>

                    {/* Source Page Info */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-850">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">از صفحه:</span>
                        <button
                          onClick={() => onSelectNodeById(anc.sourceId)}
                          className="text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{anc.sourceTitle.slice(0, 24)}...</span>
                        </button>
                      </div>
                      <span className="text-slate-500">{getPlacementLabel(anc.placement)}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Outgoing Anchors */}
      {activeTab === 'outgoing' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>انکرتکست‌های خروجی این صفحه به سایر صفحات</span>
            <span className="text-indigo-400">{node.internalOutlinks} پیوند خروجی</span>
          </div>

          {node.outgoingAnchors.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-xs text-slate-500 font-mono">
              این صفحه به هیچ صفحه داخلی دیگری پیوند نداده است.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {node.outgoingAnchors.map((anc) => {
                const badge = getAnchorTypeBadge(anc.type);
                return (
                  <div 
                    key={anc.id}
                    className="p-3 rounded-xl bg-[#06060c] border border-slate-800/80 hover:border-cyan-600/50 transition-all space-y-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-100">
                            «{anc.text}»
                          </span>
                          <button
                            onClick={() => handleCopy(anc.text, anc.id)}
                            className="text-slate-500 hover:text-slate-200 cursor-pointer p-0.5"
                            title="کپی انکرتکست"
                          >
                            {copiedId === anc.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 shrink-0">
                        {getPlacementLabel(anc.placement)}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-[11px] text-slate-300 leading-relaxed font-sans">
                      <span className="text-[10px] font-mono text-slate-500 block mb-0.5">انکر در متن:</span>
                      <p>{anc.sentenceSnippet}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-850">
                      <span className="text-slate-500">به مقصد صفحه:</span>
                      <button
                        onClick={() => onSelectNodeById(anc.targetId)}
                        className="text-cyan-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                      >
                        <span>مشاهده صفحه مقصد ➔</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Diversity & Anchor Distribution Analysis */}
      {activeTab === 'diversity' && (
        <div className="space-y-4">
          <div className="p-3 bg-indigo-950/30 border border-indigo-800/50 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>پروفایل سلامت انکرتکست (Anti-Penalty)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              توزیع طبیعی انکرتکست‌ها برای جلوگیری از جریمه‌های الگوریتم پنگوئن و هرزنامه لینک گوگل:
            </p>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {/* Branded */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">برندینگ (Branded)</span>
                <span className="text-emerald-400 font-bold">{node.anchorDistribution.branded}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${node.anchorDistribution.branded}%` }}></div>
              </div>
            </div>

            {/* Partial Match */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">تطابق نسبی (Partial Match)</span>
                <span className="text-cyan-400 font-bold">{node.anchorDistribution.partial}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${node.anchorDistribution.partial}%` }}></div>
              </div>
            </div>

            {/* Exact Match */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">تطابق دقیق کلمه (Exact Match)</span>
                <span className="text-indigo-400 font-bold">{node.anchorDistribution.exact}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${node.anchorDistribution.exact}%` }}></div>
              </div>
            </div>

            {/* Semantic / LSI */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">معنایی و LSI</span>
                <span className="text-purple-400 font-bold">{node.anchorDistribution.semantic}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${node.anchorDistribution.semantic}%` }}></div>
              </div>
            </div>

            {/* Generic */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">عمومی (Generic مثل اینجا)</span>
                <span className={`font-bold ${node.anchorDistribution.generic > 20 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {node.anchorDistribution.generic}%
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${node.anchorDistribution.generic}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Simulate New Anchor Form */}
      <form onSubmit={handleAddAnchor} className="p-3 bg-[#06060c] border border-slate-800 rounded-xl space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>تست افزودن انکرتکست جدید (AI Link Simulator):</span>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="text"
            value={newAnchorInput}
            onChange={(e) => setNewAnchorInput(e.target.value)}
            placeholder="مثلاً: ابزار آنالیز سئو هوشمند"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 font-sans"
          />
          <select
            value={newAnchorType}
            onChange={(e) => setNewAnchorType(e.target.value as AnchorType)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-[11px] text-slate-300 focus:outline-none font-mono"
          >
            <option value="exact">تطابق دقیق</option>
            <option value="partial">تطابق نسبی</option>
            <option value="branded">برندینگ</option>
            <option value="semantic">معنایی LSI</option>
            <option value="generic">عمومی</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!newAnchorInput.trim()}
          className="w-full py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>شبیه‌سازی و تزریق انکرتکست جدید</span>
        </button>
      </form>

    </div>
  );
}
