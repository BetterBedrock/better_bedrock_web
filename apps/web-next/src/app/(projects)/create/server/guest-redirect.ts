import { fetchLoggedUser } from "@/lib/auth";
import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export const guestRedirect = async () => {
    const user = await fetchLoggedUser();

    if (!user) {
        redirect(Routes.LINKVERTISE);
    }
};