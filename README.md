# Custom Carousel Implementation

This project provides a custom carousel implementation built with React and Tailwind CSS. It ensures web accessibility by adding ARIA roles and properties, keyboard navigation, and other accessibility features.

## Features

1. Responsive Design: The carousel adjusts its layout based on the screen size.

2. Keyboard Navigation: Users can navigate through the carousel using the left and right arrow keys.

3. Accessibility: Implements ARIA roles and properties for improved accessibility.

## Assumptions

1. The returned data contains an array of items.

2. The first item in the data is for "explore", while the other items are normal carousel items.

## Getting Started

### Prerequisites

- Node.js (v18 or later)

- npm (v8 or later)

### Installation

1. Clone the repository:
```
git clone https://github.com/devknight216/IYA-carousel.git
cd IYA-carousel
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

### Usage

To use the carousel component, pass the fetched data as props to the `Carousel` component.

Example:

```
import React, { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import config from './config';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.API_URL}/ext/search?type=technicalTaskCarouselItem&env=dev`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setItems(data.reverse());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Carousel items={items} />
      <footer className="bg-[#071c29] text-center p-4">
        <div className="flex justify-end items-center space-x-2">
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

```

## Potential Improvements

### TypeScript Support

For better static typing and type safety, it is recommended to use TypeScript in the project.

### Unit Testing

It is good practice to write test cases before building the components. Jest and React Testing Library can be used for unit testing the components.

### Add Mouse and Touch Event Handlers

Implement mouse dragging and touch swiping handlers to improve the usability of the carousel on mobile devices.
