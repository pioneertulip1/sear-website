// Basic types
export type Region = 'india' | 'singapore' | 'us-east'
export type PlanType = 'budget' | 'budget+'
export type RAM = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '20'
export type Currency = 'USD' | 'PHP' | 'INR'
export type BillingPeriod = 'monthly' | 'quarterly'
export type FormStep = 'region' | 'plan' | 'ram' | 'billing' | 'checkout'

// Complex types
export interface FormState {
  region: Region
  planType: PlanType
  ram: RAM
  billingPeriod: BillingPeriod
}

export interface StepProps {
  state: FormState
  onUpdate: (updates: Partial<FormState>) => void
  onNext: () => void
  onBack?: () => void
  isValid?: boolean
  availableOptions?: unknown
}

export interface StepValidation {
  canProceed: (state: FormState) => boolean
  getAvailableOptions: (state: FormState) => unknown
  validateUpdate: (state: FormState, update: Partial<FormState>) => boolean
}

export type PlanSpecs = {
  cpu: string
  cores: string
  storage: string
}

type RegionPlanSpecs = {
  [R in Region]: {
    [P in PlanType]?: PlanSpecs;
  };
};

export type PricingStructure = {
  [R in Region]: {
    [P in PlanType]?: number;
  };
};

// Constants
export const PRICING_PER_GB: PricingStructure = {
  'india': {
    'budget': 1.5,
    'budget+': 2.0
  },
  'singapore': {
    'budget': 1.5,
    'budget+': 2.0
  },
  'us-east': {
    'budget': 0.75
  }
};

export const PLAN_SPECS: RegionPlanSpecs = {
  'us-east': {
    budget: {
      cpu: 'Ryzen 9 5900x',
      cores: '4 Shared vCores',
      storage: '50GB NVMe SSD'
    }
  },
  india: {
    budget: {
      cpu: 'Ampere® Altra® @ 3.0 GHz',
      cores: '2 Shared Logical Cores',
      storage: '25GB NVMe SSD Storage'
    },
    'budget+': {
      cpu: 'AMD EPYC 7J13',
      cores: '2 Shared vCores',
      storage: '25GB NVMe SSD Storage'
    }
  },
  singapore: {
    budget: {
      cpu: 'Ampere® Altra® @ 3.0 GHz',
      cores: '2 Shared Logical Cores',
      storage: '25GB NVMe SSD Storage'
    },
    'budget+': {
      cpu: 'AMD EPYC 7J13',
      cores: '2 Shared vCores',
      storage: '25GB NVMe SSD Storage'
    }
  }
}

// Region plan configuration
type AvailableRAM = readonly RAM[]
type PlanRAMOptions = Record<PlanType, AvailableRAM>
type RegionConfig = {
  availablePlans: readonly PlanType[]
  ramOptions: PlanRAMOptions
}

export const REGION_PLAN_CONFIG: Record<Region, RegionConfig> = {
  india: {
    availablePlans: ['budget', 'budget+'],
    ramOptions: {
      budget: ['2', '3', '4', '5', '6', '7', '8', '10', '12', '16', '20'],
      ['budget+']: ['4', '6', '8', '10', '12', '16', '20']
    }
  },
  singapore: {
    availablePlans: ['budget', 'budget+'],
    ramOptions: {
      budget: ['2', '3', '4', '5', '6', '7', '8', '10', '12', '16', '20'],
      ['budget+']: ['4', '6', '8', '10', '12', '16', '20']
    }
  },
  'us-east': {
    availablePlans: ['budget'],
    ramOptions: {
      budget: ['4', '6', '8', '10', '12', '16', '20'],
      ['budget+']: [] // Empty array for non-available plan
    }
  }
} as const

// Form state
export interface FormState {
  region: Region
  planType: PlanType
  ram: RAM
  billingPeriod: BillingPeriod
}

// Step props
export interface StepProps {
  state: FormState
  onUpdate: (updates: Partial<FormState>) => void
  onNext: () => void
  onBack?: () => void
  isValid?: boolean
  availableOptions?: unknown
}

// Validation functions
export const isValidPlanForRegion = (region: Region, plan: PlanType): boolean => {
  return REGION_PLAN_CONFIG[region].availablePlans.includes(plan)
}

export const isValidRAMForPlan = (region: Region, plan: PlanType, ram: RAM): boolean => {
  return REGION_PLAN_CONFIG[region].ramOptions[plan].includes(ram)
}

// Step validation
export interface StepValidation {
  canProceed: (state: FormState) => boolean
  getAvailableOptions: (state: FormState) => unknown
  validateUpdate: (state: FormState, update: Partial<FormState>) => boolean
}

export const StepValidators: Record<FormStep, StepValidation> = {
  region: {
    canProceed: (state) => Boolean(state.region),
    getAvailableOptions: () => Object.keys(REGION_PLAN_CONFIG),
    validateUpdate: (_, update) => !update.region || (update.region in REGION_PLAN_CONFIG)
  },
  plan: {
    canProceed: (state) => Boolean(
      state.region &&
      state.planType &&
      isValidPlanForRegion(state.region, state.planType)
    ),
    getAvailableOptions: (state) =>
      state.region ? REGION_PLAN_CONFIG[state.region].availablePlans : [],
    validateUpdate: (state, update) =>
      !update.planType || (
        state.region &&
        isValidPlanForRegion(state.region, update.planType)
      )
  },
  ram: {
    canProceed: (state) => Boolean(
      state.region &&
      state.planType &&
      state.ram &&
      isValidRAMForPlan(state.region, state.planType, state.ram)
    ),
    getAvailableOptions: (state) =>
      (state.region && state.planType)
        ? REGION_PLAN_CONFIG[state.region].ramOptions[state.planType]
        : [],
    validateUpdate: (state, update) =>
      !update.ram || (
        state.region &&
        state.planType &&
        isValidRAMForPlan(state.region, state.planType, update.ram)
      )
  },
  billing: {
    canProceed: (state) => Boolean(state.billingPeriod),
    getAvailableOptions: () => ({
      periods: ['monthly', 'quarterly'] as const
    }),
    validateUpdate: (_, update) => !update.billingPeriod || ['monthly', 'quarterly'].includes(update.billingPeriod)
  },
  checkout: {
    canProceed: (state) => Boolean(
      state.region &&
      state.planType &&
      state.ram &&
      state.billingPeriod &&
      isValidPlanForRegion(state.region, state.planType) &&
      isValidRAMForPlan(state.region, state.planType, state.ram)
    ),
    getAvailableOptions: () => ({}),
    validateUpdate: () => false
  }
}

export const getNextStep = (currentStep: FormStep, state: FormState): FormStep | null => {
  const stepOrder: FormStep[] = ['region', 'plan', 'ram', 'billing', 'checkout']
  const currentIndex = stepOrder.indexOf(currentStep)
  
  if (currentIndex === -1 || !StepValidators[currentStep].canProceed(state)) {
    return currentStep
  }
  
  return stepOrder[currentIndex + 1] || null
}

// Checkout links
type CheckoutLinksStructure = {
  [region in Region]: {
    [plan in PlanType]?: {
      [ram in RAM]?: {
        [period in BillingPeriod]: string
      }
    }
  }
}

export const CHECKOUT_LINKS: Partial<CheckoutLinksStructure> = {
  india: {
    budget: {
      '2': {
        monthly: 'https://billing.sear.host/checkout/config/7',
        quarterly: 'https://billing.sear.host/checkout/config/7?billing_cycle=quarterly'
      },
      '3': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '4': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '5': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146&billing_cycle=quarterly'
      },
      '6': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '7': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '8': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '10': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '12': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '16': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      },
      '20': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=138&config[41]=146?billing_cycle=quarterly'
      }
    },
    'budget+': {
      '4': {
        monthly: 'https://billing.sear.host/checkout/config/11',
        quarterly: 'https://billing.sear.host/checkout/config/11?billing_cycle=quarterly'
      },
      '6': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '8': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '10': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '12': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '16': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '20': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=143&config[42]=152&config[43]=154?billing_cycle=quarterly'
      }
    }
  },
  singapore: {
    budget: {
      '2': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=10&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '3': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=11&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146'
      },
      '4': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=12&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '5': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=13&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '6': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=14&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '7': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=15&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '8': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=16&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '10': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=18&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '12': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=38&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '16': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=39&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      },
      '20': {
        monthly: 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146',
        quarterly: 'https://billing.sear.host/checkout/config/7?config[10]=40&config[18]=55&config[19]=58&config[24]=74&config[39]=140&config[41]=146?billing_cycle=quarterly'
      }
    },
    'budget+': {
      '4': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=121&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=121&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '6': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=122&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '8': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=123&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '10': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=124&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '12': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=125&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '16': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=126&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      },
      '20': {
        monthly: 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154',
        quarterly: 'https://billing.sear.host/checkout/config/11?config[36]=127&config[37]=128&config[38]=132&config[40]=145&config[42]=152&config[43]=154?billing_cycle=quarterly'
      }
    }
  },
  'us-east': {
    budget: {
      '4': {
        monthly: 'https://billing.sear.host/checkout/config/12',
        quarterly: 'https://billing.sear.host/checkout/config/12?billing_cycle=quarterly'
      },
      '6': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=161&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=161&config[45]=168?billing_cycle=quarterly'
      },
      '8': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=162&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=162&config[45]=168?billing_cycle=quarterly'
      },
      '10': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=163&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=163&config[45]=168?billing_cycle=quarterly'
      },
      '12': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=164&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=164&config[45]=168?billing_cycle=quarterly'
      },
      '16': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=165&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=165&config[45]=168?billing_cycle=quarterly'
      },
      '20': {
        monthly: 'https://billing.sear.host/checkout/config/12?config[44]=166&config[45]=168',
        quarterly: 'https://billing.sear.host/checkout/config/12?config[44]=166&config[45]=168?billing_cycle=quarterly'
      }
    }
  }
}

// Utility functions
export const calculatePrice = (state: FormState): number => {
  const pricePerGB = PRICING_PER_GB[state.region]?.[state.planType] || 0
  const basePrice = pricePerGB * Number(state.ram)
  return state.billingPeriod === 'quarterly' ? basePrice * 0.9 : basePrice
}

export const formatPrice = (price: number, period?: 'month' | 'gb'): string => {
  return `$${price.toFixed(2)}${period ? `/${period}` : ''}`
}

export interface CheckoutLinkParams {
  region: Region
  planType: PlanType
  ram: RAM
  billingPeriod: BillingPeriod
}

export const getCheckoutLink = (params: CheckoutLinkParams): string => {
  const { region, planType, ram, billingPeriod } = params
  return CHECKOUT_LINKS[region]?.[planType]?.[ram]?.[billingPeriod] || ''
}