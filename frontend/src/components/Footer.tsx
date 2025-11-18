import SouthWestIcon from "@mui/icons-material/SouthWest";
import { FlipWord } from "../animations/FlipWord";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="p-8 min-h-full flex flex-col justify-between bg-neutral-800">
        <div className="grid grid-cols-[50%_25%_25%]">
          <div className="flex flex-col gap-12">
            <h4 className="text-3xl font-semibold w-1/2 text-slate-50">
              A supersolid is a special quantum state of matter that’s both
              solid and fluid at the same time.
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-50">
                <SouthWestIcon fontSize="inherit" />
                <p className="text-xl font-medium ">Contact</p>
              </div>
              <FlipWord className="w-fit text-xl font-light text-slate-50">
                inbox@supersolide.agency
              </FlipWord>
              <p className="w-1/2 text-xl font-light text-slate-50">
                174 Washington Street Apt 1C, Jersey City, NJ 07302
              </p>
            </div>
          </div>

          <div className="text-slate-50 ">
            <p className="text-lg font-thin">Navigation</p>
            <div className="mt-4 flex flex-col gap-4 text-6xl font-bold">
              <Link to={"/"}>
                {" "}
                <FlipWord flipValue={30}> Home</FlipWord>
              </Link>
              <Link to={"/work"}>
                {" "}
                <FlipWord flipValue={30}> Work</FlipWord>
              </Link>{" "}
              <Link to={"/about"}>
                {" "}
                <FlipWord flipValue={30}> About</FlipWord>
              </Link>{" "}
              <FlipWord flipValue={30}>Systems</FlipWord>
              <FlipWord flipValue={30}>Contact</FlipWord>
            </div>
          </div>

          <div className="text-slate-50 ">
            <p className="text-lg font-thin">Connect</p>
            <div className="mt-4 flex flex-col gap-4 text-4xl font-medium">
              <FlipWord flipValue={30}> Instagram</FlipWord>
              <FlipWord flipValue={30}>LinkedIn</FlipWord>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-50 mt-20 -mb-20 text-sm">
          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>
          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>

          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>
        </div>
      </footer>
      <div className="relative inline-block overflow-hidden bg-neutral-800 w-full h-full">
        {/* Bottom layer - TOP 50% */}

        <h1
          className="
       top-0 left-0
      block m-0 leading-none
      text-[210px] font-black tracking-wider text-slate-50
      [clip-path:polygon(0_0,100%_0,100%_50%,0_50%)]
    "
        >
          SUPERSOLID
        </h1>

        <h1
          className="
       left-0
      block -mt-35 leading-none
      text-[210px] font-black tracking-wider text-slate-50
      [clip-path:polygon(0_0,100%_0,100%_60%,0_60%)]
    "
        >
          SUPERSOLID
        </h1>
        <h1
          className="
       top-0 left-0 
      block -mt-29 leading-none
      text-[210px] font-black tracking-wider text-slate-50
      
    "
        >
          SUPERSOLID
        </h1>
      </div>
    </>
  );
};

export default Footer;
