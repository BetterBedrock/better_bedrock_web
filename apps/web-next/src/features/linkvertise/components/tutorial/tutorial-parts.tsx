import Markdown from "react-markdown";
import { Card, CardBody } from "@/components/card";

import styles from "./tutorial.module.scss";

export const TutorialParts = () => (
  <div className={styles.parts}>
    <Card sub className={styles.sub}>
      <CardBody>
        <Markdown>{tutorialPart1}</Markdown>
      </CardBody>
    </Card>
    <Card sub className={styles.sub}>
      <CardBody>
        <Markdown>{tutorialPart2}</Markdown>
      </CardBody>
    </Card>
    <Card sub className={styles.sub}>
      <CardBody>
        <Markdown>{tutorialPart3}</Markdown>
      </CardBody>
    </Card>
    <Card sub className={styles.sub}>
      <CardBody>
        <Markdown>{tutorialPart4}</Markdown>
      </CardBody>
    </Card>
  </div>
);

const tutorialPart1 = `
## 1. Better Bedrock Authentication
- Access the [Login Page](https://betterbedrock.com/login).
- Authenticate using your **Google account** for instant profile creation.
`;

const tutorialPart2 = `
## 2. Linkvertise Publisher Setup
- Register an account at the [Linkvertise Publisher Portal](https://publisher.linkvertise.com/).
- This account acts as your **primary wallet** where all ad revenue is accumulated.
`;

const tutorialPart3 = `
## 3. Extracting Technical Credentials

*Step 1:* Locate your Linkvertise User ID
1. Log in to your [Publisher Dashboard](https://publisher.linkvertise.com/).
2. Navigate to the [Affiliate Program](https://publisher.linkvertise.com/dashboard#affiliate) tab.
3. Identify your **Affiliate URL**.
   - Format: \`https://publisher.linkvertise.com/ac/1382868\`
   - The numerical string at the end (**1382868**) is your unique **User ID**.

*Step 2:* Generate Anti-Bypass Security Token
1. Open your [Account Settings](https://publisher.linkvertise.com/dashboard#account).
2. Locate and toggle the "**Use anti-bypassing**" option.
3. **Save settings** to commit changes.
4. Copy the newly generated "**Anti-bypass Token**" (a secure 64-character string).
`;

const tutorialPart4 = `
## 4. Finalizing Integration
1. Return to your **BetterBedrock Profile**.
2. Click the **Settings (Gear Icon)** adjacent to your avatar.
3. Enable the **Custom Linkvertise** toggle.
4. Input your credentials:
   - **Linkvertise User ID**: Your numerical ID from Step 1.
   - **Anti-bypass Token**: The 64-character security string.
5. Click **Save Profile Settings**.

**Configuration Complete.** Your projects are now protected and monetized.
`;