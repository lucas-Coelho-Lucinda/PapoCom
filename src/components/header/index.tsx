import { LogOut, Menu, UserPen } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropDownMenu";
import { CardLib } from "../card";
import { ButtonLib } from "../button";
import { AvatarLib } from "../avatar";
import type { HeaderProps } from "./types";
import { Textlib } from "../text";
import { NAV_ITEMS } from "./const";

export function Header({
  onMenuClick,
  isMenuOpen = false,
  menuId,
  user,
  className = "",
}: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const option = NAV_ITEMS.find((options) => options.to == pathname);

  const exitSessionUser = () => {
    try {
      navigate("/");
    } catch (error: unknown) {
      console.log("Error ao tentar deslogar do sistema:", error);
    }
  };

  return (
    <CardLib
      rounded="none"
      padding="xs"
      colorBackeGround="secondary"
      border="none"
      className={`sticky top-0 z-40 h-18 shrink-0 border-b-3 ${className}`}
    >
      <div className="relative flex h-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <ButtonLib
              type="button"
              size="large"
              shadow="sm"
              textColor="primary"
              textColorHover="none"
              colorBackeGround="default"
              colorBackeHouverGround="none"
              onClick={onMenuClick}
              aria-label="Abrir menu"
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              className=" shrink-0 b rounded-full"
            >
              <Menu className="size-7" aria-hidden="true" />
            </ButtonLib>
          </div>
          <div className="min-w-0">
            <Textlib
              as="h1"
              className="truncate font-bold"
              color="primary"
              size="lg"
            >
              {option?.title}
            </Textlib>

            <Textlib
              as="span"
              color="primary"
              size="md"
              className="block truncate font-semibold"
            >
              {option?.subtitle}
            </Textlib>
          </div>
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu do usuário"
                className="rounded-full outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
              >
                <AvatarLib
                  src={user.avatarUrl}
                  alt={user.name}
                  size="median"
                  border="primary"
                  isAdmin={false}
                  shape="circle"
                  className="shadow-2xl"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              colorBackeGround="success"
              align="end"
              sideOffset={8}
              className="min-w-44 p-1"
            >
              <DropdownMenuItem
                colorsText="secondary"
                colorHover="secondary"
                className="font-semibold"
                leftIcon={<UserPen className="size-4" />}
                onSelect={() => navigate("/perfil")}
              >
                Perfil
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                colorsText="error"
                colorHover="secondary"
                className="font-semibold"
                leftIcon={<LogOut className="size-4" />}
                onSelect={exitSessionUser}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </CardLib>
  );
}
