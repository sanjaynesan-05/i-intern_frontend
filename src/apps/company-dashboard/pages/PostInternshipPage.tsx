import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface InternshipFormData {
  title: string;
  description: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string;
  applyLink: string;
  companyName: string;
}

const initialForm: InternshipFormData = {
  title: "",
  description: "",
  location: "",
  stipend: "",
  duration: "",
  skills: "",
  applyLink: "",
  companyName: ""
};


export default function PostInternshipPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [agreedToEmployerTerms, setAgreedToEmployerTerms] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/company/dashboard'), 1200);
    // Here you would send the form data to your backend
    // e.g., fetch('/api/internships', { method: 'POST', body: JSON.stringify(form) })
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Post New Internship</h1>
      {submitted ? (
        <div className="text-green-600 font-semibold">Internship posted successfully! Redirecting...</div>
      ) : (
  <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Internship Title" required className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="w-full p-2 border rounded" />
          <input name="stipend" value={form.stipend} onChange={handleChange} placeholder="Stipend" required className="w-full p-2 border rounded" />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" required className="w-full p-2 border rounded" />
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="Required Skills (comma separated)" required className="w-full p-2 border rounded" />
          <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="Application Link" required className="w-full p-2 border rounded" />
          <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" required className="w-full p-2 border rounded" />

          {/* Employer Terms of Service Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="employer-terms"
              checked={agreedToEmployerTerms}
              onChange={e => setAgreedToEmployerTerms(e.target.checked)}
              className="accent-blue-600 w-5 h-5 rounded focus:ring-blue-600 border-gray-300"
              required
            />
            <label htmlFor="employer-terms" className="text-sm text-gray-700 select-none">
              I confirm our company agrees to the I-Intern{' '}
              <a
                href="/employer-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Employer Terms of Service
              </a>
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={!agreedToEmployerTerms}>Post Internship</button>
            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => navigate('/company/dashboard')}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}



