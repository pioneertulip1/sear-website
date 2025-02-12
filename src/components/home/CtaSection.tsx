import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 featured-gradient opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-emphasis-white">Want to start your own</span>
            <span className="block text-emphasis-primary">Minecraft server?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            We&apos;ll help you get your server up and running in minutes.
            Fair prices, friendly support, and no hidden fees.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/plans">
              <Button size="lg" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="hover:bg-surface/20">
                View Pricing Plans
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="glass-effect p-4 rounded-lg">
              <p className="font-semibold text-gradient-primary">Instant Setup</p>
              <p className="text-sm text-foreground-secondary">Server ready in minutes</p>
            </div>
            <div className="glass-effect p-4 rounded-lg">
              <p className="font-semibold text-gradient-primary">24/7 Support</p>
              <p className="text-sm text-foreground-secondary">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}