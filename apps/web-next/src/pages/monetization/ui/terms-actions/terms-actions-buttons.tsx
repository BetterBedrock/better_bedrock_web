import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Routes } from "@/shared/lib/utils";
import Link from "next/link";

import styles from "./terms-actions.module.scss";

export const TermsActionsButtons = () => (
    <ButtonGroup direction="responsive">
        <Link href={Routes.TERMS} className={styles.link}>
            <Button width="100%" type="green" center>
                <BedrockText text="Terms of Service" type="p" color="white" />
            </Button>
        </Link>
        <Link href={Routes.PRIVACY_POLICY} className={styles.link}>
            <Button width="100%" type="white" center>
                <BedrockText text="Privacy Policy" type="p" color="black" />
            </Button>
        </Link>
    </ButtonGroup>
);