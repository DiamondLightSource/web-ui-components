import { Meta, StoryObj } from "@storybook/react";

import { APNGViewer } from "stories/visualisation/APNG";

const meta = {
  title: "Components/Visualisation/APNG",
  component: APNGViewer,
  tags: ["autodocs"],
} satisfies Meta<typeof APNGViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: "/apng.png",
  },
};

export const ExternallyControlled: Story = {
  args: {
    src: "/apng.png",
  },
};

export const WithCaption: Story = {
  args: {
    src: "/apng.png",
    caption: "A Caption!",
  },
};
