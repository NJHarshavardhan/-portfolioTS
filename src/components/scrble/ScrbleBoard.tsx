import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Eraser, Undo, Trash2, SkipForward } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';
import type { Stroke, Point } from './types';

interface ScrbleBoardProps {
  isHost: boolean;
  onDraw: (stroke: Stroke) => void;
  onClear: () => void;
  onSkip?: () => void;
  strokes: Stroke[];
  activeWord: string;
}

const COLORS = ['#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
const BRUSH_SIZES = [2, 5, 10, 20];

export default function ScrbleBoard({ isHost, onDraw, onClear, onSkip, strokes, activeWord }: ScrbleBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const currentPath = useRef<Point[]>([]);

  // Function to redraw canvas
  const drawStrokes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawStrokes();
  }, [strokes]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isHost) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

    currentPath.current = [{ x, y }];
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isHost) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

    const newPoint = { x, y };
    const lastPoint = currentPath.current[currentPath.current.length - 1];

    ctx.beginPath();
    ctx.strokeStyle = isEraser ? '#ffffff' : color; // White background for eraser
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    currentPath.current.push(newPoint);
  };

  const stopDrawing = () => {
    if (!isDrawing || !isHost) return;
    setIsDrawing(false);
    
    if (currentPath.current.length > 0) {
      onDraw({
        points: [...currentPath.current],
        color: isEraser ? '#ffffff' : color, 
        size: brushSize
      });
    }
    currentPath.current = [];
  };

  return (
    <div className="flex flex-col h-full bg-background/50 rounded-3xl border border-white/5 overflow-hidden col-span-1 md:col-span-2 lg:col-span-3">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-muted-foreground uppercase text-sm tracking-widest">
            {isHost ? 'Draw this word:' : 'Guess the word!'}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-heading text-primary bg-primary/10 px-4 py-1 rounded-lg border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              {isHost ? activeWord : activeWord.replace(/[a-zA-Z]/g, '_ ')}
            </span>
            {isHost && onSkip && (
              <button 
                onClick={onSkip}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors"
                title="Skip to a different word"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full bg-slate-50 relative flex items-center justify-center cursor-crosshair overflow-hidden touch-none border-y border-white/10">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full max-w-full max-h-full object-contain pointer-events-auto mix-blend-normal"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ touchAction: 'none' }}
        />
        {!isHost && (
          <div className="absolute top-4 right-4 bg-black/50 text-white/70 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-md">
            <Pencil className="w-3 h-3" /> Note: You are guessing
          </div>
        )}
      </div>

      {/* Toolbar (Only for Host) */}
      {isHost && (
        <div className="p-4 border-t border-white/5 bg-background flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setIsEraser(false); }}
                className={`w-8 h-8 rounded-full border-2 transition-transform shadow-sm ${c === color && !isEraser ? 'scale-110 border-primary ring-2 ring-primary/40' : 'border-black/10 scale-90 opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          
          <div className="flex bg-black/30 rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => setIsEraser(false)} 
              className={`p-2 rounded-md ${!isEraser ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white'}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsEraser(true)} 
              className={`p-2 rounded-md ${isEraser ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white'}`}
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 items-center bg-black/30 rounded-lg px-3 border border-white/5">
            <span className="text-xs text-muted-foreground font-medium mr-2">Size</span>
            {BRUSH_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${brushSize === size ? 'bg-primary/20' : 'hover:bg-white/10'}`}
              >
                <div className="bg-white rounded-full bg-current" style={{ width: size/2 + 2, height: size/2 + 2 }} />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onClear}
              className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
