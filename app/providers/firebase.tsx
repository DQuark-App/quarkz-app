import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, ReactNode, useEffect, useState} from 'react';
import useStore from '../store';

type DQuarkUser = FirebaseAuthTypes.User | null;

const FirebaseAuthContext = createContext<DQuarkUser>(null);

export const FirebaseProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<DQuarkUser>(null);
  const store = useStore();

  useEffect(() => {
    auth().onAuthStateChanged(
      async (newUser: FirebaseAuthTypes.User | null) => {
        setUser(newUser);
        store.setUser(newUser);
        if (newUser) {
          const token = await newUser.getIdToken();
          store.setIdToken(token);
        }
      },
    );
  }, []);
  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
