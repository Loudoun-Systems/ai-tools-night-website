import { Link } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { LINKEDIN_URL, MEETUP_URL, logo } from "@/content/site";
const navItems = [
  { to: "/workshops", label: L("Workshops", "Talleres") },
  { to: "/events", label: L("Events", "Eventos") },
  { to: "/about", label: L("Community", "Comunidad") },
  { to: "/prompt-library", label: L("Prompt library", "Prompts") },
  { to: "/projects", label: L("Projects", "Proyectos") },
  { to: "/careers", label: L("Careers", "Carreras") },
  { to: "/contact", label: L("Contact & collaborate", "Contacto y colaboración") },
] as const;

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="mt-8 border-t border-border bg-ink-deep">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end">
          <div className="max-w-xl">
            <h2 className="display-2">
              {t(L("See you at your next idea.", "Nos vemos en tu próxima idea."))}
            </h2>
            <p className="lede mt-4">
              {t(
                L(
                  "Join the We’ve Got Now community on Meetup to hear about the next gathering and workshop.",
                  "Únete a la comunidad de We’ve Got Now en Meetup para enterarte del próximo encuentro y taller.",
                ),
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a className="btn btn-primary" href={MEETUP_URL} target="_blank" rel="noreferrer">
              {t(L("Join us on Meetup", "Únete en Meetup"))}
            </a>
            <a className="btn btn-ghost" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              {t(L("Follow on LinkedIn", "Síguenos en LinkedIn"))}
            </a>
          </div>
        </div>

        <div className="rule my-10" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div className="flex items-start gap-3">
            <img
              src={logo.src}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full"
              loading="lazy"
            />
            <p className="body-copy max-w-xs text-sm">
              <span className="font-display text-base font-semibold text-foreground">
                We’ve Got Now
              </span>
              <br />
              {t(
                L(
                  "A Northern Virginia community for practical AI exploration — AI Tools Explorers Night and hands-on workshops.",
                  "Una comunidad del norte de Virginia para explorar la IA práctica: AI Tools Explorers Night y talleres prácticos.",
                ),
              )}
            </p>
          </div>
          <nav aria-label={t(L("Explore", "Explorar"))}>
            <h3 className="text-sm font-semibold text-foreground">{t(L("Explore", "Explorar"))}</h3>
            <ul className="mt-3 grid gap-2 text-sm">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t(L("Policies", "Políticas"))}>
            <h3 className="text-sm font-semibold text-foreground">
              {t(L("The fine print", "Lo importante"))}
            </h3>
            <ul className="mt-3 grid gap-2 text-sm">
              <li>
                <Link
                  to="/code-of-conduct"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(L("Code of conduct", "Código de conducta"))}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(L("Privacy", "Privacidad"))}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(L("Terms", "Términos"))}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">© 2026 We’ve Got Now</p>
      </div>
    </footer>
  );
}
