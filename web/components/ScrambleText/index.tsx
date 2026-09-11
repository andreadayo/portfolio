"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

interface ScrambleTextProps {
  children: ReactNode;
}

export default function ScrambleText({ children }: ScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const text = String(children);

  function scrambleText() {
    if (!textRef.current) {
      return;
    }

    gsap.to(textRef.current, {
      duration: 1,
      scrambleText: {
        text,
        chars: "upperCase",
        tweenLength: true,
      },
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }

  return (
    <span ref={textRef} onMouseEnter={scrambleText}>
      {text}
    </span>
  );
}
