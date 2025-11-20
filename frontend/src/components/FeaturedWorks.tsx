import picture from "../assets/test.png";
import picture2 from "../assets/test2.png";
import picture3 from "../assets/test3.png";
import picture4 from "../assets/test4.png";
import picture5 from "../assets/test5.png";
import ViewAllButton from "../widgets/ViewAllButton";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWorks = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
            markers: true, // optional, for debugging
          },
        }
      );
    }
  }, []);

  return (
    <div className="p-8 flex flex-col gap-20 bg-neutral-800">
      <div className="flex h-full w-full bg-neutral-800 items-end justify-between text-slate-50">
        <h3 className="text-7xl font-bold w-3/5" ref={textRef}>
          We work with some of the world's biggest brands and next big things.
        </h3>

        <div className="flex items-center gap-2">
          &#183;
          <p className="font-thin text-sm">FEATURED WORKS </p>
        </div>
      </div>
      <div className="grid grid-cols-[60%_auto] gap-4">
        <div className="w-full flex flex-col gap-1 cursor-pointer h-fit group">
          <div className="overflow-hidden">
            <img
              src={picture}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-slate-50">Tik Tok</p>
            <p className="text-xl font-light text-slate-50">Storytelling</p>
          </div>
          <p className="text-4xl font-semibold text-slate-50">Now You Know</p>
        </div>
        <div className="w-full flex flex-col gap-1 cursor-pointer h-fit group">
          <div className="overflow-hidden">
            <img
              src={picture2}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-slate-50">
              Strength to Give
            </p>
            <p className="text-xl font-light text-slate-50">Storytelling</p>
          </div>{" "}
          <p className="text-4xl font-semibold text-slate-50">
            There's No One Like Me
          </p>
        </div>{" "}
      </div>
      <div className="grid grid-cols-[auto_60%] gap-4">
        <div className="w-full flex flex-col gap-1 cursor-pointer h-fit group">
          <div className="overflow-hidden">
            <img
              src={picture3}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-slate-50">
              Impossible Foods
            </p>
            <p className="text-xl font-light text-slate-50">Storytelling</p>
          </div>
          <p className="text-4xl font-semibold text-slate-50">
            Meat Is What You Make It
          </p>
        </div>
        <div className="w-full flex flex-col gap-1 cursor-pointer h-fit group">
          <div className="overflow-hidden">
            <img
              src={picture4}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-slate-50">
              Australian Taxation Office Foods
            </p>
            <p className="text-xl font-light text-slate-50">Identity</p>
          </div>
          <p className="text-4xl font-semibold text-slate-50">myID</p>
        </div>{" "}
      </div>
      <div className="grid grid-cols-[auto_80%] gap-4">
        <div className="w-full flex flex-col gap-1 "></div>
        <div className="w-full flex flex-col gap-1 cursor-pointer h-fit group">
          <div className="overflow-hidden">
            <img
              src={picture5}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-slate-50">
              National Rugby League{" "}
            </p>
            <p className="text-xl font-light text-slate-50">Storytelling</p>
          </div>
          <p className="text-4xl font-semibold text-slate-50">
            Club Rugby League
          </p>
        </div>{" "}
      </div>

      <div className="border-b-[0.5px] border-slate-50"></div>

      <div className="grid grid-cols-[auto_80%]">
        <div className=""></div>
        <div className="flex flex-col gap-8">
          <h1 className="text-slate-50 font-semibold text-7xl w-2/5">
            See more Super x Solid
          </h1>

          <div className="flex items-center justify-between">
            <ViewAllButton />
            <p className="text-slate-50 text-8xl font-semibold">(9)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
