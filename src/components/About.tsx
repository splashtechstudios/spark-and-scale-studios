import { useEffect, useRef } from "react";
import { TrendingUp, Headphones, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 80%" },
        }
      );

      const features = gsap.utils.toArray<HTMLElement>(".about-feature");
      features.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Maximum ROI",
      description: "Transparent pricing. No hidden fees. Long-term value.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated account manager. Always here when you need us.",
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: CheckCircle,
      title: "Guaranteed Delivery",
      description: "We deliver on every promise. Your reliable digital partner.",
      gradient: "from-primary-glow to-accent",
    },
  ];

  return (
    <section ref={aboutRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 about-title">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            24/7 Support & <span className="text-gradient">Guaranteed Delivery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trustworthy digital partner committed to exceptional results. Founded by Jafaru Emmanuel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="about-feature glass-card rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 glow-primary group cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:animate-glow`}
                >
                  <Icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
