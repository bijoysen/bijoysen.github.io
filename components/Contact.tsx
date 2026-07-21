import { contact, profile, socials } from "@/lib/data";
import ContactForm from "./ContactForm";
import { SocialIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-3xl bg-teal px-6 py-14 text-center text-white shadow-lg md:px-12">
          <p className="font-script text-3xl text-amber">{contact.kicker}</p>
          <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">
            {contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            {contact.description}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            {contact.availability}
          </span>

          <ContactForm />

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
            <p className="text-sm text-white/70">
              {profile.location} <span className="text-white/50">({contact.timezone})</span>
            </p>

            <ul className="flex items-center gap-5">
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

            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-teal"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
