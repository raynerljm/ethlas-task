import { FC } from "react";

type Props = {
  onClick: () => void;
};

const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <>
      <button
        className="bg-gradient-orange uppercase text-white font-semibold text-lg tracking-widest shadow-md rounded-full grid place-items-center h-14 w-64 hover:scale-105 transition-all duration-300 hover:bg-gradient-blue"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
