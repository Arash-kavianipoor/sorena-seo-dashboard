export type AnchorType = 'exact' | 'partial' | 'branded' | 'semantic' | 'generic';
export type AnchorPlacement = 'in-content' | 'nav-header' | 'footer' | 'sidebar' | 'breadcrumb';

export interface AnchorItem {
  id: string;
  text: string;
  type: AnchorType;
  placement: AnchorPlacement;
  sourceId: string;
  sourceUrl: string;
  sourceTitle: string;
  targetId: string;
  targetUrl: string;
  pageRankEquity: number; // e.g. +1.8
  sentenceSnippet: string;
  clickVolumeEstimate?: string;
  followStatus: 'dofollow' | 'nofollow';
}

export interface ContentNode {
  id: string;
  url: string;
  title: string;
  category: 'core' | 'blog' | 'services' | 'solutions' | 'docs' | 'orphan';
  depth: number; // 0 = root, 1 = pillar, 2 = cluster, 3 = deep
  wordCount: number;
  internalInlinks: number;
  internalOutlinks: number;
  pageRank: number; // 1-10
  healthScore: number; // 0-100
  topKeyword: string;
  searchVolume: string;
  status: 'indexed' | 'crawled' | 'orphan_warning' | 'needs_update';
  incomingAnchors: AnchorItem[];
  outgoingAnchors: AnchorItem[];
  anchorDistribution: {
    exact: number;
    partial: number;
    branded: number;
    semantic: number;
    generic: number;
  };
  anchorHealthAlert?: string;
  x?: number;
  y?: number;
  z?: number;
}

export interface ContentLink {
  id: string;
  source: string;
  target: string;
  type: 'hierarchical' | 'contextual' | 'breadcrumb';
  weight: number;
  primaryAnchor: string;
  anchorType: AnchorType;
  equityTransfer: number;
}
