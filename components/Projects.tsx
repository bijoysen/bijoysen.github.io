import { projects } from "@/lib/data";
import { ArrowUpRightIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="bg-white/50 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">My Work</p>
          <h2 className="section-title mt-1">Featured Projects</h2>
          <p className="mt-4 text-navy/70">
            A selection of things I&apos;ve built recently.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-2xl bg-cream p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 h-40 w-full rounded-xl bg-gradient-to-br from-teal/15 via-amber/15 to-navy/10" />
              <h3 className="font-display text-lg font-bold text-navy">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-4 text-sm font-semibold">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1 text-teal hover:text-teal-dark"
                  >
                    Live <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="inline-flex items-center gap-1 text-navy/70 hover:text-navy"
                  >
                    <GithubIcon className="h-4 w-4" /> Code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
