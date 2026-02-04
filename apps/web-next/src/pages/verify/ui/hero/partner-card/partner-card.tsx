import { Card } from "@/shared/ui/card";
import { PartnerImage } from "@/shared/ui/partner-image";
import { PartnerCardTitle } from "./partner-card-title";

interface PartnerCardProps {
  onlyImage?: boolean;
}

export const PartnerCard = ({ onlyImage = false }: PartnerCardProps) => (
  <Card fullWidth>
    {!onlyImage && (
      <>
        <Card.Body>
          <PartnerCardTitle />
        </Card.Body>
        <Card.Divider />
      </>
    )}
    <Card.Body>
      <PartnerImage />
    </Card.Body>
  </Card>
);
