'use client'
import { useEffect, useRef } from "react";
import './index.css';

export default function Animate6({children, cssClass}) {

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only trigger animation when scrolling down and element is in view
        if (entry.isIntersecting) {
          if (ref.current) {
            ref.current.classList.add('fadeanimate6');
          }
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();

  }, []); // Removed dependency on lastScrollTop to prevent unwanted re-renders

  return (
    <div ref={ref} className={`transform transition-all duration-200 opacity-0 ${cssClass}`}>
      {children}
    </div>
  );
}
