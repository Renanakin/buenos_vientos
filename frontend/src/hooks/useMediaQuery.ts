import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Safely sync match state if query changes asynchronously
    const timer = setTimeout(() => {
      setMatches(media.matches);
    }, 0);

    const listener = () => setMatches(media.matches);
    
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => {
        media.removeEventListener('change', listener);
        clearTimeout(timer);
      };
    } else {
      media.addListener(listener);
      return () => {
        media.removeListener(listener);
        clearTimeout(timer);
      };
    }
  }, [query]);

  return matches;
}
