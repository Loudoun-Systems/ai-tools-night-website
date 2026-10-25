import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { MEETUP_URL } from "@/content/site";

const VIDEO = "/media/wgn-community-30s.mp4";

/** The team's supplied film, played only after the visitor chooses to start it. */
export function CommunityFilm() {
  const { t } = useLocale();
  const player = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const start = () => {
    setFailed(false);
    void player.current?.play().catch(() => setFailed(true));
  };

  return (
    <section className="section community-film" aria-labelledby="community-film-heading">
      <div className="shell community-film-grid">
        <div>
          <p className="eyebrow">We’ve Got Now</p>
          <h2 id="community-film-heading" className="display-2 gradient-heading mt-4">
            {t(L("Learn AI by doing.", "Aprende IA practicando."))}
          </h2>
          <p id="community-film-summary" className="body-copy mt-5">
            {t(
              L(
                "A quick look at We've Got Now: practical AI, hands-on workshops and people learning together.",
                "Conoce We've Got Now: IA práctica, talleres y una comunidad que aprende en equipo.",
              ),
            )}
          </p>
          <a
            href={MEETUP_URL}
            className="btn btn-primary mt-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(L("Explore upcoming events", "Ver próximos eventos"))}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div>
          <div className="community-film-player">
            <video
              ref={player}
              controls
              playsInline
              preload="none"
              width={1280}
              height={720}
              poster="/media/wgn-community-poster.webp"
              aria-label={t(
                L("We've Got Now community film", "Video de la comunidad We've Got Now"),
              )}
              aria-describedby="community-film-summary"
              onPlay={() => {
                setPlaying(true);
                setFailed(false);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setFailed(true);
                setPlaying(false);
              }}
            >
              <source src={VIDEO} type="video/mp4" />
              <a href={VIDEO}>{t(L("Open the video", "Abrir el video"))}</a>
            </video>
            {!playing && !failed && (
              <button
                type="button"
                className="community-film-play"
                onClick={start}
                aria-label={t(L("Play community video", "Reproducir video de la comunidad"))}
              >
                <Play aria-hidden="true" size={24} fill="currentColor" />
              </button>
            )}
          </div>
          {failed && (
            <p role="status" className="body-copy mt-3">
              {t(L("Having trouble playing?", "¿No puedes reproducirlo?"))}{" "}
              <a className="text-link" href={VIDEO}>
                {t(L("Open the video", "Abrir el video"))}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
