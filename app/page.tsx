"use client";

import { PROJECTS } from "@/lib/projects/data";
import { STACK_ICONS } from "@/lib/projects/stack-icons";
import {
  IconGithub,
  Badge,
  IconEmail,
  IconCopy,
  IconCheck,
} from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────── */
const ABOUT_STACK = {
  Backend: [
    { name: "NestJS", icon: "/icons/nestjs-original.svg" },
    { name: "Node.js", icon: "/icons/nodejs-original.svg" },
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
  ],
  Database: [
    { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
    { name: "Redis", icon: "/icons/redis-original.svg" },
  ],
};

const ROTATING_WORDS = ["Backend", "Full-stack", "Deployment", "Product"];

const JOURNAL_ENTRIES = [
  {
    title: "Thử nghiệm PaaS trên Kubernetes",
    date: "2026",
    excerpt:
      "Học được cách tổ chức deploy workflow, xử lý async task và quản lý Kubernetes resource qua giao diện web.",
    link: "/projects/paas",
  },
  {
    title: "E-commerce với QR payment",
    date: "2026",
    excerpt:
      "Thực hành luồng đặt hàng, thanh toán webhook và transaction handling trong NestJS.",
    link: "/projects/laptop-shop",
  },
  {
    title: "Multi-service architecture",
    date: "2026",
    excerpt:
      "Thử tách backend thành nhiều service và dùng API Gateway để routing request.",
    link: "/projects/vision-store",
  },
];

const EXPLORATIONS = [
  {
    title: "Backend Development",
    desc: "NestJS, API design, database transaction",
  },
  {
    title: "Frontend Development",
    desc: "React, Next.js, Tailwind CSS, Shadcn UI",
  },
  { title: "Deployment", desc: "Docker, Kubernetes, CI/CD workflow" },
  { title: "E-commerce", desc: "Payment flow, order management, admin UI" },
  { title: "Developer Tools", desc: "Desktop app, code context, AI workflow" },
];

/* ─── Icons (inline SVG) ─────────────────────────────────────────── */
function IconArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Hook: scroll fade-in ───────────────────────────────────────── */
function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Portfolio
        </motion.div>
        <motion.div
          className="loading-word"
          key={wordIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {ROTATING_WORDS[wordIndex]}
        </motion.div>
        <div className="loading-progress">
          <div
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-counter">{progress}%</div>
      </div>
    </motion.div>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed-nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container fixed-nav-inner">
        <Link href="/" className="fixed-nav-logo">
          NGÔ GIA HẠO
        </Link>
        <div className="fixed-nav-links">
          <a href="#home" className="fixed-nav-link">
            Trang chủ
          </a>
          <a href="#projects" className="fixed-nav-link">
            Dự án
          </a>
          <a href="#about" className="fixed-nav-link">
            Về tôi
          </a>
          <a href="#journal" className="fixed-nav-link">
            Ghi chú
          </a>
          <a href="#contact" className="fixed-nav-link">
            Liên hệ
          </a>
          <a
            href="https://github.com/HaoNgo232"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <IconGithub /> GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copy-email-wrapper">
      <a href={`mailto:${email}`} className="contact-link">
        <IconEmail /> {email}
      </a>
      <button
        onClick={handleCopy}
        className={`copy-btn ${copied ? "copied" : ""}`}
        title="Sao chép email"
        aria-label="Sao chép email"
      >
        {copied ? <IconCheck /> : <IconCopy />}
      </button>
    </div>
  );
}

function BentoProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={`bento-card ${featured ? "bento-card-featured" : ""} fade-up`}
      style={{ transitionDelay: `${index * 80}ms` }}
      whileHover={
        typeof window !== "undefined" && window.innerWidth > 768
          ? { y: -4 }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`} className="bento-card-link">
        <div className="bento-card-media">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              sizes={
                featured
                  ? "(max-width: 820px) 100vw, 800px"
                  : "(max-width: 820px) 100vw, 400px"
              }
              priority={index === 0}
            />
          ) : (
            <div className="bento-card-placeholder">
              <div className="bento-card-placeholder-grid" />
              <div className="bento-card-placeholder-glow" />
              <span className="bento-card-placeholder-number">
                {project.displayNumber}
              </span>
            </div>
          )}
          <div className="bento-card-overlay">
            <div className="bento-card-overlay-content">
              <span className="bento-card-number">
                {project.displayNumber} — {project.displaySubtitle}
              </span>
              <h3 className="bento-card-title">{project.title}</h3>
              <p className="bento-card-desc">{project.hoverDesc}</p>
              {project.focus && project.focus.length > 0 && (
                <div
                  className="bento-card-tags"
                  aria-label="Phần kỹ thuật chính"
                >
                  {project.focus.slice(0, 2).map((tag) => (
                    <span key={tag} className="bento-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="bento-card-footer">
                <span className="bento-card-cta">Xem case study</span>
              </div>
              <div className="bento-card-stack">
                {project.techStack?.slice(0, 3).map((tech) => {
                  const stackIcon = STACK_ICONS[tech.name];
                  return stackIcon ? (
                    <Badge
                      key={tech.name}
                      icon={stackIcon.icon}
                      name={tech.name}
                    />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loadingComplete && (
          <LoadingScreen onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {loadingComplete && (
        <>
          <SiteNav />

          <main>
            {/* HERO */}
            <section
              id="home"
              className="hero-redesign"
              aria-labelledby="hero-heading"
            >
              <div className="container">
                <motion.div
                  className="hero-redesign-inner"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p className="section-label">Đang tìm việc</p>
                  <h1 id="hero-heading" className="hero-redesign-name">
                    Ngô Gia Hạo
                  </h1>
                  <p className="hero-redesign-subtitle">
                    Fresher Web Developer tập trung Backend/Full-stack. Đã thực
                    hành với NestJS, React/Next.js, PostgreSQL, Docker,
                    Kubernetes qua các project cá nhân: e-commerce, AI workflow,
                    PaaS trên Kubernetes.
                  </p>
                  <div className="hero-redesign-actions">
                    <a href="#projects" className="btn btn-primary">
                      Xem Dự Án <IconArrowRight />
                    </a>
                    <a href="#contact" className="btn btn-outline">
                      Liên hệ
                    </a>
                    <a
                      href="https://github.com/HaoNgo232"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <IconGithub /> GitHub
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* SELECTED WORKS - BENTO GRID */}
            <section
              id="projects"
              className="selected-works-section"
              aria-label="Dự án tiêu biểu"
            >
              <div className="container">
                <motion.div
                  className="selected-works-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="section-label">Dự án tiêu biểu</p>
                  <h2>Selected Works</h2>
                  <p className="selected-works-intro">
                    Các project dưới đây là những bài tôi dùng để luyện web app,
                    backend API, e-commerce flow và triển khai ứng dụng. Mỗi
                    project ghi rõ vai trò, phần kỹ thuật đã làm và những gì tôi
                    học được.
                  </p>
                </motion.div>
                <div className="bento-grid">
                  {PROJECTS.map((p, i) => (
                    <BentoProjectCard
                      key={p.slug}
                      project={p}
                      index={i}
                      featured={true}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="about-section" aria-label="Về tôi">
              <div className="container">
                <motion.div
                  className="about-grid"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="about-text">
                    <p className="section-label">Về tôi</p>
                    <h2>Về tôi</h2>
                    <p>
                      Tôi tốt nghiệp ngành Mạng Máy Tính tháng 4/2026. Phần lập
                      trình web tôi chủ yếu tự học qua dự án cá nhân, thực tập
                      và tài liệu online. Các project trong portfolio này là
                      những bài tôi đã làm để luyện backend, frontend, database
                      và triển khai ứng dụng.
                    </p>
                    <p>
                      Tôi sử dụng AI như công cụ hỗ trợ tra cứu, tạo boilerplate
                      và rà soát hướng triển khai; phần tích hợp, debug và kiểm
                      thử luồng chính vẫn do tôi tự thực hiện. Qua các project,
                      tôi hiểu rõ hơn về cách xây dựng API, xử lý database
                      transaction, tổ chức code theo module và triển khai ứng
                      dụng với Docker/Kubernetes.
                    </p>
                  </div>
                  <div className="about-stack">
                    <p className="section-label">
                      Công nghệ đã dùng trong project
                    </p>
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
                </motion.div>
              </div>
            </section>

            {/* JOURNAL / LEARNING NOTES */}
            <section
              id="journal"
              className="journal-section"
              aria-label="Ghi chú học tập"
            >
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="section-label">Ghi chú học tập</p>
                  <h2>Những gì tôi học được</h2>
                  <p className="journal-intro">
                    Các ghi chú ngắn về những gì tôi học được qua từng project.
                  </p>
                  <div className="journal-grid">
                    {JOURNAL_ENTRIES.map((entry, i) => (
                      <motion.div
                        key={entry.title}
                        className="journal-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Link href={entry.link} className="journal-card-link">
                          <div className="journal-card-date">{entry.date}</div>
                          <h3 className="journal-card-title">{entry.title}</h3>
                          <p className="journal-card-excerpt">
                            {entry.excerpt}
                          </p>
                          <span className="journal-card-arrow">
                            <IconArrowRight />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* EXPLORATIONS */}
            <section className="explorations-section" aria-label="Khám phá">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="section-label">Khám phá</p>
                  <h2>Lĩnh vực quan tâm</h2>
                  <div className="explorations-grid">
                    {EXPLORATIONS.map((item, i) => (
                      <motion.div
                        key={item.title}
                        className="exploration-tile"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1 }}
                      >
                        <h3 className="exploration-title">{item.title}</h3>
                        <p className="exploration-desc">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CONTACT */}
            <section
              id="contact"
              className="contact-section-redesign"
              aria-label="Liên hệ"
            >
              <div className="container">
                <motion.div
                  className="contact-redesign-inner"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="section-label">Liên hệ</p>
                  <h2 className="contact-redesign-title">
                    Đang tìm vị trí Fresher/Junior Web Developer
                  </h2>
                  <p className="contact-redesign-text">
                    Tôi đang tìm vị trí Fresher/Junior Web Developer, ưu tiên
                    Backend/Full-stack, đồng thời có quan tâm đến triển khai ứng
                    dụng với Docker/Kubernetes. Nếu bạn có cơ hội phù hợp hoặc
                    muốn trao đổi về cách tôi xây dựng các project, vui lòng
                    liên hệ qua email hoặc GitHub.
                  </p>
                  <div className="contact-redesign-links">
                    <CopyEmailButton email="hao.ngo.n.personal@gmail.com" />
                    <a
                      href="https://github.com/HaoNgo232"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      <IconGithub /> GitHub
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer className="footer">
            <div className="container">
              <p>© 2026 Ngô Gia Hạo. Xây dựng với Next.js.</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
