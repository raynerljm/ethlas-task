import { FC, SetStateAction, Dispatch } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { COUNTDOWN_TIME } from "../constants";
import Button from "./Button";

type Props = {
  setCountdown: SetStateAction<Dispatch<number>>;
};

const Countdown: FC<Props> = ({ setCountdown }) => {
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={COUNTDOWN_TIME}
        colors="#D97A23"
        size={72}
        strokeWidth={6}
      >
        {({ remainingTime }) => (
          <span className="text-white text-xl font-semibold">
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
      <div className="grid grid-cols-2 h-14 gap-4 w-full">
        <Button href="/results">Results</Button>
        <Button onClick={() => setCountdown(0)}>Next</Button>
      </div>
    </>
  );
};
export default Countdown;
