'use client';

import React from 'react';
import { motion, Variants, AnimationProps } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  repeatDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  repeatDelay = 2
}) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i }
    })
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  const animationProps: AnimationProps = {
    variants: container,
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    transition: { repeat: Infinity, repeatDelay }
  };

  return (
    <motion.div className={className} {...animationProps}>
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
