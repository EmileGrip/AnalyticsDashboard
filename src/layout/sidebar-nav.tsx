import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SidebarNavItem } from '@/routes/nav-items';
import { ScrollAreaWithButton } from '@/components/table/scroll-area';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

export default function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation(); // Import useLocation from react-router-dom
  const buttonClass = (item: SidebarNavItem) =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'unrestricted' }),
      pathname === item.href
        ? 'bg-muted hover:bg-muted font-semibold'
        : 'hover:bg-transparent hover:underline text-muted-foreground',
      'justify-start md:text-left text-center',
    );

  return (
    <ScrollAreaWithButton direction='horizontal' distanceToTopClass='top-1/4' type='scroll'>
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:-mx-4 overflow-x-auto lg:fixed',
          className,
        )}
        {...props}
      >
        {items.map((item) =>
          item.component ? ( // Check if item.component is defined
            <Link key={item.href} to={item.href} className={buttonClass(item)}>
              {item.title}
            </Link>
          ) : (
            <a href={item.href} className={buttonClass(item)}>
              {item.title}
            </a>
          ),
        )}
      </nav>
    </ScrollAreaWithButton>
  );
}
