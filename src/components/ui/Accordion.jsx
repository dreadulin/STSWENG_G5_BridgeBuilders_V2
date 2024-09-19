import { useState, useRef, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Accordion = forwardRef(
  (
    {
      title,
      children,
      className,
      containerClassName,
      accordionOpenColor,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
      if (isOpen) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }, [isOpen]);

    return (
      <div className={cn(className)} ref={ref} {...props}>
        <button
          className={cn(
            "w-full text-left px-6 py-4 focus:outline-none transition-colors duration-200",
            isOpen ? accordionOpenColor : ""
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <span className="text-ellipsis">{title}</span>
            <span
              className={`material-symbols-outlined transition-transform duration-200 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            >
              arrow_drop_down
            </span>
          </div>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            containerClassName
          )}
          style={{ height: `${height}px` }}
        >
          <div ref={contentRef} className="px-4 py-2">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
