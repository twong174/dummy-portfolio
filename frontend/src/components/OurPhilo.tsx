import poop from "../assets/poop.png";
import poop2 from "../assets/poop2.png";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import video from "../assets/video.png";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export const OurPhilo = () => {
  useEffect(() => {
    const paragraphs = gsap.utils.toArray(".scroll-in");

    paragraphs.forEach((p) => {
      const split = new SplitText(p as HTMLElement, { type: "words" });

      gsap.from(split.words, {
        yPercent: "random([-100, 100])",
        rotation: "random([-30, 30])",
        ease: "back.out",
        autoAlpha: 0,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        scrollTrigger: {
          trigger: p as HTMLElement,
          start: "top 80%",
          scrub: false,
        },
      });
    });
  }, []);

  return (
    <div className="bg-slate-200 w-full h-full p-8">
      <div className="flex items-center gap-2">
        &#183;
        <p className="font-light tracking-wide">OUR PHILOSOPHY</p>
      </div>
      <h1 className="text-[180px] font-extrabold">ROIdeas</h1>

      <div className="grid grid-cols-[40%_auto] gap-10">
        <div className="flex flex-col gap-10 w-4/5">
          <div className="flex flex-col gap-2">
            <img src={video} />
            <div className="flex items-center justify-between">
              <p>00:58</p>
              <p>PLAY REEL</p>
            </div>
          </div>
          <p className="w-4/5 font-light text-xl">
            This guiding philosophy is underpinned by a seamless agency
            structure and a highly collaborative way of working that delivers
            creative excellence and effectiveness.
          </p>

          <div className="bg-neutral-600 w-fit p-2 rounded-xs">
            <div className="text-slate-50 text-end">
              <ArrowOutwardIcon fontSize="inherit" />
            </div>
            <p className="text-slate-50 font-light text-xl">About Supersolid</p>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <div className="text-5xl font-semibold w-4/5 flex flex-col gap-20">
            <p className="scroll-in">
              Supersolid’s registered trademark is the unrivalled Return On
              Ideas we deliver for our clients.
            </p>
            <p className="scroll-in">
              We believe creativity is the most powerful and profitable
              investment any organisation can make.
            </p>
          </div>
          <div className="flex items-start gap-10 text-2xl font-bold ">
            <p>ROIdeas highlights</p>
            <div className="">
              <p>#1 in Sports on the App Store</p>
              <p>+162% diverse stem cell donors</p>
              <p>11.6M active monthly users</p>
              <p>2.8B TikTok views globally</p>
              <p>$57M startup funding secured</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[60%_auto] mt-30 gap-2">
        <img src={poop} />
        <img src={poop2} className="w-100 self-end justify-self-end" />
      </div>
    </div>
  );
};
