type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const TwitterIcon = ({
  size = 16,
  className = "",
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.9 2H22l-6.5 7.4L23 22h-6.8l-5.3-6.9L4.7 22H1.6l7-8L1 2h6.9l4.8 6.3L18.9 2z" />
    </svg>
  );
};
