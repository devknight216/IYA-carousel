import { useState, useEffect, useRef, useCallback } from 'react';

const useCarousel = (items) => {
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
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextSlide = () => {
    if (containerRef.current) {
      const maxVisibleItems = Math.floor(containerRef.current.offsetWidth / itemWidth);
      const maxIndex = items.length - maxVisibleItems;
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return {
    currentIndex,
    itemWidth,
    containerRef,
    prevSlide,
    nextSlide,
    handleKeyDown,
  };
};

export default useCarousel;
