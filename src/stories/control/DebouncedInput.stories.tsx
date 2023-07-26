import { Meta, StoryObj } from "@storybook/react";

import { DebouncedInput } from "stories/control/DebouncedInput";

const meta = {
  title: "Components/Control/Debounced Input",
  component: DebouncedInput,
  tags: ["autodocs"],
} satisfies Meta<typeof DebouncedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
