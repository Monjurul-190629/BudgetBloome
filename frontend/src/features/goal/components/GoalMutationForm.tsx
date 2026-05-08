"use client";

import { Form } from "@/components/ui/form";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, type Ref } from "react";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import FormInput from "@/components/common-ui/form/FormInput";
import IconButton from "@/components/common-ui/button/IconButton";
import { GOAL } from "../type/goal.types";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onSubmit: (data: GOAL) => void;
  isPending?: boolean;
  goal?: GOAL | null;
  formRef: Ref<UseFormReturn<GOAL> | null>;
}

const GoalMutationForm = ({ onSubmit, isPending, goal, formRef }: Props) => {
  const form = useForm<GOAL>({
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
    if (goal) {
      form.reset({
        name: goal.name ?? "",
        amount: goal.amount ?? 0,
        filled: goal.filled ?? false,
      });
    }
  }, [goal, form]);

  return (
    <Form {...form}>
      <form
        className="flex w-[300px] flex-col gap-4 md:w-[350px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="name"
          form={form}
          label="Goal Name"
          placeholder="Enter goal name"
          isRequired
        />

        <FormInput
          name="amount"
          form={form}
          label="Amount"
          placeholder="Enter goal amount"
          type="number"
          isRequired
        />

        {goal && (
          <Controller
            name="filled"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-start gap-3 rounded-lg border-2 border-gray-300 p-3">
                <Checkbox
                  className="mt-[2px] border-2 border-gray-400"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(Boolean(checked));
                  }}
                />

                <div>
                  <p className="text-sm font-medium">
                    Mark this goal as completed
                  </p>
                  <p className="text-xs">
                    Select this if you have already completed this goal.
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
            icon={!goal ? <PlusCircleIcon /> : <EditIcon />}
          >
            {!goal ? "Create Goal" : "Update"}
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default GoalMutationForm;
