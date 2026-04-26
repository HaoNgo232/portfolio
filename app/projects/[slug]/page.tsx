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
import type { EnvironmentMachine } from "@/lib/projects/types";

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
            <span className="coming-soon-badge">Loading preview...</span>
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
  videos: { id: string; title: string; desc: string; youtubeId: string }[];
}) {
  return (
    <div className="video-showcase">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
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

  if (!project) notFound();

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    if (project.screenshots) {
      setSelectedImgIdx((prev) =>
        prev !== null ? (prev + 1) % project.screenshots!.length : null,
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIdx === null || !project.screenshots) return;
      if (e.key === "Escape") setSelectedImgIdx(null);
      if (e.key === "ArrowLeft")
        setSelectedImgIdx((prev) =>
          prev !== null
            ? (prev - 1 + project.screenshots!.length) %
              project.screenshots!.length
            : null,
        );
      if (e.key === "ArrowRight")
        setSelectedImgIdx((prev) =>
          prev !== null ? (prev + 1) % project.screenshots!.length : null,
        );
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
        </div>
      </section>

      {/* VIDEO SECTION */}
      <div className="container">
        {project.videos && project.videos.length > 0 ? (
          <VideoShowcase
            videos={project.videos.map((v) => ({
              id: parseYouTubeId(v.url) || "",
              title: v.title,
              desc: v.description || "",
              youtubeId: parseYouTubeId(v.url) || "",
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
        <section className="detail-section">
          <h2 className="section-label">Tổng quan</h2>
          {/* <h2>Tầm Nhìn</h2> */}
          {project.vision.map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </section>

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
        {project.screenshots && (
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
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedImgIdx !== null && project.screenshots && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImgIdx(null)}
            >
              <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
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

                <motion.div
                  className="lightbox-img-container"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src={project.screenshots[selectedImgIdx].url}
                    alt={project.screenshots[selectedImgIdx].alt}
                    width={1920}
                    height={1080}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "85vh",
                      objectFit: "contain",
                      borderRadius: "var(--r-md)",
                    }}
                    sizes="90vw"
                  />
                </motion.div>

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

                <motion.div
                  className="lightbox-counter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedImgIdx + 1} / {project.screenshots.length}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="cta-card">
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>
              Quan tâm đến kiến trúc hệ thống?
            </h3>
            <p>
              Tôi luôn sẵn sàng thảo luận về system design, cloud orchestration
              hoặc các cơ hội hợp tác.
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
