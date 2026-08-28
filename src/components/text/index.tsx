import { cva, type VariantProps } from "class-variance-authority";
import { textSize } from "../../styles/sizes";
import { colorsHouverText, colorsText } from "../../styles/colors";


const textVariants = cva("transition-colors", {
  variants: {
    size: textSize,
    color: colorsText,
    colorHover: colorsHouverText,
  },

  defaultVariants: {
    color: "none",
    colorHover: "none",
    size: "sm",
  },
});

// Extrair tipos automaticamente
type TextVariants = VariantProps<typeof textVariants>;

interface TextProps extends TextVariants {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a" | "p" | "label" | "span";
  children: React.ReactNode;
  className?: string;
}

export const Textlib = ({
  as = "p",
  size,
  color,
  colorHover,
  children,
  className = "",
  ...props
}: TextProps) => {
  const combinedClasses = textVariants({ size, color, colorHover });
  const finalClasses = [combinedClasses, className].filter(Boolean).join(" ");

  const Component = as;

  const { ...rest } = props;

  return (
    <Component className={finalClasses} {...rest}>
      {children}
    </Component>
  );
};
