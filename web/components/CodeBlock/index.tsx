import { codeToHtml } from "shiki";

import styles from "./styles.module.scss";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div
      className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
