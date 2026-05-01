"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import IconButton from "@/components/common-ui/button/IconButton";
import FormInput from "@/components/common-ui/form/FormInput";
import { Form } from "@/components/ui/form";

import {
  FormControl,
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
  SelectValue,
} from "@/components/ui/select";

import { createTransaction } from "../api/transaction.api";
import { transactionSchema } from "../schema/transaction.schema";
import useFetchData from "@/hooks/useFetchData";
import { getAllWallets } from "@/features/wallet/api/wallet.api";

type TransactionInput = z.input<typeof transactionSchema>;
type TransactionOutput = z.output<typeof transactionSchema>;

const CreateTransaction = () => {
  const queryClient = useQueryClient();

  const form = useForm<TransactionInput, any, TransactionOutput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      wallet: "",
      category_name: "",
      description: "",
      type: "expense",
      amount: 0,
      created_date: new Date(),
    },
  });

  const { data: walletsData } = useFetchData(["getWallets"], () =>
    getAllWallets(),
  );

  const wallets = walletsData?.data?.data ?? [];

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success(
          response?.data?.detail || "Transaction created successfully",
        );

        queryClient.invalidateQueries({ queryKey: ["getWallets"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalBalance"] });
        queryClient.invalidateQueries({ queryKey: ["getTransactionHistory"] });

        form.reset();
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.detail ||
          error.message ||
          "Failed to create transaction",
      );
    },
  });

  const onSubmit = (data: TransactionOutput) => {
    mutation.mutate({ data });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-[300px] md:w-[350px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Wallet <span className="text-red-500">*</span>
              </FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {wallets.map((wallet: any) => (
                    <SelectItem key={wallet._id} value={wallet._id}>
                      {wallet.wallet_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormInput
          name="category_name"
          form={form}
          label="Category Name"
          placeholder="Enter category name"
          isRequired
        />

        <FormInput
          name="description"
          form={form}
          label="Description"
          placeholder="Enter description"
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Transaction Type <span className="text-red-500">*</span>
              </FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
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
            isPending={mutation.isPending}
            className="w-[190px]"
            icon={<PlusCircleIcon size={18} />}
          >
            Create Transaction
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default CreateTransaction;
