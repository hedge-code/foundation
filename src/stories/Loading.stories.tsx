import type { Meta, StoryObj } from "@storybook/react";

import React from 'react';

import { Loading } from '../components';

const meta: Meta<typeof Loading> = {
  title: "Foundation/Loading",
  component: Loading,
  decorators: [(Story) => <div className="h-16"><Story/></div>],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const BasicSelect: Story = {};