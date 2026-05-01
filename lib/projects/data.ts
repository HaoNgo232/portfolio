import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    slug: "paas",
    title: "PaaS trên Kubernetes",
    desc: "Project lab thử làm PaaS đơn giản trên Kubernetes: tạo app từ Docker image/GitHub repo, deploy workload và xem resource qua giao diện web.",
    image: "/image/paas_project/trang_chu.jpg",
    github: null,
    demo: null,
    displayNumber: "01",
    displaySubtitle: "Kubernetes lab project",
    subtitle:
      "Project lab thử triển khai ứng dụng lên Kubernetes qua giao diện web",
    role: "Làm cá nhân / đồ án tốt nghiệp",
    projectType: "DevOps lab / prototype",
    timeline: "Project cá nhân/luận văn",
    status: "Chạy trong môi trường lab",
    focus: [
      "Kubernetes deployment flow",
      "Docker image deployment",
      "Buildpacks experiment",
      "Async deploy tasks",
      "Cluster resource management UI",
    ],
    summary: {
      problem:
        "Việc triển khai ứng dụng lên Kubernetes thường cần nhiều thao tác với kubectl, YAML và cấu hình hạ tầng. Project này thử nghiệm cách tạo một giao diện web đơn giản để che bớt độ phức tạp đó trong môi trường lab.",
      approach:
        "Backend NestJS xử lý API và các tác vụ deploy bất đồng bộ; frontend Next.js cung cấp UI quản lý; Kubernetes chạy workload; BullMQ/DAG được dùng để tách các bước có dependency như tạo database, deploy API và deploy frontend.",
      result:
        "Hoàn thiện được các demo chính: khởi tạo/quản lý cụm lab, xem resource Kubernetes, deploy app từ Docker image, thử build từ GitHub bằng Buildpacks và scaffold project microservices mẫu.",
    },
    responsibilities: [
      "Thiết kế luồng triển khai ứng dụng từ UI đến Kubernetes resource.",
      "Xây dựng backend NestJS cho API quản lý project, resource và deploy task.",
      "Xây dựng frontend Next.js cho thao tác deploy, xem resource và quản trị cụm.",
      "Thử nghiệm Ansible/Kubernetes trong môi trường máy ảo lab.",
      "Ghi lại video demo cho các luồng chính.",
    ],
    technicalHighlights: [
      "Tạo Deployment, Service, Ingress cho ứng dụng demo.",
      "Tách deploy task nặng sang BullMQ worker.",
      "Dùng DAG để biểu diễn thứ tự phụ thuộc DB → API → Frontend trong luồng scaffold.",
      "Thử Cloud Native Buildpacks/Kpack để build image từ GitHub repository.",
      "Hiển thị resource Kubernetes qua giao diện thay vì thao tác trực tiếp bằng kubectl.",
    ],
    challenges: [
      {
        title: "Nhiều bước deploy có dependency",
        problem:
          "Một ứng dụng full-stack thường cần database sẵn sàng trước khi API/frontend chạy ổn định.",
        solution:
          "Tách luồng deploy thành nhiều bước nhỏ và xử lý theo thứ tự phụ thuộc bằng DAG trong worker.",
      },
      {
        title: "Giảm thao tác thủ công với Kubernetes",
        problem:
          "Người dùng mới dễ bị rối bởi kubectl, YAML và nhiều loại resource.",
        solution:
          "Tạo UI cho các thao tác thường gặp như xem node, xem pod/service/ingress và scale replica trong lab.",
      },
      {
        title: "Build app khi không có Dockerfile",
        problem: "Một số repository không có Dockerfile sẵn để build image.",
        solution:
          "Thử nghiệm Buildpacks/Kpack để build image từ source trong một số demo.",
      },
    ],
    outcomes: [
      "Có demo video cho các luồng chính.",
      "Chạy được trong môi trường Kubernetes lab với master/worker VM.",
      "Rút kinh nghiệm về Kubernetes resource, async job và workflow deployment.",
    ],
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
    desc: "Project bán laptop mô phỏng các luồng e-commerce cơ bản: xem sản phẩm, giỏ hàng, đặt hàng, thanh toán QR qua SePay và màn hình admin.",
    image: "/image/laptop-shop/home.png",
    github: "https://github.com/HaoNgo232/laptop-shop",
    demo: null,
    displayNumber: "02",
    displaySubtitle: "E-commerce demo",
    subtitle: "Project e-commerce demo có luồng đặt hàng và thanh toán QR.",
    role: "Làm cá nhân, full-stack",
    projectType: "E-commerce Demo",
    timeline: "Project cá nhân",
    status: "Demo project",
    focus: [
      "Backend API",
      "JWT authentication",
      "QR payment flow",
      "Admin dashboard",
      "PostgreSQL transaction",
    ],
    summary: {
      problem:
        "Project mô phỏng một trang bán laptop với các luồng e-commerce phổ biến như xem sản phẩm, giỏ hàng, đặt hàng, thanh toán và quản lý đơn.",
      approach:
        "Frontend React xử lý trải nghiệm mua hàng; backend NestJS cung cấp API cho auth, sản phẩm, giỏ hàng, đơn hàng và thanh toán; PostgreSQL lưu dữ liệu; một số luồng dùng transaction để giữ tính nhất quán khi tạo đơn và cập nhật trạng thái.",
      result:
        "Hoàn thiện được luồng người dùng từ xem sản phẩm đến thanh toán QR, cùng màn hình admin để quản lý sản phẩm và đơn hàng trong demo.",
    },
    responsibilities: [
      "Xây dựng backend NestJS cho auth, product, cart, order và payment.",
      "Xây dựng frontend React cho trang sản phẩm, giỏ hàng, checkout và admin.",
      "Thiết kế schema PostgreSQL cho sản phẩm, người dùng, đơn hàng và thanh toán.",
      "Tích hợp thử nghiệm QR payment qua SePay webhook trong demo.",
      "Tạo video demo cho luồng mua hàng và admin.",
    ],
    technicalHighlights: [
      "JWT authentication, refresh token và role-based guard cho admin.",
      "Tạo đơn hàng và cập nhật payment status.",
      "QR payment flow với webhook SePay trong demo.",
      "Admin dashboard quản lý sản phẩm và đơn hàng.",
      "Email notification bằng template EJS ở một số luồng.",
    ],
    challenges: [
      {
        title: "Đồng bộ trạng thái đơn hàng và thanh toán",
        problem:
          "Trạng thái đơn hàng có thể thay đổi sau khi người dùng thực hiện thanh toán.",
        solution:
          "Tách trạng thái order/payment và cập nhật qua webhook trong demo.",
      },
      {
        title: "Giữ dữ liệu nhất quán khi tạo đơn",
        problem:
          "Luồng checkout liên quan đến cart, order items, tổng tiền và tồn kho.",
        solution:
          "Dùng transaction ở backend cho các thao tác quan trọng trong luồng đặt hàng.",
      },
      {
        title: "Phân quyền admin",
        problem: "Một số API chỉ nên cho admin truy cập.",
        solution: "Dùng JWT guard và role-based authorization trong NestJS.",
      },
    ],
    outcomes: [
      "Có demo video cho checkout QR và admin.",
      "Thực hành được luồng e-commerce end-to-end.",
      "Có kinh nghiệm tốt hơn với NestJS module, PostgreSQL và auth flow.",
    ],
    vision: [
      "Project mô phỏng một trang bán laptop với các luồng cơ bản: xem sản phẩm, thêm vào giỏ hàng, đặt hàng, thanh toán QR và admin quản lý đơn.",
      "Project có thử logic member rank từ Bronze đến Diamond và tính discount dựa trên tổng giá trị đơn đã mua.",
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
          "Demo quy trình từ khi chọn sản phẩm đến khi đơn hàng được xác nhận thanh toán qua Webhook SePay.",
      },
      {
        url: "https://youtu.be/fInUltOF2pk",
        title: "Màn hình admin",
        description:
          "Demo các màn hình admin để quản lý sản phẩm, đơn hàng và trạng thái xử lý.",
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
    displaySubtitle: "Multi-service demo",
    subtitle:
      "Project bán kính mắt thử cách tách backend thành nhiều service nhỏ.",
    role: "Làm cá nhân, full-stack",
    projectType: "Multi-service demo",
    timeline: "Project cá nhân",
    status: "Demo project",
    focus: [
      "Multi-service backend",
      "API Gateway",
      "Object storage",
      "E-commerce UI",
      "Dockerized services",
    ],
    summary: {
      problem:
        "Project thử nghiệm cách tách một app e-commerce nhỏ thành nhiều service riêng để hiểu rõ hơn về tổ chức backend theo hướng multi-service.",
      approach:
        "Tách các phần như Product, Cart, User và Order thành các service riêng; dùng API Gateway để routing; lưu ảnh sản phẩm bằng MinIO; frontend Next.js hiển thị sản phẩm và các luồng mua hàng cơ bản.",
      result:
        "Hoàn thiện được demo mua hàng cơ bản, có frontend public, backend nhiều service và object storage cho hình ảnh sản phẩm.",
    },
    responsibilities: [
      "Xây dựng các service backend chính cho sản phẩm, người dùng, giỏ hàng và đơn hàng.",
      "Cấu hình API Gateway để điều hướng request đến các service.",
      "Xây dựng frontend Next.js cho danh sách sản phẩm, chi tiết, giỏ hàng và checkout.",
      "Thử tích hợp MinIO để lưu hình ảnh sản phẩm.",
      "Docker hóa các thành phần để chạy môi trường local/demo.",
    ],
    technicalHighlights: [
      "Tách backend thành nhiều service theo domain.",
      "API Gateway làm điểm vào cho frontend.",
      "MinIO object storage cho ảnh sản phẩm.",
      "PostgreSQL cho dữ liệu chính.",
      "Docker hỗ trợ chạy các service trong môi trường demo.",
    ],
    challenges: [
      {
        title: "Tách service nhưng vẫn giữ luồng mua hàng dễ hiểu",
        problem:
          "Khi chia nhỏ service, dữ liệu và request flow phức tạp hơn so với monolith.",
        solution:
          "Giới hạn phạm vi project ở các luồng e-commerce cơ bản và dùng API Gateway làm điểm vào thống nhất.",
      },
      {
        title: "Quản lý ảnh sản phẩm",
        problem:
          "Lưu ảnh trực tiếp trong backend không phù hợp khi muốn tách phần file storage.",
        solution:
          "Thử dùng MinIO như object storage riêng cho hình ảnh sản phẩm.",
      },
      {
        title: "Chạy nhiều service local",
        problem: "Nhiều service cần cấu hình port, database và dependency.",
        solution:
          "Dùng Docker để hỗ trợ chạy các thành phần trong môi trường demo.",
      },
    ],
    outcomes: [
      "Có live preview frontend.",
      "Có demo video tính năng cơ bản.",
      "Hiểu rõ hơn trade-off giữa monolith và multi-service ở project nhỏ.",
    ],
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
        title: "Giao diện và luồng mua hàng cơ bản",
        description:
          "Video demo giao diện người dùng và các luồng mua hàng chính của Vision Store.",
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
    displaySubtitle: "Desktop tool",
    subtitle:
      "Công cụ desktop cá nhân hỗ trợ chuẩn bị context và xem patch khi làm việc với AI web chat.",
    role: "Làm cá nhân, desktop app",
    projectType: "AI workflow tool cá nhân",
    timeline: "Project cá nhân",
    status: "Local desktop tool",
    focus: [
      "Python desktop app",
      "Code context packaging",
      "Token estimation",
      "Diff preview",
      "Tree-sitter experiment",
    ],
    summary: {
      problem:
        "Khi làm việc với AI web chat, việc chọn nhiều file code, gom context và apply patch thủ công dễ mất thời gian và dễ sai.",
      approach:
        "Xây dựng desktop app bằng Python/PySide6 để chọn file từ project tree, ước lượng token, đóng gói context thành prompt, xem diff trước khi apply patch và lưu lịch sử thao tác.",
      result:
        "Hoàn thiện được workflow local: chọn file, copy context, nhận patch, xem diff và apply có kiểm soát vào codebase.",
    },
    responsibilities: [
      "Xây dựng giao diện desktop bằng PySide6.",
      "Xử lý file tree, chọn file và đóng gói context.",
      "Tích hợp ước lượng token theo một số model/tokenizer.",
      "Hiển thị diff trước khi ghi thay đổi vào project.",
      "Thử Tree-sitter để đọc cấu trúc code ở một số ngôn ngữ.",
    ],
    technicalHighlights: [
      "File tree selection cho codebase local.",
      "Token estimation trước khi gửi context.",
      "Visual diff trước khi apply patch.",
      "Backup/history để giảm rủi ro khi sửa code.",
      "Tree-sitter parsing để thử trích thông tin cấu trúc code.",
    ],
    challenges: [
      {
        title: "Giảm context thừa khi gửi code cho AI",
        problem: "Copy quá nhiều file làm prompt dài và khó kiểm soát.",
        solution:
          "Thêm file selection, token estimation và gợi ý file liên quan.",
      },
      {
        title: "Tránh apply patch mù",
        problem: "Dán patch trực tiếp có thể ghi sai file hoặc làm mất code.",
        solution:
          "Hiển thị diff trước khi apply và thêm cơ chế backup/history.",
      },
      {
        title: "Đọc cấu trúc code thay vì text thuần",
        problem: "Xử lý code như plain text dễ thiếu ngữ cảnh.",
        solution:
          "Thử Tree-sitter cho một số ngôn ngữ để lấy thông tin cấu trúc.",
      },
    ],
    outcomes: [
      "Có video demo workflow.",
      "Dùng được cho nhu cầu cá nhân khi làm việc với AI web chat.",
      "Thực hành được desktop UI, file processing và developer tooling.",
    ],
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
