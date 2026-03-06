import { Button } from './button';
import {BedrockText} from "@/shared/ui/bedrock-text";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['green', 'white', 'dark', 'gold', 'red'],
        },
        lockClicking: { control: 'boolean' },
        isClicked: { control: 'boolean' },
        isToggled: { control: 'boolean' },
        playSound: { control: 'boolean' },
        center: { control: 'boolean' },
        width: { control: 'text' },
        height: { control: 'text' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Basic Variants ---

export const Primary: Story = {
    args: {
        type: 'green',
        children: 'Click Me',
    },
};

export const White: Story = {
    args: {
        type: 'white',
        children: 'White Button',
    },
};

export const Dark: Story = {
    args: {
        type: 'dark',
        children: 'Dark Button',
    },
};

export const Gold: Story = {
    args: {
        type: 'gold',
        children: 'Gold Button',
    },
};

export const Red: Story = {
    args: {
        type: 'red',
        children: 'Red Button',
    },
};

// --- States ---

export const Clicked: Story = {
    args: {
        type: 'green',
        isClicked: true,
        children: 'Selected',
    },
};

export const Toggled: Story = {
    args: {
        type: 'green',
        isToggled: true,
        children: 'Toggled',
    },
};

export const Locked: Story = {
    args: {
        type: 'dark',
        lockClicking: true,
        children: 'Locked',
    },
};

export const Centered: Story = {
    args: {
        type: 'green',
        center: true,
        children: 'Centered Content',
        width: '200px',
    },
};
