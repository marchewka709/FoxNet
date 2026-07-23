import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Foxnet Wrocław" },
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
      <form style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Imię i nazwisko</label>
          <input type="text" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input type="email" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Wiadomość</label>
          <textarea rows={4} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 8 }}></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 24px', borderRadius: 999, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}>Wyślij</button>
      </form>
    </div>
  );
}