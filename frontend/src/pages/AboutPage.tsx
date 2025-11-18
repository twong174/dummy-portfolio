import transition from "../transitions/Transition";
import TextFlowmap from "../components/TextFlowmap";

const AboutPage: React.FC = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-neutral-800">
      <TextFlowmap text="ABOUT" className="w-full" />
    </main>
  );
};

export default transition(AboutPage);
