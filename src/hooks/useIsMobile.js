import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const getIsMobile = () =>
    typeof window !== 'undefined' && window.innerWidth <= breakpoint;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};