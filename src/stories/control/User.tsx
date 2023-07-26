import {
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { MdLogin } from "react-icons/md";
import { AuthState } from "utils/interfaces";

export interface UserProps {
  user: AuthState | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const User = ({ user, onLogin, onLogout }: UserProps) => {
  return (
    <>
      {user ? (
        <Menu>
          <MenuButton
            aria-label='User Avatar'
            as={Button}
            border='none'
            variant={"link"}
            cursor={"pointer"}
            minW={0}
            _hover={{
              opacity: 0.8,
            }}
          >
            <HStack>
              <div style={{ padding: 10 }}>
                <Text color='diamond.100' display='inline-block'>
                  {user.name}
                </Text>
                <Text textAlign='left' fontSize='xs'>
                  {user.fedid}
                </Text>
              </div>
              <Avatar size='xs' />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem aria-label='Logout'>
              <Link onClick={onLogout}>Logout</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={onLogin} variant='onBlue' leftIcon={<MdLogin />}>
          Login
        </Button>
      )}
    </>
  );
};
