import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TextFlowmap from "./TextFlowmap";
import CustomEase from "gsap/CustomEase";

const LandingPage: React.FC = () => {
  const counterRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);

  gsap.registerPlugin(CustomEase);

  useEffect(() => {
    CustomEase.create(
      "hop",
      "M0, 0 C0.29, 0 0.348, 0.05 0.422, 0.134 0.494, 0.217 0.484, 0.355 0.5, 0.5 0.518, 0.662 0.515, 0.793 0.596, 0.876 0.701, 0.983 0.72, 0.987 1, 1"
    );

    // Turn header text into spans (same as vanilla)
    const splitText = (element: HTMLElement | null) => {
      if (!element) return;
      const text = element.innerText;
      element.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block translate-y-[500px]">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    splitText(headerRef.current);

    const animateCounter = () => {
      const el = counterRef.current;
      if (!el) return;

      let currentValue = 0;
      const updateInterval = 300;
      const maxDuration = 2000;
      const endValue = 100;
      const startTime = Date.now();

      const update = () => {
        const elapsed = Date.now() - startTime;

        if (elapsed < maxDuration) {
          currentValue = Math.min(
            currentValue + Math.floor(Math.random() * 30) + 5,
            endValue
          );

          el.innerText = String(currentValue);

          setTimeout(update, updateInterval);
        } else {
          el.innerText = String(endValue);

          setTimeout(() => {
            gsap.to(el, {
              y: -40,
              opacity: 0,
              duration: 1,
              ease: "power3.inOut",
              onStart: revealLandingPage,
            });
          }, 500);
        }
      };

      update();
    };

    gsap.fromTo(
      counterRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        onComplete: animateCounter,
      }
    );

    const revealLandingPage = () => {
      gsap.to(heroRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 2,
        ease: "hop",
        onStart: () => {
          gsap.to(heroRef.current, {
            scale: 1,
            duration: 2.25,
            delay: 0.25,
            ease: "power3.inOut",
          });

          gsap.to(overlayRef.current, {
            clipPath: "polygon(0 0, 100% 0%, 100% 0%, 0% 0%)",
            duration: 2,
            delay: 0.5,
            ease: "hop",
          });

          gsap.to(bottomTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 2,
            delay: 1,
            ease: "power3.inOut",
          });

          const spans = headerRef.current?.querySelectorAll("span");
          if (spans) {
            gsap.to(spans, {
              y: 0,
              stagger: 0.1,
              duration: 2,
              delay: 0.75,
              ease: "power4.inOut",
            });
          }
        },
      });
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-800">
      {/* Counter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-5 text-center z-0">
        <p
          ref={counterRef}
          className="relative block translate-y-10 opacity-0 text-[13px] text-[#1a1a1a]"
        >
          0
        </p>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen z-10 scale-[0.7]"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] z-20"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full p-4 flex z-30">
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <a href="#" className="text-[13px] text-slate-50 no-underline">
                we create
              </a>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <p className="text-[13px] text-slate-50 text-right">
                toronto, ca
              </p>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="absolute w-full -top-[5%] left-0 z-10 overflow-hidden">
          <h1
            ref={headerRef}
            className="text-[38.5vw] font-light text-center m-0 p-0 leading-none text-slate-50"
          >
            zxayn
          </h1>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-[5%] w-full text-center z-0">
          <p
            ref={bottomTextRef}
            className="text-lg tracking-wide opacity-0 translate-y-10 text-slate-50"
          >
            scroll down to explore
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
