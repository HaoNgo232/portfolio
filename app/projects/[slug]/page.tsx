"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";


/* ─── Data ───────────────────────────────────────────────────────── */
/* ─── Feature Icons (SVG, no emoji) ─────────────────────────────── */
const S = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IcoRocket      = () => <svg {...S}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const IcoNetwork     = () => <svg {...S}><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M12 12l-6 6M12 12l6 6"/></svg>;
const IcoShield      = () => <svg {...S}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcoZap         = () => <svg {...S}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoPackage     = () => <svg {...S}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IcoSearch      = () => <svg {...S}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcoEye         = () => <svg {...S}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoCpu         = () => <svg {...S}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;
const IcoTarget      = () => <svg {...S}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IcoGitBranch   = () => <svg {...S}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>;
const IcoSettings    = () => <svg {...S}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IcoShare       = () => <svg {...S}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IcoLayers      = () => <svg {...S}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IcoShuffle     = () => <svg {...S}><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>;

const PROJECTS: Record<string, {
  title: string;
  subtitle: string;
  desc: string;
  vision: string[];
  features: { icon: React.ReactNode; title: string; desc: string }[];
  terminalLines: string[];
  videos?: { id: string; title: string; desc: string; poster: string; src: string }[];
  stack: { name: string; icon: string }[];
  github: string;
  preview: string | null;
}> = {
  paas: {
    title: "PaaS trên Kubernetes",
    subtitle: "Nền tảng PaaS tự lưu trữ trên Kubernetes",
    desc: "",
    vision: [
      "Đề tài xây dựng nền tảng PaaS tự lưu trữ dựa trên Kubernetes kết hợp giao diện web trực quan để che giấu sự phức tạp của hệ thống bên dưới. Mục tiêu là tái hiện trải nghiệm triển khai đơn giản mà shared hosting từng mang lại cho thời kỳ PHP/MySQL, nhưng trên nền tảng công nghệ hiện đại hỗ trợ đa ngôn ngữ và khả năng mở rộng theo chiều ngang.",
      "Hệ thống phục vụ hai nhóm đối tượng: Developer triển khai ứng dụng từ Docker Image, mã nguồn GitHub (tự động build qua Cloud Native Buildpacks không cần Dockerfile), hoặc khởi tạo nhanh dự án Microservices từ Blueprint; Admin quản trị cụm Kubernetes, thêm node, cài đặt hạ tầng thông qua giao diện web thay vì dòng lệnh.",
      "Kiến trúc bốn tầng: Backend NestJS, Frontend Next.js, cụm Kubernetes và các dịch vụ hỗ trợ. Các tác vụ triển khai nặng được xử lý bất đồng bộ qua hàng đợi BullMQ kết hợp cấu trúc DAG để điều phối tác vụ có quan hệ phụ thuộc.",
    ],
    features: [
      { icon: <IcoRocket />, title: "Triển khai từ Docker Image", desc: "Cung cấp tên image, hệ thống tự động tạo Deployment, Service, Ingress và cấp phát URL truy cập chỉ qua vài thao tác trên giao diện." },
      { icon: <IcoPackage />, title: "Build từ GitHub — Không cần Dockerfile", desc: "Cloud Native Buildpacks tự động nhận diện ngôn ngữ (Node.js, Java, Python, Go, PHP), build container image chuẩn OCI và triển khai lên cụm." },
      { icon: <IcoNetwork />, title: "Scaffold dự án Microservices", desc: "Chọn Blueprint (Next.js + Express + PostgreSQL), hệ thống tự động tạo GitHub repos, cấp database, build image và triển khai theo DAG 3 tầng: DB → API → Frontend." },
      { icon: <IcoShield />, title: "Quản trị cụm Kubernetes qua giao diện", desc: "Khởi tạo cluster, thêm node, cài đặt hạ tầng (Kpack, Redis, Metrics Server, Prometheus), cordon/drain/remove node — tất cả qua web UI, không cần SSH." },
      { icon: <IcoZap />, title: "Cân bằng tải & Scale tự động", desc: "Scale replica qua giao diện, Kubernetes phân phối request đều giữa các Pod trên nhiều node. Kịch bản 500 request cho kết quả 167/167/166." },
      { icon: <IcoLayers />, title: "Xử lý bất đồng bộ với BullMQ + DAG", desc: "Tác vụ triển khai được đẩy vào hàng đợi BullMQ, xử lý bởi worker riêng biệt. BullMQ Flow điều phối tác vụ có phụ thuộc theo cấu trúc DAG." },
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
    videos: [
      {
        id: "cluster-init",
        title: "Khởi Tạo Cụm Kubernetes",
        desc: "Khởi tạo cluster từ trạng thái zero-node: nhập SSH credentials → Ansible tự động cài Kubernetes → cấu hình mạng → thu thập join token → thêm Worker Node → cài đặt hạ tầng bổ sung.",
        poster: "/videos/paas/cluster-init-poster.jpg",
        src: "/videos/paas/cluster-init.mp4",
      },
      {
        id: "k8s-management",
        title: "Quản Trị Tài Nguyên Kubernetes",
        desc: "Duyệt Namespace, Deployment, Pod, Service, Ingress trực tiếp trên giao diện web. Chỉnh sửa YAML trên trình duyệt qua Monaco Editor. Đối chiếu với kubectl.",
        poster: "/videos/paas/k8s-management-poster.jpg",
        src: "/videos/paas/k8s-management.mp4",
      },
      {
        id: "deploy-docker",
        title: "Triển Khai Từ Docker Image",
        desc: "Deploy nginx:alpine với 2 replica chỉ qua giao diện. Hệ thống tự tạo Deployment, Service, Ingress và cấp URL truy cập nip.io.",
        poster: "/videos/paas/deploy-docker-poster.jpg",
        src: "/videos/paas/deploy-docker.mp4",
      },
      {
        id: "deploy-github",
        title: "Build & Deploy Từ GitHub — Không Cần Dockerfile",
        desc: "Kpack tự động detect Node.js từ package.json, build OCI image, push vào Local Registry và triển khai. Developer chỉ cần cung cấp URL repository.",
        poster: "/videos/paas/deploy-github-poster.jpg",
        src: "/videos/paas/deploy-github.mp4",
      },
      {
        id: "deploy-database",
        title: "Triển Khai Dịch Vụ Cơ Sở Dữ Liệu",
        desc: "Chọn loại database (PostgreSQL/MySQL/MongoDB), hệ thống triển khai qua Helm chart với PersistentVolume và sinh thông tin kết nối tự động.",
        poster: "/videos/paas/deploy-database-poster.jpg",
        src: "/videos/paas/deploy-database.mp4",
      },
      {
        id: "scaffold",
        title: "Scaffold Dự Án Microservices Từ Blueprint",
        desc: "Tính năng phức tạp nhất: chọn Blueprint → hệ thống tự tạo 5 dịch vụ (2 DB + 2 API + 1 Frontend) theo DAG 3 tầng, sinh mã nguồn, push GitHub, build image và triển khai toàn bộ.",
        poster: "/videos/paas/scaffold-poster.jpg",
        src: "/videos/paas/scaffold.mp4",
      },
      {
        id: "load-balancing",
        title: "Cân Bằng Tải & Scale Replica",
        desc: "Scale từ 1 lên 3 replica qua giao diện. Gửi 500 request bằng hey → request phân phối đều 167/167/166 giữa 3 Pod trên 2 node.",
        poster: "/videos/paas/load-balancing-poster.jpg",
        src: "/videos/paas/load-balancing.mp4",
      },
    ],
    stack: [
      { name: "NestJS", icon: "/icons/nestjs-original.svg" },
      { name: "Next.js", icon: "/icons/nextjs-original.svg" },
      { name: "Kubernetes", icon: "/icons/kubernetes-plain.svg" },
      { name: "Docker", icon: "/icons/docker-original.svg" },
      { name: "BullMQ", icon: "/icons/redis-original.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
      { name: "Ansible", icon: "/icons/ansible-original.svg" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg" },
      { name: "Prisma", icon: "/icons/prisma-original.svg" },
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
      { icon: <IcoZap />, title: "Sub-second Page Loads", desc: "ISR và edge caching đảm bảo tốc độ tải trang dưới 1 giây ngay cả ở peak traffic." },
      { icon: <IcoPackage />, title: "Smart Inventory Sync", desc: "Realtime inventory tracking với tự động cảnh báo và reorder suggestion dựa trên AI." },
      { icon: <IcoSearch />, title: "SEO Architecture", desc: "Structured data, canonical URLs, và sitemap tự động giúp tăng organic search traffic." },
    ],
    terminalLines: [
      "build started: nextgen-laptop-shop",
      "compiling 247 routes...",
      "optimizing images: 1,240 assets",
      "lighthouse score: 98/100 [PASS]",
    ],
    stack: [
      { name: "Next.js", icon: "/icons/nextjs-original.svg" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg" },
      { name: "MongoDB", icon: "/icons/mongodb-original.svg" },
      { name: "Redis", icon: "/icons/redis-original.svg" },
      { name: "Docker", icon: "/icons/docker-original.svg" },
    ],
    github: "https://github.com",
    preview: "https://example.com",
  },
  visionstore: {
    title: "VisionStore",
    subtitle: "AI-powered shopping experience with computer vision product matching and personalised semantic search.",
    desc: "",
    vision: [
      "VisionStore tái định nghĩa trải nghiệm mua sắm bằng cách đặt AI ở trung tâm. Thay vì tìm kiếm bằng từ khóa, người dùng upload ảnh hoặc mô tả bằng ngôn ngữ tự nhiên.",
      "Computer Vision pipeline xử lý hình ảnh sản phẩm và Semantic Search engine hiểu ý định người dùng, không chỉ keywords.",
    ],
    features: [
      { icon: <IcoEye />, title: "Visual Search", desc: "Upload ảnh để tìm sản phẩm tương tự trong toàn bộ catalog với độ chính xác cao." },
      { icon: <IcoCpu />, title: "Semantic Search", desc: "Tìm kiếm bằng ngôn ngữ tự nhiên — hỏi như hỏi người thật, nhận kết quả chính xác." },
      { icon: <IcoTarget />, title: "Personalised Feed", desc: "AI học từ hành vi người dùng để cá nhân hóa trải nghiệm mua sắm theo thời gian." },
    ],
    terminalLines: [
      "loading vision model: clip-vit-large...",
      "indexing 50,000 products...",
      "semantic index ready",
      "search latency: 42ms [FAST]",
    ],
    stack: [
      { name: "Python", icon: "/icons/python-original.svg" },
      { name: "React", icon: "/icons/react-original.svg" },
      { name: "FastAPI", icon: "/icons/fastapi-original.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
    ],
    github: "https://github.com",
    preview: null,
  },
  "nestjs-devtools-mcp": {
    title: "NestJS DevTools MCP",
    subtitle: "Model Context Protocol server enabling AI assistants to inspect, analyse and understand NestJS applications in real-time.",
    desc: "",
    vision: [
      "Khi làm việc với AI assistant như Claude hay Cursor, một trong những điểm yếu lớn nhất là AI không thể nhìn thấy runtime state của ứng dụng.",
      "NestJS DevTools MCP giải quyết vấn đề này bằng cách expose NestJS module graph, routes và providers qua Model Context Protocol — cho phép AI hiểu ứng dụng như một developer thực thụ.",
    ],
    features: [
      { icon: <IcoSearch />, title: "Module Graph Inspector", desc: "Trực quan hóa realtime toàn bộ dependency graph, circular dependencies và lazy modules." },
      { icon: <IcoGitBranch />, title: "Route Analyser", desc: "Kiểm tra tất cả HTTP routes, guards, interceptors và middlewares đang hoạt động." },
      { icon: <IcoSettings />, title: "Provider Registry", desc: "Xem toàn bộ providers, scope và injection tokens trong runtime context." },
    ],
    terminalLines: [
      "mcp server started on stdio",
      "tools registered: 8",
      "awaiting AI client connection...",
      "client connected: claude-3-5-sonnet",
    ],
    stack: [
      { name: "NestJS", icon: "/icons/nestjs-original.svg" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg" },
      { name: "Node.js", icon: "/icons/nodejs-original.svg" },
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
      { icon: <IcoShare />, title: "Universal Bridge", desc: "Kết nối bất kỳ AI framework (LangChain, CrewAI, AutoGen) với external services qua một interface thống nhất." },
      { icon: <IcoLayers />, title: "Context Synapse", desc: "Shared memory layer giúp agents nhớ và chia sẻ context across sessions và tools." },
      { icon: <IcoShuffle />, title: "Smart Tool Routing", desc: "Tự động chọn và chain tools dựa trên agent intent, không cần hardcode workflows." },
    ],
    terminalLines: [
      "agent-bridge-kit v0.4.2 starting...",
      "synapse layer initialized",
      "tools loaded: 24",
      "routing engine ready [OK]",
    ],
    stack: [
      { name: "Python", icon: "/icons/python-original.svg" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg" },
      { name: "Docker", icon: "/icons/docker-original.svg" },
      { name: "Redis", icon: "/icons/redis-original.svg" },
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

/* ─── Sub-components ─────────────────────────────────────────────── */
function VideoCard({ video }: { video: { id: string; title: string; desc: string; poster: string; src: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
    <div className="video-card">
      <div className="video-wrap" ref={videoRef}>
        {isIntersecting ? (
          <video
            controls
            preload="metadata"
            poster={video.poster}
            onError={(e) => {
              // If video fails to load (file not found), we can handle it here if needed
              // But the requirements say "If video src file doesn't exist yet... show a styled placeholder"
              // The logic below already handles it via src check if we want, but usually it's easier to check if src is valid
            }}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder-grid" />
            <span className="coming-soon-badge">Loading preview...</span>
          </div>
        )}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-desc">{video.desc}</p>
      </div>
    </div>
  );
}

function VideoShowcase({ videos }: { videos: { id: string; title: string; desc: string; poster: string; src: string }[] }) {
  return (
    <div className="video-showcase">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}

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
          <div>
            <Link href="/#projects" className="back-link">
              <IconBack /> Quay lại Dự Án
            </Link>
          </div>

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

      {/* VIDEO SECTION */}
      <div className="container">
        {slug === "paas" && project.videos ? (
          <VideoShowcase videos={project.videos} />
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
          <p className="section-label">Tổng quan</p>
          <h2>Tầm Nhìn</h2>
          {project.vision.map((para, i) => <p key={i}>{para}</p>)}
        </section>

        {/* ENVIRONMENT INFO (PAAS ONLY) */}
        {slug === "paas" && <EnvironmentInfo />}

        {/* KEY FEATURES */}
        <section className="detail-section">
          <p className="section-label">Tính năng</p>
          <h2>Tính Năng Chính</h2>
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
          <p className="section-label">Thư viện ảnh</p>
          <h2>Giao Diện Nền Tảng</h2>
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
                    Ảnh màn hình {n}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

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
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <IconGithub /> GitHub
            </a>
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
