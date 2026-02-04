"use client";

import { useEffect } from "react";

export const useRedirectToDiscord = () => {
    useEffect(() => {
        window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer");
    }, []);
};