import { Meta, StoryObj } from "@storybook/react";

import { BarChart } from "stories/plots/Bar";

const meta = {
  title: "Components/Plots/Bar",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = () => {
  const data = [];

  for (let j = 0; j < 3; j++) {
    const inner = [];
    for (let i = 0; i < 3; i++) {
      inner.push({ label: i.toString(), y: Math.floor(Math.random() * 100) });
    }
    data.push(inner);
  }

  return data;
};

export const Basic: Story = {
  args: {
    data: generateRandomData(),
    width: 500,
    height: 500,
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
