import RockPicture from "../../assets/rocks.jpg";
import ImageLiquidDistortion from "../../animations/ImageLiquidDistortion";

const Description = () => {
  return (
    <div className="p-8 w-full h-screen bg-neutral-800 grid grid-cols-2 gap-8">
      <div className="h-full overflow-hidden">
        <ImageLiquidDistortion
          imageSrc={RockPicture}
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-col justify-center gap-10">
        <p className="text-7xl font-medium text-slate-50">
          A supersolid is a special quantum state of matter that's both solid
          and fluid at the same time.
        </p>
        <p className="text-7xl font-medium text-slate-50">
          Supersolid is a 100% creative-owned agency that's both structured and
          seamless, logical and unexpected, proven and future-proof.
        </p>
      </div>
    </div>
  );
};

export default Description;
