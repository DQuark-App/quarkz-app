import {Image, Text, View} from 'react-native';
import {Column} from '../../components/grid';
// @ts-ignore
import AvatarLogo from '../../img/avatar.png';
import {List, Switch, useTheme} from 'react-native-paper';
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
        backgroundColor: theme.colors.background,
        padding: 15,
      }}>
      <Text
        style={{
          color: theme.colors.onBackground,
          fontSize: 30,
          textAlign: 'center',
        }}>
        Setting
      </Text>
      <View style={{flex: 1, marginTop: 20}}>
        <Column alignItems={'stretch'} justifyContent={'center'}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
              source={AvatarLogo}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
          <Text
            style={{
              color: theme.colors.onSurface,
              fontSize: 16,
              margin: 10,
              textAlign: 'center',
            }}>
            {store.user?.email?.includes('@dquark.network')
              ? store.user?.uid.substring(0, 8) +
                '...' +
                store.user?.uid.substring(
                  store.user?.uid.length - 8,
                  store.user?.uid.length,
                )
              : store.user?.email}
          </Text>
          <List.Item
            style={{marginTop: 20}}
            titleStyle={{color: theme.colors.onSurface, fontSize: 18}}
            title={'Dark Mode'}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => (
              <Switch
                value={store.isDarkMode}
                {...props}
                onValueChange={value => store.setDarkMode(value)}
              />
            )}
          />
          <List.Item
            style={{marginTop: 20}}
            titleStyle={{color: theme.colors.onSurface, fontSize: 18}}
            title={'Logout'}
            onPress={() => {
              store.signOut();
            }}
            left={props => <List.Icon {...props} icon="logout-variant" />}
          />
        </Column>
      </View>
    </View>
  );
}

export default Setting;
