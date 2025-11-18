import transition from "../transitions/Transition";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FlipWord } from "../animations/FlipWord";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import img1 from "../assets/test.png";
import img2 from "../assets/test2.png";
import img3 from "../assets/test3.png";
import img4 from "../assets/test4.png";
import img5 from "../assets/test5.png";

const WorkPage: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(logoRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const works = [
    { client: "Tik Tok", project: "Tik Tok", type: "Storytelling", img: img1 },
    { client: "Test", project: "Test", type: "Storytelling", img: img2 },
    { client: "Tik Tok", project: "Tik Tok", type: "Storytelling", img: img3 },
    { client: "Tik Tok", project: "Tik Tok", type: "Identity", img: img4 },
    { client: "Tik Tok", project: "Tik Tok", type: "Disruption", img: img5 },
  ];

  const handleRowHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    const row = e.currentTarget;
    const columns = row.querySelectorAll(".row-text");
    const image = row.querySelector(".row-image") as HTMLImageElement;

    gsap.killTweensOf(columns);
    gsap.killTweensOf(image);

    if (isEntering) {
      gsap.to(columns, {
        backgroundColor: "#f8fafc",
        color: "#000000",
        x: 5,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(image, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(columns, {
        backgroundColor: "transparent",
        color: "#f8fafc",
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(image, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className=" h-full w-full bg-neutral-800  flex flex-col gap-96">
      <div className="flex flex-col gap-20">
        <header className="grid grid-cols-[25%_auto_25%] items-start justify-between gap-2 z-40">
          <h2
            ref={logoRef}
            className="text-slate-50 text-3xl font-bold fixed top-8 left-8 z-40"
          >
            <Link to={"/"}>SUPERSOLID</Link>
          </h2>

          <div></div>

          <div
            ref={navRef}
            className="fixed top-8 right-8 z-40 flex items-center justify-between gap-4 text-lg font-thin text-slate-50"
          >
            <div className="flex items-center gap-4">
              <Link to="/work" className="flex">
                <FlipWord> Work </FlipWord>
              </Link>
              <Link to="/about" className="flex">
                <FlipWord> About </FlipWord>
              </Link>
            </div>

            <div className="text-lg font-thin text-slate-50 flex items-center gap-2">
              <FlipWord> Contact </FlipWord>
              <CallMadeIcon fontSize="inherit" />
            </div>
          </div>
        </header>

        <main className="p-8 flex flex-col gap-10">
          <h1 className="text-slate-50 text-[240px] font-extrabold">
            Work [9]
          </h1>
          <div className="text-slate-50 font-light text-2xl">
            <div className="flex items-center gap-6 tracking-wide">
              <p>Filters:</p>
              <p>All</p>
              <p>Identity</p>
              <p>Storytelling</p>
              <p>Disruption</p>
            </div>
          </div>
          <div className="border border-b border-slate-50"></div>
          <div className="grid grid-cols-4 gap-2 ">
            <p className="tracking-widest uppercase font-light text-lg text-slate-50">
              CLIENT
            </p>
            <div></div>
            <p className="tracking-widest uppercase font-light text-lg text-slate-50">
              PROJECT
            </p>
            <p className="text-end tracking-widest uppercase font-light text-lg text-slate-50">
              PROJECT TYPE
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {works.map((work, index) => (
              <Link
                to="/project"
                className="grid grid-cols-[15%_auto_25%_25%] gap-4 relative cursor-pointer"
                key={index}
                onMouseEnter={(e) => handleRowHover(e, true)}
                onMouseLeave={(e) => handleRowHover(e, false)}
              >
                <p className="row-text text-4xl font-medium text-slate-50 p-1 ">
                  {work.client}
                </p>

                <div className=" relative flex items-center justify-center">
                  <img
                    src={work.img}
                    alt={work.project}
                    className="row-image absolute  
               w-full h-75 object-cover opacity-0 pointer-events-none rounded-md"
                  />
                </div>

                <p className="row-text text-4xl font-medium text-slate-50 p-1 ">
                  {work.project}
                </p>

                <p className="row-text text-end text-4xl font-medium text-slate-50 p-1">
                  {work.type}
                </p>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default transition(WorkPage);
