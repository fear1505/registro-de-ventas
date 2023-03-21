import { Alert, Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { CustomerContext } from "../context/CustomerContext";
import SnackbarComponent from "./SnackbarComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const Form = () => {
  const {
    addNewCustomer,
    currentId,
    setCurrentId,
    getCustomerById
  } = useContext(CustomerContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    email: ""
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentId("");
  };


  const onSubmit = (values, { resetForm }) => {
    addNewCustomer(values);
    handleClose();
    resetForm();
    setCurrentId("");
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (currentId === "") {
      setInitialValues({ ...initialValues });
    } else {
      getCustomerById(currentId, setInitialValues, handleOpen)
    }
  }, [currentId]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const dni = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .trim()
      .required(<Alert severity="warning">Campo requerido</Alert>),
    apellido: Yup.string()
      .trim()
      .required(<Alert severity="warning">Campo requerido</Alert>),
    telefono: Yup.string()
      .trim()
      .required(<Alert severity="warning">Campo requerido</Alert>)
      .matches(phoneRegExp, () => (
        <Alert severity="error">Telefono invalido</Alert>
      ))
      .min(10, <Alert severity="info">Minimo 10 caracteres</Alert>)
      .max(10, <Alert severity="info">Maximo 10 caracteres</Alert>),
    dni: Yup.string()
      .trim()
      .matches(dni, () => <Alert severity="error">DNI invalido</Alert>),
    email: Yup.string()
      .email(<Alert severity="error">Email invalido</Alert>)
      .required(<Alert severity="warning">Campo requerido</Alert>),
  });

  return (
    <Box>
      <SnackbarComponent
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
      <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>
        Agregar registro
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" textAlign="center">
            {" "}
            {currentId === "" ? "Agregar cliente" : "Editar cliente"}{" "}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  "& > :not(style)": { m: 1 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  id="nombre"
                  label="Nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  name="nombre"
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.nombre && touched.nombre && errors.nombre}
                <TextField
                  id="apellido"
                  label="Apellido"
                  value={values.apellido}
                  onChange={handleChange}
                  name="apellido"
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.apellido && touched.apellido && errors.apellido}
                <TextField
                  id="telefono"
                  label="Telefono"
                  value={values.telefono}
                  onChange={handleChange}
                  name="telefono"
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.telefono && touched.telefono && errors.telefono}
                <TextField
                  id="dni"
                  label="DNI"
                  value={values.dni}
                  onChange={handleChange}
                  name="dni"
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.dni && touched.dni && errors.dni}
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.email && touched.email && errors.email}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  type="submit"
                >
                  {currentId === "" ? "Agregar" : "Editar"}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default Form;
