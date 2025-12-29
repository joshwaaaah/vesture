import { Session, User, SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '@/utils/supabase';

const AuthContext = createContext<{
  loading: boolean,
  session: Session | null | undefined,
  user: User | null | undefined,
  signIn: (data: SignInWithPasswordCredentials) => void
  signOut: () => void,
  signUp: (data: SignUpWithPasswordCredentials) => void
}>({
  session: null,
  user: null,
  loading: true,
  signUp: () => { },
  signIn: () => { },
  signOut: () => { },
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session)
      setUser(session?.user)
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user)
      setLoading(false)
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
    signIn: (data: SignInWithPasswordCredentials) => supabase.auth.signInWithPassword(data),
    signUp: (data: SignUpWithPasswordCredentials) => supabase.auth.signUp(data)
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

export { AuthProvider, useAuth };