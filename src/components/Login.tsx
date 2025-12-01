import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Volume2,
  Contrast,
  Shield,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";
import { useSoundEffects } from "./useSoundEffects";
import { announceToScreenReader } from "./utils/announceToScreenReader";
import { motion } from "motion/react";

interface LoginProps {
  onLogin: (role: "employee" | "manager") => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export default function Login({
  onLogin,
  highContrast,
  onToggleHighContrast,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "employee" | "manager" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const { playSound } = useSoundEffects(soundEffects);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    const lastRole = localStorage.getItem("lastRole") as
      | "employee"
      | "manager"
      | null;
    if (lastRole) {
      setSelectedRole(lastRole);
    }

    if (typeof window !== "undefined") {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  const speakText = (text: string) => {
    if (!voiceAssistant || !synthesisRef.current) return;

    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    synthesisRef.current.speak(utterance);
    announceToScreenReader(text, "polite");
  };

  const handleRoleSelect = (role: "employee" | "manager") => {
    setSelectedRole(role);
    playSound("click");
    const message =
      role === "employee"
        ? "Employee role selected. Access your tasks, messages and schedule."
        : "Manager role selected. Manage your team and planning.";
    speakText(message);
    toast.success(message, { duration: 2000 });
  };

  const toggleVoiceAssistant = () => {
    const newState = !voiceAssistant;
    setVoiceAssistant(newState);
    playSound("toggle");

    const message = newState
      ? "🎙️ Voice assistant enabled"
      : "Voice assistant disabled";

    toast.success(message, { duration: 2000 });
    announceToScreenReader(message, "polite");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      playSound("error");
      const message = "Please fill in all fields";
      speakText(message);
      toast.error(message, { duration: 3000 });
      return;
    }

    setIsLoading(true);
    playSound("success");

    const role =
      selectedRole ||
      (email.includes("manager") ? "manager" : "employee");
    localStorage.setItem("lastRole", role);

    const welcomeMessage =
      role === "manager"
        ? "👔 Welcome, Manager! You have full access to team management."
        : "👤 Welcome! Access your tasks, messages, and schedule.";

    setTimeout(() => {
      speakText(welcomeMessage);
      toast.success(welcomeMessage, { duration: 4000 });
      setIsLoading(false);
      onLogin(role);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <Toaster />

      {/* MD3 Background Gradient with Noise Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDE7F6] via-[#E8DEF8] to-[#D1C4E9]">
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Top Accessibility Controls - MD3 Style */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Voice Assistant Toggle */}
          <motion.button
            onClick={toggleVoiceAssistant}
            className={`group flex-1 relative flex items-center gap-3 px-4 py-3.5 rounded-3xl min-h-[64px] transition-all duration-300 ${
              voiceAssistant
                ? "bg-[#EADDFF] border-2 border-primary/60 shadow-lg"
                : "bg-white/90 backdrop-blur-xl border-2 border-[#79747E]/20 hover:border-primary/30 hover:shadow-md"
            } ${highContrast ? "border-[3px]" : ""}`}
            aria-label="Enable or disable voice assistant"
            aria-pressed={voiceAssistant}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                voiceAssistant
                  ? "bg-primary/20"
                  : "bg-[#E7E0EC]"
              }`}
            >
              <Volume2
                className={`w-5 h-5 ${
                  voiceAssistant
                    ? "text-primary"
                    : "text-[#49454F]"
                }`}
              />
            </div>

            <div className="flex-1 text-left">
              <p
                className={`text-sm font-semibold ${
                  voiceAssistant
                    ? "text-primary"
                    : "text-[#1D1B20]"
                }`}
                style={{
                  fontFamily: "Roboto Flex, sans-serif",
                }}
              >
                Voice Assistant
              </p>
              <p
                className="text-xs text-[#49454F]"
                style={{ lineHeight: "1.4" }}
              >
                {voiceAssistant ? "Active" : "Click to enable"}
              </p>
            </div>

            {voiceAssistant && (
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* High Contrast Toggle */}
          <motion.button
            onClick={() => {
              onToggleHighContrast();
              playSound("toggle");
              toast.success(
                highContrast
                  ? "Standard mode"
                  : "🔆 Contrast enabled",
                { duration: 2000 },
              );
            }}
            className={`relative flex items-center justify-center w-16 h-16 rounded-3xl transition-all duration-300 ${
              highContrast
                ? "bg-[#EADDFF] border-2 border-primary/60 shadow-lg"
                : "bg-white/90 backdrop-blur-xl border-2 border-[#79747E]/20 hover:border-primary/30 hover:shadow-md"
            } ${highContrast ? "border-[3px]" : ""}`}
            aria-label="Toggle high contrast mode"
            aria-pressed={highContrast}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                highContrast ? "bg-primary/20" : "bg-[#E7E0EC]"
              }`}
            >
              <Contrast
                className={`w-5 h-5 ${
                  highContrast
                    ? "text-primary"
                    : "text-[#49454F]"
                }`}
              />
            </div>

            {highContrast && (
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Main Login Card - MD3 Elevated Surface */}
        <motion.div
          className={`relative bg-[#FDFBFF] rounded-[24px] overflow-hidden ${
            highContrast
              ? "border-[3px] border-[#21005D] shadow-2xl"
              : "border-0 shadow-[0_4px_16px_rgba(103,80,164,0.12)]"
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="p-8 sm:p-10 md:p-12">
            {/* Logo & Title */}
            <motion.div
              className="flex flex-col items-center mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Shield Logo with Glow */}
              <div className="relative mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#EADDFF] to-[#D0BCFF]/40 flex items-center justify-center border-4 border-primary/20 shadow-lg">
                  <Shield
                    className="w-12 h-12 text-primary"
                    strokeWidth={2.5}
                  />
                </div>

                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-primary animate-pulse" />
                <Sparkles
                  className="absolute -bottom-1 -left-1 w-4 h-4 text-secondary animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Title */}
              <h1
                className={`text-4xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${
                  highContrast ? "text-[#21005D]" : ""
                }`}
                style={{
                  fontFamily: "Roboto Flex, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                AccessWork
              </h1>
              <p
                className={`text-base text-center ${
                  highContrast
                    ? "text-[#21005D]"
                    : "text-[#49454F]"
                }`}
                style={{
                  fontFamily: "Roboto Flex, sans-serif",
                  lineHeight: 1.4,
                }}
              >
                Accessible employee management, for everyone
              </p>
            </motion.div>

            {/* Role Selection Cards */}
            <motion.div
              className="mb-8 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Employee Card */}
              <motion.button
                onClick={() => handleRoleSelect("employee")}
                disabled={isLoading}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-[16px] min-h-[140px] transition-all duration-300 ${
                  selectedRole === "employee"
                    ? highContrast
                      ? "bg-[#EADDFF] border-[3px] border-[#21005D] shadow-xl"
                      : "bg-gradient-to-br from-[#EADDFF] to-[#D0BCFF]/30 border-[2px] border-primary/60 shadow-[0_4px_12px_rgba(103,80,164,0.3)]"
                    : highContrast
                      ? "bg-[#E7E0EC] border-[2px] border-[#79747E] hover:border-[#21005D]"
                      : "bg-[#E7E0EC]/50 border-[2px] border-[#79747E]/30 hover:border-primary/40 hover:shadow-md"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Select employee role"
                aria-pressed={selectedRole === "employee"}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {/* Glow effect */}
                {selectedRole === "employee" &&
                  !highContrast && (
                    <motion.div
                      className="absolute inset-0 rounded-[16px] bg-primary/10 blur-xl -z-10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all ${
                    selectedRole === "employee"
                      ? "bg-primary/20"
                      : "bg-white/60"
                  }`}
                >
                  <svg
                    className={`w-7 h-7 ${
                      selectedRole === "employee"
                        ? highContrast
                          ? "text-[#21005D]"
                          : "text-primary"
                        : "text-[#49454F]"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <span
                  className={`text-base mb-1.5 ${
                    selectedRole === "employee"
                      ? highContrast
                        ? "text-[#21005D]"
                        : "text-primary"
                      : "text-[#1D1B20]"
                  }`}
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Employee
                </span>

                {/* Description */}
                <span
                  className="text-sm text-center text-[#49454F]"
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  Tasks & schedule
                </span>

                {/* Check indicator */}
                {selectedRole === "employee" && (
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        highContrast
                          ? "bg-[#21005D]"
                          : "bg-primary shadow-lg shadow-primary/50"
                      }`}
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.button>

              {/* Manager Card */}
              <motion.button
                onClick={() => handleRoleSelect("manager")}
                disabled={isLoading}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-[16px] min-h-[140px] transition-all duration-300 ${
                  selectedRole === "manager"
                    ? highContrast
                      ? "bg-[#EADDFF] border-[3px] border-[#21005D] shadow-xl"
                      : "bg-gradient-to-br from-[#EADDFF] to-[#D0BCFF]/30 border-[2px] border-primary/60 shadow-[0_4px_12px_rgba(103,80,164,0.3)]"
                    : highContrast
                      ? "bg-[#E7E0EC] border-[2px] border-[#79747E] hover:border-[#21005D]"
                      : "bg-[#E7E0EC]/50 border-[2px] border-[#79747E]/30 hover:border-primary/40 hover:shadow-md"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Select manager role"
                aria-pressed={selectedRole === "manager"}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {/* Glow effect */}
                {selectedRole === "manager" &&
                  !highContrast && (
                    <motion.div
                      className="absolute inset-0 rounded-[16px] bg-primary/10 blur-xl -z-10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all ${
                    selectedRole === "manager"
                      ? "bg-primary/20"
                      : "bg-white/60"
                  }`}
                >
                  <svg
                    className={`w-7 h-7 ${
                      selectedRole === "manager"
                        ? highContrast
                          ? "text-[#21005D]"
                          : "text-primary"
                        : "text-[#49454F]"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <span
                  className={`text-base mb-1.5 ${
                    selectedRole === "manager"
                      ? highContrast
                        ? "text-[#21005D]"
                        : "text-primary"
                      : "text-[#1D1B20]"
                  }`}
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Manager
                </span>

                {/* Description */}
                <span
                  className="text-sm text-center text-[#49454F]"
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  Team management
                </span>

                {/* Check indicator */}
                {selectedRole === "manager" && (
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        highContrast
                          ? "bg-[#21005D]"
                          : "bg-primary shadow-lg shadow-primary/50"
                      }`}
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            </motion.div>

            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Email Field - MD3 Outlined Style */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className={`text-sm font-semibold ${
                    highContrast
                      ? "text-[#21005D]"
                      : "text-[#49454F]"
                  }`}
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div
                    className={`flex items-center h-14 rounded-[16px] bg-transparent transition-all duration-300 ${
                      emailFocused
                        ? highContrast
                          ? "border-[3px] border-[#21005D] shadow-lg"
                          : "border-[2px] border-primary shadow-[0_0_0_4px_rgba(103,80,164,0.1)]"
                        : highContrast
                          ? "border-[2px] border-[#21005D]"
                          : "border-[2px] border-[#79747E] hover:border-[#49454F]"
                    }`}
                  >
                    {/* Mail Icon - 16px from left */}
                    <div
                      className={`flex items-center justify-center w-12 pl-4 transition-colors ${
                        emailFocused
                          ? highContrast
                            ? "text-[#21005D]"
                            : "text-primary"
                          : "text-[#49454F]"
                      }`}
                    >
                      <Mail className="w-5 h-5" />
                    </div>

                    {/* Input */}
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => {
                        setEmailFocused(true);
                        playSound("click");
                        speakText("Email field");
                      }}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="your.email@company.com"
                      className={`flex-1 h-full bg-transparent outline-none pr-4 ${
                        highContrast
                          ? "text-[#21005D]"
                          : "text-[#1D1B20]"
                      } placeholder:text-[#79747E]`}
                      style={{
                        fontFamily: "Roboto Flex, sans-serif",
                        fontSize: "16px",
                      }}
                      required
                      aria-label="Email address"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Focus glow */}
                  {emailFocused && !highContrast && (
                    <motion.div
                      className="absolute inset-0 rounded-[16px] bg-primary/5 -z-10 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </div>

              {/* Password Field - MD3 Outlined Style */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className={`text-sm font-semibold ${
                    highContrast
                      ? "text-[#21005D]"
                      : "text-[#49454F]"
                  }`}
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Password
                </label>
                <div className="relative">
                  <div
                    className={`flex items-center h-14 rounded-[16px] bg-transparent transition-all duration-300 ${
                      passwordFocused
                        ? highContrast
                          ? "border-[3px] border-[#21005D] shadow-lg"
                          : "border-[2px] border-primary shadow-[0_0_0_4px_rgba(103,80,164,0.1)]"
                        : highContrast
                          ? "border-[2px] border-[#21005D]"
                          : "border-[2px] border-[#79747E] hover:border-[#49454F]"
                    }`}
                  >
                    {/* Lock Icon - 16px from left */}
                    <div
                      className={`flex items-center justify-center w-12 pl-4 transition-colors ${
                        passwordFocused
                          ? highContrast
                            ? "text-[#21005D]"
                            : "text-primary"
                          : "text-[#49454F]"
                      }`}
                    >
                      <Lock className="w-5 h-5" />
                    </div>

                    {/* Input */}
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      onFocus={() => {
                        setPasswordFocused(true);
                        playSound("click");
                        speakText("Password field");
                      }}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="Enter your password"
                      className={`flex-1 h-full bg-transparent outline-none ${
                        highContrast
                          ? "text-[#21005D]"
                          : "text-[#1D1B20]"
                      } placeholder:text-[#79747E]`}
                      style={{
                        fontFamily: "Roboto Flex, sans-serif",
                        fontSize: "16px",
                      }}
                      required
                      aria-label="Password"
                      disabled={isLoading}
                    />

                    {/* Eye Icon - 16px from right */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        playSound("click");
                      }}
                      disabled={isLoading}
                      className={`flex items-center justify-center w-12 pr-4 transition-colors ${
                        passwordFocused || showPassword
                          ? highContrast
                            ? "text-[#21005D]"
                            : "text-primary"
                          : "text-[#49454F]"
                      } hover:opacity-80 disabled:opacity-50`}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Focus glow */}
                  {passwordFocused && !highContrast && (
                    <motion.div
                      className="absolute inset-0 rounded-[16px] bg-primary/5 -z-10 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </div>

              {/* Sign In Button - MD3 Filled Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`relative w-full h-14 rounded-full overflow-hidden transition-all duration-300 ${
                  highContrast
                    ? "bg-[#21005D] border-[2px] border-[#21005D] shadow-xl"
                    : "bg-gradient-to-r from-primary to-[#7D5FA8] shadow-[0_4px_12px_rgba(103,80,164,0.3)] hover:shadow-[0_6px_16px_rgba(103,80,164,0.4)]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {/* Ripple effect container */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileTap={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />

                <span
                  className="relative text-white text-base"
                  style={{
                    fontFamily: "Roboto Flex, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      Signing in...
                    </motion.span>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Footer - Accessibility Credits */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className={`text-sm ${highContrast ? "text-[#21005D]" : "text-[#6E6E6E]"}`}
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Designed with ♿ accessibility in mind • Material
            Design 3 • WCAG AAA
          </p>
        </motion.div>
      </div>
    </div>
  );
}