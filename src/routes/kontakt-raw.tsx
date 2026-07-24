import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt-raw")({
  component: () => (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Kontakt RAW TEST</h1>
      <p>If you can see this and interact, the issue is specific to /kontakt route config.</p>
    </div>
  ),
});