import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialize with false or a safe default for SSR/initial load
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    // Modern browsers use addEventListener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } 
    // Fallback for older browsers (e.g. Safari < 14)
    else if (media.addListener) {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
}
