import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { PageHero } from "@/components/PageShell";
import { ProductGrid } from "@/components/ProductGrid";
import { productsQuery } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/kasy-fiskalne/")({
  component: CashIndexPage,
});

function CashIndexPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("page.cash.title")} subtitle={t("page.cash.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-40" />}>
          <CashList />
        </Suspense>
      </section>
    </>
  );
}

function CashList() {
  const { data } = useSuspenseQuery(productsQuery("cash_register"));
  return <ProductGrid products={data} />;
}