import { HomePage } from "../pages/homePage";
import { Login } from "../pages/authentication/login";
import { createBrowserRouter } from "react-router-dom";
import { Register } from "../pages/authentication/register";
import { Queues } from "../pages/queues";
import { Users } from "../pages/users";
import { Contacts } from "../pages/contacts";
import { Devices } from "../pages/devices";
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
    path: "atendimento",
    element: <CustomerService/>,
  },

  {
    path: "filas",
    element: <Queues />,
  },
  {
    path: "usuarios",
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
]);
