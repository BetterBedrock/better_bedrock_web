"use client";

import { useAuth } from "@/_providers/auth";
import { Routes } from "@/utils/routes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRedirectLoggedUser = () => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push(`${Routes.PROFILE}/${user.name}`);
        }
    }, [user, router]);
}