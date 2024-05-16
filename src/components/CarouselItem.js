import React from 'react';

const CarouselItem = ({ item, itemWidth }) => {
  return (
    <div className="flex-shrink-0 pr-4" style={{ width: `${itemWidth}px` }} role="group" aria-label={item.title}>
      <img
        src={`https:${item.image.url}`}
        alt={item.title}
        className="w-full object-cover rounded-xl"
        style={{ height: `${itemWidth / 1.5}px` }}
      />
      <p className="mt-2 text-ellipsis text-lg font-bold overflow-hidden line-clamp-2">
        {item.title}
      </p>
      <a 
        href={item.linkUrl} 
        className="inline-block font-semibold mt-2 px-4 py-1 text-[#0f334f] bg-white rounded-full"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`Read more about ${item.title}`}
      >
        {item.linkText}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          className="inline w-4 h-4 ml-1"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </a>
    </div>
  );
};

export default CarouselItem;
