import { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "stories/navigation/Pagination";

const meta = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    total: 300,
  },
};
