import transition from "../transitions/Transition";
import PixelHover from "../animations/PixelHover";

const ErrorPage = () => {
  return (
    <main className="w-full h-screen bg-neutral-800 flex flex-col items-center justify-center ">
      <PixelHover />
      <p className="text-slate-50">How did you get here?</p>{" "}
    </main>
  );
};

export default transition(ErrorPage);
