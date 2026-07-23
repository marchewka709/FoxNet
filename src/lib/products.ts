export type ProductCategory = "cash_register" | "printer" | "terminal";

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  short_description_pl: string | null;
  short_description_en: string | null;
  description_pl: string | null;
  description_en: string | null;
  features_pl: string[] | null;
  features_en: string[] | null;
  image_url: string | null;
  price: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    category: "cash_register",
    name: "Kasa fiskalna Posnet ERGO Online",
    slug: "posnet-ergo-online",
    short_description_pl: "Popularna kasa fiskalna w wersji ONLINE z modułową konstrukcją.",
    short_description_en: "Popular fiscal cash register in ONLINE version with modular design.",
    description_pl: null,
    description_en: null,
    features_pl: ["Online", "Modułowa konstrukcja", "WiFi/GPRS", "Obsługa CRK"],
    features_en: ["Online", "Modular design", "WiFi/GPRS", "CRK support"],
    image_url: null,
    price: "1659 zł",
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    category: "printer",
    name: "Drukarka fiskalna Posnet",
    slug: "posnet-printer-online",
    short_description_pl: "Drukarka fiskalna do zastosowań online i offline.",
    short_description_en: "Fiscal printer for online and offline use.",
    description_pl: null,
    description_en: null,
    features_pl: ["Szybki druk", "Niska konsumpcja papieru", "Łatwa konfiguracja"],
    features_en: ["Fast printing", "Low paper consumption", "Easy setup"],
    image_url: null,
    price: null,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    category: "terminal",
    name: "Terminal płatniczy",
    slug: "terminal-platniczy-1",
    short_description_pl: "Terminal płatniczy z obsługą kart i zbliżeniowej.",
    short_description_en: "Payment terminal with card and contactless support.",
    description_pl: null,
    description_en: null,
    features_pl: ["Kontaktless", "GSM/WiFi", "Ekspresowa rozliczenia"],
    features_en: ["Contactless", "GSM/WiFi", "Express settlements"],
    image_url: null,
    price: null,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const productsQuery = (category: ProductCategory) => ({
  queryKey: ["products", category],
  queryFn: () =>
    new Promise<Product[]>((resolve) =>
      setTimeout(
        () => resolve(PRODUCTS.filter((p) => p.category === category)),
        100,
      ),
    ),
});

export const allProductsQuery = () => ({
  queryKey: ["products"],
  queryFn: () =>
    new Promise<Product[]>((resolve) =>
      setTimeout(() => resolve([...PRODUCTS]), 100),
    ),
});

export const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: () =>
    new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS.find((p) => p.slug === slug);
        if (!product) return reject(new Error("Product not found"));
        resolve(product);
      }, 100);
    }),
});
