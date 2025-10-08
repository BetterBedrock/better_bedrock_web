import { Collapsible } from "~/components/bedrock/collapsible";
import { HeroTitle, HeroDescription } from ".";
import { styles } from ".";
import { InformationFAQQuestion } from "~/pages/information";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card, CardDivider } from "~/components/bedrock/card";
import Markdown from "react-markdown";
import clsx from "clsx";

export const Hero = () => (
  <>
    <div className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.cardTextWrapper}>
          <HeroTitle />
          <HeroDescription />
        </div>
        <CardDivider />
        <div className={clsx(styles.video, styles.cardContainer)}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/DEQu3Q19ZMM" //TODO;
            title="BETTER BEDROCK V8 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Card>
    </div>

    <div className={styles.section}>
      <div className={styles.statistics}>
        <Card className={styles.card}>
          <div className={styles.cardTextWrapper}>
            <BedrockText
              text="Reasons To Choose Us"
              type="h2"
              font="Minecraft"
              color="white"
              textAlign="center"
            />
            <BedrockText type="p" color="white" text={"Quick convincing information about us and our services."} />
          </div>
          <CardDivider />
          <div className={clsx(styles.grid, styles.cardContainer)}>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Proven Quality"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="3 years of development"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Extra Protection"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="AD Anti-bypass"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Average Earnings"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="€8.5 per 1000 downloads"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Monthly Reach"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="Hundreds of thousands of visits"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Great Reputation"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="Known from excellent creations"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
            <Card sub className={styles.sub}>
              <div>
                <BedrockText
                  type="h3"
                  text="Single Game Focus"
                  textAlign="left"
                  color="white"
                  font="Minecraft"
                  extraClassName={styles.highlight}
                />
                <BedrockText
                  extraClassName={styles.name}
                  type="p"
                  text="Minecraft Bedrock Edition"
                  textAlign="left"
                  color="white"
                />
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>

    <div className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.cardTextWrapper}>
          <BedrockText text="FAQ" type="h2" font="Minecraft" color="white" textAlign="center" />
          <BedrockText type="p" color="white" text={"General topic FAQ. If you still have questions, please check out our discord server!"} />
        </div>
        <CardDivider />
        <div className={clsx(styles.question, styles.cardContainer)}>
          {questions.map((question, index) => (
            <Collapsible
              key={question.question}
              headerText={question.question}
              contentText={question.answer}
              width="100%"
              indexTextRef={index + 1}
            />
          ))}
        </div>

      </Card>
    </div>


    <div className={styles.section}>
      <Card className={clsx(styles.card, styles.markdownWrapper, styles.cardContainer)}>
        <Card sub className={styles.sub}>
          <BedrockText
            text="How to begin?"
            type="h2"
            font="Minecraft"
            color="white"
            textAlign="start"
          />
          <BedrockText type="p" color="white" textAlign="left" text={"We recommend to check tutorial video above, however below are text instructions for configuring ADs revenue."} />
        </Card>
        {/* <Card sub className={styles.sub}>
          <Markdown>{tutorialPart1}</Markdown>
        </Card> */}
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

        {/* <Markdown>{tutorial}</Markdown> */}
      </Card>
    </div>
  </>
);

const questions: InformationFAQQuestion[] = [
  {
    question: "Why should you choose us?",
    answer: "We provide extra layer of anti-bypass that actually works and generates more revenue for creators. This place is also visited by tens of thousands people per month that are mainly focused on Bedrock content making your projects even more recognizable. Overall proven quality of Better Bedrock and 3 years of active development by experienced people.",
  },
  {
    question: "How much money will I make?",
    answer: "At the moment, we only provide earnings way through ADs, so we also rely on the information they provide, and it's €8.5 per 1000 downloads. Users can generate revenue even up to $70 per 1000 views! - linkvertise.",
  },
  {
    question: "Does the Anti-bypass work?",
    answer: "Yes, all bypass services don't work with Better Bedrock links. Our special functions block these bypass tools, resulting in higher revenue!",
  },
  {
    question: "What do I need to do to receive money?",
    answer: "To receive money you need to set up payout settings on linkvertise website; Local Bank Transfer / Sepa Transfer, Wire Transfer, PayPal. On our side we require you to set up User ID and Anti-bypass Token in account settings. To set up this entire functionality, follow tutorial above or text instructions below. Everything goes directly to your account without any operations here.",
  },
  {
    question: "How to earn more money? (trick)",
    answer: "Whenever you want to payout your earnings, make sure to do it on wallet with euro currency. This way you will avoid 1.9% to 3% FX fee ;)",
  },
];

// Mention invalid linkvertise token and anti bypass

// const tutorialPart1 = `
// ## Key points

// 1.  Creating a BetterBedrock account

// 2.  Connecting your Linkvertise account to receive **100% ad revenue**

// 3.  Starting your first project
// `;

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

// const tutorial = `
// This tutorial will walk you through:

// 1.  Creating a BetterBedrock account

// 2.  Connecting your Linkvertise account to receive **100% ad revenue**

// 3.  Starting your first project

// ----------

// ### 1️⃣ Create a BetterBedrock Account

// 1.  Go to [BetterBedrock Login](https://betterbedrock.com/login)

// 2.  Sign up using your Google account

// ----------

// ### 2️⃣ Create & Configure Your Linkvertise Account

// To connect Linkvertise, you’ll need two things:

// -   User ID

// -   Anti-bypass Token

// #### Step A: Create a Linkvertise Publisher Account

// 1.  Visit [Linkvertise Publisher](https://publisher.linkvertise.com/)

// 2.  Sign up for a new account

// #### Step B: Find Your Linkvertise User ID

// 1.  Log in to your Linkvertise Publisher account

// 2.  Go to the **Affiliate Program** page → [Affiliate Dashboard](https://publisher.linkvertise.com/dashboard#affiliate)

// 3.  Look at your **Affiliate URL**. Example:

//     \`\`\`
//     https://publisher.linkvertise.com/ac/1382868
//     \`\`\`

//     -   The number at the end (\`1382868\` in this example) is your **User ID**

// #### Step C: Enable Anti-Bypassing & Get Token

// 1.  Go to **Settings** → [Account Settings](https://publisher.linkvertise.com/dashboard#account)

// 2.  Enable the option **“Use anti-bypassing”**

// 3.  Save your settings

// 4.  You’ll now see your **Anti-bypass Token** (a 64-character string)

// ----------

// ### 3️⃣ Connect Linkvertise to BetterBedrock

// 1.  Go to your **BetterBedrock profile**

// 2.  Open **Settings** (click the gear icon next to your profile picture)

// 3.  Enable **Custom Linkvertise**

// 4.  Enter:

//     -   **Linkvertise User ID** (e.g., \`1382868\`)

//     -   **Anti-bypass Token** (64-character string)

// 5.  Save your profile settings

// ----------

// ### 4️⃣ Create Your First Project

// 1.  Go to [Create Project](https://betterbedrock.com/create)

// 2.  Fill in your project details

// 3.  Publish and start earning revenue 🎉

// ----------

// ✅ You’re all set! Your BetterBedrock account is now linked with Linkvertise, and you can start creating and monetizing projects
// `;
