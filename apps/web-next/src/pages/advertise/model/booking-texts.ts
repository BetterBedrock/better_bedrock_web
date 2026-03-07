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
      "Submit your banner graphics for technical approval (must meet required quality standards).",
  },
  {
    title: "Campaign Launch",
    description:
      "After our approval, your ad will be displayed on the website and you will receive the benefits of your chosen plan.",
  },
];
