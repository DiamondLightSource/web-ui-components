import { Meta, StoryObj } from "@storybook/react";

import { ImageCard } from "stories/visualisation/Image";

const meta = {
  title: "Components/Visualisation/Image",
  component: ImageCard,
  tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Title",
    src: "/image.png",
    width: "20%",
  },
};
