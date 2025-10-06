import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ projects: 0, guaranteed: 0, support: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            // Animate numbers
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;

            let step = 0;
            const timer = setInterval(() => {
              step++;
              const progress = step / steps;
              setCounts({
                projects: Math.floor(50 * progress),
                guaranteed: Math.floor(100 * progress),
                support: 24,
              });

              if (step >= steps) {
                clearInterval(timer);
                setCounts({ projects: 50, guaranteed: 100, support: 24 });
              }
            }, interval);

            return () => clearInterval(timer);
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: `${counts.projects}+`,
      label: "Projects Delivered",
      description: "Hyper-Efficient Delivery",
      subtext: "Fast turnaround without compromise. Guaranteed delivery timeline on every project.",
    },
    {
      value: `${counts.guaranteed}%`,
      label: "Guaranteed",
      description: "Guaranteed Delivery",
      subtext: "We deliver on every promise. Your reliable digital partner.",
    },
    {
      value: `${counts.support}/7`,
      label: "Support",
      description: "24/7 Support",
      subtext: "Dedicated account manager. Always here when you need us.",
    },
  ];

  return (
    <section ref={statsRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300 glow-primary"
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-4">{stat.label}</div>
                <div className="text-lg font-medium text-primary mb-2">
                  {stat.description}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
