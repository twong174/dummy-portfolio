import {useRef} from "react";
import {gsap} from "gsap";  

export const useWordFlip = (flipValue: number = 20) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const wordCloneRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(wordRef.current, {
      y: -flipValue,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.fromTo(wordCloneRef.current, 
      { y: flipValue, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  const handleMouseLeave = () => { 
    gsap.to(wordCloneRef.current, {
      y: -flipValue, opacity: 0, duration: 0.4, ease: "power2.out",
    })
    gsap.fromTo(wordRef.current, {
      y: flipValue, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 0.4, ease: "power2.out",
    })
  }

  return {
    wordRef, wordCloneRef, handleMouseEnter, handleMouseLeave
  }
};