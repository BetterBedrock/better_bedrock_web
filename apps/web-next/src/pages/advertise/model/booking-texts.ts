export interface BookingStep {
  title: string;
  description: string;
}

export const bookingTexts: BookingStep[] = [
  {
    title: "Select Your Plan",
    description:
      "Choose your preferred tier (Basic, Standard, or Exclusive) and lock in your campaign duration (7 or 30 days).",
  },
  {
    title: "Secure Your Slot",
    description:
      "Complete your payment instantly via Stripe to reserve your ad space, or contact us for alternative methods.",
  },
  {
    title: "Upload Assets",
    description:
      "Submit your banner graphics. Our team will run a quick verification to ensure they meet the display requirements.",
  },
  {
    title: "Go Live & Track Results",
    description:
      "Once approved, your campaign goes live. Log into your dashboard to monitor your Views, Clicks, and CTR in real-time.",
  },
];
