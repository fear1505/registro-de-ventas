import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

const SnackbarComponent = ({ openSnackbar, setOpenSnackbar }) => {
  const { currentId} = useContext(CustomerContext)
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert severity="success">
        <AlertTitle>Exito</AlertTitle>{currentId === "" ? "Cliente creado satifactoriamente" : "Cliente editado satifactoriamente" }
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
