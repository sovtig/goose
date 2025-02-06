import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
}

function GlowingRing() {
  return (
    <div
      className={`absolute pointer-events-none w-[260px] h-[260px] top-[-50px] left-[-30px] origin-center 
                            bg-[linear-gradient(45deg,#13BBAF,#FF4F00)] 
                            animate-[rotate_6s_linear_infinite] z-[-1] 
                            'opacity-0 group-hover/card:opacity-100'}`}
    />
  );
}

export default function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="relative h-full p-[2px] overflow-hidden rounded-[9px] group/card bg-borderSubtle hover:bg-transparent hover:duration-300">
      <GlowingRing />
      {children}
    </div>
  );
}
