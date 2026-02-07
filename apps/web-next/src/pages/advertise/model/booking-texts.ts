export interface BookingStep {
  title: string;
  description: string;
}

export const bookingTexts: BookingStep[] = [
  {
    title: "Plan Selection",
    description:
      "Choose your preferred tier (Basic, Standard, or Exclusive) and duration (weekly or monthly).",
  },
  {
    title: "Payment",
    description:
      "Secure your slot using Stripe, Revolut, or PayPal via our pre-paid model.",
  },
  {
    title: "Asset Verification",
    description:
      "Submit your banner graphics for technical approval (must meet 8:2 ratio and HD quality standards).",
  },
  {
    title: "Campaign Launch",
    description:
      "Your ads go live on-site and Discord benefits are activated within 0-48 hours.",
  },
];
