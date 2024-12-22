// elysia/controllers/message.ts

import Elysia, { t } from "elysia";
import RegistrationService from "../services/message";

export const messageController = new Elysia({ prefix: "/message" })
  .decorate({
    messageService: new RegistrationService(),
  })
  .get("/", ({ messageService }) => messageService.get())
  .get("/:message", ({ params }) => `Your Message: ${params.message} 🦊`, {
    params: t.Object({ message: t.String() }),
  })
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });
