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
      "Mục tiêu là làm một PaaS đơn giản như shared hosting thời PHP/MySQL - upload code là chạy - nhưng trên Kubernetes. Giao diện web che đi kubectl và YAML, developer paste URL repo hoặc chọn Docker image.",
      "Hai nhóm người dùng: Developer deploy app từ Docker image, GitHub repo (tự build qua Buildpacks, không cần Dockerfile), hoặc tạo nhanh project microservices từ template có sẵn. Admin quản cụm K8s, thêm node, cài infrastructure qua web UI thay vì SSH vào server gõ lệnh.",
      "Backend NestJS, frontend Next.js, cụm Kubernetes ở giữa. Deploy task nặng chạy async qua BullMQ, dùng DAG để xử lý các bước có dependency (ví dụ: tạo database trước, rồi mới deploy API).",
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
          "Người dùng nhập tên image, project tạo các Kubernetes resource cơ bản như Deployment, Service và Ingress để chạy thử ứng dụng trong môi trường lab.",
        icon: "Deployment",
      },
      {
        title: "Build từ GitHub bằng Buildpacks",
        description:
          "Project thử luồng dùng Cloud Native Buildpacks để build image từ GitHub repo trong một số trường hợp không có Dockerfile.",
        icon: "Build",
      },
      {
        title: "Scaffold dự án Microservices",
        description:
          "Chọn Blueprint mẫu, project tạo nhiều service demo như database, API và frontend, sau đó xử lý các bước deploy theo thứ tự phụ thuộc DB → API → Frontend.",
        icon: "Scaffold",
      },
      {
        title: "Quản trị cụm Kubernetes qua giao diện",
        description:
          "Một số thao tác quản trị cụm như xem node, thêm node và cài hạ tầng thử nghiệm được đưa lên web UI để hạn chế thao tác thủ công trong demo.",
        icon: "Cluster",
      },
      {
        title: "Scale replica qua giao diện",
        description:
          "Có thử nghiệm thay đổi số replica từ giao diện và quan sát Kubernetes phân phối request giữa các Pod trong môi trường lab.",
        icon: "LoadBalancer",
      },
      {
        title: "Xử lý bất đồng bộ với BullMQ + DAG",
        description:
          "Một số tác vụ deploy được đưa vào BullMQ worker. Các bước có quan hệ phụ thuộc được tách ra để xử lý theo thứ tự rõ ràng hơn.",
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
          "Demo luồng khởi tạo cluster trong môi trường lab: nhập SSH credentials, chạy Ansible để cài Kubernetes, cấu hình mạng, lấy join token và thêm Worker Node.",
      },
      {
        url: "https://www.youtube.com/watch?v=i2GFYuC8duw",
        title: "Quản Trị Tài Nguyên Kubernetes",
        description:
          "Demo việc xem Namespace, Deployment, Pod, Service, Ingress trên giao diện web và đối chiếu lại với kubectl.",
      },
      {
        url: "https://www.youtube.com/watch?v=tipTp5xoJok",
        title: "Triển Khai App Full-stack",
        description:
          "Demo deploy ứng dụng full-stack gồm React + Vite, NestJS và PostgreSQL lên cụm Kubernetes qua giao diện web trong môi trường thử nghiệm.",
      },
      {
        url: "https://www.youtube.com/watch?v=ifERTaV9740",
        title: "Build & Deploy Spring Boot Từ GitHub bằng Buildpacks",
        description:
          "Demo luồng dùng Kpack/Buildpacks để build image từ repository Spring Boot, push vào Local Registry và triển khai lên cụm Kubernetes.",
      },
      {
        url: "https://www.youtube.com/watch?v=YBXgYm5sEK0",
        title: "Scaffold Dự Án Microservices Từ Blueprint",
        description:
          "Demo luồng chọn Blueprint để tạo nhiều service mẫu, sinh mã nguồn, push GitHub, build image và deploy theo các bước có phụ thuộc.",
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
    desc: "Trang bán laptop mô phỏng các luồng cơ bản của e-commerce: xem sản phẩm, giỏ hàng, đặt hàng, thanh toán QR qua SePay và màn hình admin quản lý đơn.",
    image: "/image/laptop-shop/home.png",
    github: "https://github.com/HaoNgo232/laptop-shop",
    demo: null,
    displayNumber: "02",
    displaySubtitle: "E-Commerce System",
    subtitle: "Nền tảng thương mại điện tử tích hợp thanh toán QR.",
    vision: [
      "Project mô phỏng một trang bán laptop với các luồng cơ bản: xem sản phẩm, thêm vào giỏ hàng, đặt hàng, thanh toán QR và admin quản lý đơn.",
      "Project có thử hệ thống member rank từ Bronze đến Diamond và tính discount dựa trên tổng giá trị đơn đã mua.",
      "Frontend React tách riêng với backend NestJS API. Backend dùng TypeORM + PostgreSQL và có xử lý transaction trong luồng đặt hàng, cập nhật thanh toán.",
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
          "Có luồng đăng nhập bằng JWT, refresh token và phân quyền người dùng/admin bằng Guards trong NestJS.",
        icon: "Lock",
      },
      {
        title: "Thanh toán QR",
        description:
          "Tạo QR thanh toán theo đơn hàng và cập nhật trạng thái thanh toán qua webhook SePay trong demo.",
        icon: "Payment",
      },
      {
        title: "Phân hạng Thành viên",
        description:
          "Có thử logic tính hạng thành viên và mức giảm giá dựa trên lịch sử mua hàng trong project.",
        icon: "Rank",
      },
      {
        title: "Quản trị Đơn hàng",
        description:
          "Có màn hình admin để quản lý danh mục, sản phẩm và theo dõi trạng thái đơn hàng.",
        icon: "Dashboard",
      },
      {
        title: "Email Thông báo",
        description:
          "Có tích hợp gửi email xác nhận/thông báo bằng template EJS trong một số luồng chính.",
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
    slug: "vision-store",
    title: "Vision Store",
    desc: "Trang bán kính mắt thử kiến trúc multi-service ở mức project cá nhân. Các service như Product, Cart, User, Order được tách riêng; hình ảnh sản phẩm lưu trên MinIO.",
    image: "/image/vision-store-thumbnail.jpg",
    github:
      "https://github.com/HaoNgo232/VisionStore-E-Commerce-Microservices-Backend",
    demo: "https://v0-eyewear-store-website-kohl.vercel.app",
    displayNumber: "03",
    displaySubtitle: "Multi-service E-Commerce",
    subtitle:
      "Hệ thống thương mại điện tử kính mắt dựa trên kiến trúc đa dịch vụ.",
    vision: [
      "Project bán kính mắt dùng kiến trúc multi-service để thử cách tách các phần như Product, Cart, User và Order thành các service riêng.",
      "Lý do tách service là để thử pattern microservices trong project nhỏ và quan sát cách các service giao tiếp qua API Gateway.",
      "Hình ảnh sản phẩm lưu trên MinIO thay vì để trực tiếp trong server app, giúp tách phần lưu file ra khỏi backend chính.",
    ],
    terminalLines: [
      "Initializing Vision Store Ecosystem...",
      "Service [ProductApp] is healthy on port 3001",
      "Service [CartApp] is healthy on port 3002",
      "Service [UserApp] is healthy on port 3003",
      "API Gateway routing active on port 8000",
      "Frontend Next.js application ready",
    ],
    features: [
      {
        title: "Giao diện Trực quan",
        description:
          "UI đơn giản, tập trung vào việc hiển thị sản phẩm và các luồng mua hàng cơ bản.",
        icon: "FastLoad",
      },
      {
        title: "Kiến trúc đa dịch vụ",
        description:
          "Project tách một số phần thành service riêng như Product, User và Order để thử cách tổ chức backend theo hướng multi-service.",
        icon: "ModuleGraph",
      },
      {
        title: "Bộ lọc Thuộc tính",
        description:
          "Lọc sản phẩm theo thông số kỹ thuật: chất liệu gọng, hình dáng, đặc tính tròng kính.",
        icon: "VisualSearch",
      },
      {
        title: "Object Storage (MinIO)",
        description:
          "Hình ảnh sản phẩm được lưu trên MinIO để thử cách dùng object storage trong project e-commerce.",
        icon: "Cluster",
      },
    ],
    techStack: [
      { name: "NestJS", category: "backend" },
      { name: "Next.js", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "MinIO", category: "devops" },
      { name: "Docker", category: "devops" },
      { name: "TypeScript", category: "backend" },
    ],
    screenshots: [
      { url: "/image/vision-store/home.png", alt: "Trang chủ Vision Store" },
      { url: "/image/vision-store/product_list.png", alt: "Danh mục sản phẩm" },
      {
        url: "/image/vision-store/product_detail.png",
        alt: "Chi tiết sản phẩm",
      },
      { url: "/image/vision-store/cart.png", alt: "Giỏ hàng" },
      {
        url: "/image/vision-store/trang_thanh_toan.png",
        alt: "Giao diện thanh toán",
      },
      {
        url: "/image/vision-store/dat_hang_thanh_cong.png",
        alt: "Xác nhận đặt hàng",
      },
      {
        url: "/image/vision-store/chi_tiet_don_hang.png",
        alt: "Chi tiết đơn hàng",
      },
    ],
    videos: [
      {
        url: "https://youtu.be/QQEMBoGbbOU",
        title: "Giao diện & Tính năng cơ bản",
        description:
          "Video minh họa giao diện người dùng và các tính năng cốt lõi của hệ thống thương mại điện tử Vision Store.",
      },
    ],
  },
  {
    slug: "synapse-desktop",
    title: "Code to Prompt",
    desc: "Ứng dụng desktop cá nhân hỗ trợ gom context từ codebase để dùng với AI web chat. App có các phần chọn file, ước lượng token, xem diff và apply patch vào project.",
    image: "/image/synapse-desktop/context-tab.png",
    github: "https://github.com/HaoNgo232/Synapse-Desktop",
    demo: null,
    displayNumber: "04",
    displaySubtitle: "Code to Prompt Tool",
    subtitle:
      "Công cụ desktop cá nhân hỗ trợ chuẩn bị context và xem patch khi làm việc với AI web chat.",
    vision: [
      "Project này xuất phát từ nhu cầu gom nhiều file code thành một prompt có cấu trúc khi dùng AI web chat.",
      "App hỗ trợ chọn file từ tree, xem ước lượng token theo model và lưu lại lịch sử thao tác.",
      "Một phần khác của app là nhận patch có cấu trúc, hiển thị diff để xem trước rồi mới apply vào codebase.",
      "Project có thử dùng Tree-sitter để đọc cấu trúc code ở một số ngôn ngữ, thay vì chỉ xử lý text thuần.",
    ],
    terminalLines: [
      "$ python main_window.py",
      "Synapse Desktop v0.3.0",
      "Tree-sitter: 10 grammars loaded",
      "Tokenizers: tiktoken (gpt-4), claude, gemini",
      "MCP server listening on stdio",
      "Workspace: ~/projects/portfolio",
      "Indexed 247 files (~45k tokens) in 1.2s",
    ],
    features: [
      {
        title: "Đóng gói context từ file tree",
        description:
          "Chọn file cần gửi, app gom nội dung thành prompt có cấu trúc. Có các chế độ context khác nhau để thử giảm lượng nội dung phải copy thủ công.",
        icon: "Package",
      },
      {
        title: "Ước lượng token theo model",
        description:
          "App ước lượng token theo một số tokenizer/model phổ biến để dễ kiểm soát độ dài context trước khi copy sang AI chat.",
        icon: "Calculator",
      },
      {
        title: "Visual diff trước khi apply",
        description:
          "App hiển thị diff để xem trước nội dung patch trước khi ghi thay đổi vào codebase, kèm backup để dễ quay lại khi cần.",
        icon: "Diff",
      },
      {
        title: "Parse bằng Tree-sitter",
        description:
          "Project có thử dùng Tree-sitter để trích thông tin cấu trúc code trong một số trường hợp, giúp hạn chế phụ thuộc vào xử lý text thuần.",
        icon: "Code",
      },
      {
        title: "Gợi ý file liên quan",
        description:
          "Khi chọn một file, app thử dò một số file có quan hệ import/dependency để gợi ý đưa thêm vào context.",
        icon: "FileSearch",
      },
    ],
    techStack: [
      { name: "Python", category: "backend" },
      { name: "PySide6", category: "frontend" },
      { name: "Tree-sitter", category: "backend" },
      { name: "tiktoken", category: "backend" },
    ],
    screenshots: [
      {
        url: "/image/synapse-desktop/context-tab.png",
        alt: "Context tab - File selection và token counting",
      },
      {
        url: "/image/synapse-desktop/apply-tab.png",
        alt: "Apply tab - Visual diff và code patching",
      },
      {
        url: "/image/synapse-desktop/history-tab.png",
        alt: "History tab - Lịch sử copy/apply actions",
      },
      {
        url: "/image/synapse-desktop/settings-tab.png",
        alt: "Settings tab - Cấu hình app và MCP",
      },
    ],
    videos: [
      {
        url: "https://youtu.be/-W_SwdjeluQ",
        title: "Demo Code to Prompt",
        description:
          "Demo workflow chọn files, xem ước lượng token, copy context sang AI chat, nhận patch và xem diff trước khi apply vào codebase.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
