
import PageContainer from '@/components/layout/PageContainer';
import StatusOverview from '@/components/dashboard/StatusOverview';
import SubstitutionLog from '@/components/admin/SubstitutionLog';
import UserCredentials from '@/components/admin/UserCredentials';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { role } = useAuth();
  
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-6">
        <StatusOverview />
        
        {/* Only show substitution log to admins and faculty */}
        {(role === 'admin' || role === 'faculty') && (
          <SubstitutionLog />
        )}
        
        {/* Only show user credentials to admins */}
        {role === 'admin' && (
          <UserCredentials />
        )}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
