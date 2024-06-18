import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import cn from "../../utils/cn";

/* --------------------------------- Stacks --------------------------------- */

const stackVariants = cva(["flex gap-0"], {
  variants: {
    direction: {
      horizontal: "flex-row max-w-full items-center",
      vertical: "flex-col max-h-full items-stretch",
    },
    noWrap: {
      true: "flex-nowrap min-w-0",
      false: "flex-wrap",
    },
  },
  defaultVariants: {
    noWrap: false,
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, direction, noWrap, ...rest }, ref) => {
    if (countChildren(children) === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(stackVariants({ direction, noWrap, className }))}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, ...rest }, ref) => (
    <Stack ref={ref} direction="horizontal" className={className} {...rest}>
      {children}
    </Stack>
  )
);

HStack.displayName = "HStack";

export const VStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, ...rest }, ref) => (
    <Stack ref={ref} direction="vertical" className={className} {...rest}>
      {children}
    </Stack>
  )
);

VStack.displayName = "VStack";

/* ---------------------------------- Grids --------------------------------- */

const gridVariants = cva(["grid gap-1.5"], {
  variants: {
    columns: {
      "auto-max": "grid-flow-col auto-cols-max",
      "auto-min": "grid-flow-col auto-cols-min",
      auto: "grid-flow-col auto-cols-auto",
      "auto-same": "grid-flow-col auto-cols-fr",
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    },
  },
  defaultVariants: {
    columns: "auto",
  },
});

interface GridProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export const Grid: React.FC<GridProps> = ({ className, columns, ...rest }) => {
  return <div className={gridVariants({ className, columns })} {...rest} />;
};

const countChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(Boolean).length;
};

/* ---------------------------------- Other --------------------------------- */

export const Center = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center items-center w-full",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Center.displayName = "Center";
