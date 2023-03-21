import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import PrivateLayout from "../layout/PrivateLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Records from "../pages/Records";
import Customer from "../pages/Customer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "panel",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Records />,
                    },
                    {
                        path: "customer",
                        element: <Customer />
                    }
                ],
            },
        ],
    },
]);
