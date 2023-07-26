import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Image,
  VStack,
} from "@chakra-ui/react";
import { MdMenu, MdClose } from "react-icons/md";
import { AuthState } from "utils/interfaces";
import diamondLogo from "../../public/diamondgs.png";

export interface LinkDescriptor {
  label: string;
  route: string;
}

interface BaseLinkProps {
  links?: LinkDescriptor[];
  as?: React.ElementType;
}

export interface NavbarProps extends BaseLinkProps {
  user?: AuthState | null;
  logo?: string | null;
  children?: React.ReactElement;
}

const NavLinks = ({ links, as }: BaseLinkProps) => (
  <>
    {links
      ? links.map((link) => (
          <Link
            height='100%'
            alignItems='center'
            display='flex'
            px={2}
            textDecor='none'
            as={as}
            borderTop='4px solid transparent'
            borderBottom='4px solid transparent'
            color='diamond.50'
            _hover={{
              color: "diamond.500",
              borderBottom: "solid 4px",
            }}
            to={link.route}
            key={link.label}
          >
            {link.label}
          </Link>
        ))
      : null}
  </>
);

const Navbar = ({ links, as, children, logo = diamondLogo as string }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position='sticky' top='0' zIndex={1} w='100%'>
      <Flex
        bg='diamond.800'
        px={{ base: 4, md: "7.5vw" }}
        h={12}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <IconButton
          size={"sm"}
          icon={isOpen ? <MdClose /> : <MdMenu />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          bg='transparent'
          border='none'
          _hover={{ background: "transparent", color: "diamond.500" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack h='100%' spacing={8} alignItems={"center"}>
          {logo ? (
            <Link as={as} to='/'>
              <Box maxW='5rem'>
                <Image
                  alt='Home'
                  _hover={{ filter: "brightness(70%)" }}
                  fit='cover'
                  paddingBottom={{ md: "6px", base: 0 }}
                  src={logo}
                />
              </Box>
            </Link>
          ) : null}
          <HStack h='100%' as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLinks links={links} as={as} />
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>{children}</Flex>
      </Flex>
      {isOpen && (
        <VStack
          bg='diamond.700'
          borderBottom='1px solid'
          borderColor='diamond.500'
          as={"nav"}
          spacing={4}
        >
          <NavLinks links={links} as={as} />
        </VStack>
      )}
    </Box>
  );
};

export { Navbar };
