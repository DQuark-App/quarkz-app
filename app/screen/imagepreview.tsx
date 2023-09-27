import {Button, IconButton, useTheme} from 'react-native-paper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Image, Share, Text, View} from 'react-native';
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
          <View style={{flexGrow: 1}} />
          <IconButton
            onPress={() => Share.share({message: route.params?.uri})}
            size={24}
            icon={'share-variant'}
          />
        </Row>
        <View style={{flex: 1}}>
          <Image
            source={{uri: route.params?.uri}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          mode={'contained'}
          icon={'palette-swatch-variant'}
          textColor={theme.colors.onSurface}
          onPress={() => {
            navigation.navigate('Minting', {
              uri: route.params?.uri,
            });
          }}
          style={{
            backgroundColor: theme.colors.elevation.level3,
          }}>
          <Text style={{color: theme.colors.onSurface}}>Mint As NFT</Text>
        </Button>
      </View>
    </>
  );
}
