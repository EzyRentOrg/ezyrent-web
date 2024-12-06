'use client';

import { useEffect, useState } from 'react';
import SelectProfileType from './SelectProfileType';
import VerificationForm from './VerificationForm';
import BasicInfo from './BasicInfo';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import ClientLayout from '../clientLayout';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const [userType, setUserType] = useState<
    'Landlord' | 'Tenant' | 'Property Manager' | null
  >(null);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Retrieve existing values from localStorage
      const storedStep = localStorage.getItem('currentStep');
      const storedVerification = localStorage.getItem('isVerified');
      const storedUserType = localStorage.getItem('userType');

      // Update state with localStorage values if they exist
      if (storedStep) setCurrentStep(parseInt(storedStep));
      if (storedVerification) setIsVerified(JSON.parse(storedVerification));
      if (storedUserType)
        setUserType(
          storedUserType as 'Landlord' | 'Tenant' | 'Property Manager' | null
        );
    }
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentStep', String(currentStep));
      localStorage.setItem('isVerified', JSON.stringify(isVerified));
      localStorage.setItem('userType', userType ?? '');
    }
  }, [currentStep, isVerified, userType]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const steps = [
    {
      id: 1,
      title: 'Verify Email',
      component: (
        <VerificationForm
          onSuccess={() => {
            setIsVerified(true);
            handleNextStep();
          }}
        />
      )
    },
    {
      id: 2,
      title: 'Choose User Type',
      component: (
        <SelectProfileType
          onComplete={(type) => {
            setUserType(type);
            handleNextStep();
          }}
        />
      )
    },
    {
      id: 3,
      title: 'Basic Info',
      component: <BasicInfo />
    }
  ];

  const isStepCompleted = (stepId: number) => {
    if (stepId === 1) return isVerified;
    if (stepId === 2) return !!userType;
    return false;
  };

  return (
    <div className="py-6">
      <ClientLayout>
        <div>{steps[currentStep - 1].component}</div>
        <div className="flex justify-center mt-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full border border-[#7065F0] ${
                  isStepCompleted(step.id)
                    ? 'bg-[#F3F3F3] text-[#7065F0]'
                    : 'bg-[#7065F0]'
                } flex items-center justify-center text-white`}
              >
                {isStepCompleted(step.id) ? (
                  <Check size={20} className="text-[#7065F0]" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <Separator
                  orientation="horizontal"
                  className="bg-[#7065F0] w-9"
                />
              )}
            </div>
          ))}
        </div>
      </ClientLayout>
    </div>
  );
}
