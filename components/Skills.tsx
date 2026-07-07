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

        <div className="mx-auto mt-14 max-w-5xl gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="mb-6 break-inside-avoid rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <SkillIcon name={category.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold text-navy">
                  {category.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-teal/15 bg-teal/5 px-3 py-1.5 text-xs font-medium text-teal-dark"
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
