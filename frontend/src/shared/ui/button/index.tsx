import {forwardRef} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {Slot} from '@radix-ui/react-slot';
import {cn} from '@shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-btn-text gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        fill: '',
        'fill-light': 'hover:border-2 hover:border-primary-light',
        outline: 'border border-accent',
        ghost: 'text-text-primary',
        accent: '',
      },
      color: {
        default: 'bg-primary hover:bg-btn-hovered-bg-primary shadow',
        primary: 'bg-primary hover:bg-btn-hovered-bg-primary shadow',
        secondary: 'bg-secondary hover:bg-btn-hovered-bg-secondary shadow-sm',
        success: 'bg-success shadow-sm hover:bg-btn-hovered-bg-success',
        destructive: 'bg-destructive shadow-sm hover:bg-btn-hovered-bg-destructive',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    compoundVariants: [
      {
        variant: 'fill-light',
        color: 'primary',
        class: 'bg-primary-light text-primary hover:border-primary hover:bg-primary-light',
      },
      {
        variant: 'fill-light',
        color: 'secondary',
        class: 'bg-secondary-light text-secondary hover:border-secondary hover:bg-secondary-light',
      },
      {
        variant: 'fill-light',
        color: 'success',
        class: 'bg-success-light text-success hover:border-success hover:bg-success-light',
      },
      {
        variant: 'fill-light',
        color: 'destructive',
        class:
          'bg-destructive-light text-destructive hover:border-destructive hover:bg-destructive-light',
      },
      {
        variant: 'outline',
        color: 'primary',
        class: 'text-primary bg-transparent hover:bg-accent shadow-none border-primary',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class: 'text-secondary bg-transparent hover:bg-accent shadow-none border-secondary',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'text-success border-success bg-transparent hover:bg-accent shadow-none',
      },
      {
        variant: 'outline',
        color: 'destructive',
        class: 'text-destructive border-destructive bg-transparent hover:bg-accent shadow-none',
      },
      {
        variant: 'ghost',
        class: 'bg-transparent hover:bg-accent shadow-none',
      },
      // default
      {
        variant: 'fill',
        color: 'default',
      },
      {
        variant: 'fill-light',
        color: 'default',
        class: 'bg-secondary hover:bg-btn-hovered-bg-secondary shadow-sm',
      },
      {
        variant: 'outline',
        color: 'default',
        class: 'text-text-primary bg-transparent hover:bg-accent shadow-none',
      },
      {
        variant: 'ghost',
        color: 'default',
        class: 'bg-transparent hover:bg-accent shadow-none',
      },
      {
        variant: 'accent',
        class: 'bg-accent hover:bg-accent-foreground [&_svg]:size-5 text-text-primary',
      },
    ],
    defaultVariants: {
      variant: 'fill',
      color: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, color, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({variant, color, size, className}))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export {Button, buttonVariants};
