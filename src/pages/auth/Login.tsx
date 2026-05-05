import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // API call karoge yahan
            console.log("Login with:", { email, password });
            // const response = await loginAPI(email, password);
            // localStorage.setItem("token", response.token);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Login Card */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#DFEAF2]">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <img src={logo} alt="BankFlow" className="h-12 mx-auto mb-2" />
                        <h1 className="text-3xl font-bold text-[#343C6A] mb-2">BankFlow</h1>
                    </div>
                    {/* <h2 className="text-2xl font-bold text-[#343C6A] mb-6">Login</h2> */}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[10px] text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
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

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#343C6A] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#DFEAF2] rounded-[10px] text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF] hover:text-[#1814F3] transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-[#1814F3]" />
                                <span className="text-[#718EBF] font-medium">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => navigate("/forgot-password")}
                                className="text-[#1814F3] font-medium hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-[#1814F3] hover:bg-[#120FD4] disabled:opacity-50 text-white font-bold py-2.5 rounded-[10px] transition duration-200 shadow-md"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Sign Up  */}
                    <p className="text-center text-sm text-[#718EBF] mt-6">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-[#1814F3] font-semibold hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}