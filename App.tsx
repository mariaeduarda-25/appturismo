import { useEffect } from 'react';
import { AuthProvider } from './src/context/auth';
import { Navigation } from './src/navigations';
import { testSupabaseConnection } from './src/utils/testSupabase';

export default function App() {
  useEffect(() => {
    testSupabaseConnection()
  }, [])
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}