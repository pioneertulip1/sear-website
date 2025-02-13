import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
  colors: {
    background: 'hsl(var(--background))',
    foreground: {
      DEFAULT: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--foreground-secondary))',
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      hover: 'hsl(var(--primary-hover))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      hover: 'hsl(var(--secondary-hover))',
    },
    surface: 'hsla(var(--surface))',
    card: {
      DEFAULT: 'hsla(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    nav: {
      bg: 'hsla(var(--nav-bg))',
    },
    border: {
      DEFAULT: 'hsla(var(--border))',
      strong: 'hsla(var(--border-strong))',
    },
    muted: {
      DEFAULT: 'hsla(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      hover: 'hsl(var(--destructive-hover))',
    },
    discord: {
      DEFAULT: 'hsl(var(--discord))',
      hover: 'hsl(var(--discord-hover))',
    },
    disabled: {
      bg: 'hsl(var(--disabled-bg))',
      text: 'hsl(var(--disabled-text))',
    },
  chart: {
  '1': 'hsl(var(--chart-1))',
  '2': 'hsl(var(--chart-2))',
  '3': 'hsl(var(--chart-3))',
  '4': 'hsl(var(--chart-4))',
  '5': 'hsl(var(--chart-5))'
  },
  sidebar: {
  DEFAULT: 'hsl(var(--sidebar-background))',
  foreground: 'hsl(var(--sidebar-foreground))',
  primary: 'hsl(var(--sidebar-primary))',
  'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  accent: 'hsl(var(--sidebar-accent))',
  'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  border: 'hsl(var(--sidebar-border))',
  ring: 'hsl(var(--sidebar-ring))'
  }
  },
  borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)'
  },
  keyframes: {
  'accordion-down': {
  from: {
  height: '0'
  },
  to: {
  height: 'var(--radix-accordion-content-height)'
  }
  },
  'accordion-up': {
  from: {
  height: 'var(--radix-accordion-content-height)'
  },
  to: {
  height: '0'
  }
  }
  },
  animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out'
  }
  }
  },
  plugins: [animate],
} satisfies Config;
