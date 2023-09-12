import { Meta, StoryObj } from "@storybook/react";

import { User } from "stories/control/User";

const meta = {
  title: "Components/Control/User",
  component: User,
  tags: ["autodocs"],
} satisfies Meta<typeof User>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: { user: null },
};

export const LoggedIn: Story = {
  args: { user: { name: "Name", fedid: "FedID" } },
};
