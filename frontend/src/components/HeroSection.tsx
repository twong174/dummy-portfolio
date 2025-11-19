import CallMadeIcon from "@mui/icons-material/CallMade";
import { FlipWord } from "../animations/FlipWord";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TextFlowmap from "./TextFlowmap";
import CustomEase from "gsap/CustomEase";

import { Link } from "react-router-dom";

gsap.registerPlugin(CustomEase);

export const HeroSection = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  const supersolidRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, navRef.current, scrollRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.set(supersolidRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      const tl = gsap.timeline({
        delay: 0.5,
        defaults: { ease: "power3.out" },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
        .to(
          navRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.8"
        )
        .to(
          supersolidRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.5"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

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
          if (isScrolledPast) {
            gsap.to(logoRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        } else {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          if (isScrolledPast) {
            gsap.to(logoRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
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
  }, [isScrolledPast]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector("footer");
      const isFooterVisible =
        footer && footer.getBoundingClientRect().top < window.innerHeight;

      if (scrollY > 100) {
        setIsScrolledPast(true);

        gsap.to(headingRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.out",
        });

        if (!isFooterVisible) {
          gsap.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      } else {
        setIsScrolledPast(false);

        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(logoRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-8 w-full h-screen flex flex-col justify-between bg-neutral-800"
    >
      <header className="grid grid-cols-[25%_auto_25%] items-start justify-between gap-2 z-40">
        <h2 className="text-slate-50 text-3xl font-bold" ref={headingRef}>
          We're a creative-owned agency that specialises in Super x Solid
          outcomes.
        </h2>

        <h2
          ref={logoRef}
          className="text-slate-50 text-3xl font-bold fixed top-8 left-8 opacity-0 z-40"
        >
          SUPERSOLID
        </h2>

        <div className=""></div>

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
            <Link to="/contact" className="flex">
              <FlipWord > Contact </FlipWord>
            </Link>
            <CallMadeIcon fontSize="inherit" />
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center">
        <div className="w-full" ref={supersolidRef}>
          <TextFlowmap text="SUPERSOLID" className="w-full" />
        </div>
      </main>

      <div className="flex items-center justify-center text-slate-50">
        <div className="flex items-center justify-between w-full">
          {" "}
          &#183;
          <p className="text-sm font-light" ref={scrollRef}>
            Scroll to Explore
          </p>
          &#183;
        </div>
      </div>
    </div>
  );
};
