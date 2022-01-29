import { FC, SetStateAction, Dispatch } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { COUNTDOWN_TIME } from "../../constants";
import Button from "../Button";

type Props = {
  setCountdown: Dispatch<SetStateAction<number>>;
};

/**
 * Renders a countdown timer that displays after a vote.
 *
 * @returns {FC}
 */

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
          <span className="text-xl font-semibold text-white">
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
      <div className="grid grid-cols-2 gap-4 w-full h-14">
        <Button href="/results">Results</Button>
        <Button onClick={() => setCountdown(0)}>Next</Button>
      </div>
    </>
  );
};
export default Countdown;
