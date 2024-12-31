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
import { ContactRound, FolderSync, Proportions } from "lucide-react";
import { activeType, useActiveView } from "@/hooks/use-active-view";
export const Navbar = () => {

  const {onOpen} = useActiveView()

  const onClickView = (view: activeType) => onOpen(view);
  
  return (
    <div className="flex justify-between fixed top-0 left-0 w-full h-20 px-5 z-50">
      <div className="flex items-center">
        <img src="logo.png" className="h-full object-contain" />
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex justify-evenly bg-white space-x-5 items-center relative shadow-md py-[1.1rem] px-5 rounded-md text-sm">
            <div className="cursor-pointer flex items-center" onClick={() => onClickView('transfers')}>
               <FolderSync className="size-4 mr-2" /> Transfers
            </div>

            <div className="cursor-pointer flex items-center" onClick={() => onClickView('contacts')}>
               <ContactRound  className="size-4 mr-2" /> Contacts
            </div>

            <div className="cursor-pointer flex items-center" onClick={() => onClickView('shared-with-me')}>
               <Proportions  className="size-4 mr-2" /> Brands
            </div>
        </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className=" flex justify-evenly bg-white space-x-2 items-center relative shadow-md py-2 px-5 rounded-md text-sm">
              <span className="truncate w-[195px]">
                Menandroeugenio1028@gmail.com
              </span>
              <Avatar src="avatar.jpg" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Free Trial</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};
