import { Meta, StoryObj } from "@storybook/react";

import { DarkModeButton } from "stories/control/DarkModeButton";

const meta = {
  title: "Components/Control/DarkModeButton",
  component: DarkModeButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DarkModeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const darkModeButton: Story = {
  args: {},
};
