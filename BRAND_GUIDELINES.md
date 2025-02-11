# Sear Hosting Brand Guidelines

## Color System

### Core Brand Colors

```css
/* Primary Blue */
#007AFF - Used for primary actions, brand emphasis, and key UI elements
- Primary hover: Slightly darker shade for interactive states
- Usage: CTAs, links, important UI elements

/* Secondary Purple */
#5856D6 - Used for depth and secondary elements
- Secondary hover: Slightly darker shade for interactive states
- Usage: Supporting elements, decorative accents

/* Background Colors */
- Base: #000000 (Pure black) - Main background
- Surface: rgba(255, 255, 255, 0.03) - Card backgrounds
- Overlay: rgba(255, 255, 255, 0.08) - Elevated elements
```

### Text Colors

```css
/* Text Hierarchy */
- Primary: #FFFFFF (Pure white) - Main content
- Secondary: rgba(255, 255, 255, 0.7) - Supporting text
- Disabled: #a0aec0 - Inactive states
```

### UI Element Colors

```css
/* Borders */
- Default: rgba(255, 255, 255, 0.05)
- Strong: rgba(255, 255, 255, 0.1)

/* Special States */
- Discord: #5865F2 (hover: #4752c4)
- Destructive: #FF3B30 (hover: darker shade)
- Disabled Background: #4a5568
```

## Typography

### Font Families
- Primary: 'Martian Mono', monospace
  - Used for body text and general content
- Secondary: 'Spline Sans Mono', monospace
  - Used for headings and emphasis

### Text Styles

```css
/* Headings */
h1: 3rem/4rem (48px/64px)
h2: 2.25rem/3rem (36px/48px)
h3: 1.5rem/2rem (24px/32px)
h4: 1.25rem/1.75rem (20px/28px)

/* Body Text */
Regular: 1rem/1.5rem (16px/24px)
Small: 0.875rem/1.25rem (14px/20px)
```

## Component Styling

### Cards & Surfaces

```css
/* Glass Effect */
.glass-effect {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

/* Hover States */
.card-hover {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}
```

### Navigation

```css
/* Navigation Blur */
.nav-blur {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
}
```

### Buttons

```css
/* Primary Button */
- Background: #007AFF
- Text: White
- Hover: Darker shade of primary
- Active: Scale down slightly

/* Secondary Button */
- Background: #5856D6
- Text: White
- Hover: Darker shade of secondary

/* Outline Button */
- Border: rgba(255, 255, 255, 0.05)
- Hover: rgba(255, 255, 255, 0.05) background
```

## Design Patterns

### Depth & Hierarchy

1. Layer Organization:
   - Background (pure black)
   - Surface elements (glass effect)
   - Interactive elements (buttons, cards)
   - Overlay elements (modals, dropdowns)

2. Visual Emphasis:
   - Use primary blue for key actions
   - Use secondary purple for supporting elements
   - Implement glass effect for elevated surfaces
   - Apply subtle shadows for depth

### Interactive States

1. Hover Effects:
   - Scale up or translate for cards
   - Background color change for buttons
   - Opacity adjustments for icons

2. Active States:
   - Scale down slightly
   - Increased background opacity
   - Immediate visual feedback

3. Focus States:
   - Clear outline or ring
   - High contrast for accessibility
   - Visible keyboard navigation

## Best Practices

### Color Usage

1. Text Readability:
   - Always maintain high contrast ratios
   - Use pure white for primary text
   - Use 70% white for secondary text
   - Avoid low contrast combinations

2. Interactive Elements:
   - Use primary blue for main CTAs
   - Use secondary purple for alternative actions
   - Maintain consistent hover states
   - Clear visual hierarchy

### Layout & Spacing

1. Container Widths:
   ```css
   .container-custom {
     @apply container mx-auto px-4 md:px-6;
   }
   ```

2. Section Spacing:
   ```css
   .section-spacing {
     @apply py-16 md:py-24;
   }
   ```

3. Component Spacing:
   - Consistent padding within components
   - Clear separation between sections
   - Responsive margins for different viewports

### Accessibility Guidelines

1. Color Contrast:
   - Maintain WCAG AAA standards
   - Test all color combinations
   - Provide sufficient contrast for text

2. Interactive Elements:
   - Clear focus indicators
   - Sufficient touch targets
   - Keyboard navigation support

3. Visual Feedback:
   - Immediate response to interactions
   - Clear state changes
   - Consistent behavior patterns

## Implementation Notes

### CSS Variables

Located in `/src/app/globals.css`:
```css
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 211 100% 50%;
  --secondary: 241 66% 59%;
  /* ... other variables */
}
```

### Utility Classes

Common utilities in Tailwind config:
```js
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      // ... other colors
    }
  }
}
```

### Component Integration

1. Use provided utility classes:
   ```tsx
   className="glass-effect card-hover"
   ```

2. Follow established patterns:
   ```tsx
   <Button className="bg-primary hover:bg-primary-hover">
   ```

3. Maintain consistency:
   - Use CSS variables for colors
   - Apply utility classes consistently
   - Follow component patterns