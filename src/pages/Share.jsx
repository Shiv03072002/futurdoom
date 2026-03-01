import React from "react";
import ShareHeader from "../components/share/ShareHeader";
import ShareItem from "../components/share/ShareItem";

const shareData = [
    {
        id: 1,
        count: 4,
        name: "Dipankar Porey",
        date: "Feb 19, 2026",
        message: "Hello, can you tell me about futurdoom.",
        reply: "Futurdoom not found 🤷‍♂️",
        avatar: "https://i.pravatar.cc/40?img=5",
        replyAvatar: "https://i.pravatar.cc/40?img=7",
    },
    {
        id: 2,
        count: 3,
        name: "Acilok Kolifca",
        date: "Feb 12, 2026",
        message: "Tell about mango shake",
        reply: "Mango Shake is a refreshing beverage made with mango pulp and milk 🥭",
        avatar: "https://i.pravatar.cc/40?img=8",
        replyAvatar: "https://i.pravatar.cc/40?img=7",
    },
];

export default function Share() {
    return (
        <div className="min-h-screen flex items-start justify-center">
            {/* Main Card Container */}
            <div className="w-full">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-xl shadow-blue-200/50 border border-blue-50 overflow-hidden mb-6">
                    <ShareHeader totalConversations={shareData.length} />
                </div>

                {/* Share Items */}
                <div className="space-y-6">
                    {shareData.map((share) => (
                        <ShareItem key={share.id} share={share} />
                    ))}
                </div>
            </div>
        </div>
    );
}