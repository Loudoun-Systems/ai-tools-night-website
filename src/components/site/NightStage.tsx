import { useEffect, useRef, type ReactNode } from "react";
import { images } from "@/content/site";
import { Img } from "./ui";

export function NightStage({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let visible = true;
    let frame = 0;
    const clearScene = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const prop of ["--scene-x", "--scene-y", "--scene-scroll"])
        el.style.removeProperty(prop);
    };
    const motion = () => {
      if (!mq.matches) clearScene();
    };
    mq.addEventListener("change", motion);
    motion();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(el);
    const move = (e: PointerEvent) => {
      if (!mq.matches || !visible || document.hidden) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!mq.matches || !visible || document.hidden) return;
        el.style.setProperty("--scene-x", `${(e.clientX / innerWidth - 0.5) * 14}px`);
        el.style.setProperty("--scene-y", `${(e.clientY / innerHeight - 0.5) * 10}px`);
      });
    };
    const scroll = () => {
      if (mq.matches && visible && !document.hidden)
        el.style.setProperty(
          "--scene-scroll",
          `${Math.min(28, Math.max(0, -el.getBoundingClientRect().top * 0.05))}px`,
        );
    };
    el.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      observer.disconnect();
      clearScene();
      mq.removeEventListener("change", motion);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return (
    <section ref={ref} className={`night-stage${compact ? " community-stage" : ""}`}>
      <div className="night-art" aria-hidden="true">
        <Img pic={images.about} eager sizes="100vw" />
      </div>
      {/* Decorative city layer: kept to the right/top, away from the copy and buttons. */}
      <svg
        className="night-lines"
        viewBox="0 0 1440 760"
        fill="none"
        preserveAspectRatio="xMaxYMax slice"
        aria-hidden="true"
      >
        <path className="night-path" d="M1440 170H1240L1130 280H980M1260 530v80m-40-40h80" />
        <circle cx="980" cy="280" r="9" />
        <g className="night-stars">
          <circle cx="1060" cy="70" r="1.6" />
          <circle cx="1180" cy="110" r="1.2" />
          <circle cx="1330" cy="60" r="1.8" />
          <circle cx="900" cy="120" r="1.1" />
          <path d="M1380 120v14m-7-7h14" />
        </g>
        <g className="night-birds">
          <path d="M0 0q6-6 12 0q6-6 12 0" />
          <path d="M30 14q5-5 10 0q5-5 10 0" />
        </g>
        <path
          className="night-skyline"
          d="M860 760V700h30v-40h24v60h20v-90h36v90h18v-50h28v50h22v-120h40v120h16v-70h30v70h24v-150h44v150h18v-60h34v60h22v-100h38v100h20v-40h30v40H1440V760Z"
        />
      </svg>
      <div className="shell night-content">{children}</div>
    </section>
  );
}
