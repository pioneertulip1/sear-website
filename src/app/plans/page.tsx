'use client'

import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress } from '@/components/plans/FormProgress'
import { RegionStep } from '@/components/plans/RegionStep'
import { PlanStep } from '@/components/plans/PlanStep'
import { RamStep } from '@/components/plans/RamStep'
import { BillingStep } from '@/components/plans/BillingStep'
import { CheckoutStep } from '@/components/plans/CheckoutStep'
import {
  FormStep,
  FormState,
  StepValidators,
  getNextStep,
  StepProps,
  Region,
  PlanType,
  RAM,
  BillingPeriod
} from '@/components/plans/types'

const STEPS = {
  region: RegionStep,
  plan: PlanStep,
  ram: RamStep,
  billing: BillingStep,
  checkout: CheckoutStep
} satisfies Record<FormStep, React.ComponentType<StepProps>>

// Load initial state from URL parameters
function getInitialState(): FormState {
  if (typeof window === 'undefined') {
    return {
      region: 'india',
      planType: 'budget',
      ram: '4',
      billingPeriod: 'monthly'
    }
  }

  const params = new URLSearchParams(window.location.search)
  
  return {
    region: (params.get('region') as Region) || 'india',
    planType: (params.get('plan') as PlanType) || 'budget',
    ram: (params.get('ram') as RAM) || '4',
    billingPeriod: (params.get('billing') as BillingPeriod) || 'monthly'
  }
}

function getInitialStep(): FormStep {
  if (typeof window === 'undefined') return 'region'
  const params = new URLSearchParams(window.location.search)
  const step = params.get('step') as FormStep | null
  return step && Object.keys(STEPS).includes(step) ? step : 'region'
}

export default function PlansPage() {
  const [step, setStep] = React.useState<FormStep>(getInitialStep)
  const [state, setState] = React.useState<FormState>(getInitialState)

  // Sync URL with form state
  React.useEffect(() => {
    const params = new URLSearchParams()
    params.set('step', step)
    if (state.region) params.set('region', state.region)
    if (state.planType) params.set('plan', state.planType)
    if (state.ram) params.set('ram', state.ram)
    if (state.billingPeriod) params.set('billing', state.billingPeriod)

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    )
  }, [state, step])

  const handleUpdateState = (updates: Partial<FormState>) => {
    setState(prev => {
      // Validate updates before applying
      if (!StepValidators[step].validateUpdate(prev, updates)) {
        return prev
      }

      const newState = { ...prev, ...updates }

      // Reset to budget plan if switching to US East
      if (updates.region === 'us-east' && prev.region !== 'us-east') {
        newState.planType = 'budget'
      }

      return newState
    })
  }

  const handleNext = () => {
    const nextStep = getNextStep(step, state)
    if (nextStep) {
      setStep(nextStep)
    }
  }

  const handleBack = () => {
    const stepOrder: FormStep[] = ['region', 'plan', 'ram', 'billing', 'checkout']
    const currentIndex = stepOrder.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1])
    }
  }

  // Get current step component and validation state
  const StepComponent = STEPS[step]
  const isValid = StepValidators[step].canProceed(state)
  const availableOptions = StepValidators[step].getAvailableOptions(state)

  return (
    <main className="min-h-screen">
      <div className="container px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
            Choose Your Hosting Plan
          </h1>
          <Card className="inline-block min-w-[800px]">
            <CardContent className="p-6 sm:p-8">
              <FormProgress currentStep={step} state={state} />
              <StepComponent
                state={state}
                onUpdate={handleUpdateState}
                onNext={handleNext}
                onBack={step !== 'region' ? handleBack : undefined}
                isValid={isValid}
                availableOptions={availableOptions}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
