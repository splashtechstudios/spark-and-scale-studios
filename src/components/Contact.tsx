import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Instagram, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 80%" },
        }
      );

      const items = gsap.utils.toArray<HTMLElement>(".contact-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%" },
          }
        );
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "splashtechstudios@gmail.com",
      href: "mailto:splashtechstudios@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+234 913 383 8340",
      href: "https://wa.me/2349133838340",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@splashtechstudios",
      href: "https://instagram.com/splashtechstudios",
    },
  ];

  return (
    <section id="contact" ref={contactRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="contact-content glass-card rounded-3xl p-12 text-center glow-primary">
            <h2 className="text-5xl font-bold mb-4 text-foreground">
              Let's Build <span className="text-gradient">Together</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Guaranteed delivery. 24/7 support. Maximum ROI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                    <div className="font-medium text-sm text-foreground">{item.value}</div>
                  </a>
                );
              })}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent border-0 text-lg px-12 py-6 text-primary-foreground glow-primary hover:opacity-90 transition-opacity group"
              asChild
            >
              <a href="mailto:splashtechstudios@gmail.com" className="flex items-center gap-2">
                Start Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
