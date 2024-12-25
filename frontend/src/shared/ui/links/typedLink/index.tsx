import {forwardRef, type ReactNode} from 'react';
import {Link, LinkProps} from 'react-router-dom';
import {VariantProps} from 'class-variance-authority';

import {Button, buttonVariants} from '@shared/ui/button';

interface TypedLinkProps extends LinkProps {
  children: ReactNode;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  className?: string;
}

export const TypedLink = forwardRef<HTMLAnchorElement, TypedLinkProps>(
  ({children, variant = 'ghost', size, className, ...LinkProps}, ref) => {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link ref={ref} {...LinkProps}>
          {children}
        </Link>
      </Button>
    );
  },
);

TypedLink.displayName = 'TypedLink';
