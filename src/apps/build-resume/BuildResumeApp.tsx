import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useResumeData } from '@/shared/hooks/useResumeData';
import { StepIndicator } from './components/StepIndicator';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { ObjectiveStep } from './components/steps/ObjectiveStep';
import { EducationStep } from './components/steps/EducationStep';
import { ProjectsStep } from './components/steps/ProjectsStep';
import { ExperienceStep } from './components/steps/ExperienceStep';
import { SkillsStep } from './components/steps/SkillsStep';
import { CertificationsStep } from './components/steps/CertificationsStep';
import { LoadingModal } from './components/LoadingModal';

const STEP_TITLES = [
  'Personal Info',
  'Objective',
  'Education',
  'Projects',
  'Experience',
  'Skills',
  'Certifications',
];


export default function App() {
  const {
    resumeData,
    currentStep,
    updatePersonalInfo,
    updateObjective,
    updateEducation,
    updateProjects,
    updateExperience,
    updateSkills,
    updateCertifications,
    nextStep,
    prevStep,
    goToStep,
  } = useResumeData();

  // Validation for each step
  function validateCurrentStep() {
    switch (currentStep) {
      case 0: {
        const d = resumeData.personalInfo;
        return d.fullName.trim() && d.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) && d.phone.trim();
      }
      case 1: {
        const o = resumeData.objective;
        return o && o.trim().length >= 50;
      }
      case 2: {
        const e = resumeData.education;
        return e.degree.trim() && e.college.trim() && e.cgpa.trim() && !isNaN(Number(e.cgpa)) && Number(e.cgpa) >= 0 && Number(e.cgpa) <= 10 && e.startDate && e.endDate;
      }
      case 3: {
        return resumeData.projects.length > 0 && resumeData.projects.every(p => p.title.trim() && p.description.trim());
      }
      case 4: {
        return resumeData.experience.length > 0 && resumeData.experience.every(exp => exp.role.trim() && exp.company.trim() && exp.startDate.trim() && exp.endDate.trim() && exp.responsibilities.length > 0);
      }
      case 5: {
        return resumeData.skills.length > 0;
      }
      case 6: {
        return true;
      }
      default:
        return true;
    }
  }

  const guardedGoToStep = (step: number) => {
    if (step === currentStep) return;
    if (step > currentStep) {
      if (!validateCurrentStep()) {
        alert('Please complete all required fields before proceeding.');
        return;
      }
    }
    goToStep(step);
  };

  const [modalStatus, setModalStatus] = useState<'generating' | 'success' | 'error' | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async () => {
    setModalStatus('generating');
    setProgress(0);
    // Simulate real-time progress
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.floor(Math.random() * 6) + 2; // Increase by 2-7%
        } else {
          return prev;
        }
      });
    }, 300);

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (response.ok) {
        const blob = await response.blob();
        setPdfBlob(blob);
        setProgress(100);
        setModalStatus('success');
      } else {
        setModalStatus('error');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      setModalStatus('error');
    } finally {
      if (progressInterval.current) {
        setTimeout(() => {
          clearInterval(progressInterval.current!);
          progressInterval.current = null;
        }, 600);
      }
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Reset progress and clear interval when modal closes
  const handleCloseModal = () => {
    setModalStatus(null);
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <ObjectiveStep
            data={resumeData.objective}
            onUpdate={updateObjective}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <EducationStep
            data={resumeData.education}
            onUpdate={updateEducation}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ProjectsStep
            data={resumeData.projects}
            onUpdate={updateProjects}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onUpdate={updateExperience}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <SkillsStep
            data={resumeData.skills}
            onUpdate={updateSkills}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <CertificationsStep
            data={resumeData.certifications}
            onUpdate={updateCertifications}
            onSubmit={handleSubmit}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold font-quicksand text-foreground tracking-wide mb-1">InternCV</h1>
          <p className="text-muted-foreground text-base font-manrope">Create your professional ATS-optimized resume in minutes</p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={STEP_TITLES.length}
              stepTitles={STEP_TITLES}
              onStepClick={guardedGoToStep}
            />

            <AnimatePresence mode="wait">
              <div key={currentStep}>
                {renderCurrentStep()}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LoadingModal
        isOpen={modalStatus !== null}
        status={modalStatus || 'generating'}
        progress={progress}
        onDownload={handleDownload}
        onClose={handleCloseModal}
      />
    </div>
  );
}


