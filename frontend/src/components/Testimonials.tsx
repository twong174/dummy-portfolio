import incon from "../assets/icon.png";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import pic from "../assets/picture.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { gsap } from "gsap";
import pic2 from "../assets/test.png";
import { useEffect, useRef, useState } from "react";

export const Testimonials = () => {
  const pictureRef = useRef<HTMLImageElement>(null);
  const pictureCloneRef = useRef<HTMLImageElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Hide the clone initially
  useEffect(() => {
    if (pictureCloneRef.current) {
      gsap.set(pictureCloneRef.current, { opacity: 0 });
    }
  }, []);

  const handleMouseClick = () => {
    // Animate current image out
    gsap.to(pictureRef.current, {
      y: -200,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate clone image in
    gsap.fromTo(
      pictureCloneRef.current,
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    // Swap references for next click
    setTimeout(() => {
      const temp = pictureRef.current;
      // You might want to update the image source here for actual carousel functionality
      setCurrentImage((prev) => (prev + 1) % 2); // Example for 2 images
    }, 400);
  };

  return (
    <div className="p-8 w-full h-full flex flex-col gap-20 bg-neutral-800">
      <div className="flex items-center gap-2 text-slate-50">
        &#183;
        <p className="font-light tracking-wide">TESTIMONIALS</p>{" "}
      </div>

      <div className="">
        <p className="text-6xl font-bold w-[90%] text-slate-50">
          “Supersolid has been nothing short of remarkable. Their innovative,
          evidence-based creative approach has empowered us to develop
          exceptionally effective brand strategies and communications.”
        </p>

        <div className="flex items-end gap-2 mt-10">
          <img src={incon} alt="Elissa Gillon" />
          <div className="flex flex-col gap-2 text-slate-50 text-2xl font-medium">
            <p>Elissa Gillon</p>
            <p className="font-light">Marketing and Communications Manager</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 items-end">
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-2">
            <div className="bg-neutral-600 flex items-center justify-center p-2 rounded-xs cursor-pointer">
              <ArrowBackIcon
                fontSize="large"
                className="text-slate-50 cursor-pointer"
              />
            </div>
            <div
              className="bg-neutral-600 flex items-center justify-center p-2 rounded-xs cursor-pointer hover:bg-neutral-700"
              onClick={handleMouseClick}
            >
              <ArrowForwardIcon
                fontSize="large"
                className="text-slate-50 cursor-pointer"
              />
            </div>
          </div>
          <p className="text-5xl text-slate-50 font-medium"> 01 - 02</p>
        </div>
        <div className="flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 text-slate-50 text-xl font-light">
            <CallReceivedIcon fontSize="inherit" />
            <p>See the case study</p>
          </div>
          <div className="overflow-hidden cursor-pointer relative h-64">
            {" "}
            {/* Added fixed height */}
            <img
              ref={pictureRef}
              src={pic}
              className="w-full h-full object-cover absolute top-0 left-0"
              alt="Case study"
            />
            <img
              ref={pictureCloneRef}
              src={pic2}
              className="w-full h-full object-cover absolute top-0 left-0"
              alt="Case study"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
