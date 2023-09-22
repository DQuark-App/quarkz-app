import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

function Setting() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.onBackground,
      }}>
      <Text style={{color: theme.colors.surface}}>Setting Screen</Text>
    </View>
  );
}

export default Setting;
