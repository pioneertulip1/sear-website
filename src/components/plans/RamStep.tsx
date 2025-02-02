import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StepProps, RAM, StepValidators, calculatePrice, formatPrice } from './types'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export function RamStep({ state, onUpdate, onNext, onBack, isValid = false, availableOptions }: StepProps) {
  const isMobile = useIsMobile()
  const ramOptions = React.useMemo(() => (availableOptions as RAM[]) || [], [availableOptions])
  const currentRamIndex = ramOptions.indexOf(state.ram)

  const handleRamChange = React.useCallback((values: number[]) => {
    const value = values[0]
    if (value >= 0 && value < ramOptions.length) {
      const newRam = ramOptions[value]
      if (StepValidators.ram.validateUpdate(state, { ram: newRam })) {
        onUpdate({ ram: newRam })
      }
    }
  }, [ramOptions, state, onUpdate])

  const handleSelectChange = React.useCallback((value: string) => {
    const newRam = parseInt(value, 10) as RAM
    if (StepValidators.ram.validateUpdate(state, { ram: newRam })) {
      onUpdate({ ram: newRam })
    }
  }, [state, onUpdate])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select RAM Configuration</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <Label>RAM Amount</Label>
          <div className="flex items-baseline gap-4 flex-wrap">
            <div className="text-2xl font-bold">{state.ram}GB</div>
            <div className="text-lg font-semibold text-muted-foreground">
              {formatPrice(calculatePrice(state), 'month')}
            </div>
          </div>
        </div>

        <Card>
          <CardContent className={cn("pt-6", isMobile ? "px-4" : "px-6")}>
            {isMobile ? (
              <Select
                value={state.ram.toString()}
                onValueChange={handleSelectChange}
                disabled={ramOptions.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select RAM" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {ramOptions.map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}GB
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            ) : (
              <>
                <Slider
                  value={currentRamIndex >= 0 ? [currentRamIndex] : [0]}
                  max={Math.max(0, ramOptions.length - 1)}
                  step={1}
                  onValueChange={handleRamChange}
                  className="py-4"
                  disabled={ramOptions.length === 0}
                />
                
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  {ramOptions.map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <div className="h-1 w-px bg-border mb-1" />
                      {value}GB
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {!isValid && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {ramOptions.length === 0
                ? "No RAM options available for the selected plan."
                : "Please select a valid RAM configuration."}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="w-full sm:w-auto"
        >
          Continue to Billing Options <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}