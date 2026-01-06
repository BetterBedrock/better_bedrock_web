"use client";

import { useAuth } from "@/providers/auth";
import { Routes } from "@/utils/routes";
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
}