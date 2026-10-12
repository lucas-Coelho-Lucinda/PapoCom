import {
  useRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { colorsBackGround, colorsBorder } from "../../styles/colors";

const scrollListVariants = cva(
  "h-full min-h-0 w-full min-w-0 overflow-y-auto overflow-x-hidden",
  {
    variants: {
      padding: { none: "", min: "pr-3" },
      variant: { ...colorsBackGround },
      border: { ...colorsBorder },
    },
    defaultVariants: { padding: "none", variant: "default", border: "default" },
  },
);

export type ScrollListHandle = {
  /** Força ir ao fim (ex.: quando o próprio usuário envia). */
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  /** Chamar ANTES de inserir itens no topo (paginação) para preservar a posição. */
  captureAnchor: () => void;
  isAtBottom: () => boolean;
};

type ScrollListProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof scrollListVariants> & {
    /** Mantém o scroll colado no fim enquanto o usuário estiver perto dele. */
    stickToBottom?: boolean;
    /** Distância (px) do fim que ainda conta como "no fim". */
    bottomThreshold?: number;
    onAtBottomChange?: (atBottom: boolean) => void;
  };

export const ScrollListLib = forwardRef<ScrollListHandle, ScrollListProps>(
  (
    {
      className,
      variant,
      border,
      padding,
      children,
      stickToBottom = false,
      bottomThreshold = 80,
      onAtBottomChange,
      onScroll,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const atBottomRef = useRef(true);
    const anchorRef = useRef<{ height: number; top: number } | null>(null);

    const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
      const el = containerRef.current;
      if (!el) return;
      atBottomRef.current = true;
      el.scrollTo({ top: el.scrollHeight, behavior });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom,
        captureAnchor: () => {
          const el = containerRef.current;
          if (el) {
            anchorRef.current = { height: el.scrollHeight, top: el.scrollTop };
          }
        },
        isAtBottom: () => atBottomRef.current,
      }),
      [scrollToBottom],
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight <= bottomThreshold;
      if (atBottom !== atBottomRef.current) {
        atBottomRef.current = atBottom;
        onAtBottomChange?.(atBottom);
      }
      onScroll?.(e);
    };

    useEffect(() => {
      const el = containerRef.current;
      const content = contentRef.current;
      if (!el || !content) return;

      const observer = new ResizeObserver(() => {
        // Paginação para cima: compensa a altura inserida no topo.
        if (anchorRef.current) {
          const { height, top } = anchorRef.current;
          el.scrollTop = top + (el.scrollHeight - height);
          anchorRef.current = null;
          return;
        }
        // Conteúdo cresceu (nova mensagem, imagem, etc.) e o usuário estava no fim.
        if (stickToBottom && atBottomRef.current) {
          el.scrollTop = el.scrollHeight;
        }
      });

      observer.observe(content); // conteúdo mudou
      observer.observe(el); // container mudou (ex.: composer cresceu)
      return () => observer.disconnect();
    }, [stickToBottom]);

    return (
      <div
        {...props}
        ref={containerRef}
        onScroll={handleScroll}
        className={scrollListVariants({ variant, border, padding, className })}
      >
        <div ref={contentRef} className="w-full min-w-0">
          {children}
        </div>
      </div>
    );
  },
);

ScrollListLib.displayName = "ScrollListLib";
