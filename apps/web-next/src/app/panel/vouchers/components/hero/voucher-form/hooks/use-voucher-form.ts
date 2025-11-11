"use client";

import { VoucherDto, CreateVoucher } from "@/_lib/api";
import { INPUT_FORMAT } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  id: z.string().optional(),
  checkoutId: z.string().nullable().optional(),
  email: z.string().email(),
  code: z.string(),
  expiresAt: z.string(),
  createdAt: z.string().optional(),
  maxDownloads: z.coerce.number().min(0),
  downloadCount: z.coerce.number().min(0),
  betterBedrockContentOnly: z.boolean().default(false),
  blocked: z.boolean().default(false),
});

interface useVoucherFormProps {
  voucher?: VoucherDto;
  onSubmit: (voucher: CreateVoucher) => void;
}

export const useVoucherForm = ({ voucher, onSubmit }: useVoucherFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: voucher,
    resolver: zodResolver(schema),
  });

  const onClickSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (voucher) {
      reset({
        ...voucher,
        expiresAt: dayjs(voucher.expiresAt).format(INPUT_FORMAT),
      });
    } else {
      reset({});
    }
  }, [voucher, reset]);

  const fields: Array<{
    name: keyof VoucherDto;
    label: string;
    type: string;
    placeholder: string;
  }> = [
      { name: "email", label: "Email", type: "email", placeholder: "Email" },
      { name: "code", label: "Code", type: "text", placeholder: "Code" },
      { name: "expiresAt", label: "Expires At", type: "datetime-local", placeholder: "Expires at" },
      { name: "maxDownloads", label: "Max downloads", type: "number", placeholder: "Max downloads" },
      {
        name: "downloadCount",
        label: "Downloads count",
        type: "number",
        placeholder: "Download count",
      },
      {
        name: "betterBedrockContentOnly",
        label: "Better bedrock content only",
        type: "checkbox",
        placeholder: "Better bedrock content only",
      },
      { name: "blocked", label: "Blocked", type: "checkbox", placeholder: "Blocked" },
    ];

  return { onClickSubmit, fields, control, errors };
};
