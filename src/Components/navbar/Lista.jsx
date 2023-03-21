import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonIcon from '@mui/icons-material/Person';

import Form from "../Form";
import { NavLink } from "react-router-dom";

const Lista = ({onClick}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }} onClick={onClick}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary="Hola" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="customer">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PointOfSaleIcon />
              </ListItemIcon>
              <ListItemText primary="Hola" />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem>
            <Form />
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default Lista;
