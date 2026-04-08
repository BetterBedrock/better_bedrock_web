import { ModCard } from "@/shared/ui/mod-card/mod-card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ModCard> = {
  title: "Layout/Mod Card",
  component: ModCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    imageSrc: {
      control: "select",
      options: ["/images/sand.png", "/images/forest.png", "/images/city.png"],
    },
    popup: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Armor HUD",
    imageSrc: "/images/sand.png",
    tags: ["UI", "Combat"],
    defaultEnabled: true,
  },
  render: (args) => <ModCard {...args} tags={args.tags} />,
};
