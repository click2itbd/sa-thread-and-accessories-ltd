import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MessageCircle, MapPin, Phone, Mail, Clock, ChevronRight,} from "lucide-react";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/data/siteContent";

const footerLinks = FOOTER_LINKS;

const socialIconComponents = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: MessageCircle,
};

const socialLinks = SOCIAL_LINKS.map((s) => ({
  ...s,
  Icon: socialIconComponents[s.icon],
}));

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-6 w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Link href="/" className="flex items-center gap-3">
                {/* Logo Image */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src="/logo.jpg"
                    alt="SA Thread & Accessories Ltd. Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Company Text */}
                <div className="flex flex-col leading-none">
                  <span className="text-[18px] font-extrabold text-gray-900 tracking-tight leading-tight">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="text-[9px] font-semibold text-gray-500 tracking-widest uppercase">
                    {SITE_CONFIG.nameSuffix}
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <s.Icon className="w-4 h-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gray-900 font-semibold text-[15px] mb-5 relative">
                {title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full block mt-1"></span>
              </h4>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-gray-500 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight
                        className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary shrink-0"
                        strokeWidth={2.5}
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="text-gray-900 font-semibold text-[15px] mb-5 relative">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full block mt-1"></span>
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed whitespace-pre-line">
                  {SITE_CONFIG.address}
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-[13px] text-gray-500 hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[13px] text-gray-500 hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <p className="text-[13px] text-gray-500">{SITE_CONFIG.hours}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 w-full py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.copyright}
          </p>
          <div className="flex gap-5">
            {SITE_CONFIG.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[13px] text-gray-500 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}