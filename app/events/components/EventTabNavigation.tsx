// app/events/components/EventTabNavigation.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function EventTabNavigation({ eventId }: { eventId: string }) {
    const pathname = usePathname();

    const tabs = [
        { label: "基本情報", path: `/events/${eventId}/basic` },
        { label: "イベント内容", path: `/events/${eventId}/content` },
        { label: "タスク", path: `/events/${eventId}/tasks` },
        { label: "備品 / 景品", path: `/events/${eventId}/items/equipment` }, // 初期値
        { label: "ノート", path: `/events/${eventId}/notes` },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 overflow-x-auto">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex justify-around gap-6">
                    {tabs.map((tab) => {
                        const isActive =
                            tab.label === "備品 / 景品"
                                ? pathname.startsWith(`/events/${eventId}/items`)
                                : pathname === tab.path;
                        return (
                            <Link
                                key={tab.path}
                                href={tab.path}
                                className={`
                                    py-3 px-1 text-sm font-medium whitespace-nowrap
                                    w-full text-center
                                    border-b-2 transition-colors
                                    ${isActive ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                                `}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
