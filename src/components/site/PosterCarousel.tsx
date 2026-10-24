import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { posters } from "@/content/brands";
import { Control } from "./Control";
import { posterReady, swipeDirection, type TouchPoint } from "./poster-navigation";

export const POSTER_INTERVAL = 10_000;
export function PosterCarousel() {
  const { t } = useLocale();
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const touch = useRef<TouchPoint | null>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const navigation = useRef(0);
  const n = posters.length;
  const select = async (next: number) => {
    const version = ++navigation.current;
    if (await posterReady(images.current[next] ?? null)) {
      if (version === navigation.current) setI(next);
    }
  };
  const go = (d: number) => {
    void select((i + d + n) % n);
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e?.isIntersecting ?? false), {
      threshold: 0.2,
    });
    io.observe(el);
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setHidden(document.hidden);
      setReduced(mq.matches);
    };
    update();
    document.addEventListener("visibilitychange", update);
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      mq.removeEventListener("change", update);
    };
  }, []);
  const autoplay = visible && !hidden && !reduced && !hovered && !focused;
  useEffect(() => {
    if (!autoplay) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const next = (i + 1) % n;
      const ready = await posterReady(images.current[next] ?? null);
      if (!cancelled && ready) setI(next);
    }, POSTER_INTERVAL);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [autoplay, i, n]);
  const p = posters[i];
  if (!p) return null;
  return (
    <section
      ref={ref}
      className="poster-carousel"
      aria-roledescription={t(L("carousel", "carrusel"))}
      aria-label={t(L("We've Got Now posters", "Pósteres de We've Got Now"))}
      data-autoplay={autoplay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          go(e.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div className="poster-artwork">
        <div
          className="poster-frame"
          onTouchStart={(e) => {
            const point = e.touches[0];
            touch.current = point ? { x: point.clientX, y: point.clientY } : null;
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            const end = e.changedTouches[0];
            if (start && end) {
              const direction = swipeDirection(start, { x: end.clientX, y: end.clientY });
              if (direction) go(direction);
            }
            touch.current = null;
          }}
          onTouchCancel={() => {
            touch.current = null;
          }}
        >
          {posters.map((x, k) => (
            <img
              key={x.key}
              ref={(image) => {
                images.current[k] = image;
              }}
              src={x.src}
              alt={t(x.alt)}
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
              className="poster-img"
              data-active={k === i}
              aria-hidden={k !== i}
            />
          ))}
        </div>
        <div className="poster-controls">
          <Control
            className="icon-control"
            aria-label={t(L("Previous poster", "Póster anterior"))}
            onClick={() => go(-1)}
          >
            <ChevronLeft aria-hidden />
          </Control>
          {posters.map((x, k) => (
            <Control
              key={x.key}
              className="poster-dot"
              aria-current={k === i}
              aria-label={t(L(`Show poster ${k + 1}`, `Mostrar póster ${k + 1}`))}
              onClick={() => {
                void select(k);
              }}
            >
              <span aria-hidden />
            </Control>
          ))}
          <Control
            className="icon-control"
            aria-label={t(L("Next poster", "Póster siguiente"))}
            onClick={() => go(1)}
          >
            <ChevronRight aria-hidden />
          </Control>
        </div>
        <p className="poster-caption" aria-live="off">
          {t(p.caption)}
        </p>
      </div>
      <div className="poster-editorial">
        <p className="eyebrow">We’ve Got Now</p>
        <h3 className="display-2 mt-4 gradient-heading">
          {t(L("Curiosity becomes something useful.", "La curiosidad se vuelve algo útil."))}
        </h3>
        <p className="body-copy mt-6">
          {t(
            L(
              "A good community gives an idea somewhere to go. We explore AI through practical demonstrations, honest questions and experiments we can discuss together—not just a list of tools. There is room to learn from a first attempt as well as a working result.",
              "Una buena comunidad le da un lugar a cada idea. Exploramos la IA con demostraciones prácticas, preguntas honestas y experimentos que podemos conversar juntos, no solo con una lista de herramientas. Hay espacio para aprender de un primer intento y de un resultado que ya funciona.",
            ),
          )}
        </p>
        <p className="body-copy mt-5">
          {t(
            L(
              "Bring a task you want to understand, a workflow you have tried or a question that keeps coming up. Try a prompt with your own context, compare the result and share what you would change. Useful progress starts with something concrete—and another perspective.",
              "Trae una tarea que quieras entender, un flujo que hayas probado o una pregunta que siga apareciendo. Prueba un prompt con tu propio contexto, compara el resultado y comparte qué cambiarías. El progreso útil empieza con algo concreto y otra perspectiva.",
            ),
          )}
        </p>
        <nav
          className="poster-links"
          aria-label={t(L("Explore the community", "Explora la comunidad"))}
        >
          <Link to="/events" className="text-link">
            {t(L("Events", "Eventos"))}
            <ArrowUpRight aria-hidden />
          </Link>
          <Link to="/workshops" className="text-link">
            {t(L("Workshops", "Talleres"))}
            <ArrowUpRight aria-hidden />
          </Link>
          <Link to="/prompt-library" className="text-link">
            {t(L("Prompt library", "Biblioteca de prompts"))}
            <ArrowUpRight aria-hidden />
          </Link>
        </nav>
      </div>
    </section>
  );
}
