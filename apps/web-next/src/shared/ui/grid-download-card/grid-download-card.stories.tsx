import { ProjectType } from "@/shared/lib/openapi";
import { GridDownloadCard } from "@/shared/ui/grid-download-card/grid-download-card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof GridDownloadCard> = {
  title: "Layout/Grid Download Card",
  component: GridDownloadCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(ProjectType),
    },
    lastChanged: {
      control: "date",
    },
  },
  args: {
    id: "better_bedrock_texture_pack",
    title: "Better Bedrock Texture Pack",
    thumbnail:
      "static/public/better_bedrock_texture_pack/release/1771183732282-579674116.png",
    tags: ["UI", "Utility"],
    type: "texturepacks",
    lastChanged: "2026-02-15T19:35:58.847Z",
    betterBedrockContent: false,
    submitted: false,
    userName: "iDarkQ",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
