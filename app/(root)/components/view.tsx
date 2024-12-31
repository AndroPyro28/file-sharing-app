"use client";
import { useActiveView } from "@/hooks/use-active-view";
import React from "react";
import { TransferView } from "./transfer-view";
import { AnimatePresence, motion } from "motion/react";
import { ContactView } from "./contact-view";
import { SharedWithMe } from "./shared-with-me";

export const View = () => {
  const { type } = useActiveView();

  const views = {
    "": null,
    "transfers": <TransferView />,
    "contacts": <ContactView />,
    "shared-with-me": <SharedWithMe />,
  };

  console.log(views)
  return (
    <AnimatePresence mode="wait">
        {views[type ?? ""]}
    </AnimatePresence>
  );
};
