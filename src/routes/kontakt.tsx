import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Foxnet" },
      { name: "description", content: "Kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Kontakt</h1>
      <p>Testowa strona kontaktowa</p>
    </div>
  );
}