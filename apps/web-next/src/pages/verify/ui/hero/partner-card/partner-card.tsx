import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { PartnerImage } from "@/shared/ui/partner-image";
import { PartnerCardTitle } from "./partner-card-title";

interface PartnerCardProps {
  onlyImage?: boolean;
}

export const PartnerCard = ({ onlyImage = false }: PartnerCardProps) => (
  <Card fullWidth>
    {!onlyImage && (
      <>
        <CardBody>
          <PartnerCardTitle />
        </CardBody>
        <CardDivider />
      </>
    )}
    <CardBody>
      <PartnerImage />
    </CardBody>
  </Card>
);
