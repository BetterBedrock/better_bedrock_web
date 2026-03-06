"use client";

import styles from "../ui/project-download/project-download.module.scss";
import { useRef, useEffect } from "react";

export const useDisappearDownloadButton = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const bottomOffset = 100;
            const scrolledToBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - bottomOffset;

            if (cardRef.current) {
                if (scrolledToBottom) {
                    cardRef.current.classList.add(styles.hidden);
                } else {
                    cardRef.current.classList.remove(styles.hidden);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        handleScroll(); // run once on mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return cardRef;
}