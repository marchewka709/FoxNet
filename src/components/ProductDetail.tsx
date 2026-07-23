import { motion } from "motion/react";
import { ArrowLeft, Check, Cpu, Printer, CreditCard, Shield, Zap, Headphones, Package, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

const categoryLabels: Record<Product["category"], { pl: string; en: string }> = {
  cash_register: { pl: "Kasy fiskalne", en: "Cash registers" },
  printer: { pl: "Drukarki fiskalne", en: "Fiscal printers" },
  terminal: { pl: "Terminale płatnicze", en: "Payment terminals" },
};

const categoryIcons: Record<Product["category"], typeof Cpu> = {
  cash_register: Cpu,
  printer: Printer,
  terminal: CreditCard,
};

const perks = [
  { icon: Shield, pl: "Gwarancja producenta", en: "Manufacturer warranty" },
  { icon: Zap, pl: "Szybka wysyłka", en: "Fast shipping" },
  { icon: Headphones, pl: "Wsparcie techniczne", en: "Technical support" },
  { icon: Package, pl: "Darmowa dostawa", en: "Free delivery" },
];

// Hardcoded descriptions for Posnet ERGO Online
const posnetErgoOnlineDescription = {
  pl: `1659 zł brutto
1349 zł netto

Jedna z najbardziej popularnych kas fiskalnych na rynku Posnet ERGO teraz dostępna w wersji ONLINE. Urządzenie, dzięki modułowej konstrukcji, zapewnia użytkownikowi swobodę wyboru między przewodowym lub bezprzewodowym połączeniem z Centralnym Repozytorium Kas (CRK).

Moduł rozszerzenia I - Posnet ERGO - 2 x RS232, port szuflady - 190,00 pln
Moduł rozszerzenia II - Posnet ERGO - WiFi, 2 x RS232, port szuflady - 290,00 pln
Moduł rozszerzenia III - Posnet ERGO - modem GPRS, 2 x RS232, port szuflady - 390,00 pln
Rozszerzenie bazy PLU o 2000 kodów - 60,00 pln
Rozszerzenie bazy PLU o 4000 kodów - 100,00 pln
Szalka ważąca DS-1 - 599,00 pln
 
ONLINE - urządzenie fiskalne, które komunikuje  się z Centralnym Rejestrem Kas (CRK , inaczej Repozytorium) prowadzonym przez Szefa Krajowej Administracji Skarbowej. CRK będzie gromadzić szereg danych m. in.: raporty dobowe, paragony fiskalne, dokumenty niefiskalne, zdarzenia a także informacje o dokonanych przeglądach okresowych.
 

Funkcja kaso-wagi - połączenie kasy fiskalnej z dedykowaną wagą elektroniczną. Funkcje takie jak tarowanie i zerowanie wagi wywoływane są z klawiatury kasy. Wskazania wagi pojawiają się bezpośrednio na wyświetlaczach operatora i Klienta.`,
  en: `1659 PLN gross
1349 PLN net

One of the most popular cash registers on the market, Posnet ERGO, now available in ONLINE version. The device, thanks to its modular design, allows the user to choose between wired or wireless connection to the Central Cash Register Repository (CRK).

Extension module I - Posnet ERGO - 2 x RS232, drawer port - 190,00 PLN
Extension module II - Posnet ERGO - WiFi, 2 x RS232, drawer port - 290,00 PLN
Extension module III - Posnet ERGO - GPRS modem, 2 x RS232, drawer port - 390,00 PLN
PLU database extension by 2000 codes - 60,00 PLN
PLU database extension by 4000 codes - 100,00 PLN
Weighing scale DS-1 - 599,00 PLN
 
ONLINE - a fiscal device that communicates with the Central Cash Register Repository (CRK, also known as Repository) maintained by the Head of the National Tax Administration. CRK will collect data including: daily reports, fiscal receipts, non-fiscal documents, events and information about periodic inspections.
 

Scale function - connection of a fiscal cash register with a dedicated electronic scale. Functions such as taring and zeroing the scale are triggered from the cash register keyboard. Weight readings appear directly on the operator and customer displays.`
};

function parseDescription(text: string | null): React.ReactNode {
  if (!text) return null;

  if (/<[a-z][\s\S]*>/i.test(text)) {
    return (
      <div
        className="prose prose-sm sm:prose-lg max-w-none
          prose-headings:text-primary prose-headings:font-bold
          prose-h2:text-lg sm:prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-2 sm:prose-h2:mt-8 sm:prose-h2:mb-3
          prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 prose-p:text-gray-700
          prose-strong:text-primary prose-strong:font-semibold
          prose-table:w-full prose-table:border-collapse prose-table:my-4 sm:prose-table:my-6
          prose-th:bg-gray-50 prose-th:text-primary prose-th:font-semibold prose-th:p-2 sm:prose-th:p-3 prose-th:text-left prose-th:text-xs sm:prose-th:text-sm
          prose-td:p-2 sm:prose-td:p-3 prose-td:text-xs sm:prose-td:text-sm prose-td:border-b prose-td:border-gray-200
          prose-tr:even:prose-td:bg-gray-50
        "
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const sections: { type: 'price' | 'text' | 'table' | 'info'; content: string[] }[] = [];
  let currentSection: { type: 'text' | 'table' | 'info'; content: string[] } | null = null;

  for (const line of lines) {
    if (/^\d[\d\s]*\s*zł\s*(brutto|netto)/i.test(line) || /^\d[\d\s]*\s*PLN\s*(gross|net)/i.test(line)) {
      if (currentSection) { sections.push(currentSection); currentSection = null; }
      sections.push({ type: 'price', content: [line] });
      continue;
    }

    if (/^.{10,}[-–]\s*\d[\d\s]*,?\d*\s*(zł|pln|PLN)/i.test(line)) {
      if (currentSection && currentSection.type !== 'table') { sections.push(currentSection); currentSection = null; }
      if (!currentSection) {
        currentSection = { type: 'table', content: [] };
      }
      currentSection.content.push(line);
      continue;
    }

    if (/^online\s*-|funkcja\s*kaso-wagi/i.test(line) || /^ONLINE\s*-/i.test(line)) {
      if (currentSection) { sections.push(currentSection); currentSection = null; }
      sections.push({ type: 'info', content: [line] });
      continue;
    }

    if (!currentSection) {
      currentSection = { type: 'text', content: [] };
    }
    currentSection.content.push(line);
  }
  if (currentSection) sections.push(currentSection);

  return (
    <div className="space-y-4 sm:space-y-6">
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'price':
            return (
              <div key={idx} className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
                <h2 className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3">Cena</h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {section.content.map((line, i) => {
                    const isBrutto = /brutto/i.test(line) || /gross/i.test(line);
                    const isNetto = /netto/i.test(line) || /net/i.test(line);
                    const price = line.match(/([\d\s]+)\s*(zł|PLN)/i);
                    return (
                      <div key={i} className="bg-gray-50 rounded p-2 sm:p-3 text-center">
                        <p className="text-xs text-gray-500 uppercase">{isBrutto ? 'Brutto' : isNetto ? 'Netto' : ''}</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">{price ? price[1].trim() + ' zł' : line}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );

          case 'table':
            return (
              <div key={idx}>
                <h2 className="text-sm sm:text-base font-bold text-primary mb-1.5 sm:mb-2">Moduły rozszerzeń i akcesoria</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-1.5 sm:p-2 text-left font-semibold text-primary">Nazwa</th>
                        <th className="p-1.5 sm:p-2 text-right font-semibold text-primary">Cena</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.content.map((line, i) => {
                        const match = line.match(/^(.+?)\s*[-–]\s*(\d[\d\s]*,?\d*)\s*(zł|pln|PLN)/i);
                        if (match) {
                          return (
                            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                              <td className="p-1.5 sm:p-2 border-b border-gray-200">{match[1].trim()}</td>
                              <td className="p-1.5 sm:p-2 text-right border-b border-gray-200">{match[2].trim()} zł</td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={i}>
                            <td colSpan={2} className="p-1.5 sm:p-2 border-b border-gray-200">{line}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'info':
            return (
              <div key={idx} className="bg-blue-50 rounded-lg p-4 sm:p-5 border border-blue-100">
                <h2 className="text-sm sm:text-base font-bold text-primary flex items-center gap-2 mb-1.5 sm:mb-2">
                  <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {section.content[0].replace(/^[–\-—]\s*/, '').split(' - ')[0]}
                </h2>
                {section.content.map((line, i) => {
                  const content = line.replace(/^[–\-—]\s*/, '').split(' - ').slice(1).join(' - ');
                  return content ? <p key={i} className="text-gray-700 text-xs sm:text-sm">{content}</p> : null;
                })}
              </div>
            );

          case 'text':
            return (
              <div key={idx} className="prose max-w-none">
                {section.content.map((line, i) => {
                  const formatted = line
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>')
                    .replace(/\b(ONLINE|CRK|Posnet ERGO|Centralnym Repozytorium Kas)\b/g, '<strong class="text-primary">$1</strong>');
                  return (
                    <p key={i} className="text-gray-700 text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
                  );
                })}
              </div>
            );
        }
      })}
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  const Icon = categoryIcons[product.category];
  const label = categoryLabels[product.category][lang];
  const description = product.slug === 'posnet-ergo-online'
    ? posnetErgoOnlineDescription[lang]
    : (lang === "pl" ? product.description_pl : product.description_en);
  const features = (lang === "pl" ? product.features_pl : product.features_en) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white border-b border-gray-200 py-2"
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="flex items-center text-xs text-gray-500 overflow-x-auto whitespace-nowrap pb-0.5">
            <Link to="/" className="hover:text-primary shrink-0">Strona główna</Link>
            <span className="mx-1 shrink-0">/</span>
            <Link to={`/${product.category === "cash_register" ? "kasy-fiskalne" : product.category === "printer" ? "drukarki" : "terminale-platnicze"}`} className="hover:text-primary shrink-0">
              {label}
            </Link>
            <span className="mx-1 shrink-0">/</span>
            <span className="text-primary font-medium truncate">{product.name}</span>
          </div>
        </div>
      </motion.div>

      {/* Product Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white py-4 sm:py-6 border-b border-gray-200"
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Image */}
            <div className="md:w-2/5">
              <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden max-w-xs mx-auto md:max-w-none">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <Icon className="h-20 w-20 sm:h-24 sm:w-24 text-gray-300" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="md:w-3/5">
              <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium">
                {label}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-primary mt-1.5 sm:mt-2">{product.name}</h1>
              
              {product.short_description_pl && lang === "pl" && (
                <p className="text-gray-600 mt-1.5 sm:mt-2 text-xs sm:text-sm">{product.short_description_pl}</p>
              )}
              {product.short_description_en && lang === "en" && (
                <p className="text-gray-600 mt-1.5 sm:mt-2 text-xs sm:text-sm">{product.short_description_en}</p>
              )}

              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2 text-xs">
                {perks.map((perk, i) => {
                  const PIcon = perk.icon;
                  return (
                    <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                      <PIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                      <span className="text-gray-600">{lang === "pl" ? perk.pl : perk.en}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                <Link to="/kontakt" search={{ product: product.name }} className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded text-xs font-medium hover:bg-primary/90">
                  {t("product.cta")}
                </Link>
                <Link to="/" className="border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded text-xs font-medium hover:bg-gray-50">
                  <ArrowLeft className="h-3 w-3 inline mr-1" />
                  Powrót
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
        >
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Opis produktu</h2>
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            {parseDescription(description)}
          </div>
        </motion.div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
        >
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Cechy produktu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-200 flex gap-1.5 sm:gap-2"
              >
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primary/5 py-6 sm:py-8"
      >
        <div className="max-w-3xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-primary">Zainteresowany tym produktem?</h2>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Skontaktuj się z nami — doradzimy i przygotujemy indywidualną ofertę.</p>
          <Link to="/kontakt" search={{ product: product.name }} className="inline-block bg-primary text-white px-5 py-2 sm:px-6 sm:py-2 rounded text-sm font-medium mt-2 sm:mt-3 hover:bg-primary/90">
            Skontaktuj się
          </Link>
        </div>
      </motion.div>
    </div>
  );
}