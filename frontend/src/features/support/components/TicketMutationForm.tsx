"use client";

import { Form } from "@/components/ui/form";
import { PlusCircleIcon } from "lucide-react";
import { type Ref } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";

import FormInput from "@/components/common-ui/form/FormInput";
import FormTextArea from "@/components/common-ui/form/FormTextArea";
import IconButton from "@/components/common-ui/button/IconButton";
import { TICKET } from "../types/ticket.types";

interface Props {
  onSubmit: (data: TICKET) => void;
  isPending?: boolean;
  formRef: Ref<UseFormReturn<TICKET> | null>;
}

const TicketMutationForm = ({ onSubmit, isPending }: Props) => {
  const form = useForm<TICKET>({
    defaultValues: {
      type: "question",
      subject: "",
      message: "",
      status: "open",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-[300px] md:w-[350px] flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="subject"
          form={form}
          label="Subject"
          placeholder="Enter ticket subject"
          isRequired
        />

        <FormTextArea
          name="message"
          form={form}
          label="Message"
          placeholder="Describe your issue"
          className="w-full min-h-[120px]"
          isRequired
        />

        <div className="flex justify-end">
          <IconButton
            type="submit"
            isPending={isPending}
            className="w-[180px]"
            icon={<PlusCircleIcon />}
          >
            Create Ticket
          </IconButton>
        </div>
      </form>
    </Form>
  );
};

export default TicketMutationForm;
