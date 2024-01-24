import { Input } from "../components";

export default {
  title: "Foundation/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["input", "textarea"] },
  },
};

export const BasicInput = {
  args: {
    label: "Example",
    type: "input"
  },
};

export const BasicTextarea = {
  args: {
    label: "Example",
    type: "textarea",
  },
};
