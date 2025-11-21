import road from "../../assets/road.jpg";
import gsap from "gsap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRef, useCallback, useState } from "react";
import ImageLiquidDistortion from "../../animations/ImageLiquidDistortion";

interface ValueItem {
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
}

const values: ValueItem[] = [
  {
    title: "We go all in",
    description1: "We go all in, so you get the outcomes you deserve.",
    description2:
      "We care fiercely about the work and the people at the heart of it.",
    description3:
      "We dive deeper to find the challenge lurking underneath the surface-level problem. And then we solve it.",
    description4:
      "Our guiding philosophy of ROIdeas® ensures we deliver outcomes (not just outputs) with each and every project.",
  },
  {
    title: "We're not precious",
    description1: "We go all in, so you get the outcomes you deserve.",
    description2:
      "We care fiercely about the work and the people at the heart of it.",
    description3:
      "We dive deeper to find the challenge lurking underneath the surface-level problem. And then we solve it.",
    description4:
      "Our guiding philosophy of ROIdeas® ensures we deliver outcomes (not just outputs) with each and every project.",
  },
  {
    title: "We're ready to react",
    description1: "We go all in, so you get the outcomes you deserve.",
    description2:
      "We care fiercely about the work and the people at the heart of it.",
    description3:
      "We dive deeper to find the challenge lurking underneath the surface-level problem. And then we solve it.",
    description4:
      "Our guiding philosophy of ROIdeas® ensures we deliver outcomes (not just outputs) with each and every project.",
  },
  {
    title: "We never settle",
    description1: "We go all in, so you get the outcomes you deserve.",
    description2:
      "We care fiercely about the work and the people at the heart of it.",
    description3:
      "We dive deeper to find the challenge lurking underneath the surface-level problem. And then we solve it.",
    description4:
      "Our guiding philosophy of ROIdeas® ensures we deliver outcomes (not just outputs) with each and every project.",
  },
];

const OurValues = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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

  const toggleExpand = useCallback(
    (index: number) => {
      const content = contentRefs.current[index];
      if (!content) return;

      if (expandedIndex === index) {
        // Collapse
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => setExpandedIndex(null),
        });
      } else {
        if (expandedIndex !== null && contentRefs.current[expandedIndex]) {
          gsap.to(contentRefs.current[expandedIndex], {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        setExpandedIndex(index);
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }
    },
    [expandedIndex]
  );

  return (
    <>
      <div className="w-full p-8">
        <div className="grid grid-cols-[25%_auto] gap-2">
          <div className="flex gap-2">
            &#183;
            <p className="font-light">OUR VALUES</p>
          </div>

          <div
            ref={containerRef}
            className="flex flex-col gap-20 overflow-x-hidden"
          >
            <p className="text-2xl font-semibold w-1/4">
              Our values shape what we are, how we work, and who we collaborate
              with.
            </p>
            <div className="flex flex-col gap-8">
              {values.map((value, index) => (
                <div key={index}>
                  <div className="border border-b border-black"></div>

                  <div
                    className="between cursor-pointer py-4"
                    onClick={() => toggleExpand(index)}
                  >
                    <h2
                      className="text-8xl font-semibold value-heading"
                      onMouseEnter={() => handleTextHover(index)}
                      onMouseLeave={() => handleTextLeave(index)}
                    >
                      {value.title}
                    </h2>
                    {expandedIndex === index ? (
                      <RemoveIcon fontSize="large" />
                    ) : (
                      <AddIcon fontSize="large" />
                    )}
                  </div>

                  {/* Expandable content */}
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="grid grid-cols-[25%_auto] overflow-hidden opacity-0 h-0"
                  >
                    <p className="text-xl font-semibold">
                      {value.description1}
                    </p>
                    <div className="flex flex-col gap-4 w-4/5">
                      {" "}
                      <p className="text-xl font-light ">
                        {value.description2}
                      </p>{" "}
                      <p className="text-xl font-light ">
                        {value.description3}
                      </p>{" "}
                      <p className="text-xl font-light ">
                        {value.description4}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

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
