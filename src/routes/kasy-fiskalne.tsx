import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/kasy-fiskalne")({
  head: () => ({
    meta: [
      { title: "Kasy fiskalne online – Foxnet" },
      { name: "description", content: "Nowoczesne kasy fiskalne online dla handlu, gastronomii i usług. Sprawdź naszą ofertę." },
      { property: "og:title", content: "Kasy fiskalne online – Foxnet" },
      { property: "og:url", content: "/kasy-fiskalne" },
    ],
    links: [{ rel: "canonical", href: "/kasy-fiskalne" }],
  }),
  component: CashLayout,
});

function CashLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}