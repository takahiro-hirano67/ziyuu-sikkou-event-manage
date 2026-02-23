// app/events/[id]/items/prizes/page.tsx

import { notFound } from "next/navigation";

import { getEventById } from "../../../lib/mock-data";
import { PrizesClient } from "./PrizesClient";

export default async function EventPrizesPage({
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

    return <PrizesClient event={event} />
}
