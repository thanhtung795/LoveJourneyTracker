import { useState, useEffect } from "react";
import HeartBackground from "@/components/HeartBackground";
import StepIndicator from "@/components/StepIndicator";
import FirstImpression from "@/pages/FirstImpression";
import Characteristics from "@/pages/Characteristics";
import Confession from "@/pages/Confession";
import Result from "@/pages/Result";
import { useQuery } from "@tanstack/react-query";

const ConfessionApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confessionResponse, setConfessionResponse] = useState<'accepted' | 'rejected' | null>(null);

  // Check if there's a saved result in localStorage first
  useEffect(() => {
    const localResult = localStorage.getItem('confessionResult');
    if (localResult) {
      setConfessionResponse(localResult as 'accepted' | 'rejected');
      setCurrentStep(4); // Jump to result screen
    }
  }, []);

  // Check if there's a saved result on server as backup
  const { data: savedResult } = useQuery({
    queryKey: ['/api/confession/check-result'],
    enabled: !localStorage.getItem('confessionResult'), // Only fetch if not in localStorage
  });

  // Định nghĩa kiểu dữ liệu cho savedResult
  interface SavedResultType {
    result: 'accepted' | 'rejected' | null;
    timestamp?: string;
    success?: boolean;
  }
  
  // Load existing server result if available and not in localStorage
  useEffect(() => {
    if (savedResult) {
      const typedResult = savedResult as SavedResultType;
      
      if (typedResult.result && !localStorage.getItem('confessionResult')) {
        setConfessionResponse(typedResult.result as 'accepted' | 'rejected');
        setCurrentStep(4); // Jump to result screen
        
        // Update localStorage with server data
        localStorage.setItem('confessionResult', typedResult.result);
        if (typedResult.timestamp) {
          localStorage.setItem('confessionTimestamp', typedResult.timestamp);
        }
      }
    }
  }, [savedResult]);

  const handleNextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfessionResponse = (response: 'accepted' | 'rejected') => {
    setConfessionResponse(response);
    setCurrentStep(4);
  };

  const handleRestart = () => {
    // Xóa kết quả trong localStorage khi restart
    localStorage.removeItem('confessionResult');
    localStorage.removeItem('confessionTimestamp');
    setCurrentStep(1);
    setConfessionResponse(null);
  };

  return (
    <div className="font-poppins text-dark overflow-x-hidden bg-gradient-to-b from-[#FFF0F5] to-[#FFE6F0] min-h-screen">
      <HeartBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-md min-h-screen flex flex-col justify-center items-center relative z-10">
        {currentStep < 4 && <StepIndicator currentStep={currentStep} />}
        
        <div className="w-full">
          {currentStep === 1 && (
            <FirstImpression onNext={handleNextStep} />
          )}
          
          {currentStep === 2 && (
            <Characteristics onNext={handleNextStep} onPrev={handlePrevStep} />
          )}
          
          {currentStep === 3 && (
            <Confession onNext={handleNextStep} onPrev={handlePrevStep} onResponse={handleConfessionResponse} />
          )}
          
          {currentStep === 4 && (
            <Result result={confessionResponse} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfessionApp;
