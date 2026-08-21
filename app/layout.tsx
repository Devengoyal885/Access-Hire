import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Access-Hire | Adaptive Capability Twin — SAP Hackfest 2026",
  description: "See Capability. Prove Potential. Enable Transition. Living, evidence-backed capability twins replacing proxy resume keywords.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F4F7FA] text-[#16232E] selection:bg-[#F2A93B]/30 selection:text-[#0B2E4F]">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
