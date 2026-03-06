import { VideoTag, InformationTab } from "@/shared/lib/information";

export const tagData: VideoTag[] = [
  {
    id: "featured",
    name: "Featured",
    color: "rgb(255, 232, 102)",
  },
  {
    id: "deprecated",
    name: "Deprecated",
    color: "rgb(255, 63, 63)",
  },
  {
    id: "all-devices",
    name: "All Devices",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "mobile",
    name: "Mobile",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "pc",
    name: "PC",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "console",
    name: "Console",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "pc-console",
    name: "PC/Console",
    color: "rgb(140, 179, 255)",
  },
];

export const informationData: InformationTab[] = [
  {
    id: "general",
    name: "General",
    faq: {
      questions: [
        {
          question: "Is Better Bedrock Safe?",
          answer:
            "Yes, Better Bedrock is 100% safe and malware-free! For over 3 years, we have provided secure content without any data tracking. Check our proven reputation and download history on Discord or YouTube (@axmbro) to see why thousands of users trust us.",
        },
        {
          question: "Why do my Mod Menu options reset?",
          answer:
            "Mod Menu changes are temporary. To save your settings permanently, you must edit the config file. Visit the information page for a video tutorial.",
        },
        {
          question: "How to save Better Bedrock settings?",
          answer:
            "Visit the information page for a video tutorial. The game doesn't support UI-to-file saving, manual config is the way to go! Simply edit your config file to lock in your favorite features. It's a quick, one-time setup that ensures your Better Bedrock experience is exactly how you like it.",
        },
        {
          question: "Video Tutorials and Setup Guides",
          answer:
            "All our video guides are located in the Tutorials section below. Scroll down and choose your topic from the top selection menu for instant help.",
        },
        {
          question: "What type of content we provide?",
          answer:
            "Our main focus is Better Bedrock Texture pack and its extension packs. We offer just texture packs - no apps for any device. We also allow people to post their projects directly on our platform - through our ads system creators receive revenue. Check betterbedrock.com/monetization for more information.",
        },
        {
          question: "Is there any app for Phone or Computer?",
          answer:
            "No, our main focus is on providing texture packs for Minecraft Bedrock Edition.",
        },
        {
          question: "Why do some mods break?",
          answer:
            "Usually the heavy mods may disappear or not function properly. It's mostly because of using many texture packs at once; if that's the case, try to disable some packs or use BB alone. Usually it's related to complex packs and unfortunately there is no fix for this. Also make sure to follow the correct pack order - visible in the resource packs settings tab.",
        },
        {
          question: "Does the Better Bedrock Texture Pack break achievements?",
          answer:
            "No, due to the fact that it's just a texture pack, it doesn't affect achievements in any way. You can use it without worry. It applies to the main texture pack and extensions.",
        },
        {
          question: "Which devices support Better Bedrock?",
          answer:
            "Better Bedrock works on all platforms that run Minecraft Bedrock Edition, including Windows, Android, iOS, and consoles.",
        },
        {
          question: "How to Open Better Bedrock Mod Menu?",
          answer:
            "Open your pause screen and double-click the 'Mod Menu' button in the bottom-left corner.",
        },
        {
          question: "Mod Menu button is not showing?",
          answer:
            "Try to change the subpack option to 'Mode: Default'. If you are using a controller, switch to 'Mode: Controller' to see the button. Always check the subpack option descriptions to understand how each setting functions. If none of these solutions work, please try to use only this pack.",
        },
        {
          question: "Where to report a bug?",
          answer:
            "You can report bugs on our official Discord server in the #bug-reports channel. Please provide as much detail as possible to help us resolve the issue.",
        },
        {
          question:
            "I have an idea for a new feature! Where should I share it?",
          answer:
            "We love hearing your ideas! Please share your feature requests in the #suggestions channel on our Discord server.",
        },
        {
          question: "Troubleshooting free download issues",
          answer:
            "Downloads often fail due to IP changes, adblockers, or browser restrictions in Brave or Safari. For a successful download, use a stable connection, do not use bypassers, enable popups, and follow the redirect instructions without skipping ads.",
        },
        {
          question: "Fix not opening download window",
          answer:
            "Blocked popups are the main reason the download window won't open. Enable them in your browser and turn off adblockers to ensure a smooth transition to the download file.",
        },
        {
          question: "Unsupported Features and Mods list",
          answer:
            "We do not support mods that require injectors or external launchers. Some of them are also not possible due to game limits, here is the list: 1. Autosprint 2. Zoom 3. Motion blur 4. Freelook 5. Pocket UI support 6. Small GUI scale support (0) 7. Item physics 8. Injector/launcher 9. Very accurate FPS/CPS/combo counters 10. Small chunk render (1/2) 11. Chunk border 12. Player hitbox 13. Health indicator 14. Actually working Minimap 15. 3D player models 16. 'Free' Hacks (fake texts etc.) 17. Clickable links on HUD chat 18. Dynamic lighting and things related to shaders 19. Nametags in 3rd person 20. Armor HUD durability in HUD 21. Friend List 22. Auto GG 23. Replay Mod 24. In-game night vision 25. Custom buttons on HUD (like quick drop etc.) 26. Sound subtitles 27. Pack display 28. Voice Mod",
        },
        {
          question: "What is a subpack?",
          answer:
            "Subpacks are Minecraft's way of providing texture pack customization. You can access these options by clicking the gear icon on the Better Bedrock pack within your Global Resources 'Active' menu.",
        },
        {
          question: "Can I get Better Bedrock on the Marketplace?",
          answer:
            "No, Better Bedrock is a website-exclusive! We stay off the Marketplace, because it does not support essential features that we use. Download it directly from us to enjoy the full, unrestricted version of the pack.",
        },
        {
          question: "When is the next Better Bedrock update coming out?",
          answer:
            "Want the latest Better Bedrock updates? Every new version is announced first on our official Discord server in the #announcements channel. Join the community to never miss a release!",
        },
        {
          question: "How to Join the Better Bedrock Discord Staff Team",
          answer:
            "Our Discord helper team is currently full. Stay tuned to the #announcements channel on our server to be the first to know when we open applications for new staff members.",
        },
      ],
    },

    videos: {
      description:
        "Step-by-step video guides for general category. Switch tabs above to find tutorials for your device.",
      videos: [
        {
          title: "How to Download Packs?",
          description: "Quick guide for download & installation.",
          link: "https://youtu.be/bHlLB_tksi0",
          tags: ["all-devices", "featured"],
        },
        {
          title: "Waypoints Setup",
          description: "Install the extension & follow the steps.",
          link: "https://youtu.be/HLJQOW-TkeU",
          tags: ["all-devices", "featured"],
        },
        {
          title: "Enable Controller Mode",
          description: "Use the subpacks to set the modes.",
          link: "https://youtu.be/1wpWo-kY8UE",
          tags: ["all-devices"],
        },
      ],
    },
  },

  {
    id: "mobile",
    name: "Mobile Devices",
    faq: {
      questions: [
        {
          question: "I can't use data folder during config editing?",
          answer:
            "This is a strict limit of phone operating system - they don't allow access to certain directories. Therefore, you need to use the pre-config editing method. It's available below as a tutorial video.",
        },
        {
          question: "How to fix inventory not opening?",
          answer:
            "It's likely due to using Pocket UI. Switch your UI Profile to 'Classic' in the Video settings for full compatibility and a better experience.",
        },
        {
          question: "Why are my hearts and hunger bar missing?",
          answer:
            "They are only visible in Classic UI. Switch your UI Profile from Pocket to Classic in Settings > Video.",
        },
      ],
    },

    videos: {
      description:
        "Step-by-step video guides for mobile category. Switch tabs above to find tutorials for your device.",
      videos: [
        {
          title: "Pack Installation and Import",
          description: "Fast guide to import .mcpack files.",
          link: "https://youtu.be/dOTW4ffn9rA",
          tags: ["mobile"],
        },
        {
          title: "Manual Config Guide",
          description: "Save or edit mod states in the config.",
          link: "https://youtu.be/rPNfW_swUp4",
          tags: ["mobile", "featured"],
        },
        {
          title: "Pre-edit Config Guide",
          description:
            "Optional method for editing config if the first method fails.",
          link: "https://youtu.be/OIuGRJk_rbA",
          tags: ["mobile", "featured"],
        },
      ],
    },
  },

  {
    id: "other",
    name: "PC/Other Devices",
    faq: {
      questions: [
        {
          question: "(CONSOLE) How to Get Better Bedrock on Xbox and PS4/PS5?",
          answer:
            "While Xbox is more accessible for file imports, PlayStation users may face more restrictions. For the most reliable and up-to-date methods, check tutorial videos below.",
        },
        {
          question: "(CONSOLE) How to change config on Xbox and PlayStation?",
          answer:
            "Customizing Better Bedrock on consoles requires a workaround. Check 'Pre-edit config guide' to prepare your files on a mobile device or PC before transferring them. This manual process is the only way to get custom settings on Xbox and PS4/PS5. Find this tutorial in mobile section.",
        },
        {
          question: "(Controller) How to fix missing mod menu button?",
          answer:
            "It's usually caused by an incorrect Subpack. Please use 'Mode: Controller' to see this Mod Menu button. Check your Global Resources settings and adjust this option.",
        },
        {
          question:
            "(Controller) How to Fix Mod Menu Ghosting on Container Screens?",
          answer:
            "If the Mod Menu remains visible while browsing your inventory, it's a known conflict between custom UI layers and Minecraft's Controller Mode. To ensure a clean interface, try adjusting your configuration via a mobile device or PC and using the standard UI subpack instead.",
        },
      ],
    },

    videos: {
      description:
        "Step-by-step video guides for pc/other devices category. Switch tabs above to find tutorials for your device.",
      videos: [
        {
          title: "Pack Installation and Import",
          description: "Fast guide to import .mcpack files.",
          link: "https://youtu.be/QV67l-vrlSI",
          tags: ["pc"],
        },
        {
          title: "Manual Config Guide",
          description: "Save or edit mod states in the config.",
          link: "https://youtu.be/QG9vJq6UPGA",
          tags: ["pc", "featured"],
        },
        {
          title: "Pre-edit Config on Console",
          description: "Optional method for editing config on console.",
          link: "https://youtu.be/cHkiufOsRrY",
          tags: ["console"],
        },
        {
          title: "Enable Autosprint",
          description: "Adjust keybinds to always sprint on PC.",
          link: "https://youtu.be/O3D6bNQW-Lc",
          tags: ["pc"],
        },
        {
          title: "Create Custom Themes",
          description:
            "Advanced guide for full UI customization in Better Bedrock.",
          link: "https://youtu.be/GRQahMrdEoY",
          tags: ["pc"],
        },
      ],
    },
  },
];
