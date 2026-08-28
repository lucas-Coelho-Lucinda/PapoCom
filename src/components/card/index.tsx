import { cva, type VariantProps } from "class-variance-authority";
import {
  colorsBackGround,
  colorsBorder,
  colorsHouverBackGround,
} from "../../styles/colors";
import { height, padding, rounded, shadow, width } from "../../styles/sizes";

const cardVariants = cva("transition-all border", {
  variants: {
    colorBackeGround: {
      ...colorsBackGround,
    },
    rounded: rounded,
    width: width,
    height: height,

    colorsHouverBackGround: {
      ...colorsHouverBackGround,
    },

    shadow: {
      ...shadow,
    },

    border: {
      ...colorsBorder,
    },

    padding: padding
  },

  defaultVariants: {
    rounded: "none",
    height: "full",
    shadow: "none",
    width: "full",
    colorBackeGround: "default",
    border: "default",
    padding: "none",
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export const CardLib = ({
  className,
  border,
  padding,
  rounded,
  shadow,
  width,
  height,
  colorBackeGround,
  colorsHouverBackGround,
  ...props
}: CardProps) => {
  return (
    <div
      className={`${cardVariants({ border, padding, colorBackeGround, colorsHouverBackGround, rounded, shadow, width, height })} ${className}`}
      {...props}
    />
  );
};
