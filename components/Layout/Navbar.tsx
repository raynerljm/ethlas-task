import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import Navlink from "./Navlink";

type Props = {};

const Navbar: FC<Props> = () => {
  return (
    <nav className="fixed top-0 h-16 w-full px-4 flex items-center">
      <Link href="/" passHref>
        <Image
          src="/images/sand_brand.png"
          alt="Sand Logo"
          layout="fixed"
          height={32}
          width={32}
          className="cursor-pointer filter hover:invert transition-all hover:scale-95"
        />
      </Link>
      <div className="flex gap-8 ml-4 mt-1">
        <Navlink href="/">Home</Navlink>
        <Navlink href="/poll">Poll</Navlink>
        <Navlink href="/results">Results</Navlink>
      </div>
    </nav>
  );
};
export default Navbar;
