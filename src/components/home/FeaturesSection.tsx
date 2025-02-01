import { Server, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Next-Gen Infrastructure",
    description: "Powered by enterprise-grade hardware for lightning-fast performance.",
    icon: Server,
  },
  {
    title: "Get What You Pay For",
    description: "What you buy should be yours. Sear Hosting promises 99.9% uptime and a performance guarantee.",
    icon: Shield,
  },
  {
    title: "Servers Around the Globe",
    description: "Strategically placed in America, Singapore, and India to ensure the best connection for as many users as possible.",
    icon: Globe,
  },
];

export function FeaturesSection() {
  return (
    <section className="section-spacing bg-muted">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="heading-decoration">Why Choose</span> Sear Hosting?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of performance and reliability with our cutting-edge hosting solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg bg-background border border-secondary/20 card-hover"
            >
              <div className="absolute -top-4 left-6">
                <div className="p-2 rounded-lg gradient-bg">
                  <feature.icon className="h-6 w-6 text-background" />
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Our infrastructure is continuously monitored and upgraded to ensure optimal performance
          </p>
        </div>
      </div>
    </section>
  );
}