import { useEffect } from "react";

export const useImagePreload = (srcs: string[]) => {
    useEffect(() => {
        const urls = srcs;

        urls.forEach((url) => {
            const img = new window.Image();
            img.src = url;
        });
    }, [srcs]);
}