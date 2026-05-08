import "./globals.css";
import { headers } from "next/headers";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import ThemeScript from "@/components/ThemeScript";
import { getAuth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
});

export const metadata = {
  title: "SkillSphere - Learn skills that shape your future",
  description:
    "Explore world-class courses, connect with mentors, and join a global community of lifelong learners.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

async function getInitialSession() {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: await headers(),
      query: { disableRefresh: true },
    });

    return session ? JSON.parse(JSON.stringify(session)) : null;
  } catch (_) {
    return null;
  }
}

export default async function RootLayout({ children }) {
  const initialSession = await getInitialSession();

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
        <Navbar initialSession={initialSession} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
