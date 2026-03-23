import { bedrockSizes } from "@/shared/lib/utils";
import { Rating } from "@/shared/ui/rating";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Rating> = {
  title: "Inputs/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: bedrockSizes,
    },
    onUpdate: {
      control: "object",
    },
    onReset: {
      control: "object",
    },
  },
  args: {
    size: "medium",
    simple: false,
    max: 5,
    rating: 3,
    suffix: "stars",
    selectable: false,
    onUpdate: fn(),
    onReset: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};
