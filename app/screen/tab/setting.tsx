import {Image, ScrollView, Text, View} from 'react-native';
import {Column} from '../../components/grid';
// @ts-ignore
import AvatarLogo from '../../img/avatar.png';
import {List, Switch, useTheme} from 'react-native-paper';
import useStore from '../../store';
function Setting() {
  const theme = useTheme();
  const store = useStore();

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          padding: 15,
        }}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 30,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Settings
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
                marginTop: 25,
                marginBottom: 25,
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
            <List.Section>
              <List.Subheader>App Setting</List.Subheader>
              <List.Item
                style={{marginTop: 20}}
                titleStyle={{color: theme.colors.onSurface, fontSize: 18}}
                title={'Push Notification'}
                left={props => <List.Icon {...props} icon="bell" />}
                right={props => (
                  <Switch
                    value={store.isNotificationEnabled}
                    {...props}
                    onValueChange={value => store.setPushNotification(value)}
                  />
                )}
              />
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
                title={'Network (Mainnet/Devnet)'}
                left={props => <List.Icon {...props} icon="web" />}
                right={props => (
                  <Switch
                    value={store.network === 'mainnet'}
                    {...props}
                    onValueChange={value =>
                      store.setNetwork(value ? 'mainnet' : 'devnet')
                    }
                  />
                )}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>Account Setting</List.Subheader>
              <List.Item
                style={{marginTop: 20}}
                titleStyle={{color: theme.colors.onSurface, fontSize: 18}}
                title={'Logout'}
                onPress={() => {
                  store.signOut();
                }}
                left={props => <List.Icon {...props} icon="logout-variant" />}
              />
            </List.Section>
          </Column>
        </View>
      </View>
    </ScrollView>
  );
}

export default Setting;
