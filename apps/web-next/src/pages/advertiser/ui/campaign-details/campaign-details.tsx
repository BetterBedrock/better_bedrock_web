import { Card } from "@/shared/ui/card";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { CampaignCard } from "@/shared/ui/campaign-card/campaign-card";
import { StatisticsCard } from "@/widgets/statistics-list/ui/statistics-card/statistics-card";
import { MockAdCampaign } from "../../model/mock-data";

import styles from "./campaign-details.module.scss";

interface CampaignDetailsProps {
    campaign: MockAdCampaign;
}

export const CampaignDetails = ({ campaign }: CampaignDetailsProps) => {
    return (
        <Card fullWidth>
            <Card.Body>
                <BedrockText text="Campaign Details" type="h3" font="Minecraft" color="white" />
                <BedrockText text="View statistics and manage your selected campaign." type="p" color="white" />
            </Card.Body>
            <Card.Divider />
            <Card.Body>
                <CampaignCard
                    campaign={campaign}
                    showStatus
                    actionsSlot={
                        <Button type="white" width="100%" center>
                            <BedrockText text="Manage campaign" type="p" color="black" />
                        </Button>
                    }
                />
            </Card.Body>
            <Card.Divider />
            <Card.Body>
                <div className={styles.statsGrid}>
                    <StatisticsCard name="Total Impressions" data={campaign.impressions} showGraph={false} className={styles.card} />
                    <StatisticsCard name="Total Clicks" data={campaign.clicks} showGraph={false} className={styles.card} />
                    <StatisticsCard name="Click-Through Rate" data={parseFloat(((campaign.clicks / campaign.impressions) * 100).toFixed(2))} suffix="%" showGraph={false} className={styles.card} />
                </div>
            </Card.Body>
        </Card>
    );
};
