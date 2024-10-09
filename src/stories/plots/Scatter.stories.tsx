import { Meta, StoryObj } from "@storybook/react";
import { ScatterPlot } from "stories/plots/Scatter";

const meta = {
  title: "Components/Plots/Scatter",
  component: ScatterPlot,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = () => {
  const data = [];

  for (let i = 0; i < 700; i++) {
    data.push({ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) });
  }

  return data;
};

const data = generateRandomData();

export const Basic: Story = {
  args: {
    data,
    width: 500,
    height: 500,
  },
};

export const Decimated: Story = {
  args: {
    data,
    width: 200,
    height: 200,
    decimationThreshold: 0.1,
  },
};

export const WithDomain: Story = {
  args: {
    data,
    options: { y: { domain: { min: 0, max: 10 } }, x: { domain: { min: 0, max: 10 } } },
    width: 500,
    height: 500,
  },
};

export const DotRadius: Story = {
  args: {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
    options: { points: { dotRadius: 10 } },
    width: 500,
    height: 500,
  },
};

export const WithLogYAxis: Story = {
  args: {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
    options: { y: { log: true, domain: { min: 1, max: 100 } } },
    width: 500,
    height: 500,
  },
};

export const WithLogXAxis: Story = {
  args: {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
    options: { x: { log: true, domain: { min: 1, max: 100 } } },
    width: 500,
    height: 500,
  },
};
