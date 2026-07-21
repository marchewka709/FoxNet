export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const handler = await import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response },
    );
    return await handler.fetch(request, env, ctx);
  },
};