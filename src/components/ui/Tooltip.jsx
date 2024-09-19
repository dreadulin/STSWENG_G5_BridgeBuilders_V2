import * as React from "react";
import { cn } from "@/lib/utils";

const Tooltip = React.forwardRef(
  ({ className, children, tooltipText = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("tooltip relative group", className)}
      {...props}
    >
      {children}
      <span className="w-20 md:w-24 bg-bb-violet text-bb-white text-center rounded-sm p-1 pt-2 absolute z-10 top-full -right-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {tooltipText}
      </span>
    </div>
  )
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
