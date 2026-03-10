

// import React from "react";
// import ShareHeader from "../components/share/ShareHeader";
// import ShareItem from "../components/share/ShareItem";

// const shareData = [
//     {
//         id: 1,
//         count: 4,
//         name: "Dipankar Porey",
//         date: "Feb 19, 2026",
//         message: "Hello, can you tell me about futurdoom.",
//         reply: "Futurdoom not found 🤷‍♂️",
//         avatar: "https://i.pravatar.cc/40?img=5",
//         replyAvatar: "https://i.pravatar.cc/40?img=7",
//     },
//     {
//         id: 2,
//         count: 3,
//         name: "Acilok Kolifca",
//         date: "Feb 12, 2026",
//         message: "Tell about mango shake",
//         reply: "Mango Shake is a refreshing beverage made with mango pulp and milk 🥭",
//         avatar: "https://i.pravatar.cc/40?img=8",
//         replyAvatar: "https://i.pravatar.cc/40?img=7",
//     },
// ];

// export default function Share() {
//     const [headerHeight, setHeaderHeight] = React.useState(0);
//     const [isVisible, setIsVisible] = React.useState(true);
//     const headerRef = React.useRef(null);
//     const lastScrollY = React.useRef(0);

//     React.useEffect(() => {
//         const updateHeight = () => {
//             if (headerRef.current) {
//                 setHeaderHeight(headerRef.current.offsetHeight);
//             }
//         };
//         updateHeight();
//         window.addEventListener("resize", updateHeight);
//         return () => window.removeEventListener("resize", updateHeight);
//     }, []);

//     React.useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;

//             if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
//                 // Scrolling DOWN → hide header
//                 setIsVisible(false);
//             } else {
//                 // Scrolling UP → show header
//                 setIsVisible(true);
//             }

//             lastScrollY.current = currentScrollY;
//         };

//         window.addEventListener("scroll", handleScroll, { passive: true });
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Sticky Header — hides on scroll down, shows on scroll up */}
//             <div
//                 ref={headerRef}
//                 className="sticky top-[66px] z-35 transition-transform duration-300"
//                 style={{
//                     transform: isVisible ? "translateY(0)" : "translateY(-120%)",
//                 }}
//             >
//                 <ShareHeader totalConversations={shareData.length} />
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto mt-6">
//                 <div className="space-y-6">
//                     {shareData.map((share) => (
//                         <ShareItem key={share.id} share={share} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from "react";
import ShareHeader from "../components/share/ShareHeader";
import ShareItem from "../components/share/ShareItem";
import { ArrowDown } from "lucide-react";

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
    const [isVisible, setIsVisible] = React.useState(true);
    const [showScrollBtn, setShowScrollBtn] = React.useState(true); // visible on mount
    const headerRef = React.useRef(null);
    const bottomRef = React.useRef(null);
    const lastScrollY = React.useRef(0);

    // Scroll to TOP on page mount
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    // Hide/show header + scroll button logic
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Show scroll-to-bottom button only when near top
            setShowScrollBtn(currentScrollY < 100);

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header */}
            <div
                ref={headerRef}
                className="sticky top-[66px] z-35 transition-transform duration-300"
                style={{
                    transform: isVisible ? "translateY(0)" : "translateY(-120%)",
                }}
            >
                <ShareHeader totalConversations={shareData.length} />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto mt-6 pb-10">
                <div className="space-y-6">
                    {shareData.map((share) => (
                        <ShareItem key={share.id} share={share} />
                    ))}
                </div>

                {/* Bottom anchor */}
                <div ref={bottomRef} />
            </div>

            {/* Scroll to Bottom FAB — only visible when user is at top */}
            {showScrollBtn && (
                <button
                    onClick={scrollToBottom}
                    className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-200"
                    title="Scroll to bottom"
                >
                    <ArrowDown className="w-5 h-5 text-gray-600" />
                </button>
            )}
        </div>
    );
}