"use client";

import { useEffect, useRef } from "react";

export default function Visualizer({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bars: any[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = 150;
      bars = [];
      const barCount = Math.floor(window.innerWidth / 8);
      for (let i = 0; i < barCount; i++) {
        bars.push({
          height: 10,
          targetHeight: 10,
          hue: (i / barCount) * 60 + 340,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bars.length;

      bars.forEach((bar, i) => {
        // If "active", randomize height to simulate music
        if (isActive) {
          bar.targetHeight = Math.random() * 100 + 30;
        } else {
          bar.targetHeight = 10;
        }

        bar.height += (bar.targetHeight - bar.height) * 0.1;

        const gradient = ctx.createLinearGradient(
          0,
          canvas.height,
          0,
          canvas.height - bar.height,
        );
        gradient.addColorStop(0, `hsla(${bar.hue},100%,50%,0.8)`);
        gradient.addColorStop(1, `hsla(${bar.hue},100%,70%,0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth,
          canvas.height - bar.height,
          barWidth - 2,
          bar.height,
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <div
      className={`visualizer-container ${isActive ? "active" : ""}`}
      id="visualizerContainer"
    >
      <canvas ref={canvasRef} id="visualizer"></canvas>
    </div>
  );
}
