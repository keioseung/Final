import { useEffect, useState, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout, getMe } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const me = await getMe();
      setUser(me);
      setError('');
    } catch (e) {
      setUser(null);
      setError('');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      await apiLogin(username, password);
      await fetchMe();
      setError('');
    } catch (e: any) {
      setError(e?.response?.data?.detail || '로그인 실패');
    }
    setLoading(false);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return {
    user,
    isAdmin: user?.role === 'admin',
    isLoggedIn: !!user,
    loading,
    error,
    login,
    logout,
    refetch: fetchMe,
  };
} 