// elysia/controllers/message.ts

import Elysia, { t } from "elysia";
import MessageService from "../services/message";

export const messageController = new Elysia({ prefix: "/message" })
  .decorate({
    messageService: new MessageService(),
  })
  .get("/", ({ messageService }) => messageService.get())
  .get(
    "/:message",
    ({ params, messageService }) => messageService.getById(params.message),
    {
      params: t.Object({ message: t.String() }),
    }
  )
  .post("/", ({ body, messageService}) => messageService.create(body as {count: 1}));
