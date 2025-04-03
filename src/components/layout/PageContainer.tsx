
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main 
        className={cn(
          'pt-16 sm:pt-20 md:pt-24 pb-12 px-3 sm:px-6 mx-auto',
          fullWidth ? 'w-full' : 'max-w-7xl',
          className
        )}
      >
        <div className="animate-fade-in w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
