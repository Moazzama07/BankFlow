import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from "recharts";
import ChipCardWhite from "../assets/Chip_Card.png";
import ChipCardBlack from "../assets/Chip_Card 1.png";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Music, Wrench, User, Apple, Gamepad2 } from "lucide-react";

const WalletIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FFE0A3]">
        <Wallet className="text-[#F7931A]" size={20} />
    </div>
);

const IncomeIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E0F5FF]">
        <TrendingUp className="text-[#16DBCC]" size={20} />
    </div>
);

const ExpenseIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FFE0E0]">
        <TrendingDown className="text-[#FF4B4B]" size={20} />
    </div>
);

const SavingIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E5E0FF]">
        <PiggyBank className="text-[#7B6EF6]" size={20} />
    </div>
);

//  Types
interface Card {
    id: number;
    balance: string;
    holder: string;
    validThru: string;
    number: string;
    dark: boolean;
}

type Transaction = {
    icon: React.ReactNode;
    name: string;
    date: string;
    cardLast: string;
    type: string;
    status: "Pending" | "Completed";
    amount: string;
    positive: boolean;
};

interface Invoice {
    icon: React.ReactNode;
    name: string;
    time: string;
    amount: string;
}

const statsData = [
    { label: "My Balance", value: "$12,750", Icon: WalletIcon },
    { label: "Income", value: "$5,600", Icon: IncomeIcon },
    { label: "Expense", value: "$3,460", Icon: ExpenseIcon },
    { label: "Total Saving", value: "$7,920", Icon: SavingIcon },
];

const cards: Card[] = [
    { id: 1, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: true },
    { id: 2, balance: "$5,756", holder: "Eddy Cusuma", validThru: "12/22", number: "3778 **** **** 1234", dark: false },
];

const transactions: Transaction[] = [
    {
        icon: <Music size={18} />,
        name: "Spotify Subscription",
        date: "25 Jan 2021",
        cardLast: "1234 ****",
        type: "Shopping",
        status: "Pending",
        amount: "-$150",
        positive: false
    },
    {
        icon: <Wrench size={18} />,
        name: "Mobile Service",
        date: "25 Jan 2021",
        cardLast: "1234 ****",
        type: "Service",
        status: "Completed",
        amount: "-$340",
        positive: false
    },
    {
        icon: <User size={18} />,
        name: "Emilly Wilson",
        date: "25 Jan 2021",
        cardLast: "1234 ****",
        type: "Transfer",
        status: "Completed",
        amount: "+$780",
        positive: true
    },
];

const debitCreditData = [
    { day: "Sat", debit: 450, credit: 280 },
    { day: "Sun", debit: 380, credit: 500 },
    { day: "Mon", debit: 620, credit: 390 },
    { day: "Tue", debit: 550, credit: 700 },
    { day: "Wed", debit: 700, credit: 480 },
    { day: "Thu", debit: 480, credit: 620 },
    { day: "Fri", debit: 580, credit: 800 },
];

const invoices: Invoice[] = [
    {
        icon: <Apple className="w-5 h-5 text-[#FFBB38]" />,
        name: "Apple Store",
        time: "5h ago",
        amount: "$450"
    },
    {
        icon: <User className="w-5 h-5 text-[#396AFF]" />,
        name: "Michael",
        time: "2 days ago",
        amount: "$160"
    },
    {
        icon: <Gamepad2 className="w-5 h-5 text-[#FE5C73]" />,
        name: "Playstation",
        time: "5 days ago",
        amount: "$1085"
    },
    {
        icon: <User className="w-5 h-5 text-[#396AFF]" />,
        name: "William",
        time: "10 days ago",
        amount: "$90"
    },
];

// CreditCard 
function CreditCard({ card }: { card: Card }) {
    return (
        <div
            className={`relative w-full rounded-[22px] p-5 flex flex-col justify-between h-full font-sans
                ${card.dark
                    ? "bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white shadow-lg"
                    : "bg-white border border-[#DFEAF2] text-[#343C6A] shadow-sm"
                }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className={`text-xs mb-1 ${card.dark ? "text-white/70" : "text-[#718EBF]"}`}>Balance</p>
                    <p className="text-2xl font-bold">{card.balance}</p>
                </div>
                <img
                    src={card.dark ? ChipCardBlack : ChipCardWhite}
                    alt="chip"
                    className="w-10 h-auto object-contain"
                />
            </div>
            <div>
                <div className="flex gap-10 mb-4">
                    <div>
                        <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${card.dark ? "text-white/60" : "text-[#718EBF]"}`}>Card Holder</p>
                        <p className="text-sm font-semibold">{card.holder}</p>
                    </div>
                    <div>
                        <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${card.dark ? "text-white/60" : "text-[#718EBF]"}`}>Valid Thru</p>
                        <p className="text-sm font-semibold">{card.validThru}</p>
                    </div>
                </div>
                <div className={`flex items-center justify-between pt-4 border-t ${card.dark ? "border-white/20" : "border-[#DFEAF2]"}`}>
                    <p className="text-base font-semibold tracking-widest">{card.number}</p>
                    <div className="relative flex h-5 w-8">
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
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#343C6A] font-sans">{title}</h2>
            {link && <a href="#" className="text-sm font-semibold text-[#343C6A] hover:text-[#1814F3] transition">{link}</a>}
        </div>
    );
}

function StatusBadge({ status }: { status: "Pending" | "Completed" }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-sans
            ${status === "Pending" ? "bg-[#FFF5E6] text-[#FC7900]" : "bg-[#E8FDF5] text-[#16DBAA]"}`}>
            {status}
        </span>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-[#DFEAF2] rounded-xl px-4 py-2 shadow-lg text-xs font-sans">
                <p className="text-[#343C6A] font-bold mb-1">{label}</p>
                {payload.map((p: any) => (
                    <p key={p.name} style={{ color: p.color }} className="font-semibold">
                        {p.name}: ${p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


export default function Account() {
    return (
        <div className="flex-1 p-6 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsData.map(({ label, value, Icon }) => (
                    <div key={label} className="bg-white rounded-[15px] p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                        <div className="shrink-0">
                            <Icon />
                        </div>
                        <div>
                            <p className="text-xs text-[#718EBF] font-sans mb-1">{label}</p>
                            <p className="text-lg font-bold text-[#343C6A] font-sans">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* ── Row 2: Last Transaction + My Card ── */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6 items-stretch">
                <div className="lg:col-span-4 flex flex-col">
                    <SectionTitle title="Last Transaction" />
                    <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex-1">
                        <div className="overflow-x-auto">
                            <table className="w-full font-sans">
                                <tbody>
                                    {transactions.map((tx, i) => (
                                        <tr key={i} className="border-b border-[#F5F7FA] last:border-0 hover:bg-[#F9FAFB] transition">
                                            {/* Icon & Name Column */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center shrink-0 text-[#2D60FF]">
                                                        {tx.icon}
                                                    </span>
                                                    <div>

                                                        <p className="font-bold text-[#343C6A] text-[15px] whitespace-nowrap leading-tight">
                                                            {tx.name}
                                                        </p>
                                                        <p className="text-sm text-[#718EBF] mt-0.5">
                                                            {tx.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>


                                            <td className="px-4 py-4 text-[#718EBF] text-[14px] font-medium">
                                                {tx.type}
                                            </td>


                                            <td className="px-4 py-4 text-[#718EBF] text-[14px] font-medium">
                                                {tx.cardLast}
                                            </td>


                                            <td className="px-4 py-4">
                                                <StatusBadge status={tx.status} />
                                            </td>

                                            {/* Amount Column - Colors already set correctly */}
                                            <td className={`px-5 py-4 text-right font-bold text-[15px] whitespace-nowrap
                                ${tx.positive ? "text-[#16DBAA]" : "text-[#FF4B4B]"}`}>
                                                {tx.positive ? `+${tx.amount}` : `-${tx.amount}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col">
                    <SectionTitle title="My Card" link="See All" />
                    <div className="flex-1">
                        <div className="h-full">
                            <CreditCard card={cards[0]} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Row 3: Debit & Credit Overview + Invoices Sent ── */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6 items-stretch">

                <div className="lg:col-span-4 flex flex-col">
                    <SectionTitle title="Debit & Credit Overview" />
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

                        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                            <p className="text-sm text-[#718EBF] font-sans">
                                <span className="text-[#343C6A] font-bold">$7,560</span> Debited &amp;{" "}
                                <span className="text-[#343C6A] font-bold">$5,420</span> Credited in this Week
                            </p>
                            <div className="flex items-center gap-4 text-xs font-sans text-[#718EBF]">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-[4px] bg-[#4C78FF]"></span>
                                    <span className="text-[14px]">Debit</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-[4px] bg-[#FF82AC]"></span>
                                    <span className="text-[14px]">Credit</span>
                                </div>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={230}>
                            <BarChart data={debitCreditData} barSize={20} barGap={4} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} stroke="#F5F7FA" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#718EBF", fontSize: 12 }} />

                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.02)" }} />

                                <Bar dataKey="debit" name="Debit" fill="#1A16F3" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="credit" name="Credit" fill="#FCAA0B" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col">
                    <SectionTitle title="Invoices Sent" />


                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between flex-1 min-h-[250px]">
                        {invoices.map((inv, i) => (
                            <div key={i} className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-4">


                                    <span className="w-12 h-12 rounded-full bg-[#F5F7FA] flex items-center justify-center shrink-0">

                                        {inv.icon}
                                    </span>

                                    <div>

                                        <p className="text-base font-bold text-[#343C6A] font-sans leading-tight">
                                            {inv.name}
                                        </p>

                                        <p className="text-sm text-[#718EBF] font-sans mt-0.5">
                                            {inv.time}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm font-extrabold text-[#718EBF] font-sans">
                                    {inv.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}