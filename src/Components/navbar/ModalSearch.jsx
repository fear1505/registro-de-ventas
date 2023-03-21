import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalSearch = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SearchIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Buscar Cliente</Typography>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Formik>
              <form>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Nombre"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="DNI"
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Buscar"
                  variant="outlined"
                />
                <Button type="submit" sx={{mt:2}} variant="contained">Buscar</Button>
              </form>
            </Formik>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalSearch;
