import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonLib } from "../button";

export type PageItem = number | "ellipsis-left" | "ellipsis-right";

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(to - from + 1, 0) }, (_, i) => from + i);

/**
 * Gera a lista de páginas com reticências, sempre com o mesmo número de
 * "slots" (evita o controle pular de largura ao navegar).
 * Ex.: [1, "ellipsis-left", 4, 5, 6, "ellipsis-right", 10]
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getPageRange(
  page: number,
  pageCount: number,
  siblings = 1,
): PageItem[] {
  const totalSlots = siblings * 2 + 5;
  if (pageCount <= totalSlots) return range(1, pageCount);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, pageCount);
  const showLeftDots = left > 3;
  const showRightDots = right < pageCount - 2;
  const edgeCount = 3 + 2 * siblings;

  if (!showLeftDots && showRightDots) {
    return [...range(1, edgeCount), "ellipsis-right", pageCount];
  }
  if (showLeftDots && !showRightDots) {
    return [1, "ellipsis-left", ...range(pageCount - edgeCount + 1, pageCount)];
  }
  return [
    1,
    "ellipsis-left",
    ...range(left, right),
    "ellipsis-right",
    pageCount,
  ];
}

type PaginationLibProps = {
  /** Página atual (começa em 1). */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
};

export function PaginationLib({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  className = "",
}: PaginationLibProps) {
  if (pageCount <= 1) return null;

  const items = getPageRange(page, pageCount, siblings);

  const baseButton = "h-8 min-w-8 px-2 text-sm";
  const outlined = "border border-border hover:bg-secondary-hover";

  return (
    <nav
      aria-label="Paginação"
      className={`flex items-center gap-1 ${className}`}
    >
      <ButtonLib
        type="button"
        size="none"
        colorBackeGround="default"
        textColor="primary"
        colorBackeHouverGround="none"
        textColorHover="none"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
        className={`${baseButton} ${outlined}`}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </ButtonLib>

      {items.map((item) =>
        typeof item === "string" ? (
          <span
            key={item}
            aria-hidden="true"
            className="flex h-8 min-w-8 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <ButtonLib
            key={item}
            type="button"
            size="none"
            colorBackeGround={item === page ? "primary" : "default"}
            textColor={item === page ? "secondary" : "primary"}
            colorBackeHouverGround="none"
            textColorHover="none"
            onClick={() => onPageChange(item)}
            aria-label={`Página ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={`${baseButton} ${item === page ? "" : outlined}`}
          >
            {item}
          </ButtonLib>
        ),
      )}

      <ButtonLib
        type="button"
        size="none"
        colorBackeGround="default"
        textColor="primary"
        colorBackeHouverGround="none"
        textColorHover="none"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Próxima página"
        className={`${baseButton} ${outlined}`}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </ButtonLib>
    </nav>
  );
}
