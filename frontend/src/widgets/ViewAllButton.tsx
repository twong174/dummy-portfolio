import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ViewAllButton = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    splitRef.current = new SplitText(textRef.current, {
      type: "chars",
    });

    gsap.set(splitRef.current.chars, {
      display: "inline-block",
    });
  }, []);

  const handleHoverEnter = () => {
    if (!splitRef.current) return;

    gsap.to(splitRef.current.chars, {
      y: -20,
      opacity: 0,
      stagger: 0.01,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleHoverLeave = () => {
    if (!splitRef.current) return;

    gsap.to(splitRef.current.chars, {
      y: 0,
      opacity: 1,
      stagger: 0.01,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="text-slate-50 border rounded-lg p-2 flex items-center gap-2 cursor-pointer"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      <p ref={textRef} className="text-lg font-medium uppercase">
        View All Works
      </p>
      <ArrowForwardIcon fontSize="inherit" />
    </div>
  );
};

export default ViewAllButton;
