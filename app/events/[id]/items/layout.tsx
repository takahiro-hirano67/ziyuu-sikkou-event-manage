// app/events/[id]/items/layout.tsx

import { notFound } from "next/navigation";
import { getEventById } from "../../lib/mock-data";
import { ItemsClient } from "./ItemsClient";

export default async function ItemsLayout({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) {

    // 1. await で取り出す
    const { id } = await params;

    // 2. 取り出した id を使用
    const event = getEventById(id);

    // 3. ハンドリング
    if (!event) {
        notFound();
    }

    return (
        <ItemsClient event={event} >
            {children}
        </ItemsClient>
    );
}
