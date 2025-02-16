import * as React from 'react'
import { FormStep } from "./types"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface Props {
  currentStep: FormStep
  state?: { region?: string }
}

const ALL_STEPS: { step: FormStep; label: string }[] = [
  { step: 'region', label: 'Location' },
  { step: 'plan', label: 'Plan' },
  { step: 'server', label: 'Server Type' },
  { step: 'cpuram', label: 'CPU/RAM' },
  { step: 'storage', label: 'Storage' },
  { step: 'checkout', label: 'Checkout' }
]

export function FormProgress({ currentStep, state }: Props) {
  const STEPS = React.useMemo(() => {
    if (state?.region === 'us-east') {
      return ALL_STEPS.filter(step => step.step !== 'storage')
    }
    return ALL_STEPS
  }, [state?.region])
  const isMobile = useIsMobile()
  const currentIndex = STEPS.findIndex(s => s.step === currentStep)
  
  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
              {currentIndex + 1}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary">
                {STEPS[currentIndex].label}
              </span>
              <span className="text-xs text-muted-foreground">
                Step {currentIndex + 1} of {STEPS.length}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            {currentIndex > 0 && (
              <span className="flex items-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            )}
            {currentIndex < STEPS.length - 1 && (
              <span className="flex items-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 px-2">      
      <div className="flex justify-between">
        {STEPS.map(({ step, label }, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = step === currentStep
          
          return (
            <div
              key={step}
              className="flex flex-col items-center relative"
            >
                <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  {
                  "bg-white text-primary": isCurrent,
                  "bg-purple-500 text-white": isCompleted,
                  "bg-gray-500 text-white": !isCurrent && !isCompleted
                  }
                )}
                >
                {index + 1}
                </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center transition-colors whitespace-nowrap",
                  {
                    "text-primary": isCurrent,
                    "text-primary/80": isCompleted,
                    "text-muted-foreground": !isCurrent && !isCompleted
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