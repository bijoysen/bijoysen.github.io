import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-script text-3xl text-amber">Oops</p>
      <h1 className="font-display text-5xl font-extrabold text-navy md:text-6xl">
        404
      </h1>
      <p className="max-w-md text-navy/70">
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Back to Home
      </Link>
    </main>
  );
}
