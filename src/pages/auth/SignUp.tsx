import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";
export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // API call karoge yahan
            console.log("Sign up with:", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            // const response = await signupAPI(formData);
            // localStorage.setItem("token", response.token);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || "Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <img src={logo} alt="BankFlow" className="h-12 mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-[#343C6A] mb-2">BankFlow</h1>
                    <p className="text-[#718EBF] text-sm">Create your account to get started</p>
                </div>

                {/* Sign Up Card */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#DFEAF2]">
                    <h2 className="text-2xl font-bold text-[#343C6A] mb-6">Sign Up</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[10px] text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-4">
                        {/* Full Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#343C6A] mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                                />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#DFEAF2] rounded-[10px] text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                                    required
                                />
                            </div>
                        </div>

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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
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

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#343C6A] mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                                />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#DFEAF2] rounded-[10px] text-sm text-[#343C6A] placeholder-[#BCCCDC] outline-none focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF] hover:text-[#1814F3] transition"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <label className="flex items-start gap-2 cursor-pointer mt-2">
                            <input type="checkbox" className="w-4 h-4 accent-[#1814F3] mt-0.5" required />
                            <span className="text-xs text-[#718EBF]">
                                I agree to the{" "}
                                <a href="#" className="text-[#1814F3] font-semibold hover:underline">
                                    Terms and Conditions
                                </a>
                            </span>
                        </label>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-[#1814F3] hover:bg-[#120FD4] disabled:opacity-50 text-white font-bold py-2.5 rounded-[10px] transition duration-200 shadow-md"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-[#718EBF] mt-6">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[#1814F3] font-semibold hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}