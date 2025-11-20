import TellUsButton from "../widgets/TellUsButton";

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
     <TellUsButton/>
    </div>
  );
};
