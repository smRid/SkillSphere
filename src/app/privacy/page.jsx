import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — SkillSphere",
  description:
    "How SkillSphere collects, uses, and protects your information — written in plain English.",
};

export default function PrivacyPage() {
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
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p className="not-prose text-sm text-base-content/60">
          Last updated: <span className="font-semibold">{updated}</span>
        </p>

        <p>
          Your privacy matters. This policy explains what we collect, why we
          collect it, and the choices you have. Plain English, no fine-print
          tricks.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Account info</strong> — name, email, profile photo URL,
            and the password hash we never see in clear text.
          </li>
          <li>
            <strong>Learning activity</strong> — courses you enroll in,
            progress, and reviews you leave.
          </li>
          <li>
            <strong>Technical data</strong> — basic device, browser, and IP
            information needed to keep the service secure and reliable.
          </li>
        </ul>

        <h2>2. How We Use It</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve the service.</li>
          <li>Personalize recommendations and progress tracking.</li>
          <li>Send important account notices (password resets, receipts).</li>
          <li>Detect and prevent abuse.</li>
        </ul>
        <p>
          We <strong>do not sell your data</strong> to third parties.
        </p>

        <h2>3. Cookies and Tracking</h2>
        <p>
          We use cookies to keep you signed in and to understand how the
          platform is used. Details are in our{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>

        <h2>4. Sharing and Disclosure</h2>
        <p>
          We share data only with service providers that help us operate
          (hosting, analytics, payment processors) under strict confidentiality
          terms — and only as needed for them to do their job.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You can access, update, or delete your personal data at any time from
          your profile, or by emailing us. Where applicable, you can also
          object to processing or request data portability.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We keep your data only as long as your account is active or as
          needed to comply with legal obligations. Closing your account
          triggers deletion of personal information within a reasonable window.
        </p>

        <h2>7. Security</h2>
        <p>
          Passwords are hashed, traffic is encrypted in transit, and access to
          production systems is tightly controlled. No system is 100% secure,
          but we treat your data like our own.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          If we materially change this policy, we&apos;ll notify you and
          update the &ldquo;Last updated&rdquo; date. Continued use after the
          change means you accept the updated policy.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a href="mailto:hello@skillsphere.app">hello@skillsphere.app</a>.
        </p>

        <hr />
        <p className="text-sm text-base-content/60">
          See also our{" "}
          <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </article>
    </div>
  );
}
