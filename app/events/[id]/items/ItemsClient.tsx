// app/events/[id]/items/ItemsClient.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EventWithRelations } from "../../lib/types";

// ============================================================
// 【備品/景品 統合クライアント】
// 切り替えタブ
// 現在のルート判定
// ============================================================
export function ItemsClient({
    children,
    event,
}: {
    children: React.ReactNode;
    event: EventWithRelations;
}) {
    const pathname = usePathname();

    // 基本パス
    const itemsBasePath = `/events/${event.id}/items`;

    // ラベル・リンク一覧
    const items = [
        { label: "備品", href: `${itemsBasePath}/equipment` },
        { label: "景品", href: `${itemsBasePath}/prizes` },
    ];

    // 現在のラベルを取得
    const currentItem = items.find((item) => item.href === pathname);
    const currentLabel = currentItem?.label;

    return (
        <div className="px-4 pt-6 pb-32">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-2 mr-2 mb-6 border-b border-gray-200">
                    {/* タイトル（備品 or 景品） */}
                    <h2 className="text-xl font-semibold text-gray-800">
                        {currentLabel}一覧
                    </h2>
                    {/* 切り替えボタン */}
                    <div className="flex">
                        <div className="inline-flex rounded-full bg-gray-50 p-1">
                            {items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`px-4 py-1 text-sm font-medium rounded-full transition
                                ${isActive
                                                ? "bg-blue-100 text-blue-700 shadow-sm"
                                                : "text-gray-600 hover:text-gray-900"
                                            }`}>
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* 子ルート */}
                {children}

            </div>
        </div>
    );
}