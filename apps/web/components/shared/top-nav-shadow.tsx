'use client';

import { useEffect } from 'react';

export default function TopNavShadow() {
  useEffect(() => {
    const topNav = document.getElementById('top-nav');
    if (!topNav) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        topNav.classList.add('shadow-lg');
      } else {
        topNav.classList.remove('shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
