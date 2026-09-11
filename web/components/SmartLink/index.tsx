"use client";

import { useState } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import styles from "./styles.module.scss";

interface SmartLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
  underlineOnHover?: boolean;
}

export default function SmartLink({
  href,
  children,
  className,
  newTab = false,
  underlineOnHover = false,
}: SmartLinkProps) {
  const [copied, setCopied] = useState(false);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const isEmail = href?.startsWith("mailto:");

  const handleMouseEnter = () => {
    if (!underlineRef.current) return;

    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "power2.out", overwrite: true },
    );
  };

  const handleMouseLeave = () => {
    if (!underlineRef.current) return;

    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.25,
      ease: "power2.in",
      overwrite: true,
    });
  };

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isEmail || !href) return;

    event.preventDefault();

    const email = href.replace("mailto:", "");

    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <>
      <a
        href={href}
        className={[styles.link, className].filter(Boolean).join(" ")}
        target={!isEmail && newTab ? "_blank" : undefined}
        rel={!isEmail && newTab ? "noreferrer" : undefined}
        onClick={isEmail ? handleClick : undefined}
        onMouseEnter={underlineOnHover ? handleMouseEnter : undefined}
        onMouseLeave={underlineOnHover ? handleMouseLeave : undefined}
      >
        {children}
        {underlineOnHover && (
          <span ref={underlineRef} className={styles.underline} />
        )}
      </a>

      {copied && (
        <div className={styles.copied} role="status">
          Copied email!
        </div>
      )}
    </>
  );
}
