import { useEffect, useRef } from "react";
import { Smartphone, Code, Package, BarChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Smartphone,
      title: "Mobile & Web Design",
      description: "Stunning, responsive designs that convert. Fast delivery, maximum ROI.",
      features: ["UI/UX Design", "Responsive Development", "Brand Identity"],
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Code,
      title: "SaaS & Custom CRM",
      description: "Scalable software built efficiently. No hidden fees.",
      features: ["Custom Development", "API Integration", "Cloud Deployment"],
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: Package,
      title: "Product Development",
      description: "End-to-end development. Delivered on every promise.",
      features: ["MVP Development", "Product Strategy", "Technical Architecture"],
      gradient: "from-primary-glow to-accent",
    },
    {
      icon: BarChart,
      title: "Project Management",
      description: "Agile delivery with guaranteed outcomes.",
      features: ["Streamlined Workflow", "Guaranteed Milestones", "Proactive Communication"],
      gradient: "from-accent-glow to-primary",
    },
  ];

  return (
    <section id="services" ref={servicesRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions for your digital success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 glow-primary group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
