import { useEffect, useRef } from "react";
import { CardLib } from "../card";
import { ArrowRight, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { SideMenuProps } from "./types";
import { AvatarLib } from "../avatar";
import { Textlib } from "../text";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SideMenu({
  isOpen,
  onClose,
  items,
  id,
  elementOrText,
}: SideMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Mantém o `onClose` mais recente sem religar os listeners a cada render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      // Prende o Tab dentro do painel enquanto ele está aberto.
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable =
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
          isOpen ? "visible opacity-60" : "invisible opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-60
    flex flex-col justify-between
    w-[clamp(16rem,25vw,20rem)]
    max-w-[85vw]
    h-dvh
    overflow-x-hidden
    overflow-y-auto
    transition-[transform,visibility]
    duration-300 ease-out
    motion-reduce:transition-none
    ${isOpen ? "visible translate-x-0" : "invisible -translate-x-full"}`}
      >
        <CardLib
          border="none"
          height="full"
          width="full"
          colorBackeGround="success"
          className="flex flex-col gap-5 shrink-0"
        >
          <CardLib
            border="none"
            height="fit"
            colorBackeGround="primary"
            className="flex flex-row justify-center gap-5 items-center"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              ref={closeButtonRef}
              className="group  flex flex-row justify-center items-center gap-4 shrink-0 w-100 outline-none rounded-3xl cursor-pointer  transition-all duration-300"
            >
              {elementOrText}
              <ArrowRight
                size={30}
                className="opacity-0 -translate-x-2 mb-1 text-accent transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </button>
          </CardLib>

          <ul className="flex flex-col gap-8  px-2">
            {items.map(({ title, to, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 shadow-md  rounded-full px-4 py-2 text-base font-medium outline-none active:scale-[0.97] active:translate-y-0.2 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-secondary"
                        : "bg-secondary hover:bg-primary  hover:text-secondary"
                    }`
                  }
                >
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
          <CardLib
            height="full"
            width="full"
            padding="lg"
            border="none"
            colorBackeGround="secondary"
            className="flex flex-col justify-center gap-5 px-2"
          >
            <div className="flex flex-row gap-3">
              <AvatarLib
                isAdmin={false}
                color="default"
                border="primary"
                shape="circle"
                fit="cover"
                size="median"
                className=""
              />
              <div className="flex flex-col justify-center">
                <Textlib
                  as="span"
                  color="primary"
                  size="md"
                  className="font-semibold"
                >
                  Usuario: Marina Duarte
                </Textlib>

                <Textlib
                  as="span"
                  color="primary"
                  size="sm"
                  className="font-medium"
                >
                  Permissão: Administrador
                </Textlib>
              </div>
            </div>

            <button className="flex justify-center items-center bg-destructive-active/80 text-secondary text-center font-medium outline-none gap-3 shadow-md rounded-full px-2 py-2 active:scale-[0.97] active:translate-y-0.2 transition-all duration-200">
              Sair
              <LogOut size={20} />
            </button>
          </CardLib>
        </CardLib>
      </div>
    </>
  );
}
