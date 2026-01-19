import { fetchLoggedUser } from "@/entities/auth";
import { Routes } from "@/shared/lib/utils";
import { redirect } from "next/navigation";

export const guestRedirect = async () => {
    const user = await fetchLoggedUser();

    if (!user) {
        redirect(Routes.LINKVERTISE);
    }
};
