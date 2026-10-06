import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Tight spring for dot
  const dotSpring = { damping: 40, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  // Fluid spring for outer ring
  const ringSpring = { damping: 25, stiffness: 320, mass: 0.25 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  // Subtle trailing wake position
  const trailSpring = { damping: 20, stiffness: 180, mass: 0.4 };
  const trailX = useSpring(cursorX, trailSpring);
  const trailY = useSpring(cursorY, trailSpring);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovered(false);
        setCursorText('');
        return;
      }

      const interactive = target.closest(
        'a, button, input, textarea, [role="button"], .interactive-target'
      );
      const card = target.closest('[data-cursor-text]');

      if (card) {
        const text = card.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Bioluminescent Trailing Wake Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.25 : 0.12,
        }}
        transition={{ duration: 0.15 }}
        className="w-10 h-10 rounded-full border border-cyan-400 bg-cyan-400/10 blur-[2px]"
      />

      {/* Main Outer Tracking Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 76 : isHovered ? 48 : 28,
          height: cursorText ? 76 : isHovered ? 48 : 28,
          borderColor: isHovered ? '#22d3ee' : 'rgba(34, 211, 238, 0.45)',
          backgroundColor: cursorText
            ? 'rgba(6, 182, 212, 0.18)'
            : isHovered
            ? 'rgba(34, 211, 238, 0.08)'
            : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(6, 182, 212, 0.3)' : 'none',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 350 }}
        className="rounded-full border flex items-center justify-center backdrop-blur-[2px]"
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-200 font-bold px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : cursorText ? 0 : isHovered ? 1.3 : 1,
          backgroundColor: isHovered ? '#38bdf8' : '#22d3ee',
          boxShadow: isHovered
            ? '0 0 10px rgba(56, 189, 248, 0.9)'
            : '0 0 6px rgba(34, 211, 238, 0.6)',
        }}
        transition={{ duration: 0.08 }}
        className="w-1.5 h-1.5 rounded-full"
      />
    </div>
  );
}
