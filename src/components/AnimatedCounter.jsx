import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter: Smooth dynamic number rolling when scrolled into view
 */
export default function AnimatedCounter({ 
  target = 100, 
  duration = 1800, 
  prefix = '', 
  suffix = '',
  className = ''
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const startVal = 0;
          const endVal = typeof target === 'number' ? target : parseInt(target, 10) || 0;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * (endVal - startVal) + startVal);
            setCount(current);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endVal);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-all ${className}`}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
