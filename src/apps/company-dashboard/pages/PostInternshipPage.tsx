import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface InternshipFormData {
  title: string;
  description: string;
  location: string;
  stipend: string;
  duration: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
  companyName: string;
  companyLogo?: string;
  companyRating: number;
  industry: string;
}

const initialForm: InternshipFormData = {
  title: "",
  description: "",
  location: "",
  stipend: "",
  duration: "",
  type: "Remote",
  level: "Beginner",
  category: "",
  skills: [],
  requirements: [],
  benefits: [],
  deadline: "",
  companyName: "",
  companyLogo: "",
  companyRating: 4.0,
  industry: ""
};


export default function PostInternshipPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [agreedToEmployerTerms, setAgreedToEmployerTerms] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'stipend' || name === 'companyRating' ? (value === '' ? '' : Number(value)) : value });
  }

  function addSkill() {
    if (currentSkill.trim() && !form.skills.includes(currentSkill.trim())) {
      setForm({ ...form, skills: [...form.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  }

  function removeSkill(skillToRemove: string) {
    setForm({ ...form, skills: form.skills.filter(skill => skill !== skillToRemove) });
  }

  function addRequirement() {
    if (currentRequirement.trim() && !form.requirements.includes(currentRequirement.trim())) {
      setForm({ ...form, requirements: [...form.requirements, currentRequirement.trim()] });
      setCurrentRequirement('');
    }
  }

  function removeRequirement(reqToRemove: string) {
    setForm({ ...form, requirements: form.requirements.filter(req => req !== reqToRemove) });
  }

  function addBenefit() {
    if (currentBenefit.trim() && !form.benefits.includes(currentBenefit.trim())) {
      setForm({ ...form, benefits: [...form.benefits, currentBenefit.trim()] });
      setCurrentBenefit('');
    }
  }

  function removeBenefit(benefitToRemove: string) {
    setForm({ ...form, benefits: form.benefits.filter(benefit => benefit !== benefitToRemove) });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    
    // Create a complete internship object
    const internshipData = {
      id: `internship-${Date.now()}`,
      title: form.title,
      description: form.description,
      location: form.location,
      stipend: Number(form.stipend),
      duration: form.duration,
      type: form.type,
      level: form.level,
      category: form.category,
      skills: form.skills,
      requirements: form.requirements,
      benefits: form.benefits,
      deadline: new Date(form.deadline),
      company: form.companyName,
      companyRating: form.companyRating,
      industry: form.industry,
      datePosted: new Date(),
      applicantCount: 0,
      status: 'Active' as const
    };
    
    console.log('Internship Data:', internshipData);
    
    setTimeout(() => navigate('/company/dashboard'), 1200);
    // Here you would send the form data to your backend
    // e.g., fetch('/api/internships', { method: 'POST', body: JSON.stringify(internshipData) })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Post New Internship</h1>
      {submitted ? (
        <div className="text-green-600 font-semibold text-center py-8">
          <div className="text-2xl mb-2">✅ Internship posted successfully!</div>
          <div>Redirecting to dashboard...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internship Title *</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  placeholder="e.g., Frontend Developer Intern" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input 
                  name="companyName" 
                  value={form.companyName} 
                  onChange={handleChange} 
                  placeholder="Your Company Name" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input 
                  name="location" 
                  value={form.location} 
                  onChange={handleChange} 
                  placeholder="e.g., Bangalore, Karnataka" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry/Category *</label>
                <input 
                  name="category" 
                  value={form.category} 
                  onChange={handleChange} 
                  placeholder="e.g., Technology, Healthcare, Finance" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                placeholder="Describe the internship role, responsibilities, and what the intern will learn..." 
                required 
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Type *</label>
                <select 
                  name="type" 
                  value={form.type} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                <select 
                  name="level" 
                  value={form.level} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input 
                  name="duration" 
                  value={form.duration} 
                  onChange={handleChange} 
                  placeholder="e.g., 3 months, 6 months" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stipend (₹/month) *</label>
                <input 
                  type="number"
                  name="stipend" 
                  value={form.stipend} 
                  onChange={handleChange} 
                  placeholder="e.g., 15000" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
                <input 
                  type="date"
                  name="deadline" 
                  value={form.deadline} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Rating</label>
                <input 
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="companyRating" 
                  value={form.companyRating} 
                  onChange={handleChange} 
                  placeholder="4.5" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Skills Required</h2>
            <div className="flex gap-2 mb-3">
              <input 
                value={currentSkill} 
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g., React, JavaScript)" 
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <button type="button" onClick={addSkill} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Requirements</h2>
            <div className="flex gap-2 mb-3">
              <input 
                value={currentRequirement} 
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                placeholder="Add a requirement (e.g., Bachelor's degree in Computer Science)" 
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <button type="button" onClick={addRequirement} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Add
              </button>
            </div>
            <div className="space-y-2">
              {form.requirements.map((req, index) => (
                <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                  <span className="text-sm">{req}</span>
                  <button type="button" onClick={() => removeRequirement(req)} className="text-red-600 hover:text-red-800">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Benefits & Perks</h2>
            <div className="flex gap-2 mb-3">
              <input 
                value={currentBenefit} 
                onChange={(e) => setCurrentBenefit(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                placeholder="Add a benefit (e.g., Flexible working hours, Learning opportunities)" 
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <button type="button" onClick={addBenefit} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                Add
              </button>
            </div>
            <div className="space-y-2">
              {form.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                  <span className="text-sm">{benefit}</span>
                  <button type="button" onClick={() => removeBenefit(benefit)} className="text-red-600 hover:text-red-800">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="employer-terms"
                checked={agreedToEmployerTerms}
                onChange={e => setAgreedToEmployerTerms(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="employer-terms" className="text-sm text-gray-700">
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

            <div className="flex gap-4">
              <button 
                type="submit" 
                disabled={!agreedToEmployerTerms}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Internship
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/company/dashboard')}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}



