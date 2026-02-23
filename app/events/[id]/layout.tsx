// app/events/[id]/layout.tsx

import { EventHeader } from "../components/EventHeader";
import { EventTabNavigation } from "../components/EventTabNavigation";
import { getEventById } from "../lib/mock-data";
import { notFound } from "next/navigation";

export default async function EventDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>; // 型定義を Promise とする。
}) {

    // params を await して id を取り出す
    const { id } = await params;

    // 取り出した id を使用する
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* イベントヘッダー（全タブ共通） */}
            <EventHeader event={event} />

            {/* タブナビゲーション（取り出したidを使用） */}
            <EventTabNavigation eventId={id} />

            {/* タブコンテンツ */}
            <div className="flex-1 bg-white">
                {children}
            </div>
        </div>
    );
}