import React, { useState } from 'react';
import { Globe, ArrowUpRight, ArrowDownRight, Sparkles, RefreshCw, Compass, Search, Percent } from 'lucide-react';

interface GeoTrafficData {
  country: string;
  code: string;
  traffic: string;
  change: string;
  avgPosition: number;
  difficulty: string;
  topKeyword: string;
}

export default function AiSeoOsGeoTraffic() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [targetLocalKeyword, setTargetLocalKeyword] = useState('neural seo');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isProjecting, setIsProjecting] = useState(false);
  const [projectionResult, setProjectionResult] = useState<{
    potentialTrafficIncrease: string;
    localizedKeywords: string[];
    strategy: string;
  } | null>(null);

  const countriesData: GeoTrafficData[] = [
    { country: 'United States', code: 'US', traffic: '45,200', change: '+14.2%', avgPosition: 3.4, difficulty: 'Hard (68%)', topKeyword: 'neural seo tools' },
    { country: 'United Kingdom', code: 'GB', traffic: '18,400', change: '+8.6%', avgPosition: 4.1, difficulty: 'Medium (52%)', topKeyword: 'ai seo audit uk' },
    { country: 'Germany', code: 'DE', traffic: '12,100', change: '+22.4%', avgPosition: 5.8, difficulty: 'Medium (44%)', topKeyword: 'suchmaschinenoptimierung ki' },
    { country: 'Japan', code: 'JP', traffic: '9,800', change: '-2.1%', avgPosition: 8.2, difficulty: 'Hard (72%)', topKeyword: '人工知能 seo ツール' },
    { country: 'Canada', code: 'CA', traffic: '8,500', change: '+11.0%', avgPosition: 3.9, difficulty: 'Easy (35%)', topKeyword: 'semantic seo canada' },
    { country: 'Australia', code: 'AU', traffic: '7,200', change: '+5.3%', avgPosition: 4.5, difficulty: 'Easy (31%)', topKeyword: 'seo automation tools' },
  ];

  const handleGeoProjection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProjecting) return;
    setIsProjecting(true);

    try {
      const res = await fetch('/api/geo-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: targetLocalKeyword,
          country: selectedCountry
        })
      });

      if (res.ok) {
        const data = await res.json();
        setProjectionResult(data);
      }
    } catch (err) {
      console.error(err);
      setProjectionResult({
        potentialTrafficIncrease: '+34%',
        localizedKeywords: [
          `${targetLocalKeyword} localization`,
          `localized search optimization ${selectedCountry}`,
          `best semantic practices for ${selectedCountry} audience`
        ],
        strategy: `Implement localized structured data markup and regional content clusters tailored to user intents in ${selectedCountry}.`
      });
    } finally {
      setIsProjecting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-bold font-mono">Global Organic Clicks</div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-3xl font-light font-serif text-white">101.2K</h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12.8%
            </span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono mt-2">LAST 30 DAYS • ALL REGIONS</p>
        </div>

        <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-bold font-mono">Avg International Pos</div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-3xl font-light font-serif text-white">4.8</h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +0.6 positions
            </span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono mt-2">WEIGHTED AVERAGE GEOLOCATION</p>
        </div>

        <div className="bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-bold font-mono">Active Geocountries</div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-3xl font-light font-serif text-white">42</h4>
            <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              +2 new indexable
            </span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono mt-2">WITH MINIMUM 100 ORGANIC IMPRESSIONS</p>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* World Map & Country Performance */}
        <div className="lg:col-span-7 bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-serif italic text-white font-semibold">Geographic Footprint</h3>
            <p className="text-xs text-slate-500 mt-1">High-fidelity visualization of search share and average positions across targeted regions.</p>
          </div>

          {/* Glow Map Graphic (Custom SVG) */}
          <div className="relative h-48 bg-slate-950/20 rounded-lg border border-slate-900/50 overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full max-w-lg opacity-40 text-slate-800" viewBox="0 0 1000 480" fill="currentColor">
              {/* Simplified world map path silhouettes */}
              <path d="M150 120h40v20h-40z M220 160h120v40H220z M380 200h100v80H380z M550 140h150v60H550z M720 180h80v120H720z M180 320h60v50h-60z M500 360h80v40h-80z" />
              <path d="M300 80h80v40H300z M440 60h120v50H440z M600 80h60v40H600z M820 120h80v100H820z" />
              
              {/* Highlight hotspots */}
              <circle cx="280" cy="180" r="12" className="fill-indigo-600/30 stroke-indigo-500 stroke-2 animate-pulse" />
              <circle cx="280" cy="180" r="4" className="fill-indigo-400" />

              <circle cx="520" cy="140" r="10" className="fill-purple-600/30 stroke-purple-500 stroke-2" />
              <circle cx="520" cy="140" r="3" className="fill-purple-400" />

              <circle cx="620" cy="180" r="8" className="fill-emerald-600/30 stroke-emerald-500 stroke-2" />
              <circle cx="620" cy="180" r="3" className="fill-emerald-400" />

              <circle cx="850" cy="300" r="14" className="fill-violet-600/30 stroke-violet-500 stroke-2 animate-pulse" />
              <circle cx="850" cy="300" r="5" className="fill-violet-400" />
            </svg>
            
            {/* Map overlay tags */}
            <div className="absolute top-4 left-4 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-[9px] font-mono text-indigo-400">
              CORE_GEOMODULE: LIVE
            </div>
          </div>

          {/* Countries Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-semibold">Region</th>
                  <th className="pb-2 text-right font-semibold">Organic Traffic</th>
                  <th className="pb-2 text-right font-semibold">Avg. Pos</th>
                  <th className="pb-2 text-right font-semibold">Trend</th>
                  <th className="pb-2 text-right font-semibold">Primary Keyword</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/20">
                {countriesData.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                    <td className="py-2.5 font-medium text-slate-200 flex items-center gap-2">
                      <span className="w-5 text-center font-mono text-[10px] text-indigo-400/80 bg-indigo-950/20 border border-indigo-900/30 rounded px-1">{c.code}</span>
                      {c.country}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-300">{c.traffic}</td>
                    <td className="py-2.5 text-right font-mono text-slate-300 font-semibold">{c.avgPosition}</td>
                    <td className={`py-2.5 text-right font-mono ${c.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {c.change}
                    </td>
                    <td className="py-2.5 text-right text-slate-400 italic truncate max-w-[120px]">{c.topKeyword}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Country Projection Strategy Panel */}
        <div className="lg:col-span-5 bg-[#0c0c0c] border border-slate-800/60 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-serif italic text-white font-semibold">Regional Strategy Simulator</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Use Gemini AI to simulate traffic growth and compile customized localization keywords for target country clusters.
            </p>

            <form onSubmit={handleGeoProjection} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Target Country Market</label>
                <select 
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-[#050505] border border-slate-800 text-slate-300 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                >
                  <option value="US">United States (English)</option>
                  <option value="GB">United Kingdom (English)</option>
                  <option value="DE">Germany (German)</option>
                  <option value="JP">Japan (Japanese)</option>
                  <option value="FR">France (French)</option>
                  <option value="CA">Canada (English/French)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Core Keyword Concept</label>
                <input 
                  type="text"
                  value={targetLocalKeyword}
                  onChange={(e) => setTargetLocalKeyword(e.target.value)}
                  className="w-full bg-[#050505] border border-slate-800 text-slate-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="e.g. semantic search marketing"
                />
              </div>

              <button 
                type="submit"
                disabled={isProjecting}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProjecting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Projecting localized index...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Generate Local Strategy</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {projectionResult && (
            <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-4">
              <div className="flex justify-between items-center bg-indigo-950/15 border border-indigo-800/20 p-3 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold font-mono">Estimated Traffic Yield</span>
                <span className="text-sm font-semibold text-emerald-400 font-mono">{projectionResult.potentialTrafficIncrease} Gains</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block mb-1">Localized Keywords to Target</span>
                <div className="flex flex-wrap gap-1.5">
                  {projectionResult.localizedKeywords.map((kw, i) => (
                    <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-full">{kw}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block mb-1">Recommended Deployment Directive</span>
                <p className="text-xs text-slate-300 font-serif italic leading-relaxed">
                  "{projectionResult.strategy}"
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
