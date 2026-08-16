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

    info:
        "bg-info border-info data-[highlighted]:bg-info/80",

    error:
        "bg-error border-error data-[highlighted]:bg-error/80",

    success:
        "bg-success border-success data-[highlighted]:bg-success/80",

    warning:
        "bg-warning border-warning data-[highlighted]:bg-warning/80",

    primary:
        "bg-primary border-primary data-[highlighted]:bg-primary/80",

    secondary:
        "bg-secondary border-secondary data-[highlighted]:bg-secondary/80",
        
     accent: "bg-accent border-accent data-[highlighted]:bg-accent/80"   
};