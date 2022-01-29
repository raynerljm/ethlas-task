import Image from "next/image";
import { FC } from "react";
import { GITHUB_LINK, LINKEDIN_LINK } from "../../constants";

/**
 * Renders a fixed sticky footer that displays a link to GitHub.
 *
 * @returns {FC}
 */

const Footer: FC = () => {
  return (
    <footer className="flex fixed bottom-0 items-center px-4 w-full h-8 text-lg text-white">
      <a
        href={GITHUB_LINK}
        target="_blank"
        rel="noreferrer"
        className="text-xs sm:text-base flex gap-1 items-center opacity-30 hover:opacity-100 filter"
      >
        <div className="flex items-center mb-1">
          <Image
            src="/images/GitHub-Mark-Light-32px.png"
            alt="GitHub Icon"
            layout="fixed"
            height={20}
            width={20}
          />
        </div>
        GitHub
      </a>
      <a
        href={LINKEDIN_LINK}
        target="_blank"
        rel="noreferrer"
        className="text-xs sm:text-base ml-auto opacity-30 hover:opacity-100"
      >
        Made by Rayner for an Ethlas Task
      </a>
    </footer>
  );
};
export default Footer;
