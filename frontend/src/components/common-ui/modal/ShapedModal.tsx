import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import React, { type ReactNode, useEffect, useRef } from "react";

interface props {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  btnStack?: ReactNode[];
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  isSuccess?: boolean;
  isPermitted: boolean;
}

const ShapedModal = ({
  trigger,
  title,
  description,
  children,
  btnStack,
  onClose,
  open,
  onOpenChange,
  className,
  isSuccess,
  isPermitted,
}: props) => {
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (isSuccess) {
      triggerButtonRef?.current?.click();
    }
  }, [isSuccess]);

  if (!isPermitted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-4 w-[max-content] max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {btnStack}
              <DialogClose
                asChild
                className=""
              >
                <button className={"sr-only"} ref={triggerButtonRef}>
                  Close Button
                </button>
              </DialogClose>
            </div>
          </div>
          <div className={`w-full py-2 ${className}`}>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShapedModal;
