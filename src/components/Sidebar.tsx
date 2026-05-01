import React from "react";
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
    Wrench
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

    return (
        <aside className="flex flex-col w-[250px] min-h-screen bg-white border-r border-gray-100 py-6">

            {/* Logo */}
            <div className="flex items-center gap-2 px-6 mb-8">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src={logo} alt="logo" />
                </div>
                <span className="text-[#343C6A] font-bold font-sans text-xl tracking-tight">
                    BankFlow
                </span>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-1 flex-1 px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.href)}
                            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium font-sans transition w-full text-left
                                ${isActive
                                    ? "bg-[#E8F0FF] text-[#2D60FF]"
                                    : "text-[#B1B1B1] hover:bg-gray-50"
                                }`}
                        >
                            {/* Left blue indicator */}
                            <span
                                className={`absolute right-0 top-0 h-full w-[4px] bg-[#2D60FF] rounded-r-xl transition-all duration-200
                                    ${isActive ? "opacity-100" : "opacity-0"}`}
                            />

                            {/* Icon */}
                            <span className={`transition ${isActive ? "text-[#2D60FF]" : "text-[#B1B1B1]"}`}>
                                {item.icon}
                            </span>

                            {/* Label */}
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;