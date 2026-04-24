"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";


/* ─── Data ───────────────────────────────────────────────────────── */
const PROJECTS: Record<string, {
  title: string;
  subtitle: string;
  desc: string;
  vision: string[];
  features: { icon: string; title: string; desc: string }[];
  terminalLines: string[];
  stack: { name: string; icon: string }[];
  github: string;
  preview: string | null;
}> = {
  paas: {
    title: "PaaS Ecosystem",
    subtitle: "A high-performance Platform-as-a-Service designed for seamless container orchestration and automated CI/CD across hybrid cloud environments.",
    desc: "",
    vision: [
      "The PaaS Project was born out of a need for developer-centric infrastructure that eliminates the complexity of cloud-native deployments. By abstracting the Kubernetes orchestration layer, we created a platform where code goes from 'git push' to 'live URL' in under 60 seconds.",
      "Engineered using NestJS for the microservices architecture, the system manages elastic scaling, SSL termination, and real-time monitoring via a custom-built dashboard.",
    ],
    features: [
      { icon: "✦", title: "Zero-Downtime Deployments", desc: "Blue-green deployment strategies managed automatically through K8s ingress controllers." },
      { icon: "⬡", title: "Multi-Region Replication", desc: "Global data distribution with Redis-backed session management for low-latency user experiences." },
      { icon: "⬢", title: "Isolated Sandbox Environments", desc: "Docker-based isolation ensures security and environment parity across the entire development lifecycle." },
    ],
    terminalLines: [
      "initializing cluster connection...",
      "connection established. cluster_id: paas-node-01",
      "deploying ingress controller...",
      "monitoring health checks [OK]",
    ],
    stack: [
      { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
    github: "https://github.com",
    preview: null,
  },
  "laptop-shop": {
    title: "NextGen Laptop Shop",
    subtitle: "E-commerce platform optimised for high-end tech hardware with intelligent inventory management and lightning-fast page loads.",
    desc: "",
    vision: [
      "Được xây dựng từ đầu với triết lý performance-first. Mỗi millisecond đều quan trọng trong e-commerce — trang có thể mất doanh thu nếu load chậm hơn 1 giây.",
      "System quản lý kho vận với realtime sync, tích hợp payment gateway và SEO-optimized page structure giúp organic traffic tăng trưởng bền vững.",
    ],
    features: [
      { icon: "⚡", title: "Sub-second Page Loads", desc: "ISR và edge caching đảm bảo tốc độ tải trang dưới 1 giây ngay cả ở peak traffic." },
      { icon: "📦", title: "Smart Inventory Sync", desc: "Realtime inventory tracking với tự động cảnh báo và reorder suggestion dựa trên AI." },
      { icon: "🔍", title: "SEO Architecture", desc: "Structured data, canonical URLs, và sitemap tự động giúp tăng organic search traffic." },
    ],
    terminalLines: [
      "build started: nextgen-laptop-shop",
      "compiling 247 routes...",
      "optimizing images: 1,240 assets",
      "lighthouse score: 98/100 [PASS]",
    ],
    stack: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
    github: "https://github.com",
    preview: "https://example.com",
  },
  visionstore: {
    title: "VisionStore",
    subtitle: "AI-powered shopping experience with computer vision product matching and personalised semantic search.",
    desc: "",
    vision: [
      "VisionStore reimagines the shopping experience bằng cách đặt AI ở trung tâm. Thay vì tìm kiếm bằng từ khóa, người dùng upload ảnh hoặc mô tả bằng ngôn ngữ tự nhiên.",
      "Computer vision pipeline xử lý hình ảnh sản phẩm và semantic search engine hiểu ý định người dùng, không chỉ keywords.",
    ],
    features: [
      { icon: "👁", title: "Visual Search", desc: "Upload ảnh để tìm sản phẩm tương tự trong toàn bộ catalog với độ chính xác cao." },
      { icon: "🧠", title: "Semantic Search", desc: "Tìm kiếm bằng ngôn ngữ tự nhiên — hỏi như hỏi người thật, nhận kết quả chính xác." },
      { icon: "🎯", title: "Personalised Feed", desc: "AI học từ hành vi người dùng để cá nhân hóa trải nghiệm mua sắm theo thời gian." },
    ],
    terminalLines: [
      "loading vision model: clip-vit-large...",
      "indexing 50,000 products...",
      "semantic index ready",
      "search latency: 42ms [FAST]",
    ],
    stack: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
    github: "https://github.com",
    preview: null,
  },
  "nestjs-devtools-mcp": {
    title: "NestJS DevTools MCP",
    subtitle: "Model Context Protocol server enabling AI assistants to inspect, analyse and understand NestJS applications in real-time.",
    desc: "",
    vision: [
      "Khi làm việc với AI assistants như Claude hay Cursor, một trong những điểm yếu lớn nhất là AI không thể nhìn thấy runtime state của ứng dụng.",
      "NestJS DevTools MCP giải quyết vấn đề này bằng cách expose NestJS module graph, routes, và providers qua Model Context Protocol — cho phép AI hiểu ứng dụng như một developer thực sự.",
    ],
    features: [
      { icon: "🔌", title: "Module Graph Inspector", desc: "Real-time visualization của toàn bộ dependency graph, circular dependencies và lazy modules." },
      { icon: "🛣", title: "Route Analyser", desc: "Inspect tất cả HTTP routes, guards, interceptors và middlewares đang active." },
      { icon: "⚙️", title: "Provider Registry", desc: "Xem toàn bộ providers, scope, và injection tokens trong runtime context." },
    ],
    terminalLines: [
      "mcp server started on stdio",
      "tools registered: 8",
      "awaiting AI client connection...",
      "client connected: claude-3-5-sonnet",
    ],
    stack: [
      { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ],
    github: "https://github.com",
    preview: null,
  },
  "agent-bridge-kit": {
    title: "Agent Bridge Kit & Synapse",
    subtitle: "Infrastructure toolkit for connecting AI agents with external services through a reliable, context-aware routing layer.",
    desc: "",
    vision: [
      "Khi xây dựng multi-agent systems, vấn đề không phải là viết một agent — mà là kết nối nhiều agents lại với nhau một cách đáng tin cậy.",
      "Agent Bridge Kit cung cấp một abstraction layer chuẩn hóa cách agents giao tiếp với tools và services. Synapse quản lý context, memory persistence và intelligent tool routing.",
    ],
    features: [
      { icon: "🌉", title: "Universal Bridge", desc: "Kết nối bất kỳ AI framework (LangChain, CrewAI, AutoGen) với external services qua một interface thống nhất." },
      { icon: "🧬", title: "Context Synapse", desc: "Shared memory layer giúp agents nhớ và chia sẻ context across sessions và tools." },
      { icon: "🔀", title: "Smart Tool Routing", desc: "Tự động chọn và chain tools dựa trên agent intent, không cần hardcode workflows." },
    ],
    terminalLines: [
      "agent-bridge-kit v0.4.2 starting...",
      "synapse layer initialized",
      "tools loaded: 24",
      "routing engine ready [OK]",
    ],
    stack: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
    github: "https://github.com",
    preview: null,
  },
};

/* ─── Icons ─────────────────────────────────────────────────────── */
function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function IconNE() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS[slug];
  if (!project) notFound();


  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">NGÔ GIA HẠO</Link>
          <div className="nav-links">
            <Link href="/#projects" className="nav-link">Projects</Link>
            <Link href="/#about"    className="nav-link">About</Link>
            <Link href="/#contact"  className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="detail-hero">
        <div className="container">
          <Link href="/#projects" className="back-link">
            <IconBack /> Back to Projects
          </Link>

          <p className="section-label">{project.subtitle}</p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>

          <div className="detail-action-row">
            {project.preview && (
              <a href={project.preview} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Preview <IconExternal />
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <IconGithub /> GitHub
            </a>
          </div>

          {/* Tech stack badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
            {project.stack.map((t) => (
              <span key={t.name} className="badge">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.icon} alt={t.name} width={16} height={16} />
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <div className="container">
        <div className="detail-video-wrap">
          <div style={{
            width: "100%",
            height: "100%",
            background: "var(--clr-surface)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(var(--clr-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "var(--clr-primary)",
              filter: "blur(120px)",
              opacity: 0.07,
            }} />
            {/* Play button */}
            <div style={{
              position: "relative",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--clr-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 0 32px var(--clr-primary)50",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#09090B">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <p style={{ position: "relative", color: "var(--clr-text-muted)", fontSize: "0.875rem", fontFamily: "var(--font-mono)" }}>
              Demo video
            </p>
          </div>
        </div>
      </div>

      {/* THE VISION */}
      <div className="container">
        <section className="detail-section">
          <p className="section-label">Overview</p>
          <h2>The Vision</h2>
          {project.vision.map((para, i) => <p key={i}>{para}</p>)}
        </section>

        {/* KEY FEATURES */}
        <section className="detail-section">
          <p className="section-label">Features</p>
          <h2>Key Features</h2>
          <div className="feature-list">
            {project.features.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-content">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TERMINAL */}
        <section className="detail-section">
          <p className="section-label">Logs</p>
          <h2>Development Logs</h2>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: "#FF5F57" }} />
              <div className="terminal-dot" style={{ background: "#FEBC2E" }} />
              <div className="terminal-dot" style={{ background: "#28C840" }} />
              <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--clr-text-muted)", fontFamily: "var(--font-mono)" }}>
                bash — {slug}
              </span>
            </div>
            <div className="terminal-body">
              {project.terminalLines.map((line, i) => (
                <div key={i}>
                  <span className="t-prompt">❯ </span>{line}
                </div>
              ))}
              <div><span className="t-prompt">❯ </span><span className="t-cursor">█</span></div>
            </div>
          </div>
        </section>

        {/* SCREENSHOTS */}
        <section className="detail-section">
          <p className="section-label">Gallery</p>
          <h2>Platform Showcase</h2>
          <div className="screenshot-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="screenshot-item">
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, var(--clr-surface) 0%, var(--clr-surface-hover) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{ color: "var(--clr-text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                    Screenshot {n}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-card">
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Interested in the Architecture?</h3>
            <p>I'm always open to discussing system design, cloud orchestration, or potential collaborations.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/#contact" className="btn btn-primary">
              Get In Touch <IconNE />
            </Link>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <IconGithub /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer" style={{ marginTop: "4rem" }}>
        <div className="container">
          <p>© 2025 Ngô Gia Hạo. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
