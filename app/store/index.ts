import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AppState {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  signOut: () => void;
}

const useStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        user: null,
        setUser: newUser => set(state => ({...state, user: newUser})),
        signOut: () => {
          set(state => ({...state, user: null}));
          auth().signOut();
        },
      }),
      {name: 'appStore'},
    ),
  ),
);

export default useStore;
