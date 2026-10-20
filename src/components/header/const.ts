import {
    MessageSquare,
    List,
    Users,
    Contact,
    Smartphone,
    LayoutDashboard,
} from "lucide-react";
import type { SideMenuItem } from "../sideMenu/types";

export const NAV_ITEMS: SideMenuItem[] = [
    {
        title: "Painel de Atendimento",
        to: "/Atendimentos",
        icon: MessageSquare,
        subtitle: "Conversas recebidas via WhatsApp, filtradas por fila e status",
    },
    {
        title: "Filas",
        to: "/Filas",
        icon: List,
        subtitle: "Organize o atendimento por área e defina quem atende cada fila",
    },
    {
        title: "Usuários",
        to: "/Usuarios",
        icon: Users,
        subtitle: "Administradores e atendentes com acesso à empresa",
    },
    {
        title: "Contatos",
        to: "/Contatos",
        icon: Contact,
        subtitle: "Números que já conversaram ou estão conversando com sua empresa",
    },
    {
        title: "Dispositivos",
        to: "/Dispositivos",
        icon: Smartphone,
        subtitle: "Número de WhatsApp conectado à plataforma",
    },
    {
        title: "Dashboard",
        to: "/Dashboard",
        icon: LayoutDashboard,
        subtitle: "Visão geral da operação de atendimento",
    },
];