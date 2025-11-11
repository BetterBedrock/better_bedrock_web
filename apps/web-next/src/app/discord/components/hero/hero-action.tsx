"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { Link } from "@/_components/link";
import { useRedirectToDiscord } from "@/app/discord/hooks";

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
