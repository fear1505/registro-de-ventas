import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Login = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/panel");
    }
  });

  const onSubmit = async (
    { mail, contraseña },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const credentialUser = await login({ mail, contraseña });
      console.log(credentialUser);
      resetForm();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return setErrors({ mail: <Alert severity="error">El Email no esta registrado.</Alert> });
      }

      if (error.code === "auth/wrong-password") {
        return setErrors({ contraseña: <Alert severity="error">Contraseña invalida.</Alert>  });
      }
    } finally {
      setSubmitting(false);  
    }
  };

  const validationSchema = Yup.object().shape({
    mail: Yup.string().email(<Alert severity="warning"> Email incorrecto</Alert>).required(<Alert severity="warning">Email requerido</Alert>),
    contraseña: Yup.string()
      .trim()
      .min(6, <Alert severity="warning">La contraseña debe tener minimo 6 caracteres</Alert>)
      .required(<Alert severity="warning">Contraseña requerida</Alert>),
  });

  return (
    <Box
      sx={{
        background: "#0E4C75",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={{ mail: "", contraseña: "" }}
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
          isSubmitting,
        }) => (
          <Box
            sx={{
              background: "white",
              borderRadius: "5px",
              boxShadow: "3px 2px 20px -2px rgba(0,0,0,0.8)",
              "& > :not(style)": { m: 1 },
              mt:3,
              display:"flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              minWidth: "250px",
              width: "25%",
              height: "40vh"
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" color="#0E4C75">Bienvenidos</Typography>
            <TextField
              sx={{background:"white", width: "75%"}}
              id="Ingrese su mail"
              type="email"
              label="Ingrese su mail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              value={values.mail}
              onChange={handleChange}
              name="mail"
              onBlur={handleBlur}
            />
            {errors.mail && touched.mail && errors.mail}
            <TextField
              sx={{background:"white", width: "75%"}}
              id="Ingrese contraseña"
              type="password"
              label="Ingrese contraseña"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              value={values.contraseña}
              onChange={handleChange}
              name="contraseña"
              onBlur={handleBlur}
            />
            {errors.contraseña && touched.contraseña && errors.contraseña}
            <Button variant="contained" type="submit" sx={{width: "50%" , height: "50px"}} disabled={isSubmitting}>
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
