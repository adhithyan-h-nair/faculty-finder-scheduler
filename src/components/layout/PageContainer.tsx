
import { ReactNode } from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const PageContainer = ({ 
  children, 
  className,
  fullWidth = false
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main 
        className={cn(
          'pt-24 pb-16 px-4 sm:px-6 mx-auto page-transition',
          fullWidth ? 'w-full' : 'max-w-7xl',
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
