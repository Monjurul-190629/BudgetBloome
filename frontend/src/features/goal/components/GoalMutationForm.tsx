"use client";

import { Form } from "@/components/ui/form";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, type Ref } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import FormInput from "@/components/common-ui/form/FormInput";
import IconButton from "@/components/common-ui/button/IconButton";
import { GOAL } from "../type/goal.types";

interface Props {
  onSubmit: (data: GOAL) => void;
  isPending?: boolean;
  goal?: GOAL | null;
  formRef: Ref<UseFormReturn<GOAL> | null>;
}

const GoalMutationForm = ({
  onSubmit,
  isPending,
  goal,
  formRef,
}: Props) => {
  const form = useForm<GOAL>({
    defaultValues: {
      name: "",
      amount: 0,
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
      });
    }
  }, [goal, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-[300px] md:w-[350px]"
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
          placeholder="Enter amount"
          type="number"
          isRequired
        />

        <div className="flex justify-end">
          <IconButton
            type="submit"
            isPending={isPending}
            className="w-[160px]"
            icon={!goal ? <PlusCircleIcon /> : <EditIcon />}
          >
            {!goal ? "Create Wallet" : "Update"}
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default GoalMutationForm;
