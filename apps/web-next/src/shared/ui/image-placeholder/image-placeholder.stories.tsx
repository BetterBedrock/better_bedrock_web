import { ProjectType } from "@/shared/lib/openapi";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder/image-placeholder";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ImagePlaceholder> = {
  title: "Data Display/Image Placeholder",
  component: ImagePlaceholder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
