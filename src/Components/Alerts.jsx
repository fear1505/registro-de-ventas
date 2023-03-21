import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {  useContext, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";

const Alerts = ({id}) => {
 const [open, setOpen] = useState(false);

 const {onDeleteCustomer} = useContext(CustomerContext)

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (e) => {
    setOpen(false);
    if(e.target.innerText === "ACEPTAR"){
      onDeleteCustomer(id)
    }
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>ELIMINAR</Button> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancelar</Button>
          <Button onClick={(e) => handleClose(e, id)} autoFocus>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alerts;
