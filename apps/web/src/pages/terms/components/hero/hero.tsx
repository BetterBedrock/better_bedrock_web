import React from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import ReactMarkdown from "react-markdown";
import { styles } from ".";

export const Hero = () => {
  return (
    <>
      <BedrockText type="h1" text="Terms" color="white" font="MinecraftTen" />
      <div className={styles.markdown}>
        <ReactMarkdown>
          {`
**Last Updated: August 5, 2025**

## Payment Rules
* **Payment Processing**: All payments are securely processed via Stripe.

* **Only Better Bedrock Content**: Includes Main Texture Pack, All 9 extensions, and Archives.

* **Everything On The Site**: Includes Main Texture Pack, All 9 extensions, Archives, plus Community & Side Projects packs.

* **Free Download Option**: Available with a 60-minute cooldown. This is noted to ensure a smooth user experience.

* **Discord VIP Role**: To claim your VIP role, contact us on Discord, preferably by opening a ticket. Thank you for your support!

* **Usage Limits**: Weekly plan provides 50 uses; monthly plan provides 300 uses.

* **Voucher Code Policy**: Publicly sharing voucher codes may lead to the code being banned and loss of access.
        `}
        </ReactMarkdown>
      </div>
    </>
  );
};
