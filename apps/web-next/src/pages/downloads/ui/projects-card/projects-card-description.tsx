"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { useState } from "react";
import styles from "./projects-card.module.scss";
import clsx from "clsx";

export const ProjectsCardDescription = () => {
  const [showMore, setShowMore] = useState(true);

  const handleClickLink = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className={clsx(styles.description)}>
      <BedrockText
        type="p"
        color="white"
        textAlign="start"
        extraClassName={clsx(styles.less, showMore && styles.singleLine)}
      >
        Minecraft Bedrock Edition delivers the creative sandbox experience
        millions of players enjoy across mobile, console, and Windows devices.
        With a constantly expanding collection of
        <em>Minecraft Bedrock mods</em>, you can fully customize your world and
        enhance every aspect of gameplay. The Bedrock modding community
        continues to create high-quality add-ons that improve textures, upgrade
        graphics, and introduce exciting new features. From realistic shaders
        and HD texture packs to custom maps, improved user interfaces, and
        advanced gameplay mechanics, there’s a mod for every type of player.
        Some <em>Minecraft Bedrock mods</em> enhance survival with new mobs and
        crafting systems, while others refine villager trading, tweak combat
        mechanics, or add entirely new challenges. Each Minecraft Bedrock
        Edition mod offers a unique way to experience the game. Whether
        you&apos;re focused on building, exploring, roleplaying, or surviving,
        you can tailor your adventure with the perfect combination of add-ons.
        Finding the right mod is easy — browse through detailed descriptions,
        preview screenshots, and choose the <em>Minecraft Bedrock mods</em> that
        match your personal playstyle. All mods are completely free to download
        and simple to install, making it easier than ever to upgrade your
        gameplay. Explore the collection, test different add-ons, and discover
        the best <em>Minecraft Bedrock mods</em> to transform your world today.
      </BedrockText>
      <BedrockText
        text={showMore ? "Read more" : "Read less"}
        extraClassName={styles.expand}
        onClick={handleClickLink}
      />
    </div>
  );
};
