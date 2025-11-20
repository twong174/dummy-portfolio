import road from "../../assets/road.jpg";
import gsap from "gsap";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useCallback } from "react";
import ImageLiquidDistortion from "../../animations/ImageLiquidDistortion";

const OurValues = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(containerRef);

  const handleTextHover = useCallback(
    (index: number) => {
      const headings = q(".value-heading");
      if (headings[index]) {
        gsap.to(headings[index], {
          x: 40,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [q]
  );

  const handleTextLeave = useCallback(
    (index: number) => {
      const headings = q(".value-heading");
      if (headings[index]) {
        gsap.to(headings[index], {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    [q]
  );

  return (
    <>
      <div className="w-full p-8">
        <div className="grid grid-cols-[25%_auto] gap-2">
          <div className="flex gap-2">
            &#183;
            <p className="font-light">OUR VALUES</p>
          </div>

          <div ref={containerRef} className="flex flex-col gap-20 overflow-x-hidden">
            <p className="text-2xl font-semibold w-1/4">
              Our values shape what we are, how we work, and who we collaborate
              with.
            </p>
            <div className="flex flex-col gap-8">
              <div className="border border-b border-black"></div>
              
              {/* Value 1 */}
              <div className="between cursor-pointer">
                <h2
                  className="text-8xl font-semibold value-heading"
                  onMouseEnter={() => handleTextHover(0)}
                  onMouseLeave={() => handleTextLeave(0)}
                >
                  We go all in
                </h2>
                <AddIcon fontSize="large" />
              </div>

              <div className="border border-b border-black"></div>

              {/* Value 2 */}
              <div className="between cursor-pointer">
                <h2 
                  className="text-8xl font-semibold value-heading"
                  onMouseEnter={() => handleTextHover(1)}
                  onMouseLeave={() => handleTextLeave(1)}
                >
                  We're not precious
                </h2>
                <AddIcon fontSize="large" />
              </div>

              <div className="border border-b border-black"></div>

              {/* Value 3 */}
              <div className="between cursor-pointer">
                <h2 
                  className="text-8xl font-semibold value-heading"
                  onMouseEnter={() => handleTextHover(2)}
                  onMouseLeave={() => handleTextLeave(2)}
                >
                  We're ready to react
                </h2>
                <AddIcon fontSize="large" />
              </div>

              <div className="border border-b border-black"></div>

              {/* Value 4 */}
              <div className="between cursor-pointer">
                <h2 
                  className="text-8xl font-semibold value-heading"
                  onMouseEnter={() => handleTextHover(3)}
                  onMouseLeave={() => handleTextLeave(3)}
                >
                  We never settle
                </h2>
                <AddIcon fontSize="large" />
              </div>

              <div className="border border-b border-black"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen overflow-hidden">
        <ImageLiquidDistortion imageSrc={road} className="h-full w-full" />
      </div>
    </>
  );
};

export default OurValues;