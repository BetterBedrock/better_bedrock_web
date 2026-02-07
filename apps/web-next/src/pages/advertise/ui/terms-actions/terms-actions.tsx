import { Card } from "@/shared/ui/card";
import { TermsActionsTitle } from "./terms-actions-title";
import { TermsActionsButtons } from "./terms-actions-buttons";
import { TermsActionsDescription } from "./terms-actions-description";

export const TermsActions = () => (
    <Card fullWidth>
        <Card.Body>
            <TermsActionsTitle />
            <TermsActionsDescription />
        </Card.Body>
        <Card.Divider />
        <Card.Body>
            <TermsActionsButtons />
        </Card.Body>
    </Card>
);