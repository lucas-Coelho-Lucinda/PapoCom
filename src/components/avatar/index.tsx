import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { colorsBackGround, colorsBorder } from "../../styles/colors";

const avatarVariants = cva(
  "inline-flex items-center justify-center overflow-hidden border-2",
  {
    variants: {
      size: {
        min: "h-7 w-7",
        small: "h-10 w-10",
        median: "h-12 w-12",
        large: "h-14 w-14",
        extralarge: "h-20 w-20",
      },
      shadow: {
        default: "shadow-[0_4px_10px_rgba(0,0,0,0.25)]",
        none: "shadow-none",
      },
      color: {
        ...colorsBackGround,
      },
      border: {
        ...colorsBorder,
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "small",
      shape: "circle",
    },
  },
);

// 🔹 Wrapper para borda
const wrapperVariants = cva("inline-flex border", {
  variants: {
    color: {
      ...colorsBackGround,
    },
    border: {
      ...colorsBorder,
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    border: "default",
    color: "default",
    shape: "circle",
  },
});

interface AvatarProps
  extends
    VariantProps<typeof avatarVariants>,
    VariantProps<typeof wrapperVariants> {
  className?: string;
  src?: string;
  photoOrText?: string;
  isAdmin?: boolean;
  alt?: string;
  fit?: "cover" | "contain";
}
export const AvatarLib = ({
  className,
  shadow,
  isAdmin,
  photoOrText,
  alt,
  fit,
  src,
  shape,
  size,
  color,
  border,
}: AvatarProps) => {
  return (
    <div className={wrapperVariants({ color, border, shape })}>
      <AvatarPrimitive.Root
        className={`${avatarVariants({ size, shape, border, color, className, shadow })}`}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className={`w-full h-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          }`}
        />

        <AvatarPrimitive.Fallback className="flex items-center justify-center w-full h-full">
          {typeof isAdmin === "boolean" && (
            <img
              src={
                isAdmin
                  ? "/src/assets/technical-support.png"
                  : "/src/assets/support.png"
              }
              width={30}
              alt=""
            />
          )}
          {photoOrText}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </div>
  );
};
