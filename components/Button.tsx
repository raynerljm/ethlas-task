import Link from "next/link";
import { FC } from "react";

type Props = {
  onClick?: () => void;
  className?: string;
  href?: string;
};

const Button: FC<Props> = ({ onClick, children, className, href }) => {
  const withoutLink = (
    <button
      className={`bg-gradient-orange uppercase text-white font-semibold text-lg tracking-widest shadow-md rounded-full grid place-items-center group-hover:scale-95 transition-all group-hover:bg-gradient-blue ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {withoutLink}
      </Link>
    );
  }

  return withoutLink;
};
export default Button;
