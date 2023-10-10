import {Card, IconButton, Menu, Portal, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert, Image, Text, View} from 'react-native';
import {useState} from 'react';
import DQService from '../service';
import AlbumModal from './albummodal';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';
import {useRealm} from '../providers';
import {File} from '../schema';
import {Row} from './grid';

type AlbumProps = {
  albumUid: string;
  name: string;
  onClick: () => void;
};
export default function Album({name, albumUid, onClick}: AlbumProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const realm = useRealm();
  const file = realm.objects(File).filtered(`albumUid = "${albumUid}"`)[0];
  const onDelete = async () => {
    setVisible(false);
    try {
      const res = await DQService.instance.deleteFolder(albumUid);
      if (res.data.status === 'success') {
        realm.write(() => {
          const folder = realm.objectForPrimaryKey('Folder', albumUid);
          realm.delete(folder);
        });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to delete album');
    }
  };

  const onRename = async (name: string) => {
    setVisible(false);
    setModalVisible(false);
    try {
      const res = await DQService.instance.editFolder(albumUid, name);
      if (res.data.status === 'success') {
        realm.write(() => {
          const folder = realm.objectForPrimaryKey('Folder', albumUid);
          if (folder) {
            folder.name = name;
          }
        });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to rename album');
    }
  };
  return (
    <View style={{flex: 0.5}}>
      <Portal>
        <AlbumModal
          previousText={name}
          isVisible={modalVisible}
          onOk={newName => onRename(newName)}
          onCancel={() => setModalVisible(false)}
        />
      </Portal>
      <Card style={{margin: 5}} onPress={onClick} mode={'outlined'}>
        {!file ? (
          <Card.Content>
            <Icon
              name={'folder'}
              color={theme.colors.primary}
              size={92}
              style={{alignSelf: 'center', marginBottom: 5}}
            />
          </Card.Content>
        ) : (
          <Card.Content>
            <Row alignItems={'center'} justifyContent={'center'}>
              <Image
                source={{uri: IPFS_GATEWAY + file.cid}}
                style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            </Row>
          </Card.Content>
        )}
        <Card.Actions style={{height: 50}}>
          <Text
            style={{fontSize: 16, color: theme.colors.onSurface, flexGrow: 1}}
            numberOfLines={1}>
            {name}
          </Text>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                icon={'dots-vertical'}
                onPress={() => setVisible(true)}
              />
            }>
            <Menu.Item
              onPress={() => setModalVisible(true)}
              title="Rename"
              leadingIcon={'rename-box'}
            />
            <Menu.Item
              onPress={onDelete}
              title="Delete"
              leadingIcon={'delete'}
            />
          </Menu>
        </Card.Actions>
      </Card>
    </View>
  );
}
