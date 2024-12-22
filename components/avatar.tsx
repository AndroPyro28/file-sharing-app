import React from "react";
import {
  Avatar as AvatarComp,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  className?: string;
}
const Avatar: React.FC<AvatarProps> = ({ src, className }) => {
  return (
    <AvatarComp>
      <AvatarImage src={src} className={cn("object-cover", className)} />
      <AvatarFallback>User</AvatarFallback>
    </AvatarComp>
  );
};

export default Avatar;
