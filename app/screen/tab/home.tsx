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
        backgroundColor: theme.colors.onBackground,
      }}>
      <Text style={{color: theme.colors.surface}}>Home Screen</Text>
    </View>
  );
}

export default Home;
