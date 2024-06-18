import cn from "../../utils/cn";

const baseTextClassName = "[&>a]:text-typ-accent [&>a]:font-medium";

export type ParagraphProps = React.HtmlHTMLAttributes<HTMLParagraphElement> & {
  noWrap?: boolean;
};
export type HeadingProps = React.HtmlHTMLAttributes<HTMLHeadingElement> & {
  noWrap?: boolean;
};

export const P1 = ({
  children,
  className,
  noWrap,
  ...rest
}: ParagraphProps) => (
  <p
    className={cn(
      "text-base text-typ-c1 [&>a]:text-typ-accent leading-normal",
      noWrap && "truncate max-w-full min-w-0",
      baseTextClassName,
      className
    )}
    {...rest}
  >
    {children}
  </p>
);
export const P2 = ({
  children,
  className,
  noWrap,
  ...rest
}: ParagraphProps) => (
  <p
    className={cn(
      "text-sm text-typ-c2 [&>a]:text-typ-accent leading-snug",
      noWrap && "truncate max-w-full min-w-0",
      baseTextClassName,
      className
    )}
    {...rest}
  >
    {children}
  </p>
);
export const P3 = ({
  children,
  className,
  noWrap,
  ...rest
}: ParagraphProps) => (
  <p
    className={cn(
      "text-xs text-typ-c3 [&>a]:text-typ-accent leading-tight",
      noWrap && "truncate max-w-full min-w-0",
      baseTextClassName,
      className
    )}
    {...rest}
  >
    {children}
  </p>
);
export const H1 = ({ children, className, noWrap, ...rest }: HeadingProps) => (
  <h1
    className={cn(
      "text-5xl text-typ-c1 font-bold",
      baseTextClassName,
      noWrap && "truncate max-w-full min-w-0",
      "text-pretty",
      className
    )}
    {...rest}
  >
    {children}
  </h1>
);
export const H2 = ({ children, className, noWrap, ...rest }: HeadingProps) => (
  <h2
    className={cn(
      "text-3xl text-typ-c1 font-bold",
      baseTextClassName,
      noWrap && "truncate max-w-full min-w-0",
      "text-pretty",
      className
    )}
    {...rest}
  >
    {children}
  </h2>
);
export const H3 = ({ children, className, noWrap, ...rest }: HeadingProps) => (
  <h3
    className={cn(
      "text-xl text-typ-c1 font-bold",
      baseTextClassName,
      noWrap && "truncate max-w-full min-w-0",
      "text-pretty",
      className
    )}
    {...rest}
  >
    {children}
  </h3>
);
export const H4 = ({ children, className, noWrap, ...rest }: HeadingProps) => (
  <h4
    className={cn(
      "text-lg text-typ-c1 font-semibold",
      baseTextClassName,
      noWrap && "truncate max-w-full min-w-0",
      "text-pretty",
      className
    )}
    {...rest}
  >
    {children}
  </h4>
);
export const Ul: React.FC<React.HtmlHTMLAttributes<HTMLUListElement>> = ({
  children,
  className,
  ...rest
}) => (
  <ul
    className={cn("list-disc list-outside marker:text-typ-c4 pl-3", className)}
    {...rest}
  >
    {children}
  </ul>
);
export const Li: React.FC<React.HtmlHTMLAttributes<HTMLLIElement>> = ({
  children,
  className,
  ...rest
}) => (
  <li className={cn("text-sm text-typ-c2 pl-1 my-0.5", className)} {...rest}>
    {children}
  </li>
);
