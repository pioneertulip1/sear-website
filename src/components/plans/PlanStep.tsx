import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { StepProps, PlanType } from './types'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function PlanStep({ state, onUpdate, onNext, onBack }: StepProps) {
  const getAvailablePlanTypes = (): PlanType[] => {
    switch (state.region) {
      case 'india':
      case 'singapore':
        return ['budget', 'budget+']
      case 'us-east':
        return ['budget']
      default:
        return ['budget']
    }
  }

  const getBudgetSpecs = () => {
    if (state.region === 'us-east') {
      return {
        cpu: 'Ryzen 9 5900x',
        cores: '4 Shared vCores',
        storage: '50GB NVMe SSD'
      }
    }
    return {
      cpu: 'Ampere® Altra® @ 3.0 GHz',
      cores: '2 Shared Logical Cores',
      storage: '25GB NVMe SSD Storage'
    }
  }

  const plans: Record<PlanType, {
    label: string;
    specs: {
      cpu: string;
      cores: string;
      storage: string;
    };
  }> = {
    'budget': {
      label: state.region === 'us-east' ? 'Budget (US)' : 'Budget',
      specs: getBudgetSpecs()
    },
    'budget+': {
      label: 'Budget+',
      specs: {
        cpu: 'AMD EPYC 7J13',
        cores: '2 Shared vCores',
        storage: '25GB NVMe SSD Storage'
      }
    }
  }

  const availablePlans = getAvailablePlanTypes()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Your Plan Type</h2>
      <RadioGroup
        value={state.planType}
        onValueChange={(value) => {
          const planType = value as PlanType
          onUpdate({ planType })
        }}
        className="grid grid-cols-1 gap-4"
      >
        {availablePlans.map((type) => (
          <Card key={type} className={`cursor-pointer transition-colors ${
            state.planType === type ? 'border-primary' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="flex-1 cursor-pointer space-y-2">
                  <div className="font-medium text-lg">
                    {plans[type].label}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{plans[type].specs.cpu}</p>
                    <p>{plans[type].specs.cores}</p>
                    <p>{plans[type].specs.storage}</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue to RAM Selection <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}