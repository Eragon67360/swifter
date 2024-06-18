"use client"
import Link from "next/link";
import React, { useState } from "react";

const Navigation = () => {
    const Menus = [
        { name: "Home", path: "/" },
        { name: "Music", path: "/music" },
        { name: "Tours", path: "#" },
        { name: "Events", path: "#" },
        { name: "Forum", path: "/forum" },
    ];

    const [active, setActive] = useState(0);

    return (
        <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bottom-24 left-1/2 bg-gray-400 border-gray-600 h-18 rounded-full px-4 text-white">
            <ul className="flex items-center justify-center relative">
                {Menus.map((menu, i) => (
                    <li key={i} className="w-20">
                        <Link
                            className="flex flex-col text-center p-5 cursor-pointer px-4"
                            onClick={() => setActive(i)}
                            href={menu.path}>
                            <span
                                className={` ${active === i
                                    ? "duration-700 opacity-100 font-bold"
                                    : "opacity-70"
                                    } `}
                            >
                                {menu.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
