import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ANY } from "@/features/common/common.types";
import { Capitalize } from "@/lib/handyFunction";
import type { UseFormReturn } from "react-hook-form";

interface props {
  label?: string;
  description?: string;
  form?: UseFormReturn<ANY>;
  name: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
  options: string[];
  disabled?: boolean;
}

const FormStaticSelect = ({
  labelIcon,
  name,
  description,
  form,
  label,
  placeholder,
  options,
  onSelect,
  isRequired,
  disabled,
}: props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2 w-full overflow-hidden">
          <FormLabel className="flex items-center gap-1 lg:text-xs font-semibold">
            {labelIcon && labelIcon}
            <p className="flex items-start gap-1">
              <span>{label}</span>
              {isRequired && (
                <span className="text-destructive font-semibold">*</span>
              )}
            </p>
          </FormLabel>
          <Select
            disabled={disabled}
            value={field?.value}
            onValueChange={(value) => {
              form?.setValue(name, value);
              onSelect?.(value);
            }}
          >
            <FormControl>
              <SelectTrigger className="w-full bg-muted-foreground/15 hover:bg-muted cursor-pointer">
                {form?.watch(name) ? (
                  Capitalize(form?.watch(name))
                ) : (
                  <span className="font-medium text-muted-foreground">
                    {placeholder}
                  </span>
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem value={option} key={option}>
                  {Capitalize(option.replace(/_/g, " "))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default FormStaticSelect;
