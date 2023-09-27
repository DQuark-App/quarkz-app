import {Card, IconButton, Menu, Portal, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert, Text, View} from 'react-native';
import {useState} from 'react';
import {useRealm} from '../providers';
import DQService from '../service';
import AlbumModal from './albummodal';

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
          if (folder) folder.name = name;
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
        <Card.Content>
          <Icon
            name={'folder'}
            color={theme.colors.primary}
            size={64}
            style={{alignSelf: 'center', marginBottom: 5}}
          />
          <Text style={{fontSize: 16, color: theme.colors.onSurface}}>
            {name}
          </Text>
        </Card.Content>
        <Card.Actions style={{height: 32}}>
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
