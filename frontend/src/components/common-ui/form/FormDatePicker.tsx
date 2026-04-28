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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/utils";
import { ANY } from "@/shared/common.types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface props {
  label?: string;
  description?: string;
  form: ANY;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
  mode?: "start" | "end";
}

const FormDatePicker = ({
  name,
  form,
  labelIcon,
  label,
  isRequired,
  description,
  placeholder,
  mode,
}: props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
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
                  variant={"outline"}
                  className={cn(
                    "text-left font-normal w-full",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (!date) {
                    field.onChange(null);
                    return;
                  }

                  const isEnd = mode === "end";

                  const normalized = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    isEnd ? 23 : 0,
                    isEnd ? 59 : 0,
                    isEnd ? 59 : 0,
                  );

                  field.onChange(normalized);
                }}
                captionLayout="dropdown"
                className="rounded-lg border shadow-sm"
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDatePicker;
