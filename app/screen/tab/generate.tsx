import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function Generate() {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
        }}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 30,
            fontWeight: 'bold',
            padding: 15,
          }}>
          Create Art
        </Text>
      </View>
    </>
  );
}
