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
        title: "Better Bedrock Authentication",
        content: `- Access the [Login Page](https://betterbedrock.com/login).
- Create a **Better Bedrock account** using Google services.`,
      },
      {
        title: "Linkvertise Publisher Setup",
        content: `- Register an account at the [Linkvertise Publisher Page](https://publisher.linkvertise.com/ac/401625).
- This account acts as your **primary wallet** where all ad revenue is accumulated.`,
      },
      {
        title: "Extracting Technical Credentials",
        content: `*Step 1:* Locate your Linkvertise User ID
1. Log in to your [Publisher Dashboard](https://publisher.linkvertise.com/).
2. Navigate to the [Affiliate Program](https://publisher.linkvertise.com/dashboard#affiliate) tab.
3. Identify your **Affiliate URL**.
   - Format: https://publisher.linkvertise.com/ac/1382868
   - The string at the end (**1382868**) is your unique **User ID**.
4. Copy this "**Linkvertise User ID**".

*Step 2:* Generate Anti-Bypass Security Token
1. Open your [Account Settings](https://publisher.linkvertise.com/dashboard#account).
2. Locate and toggle the "**Use anti-bypassing**" option.
3. **Save settings** to commit changes.
4. Copy this "**Anti-bypass Token**".`,
      },
      {
        title: "Finalizing Integration",
        content: `1. Return to your **Profile**.
2. Click the **Settings (Gear Icon)** in top right corner.
3. Input your credentials:
   - **Linkvertise User ID**, from step 1.
   - **Anti-bypass Token**, from step 2.
4. Click **Save Profile Settings**.

**Configuration Complete.** Your projects are now protected and monetized! This is a one-time setup that applies to all future projects automatically.`,
      },
    ],
  },
  lootlabs: {
    steps: [
      {
        title: "Better Bedrock Authentication",
        content: `- Access the [Login Page](https://betterbedrock.com/login).
- Create a **Better Bedrock account** using Google services.`,
      },
      {
        title: "Lootlabs Setup",
        content: `- Register an account at the [Lootlabs Register Page](https://lootlabs.gg/sign-up?rpid=516698).
- This account acts as your **primary wallet** where all ad revenue is accumulated.`,
      },
      {
        title: "Extracting Technical Credentials",
        content: `*Step 1:* Create a project
1. Log in to your [Lootlabs Dashboard](https://creators.lootlabs.gg/dashboard).
2. Click "**Create Single Monetized Links**" in top left corner and Fill up the required information.
3. Identify your new link in the list below, and check **Short Link ID** column.
   - Format: *https://loot-link.com/s?szzMUrlD*
   - The string at the end (**szzMUrlD**) is your unique **LootLabs Link ID**.
4. Copy this "**LootLabs Link ID**".

*Step 2:* Generate API Token
1. Open [Advanced tab](https://creators.lootlabs.gg/advanced).
2. Click button to generate token - below **Generate API token** option.
3. Copy this "**API Token**".`,
      },
      {
        title: "Finalizing Integration",
        content: `1. Return to your **Profile**.
2. Click the **Settings (Gear Icon)** in top right corner.
3. Input your credentials:
   - **Lootlabs Link ID**, from step 1.
   - **API Token**, from step 2.
4. Click **Save Settings**.

**Configuration Complete.** Your projects are now protected and monetized! This is a one-time setup that applies to all future projects automatically.`,
      },
    ],
  },
};
