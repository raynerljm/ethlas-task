import { FC } from "react";

type Props = {
  className?: string;
};

/**
 * Returns a body component to contain the entire application.
 * Enforces max-width at ultra wide screens and horizontal padding at mobile screens.
 *
 * @returns {FC}
 */

const Body: FC<Props> = ({ children, className }) => {
  return (
    <>
      <main className="flex w-full min-h-screen bg-gradient-black">
        <div
          className={`mx-auto max-w-7xl min-h-screen w-full px-4 ${className}`}
        >
          {children}
        </div>
      </main>
    </>
  );
};
export default Body;
