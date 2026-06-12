import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'key'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-paper-dark/80 text-ink-900 hover:bg-paper/80 border border-paper/30',
  secondary:
    'bg-ink-700/60 text-paper hover:bg-ink-600',
  ghost:
    'bg-transparent text-fog hover:bg-ink-700/40',
  danger:
    'bg-crimson-dark/60 text-crimson-light hover:bg-crimson/70',
  key:
    'bg-crimson-dark/40 text-crimson-light border border-crimson/50 shadow-[0_0_12px_rgba(192,57,43,0.3)] hover:shadow-[0_0_16px_rgba(192,57,43,0.5)]',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded font-body transition-all cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
