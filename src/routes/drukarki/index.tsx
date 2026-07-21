import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { PageHero } from "@/components/PageShell";
import { ProductGrid } from "@/components/ProductGrid";
import { productsQuery } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/drukarki/")({
  component: PrintersIndexPage,
});

function PrintersIndexPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("page.printers.title")} subtitle={t("page.printers.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-40" />}>
          <PList />
        </Suspense>
      </section>
    </>
  );
}

function PList() {
  const { data } = useSuspenseQuery(productsQuery("printer"));
  return <ProductGrid products={data} />;
}