"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

interface SmartLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
}

export default function SmartLink({
  href,
  children,
  className,
  newTab = false,
}: SmartLinkProps) {
  const [copied, setCopied] = useState(false);

  const isEmail = href?.startsWith("mailto:");

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
        className={className}
        target={!isEmail && newTab ? "_blank" : undefined}
        rel={!isEmail && newTab ? "noreferrer" : undefined}
        onClick={isEmail ? handleClick : undefined}
      >
        {children}
      </a>

      {copied && (
        <div className={styles.copied} role="status">
          Copied email!
        </div>
      )}
    </>
  );
}
