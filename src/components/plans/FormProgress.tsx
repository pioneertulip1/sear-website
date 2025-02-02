import * as React from 'react'
import { FormStep, FormState, StepValidators } from './types'
import { Check, AlertCircle } from 'lucide-react'

interface FormProgressProps {
  currentStep: FormStep
  state: FormState
}

type StepStatus = 'completed' | 'invalid' | 'valid' | 'pending'

const STEPS: Array<{ name: string; step: FormStep }> = [
  { name: 'Region', step: 'region' },
  { name: 'Plan', step: 'plan' },
  { name: 'RAM', step: 'ram' },
  { name: 'Billing', step: 'billing' },
  { name: 'Checkout', step: 'checkout' }
] as const

export function FormProgress({ currentStep, state }: FormProgressProps) {
  const stepOrder = STEPS.map(s => s.step)
  const currentIndex = stepOrder.indexOf(currentStep)

  const getStepStatus = (step: FormStep, index: number): StepStatus => {
    // Previous steps should be completed
    if (index < currentIndex) {
      return StepValidators[step].canProceed(state)
        ? 'completed'
        : 'invalid'
    }
    // Current step
    if (index === currentIndex) {
      return StepValidators[step].canProceed(state)
        ? 'valid'
        : 'pending'
    }
    // Future steps
    return 'pending'
  }

  const getStepStyles = (status: StepStatus): {
    circle: string
    text: string
  } => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-primary text-primary-foreground',
          text: 'text-primary font-medium'
        }
      case 'invalid':
        return {
          circle: 'bg-destructive text-destructive-foreground',
          text: 'text-destructive font-medium'
        }
      case 'valid':
        return {
          circle: 'bg-primary text-primary-foreground',
          text: 'text-primary font-medium'
        }
      default:
        return {
          circle: 'bg-muted',
          text: 'text-muted-foreground'
        }
    }
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between mb-8 gap-y-4">
      {STEPS.map(({ name, step }, index) => {
        const status = getStepStatus(step, index)
        const styles = getStepStyles(status)

        return (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.circle}`}>
              {status === 'completed' ? (
                <Check className="h-4 w-4" />
              ) : status === 'invalid' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <div className="hidden sm:block" >
              <span className={`ml-2 ${styles.text}`}>{name}</span>
            </div>
            <div className="block sm:hidden">
              <span className={`ml-2 ${styles.text}`}>
                {name.length > 4 ? name.substring(0, 4) + '...' : name}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`h-px w-6 sm:w-12 mx-1 sm:mx-2 ${
                status === 'completed' ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}