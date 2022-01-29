import { FC, useEffect, useState } from "react";
import Button from "../Button";

const Loading: FC = () => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFaded(true);
    }, 7000);
  }, []);

  return (
    <>
      <div
        className={`absolute z-10 h-screen w-full bg-gradient-black grid place-items-center transition-all duration-1000 ${
          faded ? "-translate-y-full opacity-0" : "translate-y-0"
        }`}
      >
        <div
          className="w-[512px] flex flex-col gap-4 cursor-alias"
          onClick={() => setFaded(true)}
        >
          <section className="">
            <div className="inline-block">
              <div className="typed-out">I don&apos;t like sand. </div>
            </div>
            <div className="inline-block ml-1">
              <div className="typed-out-2">It&apos;s coarse and rough</div>
            </div>
          </section>
          <section>
            <div className="inline-block">
              <div className="typed-out-3">and irritating.</div>
            </div>
            <div className="inline-block ml-1">
              <div className="typed-out-4">And it gets everywhere.</div>
            </div>
          </section>
          <section>
            <div className="inline-block">
              <div className="typed-out-5">- Anakin Skywalker</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Loading;
