import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Image,
  BoxProps,
  LinkProps,
  Drawer,
} from "@chakra-ui/react";
import { MdMenu, MdClose } from "react-icons/md";
import diamondLogo from "../../public/diamondgs.png";
import React from "react";

export interface NavLinksProps {
  children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[];
}

export interface NavbarProps extends BoxProps {
  /** Location/content of the logo */
  logo?: string | null;
  children?: React.ReactElement;
}

const NavLink = ({ children, ...props }: LinkProps) => (
  <Link
    h='100%'
    bg={{ base: "diamond.700", md: "none" }}
    alignItems='center'
    display='flex'
    px={2}
    textDecor='none'
    borderTop='4px solid transparent'
    borderBottom='4px solid transparent'
    color='diamond.50'
    _hover={{
      color: "diamond.500",
      borderBottom: "solid 4px",
    }}
    {...props}
  >
    {children}
  </Link>
);

const NavLinks = ({ children }: NavLinksProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        order='-1'
        size={"sm"}
        icon={isOpen ? <MdClose /> : <MdMenu />}
        aria-label={"Open Menu"}
        display={{ md: "none" }}
        bg='none'
        border='none'
        _hover={{ color: "diamond.500" }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack h='100%' as='nav' spacing={4} display={{ base: "none", md: "flex" }}>
        {children}
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} placement='top'>
        {children}
      </Drawer>
    </>
  );
};

/**
 * Basic navigation bar. Can be used with `NavLinks` and `NavLink` to display a responsive list of links.
 */
const Navbar = ({ children, logo = diamondLogo as string, ...props }: NavbarProps) => {
  return (
    <Box position='sticky' top='0' zIndex={1} w='100%' {...props}>
      <Flex
        bg='diamond.800'
        px={{ base: 4, md: "7.5vw" }}
        h={12}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack h='100%' spacing={8} alignItems={"center"} w='100%'>
          {logo ? (
            <Link href='/'>
              <Box maxW='5rem'>
                <Image alt='Home' _hover={{ filter: "brightness(70%)" }} fit='cover' src={logo} />
              </Box>
            </Link>
          ) : null}
          {children}
        </HStack>
      </Flex>
    </Box>
  );
};

export { Navbar, NavLinks, NavLink };
