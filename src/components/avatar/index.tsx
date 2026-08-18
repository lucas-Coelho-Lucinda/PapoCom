import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { colorsBorder } from "../../styles/colors";

const avatarVariants = cva(
  "inline-flex items-center justify-center overflow-hidden bg-gray-200",
  {
    variants: {
      size: {
        small: "h-10 w-10",
        median: "h-12 w-12",
        large: "h-14 w-14",
        extralarge: "h-20 w-20",
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
const wrapperVariants = cva("inline-flex", {
  variants: {
    decoration: {
      ...colorsBorder,
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    decoration: "default",
    shape: "circle",
  },
});

interface AvatarProps
  extends
    VariantProps<typeof avatarVariants>,
    VariantProps<typeof wrapperVariants> {
  src?: string;
  fallback?: string;
  alt?: string;
  fit?: "cover" | "contain";
}
export const AvatarLib = ({
  fallback,
  alt,
  fit,
  src,
  shape,
  size,
  decoration,
}: AvatarProps) => {
  return (
    <div className={wrapperVariants({ decoration, shape })}>
      <AvatarPrimitive.Root className={`${avatarVariants({ size, shape })}`}>
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className={`w-20 h-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          }`}
        />

        <AvatarPrimitive.Fallback className="flex items-center justify-center w-full h-full bg-muted/20 text-success">
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </div>
  );
};
