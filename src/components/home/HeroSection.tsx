import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Content */}
      <div className="container-custom relative">
        <div className="flex flex-col items-center text-center py-20 md:py-32 space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-emphasis-white">
              Simple, Fast,
            </span>{" "}
            <span className="text-emphasis-primary">
              Affordable
            </span>{" "}
            Hosting
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto">
            Host your Minecraft server with us. No fuss, just reliable hosting at a fair price.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/plans">
              <Button size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="https://discord.gg/sear">
              <Button size="lg" variant="discord" className="gap-2">
                <MessageSquareMore className="h-5 w-5" />
                Join Discord
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
            <div className="glass-effect p-6 rounded-lg space-y-2">
              <p className="text-3xl font-bold text-gradient-primary">99%</p>
              <p className="text-sm text-foreground-secondary">Uptime Guaranteed</p>
            </div>
            <div className="glass-effect p-6 rounded-lg space-y-2">
              <p className="text-3xl font-bold text-gradient-primary">24/7</p>
              <p className="text-sm text-foreground-secondary">Support Available</p>
            </div>
            <div className="glass-effect p-6 rounded-lg space-y-2 col-span-2 md:col-span-1">
              <p className="text-3xl font-bold text-gradient-primary">3</p>
              <p className="text-sm text-foreground-secondary">Global Locations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}