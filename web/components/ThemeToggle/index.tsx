"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import SvgIcon from "@/components/SvgIcon";

const numberOfPoints = 10;
const numberOfPaths = 2;
const pointDelay = 0.3;
const pathDelay = 0.25;
const themeRevealAt = 0.5;

function createPath(points: number[]) {
  let path = `M 0 ${points[0]} C`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const position = ((index + 1) / (points.length - 1)) * 100;
    const controlPoint = position - 100 / (points.length - 1) / 2;
    path += ` ${controlPoint} ${points[index]} ${controlPoint} ${points[index + 1]} ${position} ${points[index + 1]}`;
  }

  return `${path} V 0 H 0`;
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const overlayRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const stopRefs = useRef<SVGStopElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedEntrance = useRef(false);

  useEffect(() => {
    if (!mounted || hasPlayedEntrance.current || !resolvedTheme) {
      return;
    }

    const overlay = overlayRef.current;

    if (!overlay || pathRefs.current.length < numberOfPaths) {
      return;
    }

    hasPlayedEntrance.current = true;
    document.documentElement.dataset.themeTransition = "active";

    const points = Array.from({ length: numberOfPaths }, () =>
      Array.from({ length: numberOfPoints }, () => 100),
    );
    const waveColors =
      resolvedTheme === "light"
        ? ["#f0f0f0", "#dddddd", "#dddddd", "#f0f0f0"]
        : ["#171717", "#212121", "#212121", "#171717"];

    overlay.style.visibility = "visible";
    stopRefs.current.forEach((stop, index) => {
      stop.setAttribute("stop-color", waveColors[index]);
    });
    pathRefs.current.forEach((path, index) => {
      path.setAttribute("d", createPath(points[index]));
    });

    const delays = Array.from(
      { length: numberOfPoints },
      () => Math.random() * pointDelay,
    );

    const startEntrance = () => {
      delete document.documentElement.dataset.initialLoad;

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.9 },
        onUpdate: () => {
          pathRefs.current.forEach((path, index) => {
            path.setAttribute("d", createPath(points[index]));
          });
        },
        onComplete: () => {
          overlay.style.visibility = "hidden";
          delete document.documentElement.dataset.themeTransition;
          document.dispatchEvent(new Event("theme-transition-complete"));
          timelineRef.current = null;
        },
      });
      timeline.call(
        () => {
          document.dispatchEvent(new Event("theme-transition-reveal"));
        },
        [],
        themeRevealAt,
      );

      points.forEach((pathPoints, pathIndex) => {
        pathPoints.forEach((_, pointIndex) => {
          timeline.to(
            pathPoints,
            { [pointIndex]: 0 },
            delays[pointIndex] + pathIndex * pathDelay,
          );
        });
      });

      timelineRef.current = timeline;
    };

    requestAnimationFrame(startEntrance);

    return () => {
      delete document.documentElement.dataset.initialLoad;
    };
  }, [mounted, resolvedTheme]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        style={{ visibility: "hidden" }}
      >
        Dark
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    if (timelineRef.current?.isActive()) {
      return;
    }

    const nextTheme = isDark ? "light" : "dark";
    const points = Array.from({ length: numberOfPaths }, () =>
      Array.from({ length: numberOfPoints }, () => 0),
    );
    const overlay = overlayRef.current;

    if (!overlay) {
      setTheme(nextTheme);
      return;
    }

    const waveColors =
      nextTheme === "light"
        ? ["#f0f0f0", "#dddddd", "#dddddd", "#f0f0f0"]
        : ["#171717", "#212121", "#212121", "#171717"];

    overlay.style.visibility = "visible";
    document.documentElement.dataset.themeTransition = "active";
    stopRefs.current.forEach((stop, index) => {
      stop.setAttribute("stop-color", waveColors[index]);
    });
    pathRefs.current.forEach((path, index) => {
      path.setAttribute("fill", `url(#theme-wave-${index})`);
      path.setAttribute("d", createPath(points[index]));
    });

    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.9 },
      onUpdate: () => {
        pathRefs.current.forEach((path, index) => {
          path.setAttribute("d", createPath(points[index]));
        });
      },
      onComplete: () => {
        overlay.style.visibility = "hidden";
        delete document.documentElement.dataset.themeTransition;
        document.dispatchEvent(new Event("theme-transition-complete"));
        timelineRef.current = null;
      },
    });

    const delays = Array.from(
      { length: numberOfPoints },
      () => Math.random() * pointDelay,
    );

    points.forEach((pathPoints, pathIndex) => {
      pathPoints.forEach((_, pointIndex) => {
        timeline.to(
          pathPoints,
          { [pointIndex]: 100 },
          delays[pointIndex] + pathIndex * pathDelay,
        );
      });
    });

    timeline.add("retract");
    timeline.call(
      () => {
        document.dispatchEvent(new Event("theme-transition-reveal"));
      },
      [],
      `retract+=${themeRevealAt}`,
    );
    timeline.call(
      () => {
        document.documentElement.setAttribute("data-theme", nextTheme);
        setTheme(nextTheme);
      },
      [],
      "retract",
    );

    points.forEach((pathPoints, pathIndex) => {
      pathPoints.forEach((_, pointIndex) => {
        timeline.to(
          pathPoints,
          { [pointIndex]: 0 },
          `retract+=${delays[pointIndex] + pathIndex * pathDelay}`,
        );
      });
    });

    timelineRef.current = timeline;
  }

  return (
    <div
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      {isDark ? (
        <SvgIcon src="/icons/sun.svg" color="var(--text-secondary" size="1em" />
      ) : (
        <SvgIcon
          src="/icons/moon.svg"
          color="var(--text-secondary"
          size="1em"
        />
      )}
      <svg
        ref={overlayRef}
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          visibility: "hidden",
          zIndex: 9999,
        }}
      >
        <defs>
          <linearGradient id="theme-wave-0" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              ref={(stop) => {
                if (stop) stopRefs.current[0] = stop;
              }}
              offset="0%"
            />
            <stop
              ref={(stop) => {
                if (stop) stopRefs.current[1] = stop;
              }}
              offset="100%"
            />
          </linearGradient>
          <linearGradient id="theme-wave-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              ref={(stop) => {
                if (stop) stopRefs.current[2] = stop;
              }}
              offset="0%"
            />
            <stop
              ref={(stop) => {
                if (stop) stopRefs.current[3] = stop;
              }}
              offset="100%"
            />
          </linearGradient>
        </defs>
        {Array.from({ length: numberOfPaths }, (_, index) => (
          <path
            key={index}
            ref={(path) => {
              if (path) pathRefs.current[index] = path;
            }}
            fill={`url(#theme-wave-${index})`}
            d={createPath(Array.from({ length: numberOfPoints }, () => 0))}
          />
        ))}
      </svg>
    </div>
  );
}
