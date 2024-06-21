import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    if (!isAuth) {
      toast({
        title: "Access Denied",
        description: "Please login first.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [isAuth, toast]);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
