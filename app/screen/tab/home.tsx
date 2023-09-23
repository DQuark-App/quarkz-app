import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

function Home() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{color: theme.colors.onBackground}}>Home Screen</Text>
    </View>
  );
}

export default Home;
