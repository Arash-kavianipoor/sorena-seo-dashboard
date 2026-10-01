import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Boxes, 
  Search, 
  Filter, 
  Globe, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  MousePointer,
  Link2,
  RotateCcw,
  Hand,
  Compass
} from 'lucide-react';

import { ContentNode, ContentLink, AnchorType } from '../types/content-graph';
import { INITIAL_NODES, INITIAL_LINKS } from '../data/content-graph-data';
import AiSeoOsAnchorInspector from './ai-seo-os-anchor-inspector';

// 3D Coordinates for Real Sorena IT Content Hubs (Balanced 3D Spacing)
const NODE_3D_POSITIONS: Record<string, [number, number, number]> = {
  // Core Hub
  'node-home': [0, 0, 0],

  // Services Cluster (Right / Front)
  'node-services-web': [32, 10, 12],
  'node-services-seo': [36, -12, 16],
  'node-services-plugins': [56, 18, 20],
  'node-services-support': [54, -4, 30],
  'node-ticket': [58, -22, 14],

  // Solutions & Portfolio (Top / Depth)
  'node-portfolio': [0, 32, -18],
  'node-sol-ecommerce': [24, 38, -10],
  'node-sol-corporate': [-26, 36, -14],

  // Blog Cluster (Left / Back)
  'node-blog': [-34, 12, 10],
  'node-blog-tech-seo': [-52, 22, 16],
  'node-blog-wp-vs-custom': [-56, 2, 22],
  'node-blog-ai-search-console': [-48, -16, 12],

  // Conversion & Contact (Bottom / Center)
  'node-order': [-16, -26, 18],
  'node-contact': [14, -28, 22],

  // Orphan Section (Isolated Bottom-Back)
  'node-orphan-legacy': [-18, -44, -30],
  'node-orphan-unlinked': [18, -44, -30]
};

export default function AiSeoOs3dContentGraph() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // State
  const [nodes, setNodes] = useState<ContentNode[]>(INITIAL_NODES);
  const [links, setLinks] = useState<ContentLink[]>(INITIAL_LINKS);
  const [selectedNode, setSelectedNode] = useState<ContentNode | null>(INITIAL_NODES[0]);
  const [selectedLink, setSelectedLink] = useState<ContentLink | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ContentNode | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [colorDimension, setColorDimension] = useState<'category' | 'pagerank' | 'health'>('category');
  const [isScanning, setIsScanning] = useState(false);
  const [siteUrl, setSiteUrl] = useState('https://sorena-it.com');
  const [scanMessage, setScanMessage] = useState('');

  // 2D Projected Screen Positions for Crisp Vector Labels
  const [screenCoords, setScreenCoords] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const linkMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animFrameRef = useRef<number | null>(null);
  const cameraAngleRef = useRef({ theta: 0.25, phi: Math.PI / 3, radius: 115 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);

  // Colors based on dimension
  const getNodeColor = (node: ContentNode): number => {
    if (colorDimension === 'health') {
      if (node.healthScore >= 90) return 0x10b981; // Emerald
      if (node.healthScore >= 70) return 0x6366f1; // Indigo
      if (node.healthScore >= 50) return 0xf59e0b; // Amber
      return 0xf43f5e; // Rose
    }
    if (colorDimension === 'pagerank') {
      const ratio = node.pageRank / 10;
      if (ratio > 0.8) return 0xa855f7; // Purple
      if (ratio > 0.6) return 0x6366f1; // Indigo
      if (ratio > 0.4) return 0x0ea5e9; // Sky
      return 0x64748b; // Slate
    }
    // Category Colors
    switch (node.category) {
      case 'core': return 0x6366f1; // Indigo
      case 'blog': return 0xa855f7; // Purple
      case 'services': return 0x10b981; // Emerald
      case 'solutions': return 0x06b6d4; // Cyan
      case 'docs': return 0xf59e0b; // Amber
      case 'orphan': return 0xf43f5e; // Rose
      default: return 0x94a3b8;
    }
  };

  const getNodeHexColor = (node: ContentNode): string => {
    return '#' + getNodeColor(node).toString(16).padStart(6, '0');
  };

  // Node 3D Radius
  const getNodeRadius = (node: ContentNode): number => {
    if (node.depth === 0) return 4.8;
    if (node.depth === 1) return 3.4;
    return 2.2;
  };

  // Initialize Three.js 3D Viewport
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with soft neutral background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x08080f);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    cameraRef.current = camera;

    // 3. Lightweight Renderer (No heavy post-processing, pure performance)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'default' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lightweight Lights (1 ambient, 1 directional)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(40, 60, 50);
    scene.add(dirLight);

    // Minimal Subtle Floor Grid for 3D depth reference
    const grid = new THREE.GridHelper(180, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -50;
    scene.add(grid);

    // Camera Positioning Function
    const updateCameraPosition = () => {
      const { theta, phi, radius } = cameraAngleRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);
    };
    updateCameraPosition();

    // 5. Build 3D Nodes (Clean, Solid, NO Halos)
    const nodeMap = new Map<string, THREE.Mesh>();
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    nodes.forEach((node) => {
      const pos = NODE_3D_POSITIONS[node.id] || [0, 0, 0];
      const radius = getNodeRadius(node);
      const color = getNodeColor(node);

      // Clean Solid Sphere (16 segments = ultra lightweight, fast, no freezing)
      const geo = new THREE.SphereGeometry(radius, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.userData = { nodeId: node.id };
      nodeGroup.add(mesh);
      nodeMap.set(node.id, mesh);
    });
    nodeMeshesRef.current = nodeMap;

    // 6. Build 3D Links as Cylinders (Thin by default, thick on click)
    const linkMap = new Map<string, THREE.Mesh>();
    const linkGroup = new THREE.Group();
    scene.add(linkGroup);

    links.forEach((link) => {
      const sourcePos = NODE_3D_POSITIONS[link.source];
      const targetPos = NODE_3D_POSITIONS[link.target];
      if (!sourcePos || !targetPos) return;

      const p1 = new THREE.Vector3(...sourcePos);
      const p2 = new THREE.Vector3(...targetPos);
      const distance = p1.distanceTo(p2);
      const midPoint = p1.clone().add(p2).divideScalar(2);

      // Ultra-lightweight cylinder (6 radial segments)
      // Base radius = 0.11 for a crisp, thin line
      const geo = new THREE.CylinderGeometry(0.11, 0.11, distance, 6, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.5
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(midPoint);

      // Rotate cylinder along link direction (from p1 to p2)
      const up = new THREE.Vector3(0, 1, 0);
      const dir = p2.clone().sub(p1).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);
      mesh.setRotationFromQuaternion(quaternion);

      mesh.userData = { linkId: link.id, source: link.source, target: link.target };
      linkGroup.add(mesh);
      linkMap.set(link.id, mesh);
    });
    linkMeshesRef.current = linkMap;

    // 7. Raycaster for clicking & hovering 3D nodes
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Project 3D nodes to 2D screen positions for crisp HTML labels
    const updateScreenCoordinates = () => {
      if (!cameraRef.current || !container) return;
      const coords: Record<string, { x: number; y: number; visible: boolean }> = {};
      const halfW = container.clientWidth / 2;
      const halfH = container.clientHeight / 2;

      nodes.forEach((node) => {
        const pos = NODE_3D_POSITIONS[node.id];
        if (!pos) return;
        const v = new THREE.Vector3(...pos);
        v.project(camera);

        const isBehind = v.z > 1;
        coords[node.id] = {
          x: v.x * halfW + halfW,
          y: -(v.y * halfH) + halfH,
          visible: !isBehind
        };
      });

      setScreenCoords(coords);
    };

    // Render Loop (Zero auto-rotation, renders smoothly)
    const render = () => {
      renderer.render(scene, camera);
      updateScreenCoordinates();
    };
    render();

    // Resize Handler with requestAnimationFrame to prevent ResizeObserver loop limit errors
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeRafId = requestAnimationFrame(() => {
        if (!container || !camera || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        render();
      });
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    // Drag Orbit Handlers (Manual Only - NO Auto-Rotation)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragDistanceRef.current = 0;
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMouseRef.current.x;
        const deltaY = e.clientY - previousMouseRef.current.y;
        dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);

        // Rotate camera manually based on mouse drag
        cameraAngleRef.current.theta -= deltaX * 0.007;
        cameraAngleRef.current.phi = Math.max(0.15, Math.min(Math.PI - 0.15, cameraAngleRef.current.phi - deltaY * 0.007));
        updateCameraPosition();
        render();

        previousMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Hover raycasting when mouse is not dragging
        const rect = container.getBoundingClientRect();
        mouseVector.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouseVector.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        const intersects = raycaster.intersectObjects(nodeGroup.children);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const targetId = hit.userData?.nodeId;
          if (targetId) {
            const found = nodes.find(n => n.id === targetId);
            setHoveredNode(found || null);
            container.style.cursor = 'pointer';
          }
        } else {
          setHoveredNode(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      // If user merely clicked without dragging, perform Raycast Node Selection
      if (dragDistanceRef.current < 6) {
        const rect = container.getBoundingClientRect();
        mouseVector.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouseVector.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        const intersects = raycaster.intersectObjects(nodeGroup.children);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const targetId = hit.userData?.nodeId;
          if (targetId) {
            const found = nodes.find(n => n.id === targetId);
            if (found) {
              setSelectedNode(found);
              setSelectedLink(null);
            }
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Zoom with wheel
      cameraAngleRef.current.radius = Math.max(40, Math.min(220, cameraAngleRef.current.radius + e.deltaY * 0.12));
      updateCameraPosition();
      render();
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch Support for mobile drag
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        dragDistanceRef.current = 0;
        previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseRef.current.x;
      const deltaY = e.touches[0].clientY - previousMouseRef.current.y;
      dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);

      cameraAngleRef.current.theta -= deltaX * 0.007;
      cameraAngleRef.current.phi = Math.max(0.15, Math.min(Math.PI - 0.15, cameraAngleRef.current.phi - deltaY * 0.007));
      updateCameraPosition();
      render();

      previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const onMouseLeave = () => {
      setHoveredNode(null);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      observer.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
    };
  }, [nodes]);

  // Update Highlighted Links & Nodes on Selection Change
  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    // Update Node Sizes and Colors
    nodeMeshesRef.current.forEach((mesh, nodeId) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      const isSelected = selectedNode?.id === nodeId;
      const radius = getNodeRadius(node);
      const scale = isSelected ? 1.4 : 1.0;
      mesh.scale.set(scale, scale, scale);

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(getNodeColor(node));
      mat.roughness = isSelected ? 0.15 : 0.35;
      mat.metalness = isSelected ? 0.5 : 0.2;
    });

    // Update Link Highlights & Dynamic Thickness
    linkMeshesRef.current.forEach((mesh, linkId) => {
      const link = links.find(l => l.id === linkId);
      if (!link) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;

      const isConnected = selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);
      if (isConnected) {
        // Connected lines become 5.2x thicker, vibrant cyan / indigo
        mesh.scale.set(5.2, 1, 5.2);
        mat.color.setHex(selectedNode?.id === link.source ? 0x06b6d4 : 0x818cf8);
        mat.opacity = 0.95;
        mat.roughness = 0.2;
        mat.metalness = 0.4;
      } else {
        // All other lines remain thin with radius 0.11 and clear white color
        mesh.scale.set(1.0, 1, 1.0);
        mat.color.setHex(0xffffff);
        mat.opacity = selectedNode ? 0.35 : 0.55;
        mat.roughness = 0.3;
        mat.metalness = 0.1;
      }
    });

    // Re-render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [selectedNode, colorDimension, nodes, links]);

  // Reset Camera View
  const handleResetCamera = () => {
    cameraAngleRef.current = { theta: 0.25, phi: Math.PI / 3, radius: 115 };
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // Zoom helpers
  const handleZoom = (delta: number) => {
    cameraAngleRef.current.radius = Math.max(40, Math.min(220, cameraAngleRef.current.radius + delta));
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // Simulate Add Anchor text
  const handleSimulateNewAnchor = (anchorText: string, type: AnchorType) => {
    if (!selectedNode) return;
    const newAnchorItem = {
      id: `anc-custom-${Date.now()}`,
      text: anchorText,
      type,
      placement: 'in-content' as const,
      sourceId: 'node-home',
      sourceUrl: 'https://sorena-it.com/',
      sourceTitle: 'صفحه اصلی سورنا آی تی',
      targetId: selectedNode.id,
      targetUrl: selectedNode.url,
      pageRankEquity: 1.5,
      sentenceSnippet: `...جهت تقویت پیوندهای داخلی از عبارت «${anchorText}» استفاده شد...`,
      followStatus: 'dofollow' as const
    };

    const updatedNodes = nodes.map(n => {
      if (n.id === selectedNode.id) {
        return {
          ...n,
          internalInlinks: n.internalInlinks + 1,
          pageRank: Math.min(10, Number((n.pageRank + 0.3).toFixed(1))),
          incomingAnchors: [newAnchorItem, ...n.incomingAnchors],
          anchorHealthAlert: undefined
        };
      }
      return n;
    });

    setNodes(updatedNodes);
    setSelectedNode(updatedNodes.find(n => n.id === selectedNode.id) || null);
  };

  // Crawl Action Simulation
  const handleScanSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (isScanning) return;
    setIsScanning(true);
    setScanMessage('در حال استخراج ساختار و انکرتکست‌های sorena-it.com...');

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('پویش کامل شد: ۲۰ صفحه و ۳۴ انکرتکست استخراج و ثبت شد.');
    }, 1200);
  };

  return (
    <div id="site-3d-content-graph-container" className="space-y-6 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-[#0b0b14] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-700/60 text-indigo-300 text-xs font-mono">
              <Boxes className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sorena IT • 3D Draggable Content & Anchor Graph</span>
            </div>
            <h2 className="text-2xl font-serif italic text-white font-semibold tracking-tight">
              گراف سه‌بعدی صفحات و انکرتکست‌های دامنه sorena-it.com
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              گراف به صورت ۳ بعدی با درگ ماوس آزادانه در تمام زوایا قابل چرخش است (بدون چرخش خودکار). با کلیک روی هر نود، صفحه و جزئیات انکرتکست‌های ورودی و خروجی آن نمایش داده می‌شود.
            </p>
          </div>

          {/* Crawler Input Box */}
          <form onSubmit={handleScanSite} className="flex flex-col sm:flex-row items-center gap-2.5 bg-[#05050a] p-2 rounded-xl border border-slate-800 shadow-inner w-full lg:w-auto">
            <div className="flex items-center gap-2 px-3 text-slate-400 w-full sm:w-64">
              <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
              <input 
                type="text" 
                value={siteUrl} 
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="https://sorena-it.com"
                className="bg-transparent text-xs text-slate-200 focus:outline-none w-full font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'درحال پویش...' : 'پویش دامنه'}</span>
            </button>
          </form>
        </div>

        {scanMessage && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs font-mono text-indigo-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{scanMessage}</span>
          </div>
        )}

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-800/60 text-xs font-mono">
          <div className="p-3 bg-[#05050a] border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">صفحات استخراج‌شده</span>
            <span className="text-base font-bold text-white mt-1 block">{nodes.length} Pages</span>
          </div>
          <div className="p-3 bg-[#05050a] border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">پیوندهای داخلی</span>
            <span className="text-base font-bold text-indigo-400 mt-1 block">{links.length} Links</span>
          </div>
          <div className="p-3 bg-[#05050a] border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">انکرتکست‌های ورودی</span>
            <span className="text-base font-bold text-cyan-400 mt-1 block">34 Anchors</span>
          </div>
          <div className="p-3 bg-[#05050a] border border-slate-850 rounded-xl">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">صفحات بدون لینک</span>
            <span className="text-base font-bold text-rose-400 mt-1 block">2 Flagged</span>
          </div>
          <div className="p-3 bg-[#05050a] border border-slate-850 rounded-xl col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">شاخص سلامت انکرتکست</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">96.8% Safe</span>
          </div>
        </div>

      </div>

      {/* Main 3D Graph & Inspector Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* 3D Canvas Viewport (3 Columns) */}
        <div className="xl:col-span-3 bg-[#08080f] border border-slate-800/90 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col h-[700px]">
          
          {/* Controls Bar */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-20">
            
            {/* Silo Categories Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              <span className="text-slate-500 text-[11px] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" />
                <span>سیلوها:</span>
              </span>
              {[
                { id: 'all', label: 'تمام صفحات' },
                { id: 'core', label: 'صفحه اصلی' },
                { id: 'services', label: 'خدمات سئو و وب' },
                { id: 'solutions', label: 'پروژه‌ها و راهکارها' },
                { id: 'blog', label: 'وبلاگ و مقالات' },
                { id: 'docs', label: 'تبدیل و تماس' },
                { id: 'orphan', label: '⚠️ صفحات یتیم' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat.id 
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Viewport Action Tools */}
            <div className="flex items-center gap-2">
              
              {/* Color Dimension Selector */}
              <div className="flex items-center gap-1 text-[11px] font-mono bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                <button
                  onClick={() => setColorDimension('category')}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    colorDimension === 'category' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  دسته‌بندی
                </button>
                <button
                  onClick={() => setColorDimension('pagerank')}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    colorDimension === 'pagerank' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PageRank
                </button>
                <button
                  onClick={() => setColorDimension('health')}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    colorDimension === 'health' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  سلامت
                </button>
              </div>

              {/* 3D Navigation Controls */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-slate-400">
                <button
                  onClick={() => handleZoom(-15)}
                  className="p-1 hover:text-white cursor-pointer"
                  title="بزرگ‌نمایی سه‌بعدی"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleZoom(15)}
                  className="p-1 hover:text-white cursor-pointer"
                  title="کوچک‌نمایی سه‌بعدی"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetCamera}
                  className="p-1 hover:text-white cursor-pointer"
                  title="بازنشانی زاویه دوربین ۳ بعدی"
                >
                  <Compass className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* 3D Canvas Container */}
          <div className="flex-1 w-full h-full relative select-none">
            
            {/* The Three.js Canvas */}
            <div 
              ref={mountRef} 
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* 2D Projected Crisp Labels Over 3D Nodes - ONLY on Hover to avoid clutter */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {nodes.map((node) => {
                const coord = screenCoords[node.id];
                if (!coord || !coord.visible) return null;

                const isVisible = (categoryFilter === 'all' || node.category === categoryFilter) &&
                  (!searchFilter || node.url.toLowerCase().includes(searchFilter.toLowerCase()) || node.title.toLowerCase().includes(searchFilter.toLowerCase()));

                if (!isVisible) return null;

                const isHovered = hoveredNode?.id === node.id;
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getNodeHexColor(node);

                // If not hovered, render an invisible hit target to capture mouse hover easily
                if (!isHovered) {
                  return (
                    <div
                      key={node.id}
                      style={{
                        position: 'absolute',
                        left: `${coord.x}px`,
                        top: `${coord.y}px`,
                        transform: 'translate(-50%, -50%)',
                        width: '32px',
                        height: '32px'
                      }}
                      onMouseEnter={() => setHoveredNode(node)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(node);
                        setSelectedLink(null);
                      }}
                      className="pointer-events-auto cursor-pointer rounded-full"
                      title={node.title}
                    />
                  );
                }

                // Show detailed label badge ONLY on hover
                return (
                  <div
                    key={node.id}
                    style={{
                      position: 'absolute',
                      left: `${coord.x}px`,
                      top: `${coord.y}px`,
                      transform: 'translate(-50%, -100%) translateY(-14px)'
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(node);
                      setSelectedLink(null);
                    }}
                    className="pointer-events-auto cursor-pointer z-30 flex flex-col items-center text-center transition-all duration-150 animate-in fade-in zoom-in-95"
                  >
                    {/* Node Title Floating Badge */}
                    <div 
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium font-sans whitespace-nowrap border shadow-2xl backdrop-blur-md ${
                        isSelected 
                          ? 'bg-slate-950/95 text-white border-indigo-500 ring-2 ring-indigo-500/40 font-bold' 
                          : 'bg-slate-950/95 text-slate-100 border-slate-700 hover:border-slate-500'
                      }`}
                      style={{ borderRightColor: nodeColor, borderRightWidth: '4px' }}
                    >
                      <div className="font-semibold text-[12px] leading-tight text-white mb-0.5">
                        {node.title}
                      </div>
                      <div className="text-[10px] text-indigo-300 font-mono">
                        {node.url.replace('https://sorena-it.com', '') || '/'}
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800">
                        <span>{node.internalInlinks} لینک داخلی</span>
                        <span className="text-amber-400 font-bold">PR {node.pageRank}</span>
                      </div>
                    </div>

                    {/* Small Arrow Indicator */}
                    <div className="w-2 h-2 rotate-45 bg-slate-950 border-r border-b border-slate-700 -mt-1 shadow"></div>
                  </div>
                );
              })}
            </div>

            {/* Drag Interaction Helper */}
            <div className="absolute bottom-3 right-3 z-20 bg-slate-950/90 border border-slate-800/80 rounded-xl px-3 py-2 text-[11px] font-mono text-slate-400 pointer-events-none shadow-lg flex items-center gap-2">
              <Hand className="w-3.5 h-3.5 text-indigo-400" />
              <span>هاور ماوس: نمایش عنوان صفحه • کلیک: انتخاب نود و ضخیم‌شدن پیوندها • درگ: چرخش ۳ بعدی</span>
            </div>

            {/* Quick Header Badge of Clicked Node */}
            {selectedNode && (
              <div className="absolute top-3 left-3 z-20 bg-slate-950/95 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 shadow-xl max-w-sm space-y-1.5 pointer-events-none">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <MousePointer className="w-3.5 h-3.5" />
                    <span>صفحه انتخاب‌شده:</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                    PR {selectedNode.pageRank}/10
                  </span>
                </div>
                <div className="text-white font-serif italic text-sm font-semibold truncate">
                  {selectedNode.title}
                </div>
                <div className="text-[11px] text-indigo-300">
                  {selectedNode.url}
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                  <span>{selectedNode.incomingAnchors.length} انکرتکست ورودی</span>
                  <span>{selectedNode.outgoingAnchors.length} پیوند خروجی</span>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute top-3 right-3 z-20 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 text-[10px] font-mono text-slate-300 space-y-1 shadow-lg pointer-events-none">
              <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">سیلوهای sorena-it.com</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span>صفحه اصلی (Core)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>خدمات سئو و وب (Services)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span>پروژه‌ها و راهکارها (Solutions)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>وبلاگ و مقالات (Blog)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>تبدیل و تماس (Docs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>صفحه یتیم (Orphan)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Selected Page & Anchor Inspector Panel (1 Column) */}
        <div className="xl:col-span-1 space-y-4">
          
          {/* Search Box */}
          <div className="bg-[#0b0b14] border border-slate-800/80 rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 bg-[#05050a] border border-slate-850 px-3 py-2 rounded-lg text-xs">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="جستجوی صفحه یا انکرتکست..."
                className="bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none w-full text-xs font-mono"
              />
            </div>
          </div>

          {/* Anchor Inspector Component */}
          {selectedNode ? (
            <AiSeoOsAnchorInspector 
              node={selectedNode}
              onSelectNodeById={(id) => {
                const target = nodes.find(n => n.id === id);
                if (target) setSelectedNode(target);
              }}
              onSimulateNewAnchor={handleSimulateNewAnchor}
            />
          ) : (
            <div className="bg-[#0b0b14] border border-slate-800/80 rounded-2xl p-8 text-center text-slate-500 text-xs font-mono">
              روی یکی از نودهای گراف ۳ بعدی کلیک کنید تا جزئیات صفحه و انکرتکست‌های آن نمایش داده شود.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
