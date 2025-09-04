import "@/app/globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import NavHeader from "@/app/components/layout/NavHeader";
import { Albert_Sans, Montserrat_Alternates } from "next/font/google";
import { ThemeProvider } from "@/app/components/shared/ThemeProvider";
import { ChildrenProps } from "@/types/shared/ChildrenProps";

const albertSans = Albert_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});
const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat-alternates",
  display: "swap",
});

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className={`${albertSans.className} ${montserratAlternates.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NavHeader />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
