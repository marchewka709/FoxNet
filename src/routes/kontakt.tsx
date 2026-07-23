import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, type ChangeEvent } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { PageShell, PageHero } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Foxnet Wrocław" },
      { name: "description", content: "Skontaktuj się z Foxnet. Wrocław, ul. Wojciecha Cybulskiego 2/4. Telefon, email i formularz kontaktowy." },
      { property: "og:title", content: "Kontakt – Foxnet" },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      product: (search.product as string) || "",
    };
  },
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(1000),
});

function ContactPage() {
  const { t } = useI18n();
  const { product } = Route.useSearch();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: product ? `Dzień dobry,\n\nJestem zainteresowany modelem: ${product}\n\n` : "" 
  });
  const [submitting, setSubmitting] = useState(false);

  const updateField = useCallback((field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setForm(prev => {
      const parsed = schema.safeParse(prev);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
        return prev;
      }
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setForm({ name: "", email: "", phone: "", message: "" });
        toast.success(t("contact.form.thanks"));
      }, 700);
      return prev;
    });
  }, [t]);

  return (
    <PageShell>
      <PageHero title={t("page.contact.title")} subtitle={t("page.contact.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: MapPin, label: t("contact.info.address"), value: "FOXNET Kasy i drukarki fiskalne\nul. Wojciecha Cybulskiego 2/4\n50-206 Wrocław" },
              { icon: Phone, label: t("contact.info.phone"), value: "+48 71 390 09 00" },
              { icon: Mail, label: t("contact.info.email"), value: "biuro@foxnet.wroc.pl" },
              { icon: Clock, label: t("contact.info.hours"), value: t("contact.hours") },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-primary/10 bg-white p-4 sm:p-5 shadow-card">
                <div className="inline-flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary-bright">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="mt-1 whitespace-pre-line text-xs sm:text-sm font-medium text-primary">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-card">
              <iframe
                title="Foxnet map"
                src="https://www.google.com/maps?q=Wojciecha+Cybulskiego+2%2F4+Wroc%C5%82aw&output=embed"
                className="h-56 sm:h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

            <form
            onSubmit={submit}
            className="lg:col-span-3 space-y-4 sm:space-y-5 rounded-2xl sm:rounded-3xl border border-primary/10 bg-white p-5 shadow-elegant sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("contact.form.name")}>
                <input required maxLength={100} value={form.name} onChange={updateField("name")} className={inputCls} />
              </Field>
              <Field label={t("contact.form.email")}>
                <input required type="email" maxLength={255} value={form.email} onChange={updateField("email")} className={inputCls} />
              </Field>
            </div>
            <Field label={t("contact.form.phone")}>
              <input maxLength={30} value={form.phone} onChange={updateField("phone")} className={inputCls} />
            </Field>
            <Field label={t("contact.form.message")}>
              <textarea required maxLength={1000} rows={6} value={form.message} onChange={updateField("message")} className={`${inputCls} resize-none`} />
            </Field>
            <button
              type="submit"
              disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-70"
            >
              {t("contact.form.submit")}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-white px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-primary shadow-sm outline-none transition focus:border-primary-bright focus:ring-2 focus:ring-primary-bright/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
