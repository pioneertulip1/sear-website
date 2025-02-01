export type Region = 'india' | 'singapore' | 'us-east'
export type PlanType = 'budget' | 'budget+' | 'performance'
export type RAM = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '20'
export type Currency = 'USD' | 'PHP' | 'INR'
export type BillingPeriod = 'monthly' | 'quarterly'
export type FormStep = 'region' | 'plan' | 'ram' | 'billing' | 'checkout'

export const RAM_OPTIONS = {
  BUDGET_IN_SG: ['2', '3', '4', '5', '6', '7', '8', '10', '12', '16', '20'],
  BUDGET_PLUS_AND_US: ['4', '6', '8', '10', '12', '16', '20']
} as const

// This structure will be filled with actual links
export const CHECKOUT_LINKS: {
  india: {
    budget: Record<RAM, string>;
    'budget+': Record<RAM, string>;
  };
  singapore: {
    budget: Record<RAM, string>;
    'budget+': Record<RAM, string>;
  };
  'us-east': {
    budget: Record<RAM, string>;
  };
} = {
  india: {
    budget: {
      '2': 'https://billing.sear.host/checkout/config/7',
      '3': 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '4': 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '5': 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '6': 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '7': 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '8': 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '10': 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '12': 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '16': 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
      '20': 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146'
    },
    'budget+': {
      '4': 'https://billing.sear.host/checkout/config/11',
      '6': 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
      '8': 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
      '10': 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
      '12': 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
      '16': 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
      '20': 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154'
    }
  },
  singapore: {
    budget: {
      '2': 'https://billing.sear.host/checkout/config/7?config[10]=10&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '3': 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '4': 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '5': 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '6': 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '7': 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '8': 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '10': 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '12': 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '16': 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
      '20': 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146'
    },
    'budget+': {
      '4': 'https://billing.sear.host/checkout/config/11?config[36]=121&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '6': 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '8': 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '10': 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '12': 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '16': 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
      '20': 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154'
    }
  },
  'us-east': {
    budget: {
      '4': 'https://billing.sear.host/checkout/config/12',
      '6': 'https://billing.sear.host/checkout/config/12?config[44]=161&config[45]=168',
      '8': 'https://billing.sear.host/checkout/config/12?config[44]=162&config[45]=168',
      '10': 'https://billing.sear.host/checkout/config/12?config[44]=163&config[45]=168',
      '12': 'https://billing.sear.host/checkout/config/12?config[44]=164&config[45]=168',
      '16': 'https://billing.sear.host/checkout/config/12?config[44]=165&config[45]=168',
      '20': 'https://billing.sear.host/checkout/config/12?config[44]=166&config[45]=168'
    }
  }
}

export const getCheckoutLink = (region: Region, planType: PlanType, ram: RAM): string => {
  return CHECKOUT_LINKS[region]?.[planType]?.[ram] || ''
}

export interface FormState {
  region: Region
  planType: PlanType
  ram: RAM
  currency: Currency
  billingPeriod: BillingPeriod
}

export interface StepProps {
  state: FormState
  onUpdate: (updates: Partial<FormState>) => void
  onNext: () => void
  onBack?: () => void
}