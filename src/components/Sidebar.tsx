import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo2.svg";

import {
    LayoutDashboard,
    ArrowLeftRight,
    User,
    TrendingUp,
    CreditCard,
    Landmark,
    Settings,
    Wrench,
    LogOut,
    Menu,
    X
} from "lucide-react";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { label: "Transactions", icon: <ArrowLeftRight size={20} />, href: "/transactions" },
    { label: "Accounts", icon: <User size={20} />, href: "/accounts" },
    { label: "Investments", icon: <TrendingUp size={20} />, href: "/investments" },
    { label: "Credit Cards", icon: <CreditCard size={20} />, href: "/credit-cards" },
    { label: "Loans", icon: <Landmark size={20} />, href: "/loans" },
    { label: "Services", icon: <Wrench size={20} />, href: "/services" },
    { label: "Setting", icon: <Settings size={20} />, href: "/settings" },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        navigate("/login");
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const handleNavClick = (href: string) => {
        navigate(href);
        if (isMobileOpen) {
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 flex flex-col w-[250px] bg-white border-r border-gray-100 h-screen z-50 transition-all duration-300 ease-in-out
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Section */}
                <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className="text-[#343C6A] font-bold text-xl tracking-tight whitespace-nowrap">
                        BankFlow
                    </span>
                </div>

                {/* Nav Items */}
                <nav className="flex flex-col gap-2 flex-1 px-3 py-6 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.href)}
                                title={item.label}
                                className={`relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                                    ${isActive
                                        ? "bg-[#E8F0FF] text-[#2D60FF]"
                                        : "text-[#B1B1B1] hover:bg-gray-50"
                                    }
                                `}
                            >
                                {/* Right side indicator */}
                                <span
                                    className={`absolute right-0 top-0 h-full w-[4px] bg-[#2D60FF] rounded-r-xl transition-all duration-200
                                        ${isActive ? "opacity-100" : "opacity-0"}
                                    `}
                                />

                                {/* Icon */}
                                <span className={`transition flex-shrink-0 ${isActive ? "text-[#2D60FF]" : "text-[#B1B1B1] group-hover:text-[#2D60FF]"}`}>
                                    {item.icon}
                                </span>

                                {/* Label */}
                                <span className="truncate">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Section */}
                <div className="px-3 py-4 border-t border-gray-100">
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-red-600"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

        </>
    );
};

export default Sidebar;