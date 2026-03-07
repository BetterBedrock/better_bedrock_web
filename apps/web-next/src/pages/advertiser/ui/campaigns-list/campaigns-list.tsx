import { useState } from "react";
import { Card } from "@/shared/ui/card";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { MockAdCampaign } from "../../model/mock-data";

interface CampaignsListProps {
    campaigns: MockAdCampaign[];
    selectedCampaignId: string | null;
    onSelect: (id: string) => void;
}

export const CampaignsList = ({ campaigns, selectedCampaignId, onSelect }: CampaignsListProps) => {        
    const [closeTrigger, setCloseTrigger] = useState(0);
    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

    const handleSelect = (id: string) => {
        onSelect(id);
        setCloseTrigger(prev => prev + 1);
    };

    return (
        <Card fullWidth>
            <Card.Body>
                <BedrockText text="Your Campaigns" type="h2" font="Minecraft" color="white" />
                <BedrockText text="Manage all your advertisement banners in one place." type="p" color="white" />
            </Card.Body>
            <Card.Divider />
            <Card.Body>
                <Collapsible
                    headerText={selectedCampaign ? `Selected Banner: ${selectedCampaign.id}` : "Select a Campaign"}                                                                                                                       
                    width="100%"
                    floating
                    limit
                    closeTrigger={closeTrigger}
                >
                    <ButtonGroup direction="vertical">
                        {campaigns.map((c) => (
                            <Button
                                key={c.id}
                                center
                                type="dark"
                                width="100%"
                                isClicked={c.id === selectedCampaignId}
                                onClick={() => handleSelect(c.id)}
                            >
                                <BedrockText type="p" color="white" text={`${c.id}`} />
                            </Button>
                        ))}
                    </ButtonGroup>
                </Collapsible>
            </Card.Body>
        </Card>
    );
};
