
import { HomePage } from "../pages/homePage";
import { Login } from "../pages/authentication/login";
import { createBrowserRouter } from "react-router-dom";
import { Register } from "../pages/authentication/register";
import { CustomerService } from "../pages/customerService";




export const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "cadastro",
        element: <Register />,
      },
    ],
  },
  {
    path: "/atendimento",
    element: <CustomerService/>,
    children: []
  }
]);
