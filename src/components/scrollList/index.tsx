import { cva, type VariantProps } from "class-variance-authority";
import { colorsBackGround, colorsBorder } from "../../styles/colors";

const scrollListVariants = cva(
  "h-full min-h-0 w-full min-w-0 overflow-y-auto overflow-x-hidden",
  {
    variants: {
      padding: {
        none: "",
        min: "pr-3",
      },
      variant: {
        ...colorsBackGround,
      },
      border: {
        ...colorsBorder,
      },
    },

    defaultVariants: {
      padding: "none",
      variant: "default",
      border: "default",
    },
  },
);

type ScrollListProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof scrollListVariants>;

export const ScrollListLib = ({
  className,
  variant,
  border,
  padding,
  children,
  ...props
}: ScrollListProps) => {
  return (
    <div
      {...props}
      className={scrollListVariants({
        variant,
        border,
        padding,
        className,
      })}
    >
      <div className="w-full min-w-0">{children}</div>
    </div>
  );
};
