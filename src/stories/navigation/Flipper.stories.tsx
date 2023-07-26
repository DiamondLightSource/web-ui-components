import { StoryObj, Meta } from "@storybook/react";

import { Flipper } from "stories/navigation/Flipper";

const meta = {
  title: "Components/Navigation/Flipper",
  component: Flipper,
  tags: ["autodocs"],
} satisfies Meta<typeof Flipper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Smallest: Story = {
  args: {
    total: 10,
    size: "xs",
  },
};

export const Medium: Story = {
  args: {
    total: 10,
    size: "md",
  },
};
