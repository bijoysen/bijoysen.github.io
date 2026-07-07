import { getYearsOfExperience, profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-page mx-auto max-w-3xl text-center">
        <p className="section-kicker">About Me</p>
        <h2 className="section-title mt-1">
          Turning ideas into clean interfaces
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-navy/75">
          {profile.about}
        </p>

        <dl className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <dt className="text-sm text-navy/60">Experience</dt>
            <dd className="mt-1 font-display text-2xl font-bold text-teal">
              {getYearsOfExperience()}+ Years
            </dd>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <dt className="text-sm text-navy/60">Location</dt>
            <dd className="mt-1 font-display text-2xl font-bold text-teal">
              {profile.location}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
