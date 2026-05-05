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
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 h-[80px]">
            {/* Page Title */}
            <h1 className="text-[#343C6A] text-2xl font-bold font-sans">{pageTitle}</h1>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                {/* Settings Icon */}
                <button onClick={() => navigate("/settings")} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F7FA] text-[#718EBF] hover:bg-[#E8F0FF] hover:text-[#2D60FF] transition">
                    <Settings size={20} />
                </button>

                {/* Bell Icon */}
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F7FA] text-[#FE5C73] hover:bg-[#E8F0FF] transition">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#FE5C73] rounded-full border-2 border-white" />
                </button>

                {/* Avatar */}
                <button onClick={() => navigate("/settings/profile")} className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
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