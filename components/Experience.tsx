import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">My Journey</p>
          <h2 className="section-title mt-1">Experience</h2>
        </div>

        <ol className="relative mx-auto mt-14 max-w-3xl border-l-2 border-teal/20 pl-8">
          {experiences.map((exp) => (
            <li key={`${exp.company}-${exp.period}`} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-cream ring-2 ring-teal">
                <span className="h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="inline-block rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber-dark">
                {exp.period}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-navy">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-teal">{exp.company}</p>
              <ul className="mt-3 space-y-1.5">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-navy/70"
                  >
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-amber" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
