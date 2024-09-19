import * as React from 'react';
import { cn } from "@/lib/utils"; 

const Button = React.forwardRef(({ className, type = 'button', children, size = 'md', ...props }, ref) => {
  let sizeClasses;
  switch(size) {
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    case 'xl':
      sizeClasses = 'px-8 py-4 text-xl';
      break;
    case 'md':
    default:
      sizeClasses = 'px-4 py-2 text-sm';
      break;
  }
  
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        `flex justify-center rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 ${sizeClasses}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
