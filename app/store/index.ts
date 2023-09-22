import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage} from 'zustand/middleware/persist';

interface AppState {
  user: FirebaseAuthTypes.User | null;
  isWallet: boolean;
  walletToken: string | null;
  walletPubKey: string | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  signOut: () => void;
  setWalletToken: (token: string | null, pubKey: string | null) => void;
}

const useStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isWallet: false,
        walletToken: null,
        walletPubKey: null,
        setWalletToken: (newToken, walletPubKey) =>
          set(state => ({
            ...state,
            walletToken: newToken,
            isWallet: newToken !== null,
            walletPubKey,
          })),
        setUser: newUser => set(state => ({...state, user: newUser})),
        signOut: () => {
          set(state => ({
            ...state,
            user: null,
            isWallet: false,
            walletToken: null,
            walletPubKey: null,
          }));
          auth().signOut();
        },
      }),
      {name: 'appStore', storage: createJSONStorage(() => AsyncStorage)},
    ),
  ),
);

export default useStore;
