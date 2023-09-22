import {Image, Text, View} from 'react-native';
import {Column, Row} from '../../components/grid';
// @ts-ignore
import AvatarLogo from '../../img/avatar.png';
import {List, useTheme} from 'react-native-paper';
import useStore from '../../store';
function Setting() {
  const theme = useTheme();
  const store = useStore();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.onBackground,
        padding: 15,
      }}>
      <Text style={{color: theme.colors.surface, fontSize: 30}}>Setting</Text>
      <View style={{flex: 1, marginTop: 20}}>
        <Column alignItems={'stretch'} justifyContent={'center'}>
          <Row alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Image
              source={AvatarLogo}
              style={{width: 70, height: 70, resizeMode: 'contain'}}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Column alignItems={'stretch'} justifyContent={'flex-start'}>
                <Text
                  style={{
                    color: theme.colors.surface,
                    fontSize: 16,
                    margin: 10,
                  }}>
                  {store.user?.email?.includes('@dquark.network')
                    ? store.user?.uid
                    : store.user?.email}
                </Text>
              </Column>
            </View>
          </Row>
          <List.Item
            style={{marginTop: 20}}
            titleStyle={{color: theme.colors.surface}}
            title={'Logout'}
            onPress={() => {
              store.signOut();
            }}
          />
        </Column>
      </View>
    </View>
  );
}

export default Setting;
