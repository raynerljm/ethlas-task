import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
};

const Navlink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <li className="text-white text-lg uppercase font-semibold list-none h-full grid place-items-center hover:text-gradient-orange transition-all cursor-pointer hover:scale-95">
        {children}
      </li>
    </Link>
  );
};
export default Navlink;
