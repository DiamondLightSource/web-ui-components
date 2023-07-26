import { Meta, StoryObj } from "@storybook/react";
import { Table } from "stories/visualisation/Table";

const meta = {
  title: "Components/Visualisation/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      { name: "John", surname: "Doe", id: 90 },
      { name: "James", surname: "Deer", id: 95 },
      { name: "Maria", surname: "da Silva", id: 98 },
    ],
    headers: [
      { key: "name", label: "name" },
      { key: "surname", label: "Surname" },
      { key: "id", label: "ID" },
    ],
  },
};

export const NoData: Story = {
  args: {
    data: [],
    headers: [
      { key: "name", label: "name" },
      { key: "surname", label: "Surname" },
      { key: "id", label: "ID" },
    ],
  },
};
