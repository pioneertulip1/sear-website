import * as React from 'react'
import { Button } from "@/components/ui/button"
import { StepProps, getCheckoutLink, formatPrice, CPU_THREAD_PRICING, RAM_PRICING, STORAGE_PRICING, calculateComponentPrice } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PriceBreakdownItem {
  label: string
  basePrice: number
  type: 'cpu' | 'ram' | 'storage'
}

export function CheckoutStep({ state, onUpdate, onBack }: StepProps) {
  const [billingPeriod, setBillingPeriod] = React.useState(state.billingPeriod)
  
  React.useEffect(() => {
    setBillingPeriod(state.billingPeriod)
  }, [state.billingPeriod])

  const priceBreakdown: PriceBreakdownItem[] = [
    {
      label: `CPU (${state.cpuThreads} Thread${state.cpuThreads === '1' ? '' : 's'})`,
      basePrice: state.cpuThreads ? CPU_THREAD_PRICING[state.cpuThreads] : 0,
      type: 'cpu'
    },
    {
      label: `RAM (${state.ram}GB)`,
      basePrice: RAM_PRICING[state.ram],
      type: 'ram'
    },
    {
      label: `Storage (${state.storage}GB NVMe SSD)`,
      basePrice: state.storage ? STORAGE_PRICING[state.storage] : 0,
      type: 'storage'
    }
  ]

  const isQuarterly = billingPeriod === 'quarterly'
  
  const monthlySubtotal = priceBreakdown.reduce((sum, item) => sum + item.basePrice, 0)
  const discountedSubtotal = priceBreakdown.reduce(
    (sum, item) => sum + calculateComponentPrice(item.basePrice, billingPeriod),
    0
  )
  const periodTotal = isQuarterly ? discountedSubtotal * 3 : discountedSubtotal

  const handleBillingPeriodChange = React.useCallback((value: string) => {
    setBillingPeriod(value as 'monthly' | 'quarterly')
    onUpdate({ billingPeriod: value as 'monthly' | 'quarterly' })
  }, [onUpdate])

  const checkoutLink = getCheckoutLink({
    region: state.region,
    planType: state.planType,
    ram: state.ram,
    billingPeriod
  })

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Review Your Selection</h2>
        <p className="text-gray-600">Confirm your server configuration and proceed to checkout</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Region:</span>
              <span className="font-medium">{state.region}</span>
              
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{state.planType}</span>
              
              <span className="text-gray-600">Server Type:</span>
              <span className="font-medium">{state.serverType}</span>
            </div>

            <Separator />

            <div className="space-y-2">
              {priceBreakdown.map((item, index) => {
                const discountedPrice = calculateComponentPrice(item.basePrice, billingPeriod)
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <div className="text-right">
                      {isQuarterly && (
                        <>
                          <span className="text-gray-400 line-through mr-2">
                            {formatPrice(item.basePrice, 'month')}
                          </span>
                          <span className="text-green-600">
                            {formatPrice(discountedPrice, 'month')}
                          </span>
                        </>
                      )}
                      {!isQuarterly && (
                        <span>{formatPrice(item.basePrice, 'month')}</span>
                      )}
                    </div>
                  </div>
                )
              })}

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">Billing Period</h3>
                <RadioGroup
                  value={billingPeriod}
                  onValueChange={handleBillingPeriodChange}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="flex flex-col">
                      <span>Monthly</span>
                      <span className="text-sm text-gray-600">
                        {formatPrice(monthlySubtotal)} per month
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly" className="flex flex-col">
                      <span>Quarterly (10% off each component)</span>
                      <span className="text-sm text-gray-600">
                        {formatPrice(discountedSubtotal)} per month ({formatPrice(periodTotal)} billed every 3 months)
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className="my-4" />

              {isQuarterly ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Base Price</span>
                    <span className="text-gray-400 line-through">{formatPrice(monthlySubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discounted Monthly Price (10% off)</span>
                    <span>{formatPrice(discountedSubtotal)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Price</span>
                  <span>{formatPrice(monthlySubtotal)}</span>
                </div>
              )}

              <div className="flex justify-between font-medium text-base pt-2">
                <span>Total {isQuarterly ? '(3 months)' : '(monthly)'}</span>
                <span>{formatPrice(periodTotal)}</span>
              </div>

              {isQuarterly && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>You save</span>
                  <span>{formatPrice((monthlySubtotal - discountedSubtotal) * 3)} over 3 months</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <Button
          asChild
          className="w-full sm:w-auto"
        >
          <a
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Proceed to Checkout
          </a>
        </Button>
      </div>
    </div>
  )
}