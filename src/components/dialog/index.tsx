import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { ButtonLib } from "../button";

const overlayClasses =
  "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0";

const contentClasses =
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 " +
  "rounded-lg border border-border bg-card p-6 text-foreground shadow-lg outline-none " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

/* ========================================================================== */
/*                          DIALOG (formulários / edição)                     */
/* ========================================================================== */

// eslint-disable-next-line react-refresh/only-export-components
export const DialogLib = DialogPrimitive.Root;

type DialogContentLibProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & { title: string; description?: string };

export function DialogContentLib({
  title,
  description,
  className = "",
  children,
  ...props
}: DialogContentLibProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClasses} />
      <DialogPrimitive.Content
        className={`${contentClasses} ${className}`}
        {...props}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <DialogPrimitive.Title className="text-lg font-semibold">
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
            className="cursor-pointer rounded-md p-1 text-muted-foreground outline-none transition-colors hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-primary"
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
