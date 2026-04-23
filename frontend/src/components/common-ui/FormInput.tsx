import { ANY } from "@/features/common/common.types";
import { Input } from "../ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface props {
  label?: string;
  description?: string;
  form?: ANY;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemClassName?: string;
  avoidError?: boolean;
  fieldClassName?: string;
  errorPosition?: "placeholder" | "label" | "default";
  onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  labelTextSize?: string;
}

const FormInput = ({
  labelIcon,
  name,
  description,
  form,
  label,
  placeholder,
  type = "text",
  isRequired,
  onValueChange,
  itemClassName,
  avoidError,
  fieldClassName,
  errorPosition = "default",
  onInputBlur,
  disabled,
  labelTextSize = "lg:text-sm",
}: props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      // ↓↓↓ The render function gives us access to form field props
      render={({
        field: { onChange, onBlur, value, ref, name, ...restField },
      }) => (
        <FormItem className={`flex flex-col gap-0 ${itemClassName}`}>
          <div className="flex flex-col gap-2">
            {label && (
              <div className="flex items-center justify-start gap-1">
                <FormLabel
                  className={`flex items-center gap-1 ${labelTextSize} font-semibold shrink-0`}
                >
                  {labelIcon && labelIcon}
                  <p className="flex items-start gap-1">
                    <span>{label}</span>
                    {isRequired && (
                      <span className="text-destructive font-semibold">*</span>
                    )}
                  </p>
                </FormLabel>
                {/* Error message displayed beside label if set to label mode */}
                {!avoidError && errorPosition === "label" && (
                  <FormMessage className="lg:text-xs font-semibold shrink-0" />
                )}
              </div>
            )}

            <FormControl>
              <Input
                placeholder={placeholder}
                onChange={(e) => {
                  onChange(e); // Update react-hook-form internal state
                  onValueChange?.(e); // Optional custom change handler
                }}
                onBlur={(e) => {
                  onInputBlur?.(e);
                  onBlur(); // Update touched state in react-hook-form
                }}
                // This is where your defaultValue will appear from `useForm`!
                value={value}
                name={name}
                ref={ref}
                disabled={disabled}
                type={type}
                className={`text-[8px] bg-white ${fieldClassName}`}
                {...restField} // Includes important props like `onFocus`, etc.
              />
            </FormControl>
          </div>

          {/* Error message below the input if set to default mode */}
          {!avoidError && errorPosition === "default" && (
            <FormMessage className="text-xs" />
          )}

          {description && (
            <FormDescription className="text-wrap text-xs text-green-700">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
