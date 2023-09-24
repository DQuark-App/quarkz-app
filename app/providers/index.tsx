import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import darkColors from './dark.json';
import lightColors from './light.json';
import {FirebaseProvider} from './firebase';
import useStore from '../store';
import {createRealmContext} from '@realm/react';
import realmConfig from '../schema';

const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext(realmConfig);
export default function Providers({children}: {children: React.ReactNode}) {
  const store = useStore();
  const paperTheme = store.isDarkMode
    ? {...MD3DarkTheme, colors: darkColors.colors}
    : {...MD3LightTheme, colors: lightColors.colors};
  return (
    <FirebaseProvider>
      <RealmProvider>
        <PaperProvider theme={paperTheme}>{children}</PaperProvider>
      </RealmProvider>
    </FirebaseProvider>
  );
}

export {useRealm, useQuery, useObject};
