"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function SiteHeader({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin ? (
        <PageTransition>
          <div className="flex-1">{children}</div>
        </PageTransition>
      ) : (
        <div className="flex-1">{children}</div>
      )}
      {!isAdmin && <Footer />}
    </>
  );
}
