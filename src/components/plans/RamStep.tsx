import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { StepProps, RAM_OPTIONS } from './types'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function RamStep({ state, onUpdate, onNext, onBack }: StepProps) {
  const ramOptions = (state.region === 'us-east' || state.planType === 'budget+')
    ? RAM_OPTIONS.BUDGET_PLUS_AND_US
    : RAM_OPTIONS.BUDGET_IN_SG;

  const currentRamIndex = ramOptions.indexOf(state.ram);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select RAM Configuration</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <Label>RAM Amount</Label>
          <div className="text-2xl font-bold">{state.ram}GB</div>
        </div>

        <Card>
          <CardContent className="pt-6 px-6">
            <Slider
              value={[currentRamIndex]}
              max={ramOptions.length - 1}
              step={1}
              onValueChange={(value) => {
                const newRam = ramOptions[value[0]];
                onUpdate({ ram: newRam });
              }}
              className="py-4"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {ramOptions.map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <div className="h-1 w-px bg-border mb-1" />
                  {value}GB
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground mt-2">
          Select the amount of RAM for your server. More RAM allows for better performance and multitasking capabilities.
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue to Billing Options <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}