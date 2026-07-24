import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/kontakt")({
  component: () => {
    const [sent, setSent] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Kontakt</h1>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Imię i nazwisko</label>
            <input 
              type="text" 
              style={{ width: '100%', maxWidth: 400, padding: 10, border: '2px solid #ddd', borderRadius: 8, fontSize: 16 }}
              placeholder="Wpisz swoje imię"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
            <input 
              type="email" 
              style={{ width: '100%', maxWidth: 400, padding: 10, border: '2px solid #ddd', borderRadius: 8, fontSize: 16 }}
              placeholder="twoj@email.com"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Wiadomość</label>
            <textarea 
              rows={5}
              style={{ width: '100%', maxWidth: 400, padding: 10, border: '2px solid #ddd', borderRadius: 8, fontSize: 16, resize: 'vertical' }}
              placeholder="Twoja wiadomość..."
            />
          </div>
          <button 
            type="submit"
            style={{ padding: '12px 32px', borderRadius: 999, background: '#2563eb', color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            Wyślij wiadomość
          </button>
          {sent && <p style={{ marginTop: 12, color: 'green' }}>Wysłano!</p>}
        </form>
      </div>
    );
  },
});