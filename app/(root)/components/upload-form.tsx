"use client";
import React from "react";
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
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { TUploadSchema, uploadSchema } from "@/schema/upload";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, PlusCircle } from "lucide-react";
export const UploadForm = () => {
  const form = useForm<TUploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {},
  });

  function onSubmit(values: TUploadSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" min-w-[300px] w-[18%] bg-[#FFFFFF] flex flex-col p-5 rounded-xl space-y-8 z-5 fixed top-[25%] left-[10%]"
      >
        <div className="flex justify-evenly gap-x-5">
          <Button size={"icon"} type="button" className="flex flex-col -space-y-1  w-full bg-[#E0EAFF] hover:bg-[#C4D6FF]">
            <PlusCircle className=" text-white fill-blue-500 size-24" />
            {/* <span className="text-sm text-black">Add Files</span> */}
          </Button>
          <Button size={"icon"} type="button" className="flex flex-col -space-y-1  w-full bg-[#E0EAFF] hover:bg-[#C4D6FF]">
            <FolderPlus className=" text-white  fill-blue-500 size-24"/>
            {/* <span className="text-sm text-black">Add Folders</span> */}
          </Button>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>{/* display emails to send */}</div>

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
                    //   disabled={isLoading}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-t-0 border-x-0 hover:border-blue-400 transition-all"
                    type="email"
                    placeholder={`Enter recipient's email (e.g., example@domain.com)`}
                    {...field}
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
                    type="email"
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
