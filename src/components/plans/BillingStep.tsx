import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepProps, Currency, BillingPeriod } from './types'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function BillingStep({ state, onUpdate, onNext, onBack }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Billing Options</h2>
      
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select 
            value={state.currency} 
            onValueChange={(value: Currency) => onUpdate({ currency: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="PHP">PHP (₱)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Billing Period</Label>
          <Select 
            value={state.billingPeriod} 
            onValueChange={(value: BillingPeriod) => onUpdate({ billingPeriod: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly (10% off)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="font-medium">
                {state.planType.charAt(0).toUpperCase() + state.planType.slice(1)} Plan - {state.region.replace('-', ' ')}
              </div>
              <div className="text-sm text-muted-foreground">
                {state.ram}GB RAM
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}