import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { logo } from "@/content/site";
import { Control } from "./Control";
import { LanguageSwitch } from "./LanguageSwitch";

const navItems = [
  { to: "/workshops", label: L("Workshops", "Talleres") },
  { to: "/events", label: L("Events", "Eventos") },
  { to: "/about", label: L("Community", "Comunidad") },
  { to: "/prompt-library", label: L("Prompt library", "Prompts") },
  { to: "/projects", label: L("Projects", "Proyectos") },
  { to: "/careers", label: L("Careers", "Carreras") },
] as const;

export function SiteHeader() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t(L("Skip to content", "Saltar al contenido"))}
      </a>
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] min-h-[var(--header-h)] items-center gap-2 py-2 lg:flex">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-full pr-2"
          aria-label={t(L("We’ve Got Now — home", "We’ve Got Now — inicio"))}
        >
          <img
            src={logo.src}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full"
          />
          <span className="font-display text-sm sm:text-base font-semibold leading-tight ">
            We’ve Got Now
          </span>
        </Link>

        <nav aria-label={t(L("Main", "Principal"))} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="nav-link">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <LanguageSwitch />
          <Control
            ref={buttonRef}
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Menu className="h-4 w-4" aria-hidden />
            )}
            <span className="sr-only">{open ? t(L("Close", "Cerrar")) : t(L("Menu", "Menú"))}</span>
          </Control>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t(L("Main", "Principal"))}
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-border lg:hidden"
        >
          <ul className="shell grid gap-1 py-4">
            <li>
              <Link to="/" activeOptions={{ exact: true }} className="nav-link block py-3 text-lg">
                {t(L("Home", "Inicio"))}
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="nav-link block py-3 text-lg">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
