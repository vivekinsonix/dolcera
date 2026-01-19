'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { COUNTRY_CODES, inquiryTypes } from '@/app/constants/appconstants';
import { sendMail } from '@/app/services/emailService';
import { Button, Checkbox, Label, Select, Textarea, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    inquiryType: '',
    fullName: '',
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    company: '',
    role: '',
    message: '',
    agreePrivacy: false,
  });

  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onVerify = (token: string | null) => {
    setCaptchaToken(token || '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.inquiryType.trim()) return (setError('Please select an inquiry type'), false);
    if (!formData.fullName.trim()) return (setError('Full name is required'), false);
    if (!formData.email.trim()) return (setError('Email is required'), false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return (setError('Please enter a valid email address'), false);

    if (!formData.company.trim()) return (setError('Company/Organization is required'), false);
    if (!formData.message.trim()) return (setError('Please provide your message'), false);
    if (!formData.agreePrivacy) return (setError('You must agree to the privacy policy'), false);
    if (!captchaToken) return (setError('Please complete the captcha'), false);

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const fullPhoneNumber = formData.phoneNumber ? `${formData.countryCode} ${formData.phoneNumber}` : '';

      const emailPayload = {
        name: formData.fullName,
        email: formData.email,
        subject: `New Contact Form Submission - ${formData.inquiryType}`,
        token: captchaToken,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f6f6f6; padding: 20px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
              <tr>
                <td style="background: #0d6efd; padding: 20px; text-align: center; color: #ffffff;">
                  <h2 style="margin: 0;">New Contact Form Submission</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 25px;">
                  <p style="font-size: 16px; color: #333;">You have received a new inquiry from Insonix website.</p>
                  <table width="100%" cellspacing="0" cellpadding="8" style="font-size: 15px; color: #444;">
                    <tr><td><strong>Inquiry Type:</strong></td><td>${formData.inquiryType}</td></tr>
                    <tr><td><strong>Name:</strong></td><td>${formData.fullName}</td></tr>
                    <tr><td><strong>Email:</strong></td><td>${formData.email}</td></tr>
                    <tr><td><strong>Phone:</strong></td><td>${fullPhoneNumber || 'Not provided'}</td></tr>
                    <tr><td><strong>Company:</strong></td><td>${formData.company}</td></tr>
                    <tr><td><strong>Role:</strong></td><td>${formData.role || 'Not provided'}</td></tr>
                  </table>
                  <hr style="margin: 25px 0; border: 0; border-top: 1px solid #e5e5e5;">
                  <h3 style="margin-bottom: 10px; color: #333;">Message:</h3>
                  <p style="white-space: pre-line; font-size: 15px; color: #555; line-height: 1.6;">
                    ${formData.message.replace(/\n/g, '<br>')}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 13px; color: #777;">
                  This email was generated from your website contact form.
                </td>
              </tr>
            </table>
          </div>
        `,
      };

      await sendMail(emailPayload);

      setSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({
        inquiryType: '',
        fullName: '',
        email: '',
        countryCode: '+1',
        phoneNumber: '',
        company: '',
        role: '',
        message: '',
        agreePrivacy: false,
      });
      setCaptchaToken('');
      captchaRef.current?.resetCaptcha();
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SEO
  // -----------------------------
  const seoTitle = 'Contact Us - Insonix';
  const seoDescription =
    'Get in touch with the Insonix team for inquiries, support, or partnership opportunities. Fill out our contact form and reach us easily.';
  const seoKeywords = 'Insonix contact, support, partnership, inquiry, get in touch';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/contact`;
  const seoImage = '/default-og.jpg.png';

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} image={seoImage} url={seoUrl} />

      <section id="contact" className="text-left p-4 px-8 dark:bg-primary dark:text-gray-200 bg-secondary min-h-screen">
        <div className="container max-w-4xl mt-5">
          <p className="text-base md:text-lg mb-5 text-gray-800 dark:text-gray-300">
            Please provide the following information and we'll put you in touch with the right person.
          </p>

          {error && <div className="mb-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
          {success && (
            <div className="mb-3 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="md:grid block gap-4">
            {/* Inquiry Type */}
            <div className="mb-4">
              <Label htmlFor="inquiryType">Inquiry Type*</Label>
              <Select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                <option value="">Select an inquiry type</option>
                {inquiryTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            {/* Full Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name*</Label>
                <TextInput id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email*</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Country code + Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="countryCode">Country Code*</Label>
                <Select id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleChange}>
                  {COUNTRY_CODES.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.countryName} ({item.code})
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="phoneNumber">Mobile Number*</Label>
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Company + Role  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company/Organization*</Label>
                <TextInput id="company" name="company" value={formData.company} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="role">Your Role/Function</Label>
                <TextInput id="role" name="role" value={formData.role} onChange={handleChange} />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">
                {formData.inquiryType === 'Job Seeker' ? 'Why you?' : 'How can we help you?'}*
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={10}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Privacy */}
            <div className="flex gap-2 mb-4">
              <Checkbox id="agreePrivacy" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} />
              <Label htmlFor="agreePrivacy">
                I agree to the processing of my personal information in accordance with
                <Link target="_blank" href="/privacypolicy" className="text-cyan-600 ml-1">
                  Insonix Privacy Statement
                </Link>
              </Label>
            </div>
            {/* reCAPTCHA */}
            <div className="mb-6">
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onVerify} ref={captchaRef} />
              ) : (
                <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                  ReCAPTCHA is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.
                </div>
              )}
            </div>
            <Button type="submit" disabled={loading || !captchaToken} className="w-full md:w-auto">
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
