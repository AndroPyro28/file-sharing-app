"use client";
import Avatar from "@/components/avatar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const Navbar = () => {
  return (
    <div className="flex justify-between fixed top-0 left-0 w-full h-20 px-5 z-5">
      <div className="flex items-center">
        <img src="logo.png" className="h-full object-contain" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center">
            <div className=" flex justify-evenly bg-white space-x-2 items-center relative shadow-md py-2 px-5 rounded-md text-sm">
              <span className="truncate w-[195px]">
                Menandroeugenio1028@gmail.com
              </span>
              <Avatar src="avatar.jpg" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Free Trial</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
