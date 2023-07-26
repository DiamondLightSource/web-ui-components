import { Tag } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { User } from "stories/control/User";

import { Navbar } from "stories/navigation/Navbar";

const meta = {
  title: "Components/Navigation/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};

export const WithLogin: Story = {
  args: {
    user: {
      name: "User",
      fedid: "fedid",
    },
    children: <User onLogin={() => {}} onLogout={() => {}} user={null} />,
  },
};

export const WithUser: Story = {
  args: {
    user: {
      name: "User",
      fedid: "fedid",
    },
    children: (
      <User onLogin={() => {}} onLogout={() => {}} user={{ name: "Name", fedid: "FedID" }} />
    ),
  },
};

export const Links: Story = {
  args: {
    user: {
      name: "User",
      fedid: "fedid",
    },
    links: [
      { route: "/", label: "Proposals" },
      { route: "/", label: "Visits" },
    ],
  },
};

export const NoLogo: Story = {
  args: {
    user: {
      name: "User",
      fedid: "fedid",
    },
    links: [
      { route: "/", label: "Proposals" },
      { route: "/", label: "Visits" },
    ],
    logo: null,
  },
};

export const CustomChildElement: Story = {
  args: {
    user: {
      name: "User",
      fedid: "fedid",
    },
    links: [
      { route: "/", label: "Proposals" },
      { route: "/", label: "Visits" },
    ],
    children: <Tag>Hello, World!</Tag>,
  },
};
