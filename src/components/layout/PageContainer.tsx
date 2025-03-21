
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
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main 
        className={cn(
          'pt-16 sm:pt-20 pb-12 px-4 sm:px-6 mx-auto',
          fullWidth ? 'w-full' : 'max-w-7xl',
          className
        )}
      >
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
