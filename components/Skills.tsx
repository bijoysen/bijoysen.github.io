import { skillCategories } from "@/lib/data";
import { SkillIcon } from "./Icons";

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">My Toolbox</p>
          <h2 className="section-title mt-1">Technical Proficiencies</h2>
          <p className="mt-4 text-navy/70">
            Tools and technologies I work with day to day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <SkillIcon name={category.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-navy">
                  {category.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-teal/15 bg-teal/5 px-3.5 py-2 text-sm font-medium text-teal-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
