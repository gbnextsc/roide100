
'use client';

import { useEffect, useRef, useState } from 'react';

export type Point = { x: number; y: number };

export interface Draw {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
}

type UseDraw = (onDraw: (props: Draw) => void) => {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  clear: () => void;
};

export const useDraw: UseDraw = (onDraw) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<Point | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getCanvasContext = () => {
    return canvasRef.current?.getContext('2d');
  };

  const getPoint = (e: MouseEvent | TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width * (window.devicePixelRatio || 1));
    const scaleY = canvas.height / (rect.height * (window.devicePixelRatio || 1));

    if (e instanceof MouseEvent) {
      return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    }
    if (e.touches[0]) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: 0, y: 0 };
  };

  const onMouseDown = () => setIsDrawing(true);

  const clear = () => {
    const ctx = getCanvasContext();
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const ctx = getCanvasContext();
      const currentPoint = getPoint(e);
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current });
      prevPointRef.current = currentPoint;
    };

    const mouseUpHandler = () => {
      setIsDrawing(false);
      prevPointRef.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);
    
    // Touch events
    canvasRef.current?.addEventListener('touchmove', handler);
    window.addEventListener('touchend', mouseUpHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
      
      canvasRef.current?.removeEventListener('touchmove', handler);
      window.removeEventListener('touchend', mouseUpHandler);
    };
  }, [onDraw, isDrawing]);

  return { canvasRef, onMouseDown, clear };
};
