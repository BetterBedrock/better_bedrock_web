import { Card } from "@/shared/ui/card";
import { ReactNode } from "react";
import { ModCardThumbnail } from "@/shared/ui/mod-card/mod-card-thumbnail/mod-card-thumbnail";
import { ModCardDetails } from "@/shared/ui/mod-card/mod-card-details/mod-card-details";
import { ModCardActions } from "@/shared/ui/mod-card/mod-card-actions/mod-card-actions";

interface ModCardProps {
  name?: string;
  imageSrc?: string;
  tags?: string[];
  defaultEnabled?: boolean;
  popup?: (close: () => void) => ReactNode;
  onChange?: (enabled: boolean) => void;
}

export const ModCard = ({
  name = "Armor HUD",
  imageSrc = "/images/sand.png",
  tags = ["UI", "Combat"],
  defaultEnabled = true,
  popup,
  onChange,
}: ModCardProps) => (
  <div>
    <ModCardThumbnail src={imageSrc} />
    <Card sub>
      <ModCardDetails name={name} tags={tags} />
      <Card.Divider />
      <ModCardActions
        defaultEnabled={defaultEnabled}
        popup={popup}
        onChange={onChange}
      />
    </Card>
  </div>
);
