import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import cn from "../../utils/cn";

const buttonVariants = cva(
  [
    "!leading-none cursor-pointer",
    "relative max-w-full inline-flex flex-row items-center justify-center disabled:opacity-50 disabled:cursor-default",
    "focus-visible:outline-none focus-visible:ring-[3px] ring-typ-accent/20 focus-visible:ring-offset-[1px] focus-visible:ring-offset-typ-bg0",
    "text-sm font-normal",
    "hover:brightness-[0.98] dark:hover:brightness-[1.1]",
  ],
  {
    variants: {
      variant: {
        primary:
          "text-white bg-typ-accent button-gradient-overlay font-semibold",
        secondary:
          "text-typ-c2 bg-typ-c5/20 dark:bg-typ-c5/30 hover:brightness-[0.92] font-medium ring-typ-c2/15",
        white: "text-typ-c2 white-button font-medium",
        destructive: "text-white bg-typ-error font-semibold ring-typ-error/20",
        destructiveSecondary:
          "text-typ-error bg-typ-error/10 hover:bg-typ-error/15 ring-typ-error/20 font-semibold",
        confirm:
          "text-white bg-typ-success button-gradient-overlay ring-typ-success/25 font-semibold",
        line: "text-typ-c2 bg-transparent border border-typ-c7 hover:border-typ-c6 font-medium",
        link: "text-typ-c3 hover:text-typ-c2 bg-none font-medium",
        linkAccent: "text-typ-accent bg-none font-semibold",
        vesper:
          "text-typ-vesper bg-typ-vesper/5 hover:bg-typ-vesper/10 dark:bg-typ-vesper/20 hover:dark:bg-typ-vesper/30 transition-all duration-150 min-w-min ring-typ-vesper/20 font-medium",
      },
      size: {
        tiny: "rounded-full text-2xs px-[8px] gap-[3px] h-[22px]",
        small: "rounded-full text-xs px-[12px] gap-[3px] h-[28px]",
        medium: "rounded-lg text-sm px-[16px] gap-[5px] h-[36px]",
        icon: "rounded-full h-[36px] w-[36px]",
      },
      iconSide: {
        left: "",
        right: "flex-row-reverse",
      },
      glowing: {
        true: "glowing-effect",
        false: "",
      },
    },
    compoundVariants: [
      // Apply the correct color to the glowing-effect (which uses a ::before pseudo element) based on the variant
      {
        variant: ["primary", "white", "line", "link"],
        glowing: true,
        className: "before:text-typ-accent",
      },
      {
        variant: "confirm",
        glowing: true,
        className: "before:text-typ-success",
      },
      {
        variant: "destructive",
        glowing: true,
        className: "before:text-typ-error",
      },
      {
        variant: "destructiveSecondary",
        glowing: true,
        className: "before:text-typ-error",
      },
      {
        variant: "vesper",
        glowing: true,
        className: "before:text-typ-vesper",
      },
      // Remove paddings from links
      {
        variant: ["link", "linkAccent"],
        size: ["tiny", "small", "medium"],
        className: "px-0 py-0 h-auto",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium",
      iconSide: "left",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactElement;
  loading?: boolean;
  glowing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "medium",
      icon,
      iconSide = "left",
      loading,
      glowing,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const iconComponent = (() => {
      if (!icon) return null;

      let iconSize: number;
      let strokeWidth: number;
      switch (size) {
        case "medium":
          iconSize = 15;
          strokeWidth = 2;
          break;
        case "small":
          iconSize = 14;
          strokeWidth = 2.5;
          break;
        default:
          iconSize = 12;
          strokeWidth = 2.75;
      }

      return React.cloneElement(icon, {
        // For UIKit components
        size: iconSize,
        strokeWidth: strokeWidth,
        currentColor: true,
        // For SVGs
        width: iconSize,
        height: iconSize,
        className: cn(
          "text-current relative",
          children &&
            size !== "tiny" && [
              iconSide === "left" ? "-left-[2px]" : "left-[2px]",
            ],
          children &&
            size === "tiny" && [
              iconSide === "left" ? "-left-[1px]" : "left-[1px]",
            ],
          loading && "text-transparent",
          icon.props.className
        ),
      });
    })();

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, glowing, iconSide, className }),
          loading && "pointer-events-none cursor-default"
        )}
        ref={ref}
        tabIndex={loading ? -1 : undefined}
        {...props}
      >
        {iconComponent}
        {children && (
          <span
            className={cn("truncate py-[1px]", loading && "text-transparent")}
          >
            {children}
          </span>
        )}
        {loading && (
          <LoadingSpinner
            className={cn(size === "medium" ? "w-4 h-4" : "w-3 h-3")}
          />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

const LoadingSpinner = ({ className }: { className?: string }) => (
  <div className="absolute inset-0 flex-center text-current">
    <svg
      aria-hidden="true"
      className={cn("animate-spin text-current", className)}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        className="fill-current opacity-15"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        className="fill-current opacity-50"
      />
    </svg>
  </div>
);

export { Button };
