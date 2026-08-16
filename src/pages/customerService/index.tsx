import { useState } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "../../components/drawer";
import { CardLib } from "../../components/card";
import { MessageCircleCheck } from "lucide-react";
import { Textlib } from "../../components/text";
import { Helmet } from "react-helmet-async";
import { OptinsService } from "./components/optionsService";
import { DrawerService } from "./components/drawerService";

export const CustomerService = () => {
  const [drawerAberto, setDrawerAberto] = useState(false);

  return (
    <>
      <Helmet title="Papo Com | atendimento" />
      <DrawerService />
    </>
  );
};
