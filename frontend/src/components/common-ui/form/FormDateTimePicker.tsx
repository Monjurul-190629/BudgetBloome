import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/utils";
import { ANY } from "@/shared/common.types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  label?: string;
  description?: string;
  form: UseFormReturn<ANY>;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
}

const toDate = (value: unknown): Date | null => {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
};

const toTimeString = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const FormDateTimePicker = ({
  labelIcon,
  name,
  description,
  form,
  label,
  placeholder,
  isRequired,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const current = toDate(field.value);

        const handleDateSelect = (selected: Date | undefined) => {
          if (!selected) {
            field.onChange(null);
            return;
          }
          const next = new Date(selected);
          if (current) {
            next.setHours(current.getHours(), current.getMinutes(), 0, 0);
          } else {
            next.setHours(0, 0, 0, 0);
          }
          field.onChange(next);
        };

        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const [h, m] = e.target.value.split(":").map(Number);
          const base = current ? new Date(current) : new Date();
          base.setHours(h ?? 0, m ?? 0, 0, 0);
          field.onChange(new Date(base));
        };

        return (
          <FormItem className="flex flex-col">
            <FormLabel>
              {labelIcon && labelIcon}
              <p className="flex justify-start items-start gap-1">
                <span className="text-xs">{label}</span>
                {isRequired && (
                  <span className="text-destructive font-semibold">*</span>
                )}
              </p>
            </FormLabel>
            <Popover>
              <PopoverTrigger className="w-full">
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "text-left font-normal w-full",
                      !current && "text-muted-foreground",
                    )}
                  >
                    {current ? (
                      format(current, "PPP p")
                    ) : (
                      <span>{placeholder || "Pick a date and time"}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 space-y-3" align="start">
                <Calendar
                  mode="single"
                  selected={current ?? undefined}
                  onSelect={handleDateSelect}
                  captionLayout="dropdown"
                  className="rounded-lg border shadow-sm"
                />
                <div className="flex items-center gap-2 border-t pt-3">
                  <span className="text-xs text-muted-foreground shrink-0">
                    Time
                  </span>
                  <Input
                    type="time"
                    className="h-8 text-sm"
                    value={current ? toTimeString(current) : ""}
                    onChange={handleTimeChange}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormDateTimePicker;
