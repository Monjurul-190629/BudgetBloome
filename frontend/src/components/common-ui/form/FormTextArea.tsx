import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

interface props {
  label?: string;
  description?: string;
  form?: any;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const FormTextArea = ({
  labelIcon,
  name,
  description,
  form,
  label,
  placeholder,
  isRequired,
  disabled,
  className,
}: props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col gap-2 ${className}`}>
          <FormLabel className="flex items-center gap-1 lg:text-xs font-semibold">
            {labelIcon && labelIcon}
            <p className="flex items-start gap-1">
              <span>{label}</span>
              {isRequired && (
                <span className="text-destructive font-semibold">*</span>
              )}
            </p>
          </FormLabel>
          <FormControl>
            <Textarea
              className="h-32 bg-muted resize-y whitespace-pre-wrap "
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
