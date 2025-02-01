'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress } from '@/components/plans/FormProgress'
import { RegionStep } from '@/components/plans/RegionStep'
import { PlanStep } from '@/components/plans/PlanStep'
import { RamStep } from '@/components/plans/RamStep'
import { BillingStep } from '@/components/plans/BillingStep'
import { CheckoutStep } from '@/components/plans/CheckoutStep'
import { FormStep, FormState, RAM } from '@/components/plans/types'

export default function PlansPage() {
  const [step, setStep] = useState<FormStep>('region')
  const [state, setState] = useState<FormState>({
    region: 'india',
    planType: 'budget',
    ram: '4' as RAM,
    currency: 'USD',
    billingPeriod: 'monthly'
  })

  const handleUpdateState = (updates: Partial<FormState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates }
      
      // Reset to budget plan if switching to US East
      if (updates.region === 'us-east' && prev.region !== 'us-east') {
        newState.planType = 'budget'
      }
      
      return newState
    })
  }

  const handleNext = () => {
    switch (step) {
      case 'region':
        setStep('plan')
        break
      case 'plan':
        setStep('ram')
        break
      case 'ram':
        setStep('billing')
        break
      case 'billing':
        setStep('checkout')
        break
    }
  }

  const handleBack = () => {
    switch (step) {
      case 'plan':
        setStep('region')
        break
      case 'ram':
        setStep('plan')
        break
      case 'billing':
        setStep('ram')
        break
      case 'checkout':
        setStep('billing')
        break
    }
  }

  return (
    <main className="container mx-auto py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Hosting Plan</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <FormProgress currentStep={step} />

          {step === 'region' && (
            <RegionStep 
              state={state}
              onUpdate={handleUpdateState}
              onNext={handleNext}
            />
          )}

          {step === 'plan' && (
            <PlanStep
              state={state}
              onUpdate={handleUpdateState}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 'ram' && (
            <RamStep
              state={state}
              onUpdate={handleUpdateState}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 'billing' && (
            <BillingStep
              state={state}
              onUpdate={handleUpdateState}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 'checkout' && (
            <CheckoutStep
              state={state}
              onUpdate={handleUpdateState}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </CardContent>
      </Card>
    </main>
  )
}
