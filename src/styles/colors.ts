/* ESTRUTURA DE CORES PADRÃO DO SISTEMA PARA SEUS COMPONENTES */

export const colorsText = {
    none: "",
    message: "text-slate-900",
    default: "text-foreground",
    info: "text-info",
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
    muted: "text-muted",
    accent: "text-accent",
    secondary: "text-secondary",
};


export const colorsHouverText = {
    none: "",

    default:
        "hover:text-primary-hover",

    muted:
        "hover:text-foreground",

    info:
        "hover:text-info-active",

    error:
        "hover:text-error-active",

    success:
        "hover:text-success-active",

    warning:
        "hover:text-warning-active",

    primary:
        "hover:text-primary-hover",

    secondary:
        "hover:text-secondary",

    accent:
        "hover:text-accent-active",
};


export const colorsBackGround = {
    none: "",

    default:
        "bg-card",

    muted:
        "bg-muted/50",

    info:
        "bg-info",

    error:
        "bg-error",

    success:
        "bg-success",

    warning:
        "bg-warning",

    primary:
        "bg-primary",

    secondary:
        "bg-secondary",

    accent:
        "bg-accent",

    sendMessage: "bg-emerald-100"
};


export const colorsHouverBackGround = {
    none: "",

    default:
        "hover:bg-secondary-hover",

    muted:
        "hover:bg-secondary-hover",

    info:
        "hover:bg-info-hover",

    error:
        "hover:bg-error-hover",

    success:
        "hover:bg-success-hover",

    warning:
        "hover:bg-warning-hover",

    primary:
        "hover:bg-primary-hover",

    secondary:
        "hover:bg-secondary-hover",

    accent:
        "hover:bg-accent-hover",
};


export const colorsBorder = {
    none: "border-transparent",

    // Borda neutra padrão para componentes.
    default: "border-border",

    // Borda suave para elementos de baixa ênfase.
    muted: "border-border-soft",

    // Variantes fortes para indicadores e estados.
    info: "border-info-strong",

    error: "border-error-strong",

    success: "border-success-strong",

    warning: "border-warning-strong",

    primary: "border-primary",

    secondary: "border-border-strong",

    accent: "border-accent-strong",

    sendMessage: "border-emerald-300"
};