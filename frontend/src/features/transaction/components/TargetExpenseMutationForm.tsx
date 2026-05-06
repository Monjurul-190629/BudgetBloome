"use client";

import { Form } from "@/components/ui/form";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, type Ref } from "react";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import FormInput from "@/components/common-ui/form/FormInput";
import IconButton from "@/components/common-ui/button/IconButton";
import { TARGETED_EXPENSE } from "../type/target-expense.types";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onSubmit: (data: TARGETED_EXPENSE) => void;
  isPending?: boolean;
  target?: TARGETED_EXPENSE | null;
  formRef: Ref<UseFormReturn<TARGETED_EXPENSE> | null>;
}

const TargetedExpenseMutationForm = ({
  onSubmit,
  isPending,
  target,
  formRef,
}: Props) => {
  const form = useForm<TARGETED_EXPENSE>({
    defaultValues: {
      name: "",
      amount: 0,
      filled: false,
    },
  });

  useEffect(() => {
    if (formRef && "current" in formRef) {
      formRef.current = form;
    }
  }, [form, formRef]);

  useEffect(() => {
    if (target) {
      form.reset({
        name: target.name ?? "",
        amount: target.amount ?? 0,
        filled: target.filled ?? false,
      });
    }
  }, [target, form]);

  return (
    <Form {...form}>
      <form
        className="flex w-[300px] flex-col gap-4 md:w-[350px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="name"
          form={form}
          label="Target Name"
          placeholder="Enter target name"
          isRequired
        />

        <FormInput
          name="amount"
          form={form}
          label="Amount"
          placeholder="Enter target amount"
          type="number"
          isRequired
        />

        {target && (
          <Controller
            name="filled"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-start gap-3 rounded-lg border-2 border-gray-300 p-3">
                <Checkbox
                  className="border-2 border-gray-400 mt-[2px]"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(Boolean(checked));
                  }}
                />

                <div className="">
                  <p className="text-sm font-medium ">
                    Mark this expense target as filled
                  </p>
                  <p className="text-xs ">
                    Select this if you have already completed this expense.
                  </p>
                </div>
              </div>
            )}
          />
        )}

        <div className="flex justify-end">
          <IconButton
            type="submit"
            isPending={isPending}
            className="w-[180px]"
            icon={!target ? <PlusCircleIcon /> : <EditIcon />}
          >
            {!target ? "Create Target" : "Update"}
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default TargetedExpenseMutationForm;
