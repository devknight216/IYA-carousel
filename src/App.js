import React, { useState, useEffect, Suspense, lazy } from 'react';
import config from './config';

const Carousel = lazy(() => import('./components/Carousel'));

function App() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.API_URL}/ext/search?type=technicalTaskCarouselItem&env=dev`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setItems(data.reverse()); // Reverse the order of items
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel items={items} />
      </Suspense>
      <footer className="bg-[#071c29] text-center p-4">
        <div className='flex justify-end items-center space-x-2'>
          <p className="text-white text-md">in partnership with</p>
          <img 
            src={config.LOGO_URL} 
            alt="Logo" 
            className="mx-auto h-10"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
