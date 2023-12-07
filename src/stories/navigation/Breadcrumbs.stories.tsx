import { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "stories/navigation/Breadcrumbs";

const meta = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: "/foo/1/bar/2",
  },
};
