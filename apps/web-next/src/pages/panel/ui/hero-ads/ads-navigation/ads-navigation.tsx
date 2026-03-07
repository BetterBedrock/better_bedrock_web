import { Card } from "@/shared/ui/card";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";

type TabType = "PENDING" | "ACTIVE" | "REJECTED";

interface AdsNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const AdsNavigation = ({ activeTab, onTabChange }: AdsNavigationProps) => {
    return (
        <Card fullWidth>
            <Card.Body>
                <BedrockText type="h1" text="Ads" color="white" font="Minecraft" />
                <BedrockText
                    type="p"
                    color="white"
                    text="View, edit, and create ads all in one place."
                />
            </Card.Body>
            <Card.Divider />
            <Card.Body>
                <ButtonGroup>
                    <Button
                        center
                        type="white"
                        width="100%"
                        isClicked={activeTab === "PENDING"}
                        isToggled={activeTab === "PENDING"}
                        onClick={() => onTabChange("PENDING")}
                    >
                        <BedrockText text="Submissions" />
                    </Button>
                    <Button
                        center
                        type="white"
                        width="100%"
                        isClicked={activeTab === "ACTIVE"}
                        isToggled={activeTab === "ACTIVE"}
                        onClick={() => onTabChange("ACTIVE")}
                    >
                        <BedrockText text="Active" />
                    </Button>
                    <Button
                        center
                        type="white"
                        width="100%"
                        isClicked={activeTab === "REJECTED"}
                        isToggled={activeTab === "REJECTED"}
                        onClick={() => onTabChange("REJECTED")}
                    >
                        <BedrockText text="Rejected" />
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};
