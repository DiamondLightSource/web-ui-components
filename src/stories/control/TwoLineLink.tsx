import { Divider, HStack, Icon, Text, VStack, Heading, Link, LinkProps } from "@chakra-ui/react";
import { MdArrowForwardIos } from "react-icons/md";

export interface TwoLineLinkProps extends LinkProps {
  /** Link description */
  children: string;
  /** Link title */
  title: string;
  isDisabled?: boolean;
}

const TwoLineLink = ({ children, title, isDisabled, ...props }: TwoLineLinkProps) => (
  <Link
    {...props}
    w='100%'
    alignItems='start'
    role='group'
    color={isDisabled ? "diamond.200" : "diamond.600"}
    pointerEvents={isDisabled ? "none" : "initial"}
    aria-disabled={!!isDisabled}
    _hover={{ textDecor: "none" }}
  >
    <HStack w='100%' gap='2em'>
      <VStack alignItems='start' flex='1 0 0'>
        <Heading
          size='sm'
          fontWeight='600'
          _groupHover={{ textDecoration: "underline", color: "diamond.700" }}
        >
          {title}
        </Heading>
        <Text color={isDisabled ? "diamond.200" : "diamond.300"}>{children}</Text>
      </VStack>
      <Icon as={MdArrowForwardIos} _groupHover={{ color: "diamond.700" }} />
    </HStack>
    <Divider />
  </Link>
);

export { TwoLineLink };
