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
    title: "Laptop Shop",
    desc: "Hệ thống thương mại điện tử chuyên biệt cho thiết bị công nghệ. Tích hợp quy trình từ duyệt sản phẩm, quản lý giỏ hàng đến thanh toán tự động qua QR và quản trị đơn hàng tập trung.",
    image: "/image/laptop-shop/home.png",
    github: "https://github.com/HaoNgo232/laptop-shop",
    demo: null,
    displayNumber: "02",
    displaySubtitle: "E-Commerce System",
    subtitle: "Nền tảng thương mại điện tử tích hợp thanh toán QR.",
    vision: [
      "Dự án tập trung vào việc xây dựng một luồng nghiệp vụ e-commerce hoàn chỉnh, từ khâu quản lý sản phẩm phía Admin đến trải nghiệm mua sắm của khách hàng. Mục tiêu chính là xử lý tốt quy trình thanh toán và quản lý trạng thái đơn hàng.",
      "Hệ thống áp dụng cơ chế phân hạng thành viên (Bronze đến Diamond) để tự động tính toán mức chiết khấu phù hợp dựa trên tổng giá trị đơn hàng đã hoàn tất. Toàn bộ hạ tầng được đóng gói bằng Docker giúp việc triển khai và quản lý môi trường trở nên đồng nhất.",
      "Kiến trúc tách biệt giữa React SPA và NestJS API giúp hệ thống linh hoạt trong việc phát triển độc lập. Việc sử dụng TypeORM kết hợp PostgreSQL đảm bảo tính toàn vẹn dữ liệu cho các giao dịch quan trọng như đặt hàng và cập nhật trạng thái thanh toán.",
    ],
    terminalLines: [
      "backend: starting NestJS application...",
      "database: connected to PostgreSQL on port 5432",
      "modules: auth, cart, orders, payments, products loaded",
      "frontend: Vite 6 + React 19 dev server ready",
    ],
    features: [
      {
        title: "Xác thực & Phân quyền JWT",
        description:
          "Hệ thống bảo mật với Access Token và Refresh Token, phân quyền người dùng và quản trị viên thông qua Guards.",
        icon: "Lock",
      },
      {
        title: "Thanh toán QR",
        description:
          "Tích hợp SePay để tạo mã QR ngân hàng theo từng đơn hàng, tự động xác nhận trạng thái thanh toán qua webhook.",
        icon: "Payment",
      },
      {
        title: "Phân hạng Thành viên",
        description:
          "Hệ thống tự động tính mức giảm giá (5% - 20%) dựa trên hạng thành viên được tích lũy từ lịch sử mua hàng.",
        icon: "Rank",
      },
      {
        title: "Quản trị Đơn hàng",
        description:
          "Giao diện Admin cho phép quản lý danh mục, sản phẩm và theo dõi trạng thái các đơn hàng trong hệ thống.",
        icon: "Dashboard",
      },
      {
        title: "Email Thông báo",
        description:
          "Tự động gửi email xác nhận và thông báo cho người dùng thông qua EJS templates.",
        icon: "Mail",
      },
    ],
    techStack: [
      { name: "NestJS", category: "backend" },
      { name: "React", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "TypeORM", category: "backend" },
      { name: "TailwindCSS", category: "frontend" },
      { name: "TypeScript", category: "backend" },
      { name: "Zustand", category: "frontend" },
      { name: "Docker", category: "devops" },
    ],
    screenshots: [
      { url: "/image/laptop-shop/home.png", alt: "Giao diện trang chủ" },
      {
        url: "/image/laptop-shop/danh_muc.png",
        alt: "Danh mục sản phẩm và bộ lọc",
      },
      {
        url: "/image/laptop-shop/chi_tiet_san_pham.png",
        alt: "Chi tiết sản phẩm",
      },
      { url: "/image/laptop-shop/gio_hang.png", alt: "Quản lý giỏ hàng" },
      {
        url: "/image/laptop-shop/chon_phuong_thuc_thanh_toan.png",
        alt: "Lựa chọn phương thức thanh toán",
      },
      {
        url: "/image/laptop-shop/thanh_toan_bang_qr_code.png",
        alt: "Thanh toán qua mã QR ngân hàng",
      },
      {
        url: "/image/laptop-shop/dat_hang_thanh_cong.png",
        alt: "Xác nhận đặt hàng thành công",
      },
      {
        url: "/image/laptop-shop/admin_dashboard.png",
        alt: "Bảng điều khiển quản trị",
      },
      {
        url: "/image/laptop-shop/admin_product_manager.png",
        alt: "Quản lý sản phẩm (Admin)",
      },
      {
        url: "/image/laptop-shop/admin_order_manager.png",
        alt: "Quản lý đơn hàng (Admin)",
      },
    ],
    videos: [
      {
        url: "https://youtu.be/blxYkm9qTqU",
        title: "Luồng đặt hàng & Thanh toán QR",
        description:
          "Demo quy trình từ khi chọn sản phẩm đến khi hệ thống tự động xác nhận thanh toán qua Webhook SePay.",
      },
      {
        url: "https://youtu.be/fInUltOF2pk",
        title: "Quản trị Hệ thống (Admin)",
        description:
          "Giao diện quản lý kho hàng, xử lý đơn hàng và theo dõi luồng vận hành của website.",
      },
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
  // {
  //   slug: "nestjs-devtools-mcp",
  //   title: "NestJS DevTools MCP",
  //   desc: "Plugin và MCP server cho phép AI assistant (Claude, Cursor) quan sát runtime state của NestJS app. Truy vấn logs, routes và application context trực tiếp từ AI mà không cần copy-paste terminal output.",
  //   image: "/image/nestjs-mcp-thumbnail.jpg",
  //   github: "https://github.com/HaoNgo232/nestjs-devtools-mcp",
  //   demo: null,
  //   displayNumber: "04",
  //   displaySubtitle: "Developer Tooling",
  //   subtitle:
  //     "MCP bridge giúp AI assistant quan sát runtime state của NestJS applications.",
  //   vision: [
  //     "Khi làm việc với AI coding assistant (Claude, Cursor), một điểm yếu lớn là AI không thể tự động truy cập runtime state của ứng dụng đang chạy. Developer phải liên tục copy-paste logs, routes, hoặc dependency graph từ terminal sang chat.",
  //     "NestJS DevTools MCP giải quyết vấn đề này bằng cách cung cấp một cầu nối (bridge) giữa NestJS runtime và AI assistant thông qua Model Context Protocol. AI có thể chủ động query logs, routes, và application metadata mà không cần can thiệp thủ công.",
  //     "Kiến trúc 2-package đảm bảo an toàn: Plugin chạy trong NestJS process thu thập dữ liệu vào circular buffer và expose HTTP endpoint nội bộ; MCP Server là CLI bridge quản lý STDIO communication với AI và proxy tool calls qua HTTP. Toàn bộ giao tiếp chỉ diễn ra trên localhost.",
  //   ],
  //   terminalLines: [
  //     "$ npx nestjs-devtools-mcp@latest",
  //     "MCP Server started on STDIO",
  //     "Listening for tool calls from AI client...",
  //     "Tool: discover_servers → Found 1 NestJS app on :3000",
  //     "Tool: get_logs → Returned 50 recent log entries",
  //     "Tool: get_routes → Listed 12 HTTP routes",
  //   ],
  //   features: [
  //     {
  //       title: "Runtime Log Streaming",
  //       description:
  //         "AI assistant có thể truy vấn logs gần đây từ NestJS app đang chạy, lọc theo level (error, warn, debug) mà không cần mở terminal.",
  //       icon: "SEO",
  //     },
  //     {
  //       title: "Route Discovery",
  //       description:
  //         "Liệt kê tất cả HTTP routes đã đăng ký (method, path, controller, handler) để AI hiểu cấu trúc API của ứng dụng.",
  //       icon: "RouteAnalyzer",
  //     },
  //     {
  //       title: "Server Auto-Discovery",
  //       description:
  //         "Tự động phát hiện các NestJS server đang chạy với plugin enabled trên localhost, không cần cấu hình thủ công.",
  //       icon: "ModuleGraph",
  //     },
  //     {
  //       title: "Zero-Config Integration",
  //       description:
  //         "Chỉ cần thêm module vào NestJS app và cấu hình MCP client (claude_desktop_config.json), không cần setup phức tạp.",
  //       icon: "ProviderRegistry",
  //     },
  //   ],
  //   techStack: [
  //     { name: "NestJS", category: "backend" },
  //     { name: "TypeScript", category: "backend" },
  //     { name: "Node.js", category: "backend" },
  //   ],
  // },
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
