// components/markdown/MarkdownViewer.tsx

"use client";

import "@/components/markdown/markdown_style.css";
import "katex/dist/katex.min.css"; // 数式用CSS

import { LuCheck, LuCopy } from "react-icons/lu";; // アイコン用
import dynamic from "next/dynamic";
import React, { memo, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown"; // Markdownレンダリング

// --- Plugins ---
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // コードハイライト
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism"; // VSコード風のスタイル
import rehypeKatex from "rehype-katex"; // 数式描画ライブラリを利用してHTML化
import remarkBreaks from "remark-breaks"; // 改行を<br>として扱う
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown (GFM) の記法を適用
import { remarkAlert } from "remark-github-blockquote-alert"; // GitHubスタイルの警告表示適用
import remarkMath from "remark-math"; // 数式記法の認識（$E=mc^2$ や $$...$$など）

// Mermaidコンポーネントを動的インポート（SSR無効化・Loading表示付き）
// これにより、Mermaidが含まれないページでは巨大なライブラリが読み込まれない
const MermaidPreview = dynamic(() => import("./Mermaid"), {
    ssr: false,
    loading: () => <div className="p-4 text-gray-400 animate-pulse">Loading Diagram...</div>,
});

// ============================================================
// テキスト前処理関数
// ============================================================

const preprocessContent = (content: string) => {
    if (!content) return "";

    let processed = content;

    // 1. MathDelimiters normalization
    // Doclingなどが出力する \[ ... \] や \( ... \) を $$...$$ や $...$ に変換
    processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, "$$$$$1$$$$");
    processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, "$$$1$$");

    // 2. OCR Typos Fix
    // Docling特有の "M u t i { H e a d }" を "MultiHead" に修正
    if (processed.includes("M u t i { H e a d }")) {
        processed = processed.replace(/M u t i \{ H e a d \}/g, "\\text{MultiHead}");
    }

    // 3. KaTeX Aligned Fix
    // 数式内に '&' (整列) があり、かつ環境指定(\begin)がない場合、
    // KaTeXがエラーになるため、自動的に aligned 環境で囲む
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, equation) => {
        // 既に環境指定(\begin)がある場合は何もしない
        if (equation.includes("\\begin")) return match;

        // '&' (整列タブ) が含まれている場合、補正対象とする
        if (equation.includes("&")) {
            // $$ の内側に改行を入れ、aligned環境で囲むことで
            // remark-math にブロック数式として認識させ、かつ整列を有効にする
            return `$$\n\\begin{aligned}\n${equation}\n\\end{aligned}\n$$`;
        }

        return match;
    });

    // 4. Code Block normalization
    // コードブロックの ``` の直前に改行がないと正しくパースされない場合への対処
    processed = processed.replace(/([^\n])```/g, "$1\n```");

    return processed;
};

// ============================================================
// メインコンポーネント
// ============================================================

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className }) => {
    // メモ化して前処理を実行
    const processedContent = useMemo(() => preprocessContent(content), [content]);

    return (
        <div className={`markdown ${className || ""}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath, remarkAlert]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // pタグをdivタグに置き換えて、Hydrationエラーを回避（pタグの中にdiv(コードブロック)が入るのを防ぐため）
                    p: ({ children }) => <div className="mb-4 leading-relaxed">{children}</div>,

                    // preタグは、中のcodeタグ(CodeBlock)がスタイルを持つため、ラッパーを外す
                    pre: ({ children }) => <>{children}</>,

                    // codeタグをカスタムコンポーネントに置き換え
                    code: CodeBlock,

                    // --- リンク制御（外部リンクを別タブで開く） ---
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline cursor-pointer"
                        />
                    ),
                }}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
};
// 【メモ化して、contentが変わった時だけ再レンダリングする】
// ストリーミング時は頻繁に更新されるが、ReactのDiff検知により
// 変更部分以外の再描画コストを抑えらる。
export default memo(MarkdownViewer, (prev, next) => prev.content === next.content);

// -----------------------------------------------------------------------------
// コードブロック用コンポーネント（状態管理のために分離）
// -----------------------------------------------------------------------------
const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match ? match[1] : "";
    const codeString = String(children).replace(/\n$/, "");
    const [isCopied, setIsCopied] = useState(false);

    // 【メモ】
    // react-markdown v9+ では inline プロパティが渡されないため、独自に判定。
    // 言語指定(match)がなく、かつコード文字列に改行(\n)が含まれていない場合をインラインとみなす。
    const isInline = inline ?? (!match && !codeString.includes("\n"));

    // 1. インラインコードの場合
    if (isInline) {
        return (
            <code
                className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono mx-0.5 break-all"
                {...props}>
                {children}
            </code>
        );
    }

    // 2. Mermaidの場合
    if (lang === "mermaid") {
        return <MermaidPreview code={codeString} />;
    }

    // 共通のコピー処理
    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // 3. シンタックスハイライト（ヘッダー付きブロック）
    if (match) {
        return (
            <div className="my-4 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                {/* ヘッダー部分 */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 border-b border-gray-200">
                    <span className="text-xs font-medium text-gray-600 select-none">{lang}</span>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                        title="コードをクリップボードにコピー">
                        {isCopied ? (
                            <>
                                <LuCheck size={14} className="text-green-600" />
                                <span className="text-green-600 font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <LuCopy size={14} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>

                {/* コード本文 */}
                <SyntaxHighlighter
                    {...props}
                    style={vs}
                    language={lang}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                    codeTagProps={{
                        style: {
                            backgroundColor: "transparent",
                            padding: 0, // CSS側のパディングを打ち消す
                        },
                    }}>
                    {codeString}
                </SyntaxHighlighter>
            </div>
        );
    }

    // 4. 言語指定なしのブロックコード（フォールバック）
    // ここに来るのは「言語指定はないが、複数行ある」場合
    return (
        <pre className="p-4 my-4 rounded-lg bg-gray-100 overflow-auto border border-gray-200 text-sm font-mono">
            <code className={className} {...props}>
                {children}
            </code>
        </pre>
    );
};
