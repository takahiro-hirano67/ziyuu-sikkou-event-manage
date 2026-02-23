// app/events/page.tsx

import { EventsClient } from "./EventClient";
import { getAllEvents } from "./lib/mock-data";

// ============================================================
// 【サーバーサイドページ】
// 将来的にデータベース接続時、page.tsx を async にできる
// サーバーサイド化は現時点では動作に変わりはないが、拡張性が高い
// ============================================================

export default function EventsPage() {
    const events = getAllEvents();
    return <EventsClient events={events} />
}