"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects/data";
import { IconGithub, IconExternal, Badge } from "@/components/ui/icons";

/* ─── Feature Icons (SVG, no emoji) ─────────────────────────────── */
const S = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IcoRocket = () => <svg {...S}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
const IcoNetwork = () => <svg {...S}><circle cx="12" cy="5" r="3" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><path d="M12 12l-6 6M12 12l6 6" /></svg>;
const IcoShield = () => <svg {...S}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const IcoZap = () => <svg {...S}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const IcoPackage = () => <svg {...S}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>;
const IcoSearch = () => <svg {...S}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const IcoEye = () => <svg {...S}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const IcoCpu = () => <svg {...S}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>;
const IcoTarget = () => <svg {...S}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const IcoGitBranch = () => <svg {...S}><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>;
const IcoSettings = () => <svg {...S}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IcoShare = () => <svg {...S}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
const IcoLayers = () => <svg {...S}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const IcoShuffle = () => <svg {...S}><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>;

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "Triển khai từ Docker Image": <IcoRocket />,
  "Build từ GitHub — Không cần Dockerfile": <IcoPackage />,
  "Scaffold dự án Microservices": <IcoNetwork />,
  "Quản trị cụm Kubernetes qua giao diện": <IcoShield />,
  "Cân bằng tải & Scale tự động": <IcoZap />,
  "Xử lý bất đồng bộ với BullMQ + DAG": <IcoLayers />,
  "Sub-second Page Loads": <IcoZap />,
  "Smart Inventory Sync": <IcoPackage />,
  "SEO Architecture": <IcoSearch />,
  "Visual Search": <IcoEye />,
  "Semantic Search": <IcoCpu />,
  "Personalised Feed": <IcoTarget />,
  "Module Graph Inspector": <IcoSearch />,
  "Route Analyser": <IcoGitBranch />,
  "Provider Registry": <IcoSettings />,
  "Universal Bridge": <IcoShare />,
  "Context Synapse": <IcoLayers />,
  "Smart Tool Routing": <IcoShuffle />,
};

const STACK_ICONS: Record<string, string> = {
  "NestJS": "/icons/nestjs-original.svg",
  "Next.js": "/icons/nextjs-original.svg",
  "Kubernetes": "/icons/kubernetes-plain.svg",
  "Docker": "/icons/docker-original.svg",
  "BullMQ": "/icons/redis-original.svg",
  "PostgreSQL": "/icons/postgresql-original.svg",
  "Ansible": "/icons/ansible-original.svg",
  "TypeScript": "/icons/typescript-original.svg",
  "Prisma": "/icons/prisma-original.svg",
  "MongoDB": "/icons/mongodb-original.svg",
  "Redis": "/icons/redis-original.svg",
  "Python": "/icons/python-original.svg",
  "React": "/icons/react-original.svg",
  "FastAPI": "/icons/fastapi-original.svg",
  "Node.js": "/icons/nodejs-original.svg",
};

const PROJECT_METADATA: Record<string, {
  subtitle: string;
  vision: string[];
  terminalLines: string[];
}> = {
  paas: {
    subtitle: "Nền tảng PaaS tự lưu trữ trên Kubernetes",
    vision: [
      "Đề tài xây dựng nền tảng PaaS tự lưu trữ dựa trên Kubernetes kết hợp giao diện web trực quan để che giấu sự phức tạp của hệ thống bên dưới. Mục tiêu là tái hiện trải nghiệm triển khai đơn giản mà shared hosting từng mang lại cho thời kỳ PHP/MySQL, nhưng trên nền tảng công nghệ hiện đại hỗ trợ đa ngôn ngữ và khả năng mở rộng theo chiều ngang.",
      "Hệ thống phục vụ hai nhóm đối tượng: Developer triển khai ứng dụng từ Docker Image, mã nguồn GitHub (tự động build qua Cloud Native Buildpacks không cần Dockerfile), hoặc khởi tạo nhanh dự án Microservices từ Blueprint; Admin quản trị cụm Kubernetes, thêm node, cài đặt hạ tầng thông qua giao diện web thay vì dòng lệnh.",
      "Kiến trúc bốn tầng: Backend NestJS, Frontend Next.js, cụm Kubernetes và các dịch vụ hỗ trợ. Các tác vụ triển khai nặng được xử lý bất đồng bộ qua hàng đợi BullMQ kết hợp cấu trúc DAG để điều phối tác vụ có quan hệ phụ thuộc.",
    ],
    terminalLines: [
      "$ ssh user@192.168.56.10",
      "$ sudo kubectl get nodes",
      "NAME                      STATUS   ROLES                       AGE",
      "master-192-168-56-10      Ready    control-plane,etcd,master   12m",
      "worker-vm                 Ready    <none>                      8m",
      "",
      "$ sudo kubectl get pods -n space-cmnzn5wi-space-1",
      "NAME                            READY   STATUS    RESTARTS",
      "user-api-db-postgresql-0        1/1     Running   0",
      "order-api-db-postgresql-0       1/1     Running   0",
      "user-api-6946995cdd-lhpw        1/1     Running   0",
      "order-api-7b8f4d6c89-zm2k       1/1     Running   0",
      "web-5d4f8a7b12-x9nq             1/1     Running   0",
    ],
  },
  "laptop-shop": {
    subtitle: "E-commerce platform optimised for high-end tech hardware with intelligent inventory management and lightning-fast page loads.",
    vision: [
      "Được xây dựng từ đầu với triết lý performance-first. Mỗi millisecond đều quan trọng trong e-commerce — trang có thể mất doanh thu nếu load chậm hơn 1 giây.",
      "System quản lý kho vận với realtime sync, tích hợp payment gateway và SEO-optimized page structure giúp organic traffic tăng trưởng bền vững.",
    ],
    terminalLines: [
      "build started: nextgen-laptop-shop",
      "compiling 247 routes...",
      "optimizing images: 1,240 assets",
      "lighthouse score: 98/100 [PASS]",
    ],
  },
  visionstore: {
    subtitle: "AI-powered shopping experience with computer vision product matching and personalised semantic search.",
    vision: [
      "VisionStore tái định nghĩa trải nghiệm mua sắm bằng cách đặt AI ở trung tâm. Thay vì tìm kiếm bằng từ khóa, người dùng upload ảnh hoặc mô tả bằng ngôn ngữ tự nhiên.",
      "Computer Vision pipeline xử lý hình ảnh sản phẩm và Semantic Search engine hiểu ý định người dùng, không chỉ keywords.",
    ],
    terminalLines: [
      "loading vision model: clip-vit-large...",
      "indexing 50,000 products...",
      "semantic index ready",
      "search latency: 42ms [FAST]",
    ],
  },
  "nestjs-devtools-mcp": {
    subtitle: "Model Context Protocol server enabling AI assistants to inspect, analyse and understand NestJS applications in real-time.",
    vision: [
      "Khi làm việc với AI assistant như Claude hay Cursor, một trong những điểm yếu lớn nhất là AI không thể nhìn thấy runtime state của ứng dụng.",
      "NestJS DevTools MCP giải quyết vấn đề này bằng cách expose NestJS module graph, routes và providers qua Model Context Protocol — cho phép AI hiểu ứng dụng như một developer thực thụ.",
    ],
    terminalLines: [
      "mcp server started on stdio",
      "tools registered: 8",
      "awaiting AI client connection...",
      "client connected: claude-3-5-sonnet",
    ],
  },
  "agent-bridge-kit": {
    subtitle: "Infrastructure toolkit for connecting AI agents with external services through a reliable, context-aware routing layer.",
    vision: [
      "Khi xây dựng multi-agent systems, vấn đề không phải là viết một agent — mà là kết nối nhiều agents lại với nhau một cách đáng tin cậy.",
      "Agent Bridge Kit cung cấp một abstraction layer chuẩn hóa cách agents giao tiếp với tools và services. Synapse quản lý context, memory persistence và intelligent tool routing.",
    ],
    terminalLines: [
      "agent-bridge-kit v0.4.2 starting...",
      "synapse layer initialized",
      "tools loaded: 24",
      "routing engine ready [OK]",
    ],
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
function IconNE() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */
/**
 * Thành phần hiển thị card cho từng video demo từ YouTube
 * Thao tác với IntersectionObserver để tối ưu hiệu suất tải (Lazy loading)
 */
function VideoCard({ video }: { video: { id: string; title: string; desc: string; youtubeId: string } }) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="yt-card">
      <div className="yt-info">
        <h3 className="yt-title">{video.title}</h3>
        <p className="yt-desc">{video.desc}</p>
      </div>

      <div className="yt-divider" />

      <div className="yt-frame-wrap" ref={videoRef}>
        {isIntersecting ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder-grid" />
            <span className="coming-soon-badge">Loading preview...</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Thành phần hiển thị danh sách các video demo của dự án
 */
function VideoShowcase({ videos }: { videos: { id: string; title: string; desc: string; youtubeId: string }[] }) {
  return (
    <div className="video-showcase">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}

/**
 * Thành phần hiển thị thông tin về hạ tầng triển khai (Dành riêng cho dự án PaaS)
 */
function EnvironmentInfo() {
  const envs = [
    {
      title: "Host Machine",
      ip: "192.168.56.13",
      items: ["Backend API (NestJS)", "Frontend (Next.js)", "PostgreSQL"],
    },
    {
      title: "Master VM (Control Plane)",
      ip: "192.168.56.10",
      items: ["Kubernetes Control Plane", "Traefik Ingress", "Local Registry", "Kpack (Build service)"],
    },
    {
      title: "Worker VM",
      ip: "192.168.56.11",
      items: ["Application workloads (Pods)", "Metrics Server", "Prometheus/Grafana"],
    },
  ];

  return (
    <section className="detail-section">
      <p className="section-label">Hạ tầng</p>
      <h2>Môi Trường Triển Khai</h2>
      <div className="env-grid">
        {envs.map((env) => (
          <div key={env.ip} className="env-card">
            <div className="env-card-header">
              <span className="env-card-title">{env.title}</span>
              <span className="env-ip">{env.ip}</span>
            </div>
            <div className="env-list">
              {env.items.map((item) => (
                <div key={item} className="env-item">
                  <div className="env-item-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const metadata = PROJECT_METADATA[slug];
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  if (!project || !metadata) notFound();

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.screenshots) {
      setSelectedImgIdx((prev) => (prev !== null ? (prev - 1 + project.screenshots!.length) % project.screenshots!.length : null));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.screenshots) {
      setSelectedImgIdx((prev) => (prev !== null ? (prev + 1) % project.screenshots!.length : null));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIdx === null || !project.screenshots) return;
      if (e.key === "Escape") setSelectedImgIdx(null);
      if (e.key === "ArrowLeft") setSelectedImgIdx((prev) => (prev !== null ? (prev - 1 + project.screenshots!.length) % project.screenshots!.length : null));
      if (e.key === "ArrowRight") setSelectedImgIdx((prev) => (prev !== null ? (prev + 1) % project.screenshots!.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIdx, project.screenshots]);


  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">NGÔ GIA HẠO</Link>
          <div className="nav-links">
            <Link href="/#projects" className="nav-link">Projects</Link>
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="detail-hero">
        <div className="container">
          <div>
            <Link href="/#projects" className="back-link">
              <IconBack /> Quay lại Dự Án
            </Link>
          </div>

          <p className="section-label">{metadata.subtitle}</p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{metadata.subtitle}</p>

          <div className="detail-action-row">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Preview <IconExternal />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <IconGithub /> GitHub
              </a>
            )}
          </div>

          {/* Tech stack badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
            {project.techStack?.map((t) => {
              const icon = STACK_ICONS[t.name];
              return icon ? (
                <Badge key={t.name} icon={icon} name={t.name} />
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <div className="container">
        {slug === "paas" && project.videos && project.videos.length > 0 ? (
          <VideoShowcase videos={project.videos.map(v => ({
            id: v.url.split('v=')[1] || '',
            title: v.title,
            desc: v.description || '',
            youtubeId: v.url.split('v=')[1] || '',
          }))} />
        ) : (
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
                Video demo
              </p>
            </div>
          </div>
        )}
      </div>

      {/* THE VISION */}
      <div className="container">
        <section className="detail-section">
          <h2 className="section-label">Tổng quan</h2>
          {/* <h2>Tầm Nhìn</h2> */}
          {metadata.vision.map((para: string, i: number) => <p key={i}>{para}</p>)}
        </section>

        {/* ENVIRONMENT INFO (PAAS ONLY) */}
        {slug === "paas" && <EnvironmentInfo />}

        {/* KEY FEATURES */}
        <section className="detail-section">
          <p className="section-label">Tính năng</p>
          <h2>Tính Năng Chính</h2>
          <div className="feature-list">
            {project.features?.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon">{FEATURE_ICONS[f.title]}</div>
                <div className="feature-content">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TERMINAL */}
        <section className="detail-section">
          <p className="section-label">Nhật ký</p>
          <h2>Nhật Ký Phát Triển</h2>
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
              {metadata.terminalLines.map((line: string, i: number) => (
                <div key={i}>
                  <span className="t-prompt">❯ </span>{line}
                </div>
              ))}
              <div><span className="t-prompt">❯ </span><span className="t-cursor">█</span></div>
            </div>
          </div>
        </section>

        {/* SCREENSHOTS */}
        {project.screenshots && (
          <section className="detail-section">
            <p className="section-label">Thư viện ảnh</p>
            <h2>Giao Diện Nền Tảng</h2>
            <div className="screenshot-grid">
              {project.screenshots.map((screenshot, i) => (
                <div
                  key={i}
                  className="screenshot-item"
                  onClick={() => setSelectedImgIdx(i)}
                >
                  <Image src={screenshot.url} alt={screenshot.alt} width={800} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedImgIdx !== null && project.screenshots && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImgIdx(null)}
            >
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <motion.button
                  className="lightbox-close"
                  onClick={() => setSelectedImgIdx(null)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </motion.button>

                <motion.button
                  className="lightbox-nav lightbox-prev"
                  onClick={handlePrev}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </motion.button>

                <motion.div
                  className="lightbox-img-container"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src={project.screenshots[selectedImgIdx].url}
                    alt={project.screenshots[selectedImgIdx].alt}
                    width={1920}
                    height={1080}
                    style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain", borderRadius: "var(--r-md)" }}
                    sizes="90vw"
                  />
                </motion.div>

                <motion.button
                  className="lightbox-nav lightbox-next"
                  onClick={handleNext}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </motion.button>

                <motion.div
                  className="lightbox-counter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedImgIdx + 1} / {project.screenshots.length}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="cta-card">
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Quan tâm đến kiến trúc hệ thống?</h3>
            <p>Tôi luôn sẵn sàng thảo luận về system design, cloud orchestration hoặc các cơ hội hợp tác.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/#contact" className="btn btn-primary">
              Liên Hệ Ngay <IconNE />
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <IconGithub /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer" style={{ marginTop: "4rem" }}>
        <div className="container">
          <p>© 2026 Ngô Gia Hạo. Xây dựng với Next.js.</p>
        </div>
      </footer>
    </>
  );
}
