import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#2dd4bf", "#38bdf8", "#818cf8", "#ec4899"], // Theme colors (Teal, Sky Blue, Indigo, Pink)
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    };

    const textStr = typeof children === "string" ? children : children?.toString() || "";
    const words = textStr.trim().split(/\s+/);

    if (words.length > 1) {
      const firstWord = words[0];
      const restOfWords = words.slice(1).join(" ");
      return (
        <span className={`inline-block ${className}`}>
          <span className="text-white mr-2.5 inline-block">{firstWord}</span>
          <span
            className="bg-clip-text text-transparent bg-[length:150%_auto] inline-block font-black"
            style={gradientStyle}
          >
            {restOfWords}
          </span>
        </span>
      );
    }

    return (
      <span
        className={`bg-clip-text text-transparent bg-[length:150%_auto] inline-block ${className}`}
        style={gradientStyle}
      >
        {children}
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
export default AuroraText;
