import { cva, type VariantProps } from "class-variance-authority";
import { colorsBackGround } from "../../styles/colors";

const cardVariants = cva("rounded-lg  transition-all", {
  variants: {
    variant: {
      ...colorsBackGround,
    },
    border: {
      ...colorsBackGround,
    },
    padding: {
      min: "p-2 size-auto",
      small: "p-10 size-auto",
      median: "p-30 size-auto",
      large: "p-50 size-full",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "large",
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export const CardLib = ({
  className,
  variant,
  border,
  padding,
  ...props
}: CardProps) => {
  return (
    <div
      className={`${cardVariants({ variant, border, padding })} ${className ?? ""}`}
      {...props}
    />
  );
};
