import Link from "next/link";
import { FC } from "react";

type Props = {
  onClick?: () => void;
  className?: string;
  href?: string;
  isSubmitting?: boolean;
};

/**
 * Renders a generic purpose styled button.
 *
 * @param {string} className To further style the button.
 * @param {string} href Link (within the web app) to navigate to when the button is clicked.
 * @param {() => void} onClick Event to run when the button is clicked.
 * @param {boolean} isSubmitting Boolean that makes the button in a loading state.
 * @returns {FC}
 */

const Button: FC<Props> = ({
  onClick,
  children,
  className,
  href,
  isSubmitting,
}) => {
  const withoutLink = (
    <button
      className={`bg-gradient-orange uppercase text-white font-semibold text-lg tracking-widest shadow-md rounded-full grid place-items-center group-hover:scale-95 transition-all group-hover:bg-gradient-blue hover:scale-95 hover:bg-gradient-blue ${className}`}
      onClick={isSubmitting ? () => {} : onClick}
    >
      {isSubmitting ? <span>Loading...</span> : children}
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
