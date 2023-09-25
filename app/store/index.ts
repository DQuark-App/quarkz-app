import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage} from 'zustand/middleware';

interface AppState {
  user: FirebaseAuthTypes.User | null;
  idToken: string | null;
  isWallet: boolean;
  isDarkMode: boolean;
  isNotificationEnabled: boolean;
  isNewNotification: boolean;
  walletToken: string | null;
  walletPubKey: string | null;
  setDarkMode: (isDarkMode: boolean) => void;
  setPushNotification: (isNotificationEnabled: boolean) => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setIdToken: (token: string | null) => void;
  signOut: () => void;
  setWalletToken: (token: string | null, pubKey: string | null) => void;
}

const useStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        user: null,
        idToken: null,
        isWallet: false,
        isDarkMode: false,
        isNotificationEnabled: false,
        isNewNotification: false,
        walletToken: null,
        walletPubKey: null,
        setIdToken: newToken => {
          set(state => ({...state, idToken: newToken}));
        },
        setPushNotification: isNotificationEnabled =>
          set(state => ({...state, isNotificationEnabled})),
        setDarkMode: isDarkMode => set(state => ({...state, isDarkMode})),
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
      {
        name: 'appStore',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: state => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {user, ...rest} = state;
          return rest;
        },
      },
    ),
  ),
);

export default useStore;
