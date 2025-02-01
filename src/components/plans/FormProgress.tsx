import { FormStep } from './types'

interface FormProgressProps {
  currentStep: FormStep
}

export function FormProgress({ currentStep }: FormProgressProps) {
  const steps: { name: string; step: FormStep }[] = [
    { name: 'Region', step: 'region' },
    { name: 'Plan', step: 'plan' },
    { name: 'RAM', step: 'ram' },
    { name: 'Billing', step: 'billing' },
    { name: 'Checkout', step: 'checkout' }
  ]

  return (
    <div className="flex justify-between mb-8">
      {steps.map(({ name, step }, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === currentStep
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          }`}>
            {index + 1}
          </div>
          <div className={`ml-2 ${
            step === currentStep
              ? 'text-primary font-medium'
              : 'text-muted-foreground'
          }`}>
            {name}
          </div>
        </div>
      ))}
    </div>
  )
}