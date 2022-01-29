import { FC } from "react";

type Props = {
  className?: string;
};

const Body: FC<Props> = ({ children, className }) => {
  return (
    <>
      <main className="min-h-screen w-full bg-gradient-black flex">
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
