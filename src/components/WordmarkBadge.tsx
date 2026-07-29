import React from 'react';
import { cn } from '@/lib/utils';
import { SiJio, SiAirtel, SiVodafone, SiSwiggy, SiZomato, SiTesla, SiFord, SiGeneralmotors } from 'react-icons/si';

interface WordmarkBadgeProps {
  name: string;
  color: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const companyIcons: Record<string, React.ElementType> = {
  'Reliance Jio': SiJio,
  'Airtel': SiAirtel,
  'Vodafone Idea': SiVodafone,
  'Swiggy': SiSwiggy,
  'Zomato': SiZomato,
  'Tesla': SiTesla,
  'Ford': SiFord,
  'GM': SiGeneralmotors,
};

export function WordmarkBadge({ name, color, textColor = '#ffffff', size = 'md', className }: WordmarkBadgeProps) {
  const Icon = companyIcons[name];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1.5 rounded',
    md: 'text-sm px-3 py-1.5 gap-2 rounded-md',
    lg: 'text-xl md:text-3xl px-5 py-3 gap-3 rounded-lg md:rounded-xl',
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 32,
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center font-bold font-sans transition-transform',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color, color: textColor }}
    >
      {Icon && <Icon size={iconSizes[size]} />}
      <span>{name}</span>
    </div>
  );
}
