// app/events/[id]/basic/page.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../lib/mock-data";
import { BasicClient } from "./BasicClient"; // クライアントコンポーネントをインポート

// ============================================================
// 【サーバーサイドページ】
// データを受け取ってクライアントに渡す
// paramsの型定義→Promise
// 拡張性を考慮し、フックを利用していない機能でも同様の規則で記述
// ============================================================

export default async function EventBasicPage({ params }: { params: Promise<{ id: string }> }) {

    // 1. await で取り出す
    const { id } = await params;

    // 2. 取り出した id を使用
    const event = getEventById(id);

    // 3. ハンドリング
    if (!event) {
        notFound();
    }

    // 4. クライアントコンポーネントへデータを流し込む（ここで渡すデータはシリアライズ可能（JSON化可能）である必要）
    return <BasicClient event={event} />;
}


