
import { HomePage } from "../pages/homePage";
import { Login } from "../pages/authentication/login";
import { createBrowserRouter } from "react-router-dom";




export const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      /* {
        path: "sign-up",
        element: <Register />,
      }, */
    ],
  },
]);
