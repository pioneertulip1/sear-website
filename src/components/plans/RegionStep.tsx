import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { StepProps, Region } from './types'
import { ArrowRight } from 'lucide-react'

export function RegionStep({ state, onUpdate, onNext }: StepProps) {
  const regions: { value: Region; label: string; description: string }[] = [
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
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Your Region</h2>
      <RadioGroup
        value={state.region}
        onValueChange={(value) => {
          const region = value as Region
          onUpdate({ region })
        }}
        className="grid grid-cols-1 gap-4"
      >
        {regions.map(({ value, label, description }) => (
          <Card key={value} className={`cursor-pointer transition-colors ${
            state.region === value ? 'border-primary' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-muted-foreground">
                    {description}
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      <Button className="w-full" onClick={onNext}>
        Continue to Plan Selection <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}