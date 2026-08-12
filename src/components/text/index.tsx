import { cva, type VariantProps } from "class-variance-authority";
import { colorsText } from "../../styles/colors";

const textVariants = cva("transition-colors", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    color: colorsText,
  },

  defaultVariants:{
    color: "default",
    size: "sm"
  }
});

// Extrair tipos automaticamente
type TextVariants = VariantProps<typeof textVariants>;

interface TextProps extends TextVariants {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a" | "p" | "label" | "span";
  children: React.ReactNode;
  className?: string;
}

export const Textlib  = ({
  as = "p",
  size,
  color,
  children,
  className = "",
  ...props
}: TextProps) => {
  const combinedClasses = textVariants({ size, color });
  const finalClasses = [combinedClasses, className].filter(Boolean).join(" ");

  const Component = as;

  const { ...rest } = props; // opcional (clareza)

  return (
    <Component className={finalClasses} {...rest}>
      {children}
    </Component>
  );
}

