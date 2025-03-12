import { useEffect, useState } from 'react';

export const useWindowResizer = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateWindowSize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsLargeScreen(width >= 1440);

      if (width <= 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    // Perform this logic only on the client
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return { windowWidth, isLargeScreen, cardsPerView };
};
