import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Ready to experience
            <span className="block text-primary">next-level Minecraft hosting?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of players who trust Sear Hosting for their Minecraft servers. 
            Get started today with our high-performance hosting solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="gradient-bg gap-2">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Pricing Plans
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-semibold text-foreground">Instant Setup</p>
              <p className="text-sm text-muted-foreground">Server ready in minutes</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">24/7 Support</p>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-foreground">Money-Back Guarantee</p>
              <p className="text-sm text-muted-foreground">30-day guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
    </section>
  );
}