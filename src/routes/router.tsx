import { HomePage } from "../pages/homePage";
import { Login } from "../pages/authentication/login";
import { createBrowserRouter } from "react-router-dom";
import { Register } from "../pages/authentication/register";
import { Queues } from "../pages/queues";
import { Users } from "../pages/users";
import { Contacts } from "../pages/contacts";
import { Devices } from "../pages/devices";
import { CustomerService } from "../pages/customerService";
import { ServiceLayout } from "../pages/serviceLayout";

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
        path: "Cadastro",
        element: <Register />,
      },
    ],
  },
  {
    element: <ServiceLayout />,
    children: [
      {
        path: "Atendimentos",
        element: <CustomerService />,
      },
      {
        path: "Filas",
        element: <Queues />,
      },
      {
        path: "Usuarios",
        element: <Users />,
      },
      {
        path: "contatos",
        element: <Contacts />,
      },
      {
        path: "Dispositivos",
        element: <Devices />,
      },
    ],
  },
]);
