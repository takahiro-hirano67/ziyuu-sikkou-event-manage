// components/ui/CopyButton.tsx

"use client";

import { LuCheck, LuCopy } from "react-icons/lu";;
import { useState } from "react";

// ============================================================
// 生成されたテキストをクリップボードにコピーするボタンコンポーネント
// ============================================================

// 通常サイズ
export const CopyButton = ({
    text,
    className = "",
    label = "コピー",
}: {
    text: string;
    className?: string;
    label?: string;
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            // 2秒後にアイコンを元に戻す
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            disabled={!text || isCopied}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border transition-all 
                ${
                    isCopied
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
                } ${className}`}
            title="クリップボードにコピー">
            {isCopied ? <LuCheck size={14} /> : <LuCopy size={14} />}
            <span>{isCopied ? "コピー完了" : label}</span>
        </button>
    );
};

// 小さいコピーボタン（アイコンのみ、ラベルなし）
export const SmallCopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            disabled={!text}
            className={`
                inline-flex items-center justify-center
                w-7 h-7 rounded-md border
                transition-all
                ${
                    copied
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }
            `}
            title={copied ? "コピーしました" : "コピー"}>
            {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
        </button>
    );
};
