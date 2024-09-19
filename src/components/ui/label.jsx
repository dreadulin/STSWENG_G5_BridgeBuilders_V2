import * as React from 'react';
import { cn } from "@/lib/utils";

const Label = React.forwardRef(({ className, htmlFor, children, ...props }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={cn(
      "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50",
      className
    )}
    {...props}
  >
    {children}
  </label>
));
Label.displayName = 'Label';

export { Label };
