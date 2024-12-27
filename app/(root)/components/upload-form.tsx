"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TUploadSchema, uploadSchema } from "@/schema/upload";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, PlusCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiClient } from "@/hooks/useTanstackQuery";

export const UploadForm = () => {
  const form = useForm<TUploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      emailTos: [],
      files: [],
      message: "",
      title: "",
      yourEmail: "",
    },
  });
  const [value, setValue] = useState("");

  const clearInput = () => {
    setValue("");
  };

  async function onSubmit(values: TUploadSchema) {
    const formData = new FormData();
    formData.append("yourEmail", values.yourEmail);
    formData.append("title", values.title);
    formData.append("message", values.message);
  
    // Ensure 'files' is always treated as an array, even if there's only one file
    Array.from(values.files).forEach((file) => {
      formData.append("files", file); // Same key for all files
    });
  
    // Ensure 'emailTos' is always treated as an array, even if there's only one email
    // If 'emailTos' is not an array, make it an array
    const emailTosArray = Array.isArray(values.emailTos) ? values.emailTos : [values.emailTos];
    
    emailTosArray.forEach((email) => {
      formData.append("emailTos", email); // Append each email, treating it as an array
    });
  
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if(response.status === 201) {
      alert("Files Successfull uploaded")
    }
    else {
      alert("Something went wrong")
    }
    // This assumes the API response contains `{ link: string }`
  }

  const onClickTriggerInput = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" min-w-[300px] w-[18%] bg-[#FFFFFF] flex flex-col p-5 rounded-xl space-y-8 z-5 fixed top-[25%] left-[10%]"
      >

        <div className="flex flex-col items-center w-full gap-y-3">
        <div className="flex justify-evenly gap-x-5 w-full">
          <input
            type="file"
            id="file"
            className="hidden"
            multiple
            ref={fileInputRef}
            onChange={async (e) => {
              const files = e.target.files;

              if (files && files?.length > 0) {
                if (e.target.files) {
                  let filesContainer = [];

                  for (let index = 0; index < files.length; index++) {
                    filesContainer.push(files[index] as File);
                  }

                  form.setValue("files", filesContainer);
                }
              }
            }}
          />

          <Button
            size={"icon"}
            type="button"
            className="flex flex-col -space-y-1  w-full bg-[#E0EAFF] hover:bg-[#C4D6FF]"
            onClick={onClickTriggerInput}
          >
            <PlusCircle className=" text-white fill-blue-500 size-24" />
            {/* <span className="text-sm text-black">Add Files</span> */}
          </Button>

          <Button
            size={"icon"}
            type="button"
            className="flex flex-col -space-y-1  w-full bg-[#E0EAFF] hover:bg-[#C4D6FF]"
            onClick={onClickTriggerInput}
          >
            <FolderPlus className=" text-white  fill-blue-500 size-24" />
          </Button>
        </div>
        <span className="text-red-500 text-sm">
            {form.formState.errors.files?.message}
          </span>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>
            {form.watch("emailTos").map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="text-sm text-gray-800">{email}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedEmails = form
                      .getValues("emailTos")
                      .filter((_, i) => i !== index);
                    form.setValue("emailTos", updatedEmails);
                  }}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="emailTos"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm font-medium capitalize">
                  Email to
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        const emailRegex =
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        const validateEmail = (email: string): boolean =>
                          emailRegex.test(email);
                        if (validateEmail(target.value)) {
                          const emails = form.getValues("emailTos");
                          emails.push(target.value);
                          form.setValue("emailTos", emails);
                          clearInput();
                        }
                      }
                    }}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-t-0 border-x-0 hover:border-blue-400 transition-all"
                    placeholder={`Enter recipient's email (e.g., example@domain.com)`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yourEmail"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm font-medium capitalize">
                  Your Email
                </FormLabel>
                <FormControl>
                  <Input
                    //   disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-l-0 border-t-0 border-x-0 hover:border-blue-400 transition-allblue-400 transition-all"
                    type="email"
                    placeholder={`Enter your email address`}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm font-medium capitalize">
                  title
                </FormLabel>
                <FormControl>
                  <Input
                    //   disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-l-0 border-t-0 border-x-0 hover:border-blue-400 transition-all"
                    placeholder={`Add a title (e.g., Project Files)`}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium capitalize">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    //   disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-l-0 border-t-0 border-x-0 resize-none hover:border-blue-400 transition-all"
                    placeholder="Type your message here."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="font-semibold">
          Transfer Files
        </Button>
      </form>
    </Form>
  );
};

export default UploadForm;
