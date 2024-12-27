// controller/upload.ts


import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { uploadSchema } from "@/schema/upload";
import { uploadFile } from "@/lib/s3";
import { createId } from "@paralleldrive/cuid2";
import prisma from "@/lib/prisma";
import { verifyAuth, getAuthUser, AuthUser,  } from "@hono/auth-js";
import { hc, InferRequestType, InferResponseType } from "hono/client";
import { authMiddleware, TAuthVariables, } from "../middleware/auth";



const upload = new Hono<{Variables: TAuthVariables}>()
.use("*", authMiddleware)
.post(
  "/",
  verifyAuth(),
  authMiddleware,
  zValidator("form", uploadSchema),
  async (c) => {
    const { emailTos, message, title, yourEmail } = c.req.valid("form");
    const { files } = c.req.valid("form");
    const user = c.get('user')
    const formData = await c.req.formData();
    console.log("FILES", formData.getAll('files'))
    const uploads = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const imageId = createId();
        const mimetype = file.type;
        try {
          await uploadFile(buffer, imageId+"_"+file.name, mimetype);
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

    if(!link || !link.id) {
      return c.json({
        message: "Something went wrong"
      }, {
        status: 400
      })
    }

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
