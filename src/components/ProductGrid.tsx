import { motion } from "motion/react";
import { Check, Cpu, Printer, CreditCard } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

const categoryIcons: Record<Product["category"], typeof Cpu> = {
  cash_register: Cpu,
  printer: Printer,
  terminal: CreditCard,
};

export function ProductGrid({ products }: { products: Product[] }) {
  const { lang, t } = useI18n();
  if (!products.length) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-primary/20 bg-white p-8 text-center text-muted-foreground text-sm sm:p-12">
        {t("products.empty")}
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {products.map((p, i) => {
        const desc = lang === "pl" ? p.description_pl ?? p.short_description_pl : p.description_en ?? p.short_description_en;
        const features = (lang === "pl" ? p.features_pl : p.features_en) ?? [];
        const Icon = categoryIcons[p.category] ?? Cpu;
        const productPath = `/${p.category === "cash_register" ? "kasy-fiskalne" : p.category === "printer" ? "drukarki" : "terminale-platnicze"}/${p.slug}`;
        return (
          <Link
            key={p.id}
            to={productPath}
            className="group block"
          >
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-elegant sm:rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-secondary via-white to-accent">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon className="h-16 w-16 text-primary/30 sm:h-20 sm:w-20" strokeWidth={1.2} />
                  </div>
                )}
                {p.price && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-primary shadow-card sm:right-4 sm:top-4 sm:px-3 sm:py-1">
                    {p.price}
                  </span>
                )}
              </div>
              <div className="p-5 sm:p-8">
                <h3 className="text-lg font-semibold text-primary group-hover:text-primary-bright transition-colors sm:text-xl">{p.name}</h3>
                {desc && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{desc}</p>}
                {features.length > 0 && (
                  <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                    {features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-primary/85 sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-bright sm:h-4 sm:w-4" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="text-xs text-primary/60 sm:text-sm">+{features.length - 4} więcej</li>
                    )}
                  </ul>
                )}
              </div>
            </motion.article>
          </Link>
        );
      })}
    </div>
  );
}