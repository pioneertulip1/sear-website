import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { StepProps, STORAGE_PRICING, STORAGE_OPTIONS } from "./types"
import { formatPrice } from "./types"

export default function StorageStep({ state, onUpdate, onNext, onBack }: StepProps) {
  const storageIndex = STORAGE_OPTIONS.indexOf(state.storage || '50')
  
  const handleStorageChange = (value: number[]) => {
    const storage = STORAGE_OPTIONS[value[0]]
    onUpdate({ storage })
  }

  const storagePrice = state.storage ? STORAGE_PRICING[state.storage] : STORAGE_PRICING['50']

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Storage Amount</h2>
        <p className="text-gray-600">Choose your server&apos;s NVMe SSD storage capacity</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Storage Space</h3>
              <span className="text-primary font-medium">{formatPrice(storagePrice, 'month')}</span>
            </div>
            
            <div className="px-2">
              <Slider
                defaultValue={[storageIndex]}
                max={STORAGE_OPTIONS.length - 1}
                step={1}
                onValueChange={handleStorageChange}
              />
            </div>
            
            <div className="flex justify-between text-sm px-1">
              <span>50GB</span>
              <span>200GB</span>
            </div>

            <div className="text-center">
              <span className="text-sm font-medium">{state.storage || '50'}GB NVMe SSD</span>
            </div>
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
          disabled={!state.storage}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}