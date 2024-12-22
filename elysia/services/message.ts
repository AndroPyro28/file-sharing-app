class MessageService {
  async create(body: any) {}

  get = async () => {
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

  getById = async (messageId: string) => {
    return messageId;
  };
}

export default MessageService;

// types
const messageService = new MessageService();
export type GetMessageType = Awaited<ReturnType<typeof messageService.get>>;
export type GetMessageByIdType = Awaited<
  ReturnType<typeof messageService.getById>
>;
