import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import ThemeScript from "@/components/ThemeScript";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
});

export const metadata = {
  title: "SkillSphere — Learn skills that shape your future",
  description:
    "Explore world-class courses, connect with mentors, and join a global community of lifelong learners.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="skillsphere"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeScript />
        <ToasterProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
