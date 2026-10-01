"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { createEnquiry } from "@/src/service/webService/enquiry";
import { createEnquirySchema, CreateEnquiryFormInputs } from "@/src/zod/CreateEnquirySchema";

const DEFAULT_VALUES: CreateEnquiryFormInputs = {
  parentName: "",
  studentName: "",
  classApplyingFor: "",
  mobile: "",
  email: "",
  message: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-in fade-in duration-150">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{message}</span>
    </p>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border bg-background text-text-primary text-xs sm:text-sm focus:outline-none focus:bg-surface transition-all ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
  }`;

export default function Enquiry() {
  const [submittedData, setSubmittedData] = useState<CreateEnquiryFormInputs | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEnquiryFormInputs>({
    resolver: zodResolver(createEnquirySchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const isSubmitted = submittedData !== null;
  const parentName = submittedData?.parentName ?? "";
  const studentName = submittedData?.studentName ?? "";
  const selectedClass = submittedData?.classApplyingFor ?? "";

  const classOptions = [
    "Pre-Nursery",
    "Nursery",
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11 (Science)",
    "Grade 11 (Commerce)",
    "Grade 11 (Humanities)",
    "Grade 12",
  ];

  const onSubmit = async (data: CreateEnquiryFormInputs) => {
    setServerError(null);

    try {
      const response = await createEnquiry(data);
      toast.success(response?.message || "Enquiry submitted successfully!");
      setSubmittedData(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit enquiry. Please try again.";
      setServerError(msg);
      toast.error(msg);
    }
  };

  const handleReset = () => {
    reset(DEFAULT_VALUES);
    setServerError(null);
    setSubmittedData(null);
  };

  return (
    <section id="enquiry" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Information & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Admissions Open 2026-27
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary tracking-tight leading-tight">
              Begin Your Child’s Journey at <span className="text-primary">The Manthan School</span>
            </h2>

            <p className="text-base text-text-secondary leading-relaxed">
              We empower students to explore their potential in an inspiring, supportive, and technologically advanced learning ecosystem.
            </p>

            {/* School Highlights List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-surface border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">CBSE Curriculum & Global Pedagogy</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Holistic academic excellence from Kindergarten through Grade 12.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-surface border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">State-of-the-Art Labs & AI Workshops</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Hands-on computational thinking, robotics, and creative problem solving.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-surface border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25H9M12 7.5v-3m0 0H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">GPS-Enabled Safe Transport</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Air-conditioned fleet covering major routes across Noida & Greater Noida West.</p>
                </div>
              </div>
            </div>

            {/* Helpline bar */}
            <div className="pt-2 flex items-center gap-3 text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">Need immediate help?</span>
              <a href="tel:0120-7133925" className="text-primary font-bold hover:underline">
                Call 0120-7133925
              </a>
            </div>
          </div>

          {/* Right Column: Admission Enquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl border border-border shadow-xl p-6 sm:p-10 relative overflow-hidden">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent-blue to-secondary" />

              {isSubmitted ? (
                /* Success Message State */
                <div
                  id="enquiry-success-message"
                  className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800">
                      Admission Query Received
                    </span>
                    <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                      Enquiry Submitted Successfully!
                    </h3>
                  </div>

                  <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Thank you {parentName ? <strong className="text-text-primary font-semibold">{parentName}</strong> : "for reaching out"}. We have received your admission enquiry{studentName ? <> for <strong className="text-text-primary font-semibold">{studentName}</strong></> : ""}{selectedClass ? ` (${selectedClass})` : ""}. Our admissions counselor will connect with you shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      id="submit-another-enquiry-btn"
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-white bg-secondary hover:bg-secondary-dark transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href="tel:0120-7133925"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-secondary bg-surface border border-border hover:bg-background transition-all text-center"
                    >
                      Call Admissions Desk
                    </a>
                  </div>
                </div>
              ) : (
                /* Admission Form UI */
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-secondary tracking-tight">
                      Admission Enquiry Form
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1">
                      Fill out the details below to receive prospectus and admission assistance.
                    </p>
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{serverError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    {/* Parent Name & Student Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Parent Name */}
                      <div>
                        <label htmlFor="enq-parent" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                          Parent Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="enq-parent"
                          type="text"
                          autoComplete="name"
                          placeholder="Parent's full name"
                          {...register("parentName")}
                          className={inputClass(!!errors.parentName)}
                        />
                        <FieldError message={errors.parentName?.message} />
                      </div>

                      {/* Student Name */}
                      <div>
                        <label htmlFor="enq-student" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                          Student Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="enq-student"
                          type="text"
                          placeholder="Student's full name"
                          {...register("studentName")}
                          className={inputClass(!!errors.studentName)}
                        />
                        <FieldError message={errors.studentName?.message} />
                      </div>
                    </div>

                    {/* Class Applying For & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Class Applying For */}
                      <div>
                        <label htmlFor="enq-class" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                          Class Applying For <span className="text-primary">*</span>
                        </label>
                        <select
                          id="enq-class"
                          {...register("classApplyingFor")}
                          className={`${inputClass(!!errors.classApplyingFor)} cursor-pointer`}
                        >
                          <option value="">Select Class Applying For</option>
                          {classOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <FieldError message={errors.classApplyingFor?.message} />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label htmlFor="enq-mobile" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5">
                          Mobile <span className="text-primary">*</span>
                        </label>
                        <input
                          id="enq-mobile"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          placeholder="e.g. 9876543210"
                          {...register("mobile", {
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                              e.target.value = e.target.value.replace(/\D/g, "");
                            },
                          })}
                          className={inputClass(!!errors.mobile)}
                        />
                        <FieldError message={errors.mobile?.message} />
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="enq-email" className="block text-xs font-semibold uppercase tracking-wider text-text-primary">
                          Email
                        </label>
                        <span className="text-[11px] text-text-secondary font-medium">(optional)</span>
                      </div>
                      <input
                        id="enq-email"
                        type="email"
                        autoComplete="email"
                        placeholder="parent.email@example.com"
                        {...register("email")}
                        className={inputClass(!!errors.email)}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>

                    {/* Message (Optional) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="enq-message" className="block text-xs font-semibold uppercase tracking-wider text-text-primary">
                          Message
                        </label>
                        <span className="text-[11px] text-text-secondary font-medium">(optional)</span>
                      </div>
                      <textarea
                        id="enq-message"
                        rows={3}
                        placeholder="Any queries regarding admissions, curriculum, transport, etc."
                        {...register("message")}
                        className={`${inputClass(!!errors.message)} resize-none`}
                      />
                      <FieldError message={errors.message?.message} />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        id="enquiry-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-primary to-primary-dark hover:opacity-95 active:scale-[0.99] shadow-lg shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Admission Enquiry</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-text-secondary pt-1">
                      🔒 Your details are secure with us. We do not share your contact information with third parties.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
