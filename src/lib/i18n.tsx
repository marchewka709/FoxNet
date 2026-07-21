import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pl" | "en";

type Dict = Record<string, { pl: string; en: string }>;

export const dict = {
  "nav.home": { pl: "Strona główna", en: "Home" },
  "nav.cash": { pl: "Kasy fiskalne", en: "Cash registers" },
  "nav.printers": { pl: "Drukarki", en: "Printers" },
  "nav.terminals": { pl: "Terminale płatnicze", en: "Payment terminals" },
  "nav.services": { pl: "Serwis", en: "Services" },
  "nav.contact": { pl: "Kontakt", en: "Contact" },
  "cta.contact": { pl: "Skontaktuj się", en: "Contact us" },
  "cta.learn": { pl: "Dowiedz się więcej", en: "Learn more" },

  "hero.eyebrow": { pl: "20 lat doświadczenia", en: "20 years of experience" },
  "hero.title": { pl: "Nie sprzedajemy tego co mamy, ale TO, czego potrzebujesz", en: "We don't sell what we have, but what you need" },
  "hero.subtitle": {
    pl: "Kasy fiskalne, drukarki, oprogramowanie i zestawy POS. Kompleksowa obsługa firm w całej Polsce.",
    en: "Cash registers, printers, software and POS systems. Complete solutions for businesses across Poland.",
  },
  "usp.title": { pl: "Dlaczego Foxnet?", en: "Why Foxnet?" },
  "usp.subtitle": {
    pl: "Łączymy dwie dekady doświadczenia z nowoczesną technologią.",
    en: "We combine two decades of experience with modern technology.",
  },
  "usp.1.title": { pl: "Certyfikowany serwis", en: "Certified service" },
  "usp.1.desc": {
    pl: "Autoryzowany serwis wiodących producentów kas i drukarek.",
    en: "Authorized service for leading cash register and printer manufacturers.",
  },
  "usp.2.title": { pl: "Szybka reakcja", en: "Fast response" },
  "usp.2.desc": {
    pl: "Interwencja u klienta nawet w ciągu 24 godzin.",
    en: "On-site intervention within 24 hours.",
  },
  "usp.3.title": { pl: "Kompleksowe wsparcie", en: "Full support" },
  "usp.3.desc": {
    pl: "Doradztwo, wdrożenie, szkolenie i opieka posprzedażowa.",
    en: "Consulting, deployment, training and after-sales care.",
  },
  "usp.4.title": { pl: "Nowoczesna technologia", en: "Modern technology" },
  "usp.4.desc": {
    pl: "Kasy online, integracje z systemami POS i chmura.",
    en: "Online registers, POS integrations and cloud.",
  },

  "sections.title": { pl: "Nasza oferta", en: "Our offer" },
  "sections.cash": { pl: "Kasy fiskalne", en: "Fiscal cash registers" },
  "sections.cash.desc": {
    pl: "Kasy online dla handlu, gastronomii i usług.",
    en: "Online registers for retail, hospitality and services.",
  },
  "sections.printers": { pl: "Drukarki fiskalne", en: "Fiscal printers" },
  "sections.printers.desc": {
    pl: "Drukarki dla sklepów, aptek i systemów POS.",
    en: "Printers for shops, pharmacies and POS systems.",
  },
  "sections.terminals": { pl: "Terminale płatnicze", en: "Payment terminals" },
  "sections.terminals.desc": {
    pl: "Nowoczesne terminale płatnicze dla sklepów, restauracji i e-commerce.",
    en: "Modern payment terminals for shops, restaurants and e-commerce.",
  },
  "sections.services": { pl: "Serwis i wsparcie", en: "Service & support" },
  "sections.services.desc": {
    pl: "Instalacja, konfiguracja, przeglądy i naprawy.",
    en: "Installation, configuration, inspections and repairs.",
  },
  "sections.software": { pl: "Oprogramowanie", en: "Software" },
  "sections.software.desc": {
    pl: "Programy do kompleksowej obsługi małych i średnich firm. Rozwiązania dla restauracji, baru, pizzerii i innych placówek gastronomicznych.",
    en: "Software for small and medium businesses. Solutions for restaurants, bars, pizzerias and other gastronomic venues.",
  },
  "sections.calculator": { pl: "Kalkulator", en: "Calculator" },
  "sections.calculator.desc": {
    pl: "Kalkulator cen. Sprawdź naszą ofertę i ciesz się dobrym wyborem. Zadaj szybkie pytanie o cenę i oszczędzaj.",
    en: "Price calculator. Check our offer and enjoy a good choice. Ask for a quick price and save.",
  },
  "sections.pos": { pl: "Zestawy POS", en: "POS Systems" },
  "sections.pos.desc": {
    pl: "Sprzedaż i dzierżawa komputerów POS wraz oprogramowaniem do obsługi sprzedaży w lokalach gastronomicznych i sklepach.",
    en: "Sales and rental of POS computers with software for handling sales in gastronomic and retail venues.",
  },
  "trust.title": { pl: "Zaufali nam", en: "Trusted by" },
  "trust.desc": { pl: "Ponad 5000 zadowolonych klientów. Codziennie nowe wdrożenia.", en: "Over 5000 satisfied customers. New implementations daily." },

  "page.cash.title": { pl: "Kasy fiskalne online", en: "Online fiscal cash registers" },
  "page.cash.subtitle": {
    pl: "Wybierz sprzęt dopasowany do Twojej branży.",
    en: "Choose equipment tailored to your industry.",
  },
  "page.printers.title": { pl: "Drukarki fiskalne", en: "Fiscal printers" },
  "page.printers.subtitle": {
    pl: "Niezawodne drukarki dla każdego punktu sprzedaży.",
    en: "Reliable printers for every point of sale.",
  },
  "page.terminals.title": { pl: "Terminale płatnicze", en: "Payment terminals" },
  "page.terminals.subtitle": {
    pl: "Nowoczesne terminale płatnicze dla każdego rodzaju działalności.",
    en: "Modern payment terminals for all types of businesses.",
  },
  "page.services.title": { pl: "Serwis i usługi", en: "Service & solutions" },
  "page.services.subtitle": {
    pl: "Kompleksowe wsparcie techniczne i wdrożenia.",
    en: "End-to-end technical support and deployments.",
  },
  "page.contact.title": { pl: "Skontaktuj się z nami", en: "Get in touch" },
  "page.contact.subtitle": {
    pl: "Zadzwoń, napisz lub odwiedź nasze biuro.",
    en: "Call, write or visit our office.",
  },

  "services.install.title": { pl: "Instalacja i wdrożenie", en: "Installation & deployment" },
  "services.install.desc": {
    pl: "Uruchomienie sprzętu w Twojej firmie, konfiguracja i pierwsze uruchomienie.",
    en: "On-site setup, configuration and first launch.",
  },
  "services.service.title": { pl: "Serwis gwarancyjny", en: "Warranty service" },
  "services.service.desc": {
    pl: "Autoryzowany serwis Posnet, Novitus, Elzab i innych.",
    en: "Authorized service for Posnet, Novitus, Elzab and more.",
  },
  "services.review.title": { pl: "Przeglądy okresowe", en: "Periodic inspections" },
  "services.review.desc": {
    pl: "Obowiązkowe przeglądy kas fiskalnych z pełną dokumentacją.",
    en: "Mandatory cash register inspections with full documentation.",
  },
  "services.training.title": { pl: "Szkolenia", en: "Training" },
  "services.training.desc": {
    pl: "Szkolimy Twój zespół z obsługi urządzeń fiskalnych.",
    en: "We train your team on fiscal device operation.",
  },
  "services.integration.title": { pl: "Integracje POS", en: "POS integrations" },
  "services.integration.desc": {
    pl: "Łączymy kasy z Twoim systemem sprzedaży i magazynem.",
    en: "We connect registers with your sales and inventory systems.",
  },
  "services.online.title": { pl: "Fiskalizacja online", en: "Online fiscalization" },
  "services.online.desc": {
    pl: "Przygotowanie i zgłoszenie kas do Centralnego Repozytorium Kas.",
    en: "Preparation and reporting to the Central Cash Register Repository.",
  },

  "contact.form.name": { pl: "Imię i nazwisko", en: "Full name" },
  "contact.form.email": { pl: "Email", en: "Email" },
  "contact.form.phone": { pl: "Telefon", en: "Phone" },
  "contact.form.message": { pl: "Wiadomość", en: "Message" },
  "contact.form.submit": { pl: "Wyślij wiadomość", en: "Send message" },
  "contact.form.thanks": { pl: "Dziękujemy! Odezwiemy się wkrótce.", en: "Thank you! We'll be in touch shortly." },
  "contact.info.address": { pl: "Adres", en: "Address" },
  "contact.info.phone": { pl: "Telefon", en: "Phone" },
  "contact.info.email": { pl: "Email", en: "Email" },
  "contact.info.hours": { pl: "Godziny pracy", en: "Working hours" },
  "contact.hours": { pl: "Pon–Pt: 8:00 – 17:00", en: "Mon–Fri: 8:00 AM – 5:00 PM" },

  "footer.tagline": { pl: "Kasy fiskalne, drukarki i terminale płatnicze od 2005 roku.", en: "Cash registers, printers & payment terminals since 2005." },
  "footer.rights": { pl: "Wszelkie prawa zastrzeżone.", en: "All rights reserved." },
  "footer.admin": { pl: "Panel", en: "Panel" },

  "products.empty": { pl: "Brak produktów w tej kategorii.", en: "No products in this category yet." },
  "products.features": { pl: "Wyróżniki", en: "Highlights" },
  "product.cta": { pl: "Zapytaj o ofertę", en: "Request a quote" },
} satisfies Dict;

export type TKey = keyof typeof dict;

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string }>({
  lang: "pl",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pl");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("foxnet-lang") as Lang | null) : null;
    if (stored === "pl" || stored === "en") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("foxnet-lang", l);
  };
  const t = (k: TKey) => dict[k]?.[lang] ?? k;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
