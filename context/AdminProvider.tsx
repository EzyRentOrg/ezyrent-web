'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  admin: Admin | null;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('/api/admin/me', {
          withCredentials: true
        });
        setAdmin(response.data.admin);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        router.push('/login'); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  return (
    <AdminContext.Provider value={{ admin, loading }}>
      {loading ? <p>Loading...</p> : children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
