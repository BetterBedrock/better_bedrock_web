"use client";

import { useState, useEffect } from "react";

interface UsePreviewPopupPlansProps {
    getLinkvertiseId: () => Promise<string>;
}

export const usePreviewPopupPlans = ({ getLinkvertiseId }: UsePreviewPopupPlansProps) => {
    const [linkUrl, setLinkUrl] = useState<string>();

    useEffect(() => {
        const fetchLink = async () => {
            const url = await getLinkvertiseId();
            setLinkUrl(url);
        };
        fetchLink();
    }, [getLinkvertiseId]);

    return { linkUrl };
};