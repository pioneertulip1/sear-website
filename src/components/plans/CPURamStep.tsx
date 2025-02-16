import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CPUThreads, RAM, StepProps, CPU_THREAD_PRICING, RAM_PRICING, REGION_PLAN_CONFIG, US_EAST_FIXED } from "./types"
import { formatPrice } from "./types"
import { Separator } from "@/components/ui/separator"

const CPU_OPTIONS = Object.keys(CPU_THREAD_PRICING) as CPUThreads[]

export default function CPURamStep({ state, onUpdate, onNext, onBack }: StepProps) {
  const availableRAMOptions = state.region && state.planType 
    ? [...REGION_PLAN_CONFIG[state.region].ramOptions[state.planType]] as RAM[]
    : []

  const cpuIndex = CPU_OPTIONS.indexOf(state.cpuThreads || '1')
  const ramIndex = availableRAMOptions.indexOf(state.ram || availableRAMOptions[0])

  // Set fixed CPU threads for US East region
  React.useEffect(() => {
    if (state.region === 'us-east' && state.cpuThreads !== US_EAST_FIXED.cpuThreads) {
      onUpdate({ cpuThreads: US_EAST_FIXED.cpuThreads })
    }
  }, [state.region, state.cpuThreads, onUpdate])

  const handleCPUChange = (value: number[]) => {
    const threads = CPU_OPTIONS[value[0]]
    onUpdate({ cpuThreads: threads })
  }

  const handleRAMChange = (value: number[]) => {
    const ram = availableRAMOptions[value[0]]
    onUpdate({ ram })
  }

  const cpuPrice = state.cpuThreads ? CPU_THREAD_PRICING[state.cpuThreads] : 0
  const ramPrice = state.ram && state.region ? RAM_PRICING(state.region, state.ram) : 0
  const totalPrice = state.region === 'us-east' ? ramPrice : cpuPrice + ramPrice

  const showCPUSlider = state.region !== 'us-east'

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {showCPUSlider ? 'Select CPU & RAM' : 'Select RAM'}
        </h2>
        <p className="text-gray-600">
          {showCPUSlider 
            ? "Choose your server's processing power and memory"
            : "Choose your server's memory allocation"}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* CPU Slider - Only show for non-US regions */}
          {showCPUSlider && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">CPU Threads</h3>
                  <span className="text-primary font-medium">{formatPrice(cpuPrice, 'month')}</span>
                </div>
                <div className="px-2">
                  <Slider
                    defaultValue={[cpuIndex]}
                    max={CPU_OPTIONS.length - 1}
                    step={1}
                    onValueChange={handleCPUChange}
                  />
                </div>
                <div className="flex justify-between text-sm px-1">
                  <span>1 Thread</span>
                  <span>8 Threads</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">
                    {state.cpuThreads || 1} Thread{(state.cpuThreads || '1') !== '1' ? 's' : ''}
                  </span>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* RAM Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">RAM Amount</h3>
              <span className="text-primary font-medium">{formatPrice(ramPrice, 'month')}</span>
            </div>
            <div className="px-2">
              <Slider
                defaultValue={[ramIndex]}
                max={availableRAMOptions.length - 1}
                step={1}
                onValueChange={handleRAMChange}
              />
            </div>
            <div className="flex justify-between text-sm px-1">
              <span>{availableRAMOptions[0]}GB</span>
              <span>{availableRAMOptions[availableRAMOptions.length - 1]}GB</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium">{state.ram || availableRAMOptions[0]}GB RAM</span>
            </div>
          </div>

          <Separator />

          {/* Total Price */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold">Total Monthly Price:</span>
            <span className="text-lg font-bold text-primary">{formatPrice(totalPrice, 'month')}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto"
          >
            Back
          </Button>
        )}
        <Button 
          onClick={onNext}
          className="w-full md:w-auto"
          disabled={!state.ram || (showCPUSlider && !state.cpuThreads)}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}