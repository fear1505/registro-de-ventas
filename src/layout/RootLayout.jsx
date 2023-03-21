import { Outlet } from "react-router-dom";
import CustomerContextProvider from "../context/CustomerContext";
import UserContextProvider from "../context/UserContext";

const Root = () => {
  return (
    <UserContextProvider>
      <CustomerContextProvider>
        <Outlet />
      </CustomerContextProvider>
    </UserContextProvider>
  );
};

export default Root;
