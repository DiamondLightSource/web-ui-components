import { Tag } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { User } from "stories/control/User";

import { NavLink, NavLinks, Navbar } from "stories/navigation/Navbar";

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
    children: <User onLogin={() => {}} onLogout={() => {}} user={null} />,
  },
};

export const WithUser: Story = {
  args: {
    children: (
      <User onLogin={() => {}} onLogout={() => {}} user={{ name: "Name", fedid: "FedID" }} />
    ),
  },
};

export const Links: Story = {
  args: {
    children: (
      <NavLinks>
        <NavLink href='#'>Proposal</NavLink>
        <NavLink href='#'>Visits</NavLink>
      </NavLinks>
    ),
  },
};

export const LinksAndUser: Story = {
  args: {
    children: [
      <NavLinks>
        <NavLink href='#'>Proposal</NavLink>
        <NavLink href='#'>Visits</NavLink>
      </NavLinks>,
      <User onLogin={() => {}} onLogout={() => {}} user={{ name: "Name", fedid: "FedID" }} />,
    ],
  },
};

export const NoLogo: Story = {
  args: {
    children: (
      <NavLinks>
        <NavLink href='#'>Proposal</NavLink>
        <NavLink href='#'>Visits</NavLink>
      </NavLinks>
    ),
    logo: null,
  },
};

export const CustomChildElement: Story = {
  args: {
    children: <Tag>Hello, World!</Tag>,
  },
};
