import React, { useState } from "react";
import {
    ShieldCheck,
    ShoppingBag,
    ShieldHalf,
    User,
    Landmark,
    PiggyBank,
    CreditCard,
    HeartPulse,
    Briefcase,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface ServiceCard {
    id: string;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

interface BankService {
    id: string;
    icon: React.ReactNode;
    iconBg: string;
    name: string;
    description: string;
    col1: string;
    col2: string;
    col3: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const SERVICE_CARDS: ServiceCard[] = [
    {
        id: "insurance",
        label: "Life Insurance",
        subLabel: "Unlimited protection",
        icon: <ShieldCheck size={22} />,
        iconBg: "bg-[#E8F1FF]",
        iconColor: "text-[#396AFF]",
    },
    {
        id: "shopping",
        label: "Shopping",
        subLabel: "Buy. Think. Grow.",
        icon: <ShoppingBag size={22} />,
        iconBg: "bg-[#FFF3DC]",
        iconColor: "text-[#FFBB38]",
    },
    {
        id: "safety",
        label: "Safety",
        subLabel: "We are your allies",
        icon: <ShieldHalf size={22} />,
        iconBg: "bg-[#E2FAF5]",
        iconColor: "text-[#16DBAA]",
    },
];

const BANK_SERVICES: BankService[] = [
    {
        id: "1",
        icon: <User size={18} />,
        iconBg: "bg-[#FFE0EB]",
        name: "Business loans",
        description: "Flexible financing for your business growth",
        col1: "Low interest rates\nEasy approval process",
        col2: "Flexible repayment\nNo hidden charges",
        col3: "Quick disbursement\n24/7 support available",
    },
    {
        id: "2",
        icon: <Landmark size={18} />,
        iconBg: "bg-[#FFF3DC]",
        name: "Checking accounts",
        description: "Manage your daily transactions easily",
        col1: "Zero maintenance fee\nFree debit card",
        col2: "Online banking access\nInstant transfers",
        col3: "Mobile app support\nSecure transactions",
    },
    {
        id: "3",
        icon: <PiggyBank size={18} />,
        iconBg: "bg-[#E2FFF5]",
        name: "Savings accounts",
        description: "Grow your money with better returns",
        col1: "High interest savings\nMonthly profit credit",
        col2: "No minimum balance\nEasy withdrawals",
        col3: "Auto savings option\nGoal-based saving",
    },
    {
        id: "4",
        icon: <CreditCard size={18} />,
        iconBg: "bg-[#E7EDFF]",
        name: "Debit and credit cards",
        description: "Secure and convenient payment solutions",
        col1: "Worldwide acceptance\nContactless payments",
        col2: "Reward points system\nCashback offers",
        col3: "Fraud protection\nInstant card blocking",
    },
    {
        id: "5",
        icon: <HeartPulse size={18} />,
        iconBg: "bg-[#DCFAF8]",
        name: "Life Insurance",
        description: "Protect your family’s future",
        col1: "Comprehensive coverage\nFlexible plans",
        col2: "Affordable premiums\nEasy claim process",
        col3: "Family protection\nLong-term security",
    },
    {
        id: "6",
        icon: <Briefcase size={18} />,
        iconBg: "bg-[#FFE0E0]",
        name: "Business loans",
        description: "Support for startups and enterprises",
        col1: "Startup funding\nSME support",
        col2: "Quick approval\nCompetitive rates",
        col3: "Flexible terms\nBusiness advisory included",
    },
];

// ── Sub-components ─────────────────────────────────────────────────────────

const TopServiceCard = ({ card }: { card: ServiceCard }) => {
    return (
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm w-full">
            <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${card.iconBg}`}
            >
                <div className={card.iconColor}>{card.icon}</div>
            </div>

            <div className="min-w-0">
                <p className="text-sm font-semibold text-[#232323] truncate">
                    {card.label}
                </p>
                <p className="text-xs text-[#718EBF] truncate">
                    {card.subLabel}
                </p>
            </div>
        </div>
    );
};

const TwoLineCell: React.FC<{ text: string }> = ({ text }) => {
    const [line1, line2] = text.split("\n");

    return (
        <div>
            <p className="text-sm text-[#343C6A] font-sans">
                {line1}
            </p>
            <p className="text-xs text-[#718EBF] font-sans mt-0.5">
                {line2}
            </p>
        </div>
    );
};

const ViewDetailsButton: React.FC = () => (
    <button
        className="
            w-full sm:w-auto
            px-4 py-2
            rounded-full
            border border-[#1814F3]
            text-[#1814F3]
            text-xs font-semibold
            font-sans
            hover:bg-[#1814F3]
            hover:text-white
            transition-all duration-200
        "
    >
        View Details
    </button>
);

// ── Main Page ──────────────────────────────────────────────────────────────

export default function Service() {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    return (
        <div className="flex-1 w-full p-4 sm:p-6 bg-[#F5F7FA] overflow-x-hidden min-h-screen font-sans">

            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {SERVICE_CARDS.map((card) => (
                    <TopServiceCard key={card.id} card={card} />
                ))}
            </div>

            {/* Header */}
            <h2 className="text-base font-bold text-[#343C6A] mb-4 px-1">
                Bank Services List
            </h2>

            {/* Services */}
            <div className="flex flex-col gap-4 pb-6">
                {BANK_SERVICES.map((svc) => (
                    <div
                        key={svc.id}
                        onMouseEnter={() => setHoveredRow(svc.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`
                            bg-white rounded-[20px]
                            p-4
                            shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                            transition-all duration-200
                            w-full
                            overflow-hidden
                            ${hoveredRow === svc.id ? "bg-[#F9FAFB]" : "bg-white"}
                        `}
                    >
                        {/* MOBILE + DESKTOP RESPONSIVE */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                            {/* Service Info */}
                            <div className="flex items-start gap-4 w-full lg:w-[25%] min-w-0">
                                <div
                                    className={`
                                        w-12 h-12 rounded-[15px]
                                        ${svc.iconBg}
                                        flex items-center justify-center
                                        shrink-0 text-[#343C6A]
                                    `}
                                >
                                    {svc.icon}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#343C6A] leading-tight">
                                        {svc.name}
                                    </p>

                                    <p className="text-xs text-[#718EBF] mt-1 leading-relaxed">
                                        {svc.description}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                                <TwoLineCell text={svc.col1} />
                                <TwoLineCell text={svc.col2} />
                                <TwoLineCell text={svc.col3} />
                            </div>

                            {/* Button */}
                            <div className="w-full lg:w-auto lg:min-w-[140px]">
                                <ViewDetailsButton />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}