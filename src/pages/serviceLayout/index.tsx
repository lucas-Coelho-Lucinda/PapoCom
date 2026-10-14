import { Helmet } from "react-helmet-async";
import { useCallback, useId, useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../components/header";
import { SideMenu } from "../../components/sideMenu";
import { NAV_ITEMS } from "../../components/header/const";


export const ServiceLayout = () => {
  const menuId = useId();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <Helmet title="Papo Com | Atendimentos" />

      <div className="flex  flex-col overflow-hidden">
        <Header
          onMenuClick={openMenu}
          isMenuOpen={isMenuOpen}
          menuId={menuId}
          user={{
            name: "lucas coelho",
            avatarUrl: ""
          }}
        />

        <SideMenu
          id={menuId}
          isOpen={isMenuOpen}
          onClose={closeMenu}
          items={NAV_ITEMS}
          elementOrText={
            <img
              src="/src/assets/Logo_PapoCom.png"
              alt="PapoCom"
              className="w-50 h-25 object-cover"
            />
          }
        />

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
