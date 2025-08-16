import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  lazy?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  width,
  height,
  lazy = true
}) => {
  const [, setError] = useState(false);
  
  // Используем оригинальный путь к изображению, если оптимизированное недоступно
  const origOptimizedSrc = src;
  const webpOptimizedSrc = webpSrc || src;
  
  // Проверяем, нужно ли использовать ленивую загрузку
  const lazyProps = lazy ? {
    loading: 'lazy' as const,
    className: `${className} lazy`,
    'data-src': origOptimizedSrc,
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFhMGYyZSIvPjwvc3ZnPg=='
  } : {
    className,
    src: origOptimizedSrc
  };
  
  return (
    <picture>
      {/* WebP версия */}
      <source
        srcSet={lazy ? undefined : webpOptimizedSrc}
        data-srcset={lazy ? webpOptimizedSrc : undefined}
        type="image/webp"
      />
      
      {/* Оригинальное изображение как fallback */}
      <source
        srcSet={lazy ? undefined : origOptimizedSrc}
        data-srcset={lazy ? origOptimizedSrc : undefined}
        type={`image/${src.split('.').pop()}`}
      />
      
      {/* Изображение */}
      <img
        {...lazyProps}
        alt={alt}
        width={width}
        height={height}
        onError={() => setError(true)}
      />
    </picture>
  );
};

export default ImageWithFallback; 