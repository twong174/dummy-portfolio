import road from "../../assets/road.jpg";
import gsap from "gsap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRef, useCallback, useState } from "react";
import ImageLiquidDistortion from "../../animations/ImageLiquidDistortion";

interface ValueItem {
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    title: "We go all in",
    description: "We're fully committed to every project. No half measures, no shortcuts. When we take on a challenge, we give it everything we've got."
  },
  {
    title: "We're not precious",
    description: "We don't get attached to our ideas. If something isn't working, we pivot. We value progress over perfection and results over ego."
  },
  {
    title: "We're ready to react",
    description: "The world moves fast, and so do we. We're agile, responsive, and always prepared to adapt to new challenges and opportunities."
  },
  {
    title: "We never settle",
    description: "Good enough isn't good enough. We constantly push boundaries, challenge ourselves, and strive for excellence in everything we create."
  }
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

  const toggleExpand = useCallback((index: number) => {
    const content = contentRefs.current[index];
    if (!content) return;

    if (expandedIndex === index) {
      // Collapse
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => setExpandedIndex(null)
      });
    } else {
      // Collapse previous if exists
      if (expandedIndex !== null && contentRefs.current[expandedIndex]) {
        gsap.to(contentRefs.current[expandedIndex], {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      // Expand new
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
  }, [expandedIndex]);

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
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <p className="text-2xl font-light py-8 pr-20">
                      {value.description}
                    </p>
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