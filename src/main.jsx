import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline  from "@mui/material/CssBaseline";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssBaseline />
        <RouterProvider router={router} />
    </React.StrictMode>
);
