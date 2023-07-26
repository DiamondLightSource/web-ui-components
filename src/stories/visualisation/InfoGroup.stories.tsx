import { Meta, StoryObj } from "@storybook/react";
import { InfoGroup } from "stories/visualisation/InfoGroup";

const meta = {
  title: "Components/Visualisation/Info Group",
  component: InfoGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    info: [
      { label: "Temperature", value: "5 °C" },
      { label: "Angle", value: "30°" },
      { label: "Length", value: "1 m" },
      { label: "Magnetic Flux Density", value: "4 T" },
      {
        label: "Comments",
        value:
          "This is a default infogroup component showcasing how you can set a box as wide, making it span accross all columns in the infogroup.",
        wide: true,
      },
    ],
  },
};

export const Three: Story = {
  args: {
    cols: 3,
    info: [
      { label: "Temperature", value: "5 °C" },
      { label: "Angle", value: "30°" },
      { label: "Length", value: "1 m" },
      { label: "Magnetic Flux Density", value: "4 T" },
      { label: "Radiation", value: "0.6 uSv" },
      { label: "Energy", value: "3 GeV" },
      {
        label: "Comments",
        value:
          "This is a default infogroup component showcasing how you can set a box as wide, making it span accross all columns in the infogroup.",
        wide: true,
      },
    ],
  },
};
