"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const animateLogo = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <header>
      <div 
        className="logo" 
        onClick={animateLogo}
        style={isAnimating ? { animation: 'pulse 0.5s ease' } : {}}
      >
        DJ SURREAL
      </div>
      <div className="header-actions">
        <button className="header-btn" id="themeBtn" onClick={toggleTheme}>
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <span>Theme</span>
        </button>
      </div>
    </header>
  );
}
