import { BedrockText } from "@/shared/ui/bedrock-text";
import {
  Card,
  CardBodyProps,
  CardItemProps,
  CardProps,
  gapSizes,
  GapSize,
} from "./card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type CardTypes = CardProps &
  CardBodyProps &
  CardItemProps & {
    itemGap: GapSize;
    itemsCount: 1 | 2 | 3 | 5 | 10;
  };

const meta: Meta<CardTypes> = {
  title: "Surfaces/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    sub: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    fullWidth: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    negativeMarginBottom: {
      table: { defaultValue: { summary: "false" } },
    },
    negativeMarginTop: {
      table: { defaultValue: { summary: "false" } },
    },
    gap: { control: "select", options: gapSizes },
    itemGap: {
      control: "select",
      options: gapSizes,
      table: { defaultValue: { summary: "xsm" } },
    },
    itemsCount: { control: "select", options: [1, 2, 3, 5, 10] },
  },
  args: {
    itemsCount: 1,
    itemGap: "xsm",
    gap: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const generateItems = (itemsCount: number, gap: GapSize) =>
  Array.from({ length: itemsCount }).map((_, i) => (
    <Card.Item key={++i} gap={gap}>
      <BedrockText color="white" type="h3" font="Minecraft">
        Item {++i}
      </BedrockText>
      <BedrockText color="white">Example Item Content</BedrockText>
    </Card.Item>
  ));

export const Primary: Story = {
  render: ({ gap, itemGap, itemsCount, ...args }) => (
    <Card {...args}>
      <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
    </Card>
  ),
};

export const Sub: Story = {
  render: ({ gap, itemGap, itemsCount, ...args }) => (
    <Card {...args}>
      <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
    </Card>
  ),
  args: {
    sub: true,
  },
};

export const WithDivider: Story = {
  render: ({ gap, itemGap, itemsCount, ...args }) => (
    <Card {...args}>
      <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
      <Card.Divider />
      <Card.Body>{generateItems(itemsCount, itemGap)}</Card.Body>
    </Card>
  ),
  args: {
    sub: true,
  },
};

export const WithNegativeMargin: Story = {
  render: ({ sub, gap, itemGap, itemsCount, ...args }) => (
    <>
      <Card sub={true} {...args}>
        <Card.Body gap={gap}>
          <Card.Item gap={itemGap}>
            <BedrockText color="white" font="Minecraft" type="h1">
              Heading
            </BedrockText>
          </Card.Item>
        </Card.Body>
      </Card>
      <Card sub={sub} {...args}>
        <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
        <Card.Divider />
        <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
      </Card>
    </>
  ),
  args: {
    sub: false,
    negativeMarginTop: true,
  },
};

export const WithoutNegativeMargin: Story = {
  render: ({ sub, gap, itemGap, itemsCount, ...args }) => (
    <>
      <Card sub={true} {...args}>
        <Card.Body gap={gap}>
          <Card.Item gap={itemGap}>
            <BedrockText color="white" font="Minecraft" type="h1">
              Heading
            </BedrockText>
          </Card.Item>
        </Card.Body>
      </Card>
      <Card sub={sub} {...args}>
        <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
        <Card.Divider />
        <Card.Body gap={gap}>{generateItems(itemsCount, itemGap)}</Card.Body>
      </Card>
    </>
  ),
  args: {
    sub: false,
    negativeMarginTop: false,
  },
};
