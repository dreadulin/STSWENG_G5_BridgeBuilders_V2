import { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Dropdown = forwardRef(
  ({ className, optionContainerClass, title, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative">
        <button
          ref={ref}
          onClick={handleToggle}
          className={cn(`flex items-center`, className)}
          {...props}
        >
          <span className="flex-grow text-left">{title}</span>
          <span
            className={`material-symbols-outlined transition-transform duration-200 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          >
            arrow_drop_down
          </span>
        </button>

        <div
          ref={dropdownRef}
          className={cn(
            `hidden absolute overflow-auto bg-bb-white shadow-lg z-10 flex-col ${
              isOpen ? "block" : "none"
            }`,
            optionContainerClass
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
