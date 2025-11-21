import SouthWestIcon from "@mui/icons-material/SouthWest";
import { FlipWord } from "../animations/FlipWord";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import FlipWordV2 from "../animations/FlipWordV2";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const paragraphs = containerRef.current.querySelectorAll("p");

    gsap.set([textRef.current, paragraphs], { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    tl.to(textRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    }).to(
      paragraphs,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <footer className="p-8 h-screen flex flex-col justify-between bg-neutral-800">
      <div className="grid grid-cols-[50%_25%_25%]">
        <div className="flex flex-col gap-12">
          <h4 className="text-3xl font-semibold w-1/2 text-slate-50">
            A sandbox is a testing environment in a computer system in which new
            or untested software can be run securely.
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-50">
              <SouthWestIcon fontSize="inherit" />
              <p className="text-xl font-medium ">Contact</p>
            </div>
            <FlipWord className="w-fit text-xl font-light text-slate-50">
              email@email.com
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
            <FlipWordV2/>
          </div>
        </div>
      </div>
      <div className="">
        <h1
          className="text-slate-50 font-black tracking-wider text-[240px] flex items-center justify-center leading-none"
          ref={textRef}
        >
          SANDBOX
        </h1>
        <div
          className="flex items-center justify-between text-slate-50 text-sm"
          ref={containerRef}
        >
          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>
          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>

          <p className="font-thin cursor-pointer"> [ GO BACK TO THE TOP ] </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
