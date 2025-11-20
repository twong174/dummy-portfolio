import transition from "../transitions/Transition";
import TextFlowmap from "../components/TextFlowmap";
import Header from "../components/Header";
import SkateboardPicture from "../assets/1.jpg";
import Footer from "../components/Footer";
import Description from "../components/about/Description";
import OurValues from "../components/about/OurValues";
import ImageLiquidDistortion from "../animations/ImageLiquidDistortion";

const AboutPage: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-screen">
        <div className="absolute top-0 left-0 right-0 p-8 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <Header />
          </div>
        </div>

        <ImageLiquidDistortion
          imageSrc={SkateboardPicture}
          className="w-full h-full"
        />

        <div className="absolute inset-0 flex items-end justify-center z-10 text-center p-15 pointer-events-none">
          <div className="flex flex-col gap-10 w-full">
            <h1 className="text-[200px] font-black text-slate-50 leading-none uppercase tracking-tighter">
              My Sandbox
            </h1>
            <div className="text-md font-thin text-slate-50 flex items-center justify-between">
              <p>[ ESTABLISHED IN 2022]</p>
              <p>[ SCROLL DOWN TO EXPLORE ]</p>cd 
              <p>[ NEW YORK CITY, NY ]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <Description />
      <OurValues />
      <Footer />
    </div>
  );
};

export default transition(AboutPage);