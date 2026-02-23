// components/markdown/Mermaid.tsx

"use client";

import { LuCheck, LuDownload } from "react-icons/lu";; // アイコン用
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

// mermaidの初期設定
mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "sans-serif",
    flowchart: { htmlLabels: false }, // HTMLラベルを無効化 --> ダウンロード時のセキュリティ制限に対応
});

interface MermaidProps {
    code: string;
}

const Mermaid = ({ code }: MermaidProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [renderId, setRenderId] = useState(""); // ユニークID用

    // コードが変わるたびにユニークなIDを生成（Mermaidのキャッシュ対策）
    useEffect(() => {
        setRenderId(`mermaid${Math.random().toString(36).substring(2, 9)}`);
    }, [code]);

    useEffect(() => {
        if (ref.current && renderId) {
            // 既存のSVGをクリア
            ref.current.innerHTML = "";

            // 一時的な要素を作成して描画させる
            // mermaid.render(id, text, container?) APIを使用
            mermaid
                .render(renderId, code)
                .then(({ svg }) => {
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                    }
                })
                .catch((e) => {
                    console.error("Mermaid render error:", e);
                    if (ref.current)
                        if (ref.current)
                            ref.current.innerHTML = `<p class="text-red-500 text-sm p-2">Rendering Error: ${e.message}</p>`;
                });
        }
    }, [code, renderId]);

    // 画像としてダウンロードする関数
    const handleDownload = () => {
        if (!ref.current) return;
        const svgElement = ref.current.querySelector("svg");
        if (!svgElement) return;

        // 1. SVGデータを文字列化
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);

        // 2. SVGをBase64エンコード
        const svgBase64 =
            "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

        // 3. Canvasに描画
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = 2; // 解像度を2倍（高画質化）

            // 【修正ポイント】viewBox属性から正確なサイズとアスペクト比を取得
            let width = 0;
            let height = 0;
            const viewBox = svgElement.getAttribute("viewBox");

            if (viewBox) {
                // viewBox = "min-x min-y width height" の形式
                const parts = viewBox.split(/\s+/).map(parseFloat);
                if (parts.length === 4) {
                    width = parts[2];
                    height = parts[3];
                }
            }

            // フォールバック（viewBoxがない場合）
            if (width === 0 || height === 0) {
                const rect = svgElement.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
            }

            // 正確なアスペクト比でCanvasサイズを設定
            canvas.width = width * scale;
            canvas.height = height * scale;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // 背景を白で塗りつぶす
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 画像を描画（Canvasサイズに合わせてスケーリングされる）
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            try {
                // 4. PNG変換とダウンロード
                const pngUrl = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = `chart-${new Date().getTime()}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (e) {
                console.error("Canvas export failed:", e);
                alert("画像の保存に失敗しました。セキュリティ制限の可能性があります。");
            }
        };

        // 画像ソースにBase64を設定
        img.src = svgBase64;
    };

    return (
        <div className="relative group my-4">
            <div
                className="mermaid flex justify-center py-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto"
                ref={ref}
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={handleDownload}
                    className="p-1.5 bg-gray-100 hover:bg-white text-gray-500 hover:text-blue-600 rounded border border-gray-200 shadow-sm transition-colors"
                    title="PNG画像として保存">
                    {isCopied ? <LuCheck size={16} /> : <LuDownload size={16} />}
                </button>
            </div>
        </div>
    );
};

export default Mermaid;
