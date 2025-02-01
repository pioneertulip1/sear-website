import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StepProps, getCheckoutLink } from './types'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export function CheckoutStep({ state, onBack }: StepProps) {
  const checkoutLink = getCheckoutLink(state.region, state.planType, state.ram)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review and Checkout</h2>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Region</div>
              <div className="font-medium capitalize">{state.region.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Plan Type</div>
              <div className="font-medium capitalize">{state.planType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">RAM</div>
              <div className="font-medium">{state.ram}GB</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Billing</div>
              <div className="font-medium">
                {state.billingPeriod === 'monthly' ? 'Monthly' : 'Quarterly (10% off)'}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Currency</div>
              <div className="font-medium">{state.currency}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={() => window.location.href = checkoutLink}
          className="w-full"
          disabled={!checkoutLink}
        >
          Proceed to Checkout <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}