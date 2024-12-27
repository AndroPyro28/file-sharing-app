import { z } from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10mb

export const FileSchema = z
  .instanceof(File, {
    message: "File is required",
  })
  .refine((file) => file.size > 0, "File should not be empty")
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}mb`
  );

export const uploadSchema = z.object({
  emailTos: z
    .array(
      z.string().email().min(1, {
        message: "Minimum of 1 email",
      })
    )
    .min(0),
  yourEmail: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, { message: "Title is required" }),
  message: z.string().min(2, { message: "Message is required" }),
  // files: z.any()
  files: z.array(FileSchema).min(1, "File required"),
});

export type TUploadSchema = z.infer<typeof uploadSchema>;
