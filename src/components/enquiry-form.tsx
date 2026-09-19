"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Property } from "@/data/properties";

type EnquiryFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type EnquiryFormErrors = Partial<Record<keyof EnquiryFormValues, string>>;

const initialValues: EnquiryFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const inputClassName =
  "w-full rounded-xl border bg-white px-3 py-3 text-sm text-[#1a2b2f] placeholder:text-[#7f8078] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8]";

function validateEnquiry(values: EnquiryFormValues) {
  const errors: EnquiryFormErrors = {};
  const normalizedName = values.name.trim();
  const normalizedPhone = values.phone.trim();
  const normalizedEmail = values.email.trim();

  if (!normalizedName) {
    errors.name = "Please enter your name.";
  }

  if (!normalizedPhone) {
    errors.phone = "Please enter your phone number.";
  } else {
    const cleanedPhone = normalizedPhone.replace(/\s+/g, "").replace(/-/g, "");
    const indianPhonePattern = /^(?:\+91|91)?[6789]\d{9}$/;

    if (!indianPhonePattern.test(cleanedPhone)) {
      errors.phone = "Please enter a valid Indian phone number.";
    }
  }

  if (normalizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length > 800) {
    errors.message = "Please keep your message under 800 characters.";
  }

  return errors;
}

type EnquiryFormProps = {
  property?: Property | null;
};

export function EnquiryForm({ property }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (
    field: keyof EnquiryFormValues,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const nextValue = event.target.value;

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateEnquiry(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[1.75rem] border border-[#dfe9e8] bg-white p-6 shadow-[0_12px_30px_rgba(22,32,33,0.04)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6b5f]">Enquiry received</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a2b2f]">
          Thank you for your interest.
        </h2>
        <p className="mt-4 text-base leading-7 text-[#535d5f]">
          We have received your enquiry for this property. A LIVING SPACE advisor will be in touch with you shortly to continue the conversation.
        </p>
        {property ? (
          <div className="mt-6 rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Property</p>
            <p className="mt-2 text-lg font-semibold text-[#1a2b2f]">{property.title}</p>
            <p className="mt-1 text-sm text-[#54666b]">{property.id}</p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-[#e7e0d7] bg-white p-5 shadow-[0_14px_30px_rgba(22,32,33,0.04)] sm:p-8">
      {property ? (
        <div className="mb-6 rounded-[1.2rem] border border-[#e7e0d7] bg-[#faf7f3] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Interested in</p>
          <p className="mt-2 text-xl font-semibold text-[#1a2b2f]">{property.title}</p>
          <p className="mt-1 text-sm text-[#54666b]">Property ID: {property.id}</p>
          <p className="mt-3 text-sm font-medium text-[#1a2b2f]">{formatPrice(property.price)}</p>
        </div>
      ) : (
        <div className="mb-6 rounded-[1.2rem] border border-[#e7e0d7] bg-[#faf7f3] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">General enquiry</p>
          <p className="mt-2 text-xl font-semibold text-[#1a2b2f]">Ask a question</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event)}
            aria-invalid={Boolean(errors.name)}
            className={`${inputClassName} ${errors.name ? "border-[#b5534d] bg-[#fff9f8]" : "border-[#dfe3df]"}`}
            placeholder="Your full name"
          />
          {errors.name ? <p className="mt-2 text-sm text-[#9a4038]">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event)}
            aria-invalid={Boolean(errors.phone)}
            className={`${inputClassName} ${errors.phone ? "border-[#b5534d] bg-[#fff9f8]" : "border-[#dfe3df]"}`}
            placeholder="+91 92662 39923"
          />
          {errors.phone ? <p className="mt-2 text-sm text-[#9a4038]">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event)}
            aria-invalid={Boolean(errors.email)}
            className={`${inputClassName} ${errors.email ? "border-[#b5534d] bg-[#fff9f8]" : "border-[#dfe3df]"}`}
            placeholder="livingspace.del@gmail.com"
          />
          {errors.email ? <p className="mt-2 text-sm text-[#9a4038]">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event)}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClassName} resize-none ${errors.message ? "border-[#b5534d] bg-[#fff9f8]" : "border-[#dfe3df]"}`}
            placeholder="Tell us a bit about your requirements or timeline."
          />
          {errors.message ? <p className="mt-2 text-sm text-[#9a4038]">{errors.message}</p> : null}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting} className="w-full" aria-live="polite">
            {isSubmitting ? "Sending your enquiry..." : "Submit enquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
