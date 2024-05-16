import React, { useState, useEffect, useRef, useCallback } from 'react';
import CarouselItem from './CarouselItem';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(300);
  const containerRef = useRef(null);

  const updateItemWidth = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth < 640) {
        setItemWidth(200);
      } else if (containerWidth < 768) {
        setItemWidth(250);
      } else {
        setItemWidth(300);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateItemWidth();
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [updateItemWidth]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const nextSlide = () => {
    if (containerRef.current) {
      const maxVisibleItems = Math.floor(containerRef.current.offsetWidth / itemWidth);
      const maxIndex = items.length - maxVisibleItems;
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <div 
      className="relative bg-[#0f334f] text-white p-5"
      role="region"
      aria-label="Carousel"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car costs rising?</h1>
        <div>
          <button
            onClick={prevSlide}
            className={`p-2 mr-2 ${currentIndex === 0 ? 'text-gray-400' : 'text-white'}`}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`p-2 ${currentIndex >= items.length - Math.floor(containerRef.current ? containerRef.current.offsetWidth / itemWidth : 0) ? 'text-gray-400' : 'text-white'}`}
            disabled={currentIndex >= items.length - Math.floor(containerRef.current ? containerRef.current.offsetWidth / itemWidth : 0)}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <p>Find out how you could save...</p>
      <div className="overflow-hidden relative mt-5" ref={containerRef}>
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * itemWidth}px)`, width: `${items.length * itemWidth}px` }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <CarouselItem key={index} item={item} itemWidth={itemWidth} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
