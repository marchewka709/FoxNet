import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Wrench, ShieldCheck, ClipboardCheck, GraduationCap, Network, Cloud } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/serwis")({
  head: () => ({
    meta: [
      { title: "Serwis i usługi IT – Foxnet" },
      { name: "description", content: "Autoryzowany serwis kas i drukarek, wdrożenia, integracje POS, szkolenia i fiskalizacja online." },
      { property: "og:title", content: "Serwis i usługi IT – Foxnet" },
      { property: "og:url", content: "/serwis" },
    ],
    links: [{ rel: "canonical", href: "/serwis" }],
  }),
  component: ServicesPage,
});

const SERVICES: { icon: typeof Wrench; title: TKey; desc: TKey }[] = [
  { icon: Wrench, title: "services.install.title", desc: "services.install.desc" },
  { icon: ShieldCheck, title: "services.service.title", desc: "services.service.desc" },
  { icon: ClipboardCheck, title: "services.review.title", desc: "services.review.desc" },
  { icon: GraduationCap, title: "services.training.title", desc: "services.training.desc" },
  { icon: Network, title: "services.integration.title", desc: "services.integration.desc" },
  { icon: Cloud, title: "services.online.title", desc: "services.online.desc" },
];

function ServicesPage() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero title={t("page.services.title")} subtitle={t("page.services.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-bright/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-bright text-white shadow-glow">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">{t(s.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
