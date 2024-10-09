import { Meta, StoryObj } from "@storybook/react";
import { BoxPlot } from "stories/plots/Box";

const meta = {
  title: "Components/Plots/Box",
  component: BoxPlot,
  tags: ["autodocs"],
} satisfies Meta<typeof BoxPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = () => {
  const data = [];

  for (let i = 0; i < 5; i++) {
    const base = Math.floor(Math.random() * 100);
    data.push({
      label: i.toString(),
      min: base,
      q1: base * 2,
      median: base * 3,
      q3: base * 4,
      max: base * 5,
    });
  }

  return data;
};

export const Basic: Story = {
  args: {
    data: generateRandomData(),
    width: 500,
    height: 500,

    options: {
      y: {
        label: "Thickest → Thinnest",
      },
    },
  },
};

export const WithDomain: Story = {
  args: {
    data: generateRandomData(),
    options: { y: { domain: { min: 0, max: 120 } } },
    width: 500,
    height: 500,
  },
};

export const LogAxis: Story = {
  args: {
    data: generateRandomData(),
    options: { y: { domain: { min: 1, max: 300 }, log: true } },
    width: 500,
    height: 500,
  },
};
