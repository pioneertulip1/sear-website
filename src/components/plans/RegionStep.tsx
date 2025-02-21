import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StepProps, Region, StepValidators } from './types'
import { ArrowRight, AlertTriangle } from 'lucide-react'

type RegionDetails = {
  value: Region
  label: string
  description: string
}

const REGIONS: RegionDetails[] = [
  {
    value: 'india',
    label: 'India',
    description: 'In Stock'
  },
  {
    value: 'singapore',
    label: 'Singapore',
    description: 'In Stock'
  },
  {
    value: 'us-east',
    label: 'US East',
    description: 'In Stock'
  }
] as const

export function RegionStep({ state, onUpdate, onNext, isValid = false, availableOptions }: StepProps) {
  const regions = (availableOptions as Region[]) || REGIONS.map(r => r.value)

  const handleRegionChange = React.useCallback((value: string) => {
    const region = value as Region
    if (StepValidators.region.validateUpdate(state, { region })) {
      onUpdate({ region })
    }
  }, [state, onUpdate])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Your Region</h2>
      
      <RadioGroup
        value={state.region}
        onValueChange={handleRegionChange}
        className="grid grid-cols-1 gap-4"
      >
        {regions.map((value) => {
          const details = REGIONS.find(r => r.value === value)
          if (!details) return null
          
          return (
            <Card 
              key={value} 
              className={`cursor-pointer ${
                state.region === value ? 'border-primary' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="flex-1 cursor-pointer">
                    <div className="font-medium">{details.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {details.description}
                    </div>
                  </Label>
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
            Please select a region to continue.
          </AlertDescription>
        </Alert>
      )}

      <Button 
        className="w-full" 
        onClick={onNext}
        disabled={!isValid}
      >
        <span className="hidden md:inline">Continue to Plan Selection</span>
        <span className="md:hidden">Continue</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}