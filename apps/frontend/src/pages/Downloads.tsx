import { useNavigate } from "react-router";
import { BedrockText } from "../components/bedrock/text/bedrock-text";
import { Button } from "../components/bedrock/button/button";
import Footer from "../components/bedrock/Footer";
import "./Downloads.css";

const Downloads = () => {
  const naviagte = useNavigate();

  // TODO: Replace it with css
  // const isSmallScreen = useMediaQuery({
  //   query: "(max-width: 500px)",
  // });
  const isSmallScreen = false;

  return (
    <>
      <main id="downloads-page">
        <section id="downloads">
          <div className="downloads-content-wrapper">
            {DOWNLOAD_LIST.map((downloadCategory, categoryIndex) => (
              <>
                <div className="download-element">
                  <hgroup>
                    <BedrockText
                      type={"h1"}
                      text={downloadCategory.title}
                      color="white"
                      font="Minecraft"
                      margin="20px 0px 0px 0px"
                      textAlign="center"
                    ></BedrockText>
                    <BedrockText
                      type={"p"}
                      textAlign="center"
                      color="white"
                      margin="0px 0px 20px"
                      text={downloadCategory.description}
                    ></BedrockText>
                  </hgroup>
                  {downloadCategory.items.map((downloadItem, itemIndex) => (
                    <Button
                      text={downloadItem.title}
                      width={"100%"}
                      height={"48px"}
                      type={
                        downloadItem?.alwaysGreenButton
                          ? "alwaysGreen"
                          : "alwaysWhite"
                      }
                    ></Button>
                  ))}
                </div>
              </>
            ))}
          </div>
          <Footer width="100%"></Footer>
        </section>
      </main>
    </>
  );
};

export const DOWNLOADS_IDS = {
  betterBedrockClientV73: "better_bedrock_texture_pack_v7.4.mcpack",
  betterBedrockClientV72: "better_bedrock_texture_pack_v7.2.mcpack",
  betterBedrockClientV711: "better_bedrock_texture_pack_v7.1.1.mcpack",
  betterBedrockClientV71: "better_bedrock_texture_pack_v7.1.mcpack",
  betterBedrockClientV7: "better_bedrock_texture_pack_v7.0.mcpack",
  betterBedrockApp: "better_bedrock_app.apk",
  betterBedrockWindowsClientV1: "better_bedrock_client_v1.exe",

  betterBedrockClientV6: "better_bedrock_client_v6.mcpack",

  betterBedrockClientV5ErrorFix:
    "better_bedrock_client_v5_error_fix_2.0.mcpack",
  betterBedrockClientV5Patch: "better_bedrock_client_v5_patch.mcpack",
  betterBedrockClientV5Config: "better_bedrock_client_v5_config.mcpack",
  betterBedrockClientV5: "better_bedrock_client_v5.mcpack",

  betterBedrockClientV4Patch: "better_bedrock_client_v4_patch.mcpack",
  betterBedrockClientV4Lite: "better_bedrock_client_v4_lite.mcpack",
  betterBedrockClientV4: "better_bedrock_client_v4.mcpack",

  betterBedrockClientV3: "better_bedrock_client_v3.mcpack",

  betterBedrockClientV2: "better_bedrock_client_v2.mcpack",

  betterBedrockClientV1: "better_bedrock_client_v1.mcpack",

  murderDetectorV31: "murder_detector_v3.1.mcpack",
  murderDetectorV30: "murder_detector_v3.0.mcpack",
  murderDetectorV20: "murder_detector_v2.0.mcpack",

  betterBedrockBetterFogs: "better_bedrock_better_fogs.mcpack",
  betterBedrockCleanGlass: "better_bedrock_clean_glass.mcpack",
  betterBedrockCleanWater: "better_bedrock_clean_water.mcpack",
  betterBedrockDarkMode: "better_bedrock_dark_mode.mcpack",
  betterBedrockDarkUI: "better_bedrock_dark_ui.mcpack",
  betterBedrockFullGrass: "better_bedrock_full_grass.mcpack",
  betterBedrockLowFire: "better_bedrock_low_fire.mcpack",
  betterBedrockBetterBlocks: "better_bedrock_better_blocks.mcpack",
  betterBedrockWaypoints: "better_bedrock_waypoints.mcpack",
  betterBedrockParticleLimiter: "better_bedrock_particle_limiter.mcpack",
};

export const DOWNLOAD_LIST = [
  {
    title: "Download",
    description: "Download the latest Better Bedrock content",
    items: [
      {
        title: "Texture Pack V7.4",
        description:
          "The Better Bedrock Texture Pack is a powerful, customizable, and free Texture Pack available on most platforms. Enhance your gameplay with multiple mods and adjustable options!",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV73,
        scaleImage: true,
        alwaysGreenButton: true,
        itemWeight: 10.1,
      },
      {
        title: "Mobile App 1.1.1",
        description:
          "Our mobile app allows you to edit and save config and cape without any 3rd party applications.",
        downloadId: DOWNLOADS_IDS.betterBedrockApp,
        scaleImage: true,
        itemWeight: 27.74,
        alwaysGreenButton: true,
      },
      {
        title: "Client V1",
        description:
          "Our Minecraft client for Windows 10/11. This client includes modules such as Zoom, FreeLook, No Hurt Cam, and more!",
        downloadId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
        scaleImage: true,
        itemWeight: 32.07,
        alwaysGreenButton: true,
      },
    ],
  },
  {
    title: "SIDE PROJECTS",
    description:
      "Download our side texture packs that extend your gameplay in many more ways.",
    items: [
      {
        title: "Murder Detector+ 3.1",
        description:
          "Highlights both roles, murderer and sheriff giving you unfair advantage. Use at your own risk!",
        downloadId: DOWNLOADS_IDS.murderDetectorV31,
        scaleImage: true,
        itemWeight: 0.009,
        imageAssetUrl: "assets/images/downloads/murder_detector_v3.1.png",
        alwaysGreenButton: false,
      },
    ],
  },
  {
    title: "EXTENSIONS",
    description: "Download the latest extensions for the texturepack",
    items: [
      {
        title: "Better Fogs",
        description:
          "Better Fogs extension pack changes all fogs to make them unlimited and better for visibility",
        downloadId: DOWNLOADS_IDS.betterBedrockBetterFogs,
        scaleImage: true,
        itemWeight: 0.01,
        alwaysGreenButton: false,
      },
      {
        title: "Clean Glass",
        description:
          "Glass extension pack changes glass textures to make them look connected and less distracting",
        downloadId: DOWNLOADS_IDS.betterBedrockCleanGlass,
        scaleImage: true,
        itemWeight: 0.011,
        alwaysGreenButton: false,
      },
      {
        title: "Clean Water",
        description:
          "Clean Water extension pack changes water textures to make them more clean and visible",
        downloadId: DOWNLOADS_IDS.betterBedrockCleanWater,
        scaleImage: true,
        itemWeight: 0.002,
        alwaysGreenButton: false,
      },
      {
        title: "Dark UI",
        description:
          "UI extension pack changes most BB textures to darker ones",
        downloadId: DOWNLOADS_IDS.betterBedrockDarkUI,
        scaleImage: true,
        itemWeight: 0.011,
        alwaysGreenButton: false,
      },
      {
        title: "Dark Mode",
        description:
          "The Dark Mode is darker alternative to the vanilla textures",
        downloadId: DOWNLOADS_IDS.betterBedrockDarkMode,
        scaleImage: true,
        itemWeight: 4.69,
        alwaysGreenButton: false,
      },
      {
        title: "Full Grass",
        description:
          "Grass extension pack changes grass textures to make them look connected",
        downloadId: DOWNLOADS_IDS.betterBedrockFullGrass,
        scaleImage: true,
        itemWeight: 0.002,
        alwaysGreenButton: false,
      },
      {
        title: "Low Fire",
        description:
          "Fire extension pack adds lower fire texture on HUD to improve visibility",
        downloadId: DOWNLOADS_IDS.betterBedrockLowFire,
        scaleImage: true,
        itemWeight: 0.014,
        alwaysGreenButton: false,
      },
      {
        title: "Particle Limiter",
        description:
          "Particle Limiter extension pack adds ability to limit particles by 3 options: Disabled, Minimal, All",
        downloadId: DOWNLOADS_IDS.betterBedrockParticleLimiter,
        scaleImage: true,
        itemWeight: 0.109,
        alwaysGreenButton: false,
      },
      {
        title: "Waypoints",
        description:
          "Waypoints extension pack adds ability to create vertical beams around world to improve positioning",
        downloadId: DOWNLOADS_IDS.betterBedrockWaypoints,
        scaleImage: true,
        itemWeight: 0.015,
        alwaysGreenButton: false,
      },
    ],
  },
  {
    title: "ARCHIVED DOWNLOADS",
    description: "Download archived Better Bedrock content",
    items: [
      {
        title: "Better Bedrock V6",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV6,
        scaleImage: true,
        itemWeight: 2.71,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V5",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV5,
        scaleImage: true,
        itemWeight: 17.8,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V5 Error Fix V2.0",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV5ErrorFix,
        scaleImage: true,
        itemWeight: 0.483,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V5 Patch V1.2",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV5Patch,
        scaleImage: true,
        itemWeight: 0.483,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V5 Config",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV5Config,
        scaleImage: true,
        itemWeight: 0.471,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V4 Patch",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV4Patch,
        scaleImage: true,
        itemWeight: 0.486,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V4 Lite",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV4Lite,
        scaleImage: true,
        itemWeight: 49.23,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V4",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV4,
        scaleImage: true,
        itemWeight: 49.42,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V3",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV3,
        scaleImage: true,
        itemWeight: 6.86,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V2",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV2,
        scaleImage: true,
        itemWeight: 4.45,
        alwaysGreenButton: false,
      },
      {
        title: "Better Bedrock V1",
        description: "Archived and discontinued.",
        downloadId: DOWNLOADS_IDS.betterBedrockClientV1,
        scaleImage: true,
        itemWeight: 20.14,
        alwaysGreenButton: false,
      },
    ],
  },
];

export default Downloads;
