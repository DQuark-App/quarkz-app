import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import darkColors from './dark.json';
import lightColors from './light.json';
export default function Providers({children}: {children: React.ReactNode}) {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark'
      ? {...MD3DarkTheme, colors: darkColors.colors}
      : {...MD3LightTheme, colors: lightColors.colors};
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
