import { profile, socials } from "@/lib/data";
import { MailIcon, SocialIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-3xl bg-teal px-6 py-14 text-center text-white shadow-lg md:px-12">
          <p className="font-script text-3xl text-amber">Get In Touch</p>
          <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">
            Open to new opportunities
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Exploring senior frontend roles — recruiters and hiring managers,
            feel free to reach out.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal transition-colors hover:bg-amber hover:text-navy"
          >
            <MailIcon className="h-4 w-4" />
            {profile.email}
          </a>

          <ul className="mt-10 flex items-center justify-center gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-amber hover:text-navy"
                >
                  <SocialIcon name={s.icon} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
