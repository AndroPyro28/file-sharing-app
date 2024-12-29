// controller/upload.ts

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { uploadDocumentSchema } from "@/schema/document";
import { uploadFile } from "@/lib/s3";
import { createId } from "@paralleldrive/cuid2";
import prisma from "@/lib/prisma";
import { verifyAuth } from "@hono/auth-js";
import { hc, InferRequestType, InferResponseType } from "hono/client";
import { authMiddleware, TAuthVariables } from "../middleware/auth";

const document = new Hono<{ Variables: TAuthVariables }>()
  .use("*", authMiddleware)
  .post(
    "/",
    verifyAuth(),
    zValidator("form", uploadDocumentSchema),
    async (c) => {
      const { emailTos, message, title, yourEmail } = c.req.valid("form");
      const { files } = c.req.valid("form");
      const user = c.get("user");
      const uploads = await Promise.all(
        files.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());

          // const arrayBuffer = await file.arrayBuffer();
          // const buffer = new Uint8Array(arrayBuffer);

          const imageId = createId();
          const mimetype = file.type;
          try {
            await uploadFile(buffer, imageId + "_" + file.name, mimetype);
          } catch (error) {
            console.error(`Error uploading file to S3: ${file.name}`, error);
            throw new Error("Failed to upload file to storage");
          }
          return {
            imageId,
            mimetype,
            size: file.size,
          };
        })
      );

      const userId = user?.id! as string;
      const id = createId();
      const document = await prisma.document.create({
        data: {
          email: yourEmail,
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

      if (!document || !document.id) {
        return c.json(
          {
            message: "Something went wrong",
          },
          {
            status: 400,
          }
        );
      }

      return c.json(document, {
        status: 201,
      });
    }
  )
  .get("/", verifyAuth(), async (c) => {
    const user = c.get("user");
    const userId = user?.id! as string;
    const documents = await prisma.document.findMany({
      where: {
        userId,
      },
    });

    return c.json(documents, {
      status: 200,
    });
  }
);

export type TDocumentRoutes = typeof document;

export const documentClient = hc<TDocumentRoutes>("/api/documents");

export type TCreateDocument = {
  response: InferResponseType<typeof documentClient.index.$post>;
  request: InferRequestType<typeof documentClient.index.$post>["form"];
};


export type TGetDocuments = {
  response: InferResponseType<typeof documentClient.index.$get>;
  request: InferRequestType<typeof documentClient.index.$post>
};


export default document;
