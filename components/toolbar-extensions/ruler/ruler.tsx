import { MarkerProps } from "@/types";
import React, { useState, useRef } from "react";
import { TbCaretDown } from "react-icons/tb";
import { useStorage,useMutation } from "@liveblocks/react/suspense";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const leftMargin = useStorage((root)=>root.leftMargin) ?? 56
  const setLeftMargin = useMutation(({storage},position:number)=>{
    storage.set("leftMargin",position)
  },[])
  const rightMargin = useStorage((root)=>root.rightMargin) ?? 56
  const setRightMargin = useMutation(({storage},position:number)=>{
    storage.set("rightMargin",position)
  },[])
 

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleMouseLeftDown = () => {
    setIsDraggingLeft(true);
  };

  const handleMouseRightDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {

    const PAGE_WIDTH = 817
    const MIN_PADDING =100

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const contRect = container.getBoundingClientRect();
        const relativeX = e.clientX - contRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLPos = PAGE_WIDTH - rightMargin - MIN_PADDING;
          const newLeftPosition = Math.min(rawPosition, maxLPos);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRPos = PAGE_WIDTH - (leftMargin + MIN_PADDING);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, maxRPos);
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };


const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
} 

const handleLeftDBClick = () => {
    setLeftMargin(56)
} 

const handleRightDBClick = () => {
    setRightMargin(56)
} 


  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      className="h-6 border-b  border-gray-300 flex items-end relative select-none print:hidden w-[816px] mx-auto"
    >
      <div
        className="  h-full w-full relative "
        id="ruler-container"
      >
        <Marker
          position={leftMargin}
          onMouseDown={handleMouseLeftDown}
          onDoubleClick={handleLeftDBClick}
          isDragging={isDraggingLeft}
          isLeft={true}
        />

        <Marker
         position={rightMargin}
         onMouseDown={handleMouseRightDown}
         onDoubleClick={handleRightDBClick}
         isDragging={isDraggingRight}
         isLeft={false}
        />

        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((mark) => {
              const position = (mark * 816) / 82;
              return (
                <div
                  key={mark}
                  className="absolute bottom-0"
                  style={{
                    left: `${position}px`,
                  }}
                >
                  {mark % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1.5px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {mark / 10 + 1}
                      </span>
                    </>
                  )}
                  {mark % 5 === 0 && mark % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1.5px] h-1.5 bg-neutral-500" />
                  )}
                  {mark % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1.5px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Marker = ({
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
  position,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 z-[5] w-4 h-full cursor-ew-resize -ml-2"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`, //square brackets for dynamic
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <TbCaretDown className="absolute left-1/2 top-0 h-full transform -translate-x-1/2 fill-blue-500 text-blue-500" />

      <div
      className="absolute top-4 left-1/2 transform -translate-x-1/2 h-screen w-[1.2px] bg-blue-600  duration-150 border-dashed border-2"
      style={{
        display: isDragging ? 'block' : 'none',
        transform: 'scaleX(0.5)'
      }}
      />
    </div>
  );
};
