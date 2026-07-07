import { formatExperienceDuration, profile } from "@/lib/data";

export default function About() {
  const experience = formatExperienceDuration();

  const highlights = [
    {
      label: "Experience",
      value: experience,
      accent: "text-amber",
    },
    {
      label: "Current Role",
      value: "Sr. Software Engineer",
      sub: "Ericsson India",
      accent: "text-teal",
    },
    {
      label: "Location",
      value: profile.location,
      accent: "text-navy",
    },
    {
      label: "Specialization",
      value: "Frontend Engineering",
      sub: "React · TypeScript · Angular",
      accent: "text-teal",
    },
  ];

  return (
    <section id="about" className="bg-white/50 py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Left — narrative */}
          <div>
            <p className="section-kicker">About Me</p>
            <h2 className="section-title mt-1">{profile.about.headline}</h2>

            <div className="mt-6 space-y-4">
              {profile.about.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="leading-relaxed text-navy/75 first:text-base first:font-medium first:text-navy/90"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {profile.about.focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-xs font-semibold text-amber-dark"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — highlight cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-black/5 bg-cream p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                  {item.label}
                </p>
                <p
                  className={`mt-1.5 font-display text-xl font-bold leading-snug ${item.accent}`}
                >
                  {item.value}
                </p>
                {item.sub && (
                  <p className="mt-0.5 text-sm text-navy/60">{item.sub}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
