import { GridDownloadCard } from "@/shared/ui/grid-download-card/grid-download-card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof GridDownloadCard> = {
  title: "Components/GridDownloadCard",
  component: GridDownloadCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    project: {
      control: "object",
    },
  },
  args: {
    project: {
      id: "better_bedrock_texture_pack",
      title: "Better Bedrock Texture Pack",
      thumbnail:
        "static/public/better_bedrock_texture_pack/release/1771183732282-579674116.png",
      tags: [],
      type: "texturepacks",
      lastChanged: "2026-02-15T19:35:58.847Z",
      betterBedrockContent: false,
      draft: false,
      userId: "cmfli6b7f0000h20w7u2ipt3l",
      itemWeight: 0.6159749999999999,
      submitted: false,
      user: {
        name: "iDarkQ",
        rating: 5,
      },
      rating: {
        average: 0,
        count: 0,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};
