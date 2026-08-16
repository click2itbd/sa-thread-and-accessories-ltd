import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
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
      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 w-full py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.copyright}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://www.facebook.com/CLICK2ITBD"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Click2IT Facebook page"
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            >
              <span className="text-[13px]">Developed By Click2IT</span>
            </a>
            <span className="text-primary">|</span>
            <div className="flex space-x-5">
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
      </div>
    </footer>
  );
}
