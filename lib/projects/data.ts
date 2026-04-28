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
      "Mục tiêu là làm một PaaS đơn giản như shared hosting thời PHP/MySQL - upload code là chạy - nhưng trên Kubernetes. Giao diện web che đi kubectl và YAML, developer chỉ cần paste URL repo hoặc chọn Docker image.",
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
          "Cung cấp tên image, hệ thống tự động tạo Deployment, Service, Ingress và cấp phát URL truy cập chỉ qua vài thao tác trên giao diện.",
        icon: "Deployment",
      },
      {
        title: "Build từ GitHub - Không cần Dockerfile",
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
          "Khởi tạo cluster, thêm node, cài đặt hạ tầng (Kpack, Redis, Metrics Server, Prometheus), cordon/drain/remove node. Tất cả qua web UI, không cần SSH.",
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
        title: "Build & Deploy Spring Boot Từ GitHub - Không Cần Dockerfile",
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
      "Làm một trang bán laptop có đủ flow từ đầu đến cuối: xem sản phẩm, bỏ giỏ hàng, thanh toán QR, admin quản lý đơn. Phần thanh toán và quản lý trạng thái đơn hàng là phần tôi chú trọng nhất.",
      "Có hệ thống member rank từ Bronze đến Diamond, tự động tính discount dựa trên tổng giá trị đơn đã mua. Docker hóa toàn bộ để deploy dễ hơn.",
      "Frontend React tách riêng với backend NestJS API. Dùng TypeORM + PostgreSQL để đảm bảo transaction đặt hàng và cập nhật thanh toán không bị sai lệch.",
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
    slug: "vision-store",
    title: "Vision Store",
    desc: "Hệ thống thương mại điện tử kính mắt triển khai trên kiến trúc đa dịch vụ. Dự án tập trung vào việc phân tách các miền nghiệp vụ và tối ưu hóa quy trình quản lý tài nguyên tĩnh.",
    image: "/image/vision-store-thumbnail.jpg",
    github:
      "https://github.com/HaoNgo232/VisionStore-E-Commerce-Microservices-Backend",
    demo: "https://v0-eyewear-store-website-kohl.vercel.app",
    displayNumber: "03",
    displaySubtitle: "Multi-service E-Commerce",
    subtitle:
      "Hệ thống thương mại điện tử kính mắt dựa trên kiến trúc đa dịch vụ.",
    vision: [
      "Trang bán kính mắt dùng kiến trúc microservices. Mỗi service (Product, Cart, User, Order) chạy độc lập với database riêng, giao tiếp qua API Gateway.",
      "Lý do tách service là để thử nghiệm pattern này trong project nhỏ. Mỗi service có thể deploy và scale riêng mà không ảnh hưởng phần khác.",
      "Hình ảnh sản phẩm lưu trên MinIO (object storage) thay vì để trong server app, giúp quản lý file dễ hơn và giảm tải cho backend.",
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
          "UI đơn giản, dễ dùng. Tập trung vào việc hiển thị sản phẩm rõ ràng.",
        icon: "FastLoad",
      },
      {
        title: "Kiến trúc đa dịch vụ",
        description:
          "Hệ thống chia thành các service độc lập, mỗi service có database riêng (Product, User, Order).",
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
          "Hình ảnh sản phẩm lưu trên MinIO thay vì trong server app, dễ quản lý hơn.",
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
    desc: "Ứng dụng desktop tôi viết để dùng các AI web chat miễn phí cho việc coding mà không phải copy-paste file thủ công. Đóng gói context, đếm token, và áp patch tự động vào codebase.",
    image: "/image/synapse-desktop/context-tab.png",
    github: "https://github.com/HaoNgo232/Synapse-Desktop",
    demo: null,
    displayNumber: "04",
    displaySubtitle: "Code to Prompt Tool",
    subtitle:
      "Công cụ desktop cá nhân để làm việc với AI web chat trong workflow coding hằng ngày.",
    vision: [
      "Tôi xài AI khá nhiều khi code, nhưng phần lớn thời gian không phải là viết prompt mà là chuẩn bị context để gửi cho nó. Mở từng file, copy nội dung, paste vào chat. File đổi thì làm lại. Chuyển task thì làm lại. Một lúc sau thì nhận ra mình đang làm thư ký cho cái chatbot.",
      "Vấn đề thứ hai là token. Gửi nguyên codebase thì vượt giới hạn, gửi ít quá thì AI đoán bừa. Tôi cần biết chính xác mình đang gửi bao nhiêu token cho từng model trước khi bấm Send, không phải đoán.",
      "Vấn đề thứ ba khó chịu nhất: AI trả về code dạng text, và việc dán đúng đoạn vào đúng vị trí trong đúng file là việc dễ sai. Tôi muốn AI trả về patch có cấu trúc, xem diff trước khi apply, và có backup nếu lỡ tay.",
      "Code to Prompt là cách tôi tự giải quyết ba thứ trên cho riêng mình. Chọn file từ tree, đóng gói thành prompt có cấu trúc, copy một phát. Đếm token theo từng model. Nhận patch dạng OPX, xem diff, apply. Bên trong dùng Tree-sitter để parse code thay vì regex, vì regex sẽ hỏng ngay khi gặp comment hoặc string chứa ký tự đặc biệt.",
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
          "Tick file cần gửi, app tự gom thành prompt có cấu trúc. Có chế độ Full Context cho task cần đọc kỹ, Compress chỉ giữ lại signature khi cần overview, và Git Diff khi chỉ muốn nói về phần vừa sửa.",
        icon: "Package",
      },
      {
        title: "Đếm token theo từng model",
        description:
          "GPT, Claude, Gemini đếm token khác nhau. App đếm theo đúng tokenizer của model bạn đang dùng và cảnh báo trước khi vượt giới hạn, không phải sau khi paste vào chat mới biết.",
        icon: "Calculator",
      },
      {
        title: "Visual diff trước khi apply",
        description:
          "AI trả patch dạng OPX, app render diff như Git để bạn xem trước. Bấm apply thì code mới ghi đè, kèm backup phòng khi cần undo.",
        icon: "Diff",
      },
      {
        title: "Parse bằng Tree-sitter",
        description:
          "Để trích signature hay xác định ranh giới symbol, regex hỏng ngay khi gặp comment hoặc string lạ. Tree-sitter parse theo grammar thật của ngôn ngữ nên đáng tin hơn nhiều.",
        icon: "Code",
      },
      {
        title: "Gợi ý file liên quan",
        description:
          "Khi chọn một file, app dò các file có quan hệ import/dependency để đề xuất kèm theo. Tránh trường hợp gửi context thiếu rồi AI bịa ra interface không tồn tại.",
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
    videos: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
