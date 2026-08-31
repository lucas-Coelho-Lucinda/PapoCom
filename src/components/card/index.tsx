import { cva, type VariantProps } from "class-variance-authority";
import {
  colorsBackGround,
  colorsBorder,
  colorsHouverBackGround,
  colorsHouverText,
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

    colorsHouverText: {
      ...colorsHouverText,
    },

    shadow: {
      ...shadow,
    },

    border: {
      ...colorsBorder,
    },

    padding: padding,
  },

  defaultVariants: {
    colorsHouverText: "none",
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
  colorsHouverText,
  colorBackeGround,
  colorsHouverBackGround,
  ...props
}: CardProps) => {
  return (
    <div
      className={`${cardVariants({ border, padding, colorsHouverText, colorBackeGround, colorsHouverBackGround, rounded, shadow, width, height })} ${className}`}
      {...props}
    />
  );
};
