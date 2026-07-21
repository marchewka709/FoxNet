import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/terminale-platnicze")({
  head: () => ({
    meta: [
      { title: "Terminale płatnicze – Foxnet" },
      { name: "description", content: "Nowoczesne terminale płatnicze dla sklepów, restauracji i e-commerce." },
      { property: "og:title", content: "Terminale płatnicze – Foxnet" },
      { property: "og:url", content: "/terminale-platnicze" },
    ],
    links: [{ rel: "canonical", href: "/terminale-platnicze" }],
  }),
  component: TerminalsLayout,
});

function TerminalsLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}