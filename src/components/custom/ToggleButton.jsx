import React from 'react';
import { MdArrowRight } from 'react-icons/md';

const ToggleButton = React.forwardRef(({ category, isActive, onClick, showIcon = true }, ref) => {
  return (
    <button
      ref={ref}
      onClick={() => onClick(category)}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-purple-800' : 'bg-bb-violet'
      } text-white`}
    >
      {category} {showIcon && <MdArrowRight className="ml-2" style={{ fontSize: '24px' }} />}
    </button>
  );
});

ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
