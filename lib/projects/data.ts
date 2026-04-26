import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    slug: "paas",
    title: "PaaS trên Kubernetes",
    desc: "Nền tảng dịch vụ (PaaS) hỗ trợ triển khai ứng dụng tự động. Tích hợp NestJS cho backend ổn định và Kubernetes để quản lý container linh hoạt, từ git push đến live URL.",
    image: "/image/paas_project/trang_chu.jpg",
    tags: ["NestJS", "Next.js", "Kubernetes", "Docker", "BullMQ", "PostgreSQL"],
    github: null,
    demo: null,
    longDescription: "Nền tảng PaaS tự lưu trữ trên Kubernetes",
    features: [
      { title: "Triển khai từ Docker Image", description: "Cung cấp tên image, hệ thống tự động tạo Deployment, Service, Ingress và cấp phát URL truy cập chỉ qua vài thao tác trên giao diện." },
      { title: "Build từ GitHub — Không cần Dockerfile", description: "Cloud Native Buildpacks tự động nhận diện ngôn ngữ (Node.js, Java, Python, Go, PHP), build container image chuẩn OCI và triển khai lên cụm." },
      { title: "Scaffold dự án Microservices", description: "Chọn Blueprint (Next.js + Express + PostgreSQL), hệ thống tự động tạo GitHub repos, cấp database, build image và triển khai theo DAG 3 tầng: DB → API → Frontend." },
      { title: "Quản trị cụm Kubernetes qua giao diện", description: "Khởi tạo cluster, thêm node, cài đặt hạ tầng (Kpack, Redis, Metrics Server, Prometheus), cordon/drain/remove node — tất cả qua web UI, không cần SSH." },
      { title: "Cân bằng tải & Scale tự động", description: "Scale replica qua giao diện, Kubernetes phân phối request đều giữa các Pod trên nhiều node. Kịch bản 500 request cho kết quả 167/167/166." },
      { title: "Xử lý bất đồng bộ với BullMQ + DAG", description: "Tác vụ triển khai được đẩy vào hàng đợi BullMQ, xử lý bởi worker riêng biệt. BullMQ Flow điều phối tác vụ có phụ thuộc theo cấu trúc DAG." },
    ],
    techStack: [
      { name: "NestJS", category: "backend" },
      { name: "Next.js", category: "frontend" },
      { name: "Kubernetes", category: "devops" },
      { name: "Docker", category: "devops" },
      { name: "BullMQ", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Ansible", category: "devops" },
      { name: "TypeScript", category: "backend" },
      { name: "Prisma", category: "backend" },
    ],
    screenshots: [
      { url: "/image/paas_project/trang_chu.jpg", alt: "Trang chủ PaaS Platform" },
      { url: "/image/paas_project/dashboard.jpg", alt: "Dashboard quản lý" },
      { url: "/image/paas_project/space.jpg", alt: "Space management" },
      { url: "/image/paas_project/kubernetes_resource_manager.jpg", alt: "Kubernetes Resource Manager" },
      { url: "/image/paas_project/node_manager.jpg", alt: "Node Manager" },
      { url: "/image/paas_project/node_detail.jpg", alt: "Node Detail" },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=6hkUHJolqnQ",
        title: "Khởi Tạo Cụm Kubernetes",
        description: "Khởi tạo cluster từ trạng thái zero-node: nhập SSH credentials → Ansible tự động cài Kubernetes → cấu hình mạng → thu thập join token → thêm Worker Node → cài đặt hạ tầng bổ sung.",
      },
      {
        url: "https://www.youtube.com/watch?v=i2GFYuC8duw",
        title: "Quản Trị Tài Nguyên Kubernetes",
        description: "Duyệt Namespace, Deployment, Pod, Service, Ingress trực tiếp trên giao diện web. Chỉnh sửa YAML trên trình duyệt qua Monaco Editor. Đối chiếu với kubectl.",
      },
      {
        url: "https://www.youtube.com/watch?v=tipTp5xoJok",
        title: "Triển Khai App Full-stack",
        description: "Deploy ứng dụng full-stack gồm React + Vite (frontend), NestJS (backend) và PostgreSQL (database) lên cụm Kubernetes hoàn toàn qua giao diện web. Hệ thống tự động tạo Deployment, Service, Ingress, cấp phát database và URL truy cập.",
      },
      {
        url: "https://www.youtube.com/watch?v=ifERTaV9740",
        title: "Build & Deploy Spring Boot Từ GitHub — Không Cần Dockerfile",
        description: "Kpack tự động nhận diện ứng dụng Spring Boot từ repository GitHub, build OCI image chuẩn không cần Dockerfile, push vào Local Registry và triển khai lên cụm. Developer chỉ cần cung cấp URL repository.",
      },
      {
        url: "https://www.youtube.com/watch?v=YBXgYm5sEK0",
        title: "Scaffold Dự Án Microservices Từ Blueprint",
        description: "Tính năng phức tạp nhất: chọn Blueprint → hệ thống tự tạo 5 dịch vụ (2 DB + 2 API + 1 Frontend) theo DAG 3 tầng, sinh mã nguồn, push GitHub, build image và triển khai toàn bộ.",
      },
    ],
    environment: {
      frontend: "Next.js 15",
      backend: "NestJS 11",
      database: "PostgreSQL 15",
    },
  },
  {
    slug: "laptop-shop",
    title: "NextGen Laptop Shop",
    desc: "Nền tảng thương mại điện tử chuyên biệt cho thiết bị công nghệ cao. Tối ưu SEO, tốc độ tải trang nhanh và hệ thống quản lý kho vận thông minh với đồng bộ tồn kho realtime.",
    image: "/image/laptop-shop-thumbnail.jpg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Redis"],
    github: "https://github.com",
    demo: "https://example.com",
    longDescription: "E-commerce platform optimised for high-end tech hardware with intelligent inventory management and lightning-fast page loads.",
    features: [
      { title: "Sub-second Page Loads", description: "ISR và edge caching đảm bảo tốc độ tải trang dưới 1 giây ngay cả ở peak traffic." },
      { title: "Smart Inventory Sync", description: "Realtime inventory tracking với tự động cảnh báo và reorder suggestion dựa trên AI." },
      { title: "SEO Architecture", description: "Structured data, canonical URLs, và sitemap tự động giúp tăng organic search traffic." },
    ],
    techStack: [
      { name: "Next.js", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "MongoDB", category: "database" },
      { name: "Redis", category: "database" },
      { name: "Docker", category: "devops" },
    ],
  },
  {
    slug: "visionstore",
    title: "VisionStore",
    desc: "Ứng dụng mua sắm thông minh tích hợp AI gợi ý sản phẩm cá nhân hóa. Computer Vision pipeline xử lý hình ảnh sản phẩm kết hợp Semantic Search mang đến trải nghiệm tìm kiếm trực quan.",
    image: "/image/visionstore-thumbnail.jpg",
    tags: ["Python", "React", "FastAPI", "PostgreSQL"],
    github: "https://github.com",
    demo: null,
    longDescription: "AI-powered shopping experience with computer vision product matching and personalised semantic search.",
    features: [
      { title: "Visual Search", description: "Upload ảnh để tìm sản phẩm tương tự trong toàn bộ catalog với độ chính xác cao." },
      { title: "Semantic Search", description: "Tìm kiếm bằng ngôn ngữ tự nhiên — hỏi như hỏi người thật, nhận kết quả chính xác." },
      { title: "Personalised Feed", description: "AI học từ hành vi người dùng để cá nhân hóa trải nghiệm mua sắm theo thời gian." },
    ],
    techStack: [
      { name: "Python", category: "backend" },
      { name: "React", category: "frontend" },
      { name: "FastAPI", category: "backend" },
      { name: "PostgreSQL", category: "database" },
    ],
  },
  {
    slug: "nestjs-devtools-mcp",
    title: "NestJS DevTools MCP",
    desc: "Model Context Protocol server dành cho hệ sinh thái NestJS. Cho phép AI assistant truy vấn module dependency graph, controller routes và providers trong thời gian thực.",
    image: "/image/nestjs-mcp-thumbnail.jpg",
    tags: ["NestJS", "TypeScript", "Node.js"],
    github: "https://github.com",
    demo: null,
    longDescription: "Model Context Protocol server enabling AI assistants to inspect, analyse and understand NestJS applications in real-time.",
    features: [
      { title: "Module Graph Inspector", description: "Trực quan hóa realtime toàn bộ dependency graph, circular dependencies và lazy modules." },
      { title: "Route Analyser", description: "Kiểm tra tất cả HTTP routes, guards, interceptors và middlewares đang hoạt động." },
      { title: "Provider Registry", description: "Xem toàn bộ providers, scope và injection tokens trong runtime context." },
    ],
    techStack: [
      { name: "NestJS", category: "backend" },
      { name: "TypeScript", category: "backend" },
      { name: "Node.js", category: "backend" },
    ],
  },
  {
    slug: "agent-bridge-kit",
    title: "Agent Bridge Kit & Synapse",
    desc: "Bộ công cụ kết nối AI agent với các dịch vụ bên ngoài. Synapse layer quản lý context, memory và tool routing cho hệ thống multi-agent một cách hiệu quả và đáng tin cậy.",
    image: "/image/agent-bridge-thumbnail.jpg",
    tags: ["Python", "TypeScript", "Docker", "Redis"],
    github: "https://github.com",
    demo: null,
    longDescription: "Infrastructure toolkit for connecting AI agents with external services through a reliable, context-aware routing layer.",
    features: [
      { title: "Universal Bridge", description: "Kết nối bất kỳ AI framework (LangChain, CrewAI, AutoGen) với external services qua một interface thống nhất." },
      { title: "Context Synapse", description: "Shared memory layer giúp agents nhớ và chia sẻ context across sessions và tools." },
      { title: "Smart Tool Routing", description: "Tự động chọn và chain tools dựa trên agent intent, không cần hardcode workflows." },
    ],
    techStack: [
      { name: "Python", category: "backend" },
      { name: "TypeScript", category: "backend" },
      { name: "Docker", category: "devops" },
      { name: "Redis", category: "database" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map(p => p.slug);
}