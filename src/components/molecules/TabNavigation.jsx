import Button from '@/components/atoms/Button';

      export default function TabNavigation({ currentStep, totalSteps, onStepChange }) {
        return (
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <Button
                key={index}
                onClick={() => onStepChange(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 
                  index < currentStep ? 'bg-secondary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        );
      }