import Image from "next/image";
import { getYearsOfExperience, profile, socials } from "@/lib/data";
import { ArrowUpRightIcon, CodeIcon, SocialIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-28 md:pt-24 md:pb-32"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute -right-24 bottom-4 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="container-page w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_auto] lg:gap-12">
          {/* Left column */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-dark">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              Available for new opportunities
            </span>

            <p className="mt-5 mb-4 font-script text-3xl text-navy md:text-4xl">
              {profile.greeting}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-amber md:text-6xl">
              {profile.firstName} {profile.lastName}.
            </h1>
            <p className="mt-1 font-script text-3xl text-navy md:text-4xl">
              <span className="text-teal">{profile.role.split(" ")[0]}</span>{" "}
              {profile.role.split(" ").slice(1).join(" ")}.
            </p>
            <p className="mt-3 max-w-md text-base font-medium text-navy/75">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#projects" className="btn-primary">
                View My Work
                <ArrowUpRightIcon className="ml-1.5 h-4 w-4" />
              </a>
              <a href={profile.cvUrl} download className="btn-outline">
                Download CV
              </a>
            </div>

            <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row lg:justify-start">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-extrabold text-navy">
                  {getYearsOfExperience()}+
                </span>
                <span className="text-left text-sm font-semibold uppercase leading-tight tracking-wide text-navy/70">
                  Years
                  <br />
                  Experience
                </span>
              </div>

              <span className="hidden h-10 w-px bg-navy/15 sm:block" aria-hidden="true" />

              <ul className="flex items-center gap-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-amber shadow-sm transition-all hover:-translate-y-0.5 hover:text-amber-dark hover:shadow-md"
                    >
                      <SocialIcon name={s.icon} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center portrait */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 translate-y-4 scale-95 rounded-full bg-amber/25 blur-2xl" />
              <div className="absolute -inset-4 -z-10 rounded-full border-2 border-dashed border-teal/30 [animation:spin_22s_linear_infinite]" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full bg-white ring-4 ring-amber/70 sm:h-72 sm:w-72 md:h-80 md:w-80">
                <Image
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 16rem, 20rem"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-black/5 bg-white px-4 py-2 shadow-lg">
                <CodeIcon className="h-4 w-4 text-teal" />
                <span className="text-xs font-semibold text-navy">
                  React · TypeScript · Angular
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-navy/50 transition-colors hover:text-teal lg:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDownIcon className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
