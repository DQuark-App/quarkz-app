import {Alert, FlatList, Text, ToastAndroid, View} from 'react-native';
import {FAB, Portal, useTheme} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useQuery, useRealm} from '../../providers';
import {Folder} from '../../schema';
import DQService, {FolderResponse} from '../../service';
import Album from '../../components/album';
import AlbumModal from '../../components/albummodal';
import {NavigationProp} from '@react-navigation/native';
import {AxiosError} from 'axios';

function Home({navigation}: {navigation: NavigationProp<any>}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isCreateAlbumModalVisible, setIsCreateAlbumModalVisible] =
    useState(false);
  const folders = useQuery(Folder);
  const realm = useRealm();
  const syncFolder = async () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  const createAlbum = async (name: string) => {
    try {
      setIsCreateAlbumModalVisible(false);
      const res = await DQService.instance.createFolder(name);
      if (res.data.status === 'success') {
        ToastAndroid.show('Album created', ToastAndroid.SHORT);
        syncFolder();
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to create album');
    }
  };

  useEffect(() => {
    syncFolder();
  }, []);
  return (
    <>
      <Portal>
        <AlbumModal
          previousText={null}
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
          Library
        </Text>
        <FlatList
          numColumns={2}
          data={folders}
          keyExtractor={item => item.uid.toString()}
          renderItem={({item}) => {
            return (
              <Album
                albumUid={item.uid}
                name={item.name}
                onClick={() => {
                  navigation.navigate('File', {album: item});
                }}
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
