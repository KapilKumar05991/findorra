"use client";
import { motion, AnimatePresence } from "motion/react";
import { Eye, HelpCircle, MessageCircle, Store, Speaker, Wrench, Users, MoreHorizontal, Phone, Mail, MapPin, Check, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";


const supportOptions = [
    {
        title: "Help Center",
        desc: "Browse our documentation and tutorials.",
        icon: <HelpCircle className="w-6 h-6" />,
        link: "#",
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Community Forum",
        desc: "Join thousands of local business owners.",
        icon: <MessageCircle className="w-6 h-6" />,
        link: "#",
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Developer Portal",
        desc: "Integrate findorra AI into your apps.",
        icon: <Eye className="w-6 h-6" />,
        link: "#",
        color: "bg-green-500/10 text-green-500",
    },
];

const contactReasons = [
    {
        id: "general",
        label: "General Inquiry",
        icon: <MessageCircle className="w-5 h-5" />,
    },
    {
        id: "business",
        label: "Business Listing",
        icon: <Store className="w-5 h-5" />,
    },
    {
        id: "ads",
        label: "Advertisement",
        icon: <Speaker className="w-5 h-5" />,
    },
    {
        id: "tech",
        label: "Technical Support",
        icon: <Wrench className="w-5 h-5" />,
    },
    {
        id: "partnership",
        label: "Partnership",
        icon: <Users className="w-5 h-5" />,
    },
    { id: "other", label: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
];

export default function Contact() {
    const [selectedReason, setSelectedReason] = useState("general");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-white relative overflow-hidden">
            {/* Premium Hero Section */}
            <section className="bg-white pt-20 md:pt-32 pb-24 md:pb-36 relative overflow-hidden">
                {/* Dynamic AI-inspired Background Orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-[#31C0FF]/20 rounded-full blur-[100px]"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-black/20"
                        >
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            findorra Support Center
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight text-balance">
                            How can we <br />
                            <span className="text-primary italic font-serif">
                                empower
                            </span>{" "}
                            you?
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Connect with India's most advanced AI search ecosystem. We're here
                            to help you navigate, grow, and succeed in the local market.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                                    >
                                        <img
                                            src={`https://i.pravatar.cc/150?u=${i + 10}`}
                                            alt="Support"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-500 font-medium font-bold">
                                Our support team is{" "}
                                <span className="text-green-500">Online</span> and ready to
                                help.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-12 -mt-20 md:-mt-28 relative z-20 mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-white/20"
                >
                    {/* Left Panel - Dark / Rich Info */}
                    <div className="md:w-[40%] bg-black p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <linearGradient
                                        id="grad1"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#31C0FF" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#8964E8" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad1)" />
                            </svg>
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30"
                                >
                                    Contact Us
                                </motion.span>
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                    Let's start a <br />
                                    <span className="text-primary italic">conversation</span>
                                </h1>
                                <p className="mt-6 text-gray-400 text-lg max-w-xs leading-relaxed">
                                    We're here to help you grow your local presence with
                                    AI-powered search.
                                </p>
                            </div>

                            <div className="space-y-6 pt-10">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all border border-white/10 group-hover:border-primary/50">
                                        <Phone className="w-6 h-6 text-white group-hover:text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                                            Call anytime
                                        </p>
                                        <p className="text-lg font-semibold">+91 7599339121</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#B89CFF]/20 transition-all border border-white/10 group-hover:border-[#B89CFF]/50">
                                        <Mail className="w-6 h-6 text-white group-hover:text-[#B89CFF]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                                            Email us
                                        </p>
                                        <p className="text-lg font-semibold">
                                            support@findorra.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#5DE3AD]/20 transition-all border border-white/10 group-hover:border-[#5DE3AD]/50">
                                        <MapPin className="w-6 h-6 text-white group-hover:text-[#5DE3AD]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                                            Visit office
                                        </p>
                                        <p className="text-lg font-semibold">
                                            Sector 63, Noida, UP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-10 border-t border-white/10">
                            <p className="text-sm text-gray-500 italic">
                                "Empowering millions of local business owners through
                                intelligent search technology."
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="md:w-[60%] p-8 md:p-12 bg-white flex flex-col relative">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                damping: 12,
                                                stiffness: 200,
                                            }}
                                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                                        >
                                            <Check className="w-12 h-12" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute top-0 left-0 w-24 h-24 bg-green-500 rounded-full blur-md opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                            Message Received!
                                        </h2>
                                        <p className="text-gray-500 text-lg max-w-sm mx-auto">
                                            Thanks for reaching out! We'll examine your query and get
                                            back to you within 24 hours.
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="link"
                                        className="text-primary font-bold text-lg hover:underline transition-all"
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            What's on your mind?
                                        </h2>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {contactReasons.map((reason) => (
                                                <button
                                                    key={reason.id}
                                                    type="button"
                                                    onClick={() => setSelectedReason(reason.id)}
                                                    className={cn(
                                                        "group p-4 rounded-2xl flex flex-col items-start gap-3 transition-all border relative overflow-hidden",
                                                        selectedReason === reason.id
                                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 -translate-y-1"
                                                            : "bg-gray-50 text-gray-500 border-gray-100 hover:border-primary/50 hover:bg-white hover:shadow-md",
                                                    )}
                                                    suppressHydrationWarning
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                                            selectedReason === reason.id
                                                                ? "bg-white/20"
                                                                : "bg-white border border-gray-100 group-hover:border-primary/20",
                                                        )}
                                                    >
                                                        {reason.icon}
                                                    </div>
                                                    <span className="font-bold text-xs uppercase tracking-wider">
                                                        {reason.label}
                                                    </span>
                                                    {selectedReason === reason.id && (
                                                        <motion.div
                                                            layoutId="active-reason"
                                                            className="absolute bottom-0 right-0 p-1 pr-2"
                                                        >
                                                            <Check className="w-4 h-4 text-white opacity-50" />
                                                        </motion.div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="first_name"
                                                    className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1"
                                                >
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="first_name"
                                                    placeholder="Ex. John"
                                                    required
                                                    className="h-14 px-5 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-300 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="last_name"
                                                    className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1"
                                                >
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="last_name"
                                                    placeholder="Ex. Doe"
                                                    required
                                                    className="h-14 px-5 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-300 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1"
                                            >
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                className="h-14 px-5 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-300 font-medium"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="message"
                                                className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1"
                                            >
                                                Message
                                            </Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your project or inquiry..."
                                                required
                                                className="min-h-[140px] p-5 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-300 font-medium resize-none"
                                            />
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                disabled={isSubmitting}
                                                className="w-full h-16 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 transition-all shadow-[0_16px_32px_-8px_rgba(255,107,53,0.3)] shadow-primary/40 text-white flex items-center justify-center gap-3 overflow-hidden relative group"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Processing...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">
                                                            Send Your Message
                                                        </span>
                                                        <Send className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
