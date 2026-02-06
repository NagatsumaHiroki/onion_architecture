import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todoアプリ - オニオンアーキテクチャー",
  description: "オニオンアーキテクチャーで構築されたTodoアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
