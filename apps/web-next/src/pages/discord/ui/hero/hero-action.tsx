"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { useRedirectToDiscord } from "@/pages/discord/lib/use-redirect-to-discord";

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
