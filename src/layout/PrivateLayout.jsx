import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Navbar from "../Components/navbar/Navbar";
import { Box } from "@mui/material";

const Private = () => {
  const { user } = useUserContext();

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      {user ? <Outlet /> : <Navigate to="/" />}
    </Box>
  );
};

export default Private;
