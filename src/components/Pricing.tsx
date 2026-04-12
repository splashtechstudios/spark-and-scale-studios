import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    price: "$200",
    subtitle: "Small Business Website",
    features: [
      "1–3 Pages",
      "Clean, Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
    ],
    cta: "Great for startups & local businesses",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$500",
    subtitle: "Company Website",
    features: [
      "1–3 Pages",
      "Professional Layout + Branding",
      "SEO + Performance Optimization",
      "Contact + Lead Capture",
    ],
    cta: "Perfect for growing companies",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "From $3000",
    subtitle: "Custom CRM System",
    features: [
      "Internal Operations Solution",
      "Fully Tailored Features",
      "Scalable Architecture",
      "Automation & Workflow Tools",
    ],
    cta: "Best for advanced business systems",
    highlighted: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      gsap.set(cards, { y: 60, autoAlpha: 0 });
      gsap.to(cards, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Pricing <span className="text-gradient">Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing for every stage of your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card glass-card rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:scale-105 ${
                plan.highlighted
                  ? "border-primary/50 glow-primary"
                  : "border-border/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.subtitle}</p>
              <div className="text-4xl font-bold text-foreground mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic text-center border-t border-border/30 pt-4">
                {plan.cta}
              </p>
            </div>
          ))}
        </div>

        {/* Add-On */}
        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">➕ Add-On Services</h3>
          <p className="text-muted-foreground">
            <span className="text-foreground font-semibold">Product Sales Page (1–3 Products)</span> — <span className="text-accent font-bold">$300</span>
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            High-converting design focused on selling your products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
