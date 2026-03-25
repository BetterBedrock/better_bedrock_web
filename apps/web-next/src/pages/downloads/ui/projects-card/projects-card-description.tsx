"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { useState } from "react";
import styles from "./projects-card.module.scss";
import clsx from "clsx";
import { ProjectType } from "@/shared/lib/openapi";

interface ProjectsCardDescriptionProps {
  type?: ProjectType;
}

export const ProjectsCardDescription = ({
  type,
}: ProjectsCardDescriptionProps) => {
  const [showMore, setShowMore] = useState(true);

  const handleClickLink = () => {
    setShowMore((prev) => !prev);
  };

  const defaultType = (
    <>
      Minecraft Bedrock Edition delivers the creative sandbox experience
      millions of players enjoy across mobile, console, and Windows devices.
      With a constantly expanding collection of
      <em>Minecraft Bedrock mods</em>, you can fully customize your world and
      enhance every aspect of gameplay. The Bedrock modding community continues
      to create high-quality add-ons that improve textures, upgrade graphics,
      and introduce exciting new features. From realistic shaders and HD texture
      packs to custom maps, improved user interfaces, and advanced gameplay
      mechanics, there’s a mod for every type of player. Some{" "}
      <em>Minecraft Bedrock mods</em> enhance survival with new mobs and
      crafting systems, while others refine villager trading, tweak combat
      mechanics, or add entirely new challenges. Each Minecraft Bedrock Edition
      mod offers a unique way to experience the game. Whether you&apos;re
      focused on building, exploring, roleplaying, or surviving, you can tailor
      your adventure with the perfect combination of add-ons. Finding the right
      mod is easy — browse through detailed descriptions, preview screenshots,
      and choose the <em>Minecraft Bedrock mods</em> that match your personal
      playstyle. All mods are completely free to download and simple to install,
      making it easier than ever to upgrade your gameplay. Explore the
      collection, test different add-ons, and discover the best{" "}
      <em>Minecraft Bedrock mods</em> to transform your world today.
    </>
  );

  const typeDescriptions = {
    texturepacks: (
      <>
        Minecraft Bedrock Edition texture packs let you completely transform the
        visual style of your game without changing core gameplay mechanics. With{" "}
        <em>Minecraft Bedrock texture packs</em>, you can upgrade default
        textures, improve lighting, increase resolution, or switch to entirely
        new art styles. Whether you prefer realistic textures, medieval themes,
        vibrant cartoon styles, or clean minimalist designs, texture packs allow
        you to customize how every block, item, and mob looks in your world.
        Many texture packs also improve UI elements, tools, armor, and
        environment details, making your gameplay experience more immersive and
        visually appealing. Installing <em>Minecraft Bedrock texture packs</em>{" "}
        is quick and easy, and you can combine multiple packs to create your own
        unique look. Browse the collection, preview textures, and find the
        perfect pack to refresh your Minecraft world.
      </>
    ),
    addons: (
      <>
        Minecraft Bedrock add-ons expand the game by introducing new gameplay
        mechanics, mobs, items, blocks, and features that go far beyond the
        vanilla experience. With <em>Minecraft Bedrock add-ons</em>, you can
        transform survival mode, add new biomes and structures, create custom
        weapons and tools, or completely redesign game systems like crafting,
        trading, and combat. Many add-ons are designed to work together,
        allowing you to build a fully customized modded experience tailored to
        your playstyle. Whether you want more challenging survival, new
        adventures, technology systems, magic mechanics, or quality-of-life
        improvements, add-ons give you endless possibilities. Explore and
        download the best <em>Minecraft Bedrock add-ons</em>
        to upgrade your world and create a completely new gameplay experience.
      </>
    ),
    scripts: (
      <>
        Minecraft Bedrock scripts bring advanced functionality and automation to
        your world by using the Bedrock scripting API to modify gameplay
        behavior and game logic. With <em>Minecraft Bedrock scripts</em>,
        creators can add custom events, new game mechanics, interactive systems,
        custom interfaces, and server features that are not possible with
        standard add-ons alone. Scripts are often used for minigames,
        multiplayer servers, custom commands, economy systems, and unique
        gameplay mechanics that make worlds feel like entirely new games.
        Whether you&apos;re running a server, building an adventure map, or
        creating complex systems, <em>Minecraft Bedrock scripts</em> allow for
        deep customization and powerful new features that expand what Minecraft
        Bedrock Edition can do.
      </>
    ),
    maps: (
      <>
        Minecraft Bedrock maps allow you to explore completely new worlds,
        stories, challenges, and adventures created by the community. With
        <em>Minecraft Bedrock maps</em>, you can play survival islands,
        adventure maps with custom storylines, parkour challenges, puzzle maps,
        minigames, and massive custom cities. Many maps include custom add-ons,
        textures, and gameplay mechanics that create unique experiences far
        beyond the default game. Whether you want to explore a new survival
        world, play with friends, test your skills in parkour, or experience
        story-driven adventures, Minecraft Bedrock maps offer endless new
        content to play. Browse and download the best{" "}
        <em>Minecraft Bedrock maps</em> and start a new adventure today.
      </>
    ),
    skinPacks: (
      <>
        Minecraft Bedrock skin packs let you customize your character and
        express your personal style in the game. With{" "}
        <em>Minecraft Bedrock skins</em>, you can change your character into
        anything from warriors, robots, and adventurers to cute characters,
        modern outfits, fantasy heroes, and more. Skin packs often include
        multiple themed skins so you can switch your look anytime you want.
        Whether you play survival, multiplayer, roleplay, or minigames, custom
        skins make your character unique in every world and server. Browse and
        download the best <em>Minecraft Bedrock skin packs</em>
        and personalize your Minecraft character today.
      </>
    ),
    other: (
      <>
        Discover more ways to customize your game with additional
        <em>Minecraft Bedrock content</em> including shaders, UI packs, seeds,
        tools, and other unique modifications. These downloads can improve
        lighting and shadows, redesign the user interface, generate amazing
        world seeds, or add small quality-of-life improvements that make
        gameplay better and more enjoyable. While texture packs and add-ons
        change visuals and gameplay, this collection includes everything else
        that helps you enhance and personalize your Minecraft Bedrock
        experience. Explore the collection and find more{" "}
        <em>Minecraft Bedrock downloads</em> to improve your world.
      </>
    ),
  };

  return (
    <div className={clsx(styles.description)}>
      <BedrockText
        type="p"
        color="white"
        textAlign="start"
        extraClassName={clsx(styles.less, showMore && styles.singleLine)}
      >
        {type ? typeDescriptions[type] : defaultType}
      </BedrockText>
      <BedrockText
        text={showMore ? "Read more" : "Read less"}
        extraClassName={styles.expand}
        onClick={handleClickLink}
      />
    </div>
  );
};
