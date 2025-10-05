
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Draw } from '@/hooks/useDraw';
import { useDraw } from '@/hooks/useDraw';
import { Toolbar } from '@/components/toolbar';

type Tool = 'brush' | 'eraser';

export default function BlankSlatePage() {
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [tool, setTool] = useState<Tool>('brush');

  const drawLine = useCallback(
    ({ prevPoint, currentPoint, ctx }: Draw) => {
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      if (prevPoint) {
        ctx.moveTo(prevPoint.x, prevPoint.y);
      }
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    },
    [color, lineWidth, tool]
  );

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'blank-slate-drawing.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const drawImageOnCanvas = (imageDataUri: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = imageDataUri;
    img.onload = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const hRatio = canvasWidth / img.width;
      const vRatio = canvasHeight / img.height;
      const ratio = Math.min(hRatio, vRatio, 1);
      const centerShift_x = (canvasWidth - img.width * ratio) / 2;
      const centerShift_y = (canvasHeight - img.height * ratio) / 2;
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };
    img.onerror = () => {
      console.error('Failed to load image for drawing.');
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Save current drawing
        const context = canvas.getContext('2d');
        const currentDrawing = context?.getImageData(0, 0, canvas.width, canvas.height);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context?.scale(dpr, dpr);

        // Restore drawing
        if (currentDrawing) {
          context?.putImageData(currentDrawing, 0, 0);
        }
      }
    };

    setCanvasDimensions();
    
    window.addEventListener('resize', setCanvasDimensions);
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [canvasRef]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background overflow-hidden">
      <Toolbar
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        tool={tool}
        setTool={setTool}
        clearCanvas={clear}
        downloadCanvas={downloadCanvas}
        onImageGenerated={drawImageOnCanvas}
      />
      <main className="flex flex-1 w-full p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          className="h-full w-full touch-none rounded-lg bg-white shadow-lg"
        />
      </main>
    </div>
  );
}
