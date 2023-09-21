import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export default function Providers({children}: {children: React.ReactNode}) {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
