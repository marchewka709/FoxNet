  import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type TKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV: { to: string; key: TKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/kasy-fiskalne", key: "nav.cash" },
  { to: "/drukarki", key: "nav.printers" },
  { to: "/terminale-platnicze", key: "nav.terminals" },
  { to: "/serwis", key: "nav.services" },
  { to: "/kontakt", key: "nav.contact" },
];

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "glass-header shadow-card" : "bg-white/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/FoxnetLogo.webp" alt="Foxnet logo" className="h-7 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-primary/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{t(item.key)}</span>
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/8" />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 rounded-full border border-primary/10 bg-white/70 p-0.5 shadow-card sm:gap-1 sm:p-1">
            <button
              type="button"
              onClick={() => setLang("pl")}
              aria-label="Polski"
              className={cn(
                "flex h-6 w-7 items-center justify-center overflow-hidden rounded-full transition sm:h-7 sm:w-9",
                lang === "pl" ? "ring-2 ring-primary-bright" : "opacity-60 hover:opacity-100",
              )}
            >
              <img src="/FlagaPL.webp" alt="PL" className="h-full w-full object-cover" />
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label="English"
              className={cn(
                "flex h-6 w-7 items-center justify-center overflow-hidden rounded-full transition sm:h-7 sm:w-9",
                lang === "en" ? "ring-2 ring-primary-bright" : "opacity-60 hover:opacity-100",
              )}
            >
              <img src="/FlagaUK.webp" alt="EN" className="h-full w-full object-cover" />
            </button>
          </div>

          <button
            type="button"
            className="rounded-full border border-primary/10 bg-white p-1.5 text-primary lg:hidden sm:p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary/8 bg-white/90 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col p-3 sm:p-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5"
                activeProps={{ className: "bg-primary/8" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
