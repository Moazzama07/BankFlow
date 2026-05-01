import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChipCardWhite from "../assets/Chip_Card.png";
import ChipCardBlack from "../assets/Chip_Card 1.png";
import { ShieldOff, KeyRound, Smartphone, Apple, ShoppingBag } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
interface Card {
    id: number;
    balance: string;
    holder: string;
    validThru: string;
    number: string;
    dark: boolean;
    gradient?: string;
}

interface CardListItem {
    id: number;
    cardType: string;
    bank: string;
    cardNumber: string;
    holderName: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const cards: Card[] = [
    { id: 1, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: true, gradient: "linear-gradient(to bottom right, #2D60FF, #539BFF)" },
    { id: 2, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: true, gradient: "linear-gradient(to bottom right, #4C49ED, #0A06F4)" },
    { id: 3, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: false, gradient: undefined },
];

const expenseData = [
    { name: "DBL Bank", value: 25, color: "#396AFF" },
    { name: "BRC Bank", value: 25, color: "#16DBCC" },
    { name: "MCP Bank", value: 25, color: "#FFBB38" },
    { name: "Others", value: 25, color: "#343C6A" },
];

const cardList: CardListItem[] = [
    { id: 1, cardType: "Secondary", bank: "DBL Bank", cardNumber: "****  ****  5600", holderName: "William" },
    { id: 2, cardType: "Secondary", bank: "BRC Bank", cardNumber: "****  ****  4300", holderName: "Michel" },
    { id: 3, cardType: "Secondary", bank: "ABM Bank", cardNumber: "****  ****  7560", holderName: "Edward" },
];

const cardSettings = [
    { icon: ShieldOff, label: "Block Card", desc: "Instantly block your card", bg: "#FFF5E6", color: "#FC7900" },
    { icon: KeyRound, label: "Change Pin Code", desc: "Choose another pin code", bg: "#E8F0FF", color: "#396AFF" },
    { icon: Smartphone, label: "Add to Google Pay", desc: "Withdraw without any card", bg: "#E6FBF9", color: "#16DBCC" },
    { icon: Apple, label: "Add to Apple Pay", desc: "Withdraw without any card", bg: "#F0F0FF", color: "#4C49ED" },
    { icon: ShoppingBag, label: "Add to Apple Store", desc: "Withdraw without any card", bg: "#E6FBF9", color: "#16DBCC" },
];

/* ─── Sub-components ──────────────────────────────────────── */
function CreditCard({ card }: { card: Card }) {
    return (
        <div
            className={`relative aspect-[1.56/1] w-full overflow-hidden rounded-[22px] p-[5%] flex flex-col justify-between transition-all font-sans shrink-0
        ${card.dark
                    ? "text-white shadow-lg"
                    : "bg-white border border-[#DFEAF2] text-[#343C6A] shadow-sm"
                }`}
            style={card.gradient ? { background: card.gradient } : undefined}
        >
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className={`text-[min(2.5vw,12px)] ${card.dark ? "text-white/70" : "text-[#718EBF]"}`}>Balance</p>
                    <p className="text-[min(4vw,20px)] font-bold">{card.balance}</p>
                </div>
                <img
                    src={card.dark ? ChipCardBlack : ChipCardWhite}
                    alt="chip"
                    className="w-[14%] h-auto object-contain"
                />
            </div>

            <div className="relative z-10">
                <div className="mb-[4%] flex gap-[15%]">
                    <div>
                        <p className={`text-[min(2vw,10px)] uppercase tracking-wider ${card.dark ? "text-white/60" : "text-[#718EBF]"}`}>Card Holder</p>
                        <p className="text-[min(3vw,14px)] font-semibold whitespace-nowrap">{card.holder}</p>
                    </div>
                    <div>
                        <p className={`text-[min(2vw,10px)] uppercase tracking-wider ${card.dark ? "text-white/60" : "text-[#718EBF]"}`}>Valid Thru</p>
                        <p className="text-[min(3vw,14px)] font-semibold">{card.validThru}</p>
                    </div>
                </div>
                <div className={`flex items-center justify-between pt-[4%] border-t ${card.dark ? "border-white/20" : "border-[#DFEAF2]"}`}>
                    <p className="text-[min(3.5vw,16px)] font-semibold tracking-[2px]">{card.number}</p>
                    <div className="relative flex h-5 w-8 shrink-0">
                        <div className={`absolute left-0 h-5 w-5 rounded-full ${card.dark ? "bg-white/50" : "bg-[#FC7900]"}`} />
                        <div className={`absolute right-0 h-5 w-5 rounded-full ${card.dark ? "bg-white/30" : "bg-[#FFB300]"}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title }: { title: string }) {
    return (
        <h2 className="text-[16px] font-bold text-[#343C6A] mb-4 font-sans">{title}</h2>
    );
}

/* ─── Custom Pie Label ────────────────────────────────────── */
const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ pointerEvents: "none" }} fontFamily="sans-serif">
            <tspan x={x} dy="-7" fontSize={12} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</tspan>
            <tspan x={x} dy="15" fontSize={11} fontWeight={500} opacity={0.85}>{name}</tspan>
        </text>
    );
};

/* ─── Page ────────────────────────────────────────────────── */
export default function CreditCards() {
    const [cardType, setCardType] = useState("Classic");
    const [nameOnCard, setNameOnCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    return (
        <div className="flex-1 p-7 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">

            {/* ── Row 1: My Cards ──────────────────────────────────── */}
            <div className="mb-6">
                <SectionTitle title="My Cards" />
                {/* 3 cards in a row, each card same width */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card) => (
                        <CreditCard key={card.id} card={card} />
                    ))}
                </div>
            </div>

            {/* ── Row 2: Card Expense Statistics + Card List ───────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* Card Expense Statistics */}
                <div>
                    <SectionTitle title="Card Expense Statistics" />
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={expenseData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    labelLine={false}
                                    label={renderCustomLabel}
                                    strokeWidth={2}
                                    stroke="#fff"
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                            {expenseData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: item.color }} />
                                    <span className="text-xs text-[#718EBF] font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card List */}
                <div>
                    <SectionTitle title="Card List" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                        {cardList.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4"
                            >
                                {/* Mini Credit Card Thumbnail */}
                                <div className="shrink-0 w-[70px] h-[48px] rounded-[10px] bg-gradient-to-br from-[#2D60FF] to-[#539BFF] p-2 flex flex-col justify-between relative overflow-hidden">
                                    {/* card shine strip */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                                    <div className="flex justify-between items-start">
                                        <div className="w-4 h-3 rounded-[2px] bg-yellow-300/80" />
                                    </div>
                                    <div className="flex gap-[3px] items-center">
                                        {[0, 1, 2, 3].map(i => (
                                            <div key={i} className="flex gap-[2px]">
                                                {[0, 1, 2].map(j => (
                                                    <div key={j} className="w-[2px] h-[2px] rounded-full bg-white/70" />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Card Type */}
                                <div className="min-w-[70px]">
                                    <p className="text-[11px] text-[#718EBF]">Card Type</p>
                                    <p className="text-[13px] font-semibold text-[#343C6A] mt-0.5">{item.cardType}</p>
                                </div>

                                {/* Bank */}
                                <div className="min-w-[70px]">
                                    <p className="text-[11px] text-[#718EBF]">Bank</p>
                                    <p className="text-[13px] font-semibold text-[#343C6A] mt-0.5">{item.bank}</p>
                                </div>

                                {/* Card Number */}
                                <div className="flex-1 min-w-[100px]">
                                    <p className="text-[11px] text-[#718EBF]">Card Number</p>
                                    <p className="text-[13px] font-semibold text-[#343C6A] mt-0.5 tracking-wider">{item.cardNumber}</p>
                                </div>

                                {/* Name on Card */}
                                <div className="min-w-[60px]">
                                    <p className="text-[11px] text-[#718EBF]">Naman Card</p>
                                    <p className="text-[13px] font-semibold text-[#343C6A] mt-0.5">{item.holderName}</p>
                                </div>

                                {/* View Details */}
                                <button className="text-[12px] font-semibold text-[#1814F3] whitespace-nowrap hover:underline ml-auto">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Row 3: Add New Card + Card Setting ───────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Add New Card */}
                <div>
                    <SectionTitle title="Add New Card" />
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                        {/* Description text */}
                        <p className="text-xs text-[#718EBF] mb-5 leading-relaxed">
                            Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
                        </p>

                        {/* Card Type */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-[#343C6A] mb-1">Card Type</label>
                            <div className="relative">
                                <select
                                    value={cardType}
                                    onChange={(e) => setCardType(e.target.value)}
                                    className="w-full border border-[#DFEAF2] rounded-[10px] px-4 py-2.5 text-sm text-[#343C6A] bg-white appearance-none outline-none focus:border-[#1814F3] transition"
                                >
                                    <option>Classic</option>
                                    <option>Gold</option>
                                    <option>Platinum</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]">▾</span>
                            </div>
                        </div>

                        {/* Name on Card */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-[#343C6A] mb-1">Name On Card</label>
                            <input
                                placeholder="My Cards"
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)}
                                className="w-full border border-[#DFEAF2] rounded-[10px] px-4 py-2.5 text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] transition"
                            />
                        </div>

                        {/* Card Number */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-[#343C6A] mb-1">Card Number</label>
                            <input
                                placeholder="**** **** **** ****"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full border border-[#DFEAF2] rounded-[10px] px-4 py-2.5 text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] transition"
                            />
                        </div>

                        {/* Expiration Date */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-[#343C6A] mb-1">Expiration Date</label>
                            <div className="relative">
                                <input
                                    placeholder="25 January 2025"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="w-full border border-[#DFEAF2] rounded-[10px] px-4 py-2.5 text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] transition"
                                />
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]">▾</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#1814F3] hover:bg-[#120FD4] transition text-white rounded-[10px] py-3 text-sm font-bold shadow-md">
                            Add Card
                        </button>
                    </div>
                </div>

                {/* Card Setting */}
                <div>
                    <SectionTitle title="Card Setting" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                        {cardSettings.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 cursor-pointer hover:bg-[#F8FAFC] rounded-[12px] px-2 py-1 transition"
                                >
                                    {/* Icon box — fixed 44×44, consistent for all */}
                                    <div
                                        className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                                        style={{ background: s.bg }}
                                    >
                                        <Icon size={20} color={s.color} strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#343C6A]">{s.label}</p>
                                        <p className="text-xs text-[#718EBF] mt-0.5">{s.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}