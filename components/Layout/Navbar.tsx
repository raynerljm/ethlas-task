import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import Navlink from "./Navlink";

/**
 * Renders a fixed Navbar on the top for users to navigate the web app.
 *
 * @returns {FC}
 */

const Navbar: FC = () => {
  return (
    <nav className="flex fixed top-0 z-20 items-center px-4 w-full h-16 bg-ethlas-black">
      <Link href="/" passHref>
        <Image
          src="/images/sand_brand.png"
          alt="Sand Logo"
          layout="fixed"
          height={32}
          width={32}
          className="transition-all cursor-pointer hover:scale-95 filter hover:invert"
        />
      </Link>
      <div className="flex gap-8 mt-1 ml-4">
        <Navlink href="/">Home</Navlink>
        <Navlink href="/poll">Poll</Navlink>
        <Navlink href="/results">Results</Navlink>
      </div>
    </nav>
  );
};
export default Navbar;
