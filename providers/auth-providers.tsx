import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '@/utils/supabase';

const AuthContext = createContext<{
  loading: boolean;
  session: Session | null | undefined;
  user: User | null | undefined;
}>({
  session: null,
  user: null,
  loading: true,
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      },
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  if (AuthContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return useContext(AuthContext);
};

function useRequiredAuth() {
  const { user, session } = useContext(AuthContext);
  if (!user || !session) {
    throw new Error('useRequiredAuth must be used within an authenticated screen');
  }
  return { user, session };
}

export { AuthProvider, useAuth, useRequiredAuth };
