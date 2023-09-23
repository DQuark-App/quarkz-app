import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

function Home() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        padding: 15,
      }}>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontSize: 30,
        }}>
        Home
      </Text>
    </View>
  );
}

export default Home;
