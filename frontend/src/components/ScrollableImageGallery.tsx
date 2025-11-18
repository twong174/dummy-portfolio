import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollableImageGallery() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!component.current || !slider.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${slider.current!.offsetWidth}`,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div className="App overflow-x-hidden" ref={component}>
      {/* First Container */}
      <div className="flex flex-col justify-center items-center h-screen bg-yellow-400">
        <h1 className="text-3xl font-bold mb-4">
          Testing horizontal scrolling w/ three sections
        </h1>
        <h2 className="text-xl">First Container</h2>
      </div>

      {/* Horizontal Slider */}
      <div ref={slider} className="flex w-[400vw] h-screen">
        <div className="panel flex items-center justify-center w-screen h-screen bg-blue-500 text-white text-3xl">
          SCROLL DOWN
        </div>
        <div className="panel flex items-center justify-center w-screen h-screen bg-red-500 text-white text-3xl">
          ONE
        </div>
        <div className="panel flex items-center justify-center w-screen h-screen bg-orange-500 text-white text-3xl">
          TWO
        </div>
        <div className="panel flex items-center justify-center w-screen h-screen bg-purple-500 text-white text-3xl">
          THREE
        </div>
      </div>

      {/* Last Container */}
      <div className="flex items-center justify-center h-screen bg-yellow-400 text-3xl">
        Last Container
      </div>
    </div>
  );
} 