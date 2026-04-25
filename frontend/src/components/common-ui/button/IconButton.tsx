import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import React, { type Ref } from "react";

interface props {
  icon?: React.ReactNode;
  children: string;
  isReversed?: boolean;
  size?: "default" | "lg" | "sm" | "xs";
  type?: "button" | "reset" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isPending?: boolean;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary"
    | "gvprimary"
    | "gvsecondary";
  ref?: Ref<HTMLButtonElement>;
  hidden?: boolean;
}

const IconButton = ({
  icon,
  children,
  isReversed,
  size,
  variant,
  type = "button",
  className,
  onClick,
  disabled = false,
  isPending,
  onMouseOver,
  ref,
  hidden,
}: props) => {
  return (
    <Button
      hidden={hidden}
      ref={ref}
      onMouseOver={onMouseOver}
      disabled={isPending || disabled}
      onClick={onClick}
      type={type}
      size={size}
      className={`flex ${
        isReversed ? "flex-row-reverse" : " flex-row"
      } items-center cursor-pointer gap-2 ${className}`}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : icon}
      <span>{isPending ? "Loading..." : children}</span>
    </Button>
  );
};

export default IconButton;
