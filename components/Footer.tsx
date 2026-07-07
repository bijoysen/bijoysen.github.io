import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-navy/60 sm:flex-row">
        <a href="#home" className="font-display text-lg font-extrabold">
          <span className="text-teal">B</span>
          <span className="text-navy">Sen.</span>
        </a>
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
