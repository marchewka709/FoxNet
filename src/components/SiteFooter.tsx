import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-primary/10 bg-gradient-to-b from-white to-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src="/FoxnetLogo.webp" alt="Foxnet" className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">{t("nav.contact")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" />
                <span>ul. Wojciecha Cybulskiego 2/4<br />50-206 Wrocław</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary-bright" />
                <a href="tel:+48713900900" className="hover:text-primary">+48 71 390 09 00</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary-bright" />
                <a href="mailto:biuro@foxnet.wroc.pl" className="hover:text-primary">biuro@foxnet.wroc.pl</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">Foxnet</h4>
             <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
               <li><Link to="/kasy-fiskalne" className="hover:text-primary">{t("nav.cash")}</Link></li>
               <li><Link to="/drukarki" className="hover:text-primary">{t("nav.printers")}</Link></li>
               <li><Link to="/terminale-platnicze" className="hover:text-primary">{t("nav.terminals")}</Link></li>
               <li><Link to="/serwis" className="hover:text-primary">{t("nav.services")}</Link></li>
               <li><Link to="/kontakt" search={{ product: "" }} className="hover:text-primary">{t("nav.contact")}</Link></li>
             </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 FoxNet</p>
          {/* Hidden admin access */}
          <Link to="/admin" className="opacity-40 transition-opacity hover:opacity-100">
            · {t("footer.admin")} ·
          </Link>
        </div>
      </div>
    </footer>
  );
}
