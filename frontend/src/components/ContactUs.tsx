import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const ContactUs = () => {
  return (
    <div className="w-full h-screen bg-neutral-900 p-8 flex flex-col">
      <div className="">
        <div className="flex items-center justify-center gap-2 text-slate-50">
          &#183;
          <p className="font-light tracking-wide">CONTACT US</p>{" "}
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <h1 className=" text-center text-slate-50 text-[180px] leading-none font-extrabold w-4/5">
            Let's find your ROIdea
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center text-end mt-auto">
        <div className="bg-neutral-600 w-fit p-2 rounded-xs">
          <div className="text-slate-50 text-end">
            <ArrowOutwardIcon fontSize="medium" />
          </div>
          <p className="text-slate-50 font-light text-3xl">
            Tell us about your challenge
          </p>
        </div>
      </div>
    </div>
  );
};
