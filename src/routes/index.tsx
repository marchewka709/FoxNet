import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Cpu, Printer, ShieldCheck, Wrench, Zap, HeadphonesIcon, Package, Calculator, CreditCard } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foxnet – Kasy fiskalne, drukarki i serwis | Wrocław" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const usps: { icon: typeof ShieldCheck; title: TKey; desc: TKey }[] = [
    { icon: ShieldCheck, title: "usp.1.title", desc: "usp.1.desc" },
    { icon: Zap, title: "usp.2.title", desc: "usp.2.desc" },
    { icon: HeadphonesIcon, title: "usp.3.title", desc: "usp.3.desc" },
    { icon: Cpu, title: "usp.4.title", desc: "usp.4.desc" },
  ];
  const sections: { icon: typeof Cpu; title: TKey; desc: TKey; to?: string }[] = [
    { icon: Cpu, title: "sections.cash", desc: "sections.cash.desc", to: "/kasy-fiskalne" },
    { icon: Printer, title: "sections.printers", desc: "sections.printers.desc", to: "/drukarki" },
    { icon: CreditCard, title: "sections.terminals", desc: "sections.terminals.desc", to: "/terminale-platnicze" },
    { icon: Wrench, title: "sections.services", desc: "sections.services.desc", to: "/serwis" },
    { icon: Package, title: "sections.software", desc: "sections.software.desc" },
    { icon: Calculator, title: "sections.calculator", desc: "sections.calculator.desc" },
    { icon: Cpu, title: "sections.pos", desc: "sections.pos.desc" },
  ];

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ contentVisibility: "auto" }}>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary-bright/40 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest backdrop-blur sm:px-4 sm:py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
              {t("hero.eyebrow")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t("hero.title").split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.05 }}
                  className="mr-2 inline-block sm:mr-3"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 max-w-xl text-base text-white/80 sm:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9"
            >
              <Link
                to="/kontakt"
                search={{ product: "" }}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-glow transition hover:scale-[1.02] sm:px-6 sm:py-3"
              >
                {t("cta.contact")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kasy-fiskalne"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10 sm:px-6 sm:py-3"
              >
                {t("cta.learn")}
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 backdrop-blur-xl ring-1 ring-white/20" />
              <div className="absolute inset-6 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center p-10">
                <img
                  src="/FoxnetLogo.webp"
                  alt="Foxnet"
                  className="w-full"
                  loading="eager"
                  decoding="async"
                  width={400}
                  height={400}
                  fetchPriority="high"
                />
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-10 rounded-2xl bg-white/95 p-4 shadow-elegant backdrop-blur"
                style={{ willChange: "transform" }}
              >
                <ShieldCheck className="h-8 w-8 text-primary-bright" />
                <p className="mt-2 text-xs font-semibold text-primary">100% online</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 bottom-14 rounded-2xl bg-white/95 p-4 shadow-elegant backdrop-blur"
                style={{ willChange: "transform" }}
              >
                <Zap className="h-8 w-8 text-primary-bright" />
                <p className="mt-2 text-xs font-semibold text-primary">24h serwis</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USPs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">{t("usp.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base sm:mt-3">{t("usp.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-primary/8 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant sm:rounded-3xl sm:p-6"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-bright/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary-bright sm:h-12 sm:w-12 sm:rounded-2xl">
                  <u.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary sm:text-lg sm:mt-5">{t(u.title)}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm sm:mt-2">{t(u.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="relative surface-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">{t("sections.title")}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {s.to ? (
                  <Link
                    to={s.to}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant sm:rounded-3xl sm:p-8"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-bright to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-bright text-white shadow-glow sm:h-14 sm:w-14 sm:rounded-2xl">
                      <s.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-primary sm:text-xl sm:mt-6">{t(s.title)}</h3>
                    <p className="mt-1.5 flex-1 text-xs text-muted-foreground sm:text-sm sm:mt-2">{t(s.desc)}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-bright sm:mt-6">
                      {t("cta.learn")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-card sm:rounded-3xl sm:p-8">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-bright text-white shadow-glow sm:h-14 sm:w-14 sm:rounded-2xl">
                      <s.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-primary sm:text-xl sm:mt-6">{t(s.title)}</h3>
                    <p className="mt-1.5 flex-1 text-xs text-muted-foreground sm:text-sm sm:mt-2">{t(s.desc)}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">{t("trust.title")}</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-lg sm:mt-4">{t("trust.desc")}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}