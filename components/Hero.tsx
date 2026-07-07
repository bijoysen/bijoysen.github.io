import Image from "next/image";
import { getYearsOfExperience, profile, socials } from "@/lib/data";
import { SocialIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left column */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="font-script text-4xl text-navy md:text-5xl">
              {profile.greeting}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-tight text-amber md:text-6xl">
              {profile.firstName} {profile.lastName}.
            </h1>

            <div className="mt-8 hidden justify-start lg:flex" aria-hidden="true">
              <DashedArrow />
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
              <span className="font-display text-4xl font-extrabold text-navy">
                {getYearsOfExperience()}
              </span>
              <span className="text-sm font-semibold uppercase leading-tight tracking-wide text-navy/70">
                Years
                <br />
                Experience
              </span>
            </div>

            <ul className="mt-8 flex items-center justify-center gap-5 lg:justify-start">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-amber transition-transform hover:scale-110 hover:text-amber-dark"
                  >
                    <SocialIcon name={s.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Center portrait */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 translate-y-3 rounded-full bg-amber/25 blur-2xl" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full bg-white ring-4 ring-amber/70 sm:h-80 sm:w-80 md:h-96 md:w-96">
                <Image
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 20rem, 24rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="order-3 flex flex-col items-center gap-10 lg:items-end">
            <p className="max-w-xs text-center font-medium text-navy/80 lg:text-right">
              {profile.tagline}
            </p>
            <p className="font-script text-3xl text-navy md:text-4xl">
              <span className="text-teal">Frontend</span> Developer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashedArrow() {
  return (
    <svg
      width="160"
      height="90"
      viewBox="0 0 160 90"
      fill="none"
      className="text-teal"
    >
      <path
        d="M8 82c14-2 26-14 24-30C30 36 14 30 10 44c-4 14 12 22 30 18 26-6 40-34 66-46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        d="M8 82c14-2 26-14 24-30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        d="M2 74l6 10 10-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
