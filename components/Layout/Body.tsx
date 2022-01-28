import { FC } from "react";

const Body: FC = ({ children }) => {
  return (
    <>
      <main className="min-h-screen w-full bg-gradient-black">
        <div className="max-w-7xl w-full px-4">{children}</div>
      </main>
    </>
  );
};
export default Body;
