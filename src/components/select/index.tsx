import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { colorsBackGround, colorsText } from "../../styles/colors";
import { CollpasedContext } from "../../context/collapsed";
import { ScrollListLib } from "../scrollList";
import { InputLib } from "../Input";

/**
 * ============================================================
 * TRIGGER
 * ============================================================
 */

const selectTriggerVariants = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-between",
    "gap-2",

    "cursor-pointer",
    "select-none",

    "rounded-md",
    "border",
    "border-soft",

    "font-medium",

    "outline-none",

    "transition-all",
    "duration-200",

    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "border border-1 border-soft",
    "focus:border-primary",
    "shadow-sm",

    // Impede o conteúdo de estourar o tamanho do Select
    "overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: colorsBackGround,

      textColor: colorsText,

      size: {
        small: ["h-8", "px-2", "text-sm"].join(" "),

        medium: ["h-8", "px-2", "text-sm"].join(" "),

        large: ["h-16", "px-3", "text-base"].join(" "),
      },
    },

    defaultVariants: {
      variant: "default",
      textColor: "default",
      size: "small",
    },
  },
);

/**
 * ============================================================
 * CONTENT
 * ============================================================
 */

const selectContentVariants = cva(
  [
    "z-50",

    "overflow-hidden",

    "rounded-md",
    "border",
    "border-soft",

    "p-1",

    // Mesma largura do Trigger
    "w-[var(--radix-select-trigger-width)]",

    // Altura máxima disponível
    "max-h-[var(--radix-select-content-available-height)]",

    // Animação de abertura
    "data-[state=open]:animate-[select-content-show_150ms_ease-out]",

    // Animação de fechamento
    "data-[state=closed]:animate-[select-content-hide_100ms_ease-in]",
  ].join(" "),
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * ============================================================
 * VIEWPORT
 * ============================================================
 */

const selectViewportVariants = cva(
  [
    "w-full",
    "flex",
    "flex-col",
    "gap-1",

    "overflow-y-auto",
    "overflow-x-hidden",
  ].join(" "),
);

/**
 * ============================================================
 * ITEM
 * ============================================================
 */

const selectItemVariants = cva(
  [
    "relative",
    "flex",
    "h-fit",
    "w-full",
    "min-w-0",

    "cursor-pointer",
    "select-none",
    "items-center",

    "rounded-sm",

    "border",
    "border-soft",

    "outline-none",

    "box-border",

    "transition-colors",
    "duration-150",
    "bg-amber-500",

    // Texto não deve estourar
    "overflow-hidden",

    // Estados Radix
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",

    // Hover/focus
    "data-[highlighted]:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },

      textColor: colorsText,

      size: {
        small: ["h-8", "py-1", "pl-8", "pr-2", "text-sm"].join(" "),

        medium: ["h-8", "py-1", "pl-8", "pr-2", "text-sm"].join(" "),

        large: ["h-16", "py-2", "pl-10", "pr-3", "text-base"].join(" "),
      },
    },

    defaultVariants: {
      variant: "default",
      textColor: "default",
      size: "small",
    },
  },
);

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

interface SelectProps extends Omit<
  VariantProps<typeof selectTriggerVariants>,
  "textColor"
> {
  options: {
    label: string;
    value: string;
  }[];

  placeholder?: string;

  value?: string;

  defaultValue?: string;

  IconDefault: React.ReactNode;

  onValueChange?: (value: string) => void;

  disabled?: boolean;

  className?: string;

  textColor?: keyof typeof colorsText;

  variant?: keyof typeof colorsBackGround;

  size?: "small" | "medium" | "large";

  /** Exibe um campo de busca no topo da lista. Padrão: false. */
  searchable?: boolean;

  /** Placeholder do campo de busca. */
  searchPlaceholder?: string;

  /** Mensagem exibida quando a busca não retorna resultados. */
  emptyMessage?: string;
}

/**
 * ============================================================
 * HELPERS
 * ============================================================
 */
type optionsDefineColor =
  | "none"
  | "default"
  | "info"
  | "error"
  | "success"
  | "warning"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "sendMessage";

const defineColorItem = (option: optionsDefineColor) => {
  switch (option) {
    case "default":
      return "hover:bg-primary hover:text-success";

    case "secondary":
      return "hover:bg-accent";

    case "error":
      return "hover:bg-accent";

    default:
      break;
  }
};

function truncateText(text: string, maxLength: number, ellipsis = "…"): string {
  // Array.from evita cortar emojis e caracteres compostos ao meio
  const chars = Array.from(text);

  if (chars.length <= maxLength) return text;

  const cutAt = Math.max(0, maxLength - Array.from(ellipsis).length);
  return chars.slice(0, cutAt).join("").trimEnd() + ellipsis;
}

/**
 * Normaliza o texto para a busca: ignora maiúsculas/minúsculas e acentos
 * ("acao" encontra "Ação").
 */
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * ============================================================
 * COMPONENT
 * ============================================================
 */
export function SelectLib({
  options,
  placeholder = "Selecione uma opção",
  variant = "default",
  textColor = "default",
  size = "small",
  value,
  IconDefault,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  searchable = false,
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado",
}: SelectProps) {
  const { isCollapsed } = CollpasedContext();
  const truncateAt = isCollapsed ? 30 : 20;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Suporta uso controlado (value) e não controlado (defaultValue).
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value ?? internalValue;

  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Indica que o usuário já interagiu (teclado/mouse) desde que abriu o Select.
  // Enquanto for false, garantimos o foco no input logo após a abertura.
  const userInteractedRef = useRef(false);

  const selectedOption = options.find(
    (option) => option.value === currentValue,
  );

  // Normaliza as labels UMA vez (e não a cada tecla digitada).
  const searchableOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option.value,
        searchKey: normalizeText(option.label),
      })),
    [options],
  );

  const term = searchable ? normalizeText(search) : "";

  // null = sem filtro (tudo visível). Caso contrário, o conjunto de valores que combinam.
  const visibleValues = useMemo(() => {
    if (!term) return null;

    return new Set(
      searchableOptions
        .filter((option) => option.searchKey.includes(term))
        .map((option) => option.value),
    );
  }, [searchableOptions, term]);

  const visibleCount = visibleValues ? visibleValues.size : options.length;

  const firstVisibleValue = visibleValues
    ? searchableOptions.find((option) => visibleValues.has(option.value))?.value
    : undefined;

  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);

    if (next) {
      // Reseta ao abrir (e não ao fechar) para não piscar a lista completa
      // durante a animação de fechamento.
      setSearch("");
      userInteractedRef.current = false;
    }
  };

  // O Radix foca o item selecionado/primeiro item logo após posicionar o popper.
  // Reafirmamos o foco no input por uma janela curta (~300ms) ou até o usuário interagir.
  useEffect(() => {
    if (!open || !searchable) return;

    const focusInput = () => inputRef.current?.focus({ preventScroll: true });

    focusInput();

    let ticks = 0;
    const id = window.setInterval(() => {
      ticks += 1;

      if (userInteractedRef.current || ticks > 10) {
        window.clearInterval(id);
        return;
      }

      if (document.activeElement !== inputRef.current) focusInput();
    }, 30);

    return () => window.clearInterval(id);
  }, [open, searchable]);

  const getFirstVisibleItem = () =>
    viewportRef.current?.querySelector<HTMLElement>(
      '[role="option"]:not([data-disabled]):not([data-filtered])',
    ) ?? null;

  const handleSearchKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    // Escape continua fechando o Select normalmente
    if (e.key === "Escape") return;

    // O Radix bloqueia Tab dentro do Content; mantemos o mesmo comportamento
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }

    // Impede o typeahead do Radix de roubar o foco a cada tecla digitada
    e.stopPropagation();

    if (e.key === "ArrowDown") {
      e.preventDefault();
      getFirstVisibleItem()?.focus();
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (firstVisibleValue) {
        handleValueChange(firstVisibleValue);
        setOpen(false);
      }
    }
  };

  // Teclas que chegam aqui vieram de um item (o input não propaga o keydown).
  const handleContentKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    userInteractedRef.current = true;

    // ArrowUp na primeira opção visível devolve o foco ao campo de busca
    if (
      e.key === "ArrowUp" &&
      document.activeElement === getFirstVisibleItem()
    ) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }

    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Se o foco caiu em um item (ex.: mouse passando por cima), quem digita
    // continua pesquisando: o caractere é redirecionado para o input.
    if (e.key.length === 1 && e.key !== " ") {
      e.preventDefault();
      setSearch((prev) => prev + e.key);
      inputRef.current?.focus();
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      setSearch((prev) => prev.slice(0, -1));
      inputRef.current?.focus();
    }
  };

  return (
    <Select.Root
      value={currentValue}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={selectTriggerVariants({
          variant,
          textColor,
          size,
          className,
        })}
      >
        <div className="block min-w-0 flex flex-row items-center justify-center gap-2 flex-1  overflow-hidden whitespace-nowrap text-ellipsis">
          <Select.Icon className="shrink-0">{IconDefault}</Select.Icon>
          <Select.Value
            placeholder={placeholder}
            className={`block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${colorsText[textColor]}`}
          >
            {selectedOption
              ? truncateText(selectedOption.label, truncateAt)
              : undefined}
          </Select.Value>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          onKeyDown={searchable ? handleContentKeyDown : undefined}
          onPointerMove={
            searchable
              ? () => {
                  userInteractedRef.current = true;
                }
              : undefined
          }
          className={` ${selectContentVariants({ variant })} mt-1`}
        >
          {searchable && (
            <div className="shrink-0 p-1 pb-2">
              <div className="relative">
                <InputLib
                  ref={inputRef}
                  leftIcon={<Search aria-hidden="true" className="shrink-0" size={15} />}
                  inputSize="small"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  className="placeholder:opacity-60 focus:border-primary"
                />
              </div>
            </div>
          )}

          <Select.Viewport
            ref={viewportRef}
            className={selectViewportVariants()}
          >
            {/*
              IMPORTANTE: os itens NÃO são montados/desmontados pelo filtro.
              Apenas escondemos os que não combinam. Desmontar/montar itens faz o
              Radix recalcular o "item selecionado" e refocar item a cada tecla
              (foco perdido no input) e ainda dispara dezenas de updates internos
              (travamento).
            */}
            <ScrollListLib
              variant="default"
              border="none"
              padding="min"
              className="min-h-0 flex-1 px-2 shadow-sm"
            >
              {options.map((option) => {
                const isVisible =
                  !visibleValues || visibleValues.has(option.value);

                return (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    style={isVisible ? undefined : { display: "none" }}
                    data-filtered={isVisible ? undefined : ""}
                    aria-hidden={isVisible ? undefined : true}
                    className={`mt-1 ${selectItemVariants({
                      variant,
                      textColor,
                      size,
                    })} ${defineColorItem(variant) ?? ""}`}
                  >
                    <Select.ItemIndicator className="absolute left-2 flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>

                    <Select.ItemText className="bg-primary">
                      {truncateText(option.label, truncateAt)}
                    </Select.ItemText>
                  </Select.Item>
                );
              })}

              {visibleCount === 0 && (
                <div
                  role="status"
                  className="px-2 py-3 text-center text-sm opacity-60"
                >
                  {emptyMessage}
                </div>
              )}
            </ScrollListLib>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

SelectLib.displayName = "SelectLib";
