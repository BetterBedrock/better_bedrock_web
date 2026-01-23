"use client";

import { useAuth } from "../../../../app/providers/auth";
import { Routes } from "@/shared/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRedirectLoggedUser = () => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push(`${Routes.PROFILE}/${user.name}/projects`);
        }
    }, [user, router]);
};
