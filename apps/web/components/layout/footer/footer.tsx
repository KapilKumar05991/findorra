
import { ChevronLeft, ChevronRight, Facebook, Image, Instagram, Linkedin, Mail, MapPin, MessageCircleMoreIcon, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="bg-muted py-8">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <Link href={"/"} className="inline-block mb-4 text-2xl font-bold">
                            FINDORRA
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            India's No #1 AI-based local search engine connecting millions of
                            users with verified businesses across the country.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                {
                                    icon: <Facebook className="w-5 h-5" />,
                                    color: "from-[#31C0FF] to-[#0669B1]",
                                    url: "https://facebook.com/findorra",
                                },
                                {
                                    icon: <Twitter className="w-5 h-5" />,
                                    color: "from-[#31C0FF] to-[#0669B1]",
                                    url: "https://x.com/findorra",
                                },
                                {
                                    icon: <Instagram className="w-5 h-5" />,
                                    color: "from-[#B89CFF] to-[#8964E8]",
                                    url: "https://instagram.com/findorra",
                                },
                                {
                                    icon: <Linkedin className="w-5 h-5" />,
                                    color: "from-[#31C0FF] to-[#0669B1]",
                                    url: "https://linkedin.com/company/findorra",
                                },
                                {
                                    icon: <Youtube className="w-5 h-5" />,
                                    color: "from-[#FF0000] to-[#CC0000]",
                                    url: "https://youtube.com/@findorra",
                                },
                                {
                                    icon: <MessageCircleMoreIcon className="w-5 h-5" />,
                                    color: "from-[#25D366] to-[#128C7E]",
                                    url: "https://wa.me/findorra",
                                },
                                {
                                    icon: <Image className="w-5 h-5" />,
                                    color: "from-[#E60023] to-[#AD001D]",
                                    url: "https://pinterest.com/findorra",
                                },
                                {
                                    icon: <Instagram className="w-5 h-5" />,
                                    color:
                                        "from-[#FFFFFF] to-[#DDDDDD] hover:text-black font-bold",
                                    url: "https://threads.net/@findorra",
                                },
                            ].map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-primary/20`}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/investors"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Investor Relations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Business */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">For Business</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/free-listing"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Add Your Business
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/advertise"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Advertise with Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Business Solutions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/success-stories"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Success Stories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#5DE3AD] to-[#17B877] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-gray-400 leading-relaxed">
                                    Sector 63, Noida, Uttar Pradesh 201301, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#31C0FF] to-[#0669B1] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <a
                                    href="tel:+917599339121"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    +91 8859787315
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#B89CFF] to-[#8964E8] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a
                                    href="mailto:support@findorra.com"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    support@findorra.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Findorra. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}