// @ts-ignore

import prisma from "@/lib/prisma";

// @ts-nocheck
class MessageService {
  async create(body: {count: number}) {
    return {
      count: body.count
    }

  }

  async get () {
    const isError = true;
    if (isError) {
      return Response.json(
        {
          errors: ["1", "2"],
          message: "Invalid body parameters",
        },
        { status: 400 }
      );
    }
    return {
      message: "Helo world"
    };
  };

  async getById (messageId: string) {
    return messageId;
  };
}

export default MessageService;

// types
const messageService = new MessageService();
export type GetMessageType = Awaited<ReturnType<typeof messageService.get>>;
export type CreateMessageType = Awaited<ReturnType<typeof messageService.create>>;
export type GetMessageByIdType = Awaited<
  ReturnType<typeof messageService.getById>
>;
