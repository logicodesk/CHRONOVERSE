import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1400,
  decimals,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Clean value string to extract actual number
  const cleanStr = typeof value === 'string' ? value.replace(/,/g, '') : String(value);
  const targetNum = parseFloat(cleanStr);

  // Determine decimal count automatically if not specified
  let autoDecimals = 0;
  if (cleanStr.includes('.')) {
    autoDecimals = cleanStr.split('.')[1].length;
  }
  const finalDecimals = decimals !== undefined ? decimals : autoDecimals;

  const formatNumber = (num: number) => {
    const formatted = num.toFixed(finalDecimals);
    // If original value had commas, let's restore thousands separators
    if (typeof value === 'string' && value.includes(',')) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    return formatted;
  };

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  useEffect(() => {
    // Reset state to animate again if the target value changes
    setHasTriggered(false);
  }, [value]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            animateCount();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [hasTriggered, targetNum, value]);

  const animateCount = () => {
    if (isNaN(targetNum)) {
      setDisplayValue(String(value));
      return;
    }

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentVal = easedProgress * targetNum;
      setDisplayValue(formatNumber(currentVal));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(formatNumber(targetNum));
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <span ref={containerRef} className={`inline-block transition-all duration-300 ${className}`}>
      {displayValue}
    </span>
  );
};

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className = '' }) => {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Regex matches sequences representing integers (optionally comma-separated) and decimal numbers
  const numberRegex = /(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)/g;
  const parts = children.split(numberRegex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        const isNumber = numberRegex.test(part);
        // Reset regex index state (required due to global flag 'g')
        numberRegex.lastIndex = 0;

        if (isNumber) {
          return <AnimatedCounter key={idx} value={part} />;
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};
