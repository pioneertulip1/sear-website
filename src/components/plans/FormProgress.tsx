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

  const StepIndicator = ({ step, index, showName = true }: { 
    step: FormStep 
    index: number
    showName?: boolean
  }) => {
    const status = getStepStatus(step, index)
    const styles = getStepStyles(status)
    const stepInfo = STEPS.find(s => s.step === step)
    if (!stepInfo) return null

    return (
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.circle}`}>
          {status === 'completed' ? (
            <Check className="h-4 w-4" />
          ) : status === 'invalid' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            index + 1
          )}
        </div>
        {showName && (
          <span className={`ml-2 ${styles.text}`}>{stepInfo.name}</span>
        )}
      </div>
    )
  }

  return (
    <div className="mb-8">
      {/* Mobile view - only current step */}
      <div className="flex md:hidden justify-center">
        <StepIndicator 
          step={currentStep} 
          index={currentIndex} 
        />
      </div>

      {/* Desktop view - all steps with dividers */}
      <div className="hidden md:flex justify-between items-center">
        {STEPS.map(({ step }, index) => (
          <div key={step} className="flex items-center">
            <StepIndicator 
              step={step} 
              index={index} 
              showName={true}
            />
            {index < STEPS.length - 1 && (
              <div className={`h-px w-8 mx-2 ${
                getStepStatus(step, index) === 'completed' 
                  ? 'bg-primary' 
                  : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}