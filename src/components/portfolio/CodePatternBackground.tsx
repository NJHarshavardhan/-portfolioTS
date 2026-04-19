import React from 'react';

const elements = [
  { text: "{}", top: "5%", left: "5%", fontSize: "14rem", opacity: 0.04, rotate: "12deg", delay: "" },
  { text: "</>", top: "55%", left: "75%", fontSize: "18rem", opacity: 0.03, rotate: "-15deg", delay: "animation-delay-2000" },
  { text: "();", top: "25%", left: "65%", fontSize: "12rem", opacity: 0.05, rotate: "8deg", delay: "animation-delay-4000" },
  { text: "=>", top: "75%", left: "10%", fontSize: "16rem", opacity: 0.04, rotate: "-10deg", delay: "animation-delay-2000" },
  { text: "?", top: "40%", left: "35%", fontSize: "20rem", opacity: 0.02, rotate: "25deg", delay: "animation-delay-4000" },
  { text: "[]", top: "15%", left: "45%", fontSize: "10rem", opacity: 0.03, rotate: "-5deg", delay: "" },
  { text: "&&", top: "85%", left: "50%", fontSize: "14rem", opacity: 0.04, rotate: "15deg", delay: "animation-delay-2000" },
  { text: "const", top: "35%", left: "85%", fontSize: "8rem", opacity: 0.03, rotate: "-20deg", delay: "" },
  { text: "!==", top: "10%", left: "85%", fontSize: "11rem", opacity: 0.04, rotate: "10deg", delay: "animation-delay-2000" },
];

const CodePatternBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {elements.map((el, index) => (
        <div
          key={index}
          className={`absolute text-foreground font-mono font-bold animate-float ${el.delay}`}
          style={{
            top: el.top,
            left: el.left,
            fontSize: el.fontSize,
            opacity: el.opacity,
            transform: `rotate(${el.rotate})`,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
};

export default CodePatternBackground;
