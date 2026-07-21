export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const handler = await import("./assets/server-CnfIKFS-.js");
    const mod = handler.default ?? handler;
    return mod.fetch(request, env, ctx);
  },
};