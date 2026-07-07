import { services } from "@/lib/data";
import { ServiceIcon } from "./Icons";

export default function Services() {
  return (
    <section id="services" className="bg-white/50 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">What I Do</p>
          <h2 className="section-title mt-1">Services</h2>
          <p className="mt-4 text-navy/70">
            I help teams and clients ship polished, performant web products.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-cream p-6 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
