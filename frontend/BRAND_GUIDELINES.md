# KESME SACCO - Brand Guidelines & Updates

## Overview
This document outlines the updated brand identity and implementation across the KESME SACCO website.

## Brand Identity

### Primary Colors
- **Primary Orange**: `#F7931E` - Used for CTAs, accents, and highlights
- **Primary Green**: `#1FA34A` - Primary brand color for buttons, headers, and primary elements
- **Primary Black**: `#111111` - Used for dark backgrounds and primary dark elements

### Secondary Colors
- **Light Gray**: `#F5F5F5` - Background sections and pale backgrounds
- **Dark Gray**: `#333333` - Secondary text and borders
- **Medium Gray**: `#9E9E9E` - Tertiary text and secondary elements

## Brand Assets

### Logo
- **File**: `/public/kesme-logo.png`
- **Usage**: Updated logo used across Navbar, Footer, Login, Register, and Dashboard pages
- **Dimensions**: Maintain 12px height on desktop (h-12 class), 10px on mobile/dashboard (h-10)

### Brand Pattern
- **File**: `/public/brand-pattern.png`
- **Description**: Subtle geometric mountain/chevron shapes in light gray, used as background pattern
- **Usage**: Applied to hero sections and service sections with low opacity (5-8%) for subtle visual enhancement
- **Pages Updated**: Home hero, Home services section, About page hero

### Brand Icons (SVG Symbols)
- **File**: `/public/icons.svg`
- **Icons Available**:
  - `#icon-shield` - Shield with checkmark (Trust/Security)
  - `#icon-chart` - Trending chart (Growth/Finance)
  - `#icon-handshake` - Partnership/Collaboration
  - `#icon-lightbulb` - Innovation/Ideas
- **Color Scheme**: Orange (#F7931E) and Green (#1FA34A) accents

## Typography

### Font Families
- **Headings**: Poppins (weights: 300-900)
- **Body Text**: Open Sans (weights: 400, 500, 600)

### Font Usage
- `h1, h2, h3, h4, h5`: Poppins (font-poppins class)
- `body, p`: Open Sans (default)

## Brand Implementation Details

### Updated Files

#### Logo References Updated ✓
- `src/components/Navbar.jsx` - Changed `/logo.png` to `/kesme-logo.png`
- `src/components/Footer.jsx` - Changed `/logo.png` to `/kesme-logo.png`
- `src/pages/Dashboard.jsx` - Changed `/logo.png` to `/kesme-logo.png`
- `src/pages/Login.jsx` - Changed `/logo.png` to `/kesme-logo.png`
- `src/pages/Register.jsx` - Changed `/logo.png` to `/kesme-logo.png`

#### Brand Pattern Integration ✓
- `src/pages/Home.jsx`
  - Added brand pattern to hero section (line ~76-78)
  - Added brand pattern to services section with enhanced hover states (line ~156-160)
- `src/pages/About.jsx`
  - Added brand pattern to page hero section (line ~37-39)

#### CSS Updates ✓
- `style.css` - Updated documentation and added `--brand-pattern` CSS variable

### Component Enhancements

#### Service Cards
- Added `hover:border-gold` for enhanced hover states matching brand colors
- Services section now features the brand pattern background with subtle opacity

#### Hero Sections
- Brand pattern integrated into background with 8% opacity for visual depth
- Maintains gradient overlays for text readability

## Color System in Tailwind/Components

### Available CSS Classes
```
Primary Colors:
- text-green-dark / bg-green-dark (#1FA34A)
- text-green / bg-green (#1FA34A)
- text-gold / bg-gold (#F7931E)
- text-primary-orange / bg-primary-orange (#F7931E)
- text-primary-black / bg-primary-black (#111111)

Pale Backgrounds:
- bg-green-pale (#F5F5F5)
- bg-gold-pale (#F5F5F5)

Button Classes:
- .btn-gold - Gold background buttons
- .btn-primary - Green background buttons
- .btn-outline - Transparent with border
- .btn-outline-green - Green outline buttons
```

## Implementation Checklist

- [x] New logo created and implemented
- [x] Brand colors verified and applied
- [x] Logo updated in all pages (Navbar, Footer, Login, Register, Dashboard)
- [x] Brand pattern created and integrated
- [x] SVG icon symbols created
- [x] CSS updated with brand documentation
- [x] Home page enhanced with brand pattern
- [x] About page enhanced with brand pattern
- [x] Service cards styled with brand colors and hover states

## Future Enhancements

Consider the following for future brand updates:
1. Implement SVG icons from `/public/icons.svg` throughout the site
2. Add brand pattern to additional sections (Products, Membership, Contact pages)
3. Create detailed icon usage guide for service cards
4. Develop animated brand pattern variants for key sections

## Brand Pattern Styling Example

```jsx
// Background pattern with subtle opacity
<div className="absolute inset-0 opacity-5 pointer-events-none">
  <div style={{
    backgroundImage: 'url(/brand-pattern.png)', 
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  }} className="w-full h-full" />
</div>
```

## Color Reference

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Primary | Green | #1FA34A | Main CTAs, headers, primary elements |
| Secondary | Orange | #F7931E | Accents, highlights, secondary CTAs |
| Dark | Black | #111111 | Dark backgrounds, text on light backgrounds |
| Light | Light Gray | #F5F5F5 | Section backgrounds, pale backgrounds |

---

**Last Updated**: June 30, 2026
**Maintained By**: KESME SACCO Development Team
