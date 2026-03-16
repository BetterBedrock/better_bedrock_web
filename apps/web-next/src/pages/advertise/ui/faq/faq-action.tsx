"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";

const scrollToElement = (id: string, offset: number = 80) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export const FAQAction = () => (
  <Button
    width="auto"
    type="green"
    onClick={() => scrollToElement("plans")}
    center
  >
    <BedrockText text="Ready to grow? Scroll up and select your plan!" type="p" color="white" />
  </Button>
);
