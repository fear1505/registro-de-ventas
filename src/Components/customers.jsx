import {
  Button,
  Card,
  CardActions,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";
import Alerts from "./Alerts";

const drawerWidth = 240;

const Customers = () => {
 
  const {customers, setCurrentId} = useContext(CustomerContext)

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {
        customers.map(item => (
          <Card sx={{ minWidth: 275, mt:1}} key={item.id}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            09/03/2023
          </Typography>
          <Typography variant="h5" component="div">
            {item.nombre} {item.apellido}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Telefono: {item.telefono}
          </Typography>
          <Typography variant="body2">
            Email: {item.email}
            <br />
          </Typography>
          <Typography variant="body2">
            DNI:{item.dni}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=> setCurrentId(item.id)}>Editar</Button>
          <Alerts id={item.id}/>
        </CardActions>
      </Card>
        ))
      }
    </Box>
  );
};

export default Customers;
