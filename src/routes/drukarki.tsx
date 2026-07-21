import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/drukarki")({
  head: () => ({
    meta: [
      { title: "Drukarki fiskalne – Foxnet" },
      { name: "description", content: "Niezawodne drukarki fiskalne dla sklepów, aptek i systemów POS." },
      { property: "og:title", content: "Drukarki fiskalne – Foxnet" },
      { property: "og:url", content: "/drukarki" },
    ],
    links: [{ rel: "canonical", href: "/drukarki" }],
  }),
  component: PrintersLayout,
});

function PrintersLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}