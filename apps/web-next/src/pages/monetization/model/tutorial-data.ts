export interface TutorialStep {
  title: string;
  content: string;
}

export interface TutorialProvider {
  steps: TutorialStep[];
}

export const tutorialData: Record<
  "linkvertise" | "lootlabs",
  TutorialProvider
> = {
  linkvertise: {
    steps: [
      {
        title: "Better Bedrock Setup",
        content: `- Access the [Login Page](https://betterbedrock.com/login).
- Create your **Better Bedrock account** using Google for a secure, one-click setup.`,
      },
      {
        title: "AD Provider Registration",
        content: `- Sign up at [Linkvertise Publisher](https://publisher.linkvertise.com/ac/401625).
- This serves as your **primary wallet** where all ad revenue is securely accumulated.`,
      },
      {
        title: "Extracting Security Credentials",
        content: `**Step A: Get your User ID**
1. Log in to your [Publisher Dashboard](https://publisher.linkvertise.com/).
2. Go to the [Affiliate Program](https://publisher.linkvertise.com/dashboard#affiliate) tab.
3. Your **User ID** is the number at the end of your Affiliate URL (e.g., in ac/1382868, **your ID is 1382868**).

**Step B: Generate Anti-Bypass Token**
1. Open [Account Settings](https://publisher.linkvertise.com/dashboard#account).
2. Enable the **"Use anti-bypassing"** toggle and **Save**.
3. Copy the generated **Anti-bypass Token**.`,
      },
      {
        title: "Finalizing Connection",
        content: `1. Go to your **Better Bedrock Profile Settings**.
2. Enter your **Linkvertise User ID** and **Anti-bypass Token**.
3. Click **Save Settings**.

**All set!** Your projects are now protected and monetized! This is a one-time setup that applies to every project automatically.`,
      },
    ],
  },
  lootlabs: {
    steps: [
      {
        title: "Better Bedrock Setup",
        content: `- Access the [Login Page](https://betterbedrock.com/login).
- Create a **Better Bedrock account** using Google services.`,
      },
      {
        title: "AD Provider Registration",
        content: `- Sign up at [LootLabs](https://lootlabs.gg/sign-up?rpid=516698).
- This serves as your **primary wallet** where all ad revenue is securely accumulated.`,
      },
      {
        title: "Extracting Security Credentials",
        content: `**Step A: Create Your First Link**
1. In the [LootLabs Dashboard](https://creators.lootlabs.gg/dashboard), click "**Create Single Monetized Links**".
2. Fill in the required information. **IMPORTANT: destination URL can be anything**.
3. Once created, find the **Short Link ID** at the end of your URL (e.g., **szzMUrlD**) This is your **LootLabs Link ID**.

**Step B: API Token Generation**
1. Navigate to the [Advanced Tab](https://creators.lootlabs.gg/advanced).
2. Click **Generate API Token** and copy the resulting string.`,
      },
      {
        title: "Finalizing Connection",
        content: `1. Go to your **Better Bedrock Profile Settings**.
2. Enter your **LootLabs Link ID** and **API Token**. Make sure that **LootLabs Link ID** uses only letters without the question mark!
3. Click **Save Settings**.

**All set!** Your projects are now protected and monetized! This is a one-time setup that applies to every project automatically.`,
      },
    ],
  },
};
