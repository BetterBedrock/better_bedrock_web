import {
  Avatar,
  AvatarDetailsProps,
  AvatarProfileProps,
  AvatarProps,
} from "./avatar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type AvatarStoryArgs = AvatarProps & AvatarProfileProps & AvatarDetailsProps;

const meta: Meta<AvatarStoryArgs> = {
  title: "Components/Avatar",
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

// const profileArgTypes: Partial<
//   ArgTypes<React.ComponentProps<typeof Avatar.Profile>>
// > = {
//   size: {
//     control: "select",
//     options: ["small", "medium", "large"],
//   },
//   link: { control: "boolean" },
//   profilePage: { control: "boolean" },
// };

// const detailsArgTypes: Partial<
//   ArgTypes<React.ComponentProps<typeof Avatar.Details>>
// > = {
//   at: { control: "boolean" },
//   bold: { control: "boolean" },
//   center: { control: "boolean" },
//   link: { control: "boolean" },
// };

// // --- Avatar.Profile ---

// export const ProfileSteve: StoryObj<typeof Avatar.Profile> = {
//   render: (args) => <Avatar.Profile {...args} />,
//   argTypes: profileArgTypes,
//   args: {
//     name: "Steve",
//     link: false,
//     size: "large",
//     profilePage: false,
//   },
// };

// // --- Avatar.Details ---

// export const DetailsDefault: StoryObj<typeof Avatar.Details> = {
//   render: (args) => <Avatar.Details {...args} />,
//   argTypes: detailsArgTypes,
//   args: {
//     name: "Steve",
//     link: false,
//     at: false,
//     bold: false,
//     center: false,
//   },
// };

// export const DetailsWithAt: StoryObj<typeof Avatar.Details> = {
//   render: (args) => <Avatar.Details {...args} />,
//   argTypes: detailsArgTypes,
//   args: {
//     name: "Steve",
//     at: true,
//     bold: false,
//     center: false,
//     link: false,
//   },
// };

// export const DetailsBold: StoryObj<typeof Avatar.Details> = {
//   render: (args) => <Avatar.Details {...args} />,
//   argTypes: detailsArgTypes,
//   args: {
//     name: "Steve",
//     bold: true,
//     at: false,
//     center: false,
//     link: false,
//   },
// };

// export const DetailsWithChildren: StoryObj<typeof Avatar.Details> = {
//   render: (args) => (
//     <Avatar.Details {...args}>
//       <Rating simple rating={4.5} />
//     </Avatar.Details>
//   ),
//   argTypes: detailsArgTypes,
//   args: {
//     name: "Steve",
//     link: false,
//     at: false,
//     bold: false,
//     center: false,
//   },
// };

// // --- Combined Profile + Details ---

// export const FullAvatarSteve: Story = {
//   render: () => (
//     <Avatar name="Steve">
//       <Avatar.Profile name="Steve" link={false} size="large" />
//       <Avatar.Details name="Steve" bold link={false} />
//     </Avatar>
//   ),
// };
