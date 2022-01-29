import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
};

/**
 * Renders a single Navigation link.
 * To be used in the Navbar.
 *
 * @returns {FC}
 */

const Navlink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <li className="grid place-items-center h-full text-base font-semibold list-none text-white uppercase transition-all cursor-pointer sm:text-lg hover:scale-95 hover:text-gradient-orange">
        {children}
      </li>
    </Link>
  );
};
export default Navlink;
