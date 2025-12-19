import { VideoTag, InformationTab } from "@/features/shared/types/information";

export const tagData: VideoTag[] = [
    {
        id: "featured",
        name: "Featured",
        color: "rgb(255, 232, 102)",
    },
    {
        id: "deprected",
        name: "Deprected",
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
            description: "General topic FAQ. If you still have questions, please check out our Discord server!",
            questions: [
                {
                    question: "Are all Better Bedrock content safe?",
                    answer: "DEFINITELY YES! The Texture Pack doesn't contain any harmful files or executables. We also DO NOT collect any data from our users. This project exists since 3 years and we never put here any malicious files or anything. You can track whole history on our discord or on youtube @axmbro. Here you will find all previous versions, starting with version 1, as proof of security and reputation!",
                },
                {
                    question: "Is it available on the Marketplace?",
                    answer: "No, and probably it will never be. The Texture Pack is available only on our website and we do not plan to publish it here, because you wouldn't be able to adjust the config. And that's the main issue and reason.",
                },
                {
                    question: "Why do my Mod Menu options reset?",
                    answer: "To save these options and adjust extra ones use config. Scroll down to Tutorials section and follow steps from here.",
                },
                {
                    question: "Why you cannot just save config in game?",
                    answer: "Unfortunately game doesn't provide any functions to change files and actually save mods states through UI. We are forced to manage it through config file, and adjusting it manually. There is no way to change it right now...",
                },
                {
                    question: "What devices are supported by Better Bedrock?",
                    answer: "The Texture Pack is available for all devices that are able to import Texture Packs.",
                },
                {
                    question: "How do I open the Mod Menu?",
                    answer: `Simply open the pause menu and double click the "Mod Menu" button in bottom left corner.`,
                },
                {
                    question: "How do I download Better Bedrock content?",
                    answer: "Simply navigate to downloads page and click item you want to download!",
                },
                {
                    question: "Why I cannot see Mod Menu button?",
                    answer: "It's because you probably use 'UI Mode with Mods', and therefore button is hidden and it's intentional. If you use controller input, then mod menu is only available to click in the 'Controler Mode'. Generally make sure to read the description of subpack options to understand how each mdoe work and what they do.",
                },
                {
                    question: "Where are the tutorial videos?",
                    answer: "Just scroll down a bit! And make sure to select proper option at the top for your topic.",
                },
                {
                    question: `Why did the free download process fail?`,
                    answer: `It's due to several potential issues. Here are some possible reasons: 1. You used bypass services to skip the ads. 2. While downloading one file from our website, you clicked to begin another download - wait patiently. 3. You waited too long on the linkvertise page before clicking button "Get Better Bedrock" to redirect. 4. You changed your ip address (or used a VPN) while being on our site. 5. Your internet connection was too slow to send a request to our servers. Minimum download speed: ~0.33MB/s. 6. You have adblockers or any extensions blocking requests to our servers. (Browsers such as Brave, or Safari can also sometimes prevent requests) 7. You have blocked popups so the download page cannot open.`,
                },
                {
                    question: `Why doesn't the free download open another window?`,
                    answer: `You probably have blocked popups so the download page cannot open, we recommend to disable it or try using other download methods :3 Also if your page is loading too long, then make sure you have disabled adblockers.`,
                },
                {
                    question: "What is a subpack?",
                    answer: `A subpack is Minecraft name for texture pack options. To access it, open settings, go to "Global Resources", select "ACTIVE" tab, select Better Bedrock and then click gear icon in bottom right corner.`,
                },
                {
                    question: "What Mods won't be added to Better Bedrock Texture Pack?",
                    answer: "This is list of features that are impossible to add, or may be a bit useless, or simply may cause performance issues: 1. Autosprint 2. Zoom 3. Motion blur 4. Freelook 6. Pocket UI support 7. Small gui scale support (0) 8. Item physics 9. Injector/launcher 10. Very accurate fps/cps/combo counters 11. Small chunk render (1/2) 12. Chunk border 13. Player hitbox 14. Health indicator 15. Actually working Minimap 16. 3D player models 17. 'Free' Hacks (fake texts etc.) 18. Clickable links on HUD chat 19. Dynamic lighting and things related to shaders 20. Nametags in 3rd person 21. Dynamic lighting and things related to shaders 22. Armor Hud durability in HUD 23. Friend List 24. Auto GG 25. Replay Mod 26. In-game night vision 27. Custom buttons on hud (like quick drop etc.) 28. Sound subtitles 29. Pack display 30. Voice Mod",
                },
                {
                    question: "When will the new versions be released?",
                    answer: "New content will be always announced on our Discord server at #announcements. Make sure to join us to stay updated!",
                },
                {
                    question: "Can I become a helper on Discord?",
                    answer: "In short, we see no need for more helpers on our Discord server. If we need more people, we will let you know at #announcements on our Discord server.",
                },
            ],
        },

        videos: {
            description: "List of general topic videos that explain the features and tools provided by Better Bedrock. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
            videos: [
                {
                    title: "Download stuff from webiste",
                    description: "Simple tutorial about downloading process.",
                    link: "https://youtu.be/bHlLB_tksi0",
                    tags: ["all-devices", "featured"],
                },
                {
                    title: "How to use waypoints",
                    description: "Download extension pack and follow steps in pack description.",
                    link: "https://youtu.be/HLJQOW-TkeU",
                    tags: ["all-devices", "featured"],
                },
                {
                    title: "Enable Controller Mode",
                    description: "Use the subpack options to set the desired mode.",
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
            description: "Mobile devices FAQ. If you still have questions, please check out our Discord server!",
            questions: [
                {
                    question: "Why can't I open Inventory Screen",
                    answer: "This issue usually appears when pocket UI is used. We do not fully support this mode and we recommend using second one - the classic UI. To change it open sttings, navigate to video, scroll down until you see UI Profile option, then click and change to classic UI, problem should be resolved.",
                },
                {
                    question: "Why are hearts not visible?",
                    answer: "We do not support pocket UI, please change it to classic UI",
                },
            ],
        },

        videos: {
            description: "List of videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
            videos: [
                {
                    title: "Download and import the Texture Packs",
                    description: "Classic installation tutorial.",
                    link: "https://youtu.be/dOTW4ffn9rA",
                    tags: ["mobile"],
                },
                {
                    title: "Manually edit config",
                    description: "Everything is explained in video. All ways, tools etc.",
                    link: "https://youtu.be/rPNfW_swUp4",
                    tags: ["mobile", "featured"],
                },
                {
                    title: "Edit config before importing pack",
                    description: "It's optional way to save config - may be used to import pack to console.",
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
            description: "PC/Other devices FAQ. If you still have questions, please check out our Discord server!",
            questions: [
                {
                    question: "(CONSOLE) How to download packs on console.",
                    answer: `At the beginning XBOX is more flexible than PS, so playstation may be more limited and less accessible. For xbox, open browser, search for this website, download pack and try to import it, or just transfer packs from other device to xbox and through files either run it by minecraft or put in files. If this won't help, then I we recommend to check out this tutorial: https://youtu.be/cHkiufOsRrY`,
                },
                {
                    question: "(CONSOLE) How to change config on console.",
                    answer: `There isn't any way to adjust config on consoles, because it requires editing txt pack files, but there is one way. In short, open "Mobile Devices" tab and search for "Edit config before importing pack" or #3 tutorial video. Follow this until you see part about zipping created folder. After that you need to put this created file, firstly named something.zip and then something.mcpack, to console files and open BB from here. Yes we know that it's slow process, but we still provide methods to use our pack on consoles. We recommend adjusting config on phone or console and then changing this on PC/Phone like on tutorial.`,
                },
                {
                    question: "(Controller) Why is the Mod Menu button missing?",
                    answer: `If you use pack without subpack option selected to "Controller Mode", then that's the reason. Enable this option and make sure to read important note about this mode - in short, controller input is really problematic and there isn't any way to make it work perfectly.`,
                },
                {
                    question: "(Controller) Why is the Mod Menu visible in the background on container screens?",
                    answer: `Container Screens means e.g. inventory screen or pause screen, it's just in background and It's common problem when using controller input and "Controller Mode" subpack. Again, controller input is really problematic and there isn't any way to make it work perfectly and that's why we recommend adjusting config and using other Modes to prevent this behavior.`,
                },
            ],
        },

        videos: {
            description: "List of videos for PC/Other devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
            videos: [
                {
                    title: "Download and import the Texture Packs",
                    description: "Classic installation tutorial.",
                    link: "https://youtu.be/QV67l-vrlSI",
                    tags: ["pc"],
                },
                {
                    title: "Manually edit config",
                    description: "Save mod states on PC.",
                    link: "https://youtu.be/QG9vJq6UPGA",
                    tags: ["pc", "featured"],
                },
                {
                    title: "Manually edit config on console",
                    description: "Save mod states on console.",
                    link: "https://youtu.be/cHkiufOsRrY",
                    tags: ["console"],
                },
                {
                    title: "Set up autosprint",
                    description: "Simple bind change that works on PC.",
                    link: "https://youtu.be/O3D6bNQW-Lc",
                    tags: ["pc"],
                },
                {
                    title: "Create custom theme",
                    description: "More complex tutorial about all theme customization available in BB.",
                    link: "https://youtu.be/GRQahMrdEoY",
                    tags: ["pc"],
                },
            ],
        },
    },
];