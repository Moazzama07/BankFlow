import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import ChipCardWhite from "../assets/Chip_Card.png";
import ChipCardBlack from "../assets/Chip_Card 1.png";
import { CreditCardIcon, Wallet, User, type LucideIcon } from "lucide-react";
import user1 from "../assets/1.svg"
import user2 from "../assets/2.svg";
import user3 from "../assets/3.svg";

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
    icon: LucideIcon;
    name: string;
    date: string;
    amount: string;
    positive: boolean;
    color: string;
}

interface Contact {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

const cards: Card[] = [
    {
        id: 1,
        balance: "$5,756",
        holder: "Eddy Cusuma",
        validThru: "12/22",
        number: "3778 **** **** 1234",
        dark: true,
    },
    {
        id: 2,
        balance: "$5,756",
        holder: "Eddy Cusuma",
        validThru: "12/22",
        number: "3778 **** **** 1234",
        dark: false,
    },
];

const transactions: Transaction[] = [
    {
        id: 1,
        icon: CreditCardIcon,
        name: "Deposit from my Card",
        date: "28 January 2021",
        amount: "-$850",
        positive: false,
        color: "#FFBB38",
    },
    {
        id: 2,
        icon: Wallet,
        name: "Deposit Paypal",
        date: "25 January 2021",
        amount: "+$2,500",
        positive: true,
        color: "#396AFF",
    },
    {
        id: 3,
        icon: User,
        name: "Jemi Wilson",
        date: "21 January 2021",
        amount: "+$5,400",
        positive: true,
        color: "#16DBCC",
    },
];

const weeklyData = [
    { day: "Sat", withdraw: 460, deposit: 240 },
    { day: "Sun", withdraw: 350, deposit: 130 },
    { day: "Mon", withdraw: 320, deposit: 270 },
    { day: "Tue", withdraw: 480, deposit: 200 },
    { day: "Wed", withdraw: 150, deposit: 440 },
    { day: "Thu", withdraw: 390, deposit: 240 },
    { day: "Fri", withdraw: 340, deposit: 240 },
];

const expenseData = [
    { name: "Entertainment", value: 30, color: "#343C6A" },
    { name: "Bill Expense", value: 15, color: "#FC7900" },
    { name: "Investment", value: 20, color: "#396AFF" },
    { name: "Others", value: 35, color: "#232323" },
];

const contacts: Contact[] = [
    { id: 1, avatar: user1, name: "Livia Bator", role: "CEO" },
    { id: 2, avatar: user2, name: "Randy Press", role: "Director" },
    { id: 3, avatar: user3, name: "Workman", role: "Designer" },
];

const balanceHistory = [
    { month: "Jul", value: 200 },
    { month: "Aug", value: 500 },
    { month: "Sep", value: 320 },
    { month: "Oct", value: 800 },
    { month: "Nov", value: 200 },
    { month: "Dec", value: 700 },
    { month: "Jan", value: 620 },
];

// Custom pie label — renders % and name inside each slice
const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ pointerEvents: "none" }}
            fontFamily="sans-serif"
        >
            <tspan x={x} dy="-7" fontSize={12} fontWeight={700}>
                {`${(percent * 100).toFixed(0)}%`}
            </tspan>
            <tspan x={x} dy="15" fontSize={11} fontWeight={500} opacity={0.85}>
                {name}
            </tspan>
        </text>
    );
};

// Sub-components
function CreditCard({ card }: { card: Card }) {
    return (
        <div
            className={`relative aspect-[1.56/1] w-full overflow-hidden rounded-[22px] p-[5%] flex flex-col justify-between transition-all font-sans
        ${card.dark
                    ? "bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white shadow-lg"
                    : "bg-white border border-[#DFEAF2] text-[#343C6A] shadow-sm"
                }`}
        >
            {/* Top Section: Balance & Chip */}
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

            {/* Bottom Section */}
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

                <div
                    className={`flex items-center justify-between pt-[4%] border-t 
    ${card.dark ? "border-white/20" : "border-[#DFEAF2]"}`}
                >
                    <p className="text-[min(3.5vw,16px)] font-semibold tracking-[2px]">
                        {card.number}
                    </p>
                    <div className="relative flex h-5 w-8 shrink-0">
                        <div className={`absolute left-0 h-5 w-5 rounded-full ${card.dark ? "bg-white/50" : "bg-[#FC7900]"}`} />
                        <div className={`absolute right-0 h-5 w-5 rounded-full ${card.dark ? "bg-white/30" : "bg-[#FFB300]"}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default function Dashboard() {
    const [transferAmount, setTransferAmount] = useState("525.50");
    const [selectedContact, setSelectedContact] = useState(1);

    return (
        <div className="flex-1 p-7 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">

            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* My Cards */}
                <div className="lg:col-span-2">
                    <SectionTitle title="My Cards" link="See All" />
                    <div className="flex gap-5 overflow-x-auto pb-1">
                        {cards.map((card) => (
                            <CreditCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="lg:col-span-1 h-full flex flex-col font-sans">
                    <SectionTitle title="Recent Transaction" />
                    <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex-1 overflow-y-auto">
                        {transactions.map((tx, i) => (
                            <div
                                key={tx.id}
                                className={`flex items-center gap-3 py-3 sm:py-4 ${i !== transactions.length - 1 ? "border-b border-[#F5F7FA]" : ""}`}
                            >
                                <div
                                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mr-3 shrink-0"
                                    style={{ background: `${tx.color}18` }}
                                >
                                    <tx.icon className="w-5 h-5" style={{ color: tx.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#343C6A] truncate">{tx.name}</p>
                                    <p className="text-[11px] sm:text-xs text-[#718EBF] mt-[2px]">{tx.date}</p>
                                </div>
                                <span className={`text-sm font-bold whitespace-nowrap ${tx.positive ? "text-[#41D4A8]" : "text-[#FF4B4B]"}`}>
                                    {tx.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* Weekly Activity */}
                <div className="lg:col-span-2">
                    <SectionTitle title="Weekly Activity" />
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-[320px] font-sans">
                        <div className="flex justify-end gap-8 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#16DBCC]" />
                                <span className="text-sm text-[#718EBF]">Withdraw</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF82AC]" />
                                <span className="text-sm text-[#718EBF]">Deposit</span>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={weeklyData} barGap={10} barSize={15}>
                                <CartesianGrid vertical={false} stroke="#F3F3F5" strokeDasharray="3 3" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#718EBF", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718EBF", fontSize: 12 }} domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} />
                                <Tooltip cursor={false} contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="withdraw" fill="#1814F3" radius={[10, 10, 10, 10]} />
                                <Bar dataKey="deposit" fill="#16DBCC" radius={[10, 10, 10, 10]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expense Statistics — Fixed Pie Chart */}
                <div className="lg:col-span-1">
                    <SectionTitle title="Expense Statistics" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-[320px] flex items-center justify-center font-sans">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={expenseData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={115}
                                    labelLine={false}
                                    label={renderCustomLabel}
                                    strokeWidth={2}
                                    stroke="#fff"
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-6 flex-wrap">

                {/* Quick Transfer */}
                <div className="flex-[0_1_320px] min-w-[280px] font-sans">
                    <SectionTitle title="Quick Transfer" />
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] font-sans">
                        <div className="flex gap-5 mb-6 overflow-x-auto">
                            {contacts.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => setSelectedContact(c.id)}
                                    className="flex flex-col items-center gap-1 cursor-pointer shrink-0 outline-none"
                                    tabIndex={0}
                                >
                                    <div
                                        className={`w-[52px] h-[52px] rounded-full overflow-hidden border-2 transition ${selectedContact === c.id
                                            ? "border-[#396AFF] shadow-lg shadow-blue-200"
                                            : "border-transparent"
                                            }`}
                                    >
                                        <img
                                            src={c.avatar}
                                            alt={c.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-xs font-semibold text-[#343C6A] whitespace-nowrap">{c.name}</p>
                                    <p className="text-[11px] text-[#718EBF]">{c.role}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <p className="text-xs text-[#718EBF] mb-1">Write Amount</p>
                                <div className="bg-[#EDF1F7] rounded-full px-4 py-2 flex items-center">
                                    <span className="text-[#718EBF] text-sm mr-1">$</span>
                                    <input
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        className="bg-transparent outline-none text-sm font-semibold text-[#343C6A] w-20"
                                    />
                                </div>
                            </div>
                            <button className="mt-5 bg-gradient-to-r bg-[#1814F3] rounded-full px-5 py-2 text-white text-sm font-semibold flex items-center gap-2 shadow-lg">
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Balance History */}
                <div className="flex-[1_1_380px] font-sans">
                    <SectionTitle title="Balance History" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                        <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={balanceHistory}>
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#718EBF", fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718EBF", fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                <Area
                                    type="natural"
                                    dataKey="value"
                                    stroke="#1814F3"
                                    strokeWidth={2}
                                    fill="#396AFF"
                                    fillOpacity={0.08}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}