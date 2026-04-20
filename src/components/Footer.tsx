"use client";

import { Instagram, Twitter, Music, Youtube, Share2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socials = [
    { name: "Instagram", icon: <Instagram />, href: "#" },
    { name: "Twitter/X", icon: <Twitter />, href: "#" },
    { name: "Spotify", icon: <Music />, href: "#" },
    { name: "Youtube", icon: <Youtube />, href: "#" },
    { name: "SoundCloud", icon: <Share2 />, href: "#" },
  ];

  return (
    <footer className="mt-24 pt-12 border-t border-[var(--border)] text-center">
      <div className="flex justify-center gap-4 mb-8">
        {socials.map((social, i) => (
          <Link
            key={i}
            href={social.href}
            aria-label={social.name}
            className="group relative w-[50px] h-[50px] rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center transition-all duration-400 hover:-translate-y-1.5 hover:rotate-6 hover:border-[var(--primary)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--gradient)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-[var(--text-muted)] group-hover:text-white group-hover:scale-110 transition-all">
              {social.icon}
            </span>
          </Link>
        ))}
      </div>
      
      <p className="text-[var(--text-muted)] text-[0.85rem] mb-12">
        © {new Date().getFullYear()} DJ Surreal. All rights reserved. Powered by{" "}
        <Link href="#" className="text-[var(--primary)] hover:underline">
          SuperPhone
        </Link>
      </p>
    </footer>
  );
}
