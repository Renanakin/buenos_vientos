import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import HomeDesktop from './home/desktop/HomeDesktop';
import HomeMobile from './home/mobile/HomeMobile';

export default function ClientHome() {
  // 768px is the standard 'md' breakpoint in Tailwind
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <HomeMobile />;
  }

  return <HomeDesktop />;
}
