import {IconButton, useTheme} from 'react-native-paper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Row} from '../components/grid';

export default function ImagePreview({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
          paddingTop: 15,
        }}>
        <Row alignItems={'center'} justifyContent={'flex-start'}>
          <IconButton
            icon={'chevron-left'}
            onPress={() => {
              navigation.goBack();
            }}
            size={30}
          />
        </Row>
        <View style={{flex: 1}}>
          <Image
            source={{uri: route.params?.uri}}
            style={{width: '100%', height: '100%', resizeMode: 'center'}}
          />
        </View>
      </View>
    </>
  );
}
