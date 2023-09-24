import {Alert, FlatList, Text, ToastAndroid, View} from 'react-native';
import {FAB, List, Portal, useTheme} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useQuery, useRealm} from '../../providers';
import {Folder} from '../../schema';
import DQService, {FolderResponse} from '../../service';
import CreateAlbumModal from '../../components/albummodal';

function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isCreateAlbumModalVisible, setIsCreateAlbumModalVisible] =
    useState(false);
  const folders = useQuery(Folder);
  const realm = useRealm();
  const syncFolder = async () => {
    const res = await DQService.instance.getFolder();
    const folders = res.data.data as FolderResponse[];
    realm.write(() => {
      for (const folder of folders) {
        // @ts-ignore
        realm.create(
          Folder,
          {
            uid: folder.uid,
            name: folder.name,
            createdAt: new Date(folder.created_at),
          },
          'modified',
        );
      }
    });
  };

  const createAlbum = async (name: string) => {
    setIsCreateAlbumModalVisible(false);
    const res = await DQService.instance.createFolder(name);
    if (res.data.status === 'success') {
      ToastAndroid.show('Album created', ToastAndroid.SHORT);
      syncFolder();
    } else {
      Alert.alert('Error', res.data.message);
    }
  };

  useEffect(() => {
    syncFolder();
  }, []);
  return (
    <>
      <Portal>
        <CreateAlbumModal
          isVisible={isCreateAlbumModalVisible}
          onOk={createAlbum}
          onCancel={() => setIsCreateAlbumModalVisible(false)}
        />
      </Portal>
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
            fontWeight: 'bold',
          }}>
          Home
        </Text>
        <FlatList
          data={folders}
          keyExtractor={item => item.uid.toString()}
          renderItem={({item}) => {
            return (
              <List.Item
                title={item.name}
                left={() => <List.Icon icon={'folder'} />}
              />
            );
          }}
        />
      </View>
      <FAB.Group
        open={open}
        icon={open ? 'close' : 'plus'}
        visible={true}
        actions={[
          {
            icon: 'file',
            label: 'Upload File',
            onPress: () => console.log('Pressed upload file'),
          },
          {
            icon: 'folder',
            label: 'Create Album',
            onPress: () => setIsCreateAlbumModalVisible(true),
          },
        ]}
        onStateChange={({open}) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </>
  );
}

export default Home;
