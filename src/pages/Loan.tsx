import React, { useState } from "react";
import { User, Briefcase, TrendingUp, Wrench } from "lucide-react";


const PersonalLoanIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E7EDFF]">
        <User className="text-[#396AFF]" size={20} />
    </div>
);

const CorporateLoanIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FFE8D6]">
        <Briefcase className="text-[#F7931A]" size={20} />
    </div>
);

const BusinessLoanIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FFE0E0]">
        <TrendingUp className="text-[#FF4B4B]" size={20} />
    </div>
);

const CustomLoanIcon = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#D4F5E9]">
        <Wrench className="text-[#16DBAA]" size={20} />
    </div>
);


interface LoanStat {
    label: string;
    value: string;
    Icon: () => React.JSX.Element;
    cardBg: string;
}

interface LoanRow {
    sl: string;
    loanMoney: string;
    leftToRepay: string;
    duration: string;
    interestRate: string;
    installment: string;
}

const loanStats: LoanStat[] = [
    { label: "Personal Loans", value: "$50,000", Icon: PersonalLoanIcon, cardBg: "bg-white" },
    { label: "Corporate Loans", value: "$100,000", Icon: CorporateLoanIcon, cardBg: "bg-white" },
    { label: "Business Loans", value: "$500,000", Icon: BusinessLoanIcon, cardBg: "bg-white" },
    { label: "Custom Loans", value: "Choose Money", Icon: CustomLoanIcon, cardBg: "bg-white" },
];

const ACTIVE_LOANS: LoanRow[] = [
    { sl: "01.", loanMoney: "$100,000", leftToRepay: "$40,500", duration: "8 Months", interestRate: "12%", installment: "$2,000 / month" },
    { sl: "02.", loanMoney: "$500,000", leftToRepay: "$250,000", duration: "36 Months", interestRate: "10%", installment: "$8,000 / month" },
    { sl: "03.", loanMoney: "$900,000", leftToRepay: "$40,500", duration: "12 Months", interestRate: "12%", installment: "$5,000 / month" },
    { sl: "04.", loanMoney: "$50,000", leftToRepay: "$40,500", duration: "25 Months", interestRate: "5%", installment: "$2,000 / month" },
    { sl: "05.", loanMoney: "$50,000", leftToRepay: "$40,500", duration: "5 Months", interestRate: "16%", installment: "$10,000 / month" },
    { sl: "06.", loanMoney: "$80,000", leftToRepay: "$25,500", duration: "14 Months", interestRate: "8%", installment: "$2,000 / month" },
    { sl: "07.", loanMoney: "$12,000", leftToRepay: "$5,500", duration: "9 Months", interestRate: "13%", installment: "$500 / month" },
    { sl: "08.", loanMoney: "$160,000", leftToRepay: "$100,800", duration: "3 Months", interestRate: "12%", installment: "$900 / month" },
];

const TOTALS = {
    loanMoney: "$125,000",
    leftToRepay: "$750,000",
    installment: "$50,000 / month",
};



type RepayButtonProps = {
    active?: boolean;
    onClick?: () => void;
};

const RepayButton: React.FC<RepayButtonProps> = ({ active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`
            px-5 py-1.5 rounded-full text-xs font-semibold font-sans
            transition-all duration-200 whitespace-nowrap

            ${active
                ? "bg-white text-[#1814F3] border border-[#1814F3]"
                : "bg-transparent text-[#232323] border border-[#232323] hover:bg-[#1814F3] hover:text-white hover:border-[#1814F3]"
            }
        `}
    >
        Repay
    </button>
);



export default function Loan() {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    return (
        <div className="flex-1 p-6 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">

            {/* ── Stats Grid — exact same as Account.tsx ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {loanStats.map(({ label, value, Icon, cardBg }) => (
                    <div
                        key={label}
                        className={`${cardBg} rounded-[15px] p-5 flex items-center gap-4
                            shadow-[0_4px_20px_rgba(0,0,0,0.04)]`}
                    >
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

            <h2 className="text-base font-bold text-[#343C6A] mb-3 px-1">
                Active Loans Overview
            </h2>

            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">


                <div className="overflow-x-auto">
                    <table className="w-full font-sans">
                        <thead>
                            <tr className="border-b border-[#F5F7FA]">
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pl-6 pr-4 whitespace-nowrap w-14">
                                    SL No
                                </th>
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pr-4 whitespace-nowrap">
                                    Loan Money
                                </th>
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pr-4 whitespace-nowrap">
                                    Left to repay
                                </th>
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pr-4 whitespace-nowrap">
                                    Duration
                                </th>
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pr-4 whitespace-nowrap">
                                    Interest rate
                                </th>
                                <th className="text-left text-xs font-semibold text-[#718EBF] py-3 pr-4 whitespace-nowrap">
                                    Installment
                                </th>
                                <th className="py-3 pr-6 w-24" />
                            </tr>
                        </thead>

                        <tbody>
                            {ACTIVE_LOANS.map((row) => (
                                <tr
                                    key={row.sl}
                                    onMouseEnter={() => setHoveredRow(row.sl)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={`border-b border-[#F5F7FA] last:border-0 transition-colors duration-150
                                        ${hoveredRow === row.sl ? "bg-[#F9FAFB]" : ""}`}
                                >
                                    <td className="pl-8 pr-20 py-4 text-sm text-[#232323]">
                                        {row.sl}
                                    </td>
                                    <td className="pr-4 py-4 text-sm text-[#232323]">
                                        {row.loanMoney}
                                    </td>
                                    <td className="pr-4 py-4 text-sm text-[#232323]">
                                        {row.leftToRepay}
                                    </td>
                                    <td className="pr-4 py-4 text-sm text-[#232323]">
                                        {row.duration}
                                    </td>
                                    <td className="pr-4 py-4 text-sm text-[#232323]">
                                        {row.interestRate}
                                    </td>
                                    <td className="pr-4 py-4 text-sm text-[#232323]">
                                        {row.installment}
                                    </td>
                                    <td className="pr-6 py-4">
                                        <RepayButton active={row.sl === "01."} />
                                    </td>
                                </tr>
                            ))}

                            {/* ── Totals Row ── */}
                            <tr className="border-t-2 border-[#F5F7FA] bg-[#FAFBFF]">
                                <td className="pl-6 pr-4 py-4 text-sm font-bold text-[#FE5C73]">
                                    Total
                                </td>
                                <td className="pr-4 py-4 text-sm font-bold text-[#FE5C73]">
                                    {TOTALS.loanMoney}
                                </td>
                                <td className="pr-4 py-4 text-sm font-bold text-[#FE5C73]">
                                    {TOTALS.leftToRepay}
                                </td>
                                <td className="pr-4 py-4" />
                                <td className="pr-4 py-4" />
                                <td className="pr-4 py-4 text-sm font-bold text-[#FE5C73]">
                                    {TOTALS.installment}
                                </td>
                                <td className="pr-6 py-4" />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}