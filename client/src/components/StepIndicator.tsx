interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { id: 1, label: "Cảm Nhận" },
    { id: 2, label: "Tính Cách" },
    { id: 3, label: "Tỏ Tình" },
  ];

  return (
    <div className="w-full mb-8 flex justify-between items-center relative">
      <div className="w-full bg-white/30 h-1 absolute"></div>
      
      {steps.map((step) => (
        <div key={step.id} className="step-circle z-10 flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${currentStep >= step.id 
                ? "bg-primary text-white" 
                : "bg-white text-primary border border-primary"}`}
          >
            {step.id}
          </div>
          <span className="text-xs mt-1 font-medium">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
