import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

interface Props {
  trigger: React.ReactNode;
  title: string;
  description?: string | ReactNode;
  actionButton?: React.ReactNode;
}

export function AlertModal({
  actionButton,
  title,
  trigger,
  description,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent
        className={`
          w-[92vw] max-w-[380px] rounded-2xl border-0 p-0 shadow-2xl
          bg-white overflow-hidden
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4
          duration-200
        `}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600" />

        <div className="p-6">
          <AlertDialogHeader className="space-y-2 text-left">
            {/* Icon + Title */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-md bg-green-600 border border-red-100 flex items-center justify-center">
                <svg
                  className="w-4.5 h-4.5 text-red-100"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </div>

              <div className="space-y-1">
                <AlertDialogTitle className="text-[15px] font-semibold leading-snug text-zinc-900 tracking-tight">
                  {title}
                </AlertDialogTitle>
                {description && (
                  <AlertDialogDescription className="text-[13px] text-zinc-900 leading-relaxed">
                    {description}
                  </AlertDialogDescription>
                )}
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-1 flex flex-row justify-end gap-2.5">
            <AlertDialogCancel
              className={`
                h-9 px-4 text-[13px] font-medium rounded-md
                border border-zinc-200 bg-zinc-300 text-zinc-600 hover:text-zinc-200
                hover:bg-zinc-600 hover:border-zinc-300
                transition-all duration-150
                focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-1
              `}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              asChild
              className={`
                h-9 px-4 text-[13px] font-medium rounded-xl
                bg-gradient-to-b from-red-500 to-red-600 text-white
                shadow-sm shadow-red-200
                hover:from-red-600 hover:to-red-700
                hover:shadow-md hover:shadow-red-200
                active:scale-[0.98]
                transition-all duration-150
                focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1
              `}
            >
              {actionButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
