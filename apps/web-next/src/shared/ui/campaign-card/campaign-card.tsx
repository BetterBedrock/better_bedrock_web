import React from "react";
import { Card } from "@/shared/ui/card";
import { BedrockText } from "@/shared/ui/bedrock-text";
import styles from "./campaign-card.module.scss";

export interface CampaignData {
    id: string;
    plan: string;
    status: string;
    targetUrl: string;
    userId: string;
    imageUrl: string;
    impressions: number;
    clicks: number;
}

interface CampaignCardProps {
    campaign: CampaignData;
    showStatus?: boolean;
    showStats?: boolean;
    actionsSlot?: React.ReactNode;
}

export const CampaignCard = ({
    campaign,
    showStatus,
    showStats,
    actionsSlot,
}: CampaignCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE": return "#00a000";
            case "PENDING": return "#ff6a00";
            case "REJECTED": return "#d82828";
            default: return "white";
        }
    };

    return (
        <Card sub fullWidth>
            <div className={styles.bannerWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={campaign.imageUrl} alt="Banner" />
            </div>
            <Card.Body className={styles.cardBody}>
                <div className={styles.details}>
                    <BedrockText text={`PLAN: ${campaign.plan}`} type="h3" font="Minecraft" textAlign="left" color="white" />
                    {showStatus && (
                        <BedrockText
                            text={`Status: ${campaign.status}`}
                            type="p"
                            textAlign="left"
                            color={getStatusColor(campaign.status)}
                            extraClassName={styles.statusText}
                        />
                    )}
                    <BedrockText text={`Target URL: ${campaign.targetUrl}`} type="p" textAlign="left" color="white" />
                    {showStats && (
                        <BedrockText
                            text={`Impressions: ${campaign.impressions} | Clicks: ${campaign.clicks}`}
                            type="p"
                            textAlign="left"
                            color="white"
                        />
                    )}
                    <BedrockText text={`User ID: ${campaign.userId}`} type="p" textAlign="left" color="white" />
                </div>
            </Card.Body>
            {actionsSlot && (
                <>
                    <Card.Divider sub />
                    <Card.Body className={styles.actions}>
                        {actionsSlot}
                    </Card.Body>
                </>
            )}
        </Card>
    );
};
