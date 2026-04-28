type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const FacebookIcon = ({
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
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.2c-1.2 0-1.6.8-1.6 1.5v1.8h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  );
};
