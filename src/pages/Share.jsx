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
//     // Get header height on mount and resize
//     const [headerHeight, setHeaderHeight] = React.useState(0);
//     const headerRef = React.useRef(null);

//     React.useEffect(() => {
//         const updateHeight = () => {
//             if (headerRef.current) {
//                 setHeaderHeight(headerRef.current.offsetHeight);
//             }
//         };

//         updateHeight();
//         window.addEventListener('resize', updateHeight);
//         return () => window.removeEventListener('resize', updateHeight);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Sticky Header with ref */}
//             <div ref={headerRef} className="sticky top-[66px] z-35  ">
//                 <ShareHeader totalConversations={shareData.length} />
//             </div>

//             {/* Main Content with dynamic padding */}
//             <div 
//                 className="max-w-7xl mx-auto mt-6"
               
//             >
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
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(true);
    const headerRef = React.useRef(null);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                // Scrolling DOWN → hide header
                setIsVisible(false);
            } else {
                // Scrolling UP → show header
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header — hides on scroll down, shows on scroll up */}
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
            <div className="max-w-7xl mx-auto mt-6">
                <div className="space-y-6">
                    {shareData.map((share) => (
                        <ShareItem key={share.id} share={share} />
                    ))}
                </div>
            </div>
        </div>
    );
}