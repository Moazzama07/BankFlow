import { useState } from "react";
import {
    BarChart, Bar, XAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { Download } from "lucide-react";
import ChipCardWhite from "../assets/Chip_Card.png";
import ChipCardBlack from "../assets/Chip_Card 1.png";

// ── Types ──────────────────────────────────────────────────────────────────
interface Card {
    id: number;
    balance: string;
    holder: string;
    validThru: string;
    number: string;
    dark: boolean;
}

interface Transaction {
    id: number;
    description: string;
    transactionId: string;
    type: string;
    card: string;
    date: string;
    amount: string;
    positive: boolean;
}

// ── Data ───────────────────────────────────────────────────────────────────
const cards: Card[] = [
    { id: 1, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: true },
    { id: 2, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: false },
];

const expenseData = [
    { month: "Aug", amount: 120 },
    { month: "Sep", amount: 200 },
    { month: "Oct", amount: 170 },
    { month: "Nov", amount: 220 },
    { month: "Dec", amount: 380 },
    { month: "Jan", amount: 180 },
];

const HIGHLIGHTED_MONTH = "Dec";

const allTransactions: Transaction[] = [
    { id: 1, description: "Spotify Subscription", transactionId: "#12548796", type: "Shopping", card: "1234 ****", date: "28 Jan, 12:30 AM", amount: "-$2,500", positive: false },
    { id: 2, description: "Freepik Sales", transactionId: "#12548796", type: "Transfer", card: "1234 ****", date: "25 Jan, 10:40 PM", amount: "+$750", positive: true },
    { id: 3, description: "Mobile Service", transactionId: "#12548796", type: "Service", card: "1234 ****", date: "20 Jan, 10:40 PM", amount: "-$750", positive: false },
    { id: 4, description: "Wilson", transactionId: "#12548796", type: "Transfer", card: "1234 ****", date: "15 Jan, 03:29 PM", amount: "-$1,050", positive: false },
    { id: 5, description: "Emily", transactionId: "#12548796", type: "Transfer", card: "1234 ****", date: "14 Jan, 10:40 PM", amount: "+$540", positive: true },
    { id: 6, description: "Netflix", transactionId: "#12548797", type: "Shopping", card: "1234 ****", date: "12 Jan, 08:00 AM", amount: "-$15", positive: false },
    { id: 7, description: "Upwork Payment", transactionId: "#12548798", type: "Transfer", card: "1234 ****", date: "10 Jan, 02:15 PM", amount: "+$1,200", positive: true },
    { id: 8, description: "Amazon Purchase", transactionId: "#12548799", type: "Shopping", card: "1234 ****", date: "08 Jan, 11:00 AM", amount: "-$320", positive: false },
    { id: 9, description: "Salary Credit", transactionId: "#12548800", type: "Transfer", card: "1234 ****", date: "05 Jan, 09:00 AM", amount: "+$3,500", positive: true },
    { id: 10, description: "Google Drive", transactionId: "#12548801", type: "Service", card: "1234 ****", date: "03 Jan, 06:30 PM", amount: "-$2.99", positive: false },
    { id: 11, description: "Fiverr Payout", transactionId: "#12548802", type: "Transfer", card: "1234 ****", date: "01 Jan, 01:00 PM", amount: "+$980", positive: true },
    { id: 12, description: "Adobe CC", transactionId: "#12548803", type: "Service", card: "1234 ****", date: "31 Dec, 10:00 AM", amount: "-$54.99", positive: false },
];

const PAGE_SIZE = 5;

const TABS = [
    { key: "all" as const, label: "All Transactions" },
    { key: "income" as const, label: "Income" },
    { key: "expense" as const, label: "Expense" },
];

// ── CreditCard — exact same as Dashboard ──────────────────────────────────
function CreditCard({ card }: { card: Card }) {
    return (
        <div
            className={`relative aspect-[1.56/1] w-full overflow-hidden rounded-[22px] p-[5%] flex flex-col justify-between transition-all font-sans
                ${card.dark
                    ? "bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white shadow-lg"
                    : "bg-white border border-[#DFEAF2] text-[#343C6A] shadow-sm"
                }`}
        >
            {/* Top: Balance & Chip */}
            <div className="relative z-10 flex items-start justify-between font-sans">
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

            {/* Bottom: Holder, Expiry, Number */}
            <div className="relative z-10 font-sans">
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

//  SectionTitle
function SectionTitle({ title, link }: { title: string; link?: string }) {
    return (
        <div className="mb-4 flex items-center justify-between font-semibold font-sans">
            <h2 className="m-0 text-[16px] font-bold text-[#343C6A]">{title}</h2>
            {link && (
                <a href="#" className="text-[14px] font-semibold text-[#343C6A] no-underline">
                    {link}
                </a>
            )}
        </div>
    );
}

//  TypeBadge 
function TypeBadge({ type }: { type: string }) {
    const styles: Record<string, string> = {
        Shopping: "bg-[#FFF5E6] text-[#FC7900]",
        Transfer: "bg-[#EEF2FF] text-[#396AFF]",
        Service: "bg-[#E8FDFB] text-[#16DBCC]",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${styles[type] ?? "bg-gray-100 text-gray-500"}`}>
            {type}
        </span>
    );
}

// Pagination 
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
    return (
        <div className="flex items-center justify-center gap-2 mt-5 font-sans flex-wrap">
            <button
                onClick={() => onChange(Math.max(1, current - 1))}
                disabled={current === 1}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border border-[#DFEAF2] text-[#343C6A] bg-white hover:bg-[#F5F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                ← Previous
            </button>
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`w-8 h-8 rounded-full text-sm font-semibold transition ${p === current
                        ? "bg-[#1814F3] text-white shadow-md"
                        : "bg-white border border-[#DFEAF2] text-[#343C6A] hover:bg-[#F5F7FA]"
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => onChange(Math.min(total, current + 1))}
                disabled={current === total}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border border-[#DFEAF2] text-[#343C6A] bg-white hover:bg-[#F5F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Next →
            </button>
        </div>
    );
}

//  Main Page 
export default function Transaction() {
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");

    const filtered = allTransactions.filter((t) => {
        if (activeTab === "income") return t.positive;
        if (activeTab === "expense") return !t.positive;
        return true;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex-1 p-7 bg-[#F5F7FA] overflow-y-auto min-h-screen font-[Lato]">

            {/* ── Row 1: My Cards + My Expense ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* My Cards — same as Dashboard (lg:col-span-2) */}
                <div className="lg:col-span-2">
                    <SectionTitle title="My Cards" link="+ Add Card" />
                    <div className="flex gap-5 overflow-x-auto pb-1">
                        {cards.map((card) => (
                            <CreditCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>

                {/* My Expense — same col-span-1 as Recent Transactions on Dashboard */}
                <div className="lg:col-span-1 font-sans">
                    <SectionTitle title="My Expense" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={expenseData}
                                barSize={40}
                                barGap={16}
                                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#F5F7FA"
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#718EBF", fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />


                                <Tooltip
                                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                        fontSize: "12px",
                                    }}
                                />

                                <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                                    {expenseData.map((entry) => (
                                        <Cell
                                            key={entry.month}
                                            fill={
                                                entry.month === HIGHLIGHTED_MONTH
                                                    ? "#16DBCC"
                                                    : "#EDF2FF"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── Row 2: Recent Transactions Table ── */}
            <div>
                <SectionTitle title="Recent Transactions" />
                <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden font-sans">

                    {/* Tabs */}
                    <div className="flex border-b border-[#F5F7FA] px-6 pt-4 gap-1 font-sans">
                        {TABS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => { setActiveTab(key); setPage(1); }}
                                className={`px-5 py-2 text-sm font-semibold border-b-2 transition ${activeTab === key
                                    ? "border-[#1814F3] text-[#1814F3]"
                                    : "border-transparent text-[#718EBF] hover:text-[#343C6A]"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Table Wrapper */}
                    <div className="overflow-x-auto">
                        <table className="w-full font-sans border-collapse">
                            <thead>
                                <tr className="text-[#718EBF] text-[13px] border-b border-[#F5F7FA]">
                                    <th className="text-left px-6 py-4 font-semibold">Description</th>
                                    <th className="text-left px-4 py-4 font-semibold">Transaction ID</th>
                                    <th className="text-left px-4 py-4 font-semibold">Type</th>
                                    <th className="text-left px-4 py-4 font-semibold">Card</th>
                                    <th className="text-left px-4 py-4 font-semibold">Date</th>
                                    <th className="text-right px-4 py-4 font-semibold">Amount</th>
                                    <th className="text-center px-6 py-4 font-semibold">Receipt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5F7FA]">
                                {paginated.map((tx, i) => (
                                    <tr
                                        key={tx.id}
                                        className={`transition-colors hover:bg-[#F4F7FF]/50 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFD]"}`}
                                    >
                                        {/* Description - Text thora bara aur dark */}
                                        <td className="px-6 py-5 font-medium text-[#343C6A] text-[14px] whitespace-nowrap">
                                            {tx.description}
                                        </td>

                                        {/* Trans ID */}
                                        <td className="px-4 py-5 text-[#343C6A] text-[14px]">
                                            {tx.transactionId}
                                        </td>

                                        {/* Type Badge */}
                                        <td className="px-4 py-5">
                                            <TypeBadge type={tx.type} />
                                        </td>

                                        {/* Card */}
                                        <td className="px-4 py-5 text-[#343C6A] text-[14px]">
                                            {tx.card}
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-5 text-[#343C6A] text-[14px] whitespace-nowrap">
                                            {tx.date}
                                        </td>

                                        {/* Amount */}
                                        <td className={`px-4 py-5 text-right font-bold text-[14px] whitespace-nowrap ${tx.positive ? "text-[#41D4A8]" : "text-[#FF4B4B]"}`}>
                                            {tx.positive ? `+${tx.amount}` : `-${tx.amount}`}
                                        </td>

                                        {/* Download Button - Modern Outline Style */}
                                        <td className="px-6 py-5 text-center">
                                            <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#121481] text-[#121481] text-[12px] font-medium hover:bg-[#1814F3] hover:text-white transition-all active:scale-95">
                                                <Download className="w-3.5 h-3.5" />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
                {/* Pagination */}
                <div className="px-6 pb-6 font-sans flex items-center justify-end">
                    <Pagination current={page} total={totalPages} onChange={setPage} />
                </div>
            </div>
        </div>
    );
}