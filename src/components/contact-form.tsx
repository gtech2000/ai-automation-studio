"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/projects";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

function validate(data: FormData) {
  const errors: Record<string, string> = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Tell me a bit more (10+ characters).";

  return { errors, name, email, message };
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(formData: FormData) {
    const { errors } = validate(formData);
    if (Object.keys(errors).length > 0) {
      setState({ status: "error", fieldErrors: errors });
      return;
    }

    setState({ status: "submitting" });

    // Simulated submission — replace with your form endpoint
    // (Formspree, Baserow, n8n webhook, etc.)
    await new Promise((resolve) => setTimeout(resolve, 900));

    const shouldFail = false; // swap for real endpoint logic
    if (shouldFail) {
      setState({
        status: "error",
        message:
          "Something went wrong. Please email me directly instead.",
      });
    } else {
      setState({
        status: "success",
        message: "Thanks — I'll get back to you within one business day.",
      });
    }
  }

  const submitting = state.status === "submitting";
  const success = state.status === "success";

  return (
    <form action={handleSubmit} noValidate className="mt-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={state.fieldErrors?.name}
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className="input"
            placeholder="Your name"
          />
        </Field>

        <Field
          id="email"
          label="Email"
          error={state.fieldErrors?.email}
          required
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className="input"
            placeholder="you@company.com"
          />
        </Field>

        <Field id="company" label="Company (optional)">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="input"
            placeholder="Company or project"
          />
        </Field>

        <Field id="budget" label="Budget range (optional)">
          <select id="budget" name="budget" className="input">
            <option value="">Select a range</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000 – $5,000</option>
            <option value="5k-15k">$5,000 – $15,000</option>
            <option value="15k+">$15,000+</option>
            <option value="ongoing">Ongoing retainer</option>
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Project details"
        error={state.fieldErrors?.message}
        required
        className="mt-5"
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className="input resize-y"
          placeholder="What process takes too much time today? What tools are involved? What does success look like?"
        />
      </Field>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-warning/30 bg-[#FFF8E6] px-4 py-3 text-sm text-warning"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      {success ? (
        <p
          role="status"
          className="mt-5 flex items-center gap-2 rounded-xl border border-[#1A7F37]/30 bg-[#E8F5EC] px-4 py-3 text-sm text-[#1A7F37]"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {state.message}
        </p>
      ) : (
        <div className="mt-6">
          <SubmitButton submitting={submitting} />
          <p className="mt-3 text-sm text-grey">
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-accent-1 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            — I reply within one business day.
          </p>
        </div>
      )}
    </form>
  );
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-1 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-1/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        <>
          Send inquiry
          <Send className="h-4 w-4" aria-hidden="true" />
        </>
      )}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        {label}
        {required && (
          <span className="ml-1 text-accent-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}
