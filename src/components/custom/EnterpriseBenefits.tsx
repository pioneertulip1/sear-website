import { Card } from "@/components/ui/card";
import { Code2, Wrench, BarChart3, Users, Puzzle, Workflow, GitBranch, HeartHandshake, Code, Bot, RocketIcon, MessageSquareCode } from "lucide-react";

const benefits = [
  {
    title: "Custom Development",
    icon: Code2,
    benefits: [
      {
        title: "Tailored Solutions",
        description: "Custom software built specifically for your business needs",
        icon: Wrench
      },
      {
        title: "Full-Stack Expertise",
        description: "End-to-end development from frontend to backend",
        icon: Code
      },
      {
        title: "AI Integration",
        description: "Smart automation and AI-powered features",
        icon: Bot
      }
    ]
  },
  {
    title: "Enterprise Solutions",
    icon: Puzzle,
    benefits: [
      {
        title: "System Integration",
        description: "Seamless connection with your existing infrastructure",
        icon: Workflow
      },
      {
        title: "Scalable Architecture",
        description: "Future-proof solutions that grow with your business",
        icon: GitBranch
      },
      {
        title: "Performance Optimization",
        description: "High-performance systems built for enterprise scale",
        icon: BarChart3
      }
    ]
  },
  {
    title: "Development Services",
    icon: MessageSquareCode,
    benefits: [
      {
        title: "Dedicated Team",
        description: "Expert developers committed to your project",
        icon: Users
      },
      {
        title: "Agile Development",
        description: "Rapid delivery with iterative improvements",
        icon: RocketIcon
      },
      {
        title: "Ongoing Support",
        description: "Long-term partnership and maintenance",
        icon: HeartHandshake
      }
    ]
  }
];

export function EnterpriseBenefits() {
  return (
    <section className="section-spacing bg-muted/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="heading-decoration">Sear Development</span> Solutions
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our development agency specializes in building custom enterprise solutions 
            that transform your business vision into reality. From concept to deployment, 
            we&apos;re your technical partner.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((category, index) => (
            <Card 
              key={index}
              className="bg-background/50 backdrop-blur border-secondary/20"
            >
              <div className="p-6 space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg gradient-bg">
                    <category.icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                </div>

                {/* Benefits List */}
                <div className="grid gap-6">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Partner with Sear Development for enterprise-grade custom solutions backed by our expertise
          </p>
        </div>
      </div>
    </section>
  );
}