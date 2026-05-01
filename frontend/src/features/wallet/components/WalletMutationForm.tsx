"use client";

import { Form } from "@/components/ui/form";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, type Ref } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { WALLET } from "../type/wallet.types";
import FormInput from "@/components/common-ui/form/FormInput";
import IconButton from "@/components/common-ui/button/IconButton";

interface Props {
  onSubmit: (data: WALLET) => void;
  isPending?: boolean;
  wallet?: WALLET | null;
  formRef: Ref<UseFormReturn<WALLET> | null>;
}

const WalletMutationForm = ({
  onSubmit,
  isPending,
  wallet,
  formRef,
}: Props) => {
  const form = useForm<WALLET>({
    defaultValues: {
      wallet_name: "",
      amount: 0,
    },
  });

  useEffect(() => {
    if (formRef && "current" in formRef) {
      formRef.current = form;
    }
  }, [form, formRef]);

  useEffect(() => {
    if (wallet) {
      form.reset({
        wallet_name: wallet.wallet_name ?? "",
        amount: wallet.amount ?? 0,
      });
    }
  }, [wallet, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-[350px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="wallet_name"
          form={form}
          label="Wallet Name"
          placeholder="Enter wallet name"
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
            icon={!wallet ? <PlusCircleIcon /> : <EditIcon />}
          >
            {!wallet ? "Create Wallet" : "Update"}
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default WalletMutationForm;
