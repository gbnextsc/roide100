
'use client';

import * as React from 'react';
import { Brush, Eraser, Trash2, Download, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { AIImageGenerator } from './ai-image-generator';

type Tool = 'brush' | 'eraser';

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  tool: Tool;
  setTool: (tool: Tool) => void;
  clearCanvas: () => void;
  downloadCanvas: () => void;
  onImageGenerated: (imageDataUri: string) => void;
}

export function Toolbar({
  color,
  setColor,
  lineWidth,
  setLineWidth,
  tool,
  setTool,
  clearCanvas,
  downloadCanvas,
  onImageGenerated,
}: ToolbarProps) {
  return (
    <Card className="m-4 shadow-lg">
      <CardContent className="p-2">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={tool === 'brush' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setTool('brush')}
              aria-label="Brush"
            >
              <Brush className="h-5 w-5" />
            </Button>
            <Button
              variant={tool === 'eraser' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setTool('eraser')}
              aria-label="Eraser"
            >
              <Eraser className="h-5 w-5" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 w-10 p-0">
                  <div
                    className="h-6 w-6 rounded-md border"
                    style={{ backgroundColor: color }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer appearance-none border-none bg-transparent p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                  aria-label="Select color"
                />
              </PopoverContent>
            </Popover>

            <div className="flex w-32 items-center gap-2">
              {tool === 'brush' ? (
                <Brush className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eraser className="h-5 w-5 text-muted-foreground" />
              )}
              <Slider
                min={1}
                max={50}
                step={1}
                value={[lineWidth]}
                onValueChange={(values) => setLineWidth(values[0])}
                aria-label="Adjust brush size"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="h-8 hidden md:block" />

          <div className="flex items-center gap-2">
            <AIImageGenerator onImageGenerated={onImageGenerated} />
            <Button variant="outline" size="icon" onClick={clearCanvas} aria-label="Clear canvas">
              <Trash2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadCanvas} aria-label="Download image">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
