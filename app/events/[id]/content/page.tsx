// app/events/[id]/content/page.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../lib/mock-data";
import { ContentClient } from "./ContentClient";

export default async function EventContentPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // 情報取得
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    return <ContentClient event={event} />
}

