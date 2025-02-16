import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StepProps, PlanType, PLAN_SPECS, StepValidators } from './types'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'

type PlanInfo = {
  type: PlanType
  baseLabel: string
}

const PLAN_INFO: PlanInfo[] = [
  { type: 'budget', baseLabel: 'Budget' },
  { type: 'budget+', baseLabel: 'Budget+' }
] as const

export function PlanStep({ state, onUpdate, onNext, onBack, isValid = false, availableOptions }: StepProps) {
  const availablePlans = (availableOptions as PlanType[]) || []

  const getPlanLabel = React.useCallback((type: PlanType) => {
    const info = PLAN_INFO.find(p => p.type === type)
    if (!info) return type
    return type === 'budget' && state.region === 'us-east' 
      ? `${info.baseLabel} (US)` 
      : info.baseLabel
  }, [state.region])

  const handlePlanChange = React.useCallback((value: string) => {
    const planType = value as PlanType
    if (StepValidators.plan.validateUpdate(state, { planType })) {
      onUpdate({ planType })
    }
  }, [state, onUpdate])

  const getCPUSpec = React.useCallback((type: PlanType) => {
    return PLAN_SPECS[state.region]?.[type]?.cpu ?? '-'
  }, [state.region])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Your Plan Type</h2>
      
      <RadioGroup
        value={state.planType}
        onValueChange={handlePlanChange}
        className="grid grid-cols-1 gap-4"
      >
        {availablePlans.map((type) => {
          const cpuSpec = getCPUSpec(type)
          return (
            <Card 
              key={type} 
              className={`${
                state.planType === type ? 'border-primary' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center flex-1 space-x-4">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="flex-1 cursor-pointer space-y-2">
                      <div className="font-medium text-lg">
                        {getPlanLabel(type)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {cpuSpec}
                      </div>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </RadioGroup>

      {!isValid && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please select a valid plan type for your region.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!isValid}
        >
          <span className="hidden md:inline">Continue to Server Type</span>
          <span className="md:hidden">Continue</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}