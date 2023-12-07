import { Meta, StoryObj } from "@storybook/react";

import { TwoLineLink } from "stories/control/TwoLineLink";

const meta = {
  title: "Components/Control/Two Line Link",
  component: TwoLineLink,
  tags: ["autodocs"],
} satisfies Meta<typeof TwoLineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { href: "https://diamond.ac.uk", title: "Link Title", children: "Link Description" },
};

export const Disabled: Story = {
  args: {
    href: "https://diamond.ac.uk",
    title: "Link Title",
    children: "Link Description",
    isDisabled: true,
  },
};
