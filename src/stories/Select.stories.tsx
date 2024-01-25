import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Select } from "../components";

const meta: Meta<typeof Select> = {
  title: "Foundation/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const BasicSelect: Story = {
  args: {
    label: "Example",
    children: (
      <>
        <option>Option One</option>
        <option>Option Two</option>
      </>
    ),
  },
};

export const WithStartValue: Story = {
  args: {
    label: "Example",
    value: "val1",
    children: (
      <>
        <option value="val1">Option One</option>
        <option value="val2">Option Two</option>
      </>
    ),
  },
};
