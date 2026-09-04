import React, { useState, useEffect, useRef } from 'react';

export default function StatCounter({ endValue, prefix = '', suffix = '', duration = 1800 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elemRef = useRef(null);

  // Parse numeric target
  const numericTarget = parseFloat(String(endValue).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * numericTarget);
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(numericTarget);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elemRef.current) {
      observer.observe(elemRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, numericTarget, duration]);

  // Handle special strings like "1:800" or simple numbers
  const isRatio = String(endValue).includes(':');

  return (
    <span ref={elemRef} className="font-mono-data font-bold">
      {isRatio ? (
        hasAnimated ? endValue : '1:000'
      ) : (
        <>
          {prefix}
          {displayValue}
          {suffix}
        </>
      )}
    </span>
  );
}
