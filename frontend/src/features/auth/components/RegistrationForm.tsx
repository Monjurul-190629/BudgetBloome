"use client";

import { useForm } from "react-hook-form";
import { REGISTRATION } from "../types/auth.types";
import { registrationSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common-ui/form/FormInput";

const RegistrationForm = () => {
  const form = useForm<REGISTRATION>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      address: "",
      phone: "",
    },
  });
  return (
    <div>
      <div></div>
      <div>
        <Form {...form}>
          <FormInput
            name="name"
            form={form}
            label="Full Name"
            placeholder="Enter your full name"
          />
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
