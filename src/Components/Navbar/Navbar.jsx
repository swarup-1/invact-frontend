import React, { useContext, useState } from 'react';
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from "../../Assets/logoBG.png";
import { AuthContext } from '../../Context/AuthContextProvider';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, user, login, logout } = useContext(AuthContext);
  let initialState = { name: '', email: '', password: '' }
  const [userState, setUserState] = useState(initialState);

  const handleLogin = () => {
    login(userState.name, userState.email, userState.password);
    onClose();
    setUserState(initialState)
  };

  return (
    <Stack p="20px" direction={{ base: "column", md: "row" }} justifyContent="space-between" minW="100%">
      <Image width={{ base: "100px", md: "150px" }} src={logo} />
      <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={{ base: "20px", md: "0" }}>
        <Button onClick={onOpen} height="40px" fontSize={{ base: "16px", md: "18px" }} width={{ base: "100%", md: "120px" }} bgColor="rgb(229,9,20)" color="white" mb={{ base: "10px", md: "0" }}>
          {isAuth ? `Hi ${user?.name}` : 'Sign In'}
        </Button>
        {isAuth && <Button onClick={logout} height="40px" fontSize={{ base: "16px", md: "18px" }} width={{ base: "100%", md: "120px" }} bgColor="rgb(229,9,20)" color="white" mb={{ base: "10px", md: "0" }}>
          Logout
        </Button>}
        <Link to="/watchlist">
          <Button height="40px" fontSize={{ base: "16px", md: "18px" }} width={{ base: "100%", md: "120px" }} bgColor="rgb(229,9,20)" color="white">
            Wishlist
          </Button>
        </Link>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#000" color="#fff" border="1px solid rgb(244,6,18)" maxW="90%">
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="50px">
            <Stack spacing={4}>
              <Input
                placeholder="Name"
                border="1px solid rgb(244,6,18)"
                _placeholder={{ color: 'rgb(244,6,18)' }}
                value={userState.name}
                onChange={(e) => setUserState({ ...userState, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                border="1px solid rgb(244,6,18)"
                _placeholder={{ color: 'rgb(244,6,18)' }}
                value={userState.email}
                onChange={(e) => setUserState({ ...userState, email: e.target.value })}
              />
              <Input
                placeholder="Password"
                border="1px solid rgb(244,6,18)"
                _placeholder={{ color: 'rgb(244,6,18)' }}
                value={userState.password}
                onChange={(e) => setUserState({ ...userState, password: e.target.value })}
              />
              <Button
                width="100%"
                bg="rgb(244,6,18)"
                color="#fff"
                _hover={{ bg: "rgba(244,6,18, 0.8)" }}
                onClick={handleLogin}
              >
                Submit
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Navbar;
