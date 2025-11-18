import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import transition from "../transitions/Transition";
import { FlipWord } from "../animations/FlipWord";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";

gsap.registerPlugin(ScrollTrigger);

const ProjectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const hasNavigatedRef = useRef(false);
  const scrollAttemptsRef = useRef(0);
  const [scrollOutProgress, setScrollOutProgress] = useState(0);

  const lastScrollTimeRef = useRef<number>(Date.now());
  const decayIntervalRef = useRef<Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (scrollOutProgress > 0 && scrollOutProgress < 100) {
      decayIntervalRef.current = setInterval(() => {
        const now = Date.now();

        const timeSinceLastScroll = now - lastScrollTimeRef.current;

        if (timeSinceLastScroll > 100) {
          setScrollOutProgress((prev) => {
            const newProgress = Math.max(0, prev - 2);

            if (newProgress === 0) {
              scrollAttemptsRef.current = 0;
            }
            return newProgress;
          });
        }
      }, 50);
    } else {
      if (decayIntervalRef.current) {
        clearInterval(decayIntervalRef.current);
        decayIntervalRef.current = null;
      }
    }

    return () => {
      if (decayIntervalRef.current) {
        clearInterval(decayIntervalRef.current);
      }
    };
  }, [scrollOutProgress]);

  useLayoutEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;

    hasNavigatedRef.current = false;

    const handleWheel = (e: WheelEvent) => {
      const scrollTrigger = ScrollTrigger.getAll().find(
        (trigger) => trigger.vars.trigger === sectionsRef.current
      );

      if (scrollTrigger && scrollTrigger.progress >= 0.999 && e.deltaY > 0) {
        e.preventDefault();

        if (!hasNavigatedRef.current) {
          lastScrollTimeRef.current = Date.now();
          const scrollOutThreshold = 500; 
          scrollAttemptsRef.current += Math.abs(e.deltaY);

          const progress = Math.min(
            100,
            (scrollAttemptsRef.current / scrollOutThreshold) * 100
          );
          setScrollOutProgress(progress);

          if (progress >= 100) {
            hasNavigatedRef.current = true;
            navigate("/work");
          }
        }
      }
    };

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".section");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionsRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${sectionsRef.current!.offsetWidth}`,
          onEnter: () => {
            scrollAttemptsRef.current = 0;
            setScrollOutProgress(0);
            lastScrollTimeRef.current = Date.now();
          },
          onEnterBack: () => {
            scrollAttemptsRef.current = 0;
            setScrollOutProgress(0);
            lastScrollTimeRef.current = Date.now();
          },
        },
      });

      window.addEventListener("wheel", handleWheel, { passive: false });
    }, containerRef);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      ctx.revert();
    };
  }, [navigate]);

  return (
    <div className="overflow-x-hidden" ref={containerRef}>
      {scrollOutProgress > 0 && scrollOutProgress < 100 && (
        <div className="fixed bottom-8 right-8 z-50  text-black  text-sm font-medium">
          {Math.round(scrollOutProgress)}%
        </div>
      )}

      <header className="fixed z-40 w-full flex items-center justify-between px-8 py-8">
        <div className="flex items-center gap-8">
          <h2 className="text-neutral-800 text-3xl font-bold">SUPERSOLID</h2>
          <div className="">
            <p>Back to Work</p>
          </div>
        </div>
        <div className="flex items-center gap-6 font-light text-lg">
          <Link to="/work" className="flex">
            <FlipWord> Work </FlipWord>
          </Link>
          <Link to="/about" className="flex">
            <FlipWord> About </FlipWord>
          </Link>
          <div className="flex items-center gap-2">
            <FlipWord> Contact </FlipWord>
            <CallMadeIcon fontSize="inherit" />
          </div>
        </div>
      </header>

      <div className="flex h-screen" ref={sectionsRef}>
        <section className="section w-screen h-screen flex-shrink-0 flex items-center justify-center">
          <h1 className="text-4xl">Project Content</h1>
        </section>

        <section className="section w-screen h-screen flex-shrink-0 relative overflow-hidden"></section>

        <section className="section w-screen h-screen flex-shrink-0 relative overflow-hidden bg-red-500"></section>

        <section className="section w-screen h-screen flex-shrink-0 bg-orange-500"></section>

        <section className="section w-screen h-screen flex-shrink-0 bg-green-500 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl opacity-70">Keep scrolling</p>
            <p className="text-lg opacity-50 mt-2">Next project →</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default transition(ProjectPage);
