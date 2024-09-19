import React from 'react';

const StatisticCard = React.forwardRef(({ label, value }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white text-purple-600 text-center py-4 rounded border border-pink-300 transition-transform hover:scale-105 cursor-pointer"
    >
      {label}: <span className="font-bold">+{value}</span>
    </div>
  );
});

export default StatisticCard;