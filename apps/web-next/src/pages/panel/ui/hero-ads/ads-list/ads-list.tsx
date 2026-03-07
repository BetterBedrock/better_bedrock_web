import { Card } from "@/shared/ui/card";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { CampaignCard } from "@/shared/ui/campaign-card/campaign-card";
import { Banner } from "@/shared/ui/banner";
import { MockAdCampaign } from "@/pages/advertiser/model/mock-data";

import styles from "./ads-list.module.scss";

interface AdsListProps {
  ads: ReadonlyArray<MockAdCampaign>;
  activeTab: "PENDING" | "ACTIVE" | "REJECTED";
  onApprove: (id: string) => void;
  onRejectClick: (id: string) => void;
  // Optional depending on tabs available
  onEdit?: (campaign: MockAdCampaign) => void;
  onDelete?: (id: string) => void;
}

export function AdsList({ ads, activeTab, onApprove, onRejectClick, onEdit, onDelete }: AdsListProps) {
  let title = "";
  let description = "";
  let emptyMessage = "";

  switch (activeTab) {
    case "PENDING":
      title = "Submissions";
      description = "Pending ad submissions.";
      emptyMessage = "No pending campaigns.";
      break;
    case "ACTIVE":
      title = "Active Banners";
      description = "Manage currently active ads.";
      emptyMessage = "No active campaigns.";
      break;
    case "REJECTED":
      title = "Rejected Banners";
      description = "View previously rejected ads.";
      emptyMessage = "No rejected campaigns.";
      break;
  }

  return (
    <Card fullWidth>
      <Card.Body>
        <BedrockText text={title} type="h2" font="Minecraft" color="white" />
        <BedrockText type="p" color="white" text={description} />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <div className={styles.list}>
          {ads.length === 0 ? (
            <Banner message={emptyMessage} type="neutral" />
          ) : (
            ads.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                showStatus={activeTab !== "PENDING"}
                showStats={activeTab !== "PENDING"}
                actionsSlot={
                  <ButtonGroup>
                    {activeTab === "PENDING" && (
                      <>
                        <Button center type="green" onClick={() => onApprove(campaign.id)} width="100%">
                          <BedrockText text="Accept" color="white" />
                        </Button>
                        <Button center type="red" onClick={() => onRejectClick(campaign.id)} width="100%">
                          <BedrockText text="Reject" color="white" />
                        </Button>
                      </>
                    )}
                    {(activeTab === "ACTIVE" || activeTab === "REJECTED") && (
                      <>
                        <Button center type="white" onClick={() => onEdit?.(campaign)} width="100%">
                          <BedrockText text="Edit" />
                        </Button>
                        <Button center type="red" onClick={() => onDelete?.(campaign.id)} width="100%">
                          <BedrockText text="Delete" color="white" />
                        </Button>
                      </>
                    )}
                  </ButtonGroup>
                }
              />
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
