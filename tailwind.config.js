/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#D2691E', // warm terracotta
        'primary-50': '#FDF4F0', // very light terracotta
        'primary-100': '#F9E4D8', // light terracotta
        'primary-200': '#F2C9B1', // medium light terracotta
        'primary-300': '#EAAE8A', // medium terracotta
        'primary-400': '#E19363', // medium dark terracotta
        'primary-500': '#D2691E', // base terracotta
        'primary-600': '#B85A1A', // dark terracotta
        'primary-700': '#9E4B16', // darker terracotta
        'primary-800': '#843C12', // very dark terracotta
        'primary-900': '#6A2D0E', // darkest terracotta
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B4513', // saddle brown
        'secondary-50': '#F5F1ED', // very light brown
        'secondary-100': '#E8DDD2', // light brown
        'secondary-200': '#D1BBA5', // medium light brown
        'secondary-300': '#BA9978', // medium brown
        'secondary-400': '#A3774B', // medium dark brown
        'secondary-500': '#8B4513', // base saddle brown
        'secondary-600': '#763A10', // dark brown
        'secondary-700': '#612F0D', // darker brown
        'secondary-800': '#4C240A', // very dark brown
        'secondary-900': '#371907', // darkest brown
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#228B22', // cilantro green
        'accent-50': '#F0F9F0', // very light green
        'accent-100': '#DCF2DC', // light green
        'accent-200': '#B9E5B9', // medium light green
        'accent-300': '#96D896', // medium green
        'accent-400': '#73CB73', // medium dark green
        'accent-500': '#228B22', // base cilantro green
        'accent-600': '#1E7A1E', // dark green
        'accent-700': '#1A691A', // darker green
        'accent-800': '#165816', // very dark green
        'accent-900': '#124712', // darkest green
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FEFEFE', // clean off-white
        'surface': '#F8F6F3', // warm gray
        'surface-50': '#FDFCFB', // very light warm gray
        'surface-100': '#F8F6F3', // base warm gray
        'surface-200': '#F0EDE8', // medium warm gray
        'surface-300': '#E8E4DD', // darker warm gray

        // Text Colors
        'text-primary': '#2D2D2D', // deep charcoal
        'text-secondary': '#6B6B6B', // medium gray
        'text-muted': '#9CA3AF', // light gray
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#22C55E', // bright green
        'success-50': '#F0FDF4', // very light green
        'success-100': '#DCFCE7', // light green
        'success-200': '#BBF7D0', // medium light green
        'success-300': '#86EFAC', // medium green
        'success-400': '#4ADE80', // medium dark green
        'success-500': '#22C55E', // base success green
        'success-600': '#16A34A', // dark green
        'success-700': '#15803D', // darker green
        'success-800': '#166534', // very dark green
        'success-900': '#14532D', // darkest green
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber
        'warning-50': '#FFFBEB', // very light amber
        'warning-100': '#FEF3C7', // light amber
        'warning-200': '#FDE68A', // medium light amber
        'warning-300': '#FCD34D', // medium amber
        'warning-400': '#FBBF24', // medium dark amber
        'warning-500': '#F59E0B', // base warning amber
        'warning-600': '#D97706', // dark amber
        'warning-700': '#B45309', // darker amber
        'warning-800': '#92400E', // very dark amber
        'warning-900': '#78350F', // darkest amber
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // clear red
        'error-50': '#FEF2F2', // very light red
        'error-100': '#FEE2E2', // light red
        'error-200': '#FECACA', // medium light red
        'error-300': '#FCA5A5', // medium red
        'error-400': '#F87171', // medium dark red
        'error-500': '#EF4444', // base error red
        'error-600': '#DC2626', // dark red
        'error-700': '#B91C1C', // darker red
        'error-800': '#991B1B', // very dark red
        'error-900': '#7F1D1D', // darkest red
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E5E7EB', // gray-200
        'border-muted': '#F3F4F6', // gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'scale-in': 'scaleIn 200ms ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'out': 'ease-out',
      },
      minHeight: {
        '12': '3rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}