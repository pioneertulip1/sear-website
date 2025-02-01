import type { Metadata } from "next";
import { MainNav } from "@/components/nav/MainNav";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sear Hosting - Next-Generation Minecraft Hosting",
  description: "Experience next-generation Minecraft hosting with undeniable savings and reliability.",
  keywords: "minecraft hosting, game servers, reliable hosting, affordable minecraft server",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
