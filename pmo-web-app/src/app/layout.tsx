import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PMO Mekong Execution Portal | GOTRACE V2.2",
  description: "Project Management Officer portal for Western Mekong Delta traceability implementation (Sa Đéc → Cà Mau)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-slate-950 text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
