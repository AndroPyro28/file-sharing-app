import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { uploadSchema } from "@/schema/upload";
import { uploadFile } from "@/lib/s3";
import { createId } from "@paralleldrive/cuid2";
import prisma from "@/lib/prisma";
import { verifyAuth } from "@hono/auth-js";
import { hc, InferRequestType, InferResponseType } from "hono/client";

const upload = new Hono()

.post(
  "/",
  verifyAuth(),
  zValidator("form", uploadSchema),
  async (c) => {
    const { emailTos, message, title, yourEmail } = c.req.valid("form");
    const { files } = c.req.valid("form");
    const user = c.get("authUser");

    const uploads = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const imageId = createId();
        const mimetype = file.type;
        await uploadFile(buffer + "", imageId, mimetype);

        return {
          imageId,
          mimetype,
          size: file.size,
        };
      })
    );

    const userId = user.user?.id! as string;
    const id = createId();
    const link = await prisma.links.create({
      data: {
        id: id,
        email: yourEmail,
        url: `/uploaded/${id}`,
        userId,
        isActive: true,
        files: {
          createMany: {
            data: uploads.map((img) => ({
              imageId: img.imageId,
              filename: img.imageId,
              filetype: img.mimetype,
              userId,
              size: img.size,
            })),
          },
        },
        receivers: {
          createMany: {
            data: emailTos.map((email) => ({ email })),
          },
        },
      },
    });

    return c.json(
      {
        link: link.url,
      },
      {
        status: 201,
      }
    );
  }
);

export type TUploadRoutes = typeof upload;

export const uploadClient = hc<TUploadRoutes>("/api/uploads");

export type TCreateLink = {
  response: InferResponseType<typeof uploadClient.index.$post>;
  request: InferRequestType<typeof uploadClient.index.$post>["form"];
};

export default upload;
