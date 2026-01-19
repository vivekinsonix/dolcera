'use client';

import { Button } from 'flowbite-react';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <section
        id="blogs"
        className="min-h-screen w-full dark:bg-primary dark:text-white"
        aria-labelledby="blogs-heading"
      >
        <main className="container mx-auto max-w-full px-4 mt-16">
          <header className="py-8 mx-auto text-left container">
            <h1 id="blogs-heading" className="max-w-3xl text-3xl leading-tight font-bold md:text-5xl">
              Terms and Conditions
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-1">
            <div className="container mx-auto">
              <section className="container mx-auto max-w-full  prose dark:prose-invert  prose-headings:mt-0">
                <p className="mb-4">
                  Welcome to <strong>Insonix </strong> ("we", "us", "our"). This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit and interact with our website, products,
                  and services (collectively, the "Services"). Please read this policy carefully. By using the Services,
                  you agree to the collection and use of information in accordance with this policy.
                </p>

                <h2 className="text-2xl mb-2">1. Information We Collect</h2>
                <h3 className="text-lg font-semibold mb-2">a) Information you provide</h3>
                <p>
                  We collect information you knowingly provide — for example, when you create an account, sign up for a
                  newsletter, contact support, or purchase a subscription. This may include your name, email address,
                  billing details, company name, job title, and any other information you voluntarily submit.
                </p>

                <h3 className="text-base font-semibold">b) Automatically collected information</h3>
                <p>
                  When you use the Services, we automatically collect technical and usage information such as IP
                  address, device type, operating system, browser type, pages visited, referral URLs, and cookies or
                  similar tracking technologies.
                </p>

                <h3 className="text-base font-semibold">c) Data from third parties</h3>
                <p>
                  We may obtain information from third-party services (for example, identity verification or payment
                  processors) and combine it with information we collect.
                </p>

                <h2 className="text-2xl my-2">2. How We Use Your Information</h2>
                <ul>
                  <li>To provide, operate, and maintain the Services.</li>
                  <li>
                    To process transactions and send related information, including purchase confirmations and invoices.
                  </li>
                  <li>To communicate with you about products, features, offers, and updates.</li>
                  <li>To personalize and improve the Services, content, and user experience.</li>
                  <li>
                    To detect, investigate, and prevent fraudulent transactions and other illegal activities, and to
                    protect the rights and property of Acme Software.
                  </li>
                </ul>

                <h2>3. Legal Bases for Processing (EEA/UK users)</h2>
                <p>
                  If you are located in the European Economic Area (EEA) or the UK, we rely on one or more of the
                  following legal bases to process your personal data: your consent, the performance of a contract with
                  you, compliance with legal obligations, or our legitimate interests (for example, to operate and
                  improve the Services).
                </p>

                <h2 className="text-2xl my-2">4. Sharing &amp; Disclosure</h2>
                <p>We do not sell your personal information. We may share information with:</p>
                <ul>
                  <li>
                    Service providers who perform services on our behalf (e.g., payment processors, hosting providers,
                    analytics providers).
                  </li>
                  <li>Affiliates and subsidiaries in order to provide the Services.</li>
                  <li>
                    Law enforcement, government authorities, or other third parties when required by law or to protect
                    our rights, property, or safety.
                  </li>
                </ul>

                <h2 className="text-2xl my-2">5. Third-Party Services &amp; Links</h2>
                <p>
                  Our Services may use third-party analytics and advertising services (for example, Google Analytics,
                  Stripe, Postmark, Sentry). These services may collect information about your use of the Services. We
                  recommend reviewing the privacy policies of those third parties to understand their practices.
                </p>

                <h2 className="text-2xl my-2">6. Cookies &amp; Tracking Technologies</h2>
                <p>
                  We use cookies and similar technologies to provide and improve the Services. You can control cookie
                  preferences through your browser settings and, where available, our cookie consent tool.
                </p>

                <h2 className="text-2xl my-2">7. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes described in this
                  policy, including for legal, tax, or accounting obligations.
                </p>

                <h2 className="text-2xl my-2">8. Security</h2>
                <p>
                  We take reasonable administrative, technical, and physical measures designed to protect personal
                  information. However, no method of transmission over the Internet or electronic storage is completely
                  secure — we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl my-2">9. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have rights to access, correct, update, delete, restrict, or
                  object to our use of your personal data, and to request a copy of the personal data you have provided
                  to us in a portable format. To exercise these rights, please contact us using the details below.
                </p>

                <h2 className="text-2xl my-2">10. International Transfers</h2>
                <p>
                  If we transfer personal data to countries outside your jurisdiction, we will protect it in accordance
                  with this Privacy Policy and applicable law (for example, through standard contractual clauses or
                  other safeguards).
                </p>

                <h2 className="text-2xl my-2">11. Children</h2>
                <p>
                  The Services are not intended for children under 16 (or a higher age where required by local law). We
                  do not knowingly collect personal information from children.
                </p>

                <h2 className="text-2xl my-2">12. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. When we make changes, we will revise the
                  effective date and, where required, obtain consent. Your continued use of the Services after changes
                  are posted constitutes acceptance of the updated policy.
                </p>

                <h2 className="text-2xl my-2">13. Contact Us</h2>
                <p>
                  If you have questions about this policy or would like to exercise your privacy rights, please contact
                  us at:
                </p>
                <address>
                  <strong>Insonix Software</strong>
                  <br /> Email: <Link href="mailto:privacy@acme.example">info@insonix.com</Link>
                  <br /> Address: Insonix
                </address>

                <div className="mt-6">
                  <div className="flex gap-3 mt-6">
                    <Button onClick={() => window.print()}>Print this policy</Button>
                    <Link href="/contact"></Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
