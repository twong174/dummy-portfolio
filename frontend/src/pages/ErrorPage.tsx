import transition from "../transitions/Transition";
import TextFlowmap from "../components/TextFlowmap";

const ErrorPage = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-neutral-800">
      <TextFlowmap text="404" className="w-full" />
    </main>
  );
};

export default transition(ErrorPage);
