import * as React from "react";
import { X } from "lucide-react";
import { ButtonLib } from "../button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";


const overlayClasses =
  "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0";

// Base sem padding: cada variante define o seu.
const contentBase =
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 " +
  "rounded-lg border border-border bg-card text-foreground shadow-lg outline-none " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

const contentClasses = `${contentBase} p-6`;

/* ========================================================================== */
/*                          DIALOG (formulários / edição)                     */
/* ========================================================================== */

// eslint-disable-next-line react-refresh/only-export-components
export const DialogLib = DialogPrimitive.Root;

type DialogContentLibProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  title: string;
  description?: string;
  /** Avatar/ícone centralizado acima do título (opcional). */
  icon?: React.ReactNode;
  /**
   * `true` ativa o layout com faixa colorida no topo e conteúdo sem padding
   * (o filho controla o próprio espaçamento, ex.: linhas com divisórias).
   */
  headerBand?: boolean;
  /** Classe Tailwind da faixa (ex.: "bg-muted"). */
  headerClassName?: string;
  /** Cor CSS arbitrária da faixa (ex.: "#e5e7eb"). Tem prioridade sobre a classe. */
  headerColor?: string;
};

const closeButtonClasses =
  "cursor-pointer rounded-md p-1 text-muted-foreground outline-none transition-colors hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-primary";

export function DialogContentLib({
  title,
  description,
  icon,
  headerBand = false,
  headerClassName = "bg-muted",
  headerColor,
  className = "",
  children,
  ...props
}: DialogContentLibProps) {
  if (!headerBand) {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayClasses} />
        <DialogPrimitive.Content
          className={`${contentClasses} ${className}`}
          {...props}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-lg text-error font-semibold">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>

            <DialogPrimitive.Close
              aria-label="Fechar"
              className={closeButtonClasses}
            >
              <X className="size-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClasses} />
      <DialogPrimitive.Content
        className={`${contentBase} overflow-hidden p-0 ${className}`}
        {...props}
      >
        {/* Faixa colorida + avatar sobreposto + título centralizado */}
        <div className="relative">
          <div
            className={`h-20 ${headerClassName}`}
            style={headerColor ? { backgroundColor: headerColor } : undefined}
          />

          <div
            className={`flex flex-col items-center px-6 pb-5 text-center ${
              icon ? "" : "pt-5"
            }`}
          >
            {icon ? (
              <div className="-mt-10 mb-3 flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-muted text-muted-foreground shadow-sm">
                {icon}
              </div>
            ) : null}

            <DialogPrimitive.Title className="text-lg text-primary font-semibold">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground font-semibold">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>

          <DialogPrimitive.Close
            aria-label="Fechar"
            className={`absolute right-3 top-3 bg-card/70 backdrop-blur-sm ${closeButtonClasses}`}
          >
            <X className="size-4" aria-hidden="true" />
          </DialogPrimitive.Close>
        </div>

        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/* ========================================================================== */
/*                  CONFIRM DIALOG (ações destrutivas, ex.: excluir)          */
/* ========================================================================== */

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `danger` pinta o botão de confirmação como ação destrutiva. */
  tone?: "default" | "danger";
  isLoading?: boolean;
  onConfirm: () => void;
};

/**
 * Usa AlertDialog (e não Dialog) de propósito: o Radix trata como
 * confirmação obrigatória — não fecha ao clicar fora e foca o "Cancelar"
 * por padrão, o que reduz exclusões acidentais.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "default",
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className={overlayClasses} />
        <AlertDialogPrimitive.Content className={contentClasses}>
          <AlertDialogPrimitive.Title className="text-lg font-semibold">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description asChild>
            <div className="mt-2 text-sm text-muted-foreground">
              {description}
            </div>
          </AlertDialogPrimitive.Description>

          <div className="mt-6 flex justify-end gap-2">
            <AlertDialogPrimitive.Cancel asChild>
              <ButtonLib
                type="button"
                size="none"
                shadow="sm"
                colorBackeGround="default"
                textColor="primary"
                colorBackeHouverGround="none"
                textColorHover="none"
                disabled={isLoading}
                className="h-9 border border-border px-4 text-sm"
              >
                {cancelLabel}
              </ButtonLib>
            </AlertDialogPrimitive.Cancel>

            {/* Não fecha sozinho: o pai decide (útil quando há chamada à API). */}
            <button
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className={`inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium text-secondary outline-none transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 ${
                tone === "danger"
                  ? "bg-error hover:opacity-90"
                  : "bg-primary hover:opacity-90"
              }`}
            >
              {isLoading ? "Aguarde..." : confirmLabel}
            </button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}