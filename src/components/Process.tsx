import { useEffect, useRef } from "react";
import { Video, Ear, Hammer, Search, Rocket, RefreshCw, Headphones } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        }
      );

      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: step, start: "top 90%" },
          }
        );
      });

      // Animate the connecting line
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { trigger: processRef.current, start: "top 60%" },
        }
      );
    }, processRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { icon: Video, title: "Meet", subtitle: "Calls", description: "Virtual calls to discuss your vision", color: "from-primary to-primary-glow" },
    { icon: Ear, title: "Listen", subtitle: "Understand", description: "Conversation and documents to grasp your project concepts", color: "from-accent to-accent-glow" },
    { icon: Hammer, title: "Build", subtitle: "Implement", description: "Transform concepts into working solutions", color: "from-primary-glow to-accent" },
    { icon: Search, title: "Review", subtitle: "Quality Check", description: "Internal review and quality assurance", color: "from-accent-glow to-primary" },
    { icon: Rocket, title: "Deploy", subtitle: "Launch", description: "Push your project live", color: "from-primary to-accent" },
    { icon: RefreshCw, title: "Update", subtitle: "Iterate", description: "Continuous improvements and updates", color: "from-accent to-primary-glow" },
    { icon: Headphones, title: "Support", subtitle: "Life Support", description: "Lifetime support and partnership", color: "from-primary-glow to-accent-glow" },
  ];

  return (
    <section ref={processRef} className="py-20 relative overflow-hidden">
      {/* Background rotating circle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 800 800" className="animate-spin-slow">
          <circle
            cx="400"
            cy="400"
            r="350"
            fill="none"
            stroke="url(#processGradient)"
            strokeWidth="1"
            strokeDasharray="10 5"
          />
          <defs>
            <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(263 70% 50%)" />
              <stop offset="100%" stopColor="hsl(189 95% 51%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 process-title">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Proven methodology on infinite loop
          </p>
          <p className="text-sm text-accent animate-pulse">
            Continuous improvement • Always evolving
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting line - hidden on mobile */}
          <div className="process-line hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-primary-glow origin-left" style={{ transform: "translateY(-50%)" }} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="process-step flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Step number */}
                  <span className="text-xs font-bold text-accent mb-2 tracking-widest">
                    0{index + 1}
                  </span>

                  {/* Icon circle */}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10`}
                    style={{ boxShadow: "0 0 20px hsl(263 70% 50% / 0.2)" }}
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Text */}
                  <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-xs font-medium text-accent mb-1">{step.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-snug hidden sm:block">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
