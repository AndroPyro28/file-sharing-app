import React from "react";
import { motion } from "motion/react";
export const TransferView = () => {
  return (
    <motion.div
        className="h-full bg-white fixed z-40 right-0 top-0"
        initial={{
          width: 0,
        }}
        animate={{
          width: "60%",
          transition: {
            ease: "backIn",
          },
        }}
        exit={{
          // scale: 0,
          width: 0,
          transition: {
            ease: "circInOut",
          },
        }}
      >
      Transfer View
    </motion.div>
  );
};
