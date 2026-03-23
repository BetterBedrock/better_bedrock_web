import {
  Avatar,
  AvatarDetailsProps,
  AvatarProfileProps,
  AvatarProps,
} from "./avatar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type AvatarStoryArgs = AvatarProps & AvatarProfileProps & AvatarDetailsProps;

const meta: Meta<AvatarStoryArgs> = {
  title: "Primitives/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    name: { control: "text" },
    size: { control: "select", options: ["small", "medium", "large"] },
    link: { control: "boolean" },
    bold: { control: "boolean" },
    at: { control: "boolean" },
    center: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Composite (full Avatar) ---

export const FullAvatar: Story = {
  render: ({ name, size, link, bold, at, center }) => (
    <Avatar>
      <Avatar.Profile size={size} name={name} link={link} />
      <Avatar.Details
        name={name}
        link={link}
        bold={bold}
        at={at}
        center={center}
      />
    </Avatar>
  ),
  args: {
    name: "Steve",
    size: "small",
  },
};

export const Profile: Story = {
  render: ({ name, size, link }) => (
    <Avatar>
      <Avatar.Profile size={size} name={name} link={link} />
    </Avatar>
  ),
  args: {
    name: "Steve",
    size: "small",
  },
  argTypes: {
    bold: { table: { disable: true } },
    at: { table: { disable: true } },
  },
};

export const ProfileSizes: Story = {
  render: ({ name, link }) => (
    <Avatar>
      <Avatar.Profile size="small" name={name} link={link} />
      <Avatar.Profile size="medium" name={name} link={link} />
      <Avatar.Profile size="large" name={name} link={link} />
    </Avatar>
  ),
  args: {
    name: "Steve",
  },
  argTypes: {
    bold: { table: { disable: true } },
    at: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export const Details: Story = {
  render: ({ name, bold, at, center, link }) => (
    <Avatar>
      <Avatar.Details
        name={name}
        link={link}
        bold={bold}
        at={at}
        center={center}
      />
    </Avatar>
  ),
  args: {
    name: "Steve",
    size: "small",
  },
  argTypes: {
    size: { table: { disable: true } },
  },
};