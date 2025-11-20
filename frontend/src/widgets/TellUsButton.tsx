import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

const TellUsButton = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const scrambleTween = useRef<GSAPTween | null>(null);
  const originalText = "Tell us about your challenge";

  const textHoverEnter = () => {
    if (!textRef.current) return;

    // If already running, don't start another
    if (scrambleTween.current) return;

    // Start continuous scramble
    const scramble = () => {
      scrambleTween.current = gsap.to(textRef.current, {
        duration: 1,
        scrambleText: {
          text: originalText,
          chars: "!@#<>", // chars to scramble with
          speed: 0.3,
        },
        onComplete: () => {
          if (scrambleTween.current) {
            scramble(); // repeat continuously while hover
          }
        },
      });
    };

    scramble();
  };

  const textHoverLeave = () => {
    if (!textRef.current) return;

    // Stop continuous scramble
    if (scrambleTween.current) {
      scrambleTween.current.kill();
      scrambleTween.current = null;
    }

    // Restore original text immediately
    gsap.to(textRef.current, {
      duration: 0.2,
      scrambleText: { text: originalText, chars: "XO!@#<>", speed: 0.3 },
    });
  };

  return (
    <div className="flex items-center justify-center text-end mt-auto">
      <div
        className="border border-white p-4 rounded-xs cursor-pointer"
        onMouseEnter={textHoverEnter}
        onMouseLeave={textHoverLeave}
      >
        <p
          className="text-slate-50 font-thin text-xl uppercase tracking-tight"
          ref={textRef}
        >
          {originalText}
        </p>
      </div>
    </div>
  );
};

export default TellUsButton;
