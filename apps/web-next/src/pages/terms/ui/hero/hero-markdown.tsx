import ReactMarkdown from "react-markdown";

import styles from "./hero.module.scss";

export const HeroMarkdown = () => (
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

## Advertising & Uptime Policy

1. **Uptime Compensation Guarantee:**
   - We prioritize the highest availability for the Better Bedrock service. 
   - In the event of a continuous website failure lasting more than 12 hours due to hosting-side issues, we will apply compensation.
2. **Slot Hierarchy & Exclusivity:**
   - **EXCLUSIVE Plan:** Guarantees full exclusivity in the Home section. Only one Advertiser can occupy this slot during a given period (100% Share of Voice).
   - **STANDARD & BASIC Plans:** These are unlimited and shared slots. We reserve the right to display banners from multiple Advertisers in the same sections using a rotational model.
3. **Conflict of Interest (Competition Clause):**
   - Better Bedrock is an open advertising platform. We do not guarantee the absence of competing brands within the Standard and Basic packages.
   - Simultaneous promotion of similar services (e.g., two different hosting providers) in rotational slots is permitted and does not constitute grounds for a complaint.
   - Only the Exclusive Package protects an Advertiser from the direct presence of competitors in the Home section.
4. **Technical Adjustments:**
   - We reserve the right to make minor modifications to the website code affecting banner placement to improve User Experience. 
   - Such changes will only be made if they do not negatively impact the estimated number of views (Impressions).
        `}
    </ReactMarkdown>
  </div>
);
