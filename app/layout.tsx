// app/layout.tsx

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/layout/header";

// フォントの設定
const notoSansJP = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    display: "swap",
});

// メタデータ設定
export const metadata: Metadata = {
    title: "自由ヶ丘執行委員会 ポータルサイト",
    description: "自由ヶ丘執行委員会",
};

// ============================================================
// 【アプリ本体】
// アプリ全体の共通レイアウト（ヘッダー等の配置）
// ============================================================

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body
                suppressHydrationWarning={true}
                className={`bg-white ${notoSansJP.variable} antialiased`}>
                <div className="flex flex-col h-screen overflow-hidden">
                    <Header />
                    {/* メインレイアウトコンテナ 
                        flex-1: ヘッダー以外の高さを埋める
                        overflow-hidden: 内部でスクロールさせるため
                    */}
                    <div className="flex flex-1 overflow-hidden relative">
                        {/* メインコンテンツ表示領域 */}
                        <main className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto relative min-w-0 bg-white">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
