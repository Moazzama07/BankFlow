import React from "react";
import {
    TrendingUp,
    BarChart2,
    RefreshCw,
    Apple,
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────

interface StatCard {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

interface Investment {
    id: string;
    logo: React.ReactNode;
    logoBg: string;
    name: string;
    category: string;
    value: string;
    valueLabel: string;
    returnPct: string;
    returnLabel: string;
    isPositive: boolean;
}

interface TrendingStock {
    no: string;
    name: string;
    price: string;
    returnPct: string;
    isPositive: boolean;
}

// ── Chart Data ─────────────────────────────────────────────────────────────

const yearlyData = [
    { year: "2016", value: 5000 },
    { year: "2017", value: 18000 },
    { year: "2018", value: 12000 },
    { year: "2019", value: 30000 },
    { year: "2020", value: 22000 },
    { year: "2021", value: 38000 },
];

const monthlyData = [
    { year: "2016", value: 8000 },
    { year: "2017", value: 15000 },
    { year: "2018", value: 10000 },
    { year: "2019", value: 28000 },
    { year: "2020", value: 20000 },
    { year: "2021", value: 40000 },
];

// ── Data ───────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
    {
        id: "total",
        label: "Total Invested Amount",
        value: "$150,000",
        icon: <TrendingUp size={20} />,
        iconBg: "bg-[#FFF5D9]",
        iconColor: "text-[#FFBB38]",
    },
    {
        id: "number",
        label: "Number of Investments",
        value: "1,250",
        icon: <BarChart2 size={20} />,
        iconBg: "bg-[#FFE0EB]",
        iconColor: "text-[#FF82AC]",
    },
    {
        id: "rate",
        label: "Rate of Return",
        value: "+5.80%",
        icon: <RefreshCw size={20} />,
        iconBg: "bg-[#E7EDFF]",
        iconColor: "text-[#396AFF]",
    },
];

const MY_INVESTMENTS: Investment[] = [
    {
        id: "1",
        logo: <Apple size={18} />,
        logoBg: "bg-[#FFE0EB]",
        name: "Apple Store",
        category: "E-commerce",
        value: "$54,000",
        valueLabel: "Envestment Value",
        returnPct: "+16%",
        returnLabel: "Return Value",
        isPositive: true,
    },
    {
        id: "2",
        logo: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M21.35 11.1h-9.17v2.73h5.51c-.33 1.81-1.87 3.17-3.71 3.17a4.57 4.57 0 010-9.14c1.13 0 2.14.4 2.93 1.06l2.1-2.1A7.77 7.77 0 0012.18 4.5a7.93 7.93 0 100 15.86c4.39 0 7.37-3.08 7.37-7.43 0-.45-.04-.88-.2-1.83z" fill="#4285F4" />
            </svg>
        ),
        logoBg: "bg-[#E8F1FF]",
        name: "Samsung Mobile",
        category: "Marketplace",
        value: "$25,300",
        valueLabel: "Envestment Value",
        returnPct: "-4%",
        returnLabel: "Return Value",
        isPositive: false,
    },
    {
        id: "3",
        logo: (
            <span className="text-[#FFBB38] font-bold text-sm">T</span>
        ),
        logoBg: "bg-[#FFF5D9]",
        name: "Tesla Motors",
        category: "Electric Vehicles",
        value: "$8,200",
        valueLabel: "Envestment Value",
        returnPct: "+25%",
        returnLabel: "Return Value",
        isPositive: true,
    },
];

const TRENDING_STOCKS: TrendingStock[] = [
    { no: "01.", name: "Trivago", price: "$520", returnPct: "+5%", isPositive: true },
    { no: "02.", name: "Canon", price: "$480", returnPct: "+10%", isPositive: true },
    { no: "03.", name: "Uber Food", price: "$350", returnPct: "-3%", isPositive: false },
    { no: "04.", name: "Nokia", price: "$940", returnPct: "+2%", isPositive: true },
    { no: "05.", name: "Tiktok", price: "$670", returnPct: "-12%", isPositive: false },
];

// ── Custom Tooltip ─────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-lg rounded-xl px-3 py-2 text-xs text-[#343C6A] border border-[#E6EFF5]">
                <p className="font-semibold">{label}</p>
                <p>${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

// ── Main Page ──────────────────────────────────────────────────────────────

export default function Investment() {
    return (
        <div className="flex-1 p-6 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">

            {/* ── Top 3 Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {STAT_CARDS.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.iconBg}`}>
                            <span className={card.iconColor}>{card.icon}</span>
                        </div>
                        <div>
                            <p className="text-xs text-[#718EBF]">{card.label}</p>
                            <p className="text-lg font-bold text-[#232323] mt-0.5">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

                {/* Yearly Total Investment */}
                <div><h3 className="text-base font-bold text-[#343C6A] font-sans mb-4">Yearly Total Investment</h3>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">

                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F9" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    tick={{ fontSize: 11, fill: "#718EBF" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#718EBF" }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `$${v / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="linear"
                                    dataKey="value"
                                    stroke="#FFBB38"
                                    strokeWidth={2.5}
                                    // fill: "none" se center khali ho jayega, stroke se outline dikhegi
                                    dot={{
                                        stroke: "#FFBB38",
                                        strokeWidth: 2,
                                        r: 4,
                                        fill: "white",
                                    }}
                                    activeDot={{ r: 6, fill: "#FFBB38" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Monthly Revenue */}
                <div><h3 className="text-base font-bold text-[#343C6A] font-sans mb-4">Monthly Revenue</h3>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">

                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F9" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    tick={{ fontSize: 11, fill: "#718EBF" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#718EBF" }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `$${v / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#16DBCC"
                                    strokeWidth={2.5}
                                    dot={false}
                                    activeDot={{ r: 6, fill: "#16DBCC" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            {/* ── Bottom Row: My Investment + Trending Stock ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* My Investment */}
                <div>
                    <h3 className="text-base font-bold text-[#343C6A] font-sans mb-4">My Investment</h3>
                    <div className="bg-white rounded-2xl p-6 shadow-sm w-full">


                        <div className="flex flex-col gap-6">
                            {MY_INVESTMENTS.map((inv) => (
                                <div key={inv.id} className="grid grid-cols-3 items-center w-full py-2">

                                    {/* 1. Logo + Name (Left Aligned) */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl ${inv.logoBg} flex items-center justify-center shrink-0`}>
                                            {inv.logo}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-[#232323] leading-tight truncate">
                                                {inv.name}
                                            </p>
                                            <p className="text-sm text-[#718EBF] whitespace-nowrap">
                                                {inv.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. Value (Middle - Ab ye exact center mein aayega) */}
                                    <div className="w-full text-center">
                                        {/* w-full ensures ke text apne 33% area ke center mein jaye */}
                                        <p className="text-sm font-semibold text-[#232323] leading-tight">
                                            {inv.value}
                                        </p>
                                        <p className="text-sm text-[#718EBF] whitespace-nowrap">
                                            {inv.valueLabel}
                                        </p>
                                    </div>

                                    {/* 3. Return (Extreme Right) */}
                                    <div className="w-full text-right">
                                        <p className={`text-sm font-semibold leading-tight ${inv.isPositive ? "text-[#16DBCC]" : "text-[#FE5C73]"}`}>
                                            {inv.returnPct}
                                        </p>
                                        <p className="text-sm text-[#718EBF] whitespace-nowrap">
                                            {inv.returnLabel}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending Stock */}
                <div><h3 className="text-base font-bold text-[#343C6A] font-sans mb-4">Trending Stock</h3>
                    <div className="bg-white rounded-2xl p-5 shadow-sm">

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-[#718EBF] text-xs">
                                    <th className="text-left font-medium pb-3">SL No</th>
                                    <th className="text-left font-medium pb-3">Name</th>
                                    <th className="text-left font-medium pb-3">Price</th>
                                    <th className="text-left font-medium pb-3">Return</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F3F4F6]">
                                {TRENDING_STOCKS.map((stock) => (
                                    <tr key={stock.no} className="text-[#343C6A]">
                                        <td className="py-3 text-xs text-[#718EBF]">{stock.no}</td>
                                        <td className="py-3 text-sm font-medium">{stock.name}</td>
                                        <td className="py-3 text-sm">{stock.price}</td>
                                        <td className={`py-3 text-sm font-semibold ${stock.isPositive ? "text-[#41D4A8]" : "text-[#FF4B4A]"}`}>
                                            {stock.returnPct}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}