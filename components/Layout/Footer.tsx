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
    <footer className="fixed bottom-0 w-full h-8 flex items-center px-4 text-white text-lg">
      <a
        href={GITHUB_LINK}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 filter opacity-30 hover:opacity-100"
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
        className="ml-auto opacity-30 hover:opacity-100"
      >
        Made by Rayner for an Ethlas Task
      </a>
    </footer>
  );
};
export default Footer;
