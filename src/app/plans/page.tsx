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
  Currency,
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
      currency: 'USD',
      billingPeriod: 'monthly'
    }
  }

  const params = new URLSearchParams(window.location.search)
  
  const region = params.get('region') as Region | null
  const planType = params.get('plan') as PlanType | null
  const ram = params.get('ram') as RAM | null
  const currency = params.get('currency') as Currency | null
  const billingPeriod = params.get('billing') as BillingPeriod | null

  return {
    region: region || 'india',
    planType: planType || 'budget',
    ram: ram || '4',
    currency: currency || 'USD',
    billingPeriod: billingPeriod || 'monthly'
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
    if (state.currency) params.set('currency', state.currency)

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
    <main className="container mx-auto py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Hosting Plan</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
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
    </main>
  )
}
