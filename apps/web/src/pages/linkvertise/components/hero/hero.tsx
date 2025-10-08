import { Collapsible } from "~/components/bedrock/collapsible";
import { HeroTitle, HeroDescription } from ".";
import { styles } from ".";
import { InformationFAQQuestion } from "~/pages/information";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card } from "~/components/bedrock/card";
import Markdown from "react-markdown";

export const Hero = () => (
  <>
    <div>
      <HeroTitle />
      <HeroDescription />
    </div>
    <div className={styles.video}>
      <iframe
        width="100%"
        height="100%"
        src="" //TODO;
        title="BETTER BEDROCK V8 RELEASE! The Best Utility Texture Pack for Minecraft Bedrock | Showcase Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

    <div className={styles.section}>
      <BedrockText
        text="Reasons To Choose Us"
        type="h2"
        font="Minecraft"
        color="white"
        textAlign="center"
      />
      <div className={styles.statistics}>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Average Earnings"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="8.5€ / 1k downloads"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Ad Protection"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="Anti-bypass"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text="Our Monthly Reach"
              textAlign="left"
              color="grey"
            />
            <BedrockText
              type="h2"
              text="Millions of visits"
              textAlign="left"
              color="white"
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
        </Card>
      </div>
    </div>

    <div className={styles.section}>
      <Card className={styles.card}>
        <BedrockText
          text="How to begin"
          type="h2"
          font="Minecraft"
          color="white"
          textAlign="start"
        />
        <Card sub className={styles.sub}>
          <Markdown>{tutorialPart1}</Markdown>
        </Card>
        <Card sub className={styles.sub}>
          <Markdown>{tutorialPart2}</Markdown>
        </Card>
        <Card sub className={styles.sub}>
          <Markdown>{tutorialPart3}</Markdown>
        </Card>
        <Card sub className={styles.sub}>
          <Markdown>{tutorialPart4}</Markdown>
        </Card>

        {/* <Markdown>{tutorial}</Markdown> */}
      </Card>
    </div>

    <div className={styles.section}>
      <BedrockText text="FAQ" type="h2" font="Minecraft" color="white" textAlign="center" />
      <div className={styles.question}>
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
    </div>
  </>
);

const questions: InformationFAQQuestion[] = [
  {
    question: "Why should you choose us?",
    answer: "",
  },
  {
    question: "How much money will I make?",
    answer: "",
  },
  {
    question: "What do I need to do to receive money?",
    answer: "",
  },
];

// Mention invalid linkvertise token and anti bypass

const tutorialPart1 = `
This tutorial will walk you through:

1.  Creating a BetterBedrock account

2.  Connecting your Linkvertise account to receive **100% ad revenue**

3.  Starting your first project
`;

const tutorialPart2 = `
### Create a BetterBedrock Account

1.  Go to [BetterBedrock Login](https://betterbedrock.com/login)

2.  Sign up using your Google account`;

const tutorialPart3 = `
### Create & Configure Your Linkvertise Account

To connect Linkvertise, you’ll need two things:

-   User ID

-   Anti-bypass Token

#### Step A: Create a Linkvertise Publisher Account

1.  Visit [Linkvertise Publisher](https://publisher.linkvertise.com/)

2.  Sign up for a new account

#### Step B: Find Your Linkvertise User ID

1.  Log in to your Linkvertise Publisher account

2.  Go to the [Affiliate Program](https://publisher.linkvertise.com/dashboard#affiliate)

3.  Look at your AFFILIATE URL. Example:

    \`\`\`
    https://publisher.linkvertise.com/ac/1382868
    \`\`\`

    -   The number at the end (\`1382868\` in this example) is your User ID

![alt text](src/assets/images/docs/linkvertise/linkvertise_id.png "Title")

#### Step C: Enable Anti-Bypassing & Get Token

1.  Go to [Settings](https://publisher.linkvertise.com/dashboard#account)

2.  Enable the option “Use anti-bypassing”

3.  Save your settings

4.  You’ll now see your "Anti-bypass Token" (a 64-character string)
`;

const tutorialPart4 = `
### Connect Linkvertise to BetterBedrock

1.  Go to your **BetterBedrock profile**

2.  Open **Settings** (click the gear icon next to your profile picture)

3.  Enable **Custom Linkvertise**

4.  Enter:

    -   **Linkvertise User ID** (e.g., \`1382868\`)

    -   **Anti-bypass Token** (64-character string)

5.  Save your profile settings
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
