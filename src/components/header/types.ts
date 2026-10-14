import type { ReactNode } from "react";

export type HeaderUser = {
  name: string;
  avatarUrl?: string;
};

export type HeaderProps = {
  /** Chamado ao clicar no botão hambúrguer. */
  onMenuClick: () => void;
  /** Estado do menu lateral, usado para `aria-expanded`. */
  isMenuOpen?: boolean;
  /** Id do menu lateral controlado, usado para `aria-controls`. */
  menuId?: string;
  /** Saldo de créditos. Se omitido, a pílula não é exibida. */
  credits?: number;
  /** Usuário logado. Se omitido, o avatar não é exibido. */
  user?: HeaderUser;
  /** Substitui o logo padrão. */
  elementOrText?: ReactNode;
  className?: string;
};
