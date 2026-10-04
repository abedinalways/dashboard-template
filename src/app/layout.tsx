import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/src/redux/ReduxProvider";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { SidebarProvider } from "@/src/context/SidebarContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Modern Dashboard Template",
  description: "Enterprise modular dashboard template for Next.js, Redux, RTK Query, and Tailwind v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: "12px",
                    background: "#1e293b",
                    color: "#fff",
                    fontSize: "13px",
                  },
                }}
              />
            </SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
