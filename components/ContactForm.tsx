"use client";

import { useEffect, useRef, useState } from "react";
import { contact, profile } from "@/lib/data";
import { AlertIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "phone" | "message";

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional leading +, digits, spaces, dashes, and parentheses; 7-15 digits total.
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
// Matches any letter (including accented/international letters) via Unicode property escapes.
const HAS_LETTER_PATTERN = /\p{L}/u;
// Only letters, spaces, and common name punctuation (apostrophe, hyphen, period).
const NAME_PATTERN = /^[\p{L}\s.'-]+$/u;

function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim();

  switch (name) {
    case "name":
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!HAS_LETTER_PATTERN.test(trimmed)) {
        return "Name cannot contain only numbers or symbols.";
      }
      if (!NAME_PATTERN.test(trimmed)) {
        return "Name can only contain letters, spaces, apostrophes, and hyphens.";
      }
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address.";
      return undefined;
    case "phone":
      if (!trimmed) return undefined;
      if (!PHONE_PATTERN.test(trimmed)) return "Please enter a valid phone number.";
      return undefined;
    case "message":
      if (!trimmed) return "Please enter a message.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      return undefined;
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as FieldName[]).forEach((name) => {
    const error = validateField(name, values[name]);
    if (error) errors[name] = error;
  });
  return errors;
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1 flex items-center gap-1 text-xs font-semibold text-rose-200"
    >
      <AlertIcon className="h-3.5 w-3.5 flex-shrink-0 text-rose-200" />
      {message}
    </p>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  // Captures when the form first mounted, so the backend can reject
  // submissions completed faster than a human could type (bot time-trap).
  const loadedAtRef = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  const isConfigured = !contact.formEndpoint.includes("REPLACE_WITH_YOUR");

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as it becomes valid again.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const nextError = validateField(name, value);
      const next = { ...prev };
      if (nextError) {
        next[name] = nextError;
      } else {
        delete next[name];
      }
      return next;
    });
  }

  function handleBlur(name: FieldName) {
    const error = validateField(name, values[name]);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    if (new FormData(form).get("_honeypot")) {
      return;
    }

    const fieldErrors = validateAll(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const firstInvalidName = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
      return;
    }

    if (!isConfigured) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await fetch(contact.formEndpoint, {
        method: "POST",
        body: new URLSearchParams({
          ...values,
          _ts: String(loadedAtRef.current ?? Date.now()),
        }),
      });
      // Apps Script Web Apps route through a redirect chain that fetch()
      // often reports as an opaque response, so a resolved promise (no
      // network error thrown) is treated as success here.
      setStatus("success");
      setValues(initialValues);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-5 text-center sm:p-6">
        <p className="font-display text-lg font-bold text-white">
          Thanks for reaching out!
        </p>
        <p className="mt-2 text-sm text-white/70">
          I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-teal"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClassName = (name: FieldName, extra = "") =>
    `contact-field mt-1 w-full rounded-lg border bg-white/10 px-3.5 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:outline-none focus:ring-2 ${
      errors[name]
        ? "border-rose-400 bg-rose-500/10 focus:border-rose-400 focus:ring-rose-400/30"
        : "border-white/20 focus:border-amber focus:ring-amber/30"
    } ${extra}`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative mx-auto mt-6 max-w-2xl text-left"
    >
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClassName("name")}
          />
          {errors.name && <FieldError id="name-error" message={errors.name} />}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClassName("email")}
          />
          {errors.email && <FieldError id="email-error" message={errors.email} />}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="text-sm font-medium text-white/80">
            Phone <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldClassName("phone")}
          />
          {errors.phone && <FieldError id="phone-error" message={errors.phone} />}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-white/80">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            rows={3}
            placeholder="Tell me a bit about the role or opportunity..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={fieldClassName("message", "resize-none")}
          />
          {errors.message && <FieldError id="message-error" message={errors.message} />}
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm text-amber">
          Something went wrong sending your message. Please email me directly
          at{" "}
          <a href={`mailto:${profile.email}`} className="font-semibold underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-amber hover:text-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p className="mt-2 text-center text-xs text-white/50">
        {contact.privacyNote}
      </p>
    </form>
  );
}
