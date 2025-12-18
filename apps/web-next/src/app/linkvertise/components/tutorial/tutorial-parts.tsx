import Markdown from "react-markdown";
import { Card } from "@/_components/card";

import styles from "./tutorial.module.scss";

export const TutorialParts = () => (
  <>
    <Card sub className={styles.sub}>
      <Markdown>{tutorialPart2}</Markdown>
    </Card>
    <Card sub className={styles.sub}>
      <Markdown>{tutorialPart3}</Markdown>
    </Card>
    <Card sub className={styles.sub}>
      <Markdown>{tutorialPart4}</Markdown>
    </Card>
    <Card sub className={styles.sub}>
      <Markdown>{tutorialPart5}</Markdown>
    </Card>
  </>
);

const tutorialPart2 = `
## BetterBedrock Account

1.  Go to [Login Page](https://betterbedrock.com/login)

2.  Sign up using your Google account`;

const tutorialPart3 = `
## Linkvertise Account
- Go to [Linkvertise Publisher](https://publisher.linkvertise.com/)
- Create account
`;

const tutorialPart4 = `
## Setting up values
### Step 1
Find Your Linkvertise User ID
1.  Log in to your [Linkvertise Publisher](https://publisher.linkvertise.com/) account

2.  Go to the [Affiliate Program](https://publisher.linkvertise.com/dashboard#affiliate)

3.  Look at your AFFILIATE URL. 
    - Example: https://publisher.linkvertise.com/ac/**1382868**
    - The number at the end (**1382868** in this example) **is your User ID**

### Step 2
Enable Anti-Bypassing & Get Token

1.  Go to [Settings](https://publisher.linkvertise.com/dashboard#account)

2.  Enable the option “**Use anti-bypassing**”

3.  Save your settings

4.  You’ll now see your "**Anti-bypass Token**" (a 64-character string)
`;

const tutorialPart5 = `
## Connect Linkvertise to BetterBedrock

1.  Go to your **BetterBedrock profile**

2.  Open **Settings** (click the gear icon next to your profile picture)

3.  Enable **Custom Linkvertise**

4.  Enter:

    -   **Linkvertise User ID** (e.g., \`1382868\`)

    -   **Anti-bypass Token** (64-character string)

5.  Save your profile settings

### And you are done!
`;
