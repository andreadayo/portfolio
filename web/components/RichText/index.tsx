import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import CodeBlock from "@/components/CodeBlock";
import SvgIcon from "@/components/SvgIcon";
import { sanityImageUrl } from "@/lib/sanity";

import styles from "./styles.module.scss";

type RichTextProps = {
  value: PortableTextBlock[];
};

export default function RichText({ value }: RichTextProps) {
  return (
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

                <span className={styles.quoteText}>{value.text}</span>

                {value.author && (
                  <span className={styles.author}>{value.author}</span>
                )}
              </blockquote>
            ),

            code: ({ value }) => {
              return <CodeBlock code={value.code} language={value.language} />;
            },
          },

          marks: {
            strong: ({ children }) => <strong>{children}</strong>,

            em: ({ children }) => <em>{children}</em>,

            underline: ({ children }) => <u>{children}</u>,

            link: ({ children, value }) => (
              <a
                href={value?.href}
                target={value?.newTab ? "_blank" : undefined}
                rel={value?.newTab ? "noreferrer" : undefined}
              >
                {children}
              </a>
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
  );
}
