/*  ESTRUTURA DE CORES PADRÃO DO SISTEMA PARA SEUS COMPONENTS */


export const colorsText = {
    default: "text-foreground",
    info: "text-info",
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
    muted: "text-muted",
    accent: "text-accent",
    secondary: "text-secondary",
}


export const colorsBackGround = {
    default:
        "bg-background data-[highlighted]:bg-background/80",

    muted: "bg-muted/15 data-[highlighted]:bg-muted/80",

    info:
        "bg-info data-[highlighted]:bg-info/80",

    error:
        "bg-error  data-[highlighted]:bg-error/80",

    success:
        "bg-success data-[highlighted]:bg-success/80",

    warning:
        "bg-warning data-[highlighted]:bg-warning/80",

    primary:
        "bg-primary data-[highlighted]:bg-primary/80",

    secondary:
        "bg-secondary data-[highlighted]:bg-secondary/80",

    accent: "bg-accent border-accent data-[highlighted]:bg-accent/80"
};


export const colorsBorder = {
    none: "border-transparent",

    default: "border-background",

    info: "border-info",

    error: "border-error",

    success: "border-success",

    warning: "border-warning",

    primary: "border-primary",

    secondary: "border-secondary",

    accent: "border-accent",

    muted: "border-muted"
};