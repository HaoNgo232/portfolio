"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: "paas",
    number: "01",
    title: "PaaS Ecosystem",
    subtitle: "Platform-as-a-Service",
    desc: "Nền tảng dịch vụ (PaaS) mạnh mẽ hỗ trợ triển khai ứng dụng tự động. Tích hợp NestJS cho backend ổn định và Kubernetes để quản lý container linh hoạt, từ git push đến live URL trong dưới 60 giây.",
    stack: [
      { name: "NestJS", icon: "/icons/nestjs-original.svg", color: "#E0234E" },
      { name: "Kubernetes", icon: "/icons/kubernetes-plain.svg", color: "#326CE5" },
      { name: "Docker", icon: "/icons/docker-original.svg", color: "#2496ED" },
      { name: "Redis", icon: "/icons/redis-original.svg", color: "#DC382D" },
      { name: "PostgreSQL", icon: "/icons/postgresql-original.svg", color: "#336791" },
    ],
    github: "https://github.com",
    preview: null,
    gradient: "from-cyan-500/10 to-blue-600/5",
  },
  {
    slug: "laptop-shop",
    number: "02",
    title: "NextGen Laptop Shop",
    subtitle: "E-Commerce Platform",
    desc: "Nền tảng thương mại điện tử chuyên biệt cho thiết bị công nghệ cao. Tối ưu SEO, tốc độ tải trang nhanh và hệ thống quản lý kho vận thông minh với đồng bộ tồn kho realtime.",
    stack: [
      { name: "Next.js", icon: "/icons/nextjs-original.svg", color: "#FFFFFF" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg", color: "#3178C6" },
      { name: "MongoDB", icon: "/icons/mongodb-original.svg", color: "#47A248" },
      { name: "Redis", icon: "/icons/redis-original.svg", color: "#DC382D" },
    ],
    github: "https://github.com",
    preview: "https://example.com",
    gradient: "from-purple-500/10 to-pink-600/5",
  },
  {
    slug: "visionstore",
    number: "03",
    title: "VisionStore",
    subtitle: "AI-Powered Shopping",
    desc: "Ứng dụng mua sắm thông minh tích hợp AI gợi ý sản phẩm cá nhân hóa. Computer Vision pipeline xử lý hình ảnh sản phẩm kết hợp Semantic Search mang đến trải nghiệm tìm kiếm trực quan.",
    stack: [
      { name: "Python", icon: "/icons/python-original.svg", color: "#3776AB" },
      { name: "React", icon: "/icons/react-original.svg", color: "#61DAFB" },
      { name: "FastAPI", icon: "/icons/fastapi-original.svg", color: "#009688" },
      { name: "PostgreSQL", icon: "/icons/postgresql-original.svg", color: "#336791" },
    ],
    github: "https://github.com",
    preview: null,
    gradient: "from-emerald-500/10 to-teal-600/5",
  },
  {
    slug: "nestjs-devtools-mcp",
    number: "04",
    title: "NestJS DevTools MCP",
    subtitle: "Developer Tooling",
    desc: "Model Context Protocol server dành cho hệ sinh thái NestJS. Cho phép AI assistant truy vấn module dependency graph, controller routes và providers trong thời gian thực.",
    stack: [
      { name: "NestJS", icon: "/icons/nestjs-original.svg", color: "#E0234E" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg", color: "#3178C6" },
      { name: "Node.js", icon: "/icons/nodejs-original.svg", color: "#339933" },
    ],
    github: "https://github.com",
    preview: null,
    gradient: "from-red-500/10 to-orange-600/5",
  },
  {
    slug: "agent-bridge-kit",
    number: "05",
    title: "Agent Bridge Kit & Synapse",
    subtitle: "AI Infrastructure",
    desc: "Bộ công cụ kết nối AI agent với các dịch vụ bên ngoài. Synapse layer quản lý context, memory và tool routing cho hệ thống multi-agent một cách hiệu quả và đáng tin cậy.",
    stack: [
      { name: "Python", icon: "/icons/python-original.svg", color: "#3776AB" },
      { name: "TypeScript", icon: "/icons/typescript-original.svg", color: "#3178C6" },
      { name: "Docker", icon: "/icons/docker-original.svg", color: "#2496ED" },
      { name: "Redis", icon: "/icons/redis-original.svg", color: "#DC382D" },
    ],
    github: "https://github.com",
    preview: null,
    gradient: "from-violet-500/10 to-purple-600/5",
  },
];

const ABOUT_STACK = {
  Backend: [
    { name: "NestJS", icon: "/icons/nestjs-original.svg" },
    { name: "Node.js", icon: "/icons/nodejs-original.svg" },
    { name: "Python", icon: "/icons/python-original.svg" },
    { name: "FastAPI", icon: "/icons/fastapi-original.svg" },
  ],
  Frontend: [
    { name: "Next.js", icon: "/icons/nextjs-original.svg" },
    { name: "React", icon: "/icons/react-original.svg" },
    { name: "TypeScript", icon: "/icons/typescript-original.svg" },
  ],
  DevOps: [
    { name: "Docker", icon: "/icons/docker-original.svg" },
    { name: "Kubernetes", icon: "/icons/kubernetes-plain.svg" },
    { name: "Git", icon: "/icons/git-original.svg" },
    { name: "Linux", icon: "/icons/linux-original.svg" },
  ],
  Database: [
    { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
    { name: "MongoDB", icon: "/icons/mongodb-original.svg" },
    { name: "Redis", icon: "/icons/redis-original.svg" },
  ],
};

/* ─── Icons (inline SVG) ─────────────────────────────────────────── */
function IconArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
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
function IconEmail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─── Hook: scroll fade-in ───────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Sub-components ─────────────────────────────────────────────── */
function Badge({ icon, name }: { icon: string; name: string }) {
  return (
    <span className="badge">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt={name} width={16} height={16} />
      {name}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-up project-card" style={{ transitionDelay: `${index * 60}ms` }}>
      {/* Media */}
      <div className="project-card-media">
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, var(--clr-surface) 0%, var(--clr-surface-hover) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative grid */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--clr-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }} />
          {/* Glow orb */}
          <div style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "var(--clr-primary)",
            filter: "blur(80px)",
            opacity: 0.07,
          }} />
          <span style={{
            position: "relative",
            fontFamily: "var(--font-space)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "var(--clr-primary)",
            opacity: 0.25,
            letterSpacing: "-0.02em",
          }}>{project.number}</span>
        </div>
      </div>

      {/* Body */}
      <div className="project-card-body">
        <div>
          <p className="project-card-number">{project.number} — {project.subtitle}</p>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>
        </div>

        <div className="project-card-stack">
          {project.stack.map((t) => (
            <Badge key={t.name} icon={t.icon} name={t.name} />
          ))}
        </div>

        <div className="project-card-actions">
          <Link href={`/projects/${project.slug}`} className="btn btn-primary">
            Xem Chi Tiết <IconArrowRight />
          </Link>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <IconGithub /> GitHub
          </a>
          {project.preview && (
            <a href={project.preview} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Live <IconExternal />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const aboutRef = useFadeIn();
  const contactRef = useFadeIn();

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <span className="nav-logo">NGÔ GIA HẠO</span>
          <div className="nav-links">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.8125rem" }}>
              <IconGithub /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <p className="section-label">Sẵn sàng nhận việc</p>
            <h1>
              <span className="hero-name">Ngô Gia Hạo</span>
            </h1>
            <p className="hero-subtitle">
              Web Developer chuyên nghiệp kiến tạo các giải pháp kỹ thuật hiệu suất cao,
              tập trung vào kiến trúc hệ thống hiện đại và trải nghiệm người dùng tối ưu.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Xem Projects <IconArrowDown />
              </a>
              <a href="#contact" className="btn btn-outline">
                Liên hệ
              </a>
            </div>
            <div className="hero-scroll-hint">
              <IconArrowDown /> Kéo xuống để khám phá
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-header">
            <p className="section-label">Dự án tiêu biểu</p>
            <h2>Dự Án</h2>
          </div>
          <div className="projects-list">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <div ref={aboutRef} className="fade-up about-grid">
            <div className="about-text">
              <p className="section-label">Về tôi</p>
              <h2>Về Tôi</h2>
              <p>
                Tôi là Web Developer đam mê giải quyết các bài toán kỹ thuật phức tạp bằng mã nguồn tinh gọn. Với kinh nghiệm trong hệ sinh thái Microservices và Cloud-native, tôi luôn hướng tới xây dựng sản phẩm không chỉ đẹp mắt mà còn bền vững về mặt kỹ thuật.
              </p>
              <p>
                Thế mạnh của tôi nằm ở việc làm chủ các công nghệ Backend như NestJS, Node.js kết hợp với khả năng vận hành hệ thống trên Docker và Kubernetes. Tôi tin rằng code tốt là code đơn giản, dễ đọc và dễ bảo trì.
              </p>
            </div>
            <div className="about-stack">
              <p className="section-label">Công nghệ chính</p>
              {Object.entries(ABOUT_STACK).map(([group, items]) => (
                <div key={group}>
                  <p className="stack-group-label">{group}</p>
                  <div className="stack-grid">
                    {items.map((t) => (
                      <Badge key={t.name} icon={t.icon} name={t.name} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div ref={contactRef} className="fade-up contact-inner">
            <p className="section-label">Liên hệ</p>
            <h2>Sẵn sàng bắt đầu dự án?</h2>
            <p style={{ marginTop: "1rem", color: "var(--clr-text-secondary)" }}>
              Tôi luôn sẵn sàng thảo luận về những cơ hội mới và thử thách kỹ thuật thú vị. Hãy kết nối với tôi qua các kênh bên dưới.
            </p>
            <div className="contact-links">
              <a href="mailto:contact@ngogiahao.dev" className="contact-link">
                <IconEmail /> contact@ngogiahao.dev
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <IconGithub /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <IconLinkedIn /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Ngô Gia Hạo. Xây dựng với Next.js.</p>
        </div>
      </footer>
    </>
  );
}
