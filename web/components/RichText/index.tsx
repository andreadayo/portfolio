import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";
import Reveal from "@/components/Reveal";
import SmartLink from "@/components/SmartLink";
import SvgIcon from "@/components/SvgIcon";
import { sanityImageUrl } from "@/lib/sanity";
import styles from "./styles.module.scss";
type RichTextProps = { value: PortableTextBlock[] };

function BlockReveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return <Reveal delay={index * 0.08}>{children}</Reveal>;
}

export default function RichText({ value }: RichTextProps) {
  return (
    <>
      <div className={styles.richText}>
        <PortableText
          value={value}
          components={{
            types: {
              image: ({ value, index }) => {
                const url = sanityImageUrl(value);
                return url ? (
                  <BlockReveal index={index}>
                    <figure>
                      <Image
                        src={url}
                        alt={value.alt || ""}
                        width={1200}
                        height={800}
                      />
                      {value.caption && (
                        <figcaption>{value.caption}</figcaption>
                      )}
                    </figure>
                  </BlockReveal>
                ) : null;
              },
              quote: ({ value, index }) => (
                <BlockReveal index={index}>
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
                </BlockReveal>
              ),
              code: ({ value, index }) => (
                <BlockReveal index={index}>
                  <CodeBlock code={value.code} language={value.language} />
                </BlockReveal>
              ),
              button: ({ value, index }) => (
                <BlockReveal index={index}>
                  <div className={styles.button}>
                    <Button
                      label={value.label}
                      href={value.href}
                      icon={value.icon}
                      type={value.type}
                      target={value.target}
                    />
                  </div>
                </BlockReveal>
              ),
            },
            marks: {
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              underline: ({ children }) => <u>{children}</u>,
              link: ({ children, value }) => (
                <span style={{ fontWeight: 500 }}>
                  <SmartLink
                    href={value?.href}
                    newTab={value?.newTab}
                    className={
                      value?.href?.startsWith("mailto:")
                        ? styles.emailLink
                        : undefined
                    }
                    underlineOnHover
                  >
                    {children}
                  </SmartLink>
                </span>
              ),
            },
            block: {
              normal: ({ children, index }) => (
                <BlockReveal index={index}>
                  <p>{children}</p>
                </BlockReveal>
              ),
              h2: ({ children, index }) => (
                <BlockReveal index={index}>
                  <h2>{children}</h2>
                </BlockReveal>
              ),
              h3: ({ children, index }) => (
                <BlockReveal index={index}>
                  <h3>{children}</h3>
                </BlockReveal>
              ),
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
