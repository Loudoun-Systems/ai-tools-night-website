import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { MEETUP_URL } from "@/content/site";

const VIDEO = "/media/wgn-community-30s.mp4";
type Playback = "starting" | "playing" | "idle" | "failed";

/** Request sound once; browser policy may require a muted loop until a visitor opts in. */
export function CommunityFilm() {
  const { t } = useLocale();
  const player = useRef<HTMLVideoElement>(null);
  const operation = useRef(0);
  const [muted, setMuted] = useState(false);
  const [playback, setPlayback] = useState<Playback>("starting");

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const begin = async () => {
      const current = ++operation.current;
      setPlayback("starting");
      try {
        await video.play();
      } catch (error) {
        if (current !== operation.current) return;
        if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
          setPlayback("failed");
          return;
        }
        // Set the actual media property before retrying; React state alone is too late.
        video.muted = true;
        setMuted(true);
        try {
          await video.play();
        } catch (fallbackError) {
          if (current !== operation.current) return;
          setPlayback(
            fallbackError instanceof DOMException && fallbackError.name === "NotAllowedError"
              ? "idle"
              : "failed",
          );
        }
      }
    };
    void begin();
    return () => {
      ++operation.current;
      video.pause();
    };
  }, []);

  const toggleSound = () => {
    const video = player.current;
    if (!video) return;
    const current = ++operation.current;
    // A direct gesture can start/unmute playback even when autoplay was blocked.
    const nextMuted = playback === "playing" && !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;
    setMuted(nextMuted);
    if (video.paused) setPlayback("starting");
    void video.play().catch(async (error: unknown) => {
      if (current !== operation.current) return;
      if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
        setPlayback("failed");
        return;
      }
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
      } catch (fallbackError) {
        if (current !== operation.current) return;
        setPlayback(
          fallbackError instanceof DOMException && fallbackError.name === "NotAllowedError"
            ? "idle"
            : "failed",
        );
      }
    });
  };

  const soundOn = playback === "playing" && !muted;
  const action = soundOn
    ? L("Mute video", "Silenciar video")
    : playback === "playing"
      ? L("Unmute video", "Activar sonido del video")
      : L("Start video with sound", "Iniciar video con sonido");

  return (
    <section className="section community-film" aria-labelledby="community-film-heading">
      <div className="shell community-film-grid">
        <div className="community-film-copy">
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
        <div className="community-film-stage">
          <div className="community-film-player" data-playback={playback}>
            <video
              ref={player}
              controls={false}
              loop
              playsInline
              preload="auto"
              muted={muted}
              width={1280}
              height={720}
              poster="/media/wgn-community-poster.webp"
              aria-label={t(
                L("We've Got Now community film", "Video de la comunidad We've Got Now"),
              )}
              aria-describedby="community-film-summary"
              onPlay={() => setPlayback("playing")}
              onPause={() => setPlayback((previous) => (previous === "failed" ? "failed" : "idle"))}
              onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
              onError={() => setPlayback("failed")}
            >
              <source src={VIDEO} type="video/mp4" />
              <a href={VIDEO}>{t(L("Open the video", "Abrir el video"))}</a>
            </video>
            <button
              type="button"
              className="community-film-sound"
              onClick={toggleSound}
              aria-label={t(action)}
              aria-pressed={soundOn}
            >
              {soundOn ? (
                <Volume2 aria-hidden="true" size={19} />
              ) : (
                <VolumeX aria-hidden="true" size={19} />
              )}
              <span>{t(soundOn ? L("Mute", "Silenciar") : L("Sound on", "Activar sonido"))}</span>
            </button>
          </div>
          {playback === "failed" && (
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
