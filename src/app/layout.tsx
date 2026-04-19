import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Máy tính BMI - Theo dõi sức khỏe chuyên nghiệp",
  description: "Công cụ tính chỉ số khối cơ thể (BMI) trực tuyến giúp bạn theo dõi tình trạng sức khỏe và cân nặng lý tưởng.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
