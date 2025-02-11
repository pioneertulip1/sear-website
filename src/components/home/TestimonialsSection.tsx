import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Fast hosting, friendly staff, and a great overall experience. Would recommend for all projects.",
    author: "Anshul Master",
  },
  {
    quote: "Their services are great, and they have a very cooperative staff that helps with everything needed.",
    author: "Divyansh Ishwar",
  },
  {
    quote: "We've had our SMP for almost a month now, and the performance has been awesome with barely any lag. The staff are also very nice and approachable, always ready to help. Overall, it's been a great experience, and I highly recommend it.",
    author: "Aurii",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="heading-decoration">Real Communities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who host their servers with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg bg-muted border border-secondary/20 card-hover"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-6">
                <div className="p-2 rounded-lg gradient-bg">
                  <Quote className="h-4 w-4 text-background" />
                </div>
              </div>

              {/* Quote Content */}
              <div className="pt-4">
                <p className="text-foreground/90 mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-background font-semibold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Many happy players already host their Minecraft servers with us
          </p>
        </div>
      </div>
    </section>
  );
}