import { createStart } from "@tanstack/react-start";

const start = createStart();

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    return await start.fetch(request, env, ctx);
  },
};