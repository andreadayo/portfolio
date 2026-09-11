"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  isCentered?: boolean;
  isInline?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  isCentered = false,
  isInline = false,
}: RevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = revealRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(element, { clearProps: "all" });
      return;
    }

    gsap.set(element, { autoAlpha: 0, y: 24, filter: "blur(4px)" });

    let hasRevealed = false;

    const reveal = (duringThemeTransition = false) => {
      if (
        hasRevealed ||
        (!duringThemeTransition &&
          document.documentElement.dataset.themeTransition === "active")
      ) {
        return;
      }

      hasRevealed = true;
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        delay,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
      observer.unobserve(element);
      document.removeEventListener(
        "theme-transition-reveal",
        handleThemeTransitionReveal,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        }
      },
      { threshold: 0.12 },
    );
    const handleThemeTransitionComplete = () => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        reveal();
      }
    };
    const handleThemeTransitionReveal = () => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        reveal(true);
      }
    };

    observer.observe(element);
    document.addEventListener(
      "theme-transition-complete",
      handleThemeTransitionComplete,
    );
    document.addEventListener(
      "theme-transition-reveal",
      handleThemeTransitionReveal,
    );

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "theme-transition-complete",
        handleThemeTransitionComplete,
      );
      document.removeEventListener(
        "theme-transition-reveal",
        handleThemeTransitionReveal,
      );
      gsap.killTweensOf(element);
    };
  }, [delay]);

  return (
    <div
      ref={revealRef}
      style={{
        width: isInline ? "auto" : "100%",
        ...(isInline && { display: "inline-block" }),
        ...(isCentered && {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }),
      }}
    >
      {children}
    </div>
  );
}
