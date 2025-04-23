"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./(providers)/auth-context";
import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader =
    pathname === "/home" || pathname === "/login" || pathname === "/register";

  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
