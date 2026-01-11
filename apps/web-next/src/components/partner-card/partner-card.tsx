import { Card, CardBody, CardDivider } from "../card";
import { PartnerImage } from "../partner-image/partner-image";
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
