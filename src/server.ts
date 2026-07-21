// Vercel serverless function entry
// Proxies to the default TanStack Start server entry
export default async function handler(request, env, ctx) {
  const mod = await import("@tanstack/react-start/server-entry");
  const server = mod.default ?? mod;
  if (typeof server.fetch === "function") {
    return server.fetch(request, env, ctx);
  }
  const entry = await import("@tanstack/react-start/dist/default-entry/esm/server.js");
  const handler = entry.default ?? entry;
  if (typeof handler.fetch === "function") {
    return handler.fetch(request, env, ctx);
  }
  return new Response("Not Found", { status: 404 });
}