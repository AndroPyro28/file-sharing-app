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
    .union([  // Allow both single string and array of strings
      z.string().email().min(1, { message: "Minimum of 1 email" }),
      z.array(z.string().email())
    ])
    .transform((val) => {
      // If it's a single email, wrap it in an array
      return Array.isArray(val) ? val : [val];
    })
    ,  // Ensure at least 1 email is provided
  yourEmail: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, { message: "Title is required" }),
  message: z.string().min(2, { message: "Message is required" }),
  files: z
    .union([z.array(FileSchema).min(1), FileSchema])  // Allow both single file and array of files
    .transform((val) => {
      // If it's a single file, wrap it in an array
      return Array.isArray(val) ? val : [val];
    })
    ,
});

export type TUploadSchema = z.infer<typeof uploadSchema>;
