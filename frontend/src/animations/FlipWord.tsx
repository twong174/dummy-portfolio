import { useWordFlip } from "../hooks/useWordFlip";

interface FlipWordProps {
  children: string;
  className?: string;
  flipValue?: number;
}

export const FlipWord = ({
  children,
  className = "",
  flipValue = 20,
}: FlipWordProps) => {
  const { wordRef, wordCloneRef, handleMouseEnter, handleMouseLeave } =
    useWordFlip(flipValue);

  return (
    <div
      className={`cursor-pointer relative inline-block overflow-hidden w-fit${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p ref={wordRef}> {children} </p>
      <p ref={wordCloneRef} className="absolute inset-0 opacity-0">
        {" "}
        {children}{" "}
      </p>
    </div>
  );
};
