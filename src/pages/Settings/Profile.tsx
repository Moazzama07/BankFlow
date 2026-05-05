import React, { useState, useRef } from "react";
import userImg from "../../assets/user.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Types 

type Tab = "edit-profile" | "preferences" | "security";

interface ProfileForm {
    yourName: string;
    userName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    presentAddress: string;
    permanentAddress: string;
    city: string;
    postalCode: string;
    country: string;
}

// Static Data 

const TABS: { id: Tab; label: string }[] = [
    { id: "edit-profile", label: "Edit Profile" },
    { id: "preferences", label: "Preferences" },
    { id: "security", label: "Security" },
];

const INITIAL_FORM: ProfileForm = {
    yourName: "Charlene Reed",
    userName: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "••••••••••",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
};

// Shared: SaveButton 

const SaveButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="
            px-10 py-3 rounded-[10px] text-sm font-semibold font-sans text-white
            bg-[#1814F3] hover:bg-[#1510d0] transition-all duration-200
        "
    >
        Save
    </button>
);

// Shared: FormField 

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    type?: string;
    hasDropdown?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
    label, name, value, type = "text", hasDropdown = false, onChange,
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#232323] font-sans">{label}</label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="
                    w-full px-4 py-2.5 text-sm text-[#718EBF] font-sans
                    border border-[#DFEAF2] rounded-[10px] bg-white outline-none
                    focus:border-[#2D60FF] focus:ring-1 focus:ring-[#2D60FF]/20
                    transition-all duration-150
                "
            />
            {hasDropdown && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#718EBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            )}
        </div>
    </div>
);

// Edit Profile 
interface EditProfileTabProps {
    form: ProfileForm;
    avatarSrc: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAvatarClick: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}


const EditProfileTab: React.FC<EditProfileTabProps> = ({
    form,
    avatarSrc,
    fileInputRef,
    onChange,
    onAvatarClick,
    onFileChange,
    onSave,
}) => {
    // Date change handler to sync with your main form state
    const handleDateChange = (date: Date | null) => {
        // Hum manually ek fake event object banate hain taake aapka main onChange function handle kar sake
        const event = {
            target: {
                name: "dateOfBirth",
                value: date ? date.toISOString() : "", // Ya aap formatting change kar sakte hain
            },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
    };

    return (
        <div className="flex gap-10">
            {/* Avatar Section */}
            <div className="shrink-0 pt-1">
                <div className="relative w-[90px] h-[90px]">
                    <img
                        src={avatarSrc}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                    <button
                        onClick={onAvatarClick}
                        aria-label="Change profile picture"
                        className="
                absolute bottom-0 right-0 w-6 h-6
                bg-[#1814F3] hover:bg-[#1510d0]
                rounded-full flex items-center justify-center
                shadow-md transition-colors duration-200
            "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-4 h-4"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        </svg>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                    />
                </div>
            </div>

            {/* Form Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <FormField label="Your Name" name="yourName" value={form.yourName} onChange={onChange} />
                    <FormField label="User Name" name="userName" value={form.userName} onChange={onChange} />
                    <FormField label="Email" name="email" value={form.email} onChange={onChange} type="email" />
                    <FormField label="Password" name="password" value={form.password} onChange={onChange} type="password" />

                    {/* Custom Date of Birth Picker */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#232323] font-sans">Date of Birth</label>
                        <div className="relative">
                            <DatePicker
                                selected={form.dateOfBirth ? new Date(form.dateOfBirth) : null}
                                onChange={handleDateChange}
                                dateFormat="dd MMMM yyyy"
                                className="
                    w-full px-4 py-2.5 text-sm text-[#718EBF] font-sans
                    border border-[#DFEAF2] rounded-[10px] bg-white outline-none
                    focus:border-[#2D60FF] focus:ring-1 focus:ring-[#2D60FF]/20
                    transition-all duration-150
                "
                                wrapperClassName="w-full"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#718EBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <FormField label="Present Address" name="presentAddress" value={form.presentAddress} onChange={onChange} />
                    <FormField label="Permanent Address" name="permanentAddress" value={form.permanentAddress} onChange={onChange} />
                    <FormField label="City" name="city" value={form.city} onChange={onChange} />
                    <FormField label="Postal Code" name="postalCode" value={form.postalCode} onChange={onChange} />
                    <FormField label="Country" name="country" value={form.country} onChange={onChange} />
                </div>

                <div className="flex justify-end mt-8">
                    <SaveButton onClick={onSave} />
                </div>
            </div>
        </div>
    );
};

// Preferences 
const PreferencesTab: React.FC = () => {
    const [currency, setCurrency] = useState("USD");
    const [timezone, setTimezone] = useState("GMT-5 (Eastern)");
    const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

    return (
        /* max-w-lg ko hata kar width adjust kar sakte hain agar zyada space chahiye */
        <div className="max-w-3xl space-y-6">

            {/* Currency & Timezone Row */}
            <div className="grid grid-cols-2 gap-6">
                {/* Currency */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#232323] font-sans">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="px-4 py-2.5 text-sm text-[#718EBF] font-sans border border-[#DFEAF2] rounded-[10px] bg-white outline-none focus:border-[#2D60FF] transition-all"
                    >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>PKR</option>
                    </select>
                </div>

                {/* Timezone */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#232323] font-sans">Timezone</label>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="px-4 py-2.5 text-sm text-[#718EBF] font-sans border border-[#DFEAF2] rounded-[10px] bg-white outline-none focus:border-[#2D60FF] transition-all"
                    >
                        <option>GMT-5 (Eastern)</option>
                        <option>GMT-8 (Pacific)</option>
                        <option>GMT+0 (UTC)</option>
                        <option>GMT+5 (PKT)</option>
                    </select>
                </div>
            </div>

            {/* Notification */}
            <div className="flex flex-col gap-4">
                <label className="text-xs font-semibold text-[#232323] font-sans">Notifications</label>
                <div className="space-y-3">
                    {(["email", "sms", "push"] as const).map((key) => (
                        <label key={key} className="flex items-center gap-3 cursor-pointer select-none w-fit">
                            <div
                                onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                                className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${notifications[key] ? "bg-[#16DBCC]" : "bg-[#DFEAF2]"}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${notifications[key] ? "translate-x-5" : ""}`} />
                            </div>
                            <span className="text-sm text-[#718EBF] font-sans">
                                {key === "sms" ? "SMS" : key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <SaveButton onClick={() => console.log("Preferences saved")} />
            </div>
        </div>
    );
};


// Security 
const SecurityTab: React.FC = () => {
    const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords((p) => ({ ...p, [name]: value }));
    };

    return (
        <div className="max-w-lg space-y-5 font-sans">
            <p className="text-sm font-semibold text-[#333B69] font-sans">Change Password</p>

            {[
                { label: "Current Password", name: "current" },
                { label: "New Password", name: "newPass" },
                { label: "Confirm New Password", name: "confirm" },
            ].map(({ label, name }) => (
                <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#232323] font-sans">{label}</label>
                    <input
                        type="password"
                        name={name}
                        value={passwords[name as keyof typeof passwords]}
                        onChange={handleChange}
                        placeholder="••••••••••"
                        className="
                            w-full px-4 py-2.5 text-sm text-[#718EBF] font-sans
                            border border-[#DFEAF2] rounded-[10px] bg-white outline-none
                            focus:border-[#2D60FF] focus:ring-1 focus:ring-[#2D60FF]/20
                            transition-all duration-150 placeholder:text-[#DFEAF2]
                        "
                    />
                </div>
            ))}

            {/* 2FA
            <div className="pt-2 border-t border-[#F5F7FA]">
                <p className="text-xs font-semibold text-[#232323] font-sans mb-3">Two-Factor Authentication</p>
                <div className="flex items-center justify-between bg-[#FAFBFF] border border-[#DFEAF2] rounded-[10px] px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold text-[#343C6A] font-sans">Authenticator App</p>
                        <p className="text-xs text-[#718EBF] font-sans mt-0.5">Generate one-time codes via an authenticator app</p>
                    </div>
                    <button className="text-xs font-semibold text-[#1814F3] font-sans hover:underline">
                        Enable
                    </button>
                </div>
            </div> */}

            <div className="flex justify-end mt-8">
                <SaveButton onClick={() => console.log("Security saved")} />
            </div>
        </div>
    );
};

//  Main Page 

export default function Profile() {
    const [activeTab, setActiveTab] = useState<Tab>("edit-profile");
    const [avatarSrc, setAvatarSrc] = useState(userImg);
    const [form, setForm] = useState<ProfileForm>(INITIAL_FORM);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setAvatarSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex-1 p-6 bg-[#F5F7FA] overflow-y-auto min-h-screen font-sans">
            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">

                {/* Tabs */}
                <div className="border-b border-[#F5F7FA] px-8">
                    <div className="flex gap-8">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    py-4 text-sm font-semibold font-sans relative
                                    transition-colors duration-150
                                    ${activeTab === tab.id
                                        ? "text-[#1814F3]"
                                        : "text-[#718EBF] hover:text-[#343C6A]"}
                                `}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1814F3] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === "edit-profile" && (
                        <EditProfileTab
                            form={form}
                            avatarSrc={avatarSrc}
                            fileInputRef={fileInputRef}
                            onChange={handleChange}
                            onAvatarClick={handleAvatarClick}
                            onFileChange={handleFileChange}
                            onSave={() => console.log("Saved:", form)}
                        />
                    )}
                    {activeTab === "preferences" && <PreferencesTab />}
                    {activeTab === "security" && <SecurityTab />}
                </div>
            </div>
        </div>
    );
}