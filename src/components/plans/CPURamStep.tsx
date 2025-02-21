import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CPUThreads, RAM, StepProps, CPU_THREAD_PRICING, RAM_PRICING, REGION_PLAN_CONFIG, US_EAST_FIXED } from "./types"
import { formatPrice } from "./types"

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
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
          {showCPUSlider ? 'Select CPU & RAM' : 'Select RAM'}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          {showCPUSlider 
            ? "Choose your server's processing power and memory"
            : "Choose your server's memory allocation"}
        </p>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6 space-y-8">
          {/* CPU Slider - Only show for non-US regions */}
          {showCPUSlider && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-base md:text-lg font-semibold text-foreground">CPU Threads</h3>
                <span className="text-primary font-medium">{formatPrice(cpuPrice, 'month')}</span>
              </div>
              <div className="px-2 py-4 md:py-2 touch-target-expand">
                <Slider
                  defaultValue={[cpuIndex]}
                  max={CPU_OPTIONS.length - 1}
                  step={1}
                  onValueChange={handleCPUChange}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm px-1 text-muted-foreground">
                <span>1 Thread</span>
                <span>8 Threads</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-foreground">
                  {state.cpuThreads || 1} Thread{(state.cpuThreads || '1') !== '1' ? 's' : ''}
                </span>
              </div>
            </div>
          )}

          {/* RAM Slider */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-semibold text-foreground">RAM Amount</h3>
              <span className="text-primary font-medium">{formatPrice(ramPrice, 'month')}</span>
            </div>
            <div className="px-2 py-4 md:py-2 touch-target-expand">
              <Slider
                defaultValue={[ramIndex]}
                max={availableRAMOptions.length - 1}
                step={1}
                onValueChange={handleRAMChange}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-sm px-1 text-muted-foreground">
              <span>{availableRAMOptions[0]}GB</span>
              <span>{availableRAMOptions[availableRAMOptions.length - 1]}GB</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-foreground">
                {state.ram || availableRAMOptions[0]}GB RAM
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="font-semibold text-base md:text-lg text-foreground">Total Monthly Price:</span>
            <span className="text-xl md:text-2xl font-bold text-primary">{formatPrice(totalPrice, 'month')}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4 md:px-0">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto order-2 md:order-1"
          >
            Back
          </Button>
        )}
        <Button 
          onClick={onNext}
          className="w-full md:w-auto order-1 md:order-2"
          disabled={!state.ram || (showCPUSlider && !state.cpuThreads)}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}