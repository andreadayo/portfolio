"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import SvgIcon from "@/components/SvgIcon";

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

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
    </div>
  );
}
