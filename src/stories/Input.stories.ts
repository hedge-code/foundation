import type { Meta, StoryObj } from "@storybook/react";
import { Input } from '../components';

const meta: Meta<typeof Input> = {
  title: "Foundation/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["input", "textarea", 'email'] },
  },
};
export default meta;

type Story = StoryObj<typeof Input>

export const BasicInput: Story = {
  args: {
    label: "Example",
  },
};

export const InputWithText: Story = {
  args: {
    label: "Example",
    value: 'value'
  }
}

export const BasicTextarea: Story = {
  args: {
    label: "Example",
    type: "textarea",
  },
};

export const TextareaWithText: Story = {
  args: {
    label: "Example",
    type: "textarea",
    value: 'value'
  },
};
