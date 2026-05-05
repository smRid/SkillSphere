import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — SkillSphere",
  description:
    "The terms governing your use of SkillSphere — accounts, content, payments, and changes.",
};

export default function TermsPage() {
  const updated = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <article
        className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:text-base-content
          prose-p:text-base-content/80
          prose-li:text-base-content/80
          prose-strong:text-base-content
          prose-a:text-primary hover:prose-a:underline"
      >
        <h1 className="font-display font-extrabold">
          <span className="gradient-text">Terms &amp; Conditions</span>
        </h1>
        <p className="not-prose text-sm text-base-content/60">
          Last updated: <span className="font-semibold">{updated}</span>
        </p>

        <p>
          Welcome to <strong>SkillSphere</strong>. By accessing or using our
          platform, you agree to the terms below. Please read them carefully —
          they outline what you can expect from us and what we expect from you.
        </p>

        <h2>1. Use of the Service</h2>
        <p>
          You may use SkillSphere to discover courses, enroll in lessons, and
          interact with instructors and peers. You agree not to misuse the
          service, attempt to disrupt it, or use it for unlawful purposes.
        </p>

        <h2>2. Accounts and Eligibility</h2>
        <p>
          You must be at least 13 years old to create an account. You&apos;re
          responsible for keeping your credentials secure and for all activity
          under your account. Notify us immediately if you suspect unauthorized
          access.
        </p>

        <h2>3. User Content</h2>
        <p>
          Anything you submit — comments, reviews, project work — remains
          yours. By posting, you grant us a non-exclusive license to display
          and distribute it within the platform so other learners can benefit
          from it.
        </p>

        <h2>4. Payments and Refunds</h2>
        <p>
          Paid courses are billed at the price shown at checkout. We offer a{" "}
          <strong>30-day money-back guarantee</strong> on most purchases — see
          our{" "}
          <Link href="/refund">Refund Policy</Link> for the full details.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          Course materials, branding, and platform code are owned by
          SkillSphere or our instructors. You may use them for personal
          learning, but not redistribute or resell them.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may suspend or terminate accounts that violate these terms. You
          can close your account at any time from your profile settings.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these terms occasionally. When we do, we&apos;ll post
          the new version here and update the &ldquo;Last updated&rdquo; date.
          Continued use of the service after changes means you accept them.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions? Email us at{" "}
          <a href="mailto:hello@skillsphere.app">hello@skillsphere.app</a>.
        </p>

        <hr />
        <p className="text-sm text-base-content/60">
          See also our{" "}
          <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </article>
    </div>
  );
}
