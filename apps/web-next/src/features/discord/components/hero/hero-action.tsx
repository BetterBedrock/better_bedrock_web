"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { useRedirectToDiscord } from "@/features/discord/hooks/use-redirect-to-discord";

export const HeroAction = () => {
  useRedirectToDiscord();

  return (
    <Link link="https://discord.gg/ZGK5WYXnEY" hideStyles isExternalLink={true}>
      <Button width="100%" height="auto" type="green" center>
        <BedrockText type="p" color="white" text="Join Discord" />
      </Button>
    </Link>
  );
};
