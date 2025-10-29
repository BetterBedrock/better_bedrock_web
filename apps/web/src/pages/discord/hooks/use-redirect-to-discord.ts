import { useEffect } from "react";

export const useRedirectToDiscord = () => {
    useEffect(() => {
        window.location.href = "https://discord.gg/ZGK5WYXnEY";
    }, []);
};