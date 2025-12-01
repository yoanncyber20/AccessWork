import React, { useState, useRef } from 'react';
import { Button } from './ui/button';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export default function RippleButton({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  rippleColor = 'rgba(208, 188, 255, 0.5)',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
        />
      ))}
    </Button>
  );
}
