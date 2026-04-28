"use client";

import { PROJECTS } from "@/lib/projects/data";
import { STACK_ICONS } from "@/lib/projects/stack-icons";
import {
  IconGithub,
  IconExternal,
  Badge,
  IconEmail,
} from "@/components/ui/icons";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

/* ─── Icons (inline SVG) ─────────────────────────────────────────── */
function IconArrowDown() {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
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
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useFadeIn();

  return (
    <div
      ref={ref}
      className="fade-up project-card"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Media */}
      <div className="project-card-media">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="50vw"
            priority={index === 0}
          />
        ) : (
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                linear-gradient(var(--clr-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
                opacity: 0.4,
              }}
            />
            {/* Glow orb */}
            <div
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "var(--clr-primary)",
                filter: "blur(80px)",
                opacity: 0.07,
              }}
            />
            <span
              style={{
                position: "relative",
                fontFamily: "var(--font-space)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700,
                color: "var(--clr-primary)",
                opacity: 0.25,
                letterSpacing: "-0.02em",
              }}
            >
              {project.displayNumber}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="project-card-body">
        <div>
          <p className="project-card-number">
            {project.displayNumber} — {project.displaySubtitle}
          </p>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>
        </div>

        <div className="project-card-stack">
          {project.techStack?.map((tech) => {
            const stackIcon = STACK_ICONS[tech.name];
            return stackIcon ? (
              <Badge key={tech.name} icon={stackIcon.icon} name={tech.name} />
            ) : null;
          })}
        </div>

        <div className="project-card-actions">
          <Link href={`/projects/${project.slug}`} className="btn btn-primary">
            Xem Chi Tiết <IconArrowRight />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <IconGithub /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
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
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <a
              href="https://github.com/HaoNgo232"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ padding: "0.45rem 1rem", fontSize: "0.8125rem" }}
            >
              <IconGithub /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <p className="section-label">Đang tìm việc</p>
            <h1>
              <span className="hero-name">Ngô Gia Hạo</span>
            </h1>
            <p className="hero-subtitle">
              Tốt nghiệp Mạng Máy Tính tháng 4/2026. Kiến thức lập trình tự học
              qua dự án cá nhân, thực tập và tài liệu online. Dùng AI để xử lý
              task lặp, còn bản thân đọc hiểu logic và debug. Stack chính:
              NestJS/Node.js, React/Next.js, Kubernetes qua luận văn.
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
                Tốt nghiệp ngành Mạng Máy Tính tháng 4/2026. Mọi kiến thức về
                phần mềm tôi tự học qua dự án cá nhân, thực tập và tài liệu
                online, không phải từ giáo trình khoa học máy tính truyền thống.
                Điều này tạo ra góc nhìn khác: tôi quan tâm đến system design và
                data flow nhiều như logic nghiệp vụ. Và tôi tin code tốt là code
                người khác đọc được sau 3 tháng, hơn là code quá thông minh đến
                nỗi chỉ mình tôi hiểu.
              </p>
              <p>
                Tôi dùng AI để sinh code boilerplate và xử lý task lặp, còn bản
                thân đọc hiểu logic và debug khi có lỗi. Stack chính:
                Nest.js/Node.js cho backend, React/Next.js cho frontend,
                Kubernetes qua quá trình làm luận văn.
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
            <h2>Đang tìm việc Fresher/Junior</h2>
            <p
              style={{ marginTop: "1rem", color: "var(--clr-text-secondary)" }}
            >
              Đang tìm vị trí Fresher/Junior Web Developer (Backend hoặc
              Fullstack). Nếu bạn có cơ hội phù hợp hoặc muốn hỏi về cách tôi
              xây dự án, liên hệ tôi qua email.
            </p>
            <div className="contact-links">
              <a
                href="mailto:hao.ngo.n.personal@gmail.com"
                className="contact-link"
              >
                <IconEmail /> hao.ngo.n.personal@gmail.com
              </a>
              <a
                href="https://github.com/HaoNgo232"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <IconGithub /> GitHub
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <IconLinkedIn /> LinkedIn
              </a> */}
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
