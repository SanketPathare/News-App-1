// @ts-nocheck

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Info } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/", icon: <Home className="w-5 h-5 mr-2" /> },
        { name: "About", href: "/about", icon: <Info className="w-5 h-5 mr-2" /> },
    ];

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-slate-800/90 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white flex items-center"
                            onClick={handleNavClick}
                        >
                            News App
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-200 hover:text-sky-500 px-4 py-2 text-md font-medium flex items-center transition-all duration-300"
                                onClick={handleNavClick}
                            >
                                {item.icon} {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-sky-600 focus:outline-none transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 transition-all duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-3 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-sky-700 transition-all duration-300 flex items-center"
                                onClick={handleNavClick}
                            >
                                {item.icon} {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
