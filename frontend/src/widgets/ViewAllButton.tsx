import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ViewAllButton = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textCloneRef = useRef<HTMLParagraphElement>(null);

  // arrays of characters
  let chars: HTMLElement[] = [];
  let cloneChars: HTMLElement[] = [];

  useEffect(() => {
    if (!textRef.current || !textCloneRef.current) return;

    // Split original
    const split = new SplitText(textRef.current, {
      type: "chars",
    });
    chars = split.chars;

    // Split clone
    const splitClone = new SplitText(textCloneRef.current, {
      type: "chars",
    });
    cloneChars = splitClone.chars;

    // position clone chars offscreen initially
    gsap.set(cloneChars, { y: 20, opacity: 0 });
  }, []);

  const handleHoverEnter = () => {
    if (!chars.length || !cloneChars.length) return;

    gsap.to(chars, {
      y: -20,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });

    gsap.to(cloneChars, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });
  };

  const handleHoverLeave = () => {
    if (!chars.length || !cloneChars.length) return;

    gsap.to(cloneChars, {
      y: -20,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });

    gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });
  };

  return (
    <div
      className="text-slate-50 border rounded-lg p-2 flex items-center gap-4 cursor-pointer relative overflow-hidden"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      <p
        ref={textRef}
        className="absolute inset-0 text-lg font-medium uppercase"
      >
        View All Works
      </p>
      <p
        ref={textCloneRef}
        className="absolute inset-0 text-lg font-medium uppercase"
      >
        View All Works
      </p>

      <ArrowForwardIcon fontSize="inherit" />
    </div>
  );
};

export default ViewAllButton;
