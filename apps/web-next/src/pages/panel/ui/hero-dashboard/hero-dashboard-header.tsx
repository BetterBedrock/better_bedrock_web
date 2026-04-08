import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";

import styles from "./hero-dashboard.module.scss";

export const HeroDashboardHeader = () => <Card className={styles.card} negativeMarginBottom fullWidth>
    <Card.Body>
        <Card.Item>
            <BedrockText type="h1" font="Minecraft" color="white">Global Settings</BedrockText>
        </Card.Item>
    </Card.Body>
</Card>