'use client'

import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress } from '@/components/plans/FormProgress'
import { RegionStep } from '@/components/plans/RegionStep'
import { PlanStep } from '@/components/plans/PlanStep'
import ServerTypeStep from '@/components/plans/ServerTypeStep'
import CPURamStep from '@/components/plans/CPURamStep'
import StorageStep from '@/components/plans/StorageStep'
import { CheckoutStep } from '@/components/plans/CheckoutStep'
import {
  FormStep,
  FormState,
  StepValidators,
  StepProps,
  Region,
  PlanType,
  RAM,
  CPUThreads,
  Storage,
  ServerType
} from '@/components/plans/types'
import { useIsMobile } from '@/hooks/use-mobile'

const STEPS = {
  region: RegionStep,
  plan: PlanStep,
  server: ServerTypeStep,
  cpuram: CPURamStep,
  storage: StorageStep,
  checkout: CheckoutStep
} satisfies Record<FormStep, React.ComponentType<StepProps>>

// Load initial state from URL parameters
function getInitialState(): FormState {
  if (typeof window === 'undefined') {
    return {
      region: 'india',
      planType: 'budget',
      serverType: 'PaperMC',
      cpuThreads: '2',
      ram: '4',
      storage: '50',
      billingPeriod: 'monthly'
    }
  }

  const params = new URLSearchParams(window.location.search)
  
  return {
    region: (params.get('region') as Region) || 'india',
    planType: (params.get('plan') as PlanType) || 'budget',
    serverType: (params.get('server') as ServerType) || 'PaperMC',
    cpuThreads: (params.get('cpu') as CPUThreads) || '2',
    ram: (params.get('ram') as RAM) || '4',
    storage: (params.get('storage') as Storage) || '50',
    billingPeriod: (params.get('billing') as 'monthly' | 'quarterly') || 'monthly'
  }
}

// Get initial step from URL or start at region
function getInitialStep(): FormStep {
  if (typeof window === 'undefined') return 'region'
  const params = new URLSearchParams(window.location.search)
  const step = params.get('step') as FormStep | null
  return step && Object.keys(STEPS).includes(step) ? step : 'region'
}

// Define step order for navigation
const STEP_ORDER: FormStep[] = ['region', 'plan', 'server', 'cpuram', 'storage', 'checkout']

export default function PlansPage() {
  const isMobile = useIsMobile()
  const [step, setStep] = React.useState<FormStep>(getInitialStep)
  const [state, setState] = React.useState<FormState>(getInitialState)

  // Sync URL with form state
  React.useEffect(() => {
    const params = new URLSearchParams()
    params.set('step', step)
    if (state.region) params.set('region', state.region)
    if (state.planType) params.set('plan', state.planType)
    if (state.serverType) params.set('server', state.serverType)
    if (state.cpuThreads) params.set('cpu', state.cpuThreads)
    if (state.ram) params.set('ram', state.ram)
    if (state.storage) params.set('storage', state.storage)
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
    const currentIndex = STEP_ORDER.indexOf(step)
    
    if (currentIndex === -1 || !StepValidators[step].canProceed(state)) {
      return
    }

    // Skip storage step for US East
    if (state.region === 'us-east' && STEP_ORDER[currentIndex + 1] === 'storage') {
      setStep('checkout')
      return
    }

    const nextStep = STEP_ORDER[currentIndex + 1]
    if (nextStep) {
      setStep(nextStep)
      // Scroll to top on mobile when changing steps
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handleBack = () => {
    const currentIndex = STEP_ORDER.indexOf(step)
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1])
      // Scroll to top on mobile when changing steps
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // Get current step component and validation state
  const StepComponent = STEPS[step]
  const isValid = StepValidators[step].canProceed(state)
  const availableOptions = StepValidators[step].getAvailableOptions(state)

  return (
    <main className="min-h-screen flex items-start md:items-center justify-center py-4 md:py-8 bg-background">
      <div className="container px-0 md:px-6 mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 px-4 text-foreground">
            Choose Your Hosting Plan
          </h1>
          <Card className="w-full md:max-w-[800px] rounded-none md:rounded-lg shadow-sm md:shadow bg-card">
            <CardContent className="p-4 md:p-8">
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
