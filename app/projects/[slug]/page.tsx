"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects/data";
import { IconGithub, IconExternal, Badge } from "@/components/ui/icons";
import { FEATURE_ICONS } from "@/lib/projects/icons";
import { STACK_ICONS } from "@/lib/projects/stack-icons";
import { parseYouTubeId } from "@/lib/projects/youtube";
import type {
  EnvironmentMachine,
  Project,
  ProjectSummary,
  ProjectChallenge,
} from "@/lib/projects/types";

/* ─── Icons ─────────────────────────────────────────────────────── */
function IconBack() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function IconNE() {
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

/**
 * Project Summary Card - hiển thị thông tin tổng quan về project
 */
function ProjectSummaryCard({ project }: { project: Project }) {
  return (
    <div className="project-summary-card">
      <div className="summary-grid">
        {project.role && (
          <div className="summary-item">
            <span className="summary-label">Vai trò</span>
            <span className="summary-value">{project.role}</span>
          </div>
        )}
        {project.projectType && (
          <div className="summary-item">
            <span className="summary-label">Loại project</span>
            <span className="summary-value">{project.projectType}</span>
          </div>
        )}
        {project.timeline && (
          <div className="summary-item">
            <span className="summary-label">Timeline</span>
            <span className="summary-value">{project.timeline}</span>
          </div>
        )}
        {project.status && (
          <div className="summary-item">
            <span className="summary-label">Trạng thái</span>
            <span className="summary-value">{project.status}</span>
          </div>
        )}
      </div>
      {project.focus && project.focus.length > 0 && (
        <div style={{ marginTop: "1.25rem" }}>
          <span
            className="summary-label"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Trọng tâm kỹ thuật
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.focus.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.375rem 0.75rem",
                  background: "var(--clr-primary-dim)",
                  color: "var(--clr-primary)",
                  borderRadius: "var(--r-sm)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Case Study Summary - hiển thị bài toán, cách tiếp cận, kết quả
 */
function CaseStudySummary({ summary }: { summary: ProjectSummary }) {
  return (
    <div className="case-study-grid">
      <div className="case-study-card">
        <h3 className="case-study-title">Bài Toán</h3>
        <p className="case-study-text">{summary.problem}</p>
      </div>
      <div className="case-study-card">
        <h3 className="case-study-title">Cách Tiếp Cận</h3>
        <p className="case-study-text">{summary.approach}</p>
      </div>
      <div className="case-study-card">
        <h3 className="case-study-title">Kết Quả</h3>
        <p className="case-study-text">{summary.result}</p>
      </div>
    </div>
  );
}

/**
 * Responsibility List - danh sách vai trò và phạm vi thực hiện
 */
function ResponsibilityList({ items }: { items: string[] }) {
  return (
    <ul className="responsibility-list">
      {items.map((item, i) => (
        <li key={i} className="responsibility-item">
          <div className="responsibility-dot" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Technical Highlights - điểm kỹ thuật nổi bật
 */
function TechnicalHighlights({ items }: { items: string[] }) {
  return (
    <ul className="technical-list">
      {items.map((item, i) => (
        <li key={i} className="technical-item">
          <div className="technical-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Challenge Section - thách thức và cách xử lý
 */
function ChallengeSection({ challenges }: { challenges: ProjectChallenge[] }) {
  return (
    <div className="challenge-grid">
      {challenges.map((challenge, i) => (
        <div key={i} className="challenge-card">
          <h3 className="challenge-title">{challenge.title}</h3>
          <div className="challenge-content">
            <div>
              <span className="challenge-label">Thách thức:</span>
              <p className="challenge-text">{challenge.problem}</p>
            </div>
            <div>
              <span className="challenge-label">Cách xử lý:</span>
              <p className="challenge-text">{challenge.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Outcomes Section - kết quả thực hành
 */
function OutcomesSection({ outcomes }: { outcomes: string[] }) {
  return (
    <ul className="outcomes-list">
      {outcomes.map((item, i) => (
        <li key={i} className="outcomes-item">
          <div className="outcomes-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Thành phần hiển thị card cho từng video demo từ YouTube
 * Thao tác với IntersectionObserver để tối ưu hiệu suất tải (Lazy loading)
 */
function VideoCard({
  video,
}: {
  video: { id: string; title: string; desc: string; youtubeId: string };
}) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="yt-card">
      <div className="yt-info">
        <h3 className="yt-title">{video.title}</h3>
        <p className="yt-desc">{video.desc}</p>
      </div>

      <div className="yt-divider" />

      <div className="yt-frame-wrap" ref={videoRef}>
        {isIntersecting ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder-grid" />
            <div
              style={{
                position: "relative",
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--clr-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.8,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#09090B">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span
              style={{
                position: "relative",
                color: "var(--clr-text-secondary)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              Video demo sẽ tải khi cuộn tới đây
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Thành phần hiển thị danh sách các video demo của dự án
 */
function VideoShowcase({
  videos,
}: {
  videos: {
    id: string;
    title: string;
    desc: string;
    youtubeId: string;
    url: string;
  }[];
}) {
  // Filter chỉ video có youtubeId hợp lệ
  const validVideos = videos.filter((v) => v.youtubeId);
  const invalidVideos = videos.filter((v) => !v.youtubeId && v.url);

  return (
    <div className="video-showcase">
      {validVideos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
      {invalidVideos.map((v) => (
        <div key={v.url} className="yt-card">
          <div className="yt-info">
            <h3 className="yt-title">{v.title}</h3>
            <p className="yt-desc">{v.desc}</p>
          </div>
          <div className="yt-divider" />
          <div style={{ padding: "1rem", textAlign: "center" }}>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Mở Video Demo <IconExternal />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Thành phần hiển thị thông tin về hạ tầng triển khai
 */
function EnvironmentInfo({ machines }: { machines: EnvironmentMachine[] }) {
  return (
    <section className="detail-section">
      <p className="section-label">Hạ tầng</p>
      <h2>Môi Trường Triển Khai</h2>
      <div className="env-grid">
        {machines.map((machine) => (
          <div key={machine.ip} className="env-card">
            <div className="env-card-header">
              <span className="env-card-title">{machine.name}</span>
              <span className="env-ip">{machine.ip}</span>
            </div>
            <div className="env-list">
              <div className="env-item">
                <div className="env-item-dot" />
                {machine.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!project) notFound();

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false); // Reset zoom khi chuyển ảnh
    if (project.screenshots) {
      setSelectedImgIdx((prev) =>
        prev !== null
          ? (prev - 1 + project.screenshots!.length) %
            project.screenshots!.length
          : null,
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false); // Reset zoom khi chuyển ảnh
    if (project.screenshots) {
      setSelectedImgIdx((prev) =>
        prev !== null ? (prev + 1) % project.screenshots!.length : null,
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIdx === null || !project.screenshots) return;
      if (e.key === "Escape") {
        setSelectedImgIdx(null);
        setIsZoomed(false);
      }
      if (e.key === "ArrowLeft") {
        setIsZoomed(false);
        setSelectedImgIdx((prev) =>
          prev !== null
            ? (prev - 1 + project.screenshots!.length) %
              project.screenshots!.length
            : null,
        );
      }
      if (e.key === "ArrowRight") {
        setIsZoomed(false);
        setSelectedImgIdx((prev) =>
          prev !== null ? (prev + 1) % project.screenshots!.length : null,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIdx, project.screenshots]);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            NGÔ GIA HẠO
          </Link>
          <div className="nav-links">
            <Link href="/#projects" className="nav-link">
              Projects
            </Link>
            <Link href="/#about" className="nav-link">
              About
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
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

          <p className="section-label">{project.displaySubtitle}</p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>

          <div className="detail-action-row">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live Preview <IconExternal />
              </a>
            )}
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
          </div>

          {/* Tech stack badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "3rem",
            }}
          >
            {project.techStack?.map((t) => {
              const stackIcon = STACK_ICONS[t.name];
              return stackIcon ? (
                <Badge key={t.name} icon={stackIcon.icon} name={t.name} />
              ) : null;
            })}
          </div>

          {/* Project Summary Card */}
          <ProjectSummaryCard project={project} />
        </div>
      </section>

      {/* VIDEO SECTION */}
      <div className="container">
        {project.videos && project.videos.length > 0 ? (
          <VideoShowcase
            videos={project.videos.map((v) => ({
              id: parseYouTubeId(v.url) || v.url,
              title: v.title,
              desc: v.description || "",
              youtubeId: parseYouTubeId(v.url) || "",
              url: v.url,
            }))}
          />
        ) : (
          <div className="detail-video-wrap">
            <div
              style={{
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
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                  linear-gradient(var(--clr-border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)
                `,
                  backgroundSize: "48px 48px",
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: "var(--clr-primary)",
                  filter: "blur(120px)",
                  opacity: 0.07,
                }}
              />
              {/* Play button */}
              <div
                style={{
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
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#09090B">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p
                style={{
                  position: "relative",
                  color: "var(--clr-text-muted)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Video demo
              </p>
            </div>
          </div>
        )}
      </div>

      {/* THE VISION */}
      <div className="container">
        {/* Case Study Summary */}
        {project.summary && (
          <section className="detail-section">
            <p className="section-label">Tổng quan</p>
            <h2>Tóm Tắt Project</h2>
            <CaseStudySummary summary={project.summary} />
          </section>
        )}

        {/* Responsibilities */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <section className="detail-section">
            <p className="section-label">Vai trò</p>
            <h2>Vai Trò & Phạm Vi Thực Hiện</h2>
            <ResponsibilityList items={project.responsibilities} />
          </section>
        )}

        {/* Technical Highlights */}
        {project.technicalHighlights &&
          project.technicalHighlights.length > 0 && (
            <section className="detail-section">
              <p className="section-label">Kỹ thuật</p>
              <h2>Điểm Kỹ Thuật Nổi Bật</h2>
              <TechnicalHighlights items={project.technicalHighlights} />
            </section>
          )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="detail-section">
            <p className="section-label">Thách thức</p>
            <h2>Thách Thức & Cách Xử Lý</h2>
            <ChallengeSection challenges={project.challenges} />
          </section>
        )}

        {/* Vision (fallback nếu không có summary) */}
        {!project.summary && (
          <section className="detail-section">
            <p className="section-label">Tổng quan</p>
            <h2>Tầm Nhìn</h2>
            {project.vision.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </section>
        )}

        {/* Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="detail-section">
            <p className="section-label">Kết quả</p>
            <h2>Kết Quả Thực Hành</h2>
            <OutcomesSection outcomes={project.outcomes} />
          </section>
        )}

        {/* ENVIRONMENT INFO (PAAS ONLY) */}
        {project.environment && (
          <EnvironmentInfo machines={project.environment} />
        )}

        {/* KEY FEATURES */}
        <section className="detail-section">
          <p className="section-label">Tính năng</p>
          <h2>Tính Năng Chính</h2>
          <div className="feature-list">
            {project.features?.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon">{FEATURE_ICONS[f.icon]}</div>
                <div className="feature-content">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TERMINAL */}
        <section className="detail-section">
          <p className="section-label">Nhật ký</p>
          <h2>Nhật Ký Phát Triển</h2>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "var(--clr-text-secondary)",
            }}
          >
            Đoạn log dưới đây mô phỏng/trích từ quá trình chạy thử để thể hiện
            các thành phần chính của project.
          </p>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: "#FF5F57" }} />
              <div className="terminal-dot" style={{ background: "#FEBC2E" }} />
              <div className="terminal-dot" style={{ background: "#28C840" }} />
              <span
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--clr-text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                bash — {slug}
              </span>
            </div>
            <div className="terminal-body">
              {project.terminalLines.map((line: string, i: number) => (
                <div key={i}>
                  <span className="t-prompt">❯ </span>
                  {line}
                </div>
              ))}
              <div>
                <span className="t-prompt">❯ </span>
                <span className="t-cursor">█</span>
              </div>
            </div>
          </div>
        </section>

        {/* SCREENSHOTS */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="detail-section">
            <p className="section-label">Thư viện ảnh</p>
            <h2>Giao Diện Nền Tảng</h2>
            <div className="screenshot-grid">
              {project.screenshots.map((screenshot, i) => (
                <div
                  key={i}
                  className="screenshot-item"
                  onClick={() => setSelectedImgIdx(i)}
                >
                  <Image
                    src={screenshot.url}
                    alt={screenshot.alt}
                    width={800}
                    height={500}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="screenshot-caption">
                    <span>{screenshot.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedImgIdx !== null && project.screenshots && (
            <motion.div
              className={`lightbox-overlay ${isZoomed ? "is-zoomed" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedImgIdx(null);
                setIsZoomed(false);
              }}
            >
              <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                {!isZoomed && (
                  <motion.button
                    className="lightbox-close"
                    onClick={() => setSelectedImgIdx(null)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                )}

                {!isZoomed && (
                  <motion.button
                    className="lightbox-nav lightbox-prev"
                    onClick={handlePrev}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </motion.button>
                )}

                <motion.div
                  className="lightbox-img-container"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
                >
                  <Image
                    src={project.screenshots[selectedImgIdx].url}
                    alt={project.screenshots[selectedImgIdx].alt}
                    width={1920}
                    height={1080}
                    style={{
                      width: isZoomed ? "auto" : "100%",
                      height: "auto",
                      maxWidth: isZoomed ? "none" : "100%",
                      objectFit: "contain",
                      borderRadius: isZoomed ? "0" : "var(--r-md)",
                    }}
                    sizes="100vw"
                    priority
                  />
                </motion.div>

                {!isZoomed && (
                  <motion.button
                    className="lightbox-nav lightbox-next"
                    onClick={handleNext}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </motion.button>
                )}

                {!isZoomed && (
                  <motion.div
                    className="lightbox-counter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedImgIdx + 1} / {project.screenshots.length}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="cta-card">
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>
              Bạn muốn trao đổi thêm về project này?
            </h3>
            <p>
              Tôi sẵn sàng trình bày chi tiết cách thiết kế luồng, các quyết
              định kỹ thuật và những phần còn có thể cải thiện. Nếu bạn có cơ
              hội việc làm phù hợp, vui lòng liên hệ qua email hoặc GitHub.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/#contact" className="btn btn-primary">
              Liên Hệ Ngay <IconNE />
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
