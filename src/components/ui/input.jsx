import * as React from 'react';
import { cn } from "@/lib/utils"; 

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:ring-indigo-500",
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
