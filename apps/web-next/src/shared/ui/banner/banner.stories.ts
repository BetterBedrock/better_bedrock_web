import { Banner } from "./banner";
import type { ArgTypes, Meta, StoryObj } from "@storybook/nextjs-vite";

const bannerArgTypes: Partial<ArgTypes<React.ComponentProps<typeof Banner>>> = {
    variant: {
        control: "select",
        options: ["info", "neutral", "important", "error", "success"],
    },
    message: { control: "text" },
};

const meta = {
    title: "Feedback/Banner",
    component: Banner,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: bannerArgTypes,
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        variant: "info",
        message: "This is an info banner.",
    },
};

export const Neutral: Story = {
    args: {
        variant: "neutral",
        message: "This is a neutral banner.",
    },
};

export const Important: Story = {
    args: {
        variant: "important",
        message: "This is an important banner.",
    },
};

export const Error: Story = {
    args: {
        variant: "error",
        message: "Something went wrong. Please try again.",
    },
};

export const Success: Story = {
    args: {
        variant: "success",
        message: "Action completed successfully!",
    },
};