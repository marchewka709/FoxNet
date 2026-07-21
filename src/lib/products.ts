import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

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

export const productsQuery = (category: ProductCategory) =>
  queryOptions({
    queryKey: ["products", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Product[];
    },
  });

export const allProductsQuery = () =>
  queryOptions({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Product[];
    },
  });

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data as unknown as Product;
    },
  });
