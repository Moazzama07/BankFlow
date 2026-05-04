import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// Pages — Lazy loading
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Transaction = React.lazy(() => import("../pages/Transaction"));
const Account = React.lazy(() => import("../pages/Account"));
const Loan = React.lazy(() => import("../pages/Loan"));
const Service = React.lazy(() => import("../pages/Service"));
const Profile = React.lazy(() => import("../pages/Settings/Profile"));
const Investment = React.lazy(() => import("../pages/Investment"));
const Credit = React.lazy(() => import("../pages/Credit"));

// Auth Pages — Lazy loading
const Login = React.lazy(() => import("../pages/auth/Login"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <React.Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-screen text-gray-400">
                        Loading...
                    </div>
                }
            >
                <Routes>
                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Main routes */}
                    <Route path="/dashboard" element={<DashboardLayout pageTitle="Dashboard"><Dashboard /></DashboardLayout>} />
                    <Route path="/transactions" element={<DashboardLayout pageTitle="Transactions"><Transaction /></DashboardLayout>} />
                    <Route path="/accounts" element={<DashboardLayout pageTitle="Accounts"><Account /></DashboardLayout>} />
                    <Route path="/loans" element={<DashboardLayout pageTitle="Loans"><Loan /></DashboardLayout>} />
                    <Route path="/services" element={<DashboardLayout pageTitle="Services"><Service /></DashboardLayout>} />
                    <Route path="/investments" element={<DashboardLayout pageTitle="Investments"><Investment /></DashboardLayout>} />

                    {/* Yahan path ko /credit-cards kar dein taake sidebar link se match kare */}
                    <Route path="/credit-cards" element={<DashboardLayout pageTitle="Credit Cards"><Credit /></DashboardLayout>} />

                    {/* Settings Nested Logic */}
                    <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
                    <Route
                        path="/settings/profile"
                        element={
                            <DashboardLayout pageTitle="Setting">
                                <Profile />
                            </DashboardLayout>
                        }
                    />

                    {/* 404 Page */}
                    <Route
                        path="*"
                        element={
                            <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
                                <div className="text-center">
                                    <h1 className="text-6xl font-bold text-[#2D60FF]">404</h1>
                                    <p className="text-[#343C6A] text-xl mt-2">Oops! Page Not Found</p>
                                    <a href="/dashboard" className="mt-4 inline-block text-[#2D60FF] underline">
                                        Back to Dashboard
                                    </a>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;