"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./partner-image.module.scss";

const partners = [
    {
        id: 1,
        name: "Partner 1",
        imageUrl: "/images/p1.png",
    },
    {
        id: 2,
        name: "Partner 2",
        imageUrl: "/images/p2.png",
    },
    {
        id: 3,
        name: "Partner 3",
        imageUrl: "/images/p3.png",
    },
];

export const PartnerImage = () => {
    const [partnerIndex, setPartnerIndex] = useState<number | null>(null);

    useEffect(() => {
        const lastIndex = parseInt(
            localStorage.getItem("partnerBannerIndex") || "0",
            10
        );
        const nextIndex = (lastIndex + 1) % partners.length;
        setPartnerIndex(nextIndex);
        localStorage.setItem("partnerBannerIndex", nextIndex.toString());
    }, []);

    return (
        <div className={styles.container}>
            {partnerIndex !== null && (
                <Image
                    src={partners[partnerIndex].imageUrl}
                    alt={partners[partnerIndex].name}
                    fill
                />
            )}
        </div>
    );
};
