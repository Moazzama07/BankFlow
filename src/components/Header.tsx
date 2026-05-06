import React from "react";
import { Bell, Settings } from "lucide-react";
import userImg from "../assets/user.svg";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle = "Overview" }) => {
    const navigate = useNavigate();

    return (
        <header className="relative flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-100 h-[70px] md:h-[80px]">


            <h1 className="hidden md:block text-[#343C6A] text-2xl font-bold">
                {pageTitle}
            </h1>


            <h1 className="absolute left-1/2 -translate-x-1/2 md:hidden text-[#343C6A] text-lg font-semibold">
                {pageTitle}
            </h1>


            <div className="flex items-center gap-3 md:gap-4 ml-auto">


                <div className="hidden md:flex items-center gap-4">

                    <button
                        onClick={() => navigate("/settings")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F7FA] text-[#718EBF] hover:bg-[#E8F0FF] hover:text-[#2D60FF] transition"
                    >
                        <Settings size={20} />
                    </button>


                    <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F7FA] text-[#FE5C73] hover:bg-[#E8F0FF] transition">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#FE5C73] rounded-full border-2 border-white" />
                    </button>
                </div>


                <button
                    onClick={() => navigate("/settings/profile")}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-100"
                >
                    <img
                        src={userImg}
                        alt="User Avatar"
                        className="w-full h-full object-contain"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;