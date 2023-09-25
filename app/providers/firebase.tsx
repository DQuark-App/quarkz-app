import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, ReactNode, useEffect, useState} from 'react';
import useStore from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DQuarkUser = FirebaseAuthTypes.User | null;

const FirebaseAuthContext = createContext<DQuarkUser>(null);

export const FirebaseProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<DQuarkUser>(null);
  const store = useStore();

  useEffect(() => {
    auth().onAuthStateChanged(
      async (newUser: FirebaseAuthTypes.User | null) => {
        if (newUser) {
          const token = await newUser.getIdToken();
          await AsyncStorage.setItem('token', token);
          store.setIdToken(token);
        }
        setUser(newUser);
        store.setUser(newUser);
      },
    );
  }, []);
  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
