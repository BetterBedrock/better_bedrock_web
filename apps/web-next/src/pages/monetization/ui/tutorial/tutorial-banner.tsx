"use client"

import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";
import Link from "next/link";

export const TutorialBanner = ({ selectedProvider }: { selectedProvider: 'linkvertise' | 'lootlabs' }) => (
  <Banner
    type={selectedProvider === 'lootlabs' ? "success" : "error"}
    message={
      <BedrockText
        color="white"
        text={selectedProvider === 'lootlabs'
          ? "✅ Smart choice Lootlabs provides better revenue! "
          : "💡 Pro tip: Consider choosing Lootlabs for better revenue. "
        }
      >
        <Link href={selectedProvider === 'lootlabs' ? "https://lootlabs.gg/sign-up?rpid=516698" : "https://publisher.linkvertise.com/ac/401625"} style={{ color: "inherit", textDecoration: "underline" }}>
          <BedrockText
            text={selectedProvider === 'lootlabs'
              ? "Create your Lootlabs account here!"
              : "Create your Linkvertise account here!"
            }
            type="span"
            color="white">
          </BedrockText>
        </Link>
      </BedrockText>
    }
  />
);
