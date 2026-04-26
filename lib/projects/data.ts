import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    slug: "paas",
    title: "PaaS trên Kubernetes",
    desc: "Nền tảng dịch vụ (PaaS) hỗ trợ triển khai ứng dụng tự động. Tích hợp NestJS cho backend ổn định và Kubernetes để quản lý container linh hoạt, từ git push đến live URL.",
    image: "/image/paas_project/trang_chu.jpg",
    github: null,
    demo: null,
    displayNumber: "01",
    displaySubtitle: "Platform-as-a-Service",
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
    features: [
      {
        title: "Triển khai từ Docker Image",
        description:
          "Cung cấp tên image, hệ thống tự động tạo Deployment, Service, Ingress và cấp phát URL truy cập chỉ qua vài thao tác trên giao diện.",
        icon: "Deployment",
      },
      {
        title: "Build từ GitHub — Không cần Dockerfile",
        description:
          "Cloud Native Buildpacks tự động nhận diện ngôn ngữ (Node.js, Java, Python, Go, PHP), build container image chuẩn OCI và triển khai lên cụm.",
        icon: "Build",
      },
      {
        title: "Scaffold dự án Microservices",
        description:
          "Chọn Blueprint (Next.js + Express + PostgreSQL), hệ thống tự động tạo GitHub repos, cấp database, build image và triển khai theo DAG 3 tầng: DB → API → Frontend.",
        icon: "Scaffold",
      },
      {
        title: "Quản trị cụm Kubernetes qua giao diện",
        description:
          "Khởi tạo cluster, thêm node, cài đặt hạ tầng (Kpack, Redis, Metrics Server, Prometheus), cordon/drain/remove node — tất cả qua web UI, không cần SSH.",
        icon: "Cluster",
      },
      {
        title: "Cân bằng tải & Scale tự động",
        description:
          "Scale replica qua giao diện, Kubernetes phân phối request đều giữa các Pod trên nhiều node. Kịch bản 500 request cho kết quả 167/167/166.",
        icon: "LoadBalancer",
      },
      {
        title: "Xử lý bất đồng bộ với BullMQ + DAG",
        description:
          "Tác vụ triển khai được đẩy vào hàng đợi BullMQ, xử lý bởi worker riêng biệt. BullMQ Flow điều phối tác vụ có phụ thuộc theo cấu trúc DAG.",
        icon: "Queue",
      },
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
      {
        url: "/image/paas_project/trang_chu.jpg",
        alt: "Trang chủ PaaS Platform",
      },
      { url: "/image/paas_project/dashboard.jpg", alt: "Dashboard quản lý" },
      { url: "/image/paas_project/space.jpg", alt: "Space management" },
      {
        url: "/image/paas_project/kubernetes_resource_manager.jpg",
        alt: "Kubernetes Resource Manager",
      },
      { url: "/image/paas_project/node_manager.jpg", alt: "Node Manager" },
      { url: "/image/paas_project/node_detail.jpg", alt: "Node Detail" },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=6hkUHJolqnQ",
        title: "Khởi Tạo Cụm Kubernetes",
        description:
          "Khởi tạo cluster từ trạng thái zero-node: nhập SSH credentials → Ansible tự động cài Kubernetes → cấu hình mạng → thu thập join token → thêm Worker Node → cài đặt hạ tầng bổ sung.",
      },
      {
        url: "https://www.youtube.com/watch?v=i2GFYuC8duw",
        title: "Quản Trị Tài Nguyên Kubernetes",
        description:
          "Duyệt Namespace, Deployment, Pod, Service, Ingress trực tiếp trên giao diện web. Chỉnh sửa YAML trên trình duyệt qua Monaco Editor. Đối chiếu với kubectl.",
      },
      {
        url: "https://www.youtube.com/watch?v=tipTp5xoJok",
        title: "Triển Khai App Full-stack",
        description:
          "Deploy ứng dụng full-stack gồm React + Vite (frontend), NestJS (backend) và PostgreSQL (database) lên cụm Kubernetes hoàn toàn qua giao diện web. Hệ thống tự động tạo Deployment, Service, Ingress, cấp phát database và URL truy cập.",
      },
      {
        url: "https://www.youtube.com/watch?v=ifERTaV9740",
        title: "Build & Deploy Spring Boot Từ GitHub — Không Cần Dockerfile",
        description:
          "Kpack tự động nhận diện ứng dụng Spring Boot từ repository GitHub, build OCI image chuẩn không cần Dockerfile, push vào Local Registry và triển khai lên cụm. Developer chỉ cần cung cấp URL repository.",
      },
      {
        url: "https://www.youtube.com/watch?v=YBXgYm5sEK0",
        title: "Scaffold Dự Án Microservices Từ Blueprint",
        description:
          "Tính năng phức tạp nhất: chọn Blueprint → hệ thống tự tạo 5 dịch vụ (2 DB + 2 API + 1 Frontend) theo DAG 3 tầng, sinh mã nguồn, push GitHub, build image và triển khai toàn bộ.",
      },
    ],
    environment: [
      {
        name: "Host Machine",
        ip: "192.168.56.13",
        role: "Backend API (NestJS), Frontend (Next.js), PostgreSQL",
      },
      {
        name: "Master VM (Control Plane)",
        ip: "192.168.56.10",
        role: "Kubernetes Control Plane, Traefik Ingress, Local Registry, Kpack (Build service)",
      },
      {
        name: "Worker VM",
        ip: "192.168.56.11",
        role: "Application workloads (Pods), Metrics Server, Prometheus/Grafana",
      },
    ],
  },
  {
    slug: "laptop-shop",
    title: "NextGen Laptop Shop",
    desc: "Nền tảng thương mại điện tử chuyên biệt cho thiết bị công nghệ cao. Tối ưu SEO, tốc độ tải trang nhanh và hệ thống quản lý kho vận thông minh với đồng bộ tồn kho realtime.",
    image: "/image/laptop-shop-thumbnail.jpg",
    github: "https://github.com",
    demo: "https://example.com",
    displayNumber: "02",
    displaySubtitle: "E-Commerce Platform",
    subtitle:
      "E-commerce platform optimised for high-end tech hardware with intelligent inventory management and lightning-fast page loads.",
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
    features: [
      {
        title: "Sub-second Page Loads",
        description:
          "ISR và edge caching đảm bảo tốc độ tải trang dưới 1 giây ngay cả ở peak traffic.",
        icon: "FastLoad",
      },
      {
        title: "Smart Inventory Sync",
        description:
          "Realtime inventory tracking với tự động cảnh báo và reorder suggestion dựa trên AI.",
        icon: "Sync",
      },
      {
        title: "SEO Architecture",
        description:
          "Structured data, canonical URLs, và sitemap tự động giúp tăng organic search traffic.",
        icon: "SEO",
      },
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
    github: "https://github.com",
    demo: null,
    displayNumber: "03",
    displaySubtitle: "AI-Powered Shopping",
    subtitle:
      "AI-powered shopping experience with computer vision product matching and personalised semantic search.",
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
    features: [
      {
        title: "Visual Search",
        description:
          "Upload ảnh để tìm sản phẩm tương tự trong toàn bộ catalog với độ chính xác cao.",
        icon: "VisualSearch",
      },
      {
        title: "Semantic Search",
        description:
          "Tìm kiếm bằng ngôn ngữ tự nhiên — hỏi như hỏi người thật, nhận kết quả chính xác.",
        icon: "SemanticSearch",
      },
      {
        title: "Personalised Feed",
        description:
          "AI học từ hành vi người dùng để cá nhân hóa trải nghiệm mua sắm theo thời gian.",
        icon: "Personalized",
      },
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
    github: "https://github.com",
    demo: null,
    displayNumber: "04",
    displaySubtitle: "Developer Tooling",
    subtitle:
      "Model Context Protocol server enabling AI assistants to inspect, analyse and understand NestJS applications in real-time.",
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
    features: [
      {
        title: "Module Graph Inspector",
        description:
          "Trực quan hóa realtime toàn bộ dependency graph, circular dependencies và lazy modules.",
        icon: "ModuleGraph",
      },
      {
        title: "Route Analyser",
        description:
          "Kiểm tra tất cả HTTP routes, guards, interceptors và middlewares đang hoạt động.",
        icon: "RouteAnalyzer",
      },
      {
        title: "Provider Registry",
        description:
          "Xem toàn bộ providers, scope và injection tokens trong runtime context.",
        icon: "ProviderRegistry",
      },
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
    github: "https://github.com",
    demo: null,
    displayNumber: "05",
    displaySubtitle: "AI Infrastructure",
    subtitle:
      "Infrastructure toolkit for connecting AI agents with external services through a reliable, context-aware routing layer.",
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
    features: [
      {
        title: "Universal Bridge",
        description:
          "Kết nối bất kỳ AI framework (LangChain, CrewAI, AutoGen) với external services qua một interface thống nhất.",
        icon: "UniversalBridge",
      },
      {
        title: "Context Synapse",
        description:
          "Shared memory layer giúp agents nhớ và chia sẻ context across sessions và tools.",
        icon: "ContextSynapse",
      },
      {
        title: "Smart Tool Routing",
        description:
          "Tự động chọn và chain tools dựa trên agent intent, không cần hardcode workflows.",
        icon: "SmartRouting",
      },
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
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
