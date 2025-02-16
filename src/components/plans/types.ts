// Basic types
export type Region = 'india' | 'singapore' | 'us-east'
export type PlanType = 'budget' | 'budget+'
export type ServerType = 'PaperMC' | 'Fabric' | 'PocketmineMP' | 'Forge' | 'GeyserMC'
export type CPUThreads = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type RAM = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '20'
export type Storage = '50' | '75' | '100' | '150' | '200'
export type Currency = 'USD' | 'PHP' | 'INR'
export type BillingPeriod = 'monthly' | 'quarterly'
export type FormStep = 'region' | 'plan' | 'server' | 'cpuram' | 'storage' | 'checkout'

// Interfaces
export interface FormState {
  region: Region
  planType: PlanType
  serverType?: ServerType
  cpuThreads?: CPUThreads
  ram: RAM
  storage?: Storage
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

// Constants and Configuration
export const STORAGE_OPTIONS: Storage[] = ['50', '100', '150', '200']

export const SERVER_TYPES: ServerType[] = [
  'PaperMC',
  'Fabric',
  'PocketmineMP',
  'Forge',
  'GeyserMC'
]

// Pricing
export const CPU_THREAD_PRICING: Record<CPUThreads, number> = {
  '1': 3.75,
  '2': 7.50,
  '3': 11.25,
  '4': 15.00,
  '5': 18.75,
  '6': 22.50,
  '7': 26.25,
  '8': 30.00
}

export const US_EAST_FIXED = {
  cpuThreads: '4' as const,
  storage: '50' as const,
  ramPricePerGB: 0.75
}

export const RAM_PRICING = (region: Region, ram: RAM): number => {
  if (region === 'us-east') {
    return Number(ram) * US_EAST_FIXED.ramPricePerGB
  }

  const prices: Record<RAM, number> = {
    '2': 3.00,
    '3': 3.50,
    '4': 4.00,
    '5': 5.00,
    '6': 6.00,
    '7': 7.00,
    '8': 8.00,
    '10': 10.00,
    '12': 12.00,
    '16': 16.00,
    '20': 20.00
  }
  return prices[ram]
}

export const STORAGE_PRICING: Record<Storage, number> = {
  '50': 2.50,
  '75': 3.75,
  '100': 5.00,
  '150': 7.50,
  '200': 10.00
}

// Plan specifications
export type PlanSpecs = {
  cpu: string
}

export const PLAN_SPECS: Record<Region, Record<PlanType, PlanSpecs>> = {
  'india': {
    budget: {
      cpu: 'Ampere® Altra® @ 3.0 GHz'
    },
    'budget+': {
      cpu: 'AMD EPYC 7J13'
    }
  },
  'singapore': {
    budget: {
      cpu: 'Ampere® Altra® @ 3.0 GHz'
    },
    'budget+': {
      cpu: 'AMD EPYC 7J13'
    }
  },
  'us-east': {
    budget: {
      cpu: 'Ryzen 9 5900x'
    },
    'budget+': {
      cpu: 'Ryzen 9 5900x'
    }
  }
}

// Region plan configuration
export const REGION_PLAN_CONFIG = {
  india: {
    availablePlans: ['budget', 'budget+'] as const,
    ramOptions: {
      budget: ['2', '3', '4', '5', '6', '7', '8', '10', '12', '16', '20'] as const,
      ['budget+']: ['4', '6', '8', '10', '12', '16', '20'] as const
    }
  },
  singapore: {
    availablePlans: ['budget', 'budget+'] as const,
    ramOptions: {
      budget: ['2', '3', '4', '5', '6', '7', '8', '10', '12', '16', '20'] as const,
      ['budget+']: ['4', '6', '8', '10', '12', '16', '20'] as const
    }
  },
  'us-east': {
    availablePlans: ['budget'] as const,
    ramOptions: {
      budget: ['4', '6', '8', '10', '12', '16', '20'] as const,
      ['budget+']: [] as const
    }
  }
} as const

// Validation helpers
export const isValidPlanForRegion = (region: Region, plan: PlanType): boolean => {
  const availablePlans = [...REGION_PLAN_CONFIG[region].availablePlans]
  return availablePlans.includes(plan)
}

export const isValidRAMForPlan = (region: Region, plan: PlanType, ram: RAM): boolean => {
  const ramOptions = [...REGION_PLAN_CONFIG[region].ramOptions[plan]]
  return ramOptions.includes(ram)
}

// Step validators
export const StepValidators: Record<FormStep | 'billing' | 'ram', StepValidation> = {
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
  server: {
    canProceed: (state) => Boolean(state.serverType),
    getAvailableOptions: () => SERVER_TYPES,
    validateUpdate: (_, update) => !update.serverType || SERVER_TYPES.includes(update.serverType as ServerType)
  },
  cpuram: {
    canProceed: (state) => {
      if (state.region === 'us-east') {
        return Boolean(
          state.region &&
          state.planType &&
          state.ram &&
          isValidRAMForPlan(state.region, state.planType, state.ram)
        )
      }
      return Boolean(
        state.region &&
        state.planType &&
        state.cpuThreads &&
        state.ram &&
        isValidRAMForPlan(state.region, state.planType, state.ram)
      )
    },
    getAvailableOptions: (state) => ({
      cpuThreads: state.region !== 'us-east' ? Object.keys(CPU_THREAD_PRICING) : [],
      ram: (state.region && state.planType)
        ? REGION_PLAN_CONFIG[state.region].ramOptions[state.planType]
        : []
    }),
    validateUpdate: (state, update) => {
      if (update.ram && !(
        state.region &&
        state.planType &&
        isValidRAMForPlan(state.region, state.planType, update.ram)
      )) {
        return false
      }

      if (update.cpuThreads) {
        if (state.region === 'us-east') return false
        if (!(update.cpuThreads in CPU_THREAD_PRICING)) return false
      }

      return true
    }
  },
  storage: {
    canProceed: (state) => {
      if (state.region === 'us-east') return true
      return Boolean(state.storage)
    },
    getAvailableOptions: (state) => 
      state.region === 'us-east' ? [] : STORAGE_OPTIONS,
    validateUpdate: (state, update) => {
      if (state.region === 'us-east') return !update.storage
      return !update.storage || update.storage in STORAGE_PRICING
    }
  },
  checkout: {
    canProceed: (state) => {
      const baseRequirements = Boolean(
        state.region &&
        state.planType &&
        state.serverType &&
        state.ram &&
        state.billingPeriod &&
        isValidPlanForRegion(state.region, state.planType) &&
        isValidRAMForPlan(state.region, state.planType, state.ram)
      )

      if (state.region !== 'us-east') {
        return baseRequirements && Boolean(
          state.cpuThreads &&
          state.storage
        )
      }

      return baseRequirements
    },
    getAvailableOptions: () => ({}),
    validateUpdate: () => false
  },
  billing: {
    canProceed: (state) => Boolean(state.billingPeriod),
    getAvailableOptions: () => ({ periods: ['monthly', 'quarterly'] as const }),
    validateUpdate: (_, update) => !update.billingPeriod || ['monthly', 'quarterly'].includes(update.billingPeriod)
  },
  ram: {
    canProceed: (state) => Boolean(
      state.region &&
      state.planType &&
      state.ram &&
      isValidRAMForPlan(state.region, state.planType, state.ram)
    ),
    getAvailableOptions: (state) =>
      state.region && state.planType
        ? REGION_PLAN_CONFIG[state.region].ramOptions[state.planType]
        : [],
    validateUpdate: (state, update) =>
      !update.ram || (
        state.region &&
        state.planType &&
        isValidRAMForPlan(state.region, state.planType, update.ram)
      )
  }
}

// Step navigation
export const getNextStep = (currentStep: FormStep, state: FormState): FormStep | null => {
  const stepOrder: FormStep[] = ['region', 'plan', 'server', 'cpuram', 'storage', 'checkout']
  const currentIndex = stepOrder.indexOf(currentStep)
  
  if (currentIndex === -1 || !StepValidators[currentStep].canProceed(state)) {
    return currentStep
  }

  if (state.region === 'us-east' && stepOrder[currentIndex + 1] === 'storage') {
    return 'checkout'
  }
  
  return stepOrder[currentIndex + 1] || null
}

// Price calculation helpers
export const calculateComponentPrice = (basePrice: number, billingPeriod: BillingPeriod): number => {
  if (billingPeriod === 'quarterly') {
    return basePrice * 0.9
  }
  return basePrice
}

// Formatting
export const formatPrice = (price: number, period?: 'month' | 'gb'): string => {
  return `$${price.toFixed(2)}${period ? `/${period}` : ''}`
}

// URL generation
export const generateCheckoutUrl = (config: FormState): string => {
  const params = new URLSearchParams()
  
  let configSet = CHECKOUT_CONFIGS.BUDGET_ASIA
  if (config.region === 'us-east') {
    configSet = CHECKOUT_CONFIGS.BUDGET_NA
  } else if (config.planType === 'budget+') {
    configSet = CHECKOUT_CONFIGS.BUDGET_PLUS_ASIA
  }

  // Required parameters
  const ramValue = config.ram && configSet.values.ram[config.ram]
  if (ramValue) {
    params.set(`config[${configSet.params.RAM}]`, ramValue)
  }

  if (config.serverType && config.serverType in configSet.values.serverType) {
    params.set(`config[${configSet.params.SERVER_TYPE}]`,
      configSet.values.serverType[config.serverType])
  }

  // Optional parameters for non-US regions
  if (config.region !== 'us-east') {
    if (configSet.params.LOCATION && configSet.values.location?.[config.region]) {
      params.set(`config[${configSet.params.LOCATION}]`,
        configSet.values.location[config.region])
    }
    
    if (config.storage && configSet.params.DISK && configSet.values.storage?.[config.storage]) {
      params.set(`config[${configSet.params.DISK}]`,
        configSet.values.storage[config.storage])
    }

    if (config.cpuThreads && configSet.params.CPU && configSet.values.cpu?.[config.cpuThreads]) {
      params.set(`config[${configSet.params.CPU}]`,
        configSet.values.cpu[config.cpuThreads])
    }
  }

  params.set('billing_cycle', config.billingPeriod)
  return `${configSet.baseUrl}?${params.toString()}`
}

// Checkout configuration
type CheckoutConfig = {
  readonly baseUrl: string;
  readonly params: {
    readonly RAM: string;
    readonly SERVER_TYPE: string;
    readonly LOCATION?: string;
    readonly DISK?: string;
    readonly CPU?: string;
  };
  readonly values: {
    readonly ram: Partial<Record<RAM, string>>;
    readonly serverType: Record<ServerType, string>;
    readonly location?: Record<Exclude<Region, 'us-east'>, string>;
    readonly storage?: Record<Storage, string>;
    readonly cpu?: Record<CPUThreads, string>;
  };
};

export const CHECKOUT_CONFIGS: Record<'BUDGET_ASIA' | 'BUDGET_PLUS_ASIA' | 'BUDGET_NA', CheckoutConfig> = {
  BUDGET_ASIA: {
    baseUrl: 'https://billing.sear.host/checkout/config/13',
    params: {
      RAM: '10',
      SERVER_TYPE: '18',
      LOCATION: '39',
      DISK: '41',
      CPU: '47'
    },
    values: {
      ram: {
        '2': '10',
        '4': '12',
        '6': '14',
        '8': '16',
        '10': '18',
        '12': '38',
        '16': '39',
        '20': '40'
      },
      serverType: {
        'PaperMC': '55',
        'Fabric': '56',
        'PocketmineMP': '57',
        'Forge': '93',
        'GeyserMC': '142'
      },
      location: {
        'india': '138',
        'singapore': '140'
      },
      storage: {
        '50': '147',
        '75': '148',
        '100': '149',
        '150': '150',
        '200': '151'
      },
      cpu: {
        '1': '175',
        '2': '176',
        '3': '177',
        '4': '178',
        '5': '179',
        '6': '180',
        '7': '181',
        '8': '182'
      }
    }
  },
  BUDGET_PLUS_ASIA: {
    baseUrl: 'https://billing.sear.host/checkout/config/14',
    params: {
      RAM: '36',
      SERVER_TYPE: '37',
      LOCATION: '40',
      DISK: '43',
      CPU: '48'
    },
    values: {
      ram: {
        '4': '121',
        '6': '122',
        '8': '123',
        '10': '124',
        '12': '125',
        '16': '126',
        '20': '127'
      },
      serverType: {
        'PaperMC': '129',
        'Fabric': '192',
        'PocketmineMP': '130',
        'Forge': '131',
        'GeyserMC': '141'
      },
      location: {
        'india': '143',
        'singapore': '145'
      },
      storage: {
        '50': '155',
        '75': '156',
        '100': '157',
        '150': '158',
        '200': '159'
      },
      cpu: {
        '1': '183',
        '2': '184',
        '3': '185',
        '4': '186',
        '5': '187',
        '6': '188',
        '7': '189',
        '8': '190'
      }
    }
  },
  BUDGET_NA: {
    baseUrl: 'https://billing.sear.host/checkout/config/15',
    params: {
      RAM: '44',
      SERVER_TYPE: '45'
    },
    values: {
      ram: {
        '4': '160',
        '6': '161',
        '8': '162',
        '10': '163',
        '12': '164',
        '16': '165',
        '20': '166'
      },
      serverType: {
        'PaperMC': '168',
        'Fabric': '174',
        'PocketmineMP': '171',
        'Forge': '170',
        'GeyserMC': '172'
      }
    }
  }
} as const