import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const calculateRandomBlockDelay = (rowIndex: number, totalRows: number) => {
  const blockDelay = Math.random() * 0.5;
  const rowDelay = (totalRows - rowIndex - 1) * 0.05;
  return blockDelay + rowDelay;
};

const transition = <P extends object>(Page: React.ComponentType<P>) => {
  return (props: P) => {
    const entryBlocksRef = useRef<HTMLDivElement>(null);
    const exitBlocksRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Animate entry blocks (reveal page)
      if (entryBlocksRef.current) {
        const blocks = entryBlocksRef.current.querySelectorAll(".entry-block");
        blocks.forEach((block, index) => {
          const rowIndex = Math.floor(index / 11);
          const delay = calculateRandomBlockDelay(rowIndex, 10);
          
          gsap.fromTo(
            block,
            { scaleY: 1 },
            {
              scaleY: 0,
              duration: 1,
              delay,
              ease: "expo.inOut",
            }
          );
        });
      }

      // Fade in page content
      if (pageRef.current) {
        gsap.fromTo(
          pageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, delay: 0.3 }
        );
      }

      // Cleanup function for page exit
      return () => {
        if (exitBlocksRef.current && pageRef.current) {
          const blocks = exitBlocksRef.current.querySelectorAll(".exit-block");
          
          // Fade out page
          gsap.to(pageRef.current, { opacity: 0, duration: 0.3 });

          // Animate exit blocks (cover page)
          blocks.forEach((block, index) => {
            const rowIndex = Math.floor(index / 11);
            const delay = calculateRandomBlockDelay(rowIndex, 10);
            
            gsap.fromTo(
              block,
              { scaleY: 0 },
              {
                scaleY: 1,
                duration: 1,
                delay,
                ease: "expo.inOut",
              }
            );
          });
        }
      };
    }, []);

    return (
      <>
        {/* Page content */}
        <div ref={pageRef}>
          <Page {...props} />
        </div>

        {/* Entry transition - blocks scale down (reveal page) */}
        <div
          ref={entryBlocksRef}
          className="fixed flex flex-col top-0 left-0 w-screen h-screen origin-top z-50 pointer-events-none"
        >
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div className="flex flex-1" key={rowIndex}>
              {Array.from({ length: 11 }).map((_, blockIndex) => (
                <div
                  key={blockIndex}
                  className="entry-block flex-1 bg-red-500"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Exit transition - blocks scale up (cover page) */}
        <div
          ref={exitBlocksRef}
          className="fixed flex flex-col top-0 left-0 w-screen h-screen origin-bottom z-50 pointer-events-none"
        >
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div className="flex flex-1" key={rowIndex}>
              {Array.from({ length: 11 }).map((_, blockIndex) => (
                <div
                  key={blockIndex}
                  className="exit-block flex-1 bg-green-500"
                  style={{ transform: "scaleY(0)" }}
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
  };
};

export default transition;