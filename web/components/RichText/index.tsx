"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";
import SmartLink from "@/components/SmartLink";
import SvgIcon from "@/components/SvgIcon";
import { sanityImageUrl } from "@/lib/sanity";
import styles from "./styles.module.scss";
type RichTextProps = { value: PortableTextBlock[] };

export default function RichText({ value }: RichTextProps) {
  return (
    <>
      <div className={styles.richText}>
        <PortableText
          value={value}
          components={{
            types: {
              image: ({ value }) => {
                const url = sanityImageUrl(value);
                return url ? (
                  <figure>
                    <Image
                      src={url}
                      alt={value.alt || ""}
                      width={1200}
                      height={800}
                    />
                    {value.caption && <figcaption>{value.caption}</figcaption>}
                  </figure>
                ) : null;
              },
              quote: ({ value }) => (
                <blockquote className={styles.quote}>
                  <SvgIcon
                    src="/icons/quote.svg"
                    color="var(--text-primary)"
                    size="1.5em"
                  />
                  <span className={styles.quoteText}> {value.text} </span>
                  {value.author && (
                    <span className={styles.author}> {value.author} </span>
                  )}
                </blockquote>
              ),
              code: ({ value }) => (
                <CodeBlock code={value.code} language={value.language} />
              ),
              button: ({ value }) => (
                <div className={styles.button}>
                  <Button
                    label={value.label}
                    href={value.href}
                    icon={value.icon}
                    type={value.type}
                    target={value.target}
                  />
                </div>
              ),
            },
            marks: {
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              underline: ({ children }) => <u>{children}</u>,
              link: ({ children, value }) => (
                <SmartLink
                  href={value?.href}
                  newTab={value?.newTab}
                  className={
                    value?.href?.startsWith("mailto:")
                      ? styles.emailLink
                      : undefined
                  }
                >
                  {children}
                </SmartLink>
              ),
            },
            block: {
              normal: ({ children }) => <p>{children}</p>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
            },
            list: {
              bullet: ({ children }) => <ul>{children}</ul>,
              number: ({ children }) => <ol>{children}</ol>,
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
              number: ({ children }) => <li>{children}</li>,
            },
          }}
        />
      </div>
    </>
  );
}
