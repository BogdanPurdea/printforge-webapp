import "./globals.css";
import NavHeader from "./components/NavHeader";
import { Albert_Sans, Montserrat_Alternates } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${albertSans.className} ${montserratAlternates.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
