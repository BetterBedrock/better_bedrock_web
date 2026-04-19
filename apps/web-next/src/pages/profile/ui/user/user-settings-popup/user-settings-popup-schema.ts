import { MonetizationType } from "@/shared/lib/openapi";
import { z } from "zod";

export const userSettingsPopupSchema = z.object({
    name: z.string().trim(),
    bio: z.string().trim(),
    monetizationType: z.enum(MonetizationType).nullable(),
    linkvertiseId: z.string().trim().nullable(),
    linkvertiseSecret: z.string().trim().nullable(),
    lootlabsLinkId: z.string().trim().nullable(),
    lootlabsSecret: z.string().trim().nullable(),
    banned: z.boolean(),
});

export type UserSettingsPopupSchema = z.infer<typeof userSettingsPopupSchema>;