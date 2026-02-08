import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Routes } from "@/shared/lib/utils";
import Link from "next/link";

import styles from "./trailer.module.scss";

export const TrailerButton = () => (
    <ButtonGroup direction="responsive" className={styles.buttonGroup}>
        <Link href={Routes.MONETIZATION} className={styles.link}>
            <Button width="100%" type="gold" center>
                <BedrockText text="Start Earning!" type="p" color="black" />
            </Button>
        </Link>
    </ButtonGroup>
);