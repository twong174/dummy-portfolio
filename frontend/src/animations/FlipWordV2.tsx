import gsap from "gsap";
import { useRef, useEffect } from "react";

const FlipWordV2 = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textCloneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Set initial positions
    if (textCloneRef.current) {
      gsap.set(textCloneRef.current, { y: 40, opacity: 0 });
    }
  }, []);

  const textHoverEnter = () => {
    if (!textRef.current || !textCloneRef.current) return;

    gsap.to(textRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(textCloneRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const textHoverLeave = () => {
    if (!textRef.current || !textCloneRef.current) return;

    gsap.to(textCloneRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="cursor-pointer relative"
      onMouseEnter={textHoverEnter}
      onMouseLeave={textHoverLeave}
    >
      <p ref={textRef}>FJSDLDA</p>
      <p ref={textCloneRef} className="absolute inset-0">
        FJSDLDA
      </p>
    </div>
  );
};

export default FlipWordV2;
