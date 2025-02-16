export type Region = 'india' | 'singapore' | 'us-east'
export type PlanType = 'budget' | 'budget+'
export type ServerType = 'PaperMC' | 'Fabric' | 'PocketmineMP' | 'Forge' | 'GeyserMC'
export type CPUThreads = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type RAM = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '20'
export type Storage = '50' | '100' | '150' | '200'
export type Currency = 'USD' | 'PHP' | 'INR'
export type BillingPeriod = 'monthly' | 'quarterly'

export const CHECKOUT_CONFIGS = {
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
        'GeyserMC': '141',
        'Bedrock Dedicated Server': '128'
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
        'GeyserMC': '172',
        'Bedrock Dedicated Server': '169'
      }
    }
  }
} as const

export interface CheckoutConfig {
  region: Region
  planType: PlanType
  serverType: ServerType
  cpuThreads?: CPUThreads
  ram: RAM
  storage?: Storage
  billingPeriod: BillingPeriod
}

export const generateCheckoutUrl = (config: CheckoutConfig): string => {
  const params = new URLSearchParams()
  
  let configSet = CHECKOUT_CONFIGS.BUDGET_ASIA
  if (config.region === 'us-east') {
    configSet = CHECKOUT_CONFIGS.BUDGET_NA
  } else if (config.planType === 'budget+') {
    configSet = CHECKOUT_CONFIGS.BUDGET_PLUS_ASIA
  }

  params.set(`config[${configSet.params.RAM}]`, 
    configSet.values.ram[config.ram])

  params.set(`config[${configSet.params.SERVER_TYPE}]`,
    configSet.values.serverType[config.serverType])

  if (config.region !== 'us-east') {
    params.set(`config[${configSet.params.LOCATION}]`,
      configSet.values.location[config.region])
    
    if (config.storage && 'DISK' in configSet.params) {
      params.set(`config[${configSet.params.DISK}]`,
        configSet.values.storage[config.storage])
    }

    if (config.cpuThreads && 'CPU' in configSet.params) {
      params.set(`config[${configSet.params.CPU}]`,
        configSet.values.cpu[config.cpuThreads])
    }
  }

  if (config.billingPeriod === 'quarterly') {
    params.append('billing_cycle', 'quarterly')
  }

  return `${configSet.baseUrl}?${params.toString()}`
}

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

export const RAM_PRICING: Record<RAM, number> = {
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

export const STORAGE_PRICING: Record<Storage, number> = {
  '50': 2.50,
  '100': 5.00,
  '150': 7.50,
  '200': 10.00
}

export const calculateComponentPrice = (basePrice: number, billingPeriod: BillingPeriod): number => {
  if (billingPeriod === 'quarterly') {
  }
  return basePrice
}

export const calculatePrice = (config: CheckoutConfig): number => {
  const ramPrice = calculateComponentPrice(RAM_PRICING[config.ram], config.billingPeriod)
  const cpuPrice = config.cpuThreads ? calculateComponentPrice(CPU_THREAD_PRICING[config.cpuThreads], config.billingPeriod) : 0
  const storagePrice = config.storage ? calculateComponentPrice(STORAGE_PRICING[config.storage], config.billingPeriod) : 0
  
  const monthlyTotal = ramPrice + cpuPrice + storagePrice
  
  if (config.billingPeriod === 'quarterly') {
  }
  return monthlyTotal
}

export const formatPrice = (price: number, period?: 'month' | 'gb'): string => {
  return `$${price.toFixed(2)}${period ? `/${period}` : ''}`
}