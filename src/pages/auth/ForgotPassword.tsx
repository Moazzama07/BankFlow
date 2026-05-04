import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleForgotPassword(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Email validation
            if (!email.trim()) {
                setError("Please enter your email address");
                setLoading(false);
                return;
            }

            // API call logic
            console.log("Requesting OTP for:", { email });
            // const response = await sendOtpAPI(email);

            setSuccess("A 6-digit OTP has been sent to your email.");

            // Optional: Redirect to OTP verification page after a short delay
            /* setTimeout(() => {
                navigate("/verify-otp", { state: { email } });
            }, 2000); 
            */

        } catch (err: any) {
            setError(err.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <img src={logo} alt="BankFlow" className="h-12 mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-[#343C6A] mb-2">BankFlow</h1>
                </div>

                {/* Forgot Password Card */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#DFEAF2]">
                    <h2 className="text-2xl font-bold text-[#343C6A] mb-2">Forgot Password?</h2>
                    <p className="text-sm text-[#718EBF] mb-6">
                        Enter your email address to receive a verification code.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[10px] text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-[10px] text-green-600 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#343C6A] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#DFEAF2] rounded-[10px] text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-[#1814F3] hover:bg-[#120FD4] disabled:opacity-50 text-white font-bold py-2.5 rounded-[10px] transition duration-200 shadow-md"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full mt-4 flex items-center justify-center gap-2 text-[#1814F3] font-semibold hover:text-[#120FD4] transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}