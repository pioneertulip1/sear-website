import { FormStep } from "./types"
import { cn } from "@/lib/utils"

interface Props {
  currentStep: FormStep
}

const STEPS: { step: FormStep; label: string }[] = [
  { step: 'region', label: 'Location' },
  { step: 'plan', label: 'Plan' },
  { step: 'server', label: 'Server Type' },
  { step: 'cpuram', label: 'CPU/RAM' },
  { step: 'storage', label: 'Storage' },
  { step: 'checkout', label: 'Checkout' }
]

export function FormProgress({ currentStep }: Props) {
  const currentIndex = STEPS.findIndex(s => s.step === currentStep)
  
  return (
    <div className="mb-8">      
      <div className="flex justify-between">
        {STEPS.map(({ step, label }, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = step === currentStep
          
          return (
            <div
              key={step}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors relative",
                  {
                    "bg-primary text-primary-foreground": isCurrent,
                    "bg-primary/80 text-primary-foreground": isCompleted,
                    "bg-gray-200 text-gray-600": !isCurrent && !isCompleted
                  }
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center transition-colors",
                  {
                    "text-primary": isCurrent,
                    "text-primary/80": isCompleted,
                    "text-gray-500": !isCurrent && !isCompleted
                  }
                )}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}