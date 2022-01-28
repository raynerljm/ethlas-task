import { FC, useEffect, useState } from "react";
import Button from "../Button";

const Loading: FC = () => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFaded(true);
    }, 2000);
  }, []);

  return (
    <>
      <div
        className={`absolute z-10 h-screen w-full bg-gradient-blue grid place-items-center transition-all duration-1000 ${
          faded ? "-translate-y-full opacity-0" : "translate-y-0"
        }`}
      >
        <div className="flex gap-1 text-7xl font-semibold">
          <span className="animate-sand-1">S</span>
          <span className="animate-sand-2">A</span>
          <span className="animate-sand-3">N</span>
          <span className="animate-sand-4">D</span>
        </div>
      </div>
    </>
  );
};
export default Loading;
